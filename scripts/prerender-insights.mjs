import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const root = process.cwd()
const base = '/new-homepage/'
const directusUrl = (process.env.VITE_DIRECTUS_URL || 'https://directus.sidetwo.de').replace(/\/$/, '')
const response = await fetch(`${directusUrl}/items/cms_posts?fields=slug&filter=${encodeURIComponent(JSON.stringify({ status: { _eq: 'published' } }))}&limit=100`)

if (!response.ok) throw new Error(`Published Directus insights could not be read (HTTP ${response.status}). Configure public read access before prerendering.`)

const { data = [] } = await response.json()
const blogHtml = await readFile(resolve(root, 'dist/blog.html'), 'utf8')
const scriptPath = blogHtml.match(/<script type="module" crossorigin src="([^"]+)"/)?.[1]
if (!scriptPath) throw new Error('Could not locate the built blog JavaScript entry.')

for (const post of data) {
  if (!post?.slug) continue
  const html = blogHtml
    .replace(/<title>.*?<\/title>/, '<title>Insights | SideTwo</title>')
    .replace(scriptPath, `${base}${scriptPath.replace(/^\//, '')}`)
  const output = resolve(root, 'dist', 'insights', encodeURIComponent(post.slug), 'index.html')
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

console.log(`Prerendered ${data.length} insight route(s).`)
