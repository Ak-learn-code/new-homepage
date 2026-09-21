import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { renderArticleHtml } from './insight-prerender-utils.mjs'

const blogHtml = '<html><head><meta name="description" content="Basis" /><title>Insights | SideTwo</title></head><body><script type="module" crossorigin src="/assets/blog.js"></script></body></html>'
const post = { slug: 'ein-insight', title: 'Ein <Insight>', excerpt: 'Kurz & klar', seo_title: 'SEO Insight', seo_description: 'Beschreibung & Kontext', published_at: '2026-09-21T10:00:00.000Z', featured_image: 'featured-id', author: { name: 'SideTwo' } }

test('prerenders crawlable Directus article metadata and a GitHub Pages route', () => {
  const html = renderArticleHtml({ blogHtml, scriptPath: '/assets/blog.js', base: '/new-homepage/', post, directusUrl: 'https://directus.sidetwo.de', siteUrl: 'https://ak-learn-code.github.io/new-homepage' })
  assert.match(html, /<title>SEO Insight \| SideTwo<\/title>/)
  assert.match(html, /content="Beschreibung &amp; Kontext"/)
  assert.match(html, /https:\/\/ak-learn-code\.github\.io\/new-homepage\/insights\/ein-insight\//)
  assert.match(html, /https:\/\/directus\.sidetwo\.de\/assets\/featured-id\?format=webp/)
  assert.match(html, /"@type":"BlogPosting"/)
  assert.match(html, /src="\/new-homepage\/assets\/blog\.js"/)
  assert.doesNotMatch(html, /Ein <Insight>/)
})

test('the Directus prerender request has no client-side status query or filter', async () => {
  const source = await readFile(resolve(process.cwd(), 'scripts/prerender-insights.mjs'), 'utf8')
  const requestLine = source.split('\n').find((line) => line.includes('/items/cms_posts')) || ''
  assert.match(requestLine, /fields=\$\{encodeURIComponent\(fields\)\}&limit=100/)
  assert.doesNotMatch(requestLine, /status/)
  assert.doesNotMatch(requestLine, /filter=/)
})
