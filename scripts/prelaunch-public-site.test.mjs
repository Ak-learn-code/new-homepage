import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const read = (path) => readFile(resolve(process.cwd(), path), 'utf8')

test('the contact form keeps only name, email and message mandatory', async () => {
  const homepage = await read('src/main.jsx')

  assert.match(homepage, /name="name" required autoComplete="name"/)
  assert.match(homepage, /name="email" type="email" required autoComplete="email"/)
  assert.match(homepage, /name="message" required rows="3" maxLength="5000"/)
  assert.match(homepage, /name="company" autoComplete="organization"/)
  assert.match(homepage, /name="phone" type="tel" autoComplete="tel"/)
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

test('the executable public source contains no client-side storage, tracking beacon or Turnstile integration', async () => {
  const source = await Promise.all([
    read('src/main.jsx'), read('src/blog.jsx'), read('src/lib/directus-client.js'),
  ]).then((files) => files.join('\n'))

  assert.doesNotMatch(source, /(?:localStorage|sessionStorage|indexedDB|document\.cookie|navigator\.sendBeacon)/)
  assert.doesNotMatch(source, /(?:TURNSTILE_SECRET|siteverify|challenges\.cloudflare\.com)/i)
})
