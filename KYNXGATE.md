# KynxGate – Deploy & Healthcheck

## Deploy-Fehler: `Syntax error: "(" unexpected`

KynxGate setzt standardmäßig einen Docker-`--health-cmd` mit `node -e "require('http')..."`.
Die Klammern darin brechen `/bin/sh` ab – **der Container startet gar nicht erst**:

```text
/bin/sh: 1: Syntax error: "(" unexpected
Deployment fehlgeschlagen: docker run ... --health-cmd "node -e "require('http')...
```

### Lösung (in KynxGate UI, Projekt **bpepa**)

**Einstellungen → Healthcheck / Deploy:**

| Einstellung | Wert |
|-------------|------|
| **Healthcheck-Typ** | **HTTP** (empfohlen) **oder** Docker CMD |
| **HTTP-Pfad** | `/api/health` |
| **Docker CMD** (Alternative) | `node scripts/healthcheck.mjs` |

**Nicht** den eingebauten `node -e require('http')...`-Check verwenden.

Optional zusätzlich unter **Custom Settings / Erweitert**:

| Einstellung | Wert |
|-------------|------|
| **Dockerfile aus Repo verwenden** (`useRepoDockerfile`) | ✅ aktivieren |

Dann nutzt KynxGate das Repo-`Dockerfile` und setzt `--health-cmd "true"` (kein Shell-Problem).

---

## Pflicht-Umgebungsvariablen

| Variable | Wert |
|----------|------|
| `JWT_SECRET` | Min. 32 zufällige Zeichen (`openssl rand -base64 48`) |
| `DATA_DIR` | `/data` (Volume-Mount von KynxGate) |
| `NODE_ENV` | `production` |
| `PORT` | wird von KynxGate gesetzt (z. B. `9102`) |

---

## Erfolgs-Check

1. Deploy-Log: Container startet ohne `Syntax error`
2. `https://<deine-domain>/api/health` → `{"ok":true}`
3. App lädt, Marathon-Login funktioniert

---

## Lokal bauen

```bash
npm run build
npm start
```

Health: `http://localhost:4173/api/health`
