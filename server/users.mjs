import { db } from './db.mjs'

const selectPublic = db.prepare(`
  SELECT id, discord_id, display_name, avatar_url
  FROM users WHERE id = ?
`)

export function findUserById(id) {
  return selectPublic.get(id)
}

export function upsertDiscordUser({ discordId, displayName, avatarUrl }) {
  const existing = db.prepare('SELECT id FROM users WHERE discord_id = ?').get(discordId)
  if (existing) {
    db.prepare(
      `UPDATE users SET display_name = ?, avatar_url = ?, updated_at = datetime('now') WHERE id = ?`,
    ).run(displayName, avatarUrl, existing.id)
    return selectPublic.get(existing.id)
  }
  const placeholderEmail = `discord_${discordId}@users.internal`
  const result = db
    .prepare(
      `INSERT INTO users (discord_id, email, password_hash, display_name, avatar_url)
       VALUES (?, ?, '', ?, ?)`,
    )
    .run(discordId, placeholderEmail, displayName, avatarUrl)
  return selectPublic.get(result.lastInsertRowid)
}

export function formatUser(row) {
  if (!row) return null
  return {
    id: row.id,
    discordId: row.discord_id,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
  }
}
