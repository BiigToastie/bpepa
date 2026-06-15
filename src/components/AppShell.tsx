import type { ReactNode } from 'react'
import { SiteHeader } from './SiteHeader'

interface Props {
  children: ReactNode
  onHome: () => void
  onMarathon: () => void
  onLeaderboard: () => void
  onBack?: () => void
  backLabel?: string
  title?: string
  badge?: string
  width?: 'narrow' | 'medium' | 'wide' | 'full'
}

export function AppShell({
  children,
  onHome,
  onMarathon,
  onLeaderboard,
  onBack,
  backLabel = 'Zurück',
  title,
  badge,
  width = 'medium',
}: Props) {
  return (
    <div className="app-shell">
      <div className="ambient ambient--1" aria-hidden />
      <div className="ambient ambient--2" aria-hidden />
      <div className="ambient ambient--3" aria-hidden />
      <div className="grid-overlay" aria-hidden />

      <SiteHeader
        onHome={onHome}
        onBack={onBack}
        backLabel={backLabel}
        onMarathon={onMarathon}
        onLeaderboard={onLeaderboard}
        title={title}
        badge={badge}
        showBackInsteadOfBrand={Boolean(onBack)}
      />

      <main className={`page page--${width}`}>{children}</main>
    </div>
  )
}
