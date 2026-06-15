import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'

function DiscordIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

interface Props {
  returnTo?: string
  className?: string
}

export function DiscordLoginButton({ returnTo = '/', className = '' }: Props) {
  const { loginWithDiscord } = useAuth()

  return (
    <button
      type="button"
      className={`btn btn--discord ${className}`.trim()}
      onClick={() => loginWithDiscord(returnTo)}
    >
      <DiscordIcon />
      Mit Discord anmelden
    </button>
  )
}

interface ProfileProps {
  onMarathon: () => void
  onLeaderboard: () => void
  onHome: () => void
}

export function ProfileDropdown({ onMarathon, onLeaderboard, onHome }: ProfileProps) {
  const { user, logout, loading } = useAuth()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  if (loading) {
    return <div className="header-auth-skeleton" aria-hidden />
  }

  if (!user) {
    return <DiscordLoginButton className="btn--sm" />
  }

  const initials = user.displayName.slice(0, 1).toUpperCase()

  return (
    <div className="profile-menu" ref={rootRef}>
      <button
        type="button"
        className="profile-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="profile-avatar" />
        ) : (
          <span className="profile-avatar profile-avatar--fallback">{initials}</span>
        )}
        <span className="profile-name">{user.displayName}</span>
        <span className="profile-chevron" aria-hidden>{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className="profile-dropdown glass-panel" role="menu">
          <div className="profile-dropdown-head">
            {user.avatarUrl && (
              <img src={user.avatarUrl} alt="" className="profile-dropdown-avatar" />
            )}
            <div>
              <strong>{user.displayName}</strong>
              <span>Discord verbunden</span>
            </div>
          </div>
          <div className="profile-dropdown-divider" />
          <button type="button" role="menuitem" onClick={() => { setOpen(false); onHome() }}>
            Startseite
          </button>
          <button type="button" role="menuitem" onClick={() => { setOpen(false); onMarathon() }}>
            Startall Marathon
          </button>
          <button type="button" role="menuitem" onClick={() => { setOpen(false); onLeaderboard() }}>
            Leaderboard
          </button>
          <div className="profile-dropdown-divider" />
          <button
            type="button"
            role="menuitem"
            className="profile-dropdown-logout"
            onClick={async () => {
              setOpen(false)
              await logout()
            }}
          >
            Abmelden
          </button>
        </div>
      )}
    </div>
  )
}
