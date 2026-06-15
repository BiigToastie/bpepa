import type { CSSProperties } from 'react'
import { categories } from '../data/exercises'
import { getCategoryProgress, resetProgress } from '../hooks/useProgress'

interface Props {
  onSelectCategory: (id: string) => void
}

export function Home({ onSelectCategory }: Props) {
  const totalQuestions = categories.reduce((sum, c) => sum + c.questions.length, 0)
  const totalDone = categories.reduce((sum, c) => {
    const p = getCategoryProgress(c.id, c.questions.map((q) => q.id))
    return sum + p.done
  }, 0)
  const totalCorrect = categories.reduce((sum, c) => {
    const p = getCategoryProgress(c.id, c.questions.map((q) => q.id))
    return sum + p.correct
  }, 0)

  return (
    <div className="screen home-screen">
      <header className="home-header">
        <div className="home-badge">BPS · BWT Trainer</div>
        <h1>Fit für den<br /><span className="gradient-text">Eignungstest</span></h1>
        <p className="home-subtitle">
          Übe alle Aufgabentypen des Berufspsychologischen Service – intuitiv und in deinem Tempo.
        </p>
      </header>

      {totalDone > 0 && (
        <div className="overall-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(totalDone / totalQuestions) * 100}%` }}
            />
          </div>
          <p>
            {totalDone} von {totalQuestions} Aufgaben · {totalCorrect} richtig
          </p>
        </div>
      )}

      <div className="category-list">
        {categories.map((cat) => {
          const ids = cat.questions.map((q) => q.id)
          const { done, total, correct } = getCategoryProgress(cat.id, ids)
          const pct = total > 0 ? (done / total) * 100 : 0

          return (
            <button
              key={cat.id}
              className="category-card"
              onClick={() => onSelectCategory(cat.id)}
              style={{ '--card-gradient': cat.gradient } as CSSProperties}
            >
              <div className="category-card-icon">{cat.icon}</div>
              <div className="category-card-content">
                <h3>{cat.shortTitle}</h3>
                <p>{cat.questions.length} Aufgaben</p>
                {done > 0 && (
                  <div className="mini-progress">
                    <div className="mini-progress-bar">
                      <div className="mini-progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span>{correct}/{done} richtig</span>
                  </div>
                )}
              </div>
              <span className="category-arrow">›</span>
            </button>
          )
        })}
      </div>

      <div className="home-footer">
        <p className="disclaimer">
          Basierend auf Beispielaufgaben des Berufspsychologischen Service der Bundesagentur für Arbeit (BPS).
        </p>
        {totalDone > 0 && (
          <button className="reset-btn" onClick={() => { resetProgress(); window.location.reload() }}>
            Fortschritt zurücksetzen
          </button>
        )}
      </div>
    </div>
  )
}
