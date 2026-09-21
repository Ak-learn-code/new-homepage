import { createDirectusContentClient } from './directus-client'

const client = createDirectusContentClient({
  directusUrl: import.meta.env.VITE_DIRECTUS_URL || 'https://directus.sidetwo.de',
})

export const getAllDirectusPosts = client.getAllPosts
export const getDirectusPostBySlug = client.getPostBySlug
export const getLatestDirectusPosts = client.getLatestPosts
export const directusImageUrl = client.imageUrl
