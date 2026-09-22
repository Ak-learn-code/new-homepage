import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createSitemapXml, prerenderedArticle, prerenderedBlogIndex, renderArticleHtml, renderBlogIndexHtml, withViteBasePath } from './insight-prerender-utils.mjs'

const blogHtml = '<html><head><meta name="description" content="Basis" /><title>Insights | SideTwo</title></head><body><div id="root"></div><script type="module" crossorigin src="/assets/blog.js"></script></body></html>'
const post = { slug: 'ein-insight', title: 'Ein <Insight>', excerpt: 'Kurz & klar', content: '<p>Der vollständige <strong>Artikeltext</strong>.</p><h2>Zwischenüberschrift</h2>', seo_title: 'SEO Insight', seo_description: 'Beschreibung & Kontext', published_at: '2026-09-21T10:00:00.000Z', featured_image: 'featured-id', author: { name: 'SideTwo' } }

test('prerenders crawlable Directus article metadata and a GitHub Pages route', () => {
  const html = renderArticleHtml({ blogHtml, scriptPath: '/assets/blog.js', base: '/new-homepage/', post, directusUrl: 'https://directus.sidetwo.de', siteUrl: 'https://ak-learn-code.github.io/new-homepage' })
  assert.match(html, /<title>SEO Insight \| SideTwo<\/title>/)
  assert.match(html, /content="Beschreibung &amp; Kontext"/)
  assert.match(html, /https:\/\/ak-learn-code\.github\.io\/new-homepage\/insights\/ein-insight\//)
  assert.match(html, /https:\/\/directus\.sidetwo\.de\/assets\/featured-id\?format=webp/)
  assert.match(html, /"@type":"BlogPosting"/)
  assert.match(html, /src="\/new-homepage\/assets\/blog\.js"/)
  assert.match(html, /Der vollständige <strong>Artikeltext<\/strong>\./)
  assert.match(html, /<h2>Zwischenüberschrift<\/h2>/)
  assert.match(html, /id="directus-prerendered-insight" type="application\/json"/)
  assert.match(html, /"slug":"ein-insight"/)
  assert.doesNotMatch(html, /Ein <Insight>/)
})

test('keeps migrated Directus HTML content in the prerendered article body', () => {
  const html = prerenderedArticle(post, { base: '/new-homepage/', directusUrl: 'https://directus.sidetwo.de' })
  assert.match(html, /<div class="cms-rich-text"><p>Der vollständige <strong>Artikeltext<\/strong>\.<\/p><h2>Zwischenüberschrift<\/h2><\/div>/)
  assert.match(html, /class="blog-article-image"[^>]*width="1600" height="900" fetchpriority="high"/)
  assert.match(html, /class="nav-shell blog-site-header"/)
  assert.match(html, /<footer class="footer">/)
  assert.match(prerenderedArticle({ title: 'Leer', content: null }, { base: '/', directusUrl: 'https://directus.sidetwo.de' }), /<h1>Leer<\/h1>/)
})

test('prerenders Directus posts for the blog overview with stable image dimensions', () => {
  const secondPost = { ...post, slug: 'zweiter-insight', title: 'Zweiter Insight' }
  const html = prerenderedBlogIndex([post, secondPost], { base: '/new-homepage/', directusUrl: 'https://directus.sidetwo.de' })
  assert.match(html, /Ein &lt;Insight&gt;/)
  assert.match(html, /Zweiter Insight/)
  assert.match(html, /class="blog-featured"/)
  assert.match(html, /class="blog-page-card"/)
  assert.match(html, /width="1400" height="900" fetchpriority="high"/)
  assert.match(html, /width="900" height="650" loading="lazy"/)
  assert.doesNotMatch(html, /\/new-homepage\/new-homepage\//)
})

test('places initial Directus posts and critical CSS in the built blog overview', () => {
  const htmlWithCss = blogHtml.replace('</head>', '<link rel="stylesheet" href="/assets/blog.css"></head>')
  const html = renderBlogIndexHtml({ blogHtml: htmlWithCss, posts: [post], base: '/new-homepage/', directusUrl: 'https://directus.sidetwo.de' })
  assert.match(html, /id="directus-prerendered-posts" type="application\/json"/)
  assert.match(html, /"slug":"ein-insight"/)
  assert.ok(html.indexOf('<link rel="stylesheet"') < html.indexOf('<script type="module"'))
})

test('keeps critical CSS ahead of the module script in prerendered articles', () => {
  const htmlWithCss = blogHtml.replace('</head>', '<link rel="stylesheet" href="/assets/blog.css"></head>')
  const html = renderArticleHtml({ blogHtml: htmlWithCss, scriptPath: '/assets/blog.js', base: '/new-homepage/', post, directusUrl: 'https://directus.sidetwo.de', siteUrl: 'https://ak-learn-code.github.io/new-homepage' })
  assert.ok(html.indexOf('<link rel="stylesheet"') < html.indexOf('<script type="module"'))
})

test('keeps image, heading, and rich text on one insight content axis', async () => {
  const css = await readFile(resolve(process.cwd(), 'src/styles.css'), 'utf8')
  assert.match(css, /\.blog-article > \.blog-article-topline,[\s\S]*max-width: 1040px/)
  assert.match(css, /\.blog-article-head h1,[\s\S]*\.blog-article-body,[\s\S]*max-width: none/)
})

test('keeps inline CMS images uncropped and aligned to the article body', async () => {
  const postWithInlineImage = { ...post, content: '<figure><img src="https://directus.sidetwo.de/assets/inline-image" alt="Zwischenbild" /></figure>' }
  const html = prerenderedArticle(postWithInlineImage, { base: '/new-homepage/', directusUrl: 'https://directus.sidetwo.de' })
  const css = await readFile(resolve(process.cwd(), 'src/styles.css'), 'utf8')
  assert.match(html, /<figure><img src="https:\/\/directus\.sidetwo\.de\/assets\/inline-image" alt="Zwischenbild" \/><\/figure>/)
  assert.match(css, /\.cms-rich-text figure,[\s\S]*width: 100%; max-width: 100%; margin: 48px 0; transform: none/)
  assert.match(css, /\.cms-rich-text figure img,[\s\S]*height: auto; display: block;[\s\S]*object-fit: contain/)
})

test('the Directus prerender request has no client-side status query or filter', async () => {
  const source = await readFile(resolve(process.cwd(), 'scripts/prerender-insights.mjs'), 'utf8')
  const requestLine = source.split('\n').find((line) => line.includes('/items/cms_posts')) || ''
  assert.match(requestLine, /fields=\$\{encodeURIComponent\(fields\)\}&sort=-published_at&limit=100/)
  assert.doesNotMatch(requestLine, /status/)
  assert.doesNotMatch(requestLine, /filter=/)
  assert.match(source, /directusPublicPostFields/)
})

test('does not apply the Vite base twice to an already base-prefixed script path', () => {
  assert.equal(withViteBasePath('/new-homepage/assets/blog-ABC.js', '/new-homepage/'), '/new-homepage/assets/blog-ABC.js')
  const basePrefixedBlogHtml = blogHtml.replace('/assets/blog.js', '/new-homepage/assets/blog-ABC.js')
  const html = renderArticleHtml({ blogHtml: basePrefixedBlogHtml, scriptPath: '/new-homepage/assets/blog-ABC.js', base: '/new-homepage/', post, directusUrl: 'https://directus.sidetwo.de', siteUrl: 'https://ak-learn-code.github.io/new-homepage' })
  assert.match(html, /src="\/new-homepage\/assets\/blog-ABC\.js"/)
  assert.doesNotMatch(html, /\/new-homepage\/new-homepage\//)
})

test('applies the Vite base once to a root-relative asset path', () => {
  assert.equal(withViteBasePath('/assets/blog-ABC.js', '/new-homepage/'), '/new-homepage/assets/blog-ABC.js')
  assert.equal(withViteBasePath('/assets/blog-ABC.js', '/'), '/assets/blog-ABC.js')
})

test('creates a valid, deduplicated sitemap for the homepage, blog overview, and public insight slugs', () => {
  const sitemap = createSitemapXml({ siteUrl: 'https://ak-learn-code.github.io/new-homepage', slugs: ['warum-eine-gute-website', 'automatisierung', 'warum-eine-gute-website', '', null] })
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/)
  assert.match(sitemap, /<loc>https:\/\/ak-learn-code\.github\.io\/new-homepage\/<\/loc>/)
  assert.match(sitemap, /<loc>https:\/\/ak-learn-code\.github\.io\/new-homepage\/blog\.html<\/loc>/)
  assert.match(sitemap, /<loc>https:\/\/ak-learn-code\.github\.io\/new-homepage\/insights\/warum-eine-gute-website\/<\/loc>/)
  assert.match(sitemap, /<loc>https:\/\/ak-learn-code\.github\.io\/new-homepage\/insights\/automatisierung\/<\/loc>/)
  assert.equal((sitemap.match(/<loc>/g) || []).length, 4)
  assert.doesNotMatch(sitemap, /\/new-homepage\/new-homepage\//)
  assert.doesNotMatch(sitemap, /(?:^|[^&])&(?!amp;|lt;|gt;|quot;)/)
})
