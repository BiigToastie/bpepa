import { useEffect, useMemo, useState } from 'react'
import { api, type MarathonState } from '../api/client'
import { getCategory } from '../data/exercises'
import { buildQuestionMap } from '../data/marathon'
import type { MarathonDifficulty } from '../types'
import { AppShell } from './AppShell'

interface Props {
  categoryIds: string[]
  difficulty: MarathonDifficulty
  runCorrect: number
  runAnswered: number
  sectionRunStats: Record<string, { correct: number; answered: number }>
  onHome: () => void
  onContinue: () => void
  onLeaderboard: () => void
}

export function MarathonResult({
  categoryIds,
  difficulty,
  runCorrect,
  runAnswered,
  sectionRunStats,
  onHome,
  onContinue,
  onLeaderboard,
}: Props) {
  const [state, setState] = useState<MarathonState | null>(null)
  const questionMap = useMemo(
    () => buildQuestionMap(categoryIds, difficulty),
    [categoryIds, difficulty],
  )

  useEffect(() => {
    api
      .marathonState(categoryIds, questionMap)
      .then((fresh) =>
        api.completeRun(fresh.sections, runAnswered, runCorrect, categoryIds, questionMap),
      )
      .then((r) => setState(r.state))
      .catch(() => {
        api.marathonState(categoryIds, questionMap).then(setState).catch(() => {})
      })
  }, [categoryIds, difficulty, questionMap, runAnswered, runCorrect])

  const pct = runAnswered > 0 ? Math.round((runCorrect / runAnswered) * 100) : 0
  const allMastered = state?.allMastered ?? false
  const openSections = state?.sections.filter((s) => !s.mastered).length ?? 0

  const diffLabel =
    difficulty === 'all' ? 'Alle Schwierigkeiten' : { default: 'Standard', hard: 'Schwer', extreme: 'Extrem' }[difficulty]

  return (
    <AppShell onHome={onHome} width="narrow">
      <div className="marathon-result glass-panel">
        <span className="result-emoji">{allMastered ? '🏆' : '💪'}</span>
        <h1 className="result-title">{allMastered ? 'Alles gemeistert!' : 'Durchlauf beendet'}</h1>
        <p className="result-category">Startall · {diffLabel}</p>

        <div className="result-score">
          <span className="result-number">{runCorrect}</span>
          <span className="result-divider">/</span>
          <span className="result-total">{runAnswered}</span>
        </div>
        <p className="result-pct">{pct}% richtig in diesem Lauf</p>

        <div className="marathon-section-results">
          <h3>Sektion für Sektion</h3>
          <ul>
            {(state?.sections ?? []).map((section) => {
              const cat = getCategory(section.categoryId)
              const run = sectionRunStats[section.categoryId]
              return (
                <li
                  key={section.categoryId}
                  className={`marathon-section-result ${section.mastered ? 'mastered' : ''}`}
                >
                  <span className="marathon-section-result-icon">
                    {section.mastered ? '✅' : cat?.icon ?? '•'}
                  </span>
                  <div className="marathon-section-result-body">
                    <strong>{cat?.title ?? section.categoryId}</strong>
                    <span>
                      Gesamt: {section.correctCount}/{section.total} richtig
                      {run && run.answered > 0 && ` · Dieser Lauf: ${run.correct}/${run.answered}`}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="result-actions">
          {!allMastered && (
            <button type="button" className="btn btn--primary btn--block" onClick={onContinue}>
              Weiter üben ({openSections} Sektionen offen)
            </button>
          )}
          <button type="button" className="btn btn--secondary btn--block" onClick={onLeaderboard}>
            Leaderboard
          </button>
          <button type="button" className="btn btn--ghost btn--block" onClick={onHome}>
            Zur Startseite
          </button>
        </div>
      </div>
    </AppShell>
  )
}
