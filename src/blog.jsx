import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeft, ArrowRight, List, MagnifyingGlass, X } from '@phosphor-icons/react'
import { PortableText } from '@portabletext/react'
import { formatPublishedAt, getAllPosts, getPostBySlug, postImageUrl, sanityImageUrl } from './lib/sanity'
import { fallbackPosts, normalisePost } from './lib/posts'
import '@fontsource-variable/manrope'
import './styles.css'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

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
    let structuredData = document.getElementById('insight-structured-data')
    if (!structuredData) { structuredData = document.createElement('script'); structuredData.id = 'insight-structured-data'; structuredData.type = 'application/ld+json'; document.head.appendChild(structuredData) }
    structuredData.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description, datePublished: post.publishedAt, dateModified: post.publishedAt, author: { '@type': 'Person', name: post.author || 'SideTwo' }, image: image ? [image] : undefined, mainEntityOfPage: window.location.href })
    return () => structuredData?.remove()
  }, [post])
  return null
}

const portableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  types: {
    image: ({ value }) => <img src={sanityImageUrl(value, { width: 1200, height: 820 })} alt={value.alt || ''} loading="lazy" />,
  },
  marks: {
    link: ({ children, value }) => <a href={value?.href} target={value?.href?.startsWith('http') ? '_blank' : undefined} rel={value?.href?.startsWith('http') ? 'noreferrer' : undefined}>{children}</a>,
  },
}

function RichText({ body }) {
  if (!body?.length) return null
  if (typeof body[0] === 'string') return body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
  return <PortableText value={body} components={portableTextComponents} />
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

function ArticleIndex({ posts, onOpen }) {
  const [category, setCategory] = useState('Alle')
  const [query, setQuery] = useState('')
  const categories = ['Alle', ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))]
  const visiblePosts = posts.filter((post) => (category === 'Alle' || post.category === category) && `${post.title} ${post.excerpt}`.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de')))
  const featured = posts[0]

  return <section className="blog-page-index" aria-labelledby="blog-page-title">
    <div className="blog-page-index-head"><h1 id="blog-page-title">Wissen, das digitale Arbeit leichter macht.</h1><p>Praktische Einblicke zu Websites, Automatisierung, KI und digitaler Sichtbarkeit.</p></div>
    {featured ? <article className="blog-featured"><button type="button" onClick={() => onOpen(featured.slug)}><img src={postImageUrl(featured, { width: 1400, height: 900 })} alt={featured.mainImage?.alt || featured.title} /><div><span>{featured.category} · {formatPublishedAt(featured.publishedAt)} · {featured.readTime}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><b>Artikel lesen <ArrowRight size={17} weight="bold" /></b></div></button></article> : null}
    <div className="blog-controls"><div className="blog-categories" aria-label="Blog-Kategorien">{categories.map((item) => <button key={item} className={item === category ? 'is-active' : ''} type="button" onClick={() => setCategory(item)}>{item}</button>)}</div><label className="blog-search"><MagnifyingGlass size={17} weight="bold" /><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Artikel durchsuchen" aria-label="Artikel durchsuchen" /></label></div>
    {visiblePosts.length ? <div className="blog-page-list">{visiblePosts.map((post) => <article className="blog-page-card" key={post.slug}><button type="button" onClick={() => onOpen(post.slug)}><img src={postImageUrl(post, { width: 900, height: 650 })} alt={post.mainImage?.alt || post.title} loading="lazy" /><div><span>{post.category || 'Digital'} · {formatPublishedAt(post.publishedAt)} · {post.readTime}</span><h2>{post.title}</h2><p>{post.excerpt}</p><b>Weiterlesen <ArrowRight size={16} weight="bold" /></b></div></button></article>)}</div> : <p className="blog-empty">Zu dieser Suche gibt es noch keinen Artikel.</p>}
  </section>
}

function ArticleDetail({ post, onBack }) {
  return <article className="blog-article"><BlogMeta post={post} /><button className="blog-article-back" type="button" onClick={onBack}><ArrowLeft size={16} weight="bold" /> Alle Artikel</button><div className="blog-article-head"><span>{post.category || 'Digital'} · {formatPublishedAt(post.publishedAt)} · {post.readTime}</span><h1>{post.title}</h1><p>{post.excerpt}</p><small>Von {post.author || 'SideTwo'}</small></div><img className="blog-article-image" src={postImageUrl(post, { width: 1600, height: 900 })} alt={post.mainImage?.alt || post.title} /><div className="blog-article-body"><RichText body={post.body} /><aside><strong>Ein Projekt im Kopf?</strong><p>Wir schauen gemeinsam, welcher nächste Schritt für euer Unternehmen Sinn ergibt.</p><a href={`${asset('')}#kontakt`}>Projekt anfragen <ArrowRight size={16} weight="bold" /></a></aside></div></article>
}

function BlogPage() {
  const [posts, setPosts] = useState(fallbackPosts)
  const [activePost, setActivePost] = useState(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const slug = window.location.hash.slice(1)
      const sanityPosts = await getAllPosts()
      const resolved = sanityPosts.length ? sanityPosts.map(normalisePost) : fallbackPosts
      if (!mounted) return
      setPosts(resolved)
      if (slug) {
        const sanityPost = await getPostBySlug(slug)
        if (!mounted) return
        setActivePost(sanityPost ? normalisePost(sanityPost, resolved.findIndex((post) => post.slug === slug)) : resolved.find((post) => post.slug === slug) || null)
      }
    }
    load().catch(() => undefined)
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (!activePost) document.title = 'Insights | SideTwo'
  }, [activePost])

  const open = (slug) => { window.location.hash = slug; setActivePost(posts.find((post) => post.slug === slug) || null); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const back = () => { window.history.replaceState(null, '', window.location.pathname); setActivePost(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <main className="blog-page"><BlogHeader />{activePost ? <ArticleDetail post={activePost} onBack={back} /> : <ArticleIndex posts={posts} onOpen={open} />}<BlogFooter /></main>
}

createRoot(document.getElementById('root')).render(<BlogPage />)
