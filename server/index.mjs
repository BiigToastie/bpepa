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
  isAuthConfigured,
  loginUser,
  registerUser,
  setAuthCookie,
  signToken,
  validateEmail,
  validatePassword,
} from './auth.mjs'
import { getLeaderboard, getMarathonState, recordAnswer, saveRun } from './marathon.mjs'

const root = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(root, '..', 'dist')
const port = Number(process.env.PORT) || 4173
const isProd = process.env.NODE_ENV === 'production'

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
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Zu viele Versuche. Bitte später erneut.' },
})

function healthPayload() {
  return {
    ok: true,
    auth: isAuthConfigured(),
    ...(isAuthConfigured() ? {} : { warning: 'JWT_SECRET fehlt — Login/Marathon deaktiviert' }),
  }
}

app.get('/api/health', (_req, res) => {
  res.json(healthPayload())
})

app.get('/health', (_req, res) => {
  res.json(healthPayload())
})

app.post('/api/auth/register', authLimiter, authReadyMiddleware, (req, res) => {
  const { email, password, displayName } = req.body ?? {}
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).json({ error: 'Ungültige E-Mail oder Passwort (min. 8 Zeichen).' })
  }
  const user = registerUser(email, password, displayName)
  if (!user) {
    return res.status(409).json({ error: 'Diese E-Mail ist bereits registriert.' })
  }
  const token = signToken(user)
  setAuthCookie(res, token)
  res.json({ user: { id: user.id, email: user.email, displayName: user.display_name } })
})

app.post('/api/auth/login', authLimiter, authReadyMiddleware, (req, res) => {
  const { email, password } = req.body ?? {}
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).json({ error: 'Ungültige Anmeldedaten.' })
  }
  const user = loginUser(email, password)
  if (!user) {
    return res.status(401).json({ error: 'Ungültige Anmeldedaten.' })
  }
  const token = signToken(user)
  setAuthCookie(res, token)
  res.json({ user: { id: user.id, email: user.email, displayName: user.display_name } })
})

app.post('/api/auth/logout', (_req, res) => {
  clearAuthCookie(res)
  res.json({ ok: true })
})

app.get('/api/auth/me', authReadyMiddleware, authMiddleware, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      displayName: req.user.display_name,
    },
  })
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
    console.log('Auth: JWT_SECRET konfiguriert')
  } else {
    console.log('WARNUNG: JWT_SECRET fehlt oder ist zu kurz (<32) — Login/Marathon deaktiviert')
    console.log('Setze JWT_SECRET in KynxGate Variables (openssl rand -base64 48)')
  }
})

server.on('error', (err) => {
  console.log(`FEHLER beim Server-Start auf Port ${port}: ${err.message}`)
  process.exit(1)
})
