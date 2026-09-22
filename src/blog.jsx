import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeft, ArrowRight, List, MagnifyingGlass, X } from '@phosphor-icons/react'
import { formatPublishedAt, getAllDirectusPosts as getAllPosts, getDirectusPostBySlug as getPostBySlug, postImageUrl } from './lib/directus'
import '@fontsource-variable/manrope'
import './styles.css'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`
const slugFromLocation = () => {
  const route = window.location.pathname.match(/\/insights\/([^/]+)\/?$/)
  return route ? decodeURIComponent(route[1]) : window.location.hash.slice(1).replace(/[.]+$/, '')
}
const insightUrl = (slug) => asset(`insights/${encodeURIComponent(slug)}/`)

function BlogMeta({ post }) {
  useEffect(() => {
    if (!post) return undefined
    const title = post.seoTitle || post.title
    const description = post.seoDescription || post.excerpt
    const image = postImageUrl(post, { width: 1600, height: 900 })
    document.title = `${title} | SideTwo`
    const upsert = (selector, attribute, value) => {
      let node = document.head.querySelector(selector)
      if (!node) { node = document.createElement('meta'); document.head.appendChild(node) }
      node.setAttribute(attribute, selector.includes('property=') ? selector.match(/property=\"([^\"]+)/)?.[1] : selector.match(/name=\"([^\"]+)/)?.[1])
      node.content = value
    }
    upsert('meta[name="description"]', 'name', description)
    upsert('meta[property="og:title"]', 'property', title)
    upsert('meta[property="og:description"]', 'property', description)
    upsert('meta[property="og:image"]', 'property', image)
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = post.canonicalUrl || window.location.href
    let structuredData = document.getElementById('insight-structured-data')
    if (!structuredData) { structuredData = document.createElement('script'); structuredData.id = 'insight-structured-data'; structuredData.type = 'application/ld+json'; document.head.appendChild(structuredData) }
    structuredData.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description, datePublished: post.publishedAt, dateModified: post.publishedAt, author: { '@type': 'Person', name: post.author || 'SideTwo' }, image: image ? [image] : undefined, mainEntityOfPage: window.location.href })
    return () => structuredData?.remove()
  }, [post])
  return null
}

function RichText({ body }) {
  if (typeof body !== 'string' || !body) return null
  return <div className="cms-rich-text" dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(body) }} />
}

function sanitizeCmsHtml(value) {
  const template = document.createElement('template')
  template.innerHTML = value
  const allowed = new Set(['P', 'STRONG', 'EM', 'CODE', 'PRE', 'A', 'H2', 'H3', 'BLOCKQUOTE', 'UL', 'OL', 'LI', 'FIGURE', 'FIGCAPTION', 'IMG', 'BR'])
  const assetPrefix = `${(import.meta.env.VITE_DIRECTUS_URL || 'https://directus.sidetwo.de').replace(/\/$/, '')}/assets/`
  for (const node of [...template.content.querySelectorAll('*')]) {
    if (!allowed.has(node.tagName)) { node.replaceWith(...node.childNodes); continue }
    for (const attribute of [...node.attributes]) {
      const isHref = node.tagName === 'A' && attribute.name === 'href' && /^(https?:|mailto:|\/|#)/i.test(attribute.value)
      const isImage = node.tagName === 'IMG' && attribute.name === 'src' && attribute.value.startsWith(assetPrefix)
      const isAlt = node.tagName === 'IMG' && attribute.name === 'alt'
      if (!isHref && !isImage && !isAlt) node.removeAttribute(attribute.name)
    }
    if (node.tagName === 'A') { node.setAttribute('rel', 'noopener noreferrer'); if (/^https?:/i.test(node.getAttribute('href') || '')) node.setAttribute('target', '_blank') }
  }
  return template.innerHTML
}

function SideTwoLogo({ className = '' }) {
  const logoUrl = `url("${asset('assets/sidetwo-logo-currentcolor.svg')}")`
  return <span className={`sidetwo-logo ${className}`} aria-hidden="true" style={{ WebkitMaskImage: logoUrl, maskImage: logoUrl }} />
}

function BlogHeader() {
  const [open, setOpen] = useState(false)
  const home = (anchor = '') => `${asset('')}${anchor}`
  return <header className="nav-shell blog-site-header">
    <nav className="nav-pill" aria-label="Hauptnavigation">
      <a className="nav-logo" href={home('#top')} aria-label="SideTwo Startseite"><SideTwoLogo /></a>
      <div className="nav-links"><a href={home('#ueber-uns')}>Über uns</a><a href={home('#leistungen')}>Leistungen</a><a href={home('#referenzen')}>Projekte</a><a href={home('#fallstudien')}>Fallstudien</a></div>
      <a className="nav-contact" href={home('#kontakt')}>Kontakt</a>
      <button className="menu-button" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="blog-mobile-navigation" aria-label={open ? 'Menü schließen' : 'Menü öffnen'}>{open ? <X weight="bold" /> : <List weight="bold" />}</button>
    </nav>
    {open ? <div className="mobile-menu" id="blog-mobile-navigation"><a href={home('#referenzen')} onClick={() => setOpen(false)}>Projekte</a><a href={home('#leistungen')} onClick={() => setOpen(false)}>Leistungen</a><a href={home('#ueber-uns')} onClick={() => setOpen(false)}>Über uns</a><a href={home('#kontakt')} onClick={() => setOpen(false)}>Kontakt</a></div> : null}
  </header>
}

function BlogFooter() {
  const home = (anchor = '') => `${asset('')}${anchor}`
  return <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand"><SideTwoLogo className="footer-brand-logo" /><p>Wir bauen digitale Auftritte, Systeme und Automatisierungen, die im Alltag wirklich arbeiten.</p><a className="footer-linkedin" href="https://www.linkedin.com/in/alexandros-kodalis-42a908334/" target="_blank" rel="noreferrer">LinkedIn <ArrowRight size={15} weight="bold" /></a></div>
      <div className="footer-col"><strong>Leistungen</strong><a href={home('#leistungen')}>Webseiten</a><a href={home('#leistungen')}>Automatisierung</a><a href={home('#leistungen')}>KI-Agenten</a><a href={home('#leistungen')}>Social Media</a></div>
      <div className="footer-col"><strong>Studio</strong><a href={home('#impact')}>Über uns</a><a href={home('#referenzen')}>Projekte</a><a href={home('#fallstudien')}>Fallstudien</a><a href={home('#faq')}>Fragen &amp; Antworten</a><a href={home('#kontakt')}>Kontakt</a></div>
      <div className="footer-col"><strong>Starten</strong><a href={home('#kontakt')}>Projekt anfragen</a><a href={home('#kontakt')}>Unverbindlich sprechen</a><a href={asset('datenschutz')}>Datenschutz</a></div>
    </div>
    <div className="footer-bottom"><span>© 2026 SideTwo. Alle Rechte vorbehalten.</span><span>Alexandros Kodalis &amp; Bilal Altuntas</span><span>Direkt. Klar. Persönlich.</span></div>
  </footer>
}

const CATEGORY_ORDER = ['Websites', 'Automatisierung', 'KI', 'Marketing', 'Design', 'Strategie', 'Sichtbarkeit']

function ArticleIndex({ posts, onOpen, isLoading = false, error = '' }) {
  const [category, setCategory] = useState('Alle')
  const [query, setQuery] = useState('')
  const foundCategories = Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))
  const categories = ['Alle', ...CATEGORY_ORDER.filter((item) => foundCategories.includes(item)), ...foundCategories.filter((item) => !CATEGORY_ORDER.includes(item)).sort((a, b) => a.localeCompare(b, 'de'))]
  const featured = posts[0]
  const visiblePosts = posts.filter((post) => post.slug !== featured?.slug && (category === 'Alle' || post.category === category) && `${post.title} ${post.excerpt}`.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de')))

  return <section className="blog-page-index" aria-labelledby="blog-page-title">
    <div className="blog-page-index-head"><span className="blog-page-kicker">SIDETWO INSIGHTS</span><h1 id="blog-page-title">Gedanken, Strategien &amp; digitale Ideen.</h1><p>Praktische Insights rund um Websites, Marketing, Automatisierung und KI, ohne unnötiges Agentur-Blabla.</p></div>
    {isLoading ? <div className="blog-loading" aria-live="polite" aria-label="Insights werden geladen"><i /><i /></div> : null}
    {!isLoading && error ? <p className="blog-empty" role="alert">{error}</p> : null}
    {!isLoading && featured ? <article className="blog-featured"><button type="button" onClick={() => onOpen(featured.slug)}><img src={postImageUrl(featured, { width: 1400, height: 900 })} alt={featured.mainImage?.alt || featured.title} /><div className="blog-featured-copy"><span>{featured.category} · {formatPublishedAt(featured.publishedAt)} · {featured.readTime}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><b>Artikel lesen <ArrowRight size={17} weight="bold" /></b></div></button></article> : null}
    {isLoading || error ? null : <>
    <div className="blog-controls"><div className="blog-categories" aria-label="Blog-Kategorien">{categories.map((item) => <button key={item} className={item === category ? 'is-active' : ''} type="button" onClick={() => setCategory(item)}>{item}</button>)}</div><label className="blog-search"><MagnifyingGlass size={17} weight="bold" /><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Artikel durchsuchen" aria-label="Artikel durchsuchen" /></label></div>
    {visiblePosts.length ? <div className="blog-page-list" aria-live="polite">{visiblePosts.map((post) => <article className="blog-page-card" key={post.slug}><button type="button" onClick={() => onOpen(post.slug)}><img src={postImageUrl(post, { width: 900, height: 650 })} alt={post.mainImage?.alt || post.title} loading="lazy" /><div><span>{post.category || 'Digital'} · {formatPublishedAt(post.publishedAt)} · {post.readTime}</span><h2>{post.title}</h2><p>{post.excerpt}</p><b>Weiterlesen <ArrowRight size={16} weight="bold" /></b></div></button></article>)}</div> : <p className="blog-empty">Zu dieser Auswahl gibt es noch keinen weiteren Artikel.</p>}
    </>}
  </section>
}

function ArticleDetail({ post, posts, onBack, onOpen }) {
  const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 3)
  return <article className="blog-article"><BlogMeta post={post} /><div className="blog-article-topline blog-article-prelude"><button className="blog-article-back" type="button" onClick={onBack}><ArrowLeft size={16} weight="bold" /> Alle Insights</button><span>{post.category || 'Digital'} · {formatPublishedAt(post.publishedAt)} · {post.readTime}</span></div><img className="blog-article-image" src={postImageUrl(post, { width: 1600, height: 900 })} alt={post.mainImage?.alt || post.title} /><header className="blog-article-head"><h1>{post.title}</h1><p>{post.excerpt}</p><small>Von {post.author || 'SideTwo'}</small></header><div className="blog-article-body"><RichText body={post.body} /><aside><strong>Idee im Kopf? Lass uns darüber sprechen.</strong><p>Wir schauen gemeinsam, welcher nächste Schritt für euer Unternehmen Sinn ergibt.</p><a href={`${asset('')}#kontakt`}>Projekt anfragen <ArrowRight size={16} weight="bold" /></a></aside></div>{relatedPosts.length ? <section className="blog-related" aria-labelledby="related-insights-title"><h2 id="related-insights-title">Noch mehr Insights</h2><div>{relatedPosts.map((related) => <button key={related.slug} type="button" onClick={() => onOpen(related.slug)}><img src={postImageUrl(related, { width: 680, height: 470 })} alt={related.mainImage?.alt || related.title} loading="lazy" /><span>{related.category || 'Digital'} · {formatPublishedAt(related.publishedAt)}</span><strong>{related.title}</strong><i>Artikel lesen <ArrowRight size={15} weight="bold" /></i></button>)}</div></section> : null}</article>
}

