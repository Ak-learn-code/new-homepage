import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { directusPublicPostFields } from '../src/lib/directus-client.js'
import { createSitemapXml, renderArticleHtml, renderBlogIndexHtml } from './insight-prerender-utils.mjs'
import { getSiteConfig } from './site-config.mjs'

const root = process.cwd()
const { base, siteUrl } = getSiteConfig()
const directusUrl = (process.env.VITE_DIRECTUS_URL || 'https://directus.sidetwo.de').replace(/\/$/, '')
const fields = directusPublicPostFields.join(',')
const response = await fetch(`${directusUrl}/items/cms_posts?fields=${encodeURIComponent(fields)}&sort=-published_at&limit=100`)

if (!response.ok) throw new Error(`Published Directus insights could not be read (HTTP ${response.status}). Configure public read access before prerendering.`)

const { data = [] } = await response.json()
const blogHtml = await readFile(resolve(root, 'dist/blog.html'), 'utf8')
const scriptPath = blogHtml.match(/<script type="module" crossorigin src="([^"]+)"/)?.[1]
if (!scriptPath) throw new Error('Could not locate the built blog JavaScript entry.')

const insightsIndex = renderBlogIndexHtml({ blogHtml, posts: data, base, directusUrl })
await mkdir(resolve(root, 'dist', 'insights'), { recursive: true })
await writeFile(resolve(root, 'dist', 'insights', 'index.html'), insightsIndex)
await writeFile(resolve(root, 'dist', 'blog.html'), `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${base}insights/"><link rel="canonical" href="${base}insights/"><title>Insights | SideTwo</title></head><body><p><a href="${base}insights/">Zu den Insights</a></p></body></html>`)

for (const post of data) {
  if (!post?.slug) continue
  const html = renderArticleHtml({ blogHtml, scriptPath, base, post, directusUrl, siteUrl })
  const output = resolve(root, 'dist', 'insights', encodeURIComponent(post.slug), 'index.html')
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

await writeFile(resolve(root, 'dist', 'sitemap.xml'), createSitemapXml({ siteUrl, slugs: data.map((post) => post?.slug) }))
await writeFile(resolve(root, 'dist', 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)

console.log(`Prerendered ${data.length} insight route(s) and updated sitemap.xml.`)
