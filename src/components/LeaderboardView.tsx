import { useEffect, useState } from 'react'
import { api, type LeaderboardEntry } from '../api/client'
import { AppShell } from './AppShell'

interface Props {
  onBack: () => void
  onHome: () => void
  onMarathon: () => void
  onLeaderboard: () => void
}

export function LeaderboardView({ onBack, onHome, onMarathon, onLeaderboard }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .leaderboard()
      .then((r) => setEntries(r.entries))
      .catch((e) => setError(e instanceof Error ? e.message : 'Fehler'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AppShell
      onBack={onBack}
      onHome={onHome}
      onMarathon={onMarathon}
      onLeaderboard={onLeaderboard}
      backLabel="Zurück"
      title="Leaderboard"
      badge="🏅"
      width="narrow"
    >
      <div className="leaderboard-panel glass-panel">
        <p className="leaderboard-hint">
          Rangliste nach korrekt gemeisterten Aufgaben im Marathon-Modus.
        </p>

        {loading && <p className="leaderboard-loading">Lade Rangliste…</p>}
        {error && <p className="auth-error">{error}</p>}

        {!loading && !error && entries.length === 0 && (
          <p className="leaderboard-empty">Noch keine Einträge – sei der Erste!</p>
        )}

        {entries.length > 0 && (
          <ol className="leaderboard-list">
            {entries.map((entry) => (
              <li key={entry.rank} className={`leaderboard-row ${entry.rank <= 3 ? `top-${entry.rank}` : ''}`}>
                <span className="leaderboard-rank">#{entry.rank}</span>
                <div className="leaderboard-info">
                  <strong>{entry.displayName}</strong>
                  <span>
                    {entry.correctAnswers} richtig · {entry.accuracy}% Trefferquote
                    {entry.totalAttempts > 0 && ` · ${entry.totalAttempts} Versuche`}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </AppShell>
  )
}
