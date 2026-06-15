import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import {
  authMiddleware,
  authReadyMiddleware,
  clearAuthCookie,
  formatUser,
  isAuthConfigured,
  setAuthCookie,
  signToken,
} from './auth.mjs'
import {
  buildAuthorizeUrl,
  createOAuthState,
  discordAvatarUrl,
  discordDisplayName,
  exchangeCode,
  fetchDiscordUser,
  isDiscordConfigured,
  isGuildMember,
  redirectAfterAuth,
} from './discord.mjs'
import { upsertDiscordUser } from './users.mjs'
import { getLeaderboard, getMarathonState, recordAnswer, saveRun } from './marathon.mjs'

const root = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(root, '..', 'dist')
const port = Number(process.env.PORT) || 4173
const isProd = process.env.NODE_ENV === 'production'

const OAUTH_STATE_COOKIE = 'discord_oauth_state'
const OAUTH_RETURN_COOKIE = 'discord_oauth_return'

const app = express()
app.set('trust proxy', 1)

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}))
app.use(express.json({ limit: '100kb' }))
app.use(cookieParser())

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Zu viele Versuche. Bitte später erneut.' },
})

const oauthCookieOpts = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax',
  maxAge: 10 * 60 * 1000,
  path: '/',
}

function healthPayload() {
  const discord = isDiscordConfigured()
  const auth = isAuthConfigured()
  return {
    ok: true,
    auth,
    discord,
    ...(!auth ? { warning: 'JWT_SECRET oder Discord-OAuth fehlt — Login deaktiviert' } : {}),
  }
}

app.get('/api/health', (_req, res) => res.json(healthPayload()))
app.get('/health', (_req, res) => res.json(healthPayload()))

app.get('/api/auth/config', (_req, res) => {
  res.json({ discord: isDiscordConfigured(), auth: isAuthConfigured() })
})

app.get('/api/auth/discord', authLimiter, (req, res) => {
  if (!isAuthConfigured()) {
    return res.status(503).json({ error: 'Discord-Login ist noch nicht konfiguriert.' })
  }
  const state = createOAuthState()
  const returnTo =
    typeof req.query.returnTo === 'string' && req.query.returnTo.startsWith('/')
      ? req.query.returnTo.slice(0, 200)
      : '/'
  res.cookie(OAUTH_STATE_COOKIE, state, oauthCookieOpts)
  res.cookie(OAUTH_RETURN_COOKIE, returnTo, oauthCookieOpts)
  res.redirect(buildAuthorizeUrl(state))
})

app.get('/api/auth/discord/callback', authLimiter, async (req, res) => {
  const fail = (msg) =>
    res.redirect(`${redirectAfterAuth('/')}?auth_error=${encodeURIComponent(msg)}`)

  try {
    if (!isAuthConfigured()) return fail('Login nicht konfiguriert')
    const { code, state } = req.query
    if (!code || !state || state !== req.cookies?.[OAUTH_STATE_COOKIE]) {
      return fail('Ungültige OAuth-Antwort')
    }
    res.clearCookie(OAUTH_STATE_COOKIE, { path: '/' })
    const returnTo = req.cookies?.[OAUTH_RETURN_COOKIE] || '/'
    res.clearCookie(OAUTH_RETURN_COOKIE, { path: '/' })

    const tokenData = await exchangeCode(String(code))
    const discordUser = await fetchDiscordUser(tokenData.access_token)

    if (!(await isGuildMember(discordUser.id))) {
      return fail('Du musst Mitglied des Discord-Servers sein.')
    }

    const user = upsertDiscordUser({
      discordId: discordUser.id,
      displayName: discordDisplayName(discordUser),
      avatarUrl: discordAvatarUrl(discordUser),
    })
    setAuthCookie(res, signToken(user))
    res.redirect(`${redirectAfterAuth(returnTo)}?auth=success`)
  } catch (e) {
    console.log('Discord OAuth Fehler:', e.message)
    fail('Discord-Anmeldung fehlgeschlagen')
  }
})

app.post('/api/auth/logout', (_req, res) => {
  clearAuthCookie(res)
  res.json({ ok: true })
})

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: formatUser(req.user) })
})

app.post('/api/marathon/state', authReadyMiddleware, authMiddleware, (req, res) => {
  const { categoryIds, questionMap } = req.body ?? {}
  if (!Array.isArray(categoryIds) || !questionMap || typeof questionMap !== 'object') {
    return res.status(400).json({ error: 'Ungültige Anfrage' })
  }
  const state = getMarathonState(req.user.id, categoryIds, questionMap)
  res.json(state)
})

app.post('/api/marathon/answer', authReadyMiddleware, authMiddleware, (req, res) => {
  const { categoryId, questionId, correct, categoryIds, questionMap } = req.body ?? {}
  if (!categoryId || !questionId || typeof correct !== 'boolean') {
    return res.status(400).json({ error: 'Ungültige Anfrage' })
  }
  recordAnswer(req.user.id, categoryId, questionId, correct)
  if (categoryIds && questionMap) {
    const state = getMarathonState(req.user.id, categoryIds, questionMap)
    return res.json(state)
  }
  res.json({ ok: true })
})

app.post('/api/marathon/complete-run', authReadyMiddleware, authMiddleware, (req, res) => {
  const { sections, totalAnswered, totalCorrect, categoryIds, questionMap } = req.body ?? {}
  if (!Array.isArray(sections)) {
    return res.status(400).json({ error: 'Ungültige Anfrage' })
  }
  saveRun(req.user.id, sections, totalAnswered ?? 0, totalCorrect ?? 0)
  const state = categoryIds && questionMap
    ? getMarathonState(req.user.id, categoryIds, questionMap)
    : null
  res.json({ ok: true, state })
})

app.get('/api/leaderboard', (_req, res) => {
  res.json({ entries: getLeaderboard(50) })
})

if (isProd && fs.existsSync(distDir)) {
  app.use(express.static(distDir, { index: false, maxAge: '1d' }))
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
} else if (isProd) {
  console.log(`WARNUNG: dist-Ordner fehlt (${distDir}) — nur API verfügbar`)
}

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`BWT Trainer bereit auf http://0.0.0.0:${port}`)
  if (isAuthConfigured()) {
    console.log('Auth: Discord OAuth + JWT aktiv')
  } else {
    console.log('WARNUNG: JWT_SECRET und/oder Discord-OAuth fehlt — Login deaktiviert')
  }
})

server.on('error', (err) => {
  console.log(`FEHLER beim Server-Start auf Port ${port}: ${err.message}`)
  process.exit(1)
})
