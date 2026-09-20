export function normalisePost(post) {
  return {
    ...post,
    slug: post?.slug || '',
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    image: post?.image || '',
    mainImage: post?.mainImage || null,
    readTime: post?.readTime || '',
    category: post?.category || '',
    author: post?.author || 'SideTwo',
    body: post?.body || [],
  }
}
