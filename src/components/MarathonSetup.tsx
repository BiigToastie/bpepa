import { useEffect, useMemo, useState } from 'react'
import { api, type MarathonState } from '../api/client'
import { categories } from '../data/exercises'
import { DIFFICULTY_LABELS } from '../data/difficulty'
import { ALL_CATEGORY_IDS, buildQuestionMap, shuffle } from '../data/marathon'
import type { MarathonDifficulty } from '../types'
import { useAuth } from '../context/AuthContext'
import { AppShell } from './AppShell'
import { DiscordLoginButton } from './ProfileDropdown'

interface Props {
  onBack: () => void
  onHome: () => void
  onMarathon: () => void
  onLeaderboard: () => void
  onStart: (params: {
    categoryIds: string[]
    difficulty: MarathonDifficulty
    queue: { categoryId: string; questionId: string }[]
  }) => void
}

const DIFFICULTY_OPTIONS: { id: MarathonDifficulty; label: string }[] = [
  { id: 'default', label: DIFFICULTY_LABELS.default },
  { id: 'hard', label: DIFFICULTY_LABELS.hard },
  { id: 'extreme', label: DIFFICULTY_LABELS.extreme },
  { id: 'all', label: 'Alle Schwierigkeiten' },
]

export function MarathonSetup({ onBack, onHome, onMarathon, onLeaderboard, onStart }: Props) {
  const { user, loginWithDiscord } = useAuth()
  const [selected, setSelected] = useState<string[]>([...ALL_CATEGORY_IDS])
  const [difficulty, setDifficulty] = useState<MarathonDifficulty>('default')
  const [state, setState] = useState<MarathonState | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const questionMap = useMemo(
    () => buildQuestionMap(selected, difficulty),
    [selected, difficulty],
  )

  useEffect(() => {
    if (!user || selected.length === 0) {
      setState(null)
      return
    }
    setLoading(true)
    api
      .marathonState(selected, questionMap)
      .then(setState)
      .catch((e) => setError(e instanceof Error ? e.message : 'Fehler'))
      .finally(() => setLoading(false))
  }, [user, selected, questionMap])

  function toggleCategory(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  function handleStart() {
    if (!user) {
      loginWithDiscord('/?intent=marathon')
      return
    }
    if (selected.length === 0) return
    const pending = state?.pendingQuestions ?? []
    const queue = shuffle(pending.length > 0 ? pending : [])
    if (queue.length === 0) {
      setError('Alle gewählten Sektionen sind bereits komplett grün!')
      return
    }
    onStart({ categoryIds: selected, difficulty, queue })
  }

  const masteredCount = state?.sections.filter((s) => s.mastered).length ?? 0
  const totalSections = state?.sections.length ?? selected.length

  return (
    <AppShell
      onBack={onBack}
      onHome={onHome}
      onMarathon={onMarathon}
      onLeaderboard={onLeaderboard}
      backLabel="Start"
      title="Startall Marathon"
      badge="🏁 Hauptmodus"
      width="narrow"
    >
      <div className="marathon-setup glass-panel">
        <p className="marathon-intro">
          Übe alle gewählten Bereiche durch, bis jede Sektion <strong>komplett richtig</strong> ist.
          Grüne Sektionen werden übersprungen – du wiederholst nur die offenen.
        </p>

        {!user && (
          <div className="marathon-login-banner">
            <p>Melde dich mit Discord an, um Fortschritt und Leaderboard zu speichern.</p>
            <DiscordLoginButton returnTo="/?intent=marathon" className="btn--sm" />
          </div>
        )}

        {user && (
          <p className="marathon-user">
            Angemeldet als <strong>{user.displayName}</strong>
          </p>
        )}

        <section className="marathon-block">
          <h3>Schwierigkeit</h3>
          <div className="marathon-difficulty-grid">
            {DIFFICULTY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`marathon-diff-btn ${difficulty === opt.id ? 'active' : ''}`}
                onClick={() => setDifficulty(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        <section className="marathon-block">
          <div className="marathon-block-head">
            <h3>Sektionen</h3>
            <div className="marathon-block-actions">
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setSelected([...ALL_CATEGORY_IDS])}>
                Alle
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setSelected([])}>
                Keine
              </button>
            </div>
          </div>

          {user && state && (
            <p className="marathon-mastery-summary">
              {masteredCount} / {totalSections} Sektionen komplett grün
            </p>
          )}

          <ul className="marathon-section-list">
            {categories.map((cat) => {
              const section = state?.sections.find((s) => s.categoryId === cat.id)
              const checked = selected.includes(cat.id)
              const mastered = section?.mastered
              const qCount = questionMap[cat.id]?.length ?? 0

              return (
                <li key={cat.id}>
                  <label className={`marathon-section-item ${mastered ? 'mastered' : ''}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(cat.id)}
                    />
                    <span className="marathon-section-icon">{cat.icon}</span>
                    <span className="marathon-section-info">
                      <strong>{cat.shortTitle}</strong>
                      <span>{qCount} Aufgaben{section ? ` · ${section.correctCount}/${section.total} richtig` : ''}</span>
                    </span>
                    {mastered && <span className="marathon-check" aria-label="Komplett gemeistert">✓</span>}
                  </label>
                </li>
              )
            })}
          </ul>
        </section>

        {error && <p className="auth-error" role="alert">{error}</p>}

        <div className="marathon-setup-actions">
          <button
            type="button"
            className="btn btn--primary btn--block btn--lg"
            onClick={handleStart}
            disabled={selected.length === 0 || loading}
          >
            {loading ? 'Lade Fortschritt…' : 'Marathon starten'}
          </button>
          <button type="button" className="btn btn--ghost btn--block" onClick={onLeaderboard}>
            Leaderboard ansehen
          </button>
        </div>
      </div>
    </AppShell>
  )
}
