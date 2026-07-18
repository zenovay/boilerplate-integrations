import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const urls = new Set<string>()
const ignoredDirectories = new Set([
  'node_modules',
  '.git',
  'dist',
  '.next',
  '.nuxt',
  '.svelte-kit',
])

async function walk(directory: string): Promise<void> {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await walk(path)
    else if (/\.(?:md|mdx|json)$/.test(path)) {
      const content = await readFile(path, 'utf8')
      for (const match of content.matchAll(/https:\/\/[^\s<>"'`)\]]+/g)) {
        const value = match[0].replace(/[.,;:]$/, '')
        if (!value.includes('example.') && !value.includes('YOUR_'))
          urls.add(value)
      }
    }
  }
}

await walk('.')

const failures: string[] = []
const queue = [...urls].filter((value) => {
  const url = new URL(value)
  if (
    (url.hostname === 'github.com' ||
      url.hostname === 'raw.githubusercontent.com') &&
    url.pathname.includes('/zenovay/boilerplate-integrations')
  ) {
    return false
  }
  return !(url.hostname === 'api.zenovay.com' && url.pathname === '/')
})
const workers = Array.from({ length: 10 }, async () => {
  while (queue.length > 0) {
    const url = queue.shift()
    if (!url) return
    try {
      let response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: AbortSignal.timeout(15_000),
        headers: {
          'user-agent': 'zenovay-boilerplate-integrations-link-checker/0.1',
        },
      })
      if (response.status === 404 || response.status === 405) {
        response = await fetch(url, {
          method: 'GET',
          redirect: 'follow',
          signal: AbortSignal.timeout(15_000),
          headers: {
            range: 'bytes=0-0',
            'user-agent': 'zenovay-boilerplate-integrations-link-checker/0.1',
          },
        })
      }
      if (response.status === 404 || response.status >= 500) {
        failures.push(`${response.status} ${url}`)
      }
    } catch (error) {
      failures.push(`${url}: ${(error as Error).message}`)
    }
  }
})

await Promise.all(workers)
if (failures.length > 0)
  throw new Error(`Broken links:\n${failures.join('\n')}`)
console.log(`Links valid: ${urls.size} URLs`)
