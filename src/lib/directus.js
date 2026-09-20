const directusUrl = (import.meta.env.VITE_DIRECTUS_URL || 'https://directus.sidetwo.de').replace(/\/$/, '')

const postFields = [
  'id', 'slug', 'title', 'excerpt', 'featured_image', 'featured_image_alt', 'published_at', 'read_time_minutes', 'content', 'seo_title', 'seo_description', 'canonical_url', 'og_image',
  'category.id', 'category.name', 'category.slug', 'author.id', 'author.name', 'author.slug', 'author.role', 'author.portrait',
].join(',')

function imageUrl(id, width, height) {
  if (!id) return ''
  const query = new URLSearchParams({ format: 'webp', quality: '82' })
  if (width) query.set('width', String(width))
  if (height) query.set('height', String(height))
  return `${directusUrl}/assets/${encodeURIComponent(id)}?${query}`
}

function asId(value) {
  return typeof value === 'string' ? value : value?.id || ''
}

function normalisePost(item) {
  const featuredId = asId(item.featured_image)
  const ogId = asId(item.og_image)
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category?.name || '',
    categorySlug: item.category?.slug || '',
    author: item.author?.name || 'SideTwo',
    authorRole: item.author?.role || '',
    authorPortrait: imageUrl(asId(item.author?.portrait), 160, 160),
    mainImage: featuredId ? { alt: item.featured_image_alt || item.title } : null,
    image: imageUrl(featuredId),
    ogImage: imageUrl(ogId || featuredId, 1600, 900),
    publishedAt: item.published_at,
    readTime: item.read_time_minutes ? `${item.read_time_minutes} Min. Lesezeit` : '',
    bodyHtml: item.content || '',
    seoTitle: item.seo_title || '',
    seoDescription: item.seo_description || '',
    canonicalUrl: item.canonical_url || '',
  }
}

async function requestPosts(filter = {}) {
  const url = new URL(`${directusUrl}/items/cms_posts`)
  url.searchParams.set('fields', postFields)
  url.searchParams.set('sort', '-published_at')
  url.searchParams.set('limit', '100')
  url.searchParams.set('filter', JSON.stringify({ _and: [{ status: { _eq: 'published' } }, ...(filter._and || [])] }))
  const response = await fetch(url)
  if (!response.ok) throw new Error(response.status === 403 ? 'Die veröffentlichten Insights sind noch nicht freigegeben.' : 'Insights konnten gerade nicht geladen werden.')
  const body = await response.json()
  return Array.isArray(body.data) ? body.data.map(normalisePost) : []
}

export async function getAllDirectusPosts() {
  return requestPosts()
}

export async function getDirectusPostBySlug(slug) {
  const posts = await requestPosts({ _and: [{ slug: { _eq: slug } }] })
  return posts[0] || null
}

export async function getLatestDirectusPosts() {
  const posts = await requestPosts()
  return posts.slice(0, 3)
}

export function directusImageUrl(id, dimensions = {}) {
  return imageUrl(id, dimensions.width, dimensions.height)
}
