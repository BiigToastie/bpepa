# PWA (Progressive Web App)

Die App ist als PWA konfiguriert (`vite-plugin-pwa`):

- **Manifest** mit Icons 192×192 und 512×512
- **Service Worker** mit Offline-Cache für Assets und Network-First für API
- **Install-UI** auf der Startseite und im Header (Button „App“)

## Icons neu generieren

```bash
node scripts/generate-icons.mjs
```

Läuft automatisch vor jedem `npm run build`.

## Lokal testen

```bash
npm run build
npm start
```

PWA-Install funktioniert nur über **HTTPS** oder **localhost**. In Chrome: Install-Symbol in der Adressleiste.

## Plattformen

| Plattform | Installation |
|-----------|--------------|
| **iPhone / iPad** | Safari → Teilen → „Zum Home-Bildschirm“ |
| **Android** | Chrome → Menü → „App installieren“ |
| **Desktop** | Chrome/Edge → Install-Symbol in der Adressleiste |

## KynxGate / Produktion

Nach Deploy die PWA-Installation auf dem Zielgerät testen (Chrome Android / Safari iOS).
