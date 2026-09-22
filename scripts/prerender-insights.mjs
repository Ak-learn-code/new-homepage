import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { directusPublicPostFields } from '../src/lib/directus-client.js'
import { createSitemapXml, renderArticleHtml } from './insight-prerender-utils.mjs'

const root = process.cwd()
const base = '/new-homepage/'
const directusUrl = (process.env.VITE_DIRECTUS_URL || 'https://directus.sidetwo.de').replace(/\/$/, '')
const siteUrl = (process.env.VITE_SITE_URL || 'https://ak-learn-code.github.io/new-homepage').replace(/\/$/, '')
const fields = directusPublicPostFields.join(',')
const response = await fetch(`${directusUrl}/items/cms_posts?fields=${encodeURIComponent(fields)}&limit=100`)

if (!response.ok) throw new Error(`Published Directus insights could not be read (HTTP ${response.status}). Configure public read access before prerendering.`)

const { data = [] } = await response.json()
const blogHtml = await readFile(resolve(root, 'dist/blog.html'), 'utf8')
const scriptPath = blogHtml.match(/<script type="module" crossorigin src="([^"]+)"/)?.[1]
if (!scriptPath) throw new Error('Could not locate the built blog JavaScript entry.')

for (const post of data) {
  if (!post?.slug) continue
  const html = renderArticleHtml({ blogHtml, scriptPath, base, post, directusUrl, siteUrl })
  const output = resolve(root, 'dist', 'insights', encodeURIComponent(post.slug), 'index.html')
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

await writeFile(resolve(root, 'dist', 'sitemap.xml'), createSitemapXml({ siteUrl, slugs: data.map((post) => post?.slug) }))

console.log(`Prerendered ${data.length} insight route(s) and updated sitemap.xml.`)
