import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const ignored = new Set([
  '.git',
  'node_modules',
  'dist',
  '.next',
  '.nuxt',
  '.svelte-kit',
  'pnpm-lock.yaml',
])
const patterns = [
  /\bsk_(?:live|test)_[A-Za-z0-9]{12,}\b/g,
  /\bwhsec_[A-Za-z0-9]{12,}\b/g,
  /\b(?:ghp|github_pat)_[A-Za-z0-9_]{20,}\b/g,
  /\bAKIA[0-9A-Z]{16}\b/g,
  /\b(?:eyJ[A-Za-z0-9_-]{20,})\.(?:eyJ[A-Za-z0-9_-]{20,})\.[A-Za-z0-9_-]{20,}\b/g,
  /\b(?:SUPABASE_SERVICE_ROLE_KEY|CLOUDFLARE_API_TOKEN|STRIPE_SECRET_KEY)\s*=\s*[^\s#]+/g,
]

const findings: string[] = []

async function walk(directory: string): Promise<void> {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name) || entry.name.startsWith('.env')) continue
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await walk(path)
    else {
      let content: string
      try {
        content = await readFile(path, 'utf8')
      } catch {
        continue
      }
      for (const pattern of patterns) {
        for (const match of content.matchAll(pattern))
          findings.push(`${path}: ${match[0].slice(0, 12)}…`)
      }
    }
  }
}

await walk('.')
if (findings.length > 0)
  throw new Error(`Potential secrets found:\n${findings.join('\n')}`)
console.log('Secret scan passed')
