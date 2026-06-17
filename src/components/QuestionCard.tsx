import { useEffect, useMemo, useState } from 'react'
import type { Question } from '../types'
import { resolveVisual } from '../lib/resolveVisual'
import { QuestionVisual } from './QuestionVisual'

interface Props {
  question: Question
  onAnswer: (correct: boolean) => void
  questionNumber: number
  totalQuestions: number
}

export function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    setSelected(null)
    setSubmitted(false)
    setShowHint(false)
  }, [question.id])

  useEffect(() => {
    if (submitted) return

    function onKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      const match = question.options.find((o) => o.id === key)
      if (match) handlePick(match.id)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function handlePick(optionId: string) {
    if (submitted) return
    setSelected(optionId)
    const correct = optionId === question.correctAnswer
    setIsCorrect(correct)
    setSubmitted(true)
  }

  const optionLetters = question.options.map((o) => o.id.toUpperCase()).join(' · ')
  const visual = useMemo(() => resolveVisual(question), [question])

  return (
    <div className="question-card">
      <div className="question-progress">
        <div className="progress-dots">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${i < questionNumber - 1 ? 'done' : ''} ${i === questionNumber - 1 ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <h2 className="question-title">{question.title}</h2>
      <p className="question-prompt">{question.prompt}</p>

      {visual && <QuestionVisual question={question} />}

      {!submitted && question.hint && (
        <button type="button" className="hint-btn" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Tipp ausblenden' : '💡 Tipp anzeigen'}
        </button>
      )}
      {showHint && !submitted && <p className="hint-text">{question.hint}</p>}

      {!submitted && (
        <div className="answer-area">
          <p className="answer-hint">Tippe eine Antwort – {optionLetters}</p>
          <div className="options-grid">
            {question.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`option-btn ${selected === opt.id ? 'selected' : ''}`}
                onClick={() => handlePick(opt.id)}
              >
                <span className="option-letter">{opt.id.toUpperCase()}</span>
                <span className="option-label">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {submitted && (
        <div className={`feedback ${isCorrect ? 'feedback--correct' : 'feedback--wrong'}`}>
          <div className="feedback-icon">{isCorrect ? '✓' : '✗'}</div>
          <h3>{isCorrect ? 'Richtig!' : 'Leider falsch'}</h3>
          {!isCorrect && (
            <p className="feedback-answer">
              Richtig wäre <strong>{question.correctAnswer.toUpperCase()}</strong>:{' '}
              {question.options.find((o) => o.id === question.correctAnswer)?.label}
            </p>
          )}
          <p>{question.explanation}</p>
          <button type="button" className="btn btn--primary btn--block" onClick={() => onAnswer(isCorrect)}>
            {questionNumber < totalQuestions ? 'Nächste Aufgabe →' : 'Ergebnis anzeigen'}
          </button>
        </div>
      )}
    </div>
  )
}
