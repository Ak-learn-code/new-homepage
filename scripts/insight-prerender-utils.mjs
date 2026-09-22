export const escapeHtml = (value = '') => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const fileId = (value) => typeof value === 'string' ? value : value?.id || ''

function migratedContentHtml(value) {
  return typeof value === 'string' ? value : ''
}

function directusAssetUrl(value, directusUrl, width, height) {
  const id = fileId(value)
  if (!id) return ''
  const query = new URLSearchParams({ format: 'webp', quality: '82' })
  if (width) query.set('width', String(width))
  if (height) query.set('height', String(height))
  if (width && height) query.set('fit', 'cover')
  return `${directusUrl}/assets/${encodeURIComponent(id)}?${query}`
}

function directusSrcSet(value, directusUrl, widths) {
  return widths.map((width) => `${directusAssetUrl(value, directusUrl, width, Math.round(width * 9 / 16))} ${width}w`).join(', ')
}

function formatPublishedAt(value) {
  return value ? new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(value)) : 'Vorschau'
}

function siteHeader(base) {
  const home = (anchor = '') => `${base}${anchor}`
  const logo = `<span class="sidetwo-logo" aria-hidden="true" style="-webkit-mask-image:url('${home('assets/sidetwo-logo-currentcolor.svg')}');mask-image:url('${home('assets/sidetwo-logo-currentcolor.svg')}')"></span>`
  return `<header class="nav-shell blog-site-header"><nav class="nav-pill" aria-label="Hauptnavigation"><a class="nav-logo" href="${home('#top')}" aria-label="SideTwo Startseite">${logo}</a><div class="nav-links"><a href="${home('#ueber-uns')}">Über uns</a><a href="${home('#leistungen')}">Leistungen</a><a href="${home('#referenzen')}">Projekte</a><a href="${home('#fallstudien')}">Fallstudien</a></div><a class="nav-contact" href="${home('#kontakt')}">Kontakt</a><button class="menu-button" type="button" aria-label="Menü öffnen"></button></nav></header>`
}

function siteFooter(base) {
  const home = (anchor = '') => `${base}${anchor}`
  const logo = `<span class="sidetwo-logo footer-brand-logo" aria-hidden="true" style="-webkit-mask-image:url('${home('assets/sidetwo-logo-currentcolor.svg')}');mask-image:url('${home('assets/sidetwo-logo-currentcolor.svg')}')"></span>`
  return `<footer class="footer"><div class="footer-inner"><div class="footer-brand">${logo}<p>Wir bauen digitale Auftritte, Systeme und Automatisierungen, die im Alltag wirklich arbeiten.</p><a class="footer-linkedin" href="https://www.linkedin.com/in/alexandros-kodalis-42a908334/">LinkedIn</a></div><div class="footer-col"><strong>Leistungen</strong><a href="${home('#leistungen')}">Webseiten</a><a href="${home('#leistungen')}">Automatisierung</a><a href="${home('#leistungen')}">KI-Agenten</a><a href="${home('#leistungen')}">Social Media</a></div><div class="footer-col"><strong>Studio</strong><a href="${home('#impact')}">Über uns</a><a href="${home('#referenzen')}">Projekte</a><a href="${home('#fallstudien')}">Fallstudien</a><a href="${home('#faq')}">Fragen &amp; Antworten</a><a href="${home('#kontakt')}">Kontakt</a></div><div class="footer-col"><strong>Starten</strong><a href="${home('#kontakt')}">Projekt anfragen</a><a href="${home('#kontakt')}">Unverbindlich sprechen</a><a href="${home('datenschutz')}">Datenschutz</a></div></div><div class="footer-bottom"><span>© 2026 SideTwo. Alle Rechte vorbehalten.</span><span>Alexandros Kodalis &amp; Bilal Altuntas</span><span>Direkt. Klar. Persönlich.</span></div></footer>`
}

