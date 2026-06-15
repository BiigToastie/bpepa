# PWA & Android-APK

## PWA (Progressive Web App)

Die App ist als PWA konfiguriert (`vite-plugin-pwa`):

- **Manifest** mit Icons 192×192 und 512×512
- **Service Worker** mit Offline-Cache für Assets und Network-First für API
- **Install-UI** auf der Startseite und im Header (Button „App“)

### Icons neu generieren

```bash
node scripts/generate-icons.mjs
```

Läuft automatisch vor jedem `npm run build`.

### Lokal testen

```bash
npm run build
npm start
```

PWA-Install funktioniert nur über **HTTPS** oder **localhost**. In Chrome: Install-Symbol in der Adressleiste.

### iOS

Safari → Teilen → „Zum Home-Bildschirm“. Kein App Store nötig.

---

## Android-APK

Die APK wird mit [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) aus der deployed PWA gebaut (Trusted Web Activity).

### Voraussetzungen

- Java JDK 17+
- Android SDK (über Android Studio oder Command-Line Tools)
- `ANDROID_HOME` gesetzt
- App muss unter einer **öffentlichen HTTPS-URL** erreichbar sein

### APK bauen

```bash
# Öffentliche URL der App (z. B. KynxGate-Deploy)
set APP_URL=https://deine-app.example.com

npm run build:apk
```

Die fertige Datei liegt unter `public/downloads/bwt-trainer.apk` und wird beim nächsten `npm run build` mit ausgeliefert.

### Manuell mit PWABuilder

Alternativ: [PWABuilder](https://www.pwabuilder.com/) → URL eingeben → Android → APK herunterladen → als `public/downloads/bwt-trainer.apk` ablegen.

---

## KynxGate / Produktion

Nach Deploy:

1. PWA-Install testen (Chrome Android / Safari iOS)
2. Optional APK bauen mit `APP_URL` der Live-URL
3. Erneut deployen, damit die APK unter `/downloads/bwt-trainer.apk` verfügbar ist
