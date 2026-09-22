import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const read = (path) => readFile(resolve(process.cwd(), path), 'utf8')

test('the public website and release workflow are Directus-only with no Sanity fallback', async () => {
  const [packageJson, blog, homepage, workflow] = await Promise.all([
    read('package.json'), read('src/blog.jsx'), read('src/main.jsx'), read('.github/workflows/deploy.yml'),
  ])
  assert.doesNotMatch(packageJson, /@sanity|@portabletext|"sanity"|build:directus/)
  assert.doesNotMatch(blog, /sanity|PortableText|contentSource|normalisePost/i)
  assert.doesNotMatch(homepage, /sanity|contentSource|normalisePost/i)
  assert.doesNotMatch(workflow, /sanity|content_source|VITE_CONTENT_SOURCE/i)
  assert.match(packageJson, /"build": "vite build && node scripts\/prerender-insights\.mjs"/)
  assert.match(workflow, /- run: npm run build/)
})
