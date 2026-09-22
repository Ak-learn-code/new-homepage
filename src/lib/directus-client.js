export const directusPublicPostFields = [
  'id', 'slug', 'title', 'excerpt', 'featured_image', 'featured_image_alt', 'published_at', 'read_time_minutes', 'content', 'seo_title', 'seo_description', 'canonical_url', 'og_image',
  'category.id', 'category.name', 'category.slug', 'author.id', 'author.name', 'author.slug', 'author.role', 'author.portrait',
]

export function mapDirectusPost(item, { directusUrl }) {
  const baseUrl = directusUrl.replace(/\/$/, '')
  const asId = (value) => typeof value === 'string' ? value : value?.id || ''
  const imageUrl = (id, width, height) => {
    if (!id) return ''
    const query = new URLSearchParams({ format: 'webp', quality: '82' })
    if (width) query.set('width', String(width))
    if (height) query.set('height', String(height))
    if (width && height) query.set('fit', 'cover')
    return `${baseUrl}/assets/${encodeURIComponent(id)}?${query}`
  }
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
    imageId: featuredId,
    image: imageUrl(featuredId),
    ogImage: imageUrl(ogId || featuredId, 1600, 900),
    publishedAt: item.published_at,
    readTime: item.read_time_minutes ? `${item.read_time_minutes} Min. Lesezeit` : '',
    body: typeof item.content === 'string' ? item.content : '',
    seoTitle: item.seo_title || '',
    seoDescription: item.seo_description || '',
    canonicalUrl: item.canonical_url || '',
  }
}

export function createDirectusContentClient({ directusUrl, fetcher = fetch }) {
  const baseUrl = directusUrl.replace(/\/$/, '')
  const postFields = directusPublicPostFields.join(',')

  const imageUrl = (id, width, height) => {
    if (!id) return ''
    const query = new URLSearchParams({ format: 'webp', quality: '82' })
    if (width) query.set('width', String(width))
    if (height) query.set('height', String(height))
    if (width && height) query.set('fit', 'cover')
    return `${baseUrl}/assets/${encodeURIComponent(id)}?${query}`
  }
  const requestPosts = async (filter) => {
    const url = new URL(`${baseUrl}/items/cms_posts`)
    url.searchParams.set('fields', postFields)
    url.searchParams.set('sort', '-published_at')
    url.searchParams.set('limit', '100')
    if (filter) url.searchParams.set('filter', JSON.stringify(filter))
    const response = await fetcher(url)
    if (!response.ok) throw new Error(response.status === 403 ? 'Die veröffentlichten Insights sind noch nicht freigegeben.' : 'Insights konnten gerade nicht geladen werden.')
    const body = await response.json()
    return Array.isArray(body.data) ? body.data.map((item) => mapDirectusPost(item, { directusUrl: baseUrl })) : []
  }

  return {
    getAllPosts: () => requestPosts(),
    getPostBySlug: async (slug) => (await requestPosts({ slug: { _eq: slug } }))[0] || null,
    getLatestPosts: async () => (await requestPosts()).slice(0, 3),
    imageUrl,
  }
}
