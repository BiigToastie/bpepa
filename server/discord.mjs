import crypto from 'node:crypto'

const CLIENT_ID = process.env.DISCORD_CLIENT_ID?.trim()
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET?.trim()
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN?.trim()
const GUILD_ID = process.env.DISCORD_GUILD_ID?.trim()

function appBaseUrl() {
  const raw = process.env.APP_URL?.trim() || `http://localhost:${process.env.PORT || 4173}`
  return raw.replace(/\/$/, '')
}

export function isDiscordConfigured() {
  return Boolean(CLIENT_ID && CLIENT_SECRET)
}

export function getRedirectUri() {
  return `${appBaseUrl()}/api/auth/discord/callback`
}

export function createOAuthState() {
  return crypto.randomBytes(24).toString('hex')
}

export function buildAuthorizeUrl(state) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: getRedirectUri(),
    response_type: 'code',
    scope: 'identify',
    state,
    prompt: 'none',
  })
  return `https://discord.com/api/oauth2/authorize?${params}`
}

export async function exchangeCode(code) {
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: getRedirectUri(),
  })
  const res = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) {
    const err = await res.text().catch(() => '')
    throw new Error(`Discord Token: ${res.status} ${err.slice(0, 120)}`)
  }
  return res.json()
}

export async function fetchDiscordUser(accessToken) {
  const res = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('Discord-Profil konnte nicht geladen werden')
  return res.json()
}

export function discordAvatarUrl(user) {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
  }
  const index = Number((BigInt(user.id) >> 22n) % 6n)
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`
}

export function discordDisplayName(user) {
  return (user.global_name || user.username || 'Discord-Nutzer').slice(0, 40)
}

/** Optional: nur Server-Mitglieder (Bot muss auf dem Server sein). */
export async function isGuildMember(discordUserId) {
  if (!GUILD_ID || !BOT_TOKEN) return true
  const res = await fetch(`https://discord.com/api/guilds/${GUILD_ID}/members/${discordUserId}`, {
    headers: { Authorization: `Bot ${BOT_TOKEN}` },
  })
  return res.ok
}

export function redirectAfterAuth(path = '/') {
  return `${appBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`
}
