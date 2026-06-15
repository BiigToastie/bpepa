import { useState } from 'react'
import type { Category, Difficulty } from '../types'
import { countByDifficulty } from '../data/difficulty'
import { getCategoryProgress } from '../hooks/useProgress'
import { AppShell } from './AppShell'
import { DifficultySelector } from './DifficultySelector'

interface Props {
  category: Category
  onStart: (difficulty: Difficulty) => void
  onBack: () => void
}

export function CategoryView({ category, onStart, onBack }: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty>('default')
  const counts = countByDifficulty(category.questions)
  const filtered = category.questions.filter((q) => q.difficulty === difficulty)
  const ids = filtered.map((q) => q.id)
  const { done, total, correct } = getCategoryProgress(category.id, ids)

  return (
    <AppShell
      onBack={onBack}
      onHome={onBack}
      backLabel="Kategorien"
      title={category.title}
      badge={category.icon}
      width="medium"
    >
      <div className="category-layout">
        <div className="category-aside glass-panel">
          <p className="category-desc">{category.description}</p>
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-value">{filtered.length}</span>
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
          <div className="info-box info-box--flat">
            <h3>Tipps für diese Übung</h3>
            <ul>
              <li>Nimm dir Zeit – unter Druck üben hilft später</li>
              <li>Nutze Tipps, bevor du die Lösung aufgibst</li>
              <li>Lies die Erklärung auch bei richtigen Antworten</li>
            </ul>
          </div>
        </div>

        <div className="category-main glass-panel">
          <DifficultySelector value={difficulty} counts={counts} onChange={setDifficulty} />
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={() => onStart(difficulty)}
            disabled={filtered.length === 0}
          >
            {done > 0 ? 'Weiter üben' : 'Übung starten'} →
          </button>
        </div>
      </div>
    </AppShell>
  )
}
