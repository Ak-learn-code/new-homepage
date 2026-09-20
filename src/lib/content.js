import { getAllPosts as getAllSanityPosts, getLatestPosts as getLatestSanityPosts, getPostBySlug as getSanityPostBySlug } from './sanity'
import { getAllDirectusPosts, getDirectusPostBySlug, getLatestDirectusPosts } from './directus'

export const contentSource = import.meta.env.VITE_CONTENT_SOURCE === 'directus' ? 'directus' : 'sanity'

export const getAllPosts = () => contentSource === 'directus' ? getAllDirectusPosts() : getAllSanityPosts()
export const getLatestPosts = () => contentSource === 'directus' ? getLatestDirectusPosts() : getLatestSanityPosts()
export const getPostBySlug = (slug) => contentSource === 'directus' ? getDirectusPostBySlug(slug) : getSanityPostBySlug(slug)
