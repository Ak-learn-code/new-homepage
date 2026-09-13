import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 't29qpo9b'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export const sanityClient = projectId && dataset
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-02-19',
      useCdn: true,
    })
  : null

const imageBuilder = sanityClient ? createImageUrlBuilder(sanityClient) : null

export function sanityImageUrl(source, { width, height } = {}) {
  if (!source || !imageBuilder) return ''
  let builder = imageBuilder.image(source).auto('format').fit('crop')
  if (width) builder = builder.width(width)
  if (height) builder = builder.height(height)
  return builder.url()
}

export function postImageUrl(post, dimensions) {
  return sanityImageUrl(post?.mainImage, dimensions) || post?.image || ''
}

export function formatPublishedAt(value) {
  if (!value) return 'Vorschau'
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(value))
}

const postProjection = `{
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  readTime,
  category,
  author,
  seoTitle,
  seoDescription,
  body
}`

const latestPostsQuery = `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc)[0...3] ${postProjection}`

const allPostsQuery = `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) ${postProjection}`

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] ${postProjection}`

export async function getAllPosts() {
  if (!sanityClient) return []
  return sanityClient.fetch(allPostsQuery)
}

export async function getPostBySlug(slug) {
  if (!sanityClient || !slug) return null
  return sanityClient.fetch(postBySlugQuery, { slug })
}

export async function getLatestPosts() {
  if (!sanityClient) return []
  return sanityClient.fetch(latestPostsQuery)
}
