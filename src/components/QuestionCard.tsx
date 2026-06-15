import { useState } from 'react'
import type { Question } from '../types'
import { QuestionVisual } from './QuestionVisual'

interface Props {
  question: Question
  onAnswer: (correct: boolean) => void
  questionNumber: number
  totalQuestions: number
}

function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/,/g, '.')
    .replace(/€/g, '')
    .replace(/eur/g, '')
    .replace(/euro/g, '')
    .replace(/meter/g, 'm')
    .replace(/quadratmeter/g, 'm2')
    .replace(/qm/g, 'm2')
    .replace(/stunden/g, 'h')
    .replace(/[^a-z0-9./\-+]/g, '')
}

function checkAnswer(question: Question, userAnswer: string | string[]): boolean {
  if (question.type === 'multiple-choice') {
    return userAnswer === question.correctAnswer
  }
  if (question.type === 'sequence-input') {
    const answers = userAnswer as string[]
    const correct = question.correctAnswer as string[]
    return answers.every((a, i) => normalizeAnswer(a) === normalizeAnswer(correct[i] ?? ''))
  }
  const normalized = normalizeAnswer(userAnswer as string)
  const variants = question.acceptVariants ?? [question.correctAnswer as string]
  return variants.some((v) => normalizeAnswer(v) === normalized)
}

export function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [textInput, setTextInput] = useState('')
  const [seqInputs, setSeqInputs] = useState(['', ''])
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  function handleSubmit() {
    let answer: string | string[]
    if (question.type === 'multiple-choice') {
      if (!selected) return
      answer = selected
    } else if (question.type === 'sequence-input') {
      if (seqInputs.some((s) => !s.trim())) return
      answer = seqInputs
    } else {
      if (!textInput.trim()) return
      answer = textInput
    }
    setIsCorrect(checkAnswer(question, answer))
    setSubmitted(true)
  }

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

      {question.visual && <QuestionVisual name={question.visual} />}

      {!submitted && question.hint && (
        <button type="button" className="hint-btn" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Tipp ausblenden' : '💡 Tipp anzeigen'}
        </button>
      )}
      {showHint && !submitted && <p className="hint-text">{question.hint}</p>}

      {!submitted && (
        <div className="answer-area">
          {question.type === 'multiple-choice' && question.options && (
            <div className="options-grid">
              {question.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`option-btn ${selected === opt.id ? 'selected' : ''}`}
                  onClick={() => setSelected(opt.id)}
                >
                  <span className="option-letter">{opt.id.toUpperCase()}</span>
                  <span className="option-label">{opt.label}</span>
                </button>
              ))}
            </div>
          )}

          {question.type === 'text-input' && (
            <input
              type="text"
              className="text-input"
              placeholder="Deine Antwort eingeben…"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              inputMode="decimal"
              autoComplete="off"
            />
          )}

          {question.type === 'sequence-input' && (
            <div className="sequence-inputs">
              <input
                type="text"
                className="text-input text-input--short"
                placeholder="1. Zahl"
                value={seqInputs[0]}
                onChange={(e) => setSeqInputs([e.target.value, seqInputs[1]])}
                inputMode="numeric"
                autoComplete="off"
              />
              <input
                type="text"
                className="text-input text-input--short"
                placeholder="2. Zahl"
                value={seqInputs[1]}
                onChange={(e) => setSeqInputs([seqInputs[0], e.target.value])}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                inputMode="numeric"
                autoComplete="off"
              />
            </div>
          )}

          <button type="button" className="btn btn--secondary btn--block" onClick={handleSubmit}>
            Antwort prüfen
          </button>
        </div>
      )}

      {submitted && (
        <div className={`feedback ${isCorrect ? 'feedback--correct' : 'feedback--wrong'}`}>
          <div className="feedback-icon">{isCorrect ? '✓' : '✗'}</div>
          <h3>{isCorrect ? 'Richtig!' : 'Leider falsch'}</h3>
          <p>{question.explanation}</p>
          <button type="button" className="btn btn--primary btn--block" onClick={() => onAnswer(isCorrect)}>
            {questionNumber < totalQuestions ? 'Nächste Aufgabe →' : 'Ergebnis anzeigen'}
          </button>
        </div>
      )}
    </div>
  )
}
