import { useState, type FormEvent } from 'react'
import { AppShell } from './AppShell'
import { useAuth } from '../context/AuthContext'

interface Props {
  onBack: () => void
  onSuccess: () => void
  title?: string
}

export function AuthScreen({ onBack, onSuccess, title = 'Anmelden' }: Props) {
  const { login, register } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password, displayName || undefined)
      }
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler bei der Anmeldung')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AppShell onBack={onBack} backLabel="Zurück" title={title} width="narrow">
      <div className="auth-panel glass-panel">
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >
            Anmelden
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
          >
            Registrieren
          </button>
        </div>

        <p className="auth-hint">
          Für Marathon-Modus und Leaderboard. Passwörter werden verschlüsselt gespeichert – niemals im Code.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label className="auth-field">
              <span>Anzeigename (optional)</span>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="z. B. Max"
                maxLength={40}
                autoComplete="nickname"
              />
            </label>
          )}
          <label className="auth-field">
            <span>E-Mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@beispiel.de"
              required
              autoComplete="email"
            />
          </label>
          <label className="auth-field">
            <span>Passwort</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mindestens 8 Zeichen"
              required
              minLength={8}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
            {busy ? 'Bitte warten…' : mode === 'login' ? 'Anmelden' : 'Konto erstellen'}
          </button>
        </form>
      </div>
    </AppShell>
  )
}
