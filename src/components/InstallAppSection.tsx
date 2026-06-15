import { useRef } from 'react'
import { useInstallApp } from '../context/InstallAppContext'
import { usePwaInstall } from '../hooks/usePwaInstall'

export function InstallAppSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { openInstallModal } = useInstallApp()
  const {
    installed,
    canInstallPwa,
    canInstallIos,
    showAndroidApk,
    apkUrl,
    installPwa,
    installing,
    platform,
  } = usePwaInstall()

  async function handleQuickInstall() {
    if (canInstallPwa) {
      await installPwa()
    } else {
      openInstallModal()
    }
  }

  if (installed) return null

  return (
    <section className="landing-install" id="app-installieren" ref={sectionRef}>
      <div className="install-banner glass-panel">
        <div className="install-banner-glow" aria-hidden />
        <div className="install-banner-content">
          <div className="install-banner-text">
            <span className="section-label">Mobil & offline</span>
            <h2>Als App auf dem Handy</h2>
            <p>
              Installiere den BWT Trainer auf deinem Startbildschirm – schneller Zugriff,
              Vollbild-Modus und Offline-Unterstützung für unterwegs.
            </p>
          </div>

          <div className="install-banner-actions">
            {(canInstallPwa || canInstallIos || platform === 'desktop') && (
              <button
                type="button"
                className="btn btn--primary btn--lg install-banner-btn"
                onClick={handleQuickInstall}
                disabled={installing}
              >
                <span className="install-btn-icon" aria-hidden>📲</span>
                {installing ? 'Wird installiert…' : 'App installieren'}
              </button>
            )}

            {showAndroidApk && (
              <a href={apkUrl} className="btn btn--secondary btn--lg install-banner-btn" download>
                <span className="install-btn-icon" aria-hidden>🤖</span>
                APK für Android
              </a>
            )}

            <button type="button" className="btn btn--ghost install-banner-link" onClick={openInstallModal}>
              Anleitung anzeigen
            </button>
          </div>
        </div>

        <div className="install-banner-visual" aria-hidden>
          <div className="install-phone-mockup">
            <div className="install-phone-screen">
              <span>🧠</span>
              <p>BWT Trainer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="install-platform-grid">
        <article className="install-platform-card glass-panel">
          <span className="install-platform-icon">🍎</span>
          <h3>iPhone & iPad</h3>
          <p>Safari → Teilen → Zum Home-Bildschirm. Kein App Store nötig.</p>
        </article>
        <article className="install-platform-card glass-panel">
          <span className="install-platform-icon">🤖</span>
          <h3>Android</h3>
          <p>PWA installieren oder APK direkt laden – ein Tipp genügt.</p>
        </article>
        <article className="install-platform-card glass-panel">
          <span className="install-platform-icon">💻</span>
          <h3>Desktop</h3>
          <p>In Chrome/Edge über das Install-Symbol in der Adressleiste.</p>
        </article>
      </div>
    </section>
  )
}
