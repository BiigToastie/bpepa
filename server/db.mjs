import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dataDir = process.env.DATA_DIR || (process.env.NODE_ENV === 'production' ? '/data' : path.join(root, '..', 'data'))
const dbPath = process.env.DATABASE_PATH || path.join(dataDir, 'bwt.db')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

export const db = new Database(dbPath)

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT UNIQUE,
    email TEXT UNIQUE COLLATE NOCASE,
    password_hash TEXT,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS marathon_progress (
    user_id INTEGER NOT NULL,
    category_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    correct INTEGER NOT NULL DEFAULT 0,
    attempts INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, category_id, question_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS marathon_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    sections_json TEXT NOT NULL,
    total_answered INTEGER NOT NULL DEFAULT 0,
    total_correct INTEGER NOT NULL DEFAULT 0,
    completed_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_marathon_progress_user ON marathon_progress(user_id);
  CREATE INDEX IF NOT EXISTS idx_marathon_runs_user ON marathon_runs(user_id);
`)

const userCols = db.prepare('PRAGMA table_info(users)').all().map((c) => c.name)
if (!userCols.includes('discord_id')) {
  db.exec('ALTER TABLE users ADD COLUMN discord_id TEXT')
  db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_users_discord_id ON users(discord_id)')
}
if (!userCols.includes('avatar_url')) {
  db.exec('ALTER TABLE users ADD COLUMN avatar_url TEXT')
}
if (!userCols.includes('updated_at')) {
  db.exec("ALTER TABLE users ADD COLUMN updated_at TEXT NOT NULL DEFAULT (datetime('now'))")
}

console.log(`Datenbank: ${dbPath}`)
