import { createDirectusContentClient } from './directus-client'

const client = createDirectusContentClient({
  directusUrl: import.meta.env.VITE_DIRECTUS_URL || 'https://directus.sidetwo.de',
})

export const getAllDirectusPosts = client.getAllPosts
export const getDirectusPostBySlug = client.getPostBySlug
export const getLatestDirectusPosts = client.getLatestPosts
export const directusImageUrl = client.imageUrl

export function postImageUrl(post, { width, height } = {}) {
  return post?.imageId ? directusImageUrl(post.imageId, width, height) : post?.image || ''
}

export function postImageSrcSet(post, widths, ratio = 16 / 9) {
  if (!post?.imageId) return undefined
  return widths.map((width) => `${directusImageUrl(post.imageId, width, Math.round(width / ratio))} ${width}w`).join(', ')
}

export function formatPublishedAt(value) {
  if (!value) return 'Vorschau'
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(value))
}
