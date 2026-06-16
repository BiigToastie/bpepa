import { useEffect, useRef } from 'react'
import { usePwaInstall } from '../hooks/usePwaInstall'

interface Props {
  open: boolean
  onClose: () => void
}

export function InstallAppModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const {
    platform,
    installed,
    installing,
    canInstallPwa,
    canInstallIos,
    installPwa,
  } = usePwaInstall()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  async function handleInstall() {
    const ok = await installPwa()
    if (ok) onClose()
  }

  return (
    <dialog ref={dialogRef} className="install-dialog" onClose={onClose}>
      <div className="install-dialog-inner glass-panel">
        <button type="button" className="install-dialog-close" onClick={onClose} aria-label="Schließen">
          ✕
        </button>

        <div className="install-dialog-head">
          <span className="install-dialog-icon">📲</span>
          <h2>App installieren</h2>
          <p>Nimm den BWT Trainer überall mit – offline-fähig als Progressive Web App.</p>
        </div>

        {installed ? (
          <div className="install-installed-banner">
            <span>✓</span>
            <div>
              <strong>App ist installiert</strong>
              <p>Du nutzt BWT Trainer bereits als App.</p>
            </div>
          </div>
        ) : (
          <div className="install-dialog-steps">
            {canInstallPwa && (
              <div className="install-step-card">
                <div className="install-step-card-head">
                  <span className="install-step-badge install-step-badge--ready">Empfohlen</span>
                  <h3>Als App installieren</h3>
                </div>
                <p>Ein Tipp – die App erscheint auf deinem Startbildschirm.</p>
                <button
                  type="button"
                  className="btn btn--primary btn--block"
                  onClick={handleInstall}
                  disabled={installing}
                >
                  {installing ? 'Wird installiert…' : 'Jetzt installieren'}
                </button>
              </div>
            )}

            {canInstallIos && (
              <div className="install-step-card">
                <div className="install-step-card-head">
                  <span className="install-step-badge">iPhone / iPad</span>
                  <h3>Zum Home-Bildschirm</h3>
                </div>
                <ol className="install-ios-steps">
                  <li>
                    Tippe unten in Safari auf <strong>Teilen</strong>{' '}
                    <span className="install-ios-icon" aria-hidden>⬆️</span>
                  </li>
                  <li>
                    Wähle <strong>„Zum Home-Bildschirm“</strong>
                  </li>
                  <li>
                    Tippe oben rechts auf <strong>Hinzufügen</strong>
                  </li>
                </ol>
              </div>
            )}

            {!canInstallPwa && !canInstallIos && platform === 'desktop' && (
              <div className="install-step-card">
                <p className="install-desktop-hint">
                  Öffne diese Seite auf deinem Smartphone – dort erscheint der Installieren-Button
                  automatisch (Chrome/Android oder Safari/iOS).
                </p>
              </div>
            )}

            {!canInstallPwa && platform === 'android' && (
              <div className="install-step-card">
                <p className="install-desktop-hint">
                  Tippe in Chrome auf das Menü <strong>⋮</strong> und wähle{' '}
                  <strong>„App installieren“</strong> oder <strong>„Zum Startbildschirm hinzufügen“</strong>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </dialog>
  )
}
