/**
 * Docker/KynxGate Healthcheck – ohne Shell-Sonderzeichen:
 *   node scripts/healthcheck.mjs
 */
import http from 'node:http'

const port = Number(process.env.PORT) || 4173
const path = process.env.HEALTH_PATH || '/api/health'
const timeoutMs = Number(process.env.HEALTH_TIMEOUT_MS) || 4000

const request = http.get(
  { host: '127.0.0.1', port, path, timeout: timeoutMs },
  (response) => {
    response.resume()
    const ok =
      response.statusCode !== undefined &&
      response.statusCode >= 200 &&
      response.statusCode < 500
    process.exit(ok ? 0 : 1)
  },
)

request.on('timeout', () => {
  request.destroy()
  process.exit(1)
})

request.on('error', () => {
  process.exit(1)
})
