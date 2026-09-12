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

const latestPostsQuery = `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc)[0...3] {
  title,
  "slug": slug.current,
  excerpt,
  "image": mainImage.asset->url,
  publishedAt,
  readTime
}`

export async function getLatestPosts() {
  if (!sanityClient) return []
  return sanityClient.fetch(latestPostsQuery)
}
