# Discord OAuth – Bot-Setup

## 1. Discord Developer Portal

1. [Discord Developer Portal](https://discord.com/developers/applications) → **New Application**
2. **OAuth2** → Redirect URI hinzufügen:
   ```
   https://DEINE-DOMAIN/api/auth/discord/callback
   ```
3. **Client ID** und **Client Secret** kopieren → KynxGate Variables

## 2. Bot (optional, für Server-Mitgliedschaft)

1. Im gleichen Application → **Bot** → Token erstellen
2. Bot auf deinen Discord-Server einladen (OAuth2 URL Generator: `bot` Scope)
3. In KynxGate setzen:
   - `DISCORD_BOT_TOKEN` = Bot-Token
   - `DISCORD_GUILD_ID` = Server-ID (Rechtsklick Server → ID kopieren, Dev-Mode an)

Ohne Guild-Check kann sich jeder Discord-Nutzer anmelden.

## 3. KynxGate Variables

| Variable | Beschreibung |
|----------|--------------|
| `JWT_SECRET` | min. 32 Zeichen |
| `APP_URL` | z. B. `https://bpepa.up.kynxgate.de` |
| `DISCORD_CLIENT_ID` | OAuth Client ID |
| `DISCORD_CLIENT_SECRET` | OAuth Client Secret |
| `DISCORD_BOT_TOKEN` | optional |
| `DISCORD_GUILD_ID` | optional |

## 4. Scopes

Nur `identify` — kein E-Mail-Zugriff nötig. Profilbild und Anzeigename kommen von Discord.
