export const escapeHtml = (value = '') => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const fileId = (value) => typeof value === 'string' ? value : value?.id || ''

export function articleMetadata(post, { directusUrl, siteUrl }) {
  const title = post.seo_title || post.title || 'Insights'
  const description = post.seo_description || post.excerpt || 'Praktische Einblicke von SideTwo.'
  const canonical = /^https?:\/\//.test(post.canonical_url || '') ? post.canonical_url : `${siteUrl}/insights/${encodeURIComponent(post.slug)}/`
  const imageId = fileId(post.og_image) || fileId(post.featured_image)
  const image = imageId ? `${directusUrl}/assets/${encodeURIComponent(imageId)}?format=webp&quality=82&width=1600&height=900` : ''
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title || title, description,
    datePublished: post.published_at, dateModified: post.published_at,
    author: { '@type': 'Organization', name: post.author?.name || 'SideTwo' },
    image: image ? [image] : undefined, mainEntityOfPage: canonical,
  }).replace(/</g, '\\u003c')
  return `<meta name="description" content="${escapeHtml(description)}" />\n    <meta name="robots" content="index, follow" />\n    <meta property="og:type" content="article" />\n    <meta property="og:locale" content="de_DE" />\n    <meta property="og:title" content="${escapeHtml(title)}" />\n    <meta property="og:description" content="${escapeHtml(description)}" />\n    <meta property="og:url" content="${escapeHtml(canonical)}" />${image ? `\n    <meta property="og:image" content="${escapeHtml(image)}" />` : ''}\n    <meta name="twitter:card" content="summary_large_image" />\n    <link rel="canonical" href="${escapeHtml(canonical)}" />\n    <script type="application/ld+json">${structuredData}</script>`
}

export function renderArticleHtml({ blogHtml, scriptPath, base, post, directusUrl, siteUrl }) {
  const title = post.seo_title || post.title || 'Insights'
  return blogHtml
    .replace(/<meta name="description"[^>]*\/?>/, articleMetadata(post, { directusUrl, siteUrl }))
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)} | SideTwo</title>`)
    .replace(scriptPath, `${base}${scriptPath.replace(/^\//, '')}`)
}
