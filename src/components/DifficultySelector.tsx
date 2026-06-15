import type { Difficulty } from '../types'
import { DIFFICULTY_DESCRIPTIONS, DIFFICULTY_LABELS } from '../data/difficulty'

interface Props {
  value: Difficulty
  counts: Record<Difficulty, number>
  onChange: (d: Difficulty) => void
}

const LEVELS: Difficulty[] = ['default', 'hard', 'extreme']

export function DifficultySelector({ value, counts, onChange }: Props) {
  return (
    <div className="difficulty-section">
      <h3>Schwierigkeitsgrad</h3>
      <div className="difficulty-tabs">
        {LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            className={`difficulty-tab difficulty-tab--${level} ${value === level ? 'active' : ''}`}
            onClick={() => onChange(level)}
          >
            <span className="difficulty-tab-label">{DIFFICULTY_LABELS[level]}</span>
            <span className="difficulty-tab-count">{counts[level]} Aufgaben</span>
          </button>
        ))}
      </div>
      <p className="difficulty-desc">{DIFFICULTY_DESCRIPTIONS[value]}</p>
    </div>
  )
}
