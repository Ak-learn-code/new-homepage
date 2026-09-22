import { createDirectusContentClient } from './directus-client'

const client = createDirectusContentClient({
  directusUrl: import.meta.env.VITE_DIRECTUS_URL || 'https://directus.sidetwo.de',
})

export const getAllDirectusPosts = client.getAllPosts
export const getDirectusPostBySlug = client.getPostBySlug
export const getLatestDirectusPosts = client.getLatestPosts
export const directusImageUrl = client.imageUrl

export function postImageUrl(post) {
  return post?.image || ''
}

export function formatPublishedAt(value) {
  if (!value) return 'Vorschau'
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(value))
}
