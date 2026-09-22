import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const read = (path) => readFile(resolve(process.cwd(), path), 'utf8')

test('the contact form keeps only name, email and message mandatory', async () => {
  const homepage = await read('src/main.jsx')

  assert.match(homepage, /name="name" required aria-required="true"[^>]*autoComplete="name"/)
  assert.match(homepage, /name="email" type="email" required aria-required="true"[^>]*autoComplete="email"/)
  assert.match(homepage, /name="message" required aria-required="true"[^>]*maxLength="5000"/)
  assert.match(homepage, /name="company"[^>]*autoComplete="organization"/)
  assert.match(homepage, /name="phone" type="tel"[^>]*autoComplete="tel"/)
  assert.doesNotMatch(homepage, /name="company"[^>]*required/)
  assert.doesNotMatch(homepage, /name="phone"[^>]*required/)
})

test('all public React footers link to imprint and privacy pages', async () => {
  const [homepage, blog, legal] = await Promise.all([
    read('src/main.jsx'), read('src/blog.jsx'), read('src/legal.jsx'),
  ])

  for (const source of [homepage, blog, legal]) {
    assert.match(source, /impressum/)
    assert.match(source, /datenschutz/)
  }
})

test('new-window links use opener protection', async () => {
  const sources = await Promise.all([read('src/main.jsx'), read('src/blog.jsx'), read('src/legal.jsx')])
  for (const source of sources) {
    for (const tag of source.match(/<a[^>]+target="_blank"[^>]*>/g) || []) {
      assert.match(tag, /rel="noopener noreferrer"/)
    }
  }
})

test('the executable public source contains no client-side storage or secrets and gates Turnstile behind configuration', async () => {
  const source = await Promise.all([
    read('src/main.jsx'), read('src/blog.jsx'), read('src/lib/directus-client.js'),
  ]).then((files) => files.join('\n'))

  assert.doesNotMatch(source, /(?:localStorage|sessionStorage|indexedDB|document\.cookie|navigator\.sendBeacon)/)
  assert.doesNotMatch(source, /TURNSTILE_SECRET(?:_KEY)?\s*=/i)
  assert.match(source, /VITE_CONTACT_API_URL/)
  assert.match(source, /VITE_TURNSTILE_SITE_KEY/)
  assert.match(source, /Boolean\(contactApiUrl && turnstileSiteKey\)/)
})

test('local environment files are ignored while the safe example remains trackable', async () => {
  const gitignore = await read('.gitignore')
  assert.match(gitignore, /^\.env$/m)
  assert.match(gitignore, /^\.env\.\*$/m)
  assert.match(gitignore, /^!\.env\.example$/m)
})

test('the production build is configured through explicit site and base variables', async () => {
  const [viteConfig, example, prerender] = await Promise.all([read('vite.config.js'), read('.env.example'), read('scripts/prerender-insights.mjs')])
  assert.match(viteConfig, /getSiteConfig/)
  assert.match(example, /VITE_SITE_URL=/)
  assert.match(example, /VITE_BASE_PATH=/)
  assert.match(prerender, /getSiteConfig/)
  assert.match(prerender, /dist', 'robots\.txt/)
})
