import { readFile } from 'node:fs/promises'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const catalog = JSON.parse(
  await readFile('catalog/boilerplates.json', 'utf8'),
) as unknown
const schema = JSON.parse(
  await readFile('catalog/boilerplates.schema.json', 'utf8'),
) as Record<string, unknown>

const ajv = new Ajv2020({ allErrors: true, strict: true })
addFormats(ajv)
const validate = ajv.compile(schema)

if (!validate(catalog)) {
  console.error(validate.errors)
  process.exitCode = 1
} else {
  const entries = catalog as Array<{ slug: string; integrationStatus: string }>
  const duplicates = entries
    .map((entry) => entry.slug)
    .filter((slug, index, all) => all.indexOf(slug) !== index)
  if (duplicates.length > 0) {
    throw new Error(`Duplicate catalog slugs: ${duplicates.join(', ')}`)
  }
  console.log(`Catalog valid: ${entries.length} entries`)
}
