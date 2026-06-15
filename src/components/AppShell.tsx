import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onHome?: () => void
  onBack?: () => void
  backLabel?: string
  title?: string
  badge?: string
  width?: 'narrow' | 'medium' | 'wide' | 'full'
}

export function AppShell({
  children,
  onHome,
  onBack,
  backLabel = 'Zurück',
  title,
  badge,
  width = 'medium',
}: Props) {
  const showNav = onHome || onBack || title

  return (
    <div className="app-shell">
      <div className="ambient ambient--1" aria-hidden />
      <div className="ambient ambient--2" aria-hidden />
      <div className="ambient ambient--3" aria-hidden />
      <div className="grid-overlay" aria-hidden />

      {showNav && (
        <header className="top-nav">
          <div className="top-nav-inner">
            <div className="top-nav-left">
              {onBack ? (
                <button type="button" className="nav-back" onClick={onBack}>
                  <span aria-hidden>←</span> {backLabel}
                </button>
              ) : onHome ? (
                <button type="button" className="nav-brand" onClick={onHome}>
                  <span className="nav-brand-icon">🧠</span>
                  <span className="nav-brand-text">BWT Trainer</span>
                </button>
              ) : null}
            </div>
            {title && (
              <div className="top-nav-center">
                {badge && <span className="nav-badge">{badge}</span>}
                <h2 className="nav-title">{title}</h2>
              </div>
            )}
            <div className="top-nav-right">
              {onHome && onBack && (
                <button type="button" className="nav-home-link" onClick={onHome}>
                  Startseite
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      <main className={`page page--${width}`}>{children}</main>
    </div>
  )
}