const categoryOrder = ['Websites', 'Automatisierung', 'KI', 'Marketing', 'Design', 'Strategie', 'Sichtbarkeit']

function postMeta(post) {
  return [post.category?.name || 'Digital', formatPublishedAt(post.published_at), post.read_time_minutes ? `${post.read_time_minutes} Min. Lesezeit` : ''].filter(Boolean).join(' · ')
}

function postCard(post, { directusUrl }) {
  const image = directusAssetUrl(post.featured_image, directusUrl, 900, 506)
  return `<article class="blog-page-card"><a href="insights/${encodeURIComponent(post.slug)}/"><img src="${escapeHtml(image)}" alt="${escapeHtml(post.featured_image_alt || post.title)}" width="900" height="650" loading="lazy" /><div><span>${escapeHtml(postMeta(post))}</span><h2>${escapeHtml(post.title)}</h2><p>${escapeHtml(post.excerpt || '')}</p><b>Weiterlesen</b></div></a></article>`
}

export function prerenderedBlogIndex(posts, { base, directusUrl }) {
  const featured = posts[0]
  const categories = [...new Set(posts.map((post) => post.category?.name).filter(Boolean))]
  const orderedCategories = ['Alle', ...categoryOrder.filter((category) => categories.includes(category)), ...categories.filter((category) => !categoryOrder.includes(category)).sort((a, b) => a.localeCompare(b, 'de'))]
  const featuredImage = featured ? directusAssetUrl(featured.featured_image, directusUrl, 1200, 675) : ''
  const featuredMarkup = featured ? `<article class="blog-featured"><a href="insights/${encodeURIComponent(featured.slug)}/"><img src="${escapeHtml(featuredImage)}" alt="${escapeHtml(featured.featured_image_alt || featured.title)}" width="1400" height="900" fetchpriority="high" /><div class="blog-featured-copy"><span>${escapeHtml(postMeta(featured))}</span><h2>${escapeHtml(featured.title)}</h2><p>${escapeHtml(featured.excerpt || '')}</p><b>Artikel lesen</b></div></a></article>` : ''
  const cards = posts.slice(1).map((post) => postCard(post, { directusUrl })).join('')
  return `<main class="blog-page">${siteHeader(base)}<section class="blog-page-index" aria-labelledby="blog-page-title"><div class="blog-page-index-head"><span class="blog-page-kicker">SIDETWO INSIGHTS</span><h1 id="blog-page-title">Gedanken, Strategien &amp; digitale Ideen.</h1><p>Praktische Insights rund um Websites, Marketing, Automatisierung und KI, ohne unnötiges Agentur-Blabla.</p></div>${featuredMarkup}<div class="blog-controls"><div class="blog-categories" aria-label="Blog-Kategorien">${orderedCategories.map((category) => `<button class="${category === 'Alle' ? 'is-active' : ''}" type="button">${escapeHtml(category)}</button>`).join('')}</div><label class="blog-search"><input type="search" placeholder="Artikel durchsuchen" aria-label="Artikel durchsuchen" /></label></div>${cards ? `<div class="blog-page-list">${cards}</div>` : ''}</section>${siteFooter(base)}</main>`
}

export function withViteBasePath(assetPath, base) {
  if (/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(assetPath)) return assetPath
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const baseWithoutTrailingSlash = normalizedBase.slice(0, -1)
  if (assetPath === baseWithoutTrailingSlash || assetPath.startsWith(normalizedBase)) return assetPath
  return `${normalizedBase}${assetPath.replace(/^\/+/, '')}`
}

