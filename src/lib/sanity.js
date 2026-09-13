import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

export const sanityClient = projectId && dataset
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-02-19',
      useCdn: true,
    })
  : null

const postProjection = `{
  title,
  "slug": slug.current,
  excerpt,
  "image": mainImage.asset->url,
  publishedAt,
  readTime,
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
