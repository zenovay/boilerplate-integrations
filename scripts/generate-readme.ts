import { readFile } from 'node:fs/promises'

type Entry = { integrationStatus: string }

const entries = JSON.parse(
  await readFile('catalog/boilerplates.json', 'utf8'),
) as Entry[]
const counts = entries.reduce<Record<string, number>>((result, entry) => {
  result[entry.integrationStatus] = (result[entry.integrationStatus] ?? 0) + 1
  return result
}, {})

console.log(`Catalog: ${entries.length} projects`)
for (const [status, count] of Object.entries(counts).sort()) {
  console.log(`- ${status}: ${count}`)
}
