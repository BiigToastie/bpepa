import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(root, '..', 'public')
const required = ['icon-192.png', 'icon-512.png', 'apple-touch-icon.png']

if (required.every((f) => fs.existsSync(path.join(publicDir, f)))) {
  console.log('PWA-Icons bereits vorhanden.')
  process.exit(0)
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#667eea"/>
      <stop offset="100%" stop-color="#764ba2"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#g)"/>
  <text x="256" y="318" font-size="240" text-anchor="middle" dominant-baseline="middle">🧠</text>
</svg>`

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })

for (const size of [192, 512]) {
  const out = path.join(publicDir, `icon-${size}.png`)
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(out)
  console.log(`Icon erstellt: ${out}`)
}

await sharp(Buffer.from(svg)).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'))
console.log('apple-touch-icon.png erstellt')
