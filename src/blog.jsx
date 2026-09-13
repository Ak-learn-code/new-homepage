import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { getAllPosts, getPostBySlug } from './lib/sanity'
import { fallbackPosts, normalisePost } from './lib/posts'
import '@fontsource-variable/manrope'
import './styles.css'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

function textFromBlock(block) {
  if (typeof block === 'string') return block
  return block?.children?.map((child) => child.text).join('') || ''
}

function BlogHeader() {
  return <header className="blog-page-nav"><a className="blog-page-wordmark" href={asset('')}>SideTwo</a><a href={asset('')}>Zur Startseite <ArrowRight size={16} weight="bold" /></a></header>
}

function ArticleIndex({ posts, onOpen }) {
  return <section className="blog-page-index" aria-labelledby="blog-page-title"><div className="blog-page-index-head"><div><span>SideTwo Journal</span><h1 id="blog-page-title">Gedanken für digitale Arbeit, die im Alltag ankommt.</h1></div><p>Praktische Einblicke zu Websites, Automatisierung, KI und digitalen Prozessen für regionale Unternehmen.</p></div><div className="blog-page-list">{posts.map((post) => <article className="blog-page-card" key={post.slug}><button type="button" onClick={() => onOpen(post.slug)}><img src={post.image} alt="" /><div><span>{post.readTime}</span><h2>{post.title}</h2><p>{post.excerpt}</p><b>Weiterlesen <ArrowRight size={16} weight="bold" /></b></div></button></article>)}</div></section>
}

function ArticleDetail({ post, onBack }) {
  const paragraphs = (post.body || []).map(textFromBlock).filter(Boolean)
  return <article className="blog-article"><button className="blog-article-back" type="button" onClick={onBack}><ArrowLeft size={16} weight="bold" /> Alle Artikel</button><div className="blog-article-head"><span>{post.readTime}</span><h1>{post.title}</h1><p>{post.excerpt}</p></div><img className="blog-article-image" src={post.image} alt="" /><div className="blog-article-body">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<aside><strong>Ein Projekt im Kopf?</strong><p>Wir schauen gemeinsam, welcher nächste Schritt für euer Unternehmen Sinn ergibt.</p><a href={`${asset('')}#kontakt`}>Projekt anfragen <ArrowRight size={16} weight="bold" /></a></aside></div></article>
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

  const open = (slug) => { window.location.hash = slug; setActivePost(posts.find((post) => post.slug === slug) || null); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const back = () => { window.history.replaceState(null, '', window.location.pathname); setActivePost(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <main className="blog-page"><BlogHeader />{activePost ? <ArticleDetail post={activePost} onBack={back} /> : <ArticleIndex posts={posts} onOpen={open} />}</main>
}

createRoot(document.getElementById('root')).render(<BlogPage />)
