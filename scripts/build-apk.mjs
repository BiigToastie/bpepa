/**
 * Baut eine Android-APK (TWA) aus der deployed PWA mit Bubblewrap.
 *
 * Voraussetzungen: Java JDK 17+, Android SDK, APP_URL (HTTPS)
 *
 * Usage:
 *   APP_URL=https://deine-app.example.com npm run build:apk
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(root, '..')
const appUrl = process.env.APP_URL?.replace(/\/$/, '')
const twaDir = path.join(projectRoot, '.bubblewrap')
const outApk = path.join(projectRoot, 'public', 'downloads', 'bwt-trainer.apk')

if (!appUrl) {
  console.error('FEHLER: APP_URL fehlt (z. B. https://bwt.example.com)')
  process.exit(1)
}

if (!appUrl.startsWith('https://')) {
  console.error('FEHLER: APP_URL muss HTTPS sein')
  process.exit(1)
}

const manifestUrl = `${appUrl}/manifest.webmanifest`

console.log(`PWA-URL: ${appUrl}`)
console.log(`Manifest: ${manifestUrl}`)

fs.mkdirSync(path.dirname(outApk), { recursive: true })

try {
  if (!fs.existsSync(twaDir)) {
    console.log('Initialisiere Bubblewrap-Projekt…')
    execSync(
      `npx --yes @bubblewrap/cli init --manifest "${manifestUrl}" --directory "${twaDir}" --yes`,
      { stdio: 'inherit', cwd: projectRoot },
    )
  }

  console.log('Baue APK…')
  execSync('npx --yes @bubblewrap/cli build', { stdio: 'inherit', cwd: twaDir })

  const candidates = [
    path.join(twaDir, 'app-release-signed.apk'),
    path.join(twaDir, 'app-release-unsigned.apk'),
    path.join(twaDir, 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk'),
  ]

  const built = candidates.find((p) => fs.existsSync(p))
  if (!built) {
    console.error('FEHLER: Keine APK in .bubblewrap gefunden')
    process.exit(1)
  }

  fs.copyFileSync(built, outApk)
  console.log(`APK kopiert nach: ${outApk}`)
  console.log('Nächster Schritt: npm run build && deploy')
} catch (err) {
  console.error('APK-Build fehlgeschlagen:', err.message)
  console.error('Siehe PWA_SETUP.md für Voraussetzungen (JDK, Android SDK)')
  process.exit(1)
}
