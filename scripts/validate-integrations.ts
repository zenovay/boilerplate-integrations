import { access, readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const allowedStatuses = new Set([
  'verified',
  'community',
  'guide-only',
  'planned',
  'blocked-private',
  'deprecated',
])

const requiredGuideHeadings = [
  '## Status',
  '## Install',
  '## Events',
  '## Privacy and first-party tracking',
  '## Local development and production',
  '## Verification',
  '## Troubleshooting',
  '## Removal',
]

const guideRoots = ['frameworks', 'boilerplates']
let guides = 0

for (const root of guideRoots) {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const path = join(root, entry.name, 'README.md')
    try {
      const content = await readFile(path, 'utf8')
      guides += 1
      const status = content.match(/Status:\s*`([^`]+)`/)?.[1]
      if (!status || !allowedStatuses.has(status)) {
        throw new Error(`${path}: missing or invalid status`)
      }
      if (status === 'verified') {
        for (const heading of requiredGuideHeadings) {
          if (!content.includes(heading))
            throw new Error(`${path}: missing ${heading}`)
        }
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    }
  }
}

const examples = (await readdir('examples', { withFileTypes: true })).filter(
  (entry) => entry.isDirectory(),
)
if (examples.length < 5)
  throw new Error('At least five tested example packages are required')
for (const example of examples)
  await access(join('examples', example.name, 'package.json'))

const forbidden = [
  ['data-tracking-code=', 'Use the current data-id attribute'],
  ['cdn.zenovay.com/t.js', 'Use https://api.zenovay.com/z.js'],
  [
    'data-allow-localhost=',
    'Localhost is controlled by the dashboard site setting',
  ],
] as const

async function walk(directory: string): Promise<string[]> {
  const results: string[] = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (
      ['node_modules', 'dist', '.next', '.nuxt', '.svelte-kit'].includes(
        entry.name,
      )
    )
      continue
    const path = join(directory, entry.name)
    if (entry.isDirectory()) results.push(...(await walk(path)))
    else results.push(path)
  }
  return results
}

for (const path of await walk('.')) {
  if (path === 'scripts/validate-integrations.ts') continue
  if (!/\.(?:md|mdx|html|ts|tsx|vue|svelte|astro)$/.test(path)) continue
  const content = await readFile(path, 'utf8')
  for (const [needle, message] of forbidden) {
    if (content.includes(needle)) throw new Error(`${path}: ${message}`)
  }
}

console.log(
  `Integration structure valid: ${guides} guides, ${examples.length} examples`,
)
