import { useState } from 'react'
import type { View } from './types'
import { getCategory, getCategoryQuestions } from './data/exercises'
import { DIFFICULTY_LABELS } from './data/difficulty'
import { markQuestionComplete, saveCategoryScore } from './hooks/useProgress'
import { Home } from './components/Home'
import { CategoryView } from './components/CategoryView'
import { QuestionCard } from './components/QuestionCard'

export default function App() {
  const [view, setView] = useState<View>({ screen: 'home' })
  const [sessionScore, setSessionScore] = useState(0)

  function goHome() {
    setView({ screen: 'home' })
    setSessionScore(0)
  }

  if (view.screen === 'home') {
    return (
      <Home
        onSelectCategory={(id) => setView({ screen: 'category', categoryId: id })}
      />
    )
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
      <div className="screen quiz-screen">
        <header className="screen-header screen-header--compact">
          <button className="back-btn" onClick={goHome} aria-label="Zurück">
            ←
          </button>
          <span className="quiz-category">
            {category.icon} {category.shortTitle}
            <span className={`difficulty-badge difficulty-badge--${view.difficulty}`}>
              {DIFFICULTY_LABELS[view.difficulty]}
            </span>
          </span>
        </header>
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
    )
  }

  if (view.screen === 'result') {
    const category = getCategory(view.categoryId)
    const pct = Math.round((view.score / view.total) * 100)
    const emoji = pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'

    return (
      <div className="screen result-screen">
        <div className="result-card">
          <span className="result-emoji">{emoji}</span>
          <h1>Geschafft!</h1>
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

          <button
            className="start-btn"
            onClick={() =>
              setView({ screen: 'quiz', categoryId: view.categoryId, difficulty: view.difficulty, questionIndex: 0 })
            }
          >
            Nochmal üben
          </button>
          <button
            className="secondary-btn"
            onClick={() => setView({ screen: 'category', categoryId: view.categoryId })}
          >
            Anderen Schwierigkeitsgrad
          </button>
          <button className="secondary-btn" onClick={goHome}>
            Alle Kategorien
          </button>
        </div>
      </div>
    )
  }

  return null
}
