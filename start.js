import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const port = process.env.PORT || '4173'
const root = dirname(fileURLToPath(import.meta.url))
const viteBin = join(root, 'node_modules', 'vite', 'bin', 'vite.js')

const child = spawn(
  process.execPath,
  [viteBin, 'preview', '--host', '0.0.0.0', '--port', port, '--strictPort'],
  { stdio: 'inherit', env: process.env, cwd: root },
)

child.on('error', (err) => {
  console.error('Start fehlgeschlagen:', err)
  process.exit(1)
})

child.on('exit', (code) => {
  process.exit(code ?? 1)
})
