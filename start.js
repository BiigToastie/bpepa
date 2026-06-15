import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(root, 'dist')
const port = Number(process.env.PORT) || 4173

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function respond(res, status, body, contentType) {
  res.writeHead(status, { 'Content-Type': contentType })
  res.end(body)
}

function readAndSend(res, filePath) {
  const ext = path.extname(filePath)
  fs.readFile(filePath, (err, data) => {
    if (err) {
      const indexPath = path.join(distDir, 'index.html')
      if (filePath !== indexPath) {
        readAndSend(res, indexPath)
        return
      }
      console.error('Datei nicht gefunden:', filePath, err.message)
      respond(res, 404, 'Not Found', 'text/plain; charset=utf-8')
      return
    }
    respond(res, 200, data, mimeTypes[ext] || 'application/octet-stream')
  })
}

if (!fs.existsSync(distDir)) {
  console.error(`FEHLER: dist-Ordner fehlt (${distDir})`)
  process.exit(1)
}

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('FEHLER: dist/index.html fehlt – Build nicht ausgeführt?')
  process.exit(1)
}

const server = http.createServer((req, res) => {
  const urlPath = (req.url || '/').split('?')[0]
  const relative = urlPath === '/' ? 'index.html' : decodeURIComponent(urlPath).replace(/^\/+/, '')
  const filePath = path.normalize(path.join(distDir, relative))

  if (!filePath.startsWith(distDir)) {
    respond(res, 403, 'Forbidden', 'text/plain; charset=utf-8')
    return
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      readAndSend(res, path.join(distDir, 'index.html'))
      return
    }
    readAndSend(res, filePath)
  })
})

server.on('error', (err) => {
  console.error('Server-Fehler:', err)
  process.exit(1)
})

server.listen(port, '0.0.0.0', () => {
  console.log(`BWT Trainer bereit auf http://0.0.0.0:${port}`)
})
