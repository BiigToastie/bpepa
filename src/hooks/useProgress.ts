const STORAGE_KEY = 'bwt-trainer-progress'

export interface ProgressData {
  completed: Record<string, boolean>
  scores: Record<string, { correct: number; total: number }>
}

function load(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ProgressData
  } catch {
    /* ignore */
  }
  return { completed: {}, scores: {} }
}

function save(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getProgress(): ProgressData {
  return load()
}

export function markQuestionComplete(questionId: string, correct: boolean) {
  const data = load()
  data.completed[questionId] = correct
  save(data)
}

export function saveCategoryScore(categoryId: string, correct: number, total: number) {
  const data = load()
  const prev = data.scores[categoryId]
  if (!prev || correct > prev.correct) {
    data.scores[categoryId] = { correct, total }
  }
  save(data)
}

export function getCategoryProgress(_categoryId: string, questionIds: string[]) {
  const data = load()
  const done = questionIds.filter((id) => id in data.completed).length
  const correct = questionIds.filter((id) => data.completed[id] === true).length
  return { done, total: questionIds.length, correct }
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
}
