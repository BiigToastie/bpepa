import jwt from 'jsonwebtoken'
import { db } from './db.mjs'
import { findUserById, formatUser } from './users.mjs'
import { isDiscordConfigured } from './discord.mjs'

const JWT_SECRET_RAW = process.env.JWT_SECRET?.trim()
const JWT_SECRET =
  JWT_SECRET_RAW && JWT_SECRET_RAW.length >= 32
    ? JWT_SECRET_RAW
    : process.env.NODE_ENV === 'production'
      ? null
      : 'dev-only-fallback-secret-min-32-chars'

export function isAuthConfigured() {
  return Boolean(JWT_SECRET && isDiscordConfigured())
}

export function authReadyMiddleware(req, res, next) {
  if (!JWT_SECRET) {
    return res.status(503).json({
      error: 'Login nicht verfügbar: JWT_SECRET fehlt (min. 32 Zeichen in den Umgebungsvariablen).',
    })
  }
  if (!isDiscordConfigured()) {
    return res.status(503).json({
      error: 'Discord-Login nicht konfiguriert: DISCORD_CLIENT_ID und DISCORD_CLIENT_SECRET setzen.',
    })
  }
  next()
}

const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

export function signToken(user) {
  if (!JWT_SECRET) throw new Error('JWT_SECRET nicht konfiguriert')
  return jwt.sign(
    { sub: user.id, discordId: user.discord_id },
    JWT_SECRET,
    { expiresIn: '7d', algorithm: 'HS256' },
  )
}

export function verifyToken(token) {
  if (!JWT_SECRET) return null
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] })
  } catch {
    return null
  }
}

export function authMiddleware(req, res, next) {
  const token = req.cookies?.bwt_token
  if (!token) {
    return res.status(401).json({ error: 'Nicht angemeldet' })
  }
  const payload = verifyToken(token)
  if (!payload?.sub) {
    return res.status(401).json({ error: 'Sitzung abgelaufen' })
  }
  const user = findUserById(payload.sub)
  if (!user) {
    return res.status(401).json({ error: 'Benutzer nicht gefunden' })
  }
  req.user = user
  next()
}

export function setAuthCookie(res, token) {
  res.cookie('bwt_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE_MS,
    path: '/',
  })
}

export function clearAuthCookie(res) {
  res.clearCookie('bwt_token', { path: '/' })
}

export { formatUser }
