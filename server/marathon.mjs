import { db } from './db.mjs'

/** Fragen-Katalog wird vom Client mitgesendet; Server speichert nur Fortschritt. */
export function getMarathonState(userId, categoryIds, questionMap) {
  const rows = db
    .prepare(
      `SELECT category_id, question_id, correct, attempts
       FROM marathon_progress WHERE user_id = ? AND category_id IN (${categoryIds.map(() => '?').join(',')})`,
    )
    .all(userId, ...categoryIds)

  const progress = new Map()
  for (const r of rows) {
    progress.set(`${r.category_id}:${r.question_id}`, r)
  }

  const sections = categoryIds.map((categoryId) => {
    const questions = questionMap[categoryId] || []
    const mastered = questions.every((q) => progress.get(`${categoryId}:${q.id}`)?.correct === 1)
    const correctCount = questions.filter((q) => progress.get(`${categoryId}:${q.id}`)?.correct === 1).length
    return {
      categoryId,
      total: questions.length,
      correctCount,
      mastered,
      pendingQuestionIds: questions.filter((q) => progress.get(`${categoryId}:${q.id}`)?.correct !== 1).map((q) => q.id),
    }
  })

  const allMastered = sections.every((s) => s.mastered)
  const pendingQuestions = sections.flatMap((s) =>
    s.pendingQuestionIds.map((qid) => ({ categoryId: s.categoryId, questionId: qid })),
  )

  return { sections, allMastered, pendingQuestions }
}

export function recordAnswer(userId, categoryId, questionId, correct) {
  db.prepare(
    `INSERT INTO marathon_progress (user_id, category_id, question_id, correct, attempts, updated_at)
     VALUES (?, ?, ?, ?, 1, datetime('now'))
     ON CONFLICT(user_id, category_id, question_id) DO UPDATE SET
       attempts = attempts + 1,
       correct = CASE WHEN marathon_progress.correct = 1 THEN 1 WHEN ? = 1 THEN 1 ELSE 0 END,
       updated_at = datetime('now')`,
  ).run(userId, categoryId, questionId, correct ? 1 : 0, correct ? 1 : 0)
}

export function saveRun(userId, sections, totalAnswered, totalCorrect) {
  db.prepare(
    `INSERT INTO marathon_runs (user_id, sections_json, total_answered, total_correct)
     VALUES (?, ?, ?, ?)`,
  ).run(userId, JSON.stringify(sections), totalAnswered, totalCorrect)
}

export function getLeaderboard(limit = 50) {
  return db
    .prepare(
      `SELECT u.display_name,
              COUNT(CASE WHEN mp.correct = 1 THEN 1 END) AS correct_answers,
              COUNT(mp.question_id) AS tracked,
              SUM(mp.attempts) AS total_attempts,
              MAX(mr.completed_at) AS last_run
       FROM users u
       LEFT JOIN marathon_progress mp ON mp.user_id = u.id
       LEFT JOIN marathon_runs mr ON mr.user_id = u.id
       GROUP BY u.id
       HAVING correct_answers > 0
       ORDER BY correct_answers DESC, total_attempts ASC
       LIMIT ?`,
    )
    .all(limit)
    .map((row, i) => ({
      rank: i + 1,
      displayName: row.display_name,
      correctAnswers: row.correct_answers,
      tracked: row.tracked,
      totalAttempts: row.total_attempts,
      lastRun: row.last_run,
      accuracy: row.tracked > 0 ? Math.round((row.correct_answers / row.tracked) * 100) : 0,
    }))
}
