import assert from 'node:assert/strict'
import test from 'node:test'
import { sanitizeCmsHtml } from './sanitize-cms-html.js'

const directusUrl = 'https://directus.sidetwo.de'

test('removes executable and embedded CMS HTML while retaining safe text', () => {
  const html = sanitizeCmsHtml('<script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">Test</a><div onclick="alert(1)">Inhalt</div><iframe src="https://evil.example"></iframe><svg onload="alert(1)"></svg>', { directusUrl })
  assert.doesNotMatch(html, /<script|onerror=|onclick=|javascript:|<iframe|<svg|alert\(1\)/i)
  assert.match(html, /Test/)
  assert.match(html, /Inhalt/)
})

test('keeps the supported article structure and Directus inline images', () => {
  const html = sanitizeCmsHtml('<h2>Überschrift</h2><p><strong>Wichtig</strong> <em>formatiert</em>.</p><figure><img src="https://directus.sidetwo.de/assets/image-id?width=900" alt="Zwischenbild" /><figcaption>Bildunterschrift</figcaption></figure><ul><li>Eintrag</li></ul>', { directusUrl })
  assert.match(html, /<h2>Überschrift<\/h2>/)
  assert.match(html, /<strong>Wichtig<\/strong>/)
  assert.match(html, /src="https:\/\/directus\.sidetwo\.de\/assets\/image-id\?width=900"/)
  assert.match(html, /alt="Zwischenbild"/)
  assert.match(html, /<figcaption>Bildunterschrift<\/figcaption>/)
})

test('keeps only safe URLs and protects external CMS links', () => {
  const html = sanitizeCmsHtml('<a href="https://example.com">Extern</a><a href="/kontakt">Intern</a><a href="mailto:info@sidetwo.de">Mail</a><a href="//evil.example">Unsicher</a>', { directusUrl })
  assert.match(html, /href="https:\/\/example\.com" target="_blank" rel="noopener noreferrer"/)
  assert.match(html, /href="\/kontakt"/)
  assert.match(html, /href="mailto:info@sidetwo\.de"/)
  assert.doesNotMatch(html, /evil\.example/)
})
