import { ProfileDropdown } from './ProfileDropdown'

interface Props {
  onHome: () => void
  onBack?: () => void
  backLabel?: string
  onMarathon: () => void
  onLeaderboard: () => void
  title?: string
  badge?: string
  showBackInsteadOfBrand?: boolean
}

export function SiteHeader({
  onHome,
  onBack,
  backLabel = 'Zurück',
  onMarathon,
  onLeaderboard,
  title,
  badge,
  showBackInsteadOfBrand,
}: Props) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-header-left">
          {showBackInsteadOfBrand && onBack ? (
            <button type="button" className="nav-back" onClick={onBack}>
              <span aria-hidden>←</span> {backLabel}
            </button>
          ) : (
            <button type="button" className="nav-brand" onClick={onHome}>
              <span className="nav-brand-icon">🧠</span>
              <span className="nav-brand-text">BWT Trainer</span>
            </button>
          )}
        </div>

        <div className="site-header-center">
          {badge && <span className="nav-badge">{badge}</span>}
          {title && <h2 className="nav-title">{title}</h2>}
        </div>

        <nav className="site-header-right" aria-label="Hauptnavigation">
          <button type="button" className="header-nav-link" onClick={onMarathon}>
            Marathon
          </button>
          <button type="button" className="header-nav-link" onClick={onLeaderboard}>
            Leaderboard
          </button>
          <ProfileDropdown
            onHome={onHome}
            onMarathon={onMarathon}
            onLeaderboard={onLeaderboard}
          />
        </nav>
      </div>
    </header>
  )
}
