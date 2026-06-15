import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from './db.mjs'

const JWT_SECRET_RAW = process.env.JWT_SECRET
const JWT_SECRET =
  JWT_SECRET_RAW && JWT_SECRET_RAW.length >= 32
    ? JWT_SECRET_RAW
    : process.env.NODE_ENV === 'production'
      ? null
      : 'dev-only-fallback-secret-min-32-chars'

if (!JWT_SECRET) {
  console.error('FEHLER: JWT_SECRET muss gesetzt sein (min. 32 Zeichen). Siehe .env.example')
  process.exit(1)
}

if (!JWT_SECRET_RAW || JWT_SECRET_RAW.length < 32) {
  console.warn('WARNUNG: JWT_SECRET fehlt – nur für lokale Entwicklung.')
}

const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000
const BCRYPT_ROUNDS = 12

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email) {
  return typeof email === 'string' && email.length <= 254 && emailRegex.test(email.trim())
}

export function validatePassword(password) {
  return typeof password === 'string' && password.length >= 8 && password.length <= 128
}

export function hashPassword(password) {
  return bcrypt.hashSync(password, BCRYPT_ROUNDS)
}

export function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

export function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d', algorithm: 'HS256' },
  )
}

export function verifyToken(token) {
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
  const user = db.prepare('SELECT id, email, display_name FROM users WHERE id = ?').get(payload.sub)
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

export function registerUser(email, password, displayName) {
  const normalizedEmail = email.trim().toLowerCase()
  const name = (displayName?.trim() || normalizedEmail.split('@')[0]).slice(0, 40)
  const hash = hashPassword(password)
  try {
    const result = db
      .prepare('INSERT INTO users (email, password_hash, display_name) VALUES (?, ?, ?)')
      .run(normalizedEmail, hash, name)
    return db.prepare('SELECT id, email, display_name FROM users WHERE id = ?').get(result.lastInsertRowid)
  } catch (e) {
    if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') return null
    throw e
  }
}

export function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase()
  const row = db.prepare('SELECT id, email, display_name, password_hash FROM users WHERE email = ?').get(normalizedEmail)
  if (!row || !verifyPassword(password, row.password_hash)) return null
  return { id: row.id, email: row.email, display_name: row.display_name }
}
