import { useEffect, useState } from 'react'
import type { View } from './types'
import { getCategory, getCategoryQuestions } from './data/exercises'
import { DIFFICULTY_LABELS } from './data/difficulty'
import { buildQuestionMap, findQuestion, shuffle } from './data/marathon'
import { markQuestionComplete, saveCategoryScore } from './hooks/useProgress'
import { useAuth } from './context/AuthContext'
import { api } from './api/client'
import { AppShell } from './components/AppShell'
import { Home } from './components/Home'
import { CategoryView } from './components/CategoryView'
import { QuestionCard } from './components/QuestionCard'
import { MarathonSetup } from './components/MarathonSetup'
import { MarathonResult } from './components/MarathonResult'
import { LeaderboardView } from './components/LeaderboardView'

export default function App() {
  const { user, loginWithDiscord } = useAuth()
  const [view, setView] = useState<View>({ screen: 'home' })
  const [sessionScore, setSessionScore] = useState(0)

  useEffect(() => {
    if (!user) return
    const params = new URLSearchParams(window.location.search)
    const intent = params.get('intent')
    if (intent === 'marathon') {
      setView({ screen: 'marathon-setup' })
      params.delete('intent')
      params.delete('auth')
      const next = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`
      window.history.replaceState({}, '', next)
    }
  }, [user])

  function goHome() {
    setView({ screen: 'home' })
    setSessionScore(0)
  }

  function goLeaderboard() {
    setView({ screen: 'leaderboard' })
  }

  function goMarathon() {
    if (user) {
      setView({ screen: 'marathon-setup' })
    } else {
      loginWithDiscord('/?intent=marathon')
    }
  }

  const shell = {
    onHome: goHome,
    onMarathon: goMarathon,
    onLeaderboard: goLeaderboard,
  }

  if (view.screen === 'home') {
    return (
      <Home
        onSelectCategory={(id) => setView({ screen: 'category', categoryId: id })}
        onStartMarathon={goMarathon}
        {...shell}
      />
    )
  }

  if (view.screen === 'marathon-setup') {
    return (
      <MarathonSetup
        onBack={goHome}
        onStart={({ categoryIds, difficulty, queue }) =>
          setView({
            screen: 'marathon-quiz',
            categoryIds,
            difficulty,
            queue,
            index: 0,
            runCorrect: 0,
            runAnswered: 0,
            sectionRunStats: {},
          })
        }
        {...shell}
      />
    )
  }

  if (view.screen === 'marathon-quiz') {
    const current = view.queue[view.index]
    if (!current) {
      return (
        <MarathonResult
          categoryIds={view.categoryIds}
          difficulty={view.difficulty}
          runCorrect={view.runCorrect}
          runAnswered={view.runAnswered}
          sectionRunStats={view.sectionRunStats}
          onContinue={async () => {
            const questionMap = buildQuestionMap(view.categoryIds, view.difficulty)
            try {
              const state = await api.marathonState(view.categoryIds, questionMap)
              const queue = shuffle(state.pendingQuestions)
              if (queue.length === 0) {
                setView({ screen: 'marathon-setup' })
                return
              }
              setView({
                screen: 'marathon-quiz',
                categoryIds: view.categoryIds,
                difficulty: view.difficulty,
                queue,
                index: 0,
                runCorrect: 0,
                runAnswered: 0,
                sectionRunStats: {},
              })
            } catch {
              setView({ screen: 'marathon-setup' })
            }
          }}
          {...shell}
        />
      )
    }

    const question = findQuestion(current.categoryId, current.questionId)
    const category = getCategory(current.categoryId)
    if (!question || !category) {
      goHome()
      return null
    }

    const questionMap = buildQuestionMap(view.categoryIds, view.difficulty)

    return (
      <AppShell
        {...shell}
        onBack={() => setView({ screen: 'marathon-setup' })}
        backLabel="Marathon"
        title={`Aufgabe ${view.index + 1} / ${view.queue.length}`}
        badge={`${category.icon} ${category.shortTitle}`}
        width="narrow"
      >
        <div className="quiz-panel glass-panel">
          <QuestionCard
            key={`${current.categoryId}-${question.id}`}
            question={question}
            questionNumber={view.index + 1}
            totalQuestions={view.queue.length}
            onAnswer={async (correct) => {
              markQuestionComplete(question.id, correct)
              try {
                await api.marathonAnswer(
                  current.categoryId,
                  question.id,
                  correct,
                  view.categoryIds,
                  questionMap,
                )
              } catch {
                /* lokal trotzdem gezählt */
              }

              const prev = view.sectionRunStats[current.categoryId] ?? { correct: 0, answered: 0 }
              const sectionRunStats = {
                ...view.sectionRunStats,
                [current.categoryId]: {
                  correct: prev.correct + (correct ? 1 : 0),
                  answered: prev.answered + 1,
                },
              }
              const runCorrect = view.runCorrect + (correct ? 1 : 0)
              const runAnswered = view.runAnswered + 1
              const nextIndex = view.index + 1

              if (nextIndex < view.queue.length) {
                setView({
                  ...view,
                  index: nextIndex,
                  runCorrect,
                  runAnswered,
                  sectionRunStats,
                })
              } else {
                setView({
                  screen: 'marathon-result',
                  categoryIds: view.categoryIds,
                  difficulty: view.difficulty,
                  runCorrect,
                  runAnswered,
                  sectionRunStats,
                })
              }
            }}
          />
        </div>
      </AppShell>
    )
  }

  if (view.screen === 'marathon-result') {
    return (
      <MarathonResult
        categoryIds={view.categoryIds}
        difficulty={view.difficulty}
        runCorrect={view.runCorrect}
        runAnswered={view.runAnswered}
        sectionRunStats={view.sectionRunStats ?? {}}
        onContinue={async () => {
          const questionMap = buildQuestionMap(view.categoryIds, view.difficulty)
          try {
            const state = await api.marathonState(view.categoryIds, questionMap)
            const queue = shuffle(state.pendingQuestions)
            if (queue.length === 0) {
              setView({ screen: 'marathon-setup' })
              return
            }
            setView({
              screen: 'marathon-quiz',
              categoryIds: view.categoryIds,
              difficulty: view.difficulty,
              queue,
              index: 0,
              runCorrect: 0,
              runAnswered: 0,
              sectionRunStats: {},
            })
          } catch {
            setView({ screen: 'marathon-setup' })
          }
        }}
        {...shell}
      />
    )
  }

  if (view.screen === 'leaderboard') {
    return <LeaderboardView onBack={goHome} {...shell} />
  }

  if (view.screen === 'category') {
    const category = getCategory(view.categoryId)
    if (!category) { goHome(); return null }
    return (
      <CategoryView
        category={category}
        onBack={goHome}
        onStart={(difficulty) =>
          setView({ screen: 'quiz', categoryId: view.categoryId, difficulty, questionIndex: 0 })
        }
        {...shell}
      />
    )
  }

  if (view.screen === 'quiz') {
    const category = getCategory(view.categoryId)
    if (!category) { goHome(); return null }
    const questions = getCategoryQuestions(view.categoryId, view.difficulty)
    const question = questions[view.questionIndex]
    if (!question) { goHome(); return null }

    return (
      <AppShell
        {...shell}
        onBack={() => setView({ screen: 'category', categoryId: view.categoryId })}
        backLabel={category.shortTitle}
        title={`Aufgabe ${view.questionIndex + 1} / ${questions.length}`}
        badge={`${category.icon} ${DIFFICULTY_LABELS[view.difficulty]}`}
        width="narrow"
      >
        <div className="quiz-panel glass-panel">
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={view.questionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={(correct) => {
              markQuestionComplete(question.id, correct)
              const newScore = correct ? sessionScore + 1 : sessionScore
              setSessionScore(newScore)

              const nextIndex = view.questionIndex + 1
              if (nextIndex < questions.length) {
                setView({ ...view, questionIndex: nextIndex })
              } else {
                saveCategoryScore(`${view.categoryId}-${view.difficulty}`, newScore, questions.length)
                setView({
                  screen: 'result',
                  categoryId: view.categoryId,
                  difficulty: view.difficulty,
                  score: newScore,
                  total: questions.length,
                })
              }
            }}
          />
        </div>
      </AppShell>
    )
  }

  if (view.screen === 'result') {
    const category = getCategory(view.categoryId)
    const pct = Math.round((view.score / view.total) * 100)
    const emoji = pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'

    return (
      <AppShell {...shell} width="narrow">
        <div className="result-panel glass-panel">
          <span className="result-emoji">{emoji}</span>
          <h1 className="result-title">Geschafft!</h1>
          <p className="result-category">
            {category?.title} · {DIFFICULTY_LABELS[view.difficulty]}
          </p>

          <div className="result-score">
            <span className="result-number">{view.score}</span>
            <span className="result-divider">/</span>
            <span className="result-total">{view.total}</span>
          </div>
          <p className="result-pct">{pct}% richtig</p>

          <div className="result-message">
            {pct >= 80
              ? 'Sehr gut! Du bist bestens vorbereitet.'
              : pct >= 50
                ? 'Guter Fortschritt – übe weiter, um noch sicherer zu werden.'
                : 'Übung macht den Meister – versuch es noch einmal!'}
          </div>

          <div className="result-actions">
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={() =>
                setView({ screen: 'quiz', categoryId: view.categoryId, difficulty: view.difficulty, questionIndex: 0 })
              }
            >
              Nochmal üben
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--block"
              onClick={() => setView({ screen: 'category', categoryId: view.categoryId })}
            >
              Anderen Schwierigkeitsgrad
            </button>
            <button type="button" className="btn btn--ghost btn--block" onClick={goHome}>
              Alle Kategorien
            </button>
          </div>
        </div>
      </AppShell>
    )
  }

  return null
}
