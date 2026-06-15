import type { Category } from '../types'
import { getCategoryProgress } from '../hooks/useProgress'

interface Props {
  category: Category
  onStart: () => void
  onBack: () => void
}

export function CategoryView({ category, onStart, onBack }: Props) {
  const ids = category.questions.map((q) => q.id)
  const { done, total, correct } = getCategoryProgress(category.id, ids)

  return (
    <div className="screen category-screen">
      <header className="screen-header">
        <button className="back-btn" onClick={onBack} aria-label="Zurück">
          ←
        </button>
        <div className="header-content">
          <span className="category-icon-lg">{category.icon}</span>
          <h1>{category.title}</h1>
        </div>
      </header>

      <div className="category-body">
        <p className="category-desc">{category.description}</p>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-value">{category.questions.length}</span>
            <span className="stat-label">Aufgaben</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{done}/{total}</span>
            <span className="stat-label">Bearbeitet</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{correct}</span>
            <span className="stat-label">Richtig</span>
          </div>
        </div>

        <div className="info-box">
          <h3>So funktioniert's</h3>
          <ul>
            <li>Lies die Aufgabe aufmerksam</li>
            <li>Wähle oder tippe deine Antwort ein</li>
            <li>Du erhältst sofort Feedback mit Erklärung</li>
            <li>Nutze Tipps, wenn du nicht weiterkommst</li>
          </ul>
        </div>

        <button className="start-btn" onClick={onStart}>
          {done > 0 ? 'Weiter üben' : 'Übung starten'}
        </button>
      </div>
    </div>
  )
}
