import { readFile } from 'node:fs/promises'

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8')
const scripts = html.match(/https:\/\/api\.zenovay\.com\/z\.js/g) ?? []
if (scripts.length !== 1)
  throw new Error(`Expected one tracker script, found ${scripts.length}`)
if (!html.includes('data-id="ZV_REPLACE_WITH_YOUR_CODE"'))
  throw new Error('Missing data-id')
if (!html.includes('data-cookieless="true"'))
  throw new Error('Missing cookieless mode')
console.log('HTML example valid')
