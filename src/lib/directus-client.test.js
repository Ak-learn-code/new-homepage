import assert from 'node:assert/strict'
import test from 'node:test'
import { createDirectusContentClient } from './directus-client.js'

const publishedPost = {
  id: 'post-id', slug: 'ein-insight', title: 'Ein Insight', excerpt: 'Kurz erklärt.', featured_image: 'image-id', featured_image_alt: 'Ein Bild', published_at: '2026-09-21T10:00:00.000Z', read_time_minutes: 4, content: '<p>Inhalt</p>', seo_title: 'SEO', seo_description: 'Beschreibung', canonical_url: 'https://sidetwo.de/insights/ein-insight/', og_image: 'og-id', category: { id: 'category-id', name: 'Strategie', slug: 'strategie' }, author: { id: 'author-id', name: 'SideTwo', slug: 'sidetwo', role: 'Studio' },
}

test('only requests published Directus posts and maps public fields', async () => {
  let requestUrl
  const client = createDirectusContentClient({ directusUrl: 'https://directus.example/', fetcher: async (url) => {
    requestUrl = new URL(url)
    return new Response(JSON.stringify({ data: [publishedPost] }), { status: 200 })
  } })
  const [post] = await client.getAllPosts()
  const filter = JSON.parse(requestUrl.searchParams.get('filter'))
  assert.deepEqual(filter, { _and: [{ status: { _eq: 'published' } }] })
  assert.equal(requestUrl.searchParams.get('sort'), '-published_at')
  assert.equal(post.category, 'Strategie')
  assert.equal(post.author, 'SideTwo')
  assert.match(post.image, /^https:\/\/directus\.example\/assets\/image-id\?/) 
  assert.equal(post.bodyHtml, '<p>Inhalt</p>')
})

test('adds the slug filter without dropping the published filter', async () => {
  let requestUrl
  const client = createDirectusContentClient({ directusUrl: 'https://directus.example', fetcher: async (url) => {
    requestUrl = new URL(url)
    return new Response(JSON.stringify({ data: [publishedPost] }), { status: 200 })
  } })
  await client.getPostBySlug('ein-insight')
  assert.deepEqual(JSON.parse(requestUrl.searchParams.get('filter')), { _and: [{ status: { _eq: 'published' } }, { slug: { _eq: 'ein-insight' } }] })
})

test('reports permission and service errors without returning fallback content', async () => {
  const denied = createDirectusContentClient({ directusUrl: 'https://directus.example', fetcher: async () => new Response('', { status: 403 }) })
  const unavailable = createDirectusContentClient({ directusUrl: 'https://directus.example', fetcher: async () => new Response('', { status: 500 }) })
  await assert.rejects(denied.getAllPosts(), /noch nicht freigegeben/)
  await assert.rejects(unavailable.getAllPosts(), /konnten gerade nicht geladen werden/)
})