function publicUrl(siteUrl, path = '') {
  return new URL(path.replace(/^\//, ''), `${siteUrl.replace(/\/$/, '')}/`).toString()
}

export function createSitemapXml({ siteUrl, slugs }) {
  const urls = [publicUrl(siteUrl), publicUrl(siteUrl, 'blog.html')]
  const seen = new Set(urls)
  for (const slug of slugs) {
    if (typeof slug !== 'string' || !slug.trim()) continue
    const url = publicUrl(siteUrl, `insights/${encodeURIComponent(slug)}/`)
    if (!seen.has(url)) { seen.add(url); urls.push(url) }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}\n</urlset>\n`
}

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

export function prerenderedArticle(post, { base, directusUrl }) {
  const title = post.title || 'Insights'
  const excerpt = post.excerpt || ''
  const image = directusAssetUrl(post.featured_image, directusUrl, 1200, 675)
  const meta = [post.category?.name || 'Digital', formatPublishedAt(post.published_at), post.read_time_minutes ? `${post.read_time_minutes} Min. Lesezeit` : ''].filter(Boolean).join(' · ')
  // cms_posts.content is emitted as sanitized HTML by the Sanity-to-Directus migration.
  // Runtime rendering applies an additional browser-side allow-list before displaying it.
  const content = migratedContentHtml(post.content)
  const imageMarkup = image ? `<img class="blog-article-image" src="${escapeHtml(image)}" srcset="${escapeHtml(directusSrcSet(post.featured_image, directusUrl, [640, 960, 1200, 1600]))}" sizes="(max-width: 560px) calc(100vw - 36px), (max-width: 800px) calc(100vw - 60px), 1040px" alt="${escapeHtml(post.featured_image_alt || title)}" width="1600" height="900" fetchpriority="high" />` : ''
  return `<main class="blog-page">${siteHeader(base)}<article class="blog-article"><div class="blog-article-topline blog-article-prelude"><a class="blog-article-back" href="${base}blog.html">← Alle Insights</a><span>${escapeHtml(meta)}</span></div>${imageMarkup}<header class="blog-article-head"><h1>${escapeHtml(title)}</h1>${excerpt ? `\n<p>${escapeHtml(excerpt)}</p>` : ''}<small>Von ${escapeHtml(post.author?.name || 'SideTwo')}</small></header><div class="blog-article-body"><div class="cms-rich-text">${content}</div><aside><strong>Idee im Kopf? Lass uns darüber sprechen.</strong><p>Wir schauen gemeinsam, welcher nächste Schritt für euer Unternehmen Sinn ergibt.</p><a href="${base}#kontakt">Projekt anfragen</a></aside></div></article>${siteFooter(base)}</main>`
}

function prerenderedPostData(post) {
  return JSON.stringify(post).replace(/</g, '\\u003c')
}

function prioritizeStylesheets(html) {
  const stylesheets = html.match(/\s*<link rel="stylesheet"[^>]*>/g) || []
  if (!stylesheets.length) return html
  const withoutStylesheets = html.replace(/\s*<link rel="stylesheet"[^>]*>/g, '')
  return withoutStylesheets.replace(/(<script type="module"[^>]*><\/script>)/, `${stylesheets.join('')}\n    $1`)
}

export function renderBlogIndexHtml({ blogHtml, posts, base, directusUrl }) {
  return prioritizeStylesheets(blogHtml)
    .replace('<div id="root"></div>', `<div id="root">${prerenderedBlogIndex(posts, { base, directusUrl })}</div><script id="directus-prerendered-posts" type="application/json">${prerenderedPostData(posts)}</script>`)
}

export function renderArticleHtml({ blogHtml, scriptPath, base, post, directusUrl, siteUrl }) {
  const title = post.seo_title || post.title || 'Insights'
  return prioritizeStylesheets(blogHtml)
    .replace(/<meta name="description"[^>]*\/?>/, articleMetadata(post, { directusUrl, siteUrl }))
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)} | SideTwo</title>`)
    .replace(scriptPath, withViteBasePath(scriptPath, base))
    .replace('<div id="root"></div>', `<div id="root">${prerenderedArticle(post, { base, directusUrl })}</div><script id="directus-prerendered-insight" type="application/json">${prerenderedPostData(post)}</script>`)
}
