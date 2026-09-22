export const escapeHtml = (value = '') => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const fileId = (value) => typeof value === 'string' ? value : value?.id || ''

function migratedContentHtml(value) {
  return typeof value === 'string' ? value : ''
}

function directusAssetUrl(value, directusUrl) {
  const id = fileId(value)
  return id ? `${directusUrl}/assets/${encodeURIComponent(id)}?format=webp&quality=82` : ''
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
  const image = directusAssetUrl(post.featured_image, directusUrl)
  const meta = [post.category?.name || 'Digital', formatPublishedAt(post.published_at), post.read_time_minutes ? `${post.read_time_minutes} Min. Lesezeit` : ''].filter(Boolean).join(' · ')
  // cms_posts.content is emitted as sanitized HTML by the Sanity-to-Directus migration.
  // Runtime rendering applies an additional browser-side allow-list before displaying it.
  const content = migratedContentHtml(post.content)
  const imageMarkup = image ? `<img class="blog-article-image" src="${escapeHtml(image)}" alt="${escapeHtml(post.featured_image_alt || title)}" width="1600" height="900" fetchpriority="high" />` : ''
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

export function renderArticleHtml({ blogHtml, scriptPath, base, post, directusUrl, siteUrl }) {
  const title = post.seo_title || post.title || 'Insights'
  return prioritizeStylesheets(blogHtml)
    .replace(/<meta name="description"[^>]*\/?>/, articleMetadata(post, { directusUrl, siteUrl }))
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)} | SideTwo</title>`)
    .replace(scriptPath, withViteBasePath(scriptPath, base))
    .replace('<div id="root"></div>', `<div id="root">${prerenderedArticle(post, { base, directusUrl })}</div><script id="directus-prerendered-insight" type="application/json">${prerenderedPostData(post)}</script>`)
}