function BlogPage() {
  const [posts, setPosts] = useState([])
  const [activePost, setActivePost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [missingSlug, setMissingSlug] = useState('')

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const slug = slugFromLocation()
      const sourcePosts = await getAllPosts()
      const resolved = sourcePosts
      if (!mounted) return
      setPosts(resolved)
      if (slug) {
        let loadedPost = null
        try { loadedPost = await getPostBySlug(slug) } catch { loadedPost = null }
        if (!mounted) return
        const post = loadedPost || resolved.find((item) => item.slug === slug) || null
        setActivePost(post)
        setMissingSlug(post ? '' : slug)
      }
      if (mounted) setIsLoading(false)
    }
    load().catch((error) => {
      if (!mounted) return
      setPosts([])
      setLoadError(error instanceof Error ? error.message : 'Insights sind gerade nicht verfügbar.')
      setIsLoading(false)
    })
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (!posts.length) return undefined
    const updateRoute = () => {
      const slug = slugFromLocation()
      const post = slug ? posts.find((item) => item.slug === slug) || null : null
      setActivePost(post)
      setMissingSlug(slug && !post ? slug : '')
    }
    window.addEventListener('popstate', updateRoute)
    window.addEventListener('hashchange', updateRoute)
    return () => {
      window.removeEventListener('popstate', updateRoute)
      window.removeEventListener('hashchange', updateRoute)
    }
  }, [posts])

  useEffect(() => {
    if (!activePost) document.title = 'Insights | SideTwo'
  }, [activePost])

  const open = (slug) => { window.history.pushState(null, '', insightUrl(slug)); setActivePost(posts.find((post) => post.slug === slug) || null); setMissingSlug(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const back = () => { window.history.pushState(null, '', asset('blog.html')); setActivePost(null); setMissingSlug(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const pageError = loadError || (missingSlug ? 'Der gewünschte Insight-Artikel wurde nicht gefunden.' : '')
  return <main className="blog-page"><BlogHeader />{activePost ? <ArticleDetail post={activePost} posts={posts} onBack={back} onOpen={open} /> : <ArticleIndex posts={posts} onOpen={open} isLoading={isLoading} error={pageError} />}<BlogFooter /></main>
}

createRoot(document.getElementById('root')).render(<BlogPage />)
