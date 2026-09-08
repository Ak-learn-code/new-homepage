import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowBendDownRight,
  ArrowRight,
  Asterisk,
  BracketsCurly,
  Browser,
  CaretLeft,
  CaretRight,
  ChartLineUp,
  EnvelopeSimple,
  FlowArrow,
  GoogleLogo,
  List,
  Plus,
  Robot,
  X,
} from '@phosphor-icons/react'
import '@fontsource-variable/manrope'
import './styles.css'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const projects = [
  { name: 'da nico', meta: 'Website, Backend, Bestellsystem', image: asset('assets/projects/da-nico.jpg'), short: 'Bestellen, ganz einfach.' },
  { name: 'Avci Gerüstbau', meta: 'Website, UX/UI, Entwicklung', image: asset('assets/projects/avci-geruestbau.jpg'), short: 'Starker Auftritt fürs Handwerk.' },
  { name: 'Krug – Das Restaurant', meta: 'Website, UX/UI, Entwicklung', image: asset('assets/projects/krug-das-restaurant.jpg'), short: 'Regional genießen.' },
  { name: 'Ingenieurbüro Nuri', meta: 'Website, UX/UI, Entwicklung', image: asset('assets/projects/kfz-nuri.jpg'), short: 'Technik verständlich gemacht.' },
  { name: 'Pfrimmpark Arena', meta: 'Website, UX/UI, Entwicklung', image: asset('assets/projects/pfrimmpark-arena.jpg'), short: 'Sport gemeinsam erleben.' },
]

const referenceProjects = [
  { ...projects[0], description: 'Website mit Backend und Bestellsystem für da nico.', url: 'https://da-nico.de/', location: 'Irmtraut' },
  { ...projects[1], description: 'Website, UX/UI und Entwicklung für ein starkes Handwerksunternehmen.', url: 'https://www.avci-geruestbau.de/', location: 'Bürstadt' },
  { ...projects[2], description: 'Website, UX/UI und Entwicklung für ein Restaurant mit regionaler Küche.', url: 'https://krug-das-restaurant.de/', location: 'Rosengarten, Lampertheim' },
  { ...projects[3], description: 'Website, UX/UI und Entwicklung für verständliche technische Leistungen.', url: 'https://ing-kaltbrunn.de/', location: 'Heppenheim' },
  { ...projects[4], description: 'Website, UX/UI und Entwicklung für eine vielseitige Sportanlage.', url: 'https://pfrimmpark-arena.de/', location: 'Worms' },
  { name: 'Michael Noll Handpan', meta: 'Website, UX/UI, Entwicklung', image: asset('assets/projects/handpan-noll.jpg'), description: 'Website und UX/UI für Handpan-Bau, Klang und persönliche Workshops.', url: 'https://bukkador-handpan.de/', location: 'Worms' },
  { name: 'Sordillo Erdbau', meta: 'Website, UX/UI, Entwicklung', image: asset('assets/projects/sordillo.jpg'), description: 'Website und UX/UI für ein regionales Erdbauunternehmen.' },
  { name: 'MP Dienstleistungen', meta: 'Website, UX/UI, Entwicklung', image: asset('assets/projects/mp-dienstleistungen.jpg'), description: 'Website und UX/UI für vielseitige Dienstleistungen aus der Region.' },
]

const serviceItems = [
  { Icon: Browser, title: 'Webseiten', text: 'Design, Texte, SEO und Hosting.' },
  { Icon: FlowArrow, title: 'Automatisierung', text: 'Weniger Routine, mehr Zeit.' },
  { Icon: Robot, title: 'KI-Agenten', text: 'Erreichbar, wenn ihr es nicht seid.' },
  { Icon: BracketsCurly, title: 'Interne Tools', text: 'Systeme, die täglich genutzt werden.' },
]

const clientLogos = [
  { name: 'Gardinen Mannheim', type: 'gardinen' },
  { name: 'AVCI Gerüstbau', type: 'avci' },
  { name: 'Ingenieurbüro Nuri', type: 'nuri' },
  { name: 'Campingglück', type: 'camping' },
  { name: 'Sordillo Erdbau', type: 'sordillo' },
  { name: 'Michael Noll Handpan', type: 'handpan' },
  { name: 'MP Dienstleistungen', type: 'mp' },
  { name: 'Stadtmüller Bedachungen', type: 'stadtmueller' },
]

const processSteps = [
  ['Verstehen', 'Wir klären, was ihr wirklich braucht.'],
  ['Gestalten', 'Wir machen die Idee sichtbar und klar.'],
  ['Umsetzen', 'Wir bauen die passende digitale Lösung.'],
  ['Verbessern', 'Wir bleiben dran, wenn ihr wachst.'],
]

function Button({ href = '#kontakt', children, secondary = false }) {
  return (
    <a className={`button${secondary ? ' button-secondary' : ''}`} href={href}>
      <span>{children}</span><ArrowRight size={17} weight="bold" />
    </a>
  )
}

function HeroActions({ className = '' }) {
  return (
    <div className={`hero-actions ${className}`}>
      <Button>Projekt anfragen</Button>
      <Button href="#projekte" secondary>Projekte ansehen</Button>
    </div>
  )
}

function EditorialMark({ className = '' }) {
  return (
    <span className={`editorial-mark ${className}`} aria-hidden="true">
      <Asterisk weight="bold" /><ArrowBendDownRight weight="bold" />
    </span>
  )
}

function SideTwoLogo({ className = '' }) {
  const logoUrl = `url("${asset('assets/sidetwo-logo-currentcolor.svg')}")`

  return (
    <span
      className={`sidetwo-logo ${className}`}
      aria-hidden="true"
      style={{ WebkitMaskImage: logoUrl, maskImage: logoUrl }}
    />
  )
}

function Navigation() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])

  return (
    <header className="nav-shell">
      <nav className="nav-pill" aria-label="Hauptnavigation">
        <a className="nav-logo" href="#top" aria-label="SideTwo Startseite">
          <SideTwoLogo />
        </a>
        <div className="nav-links">
          <a href="#ueber-uns">Über uns</a>
          <a href="#leistungen">Leistungen</a>
          <a href="#projekte">Projekte</a>
          <a href="#ablauf">Ablauf</a>
        </div>
        <a className="nav-contact" href="#kontakt">Kontakt</a>
        <button
          className="menu-button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        >
          {open ? <X weight="bold" /> : <List weight="bold" />}
        </button>
      </nav>
      {open ? (
        <div className="mobile-menu" id="mobile-navigation">
          {[['projekte', 'Projekte'], ['leistungen', 'Leistungen'], ['ablauf', 'Ablauf'], ['ueber-uns', 'Über uns'], ['kontakt', 'Kontakt']].map(([item, label]) => (
            <a key={item} href={`#${item}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </div>
      ) : null}
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <Navigation />
      <div className="hero-atmosphere" aria-hidden="true">
        <picture>
          <source media="(max-width: 600px)" srcSet={asset('assets/editorial/hero-founders-portrait.webp')} />
          <img src={asset('assets/editorial/hero-founders-landscape.webp')} alt="" />
        </picture>
        <span className="hero-micro hero-micro-top">[SIDE TWO / DIGITAL STUDIO]</span>
        <span className="hero-micro hero-micro-side">[WEBSITES / AUTOMATION / AI]</span>
        <span className="hero-micro hero-micro-bottom">[MANNHEIM / 2026]</span>
      </div>
      <div className="hero-content">
        <div className="hero-heading">
          <div className="google-rating" aria-label="Google-Bewertungen, Profil wird verknüpft">
            <GoogleLogo size={20} weight="bold" aria-hidden="true" />
            <div>
              <strong>Google-Bewertungen</strong>
              <small>Profil wird verknüpft</small>
            </div>
          </div>
          <h1>
            <span>Wir bauen</span>
            <span>digitale Auftritte,</span>
            <span>die <em>arbeiten.</em></span>
          </h1>
          <p>Websites, Automatisierung und KI, die euren Alltag einfacher machen.</p>
          <HeroActions className="hero-copy-actions" />
        </div>
      </div>
      <ClientMarquee />
    </section>
  )
}

function ServiceRail() {
  return (
    <div className="service-rail" aria-label="Unsere Leistungsbereiche">
      {serviceItems.map(({ Icon, title }) => (
        <div key={title}><Icon size={25} weight="duotone" /><strong>{title}</strong></div>
      ))}
    </div>
  )
}

function ClientMarquee() {
  const repeatedLogos = [...clientLogos, ...clientLogos]

  const renderLogo = (type) => {
    if (type === 'gardinen') return <><b>GARDINEN</b><span>MANNHEIM</span></>
    if (type === 'avci') return <><b>AVCI</b><span>GERÜSTBAU</span></>
    if (type === 'nuri') return <><i>KFZ<br />NURI</i><span>INGENIEURBÜRO <b>NURI</b></span></>
    if (type === 'camping') return <><b>Camping</b><span>glück</span></>
    if (type === 'sordillo') return <><i /><b>SORDILLO</b><span>ERDBAU · ABBRUCH</span></>
    if (type === 'handpan') return <><i>◉</i><b>MICHAEL NOLL</b><span>HANDPAN</span></>
    if (type === 'mp') return <><b>MP</b><span>DIENSTLEISTUNGEN</span></>
    return <><b>STADTMÜLLER</b><span>BEDACHUNGEN</span></>
  }

  return (
    <div className="client-marquee" role="region" aria-labelledby="client-marquee-title">
      <div className="client-marquee-head">
        <h2 id="client-marquee-title"><span>Vertraut von Unternehmen</span><span>aus der Region.</span></h2>
      </div>
      <div className="client-marquee-window">
        <div className="client-marquee-track">
          {repeatedLogos.map((client, index) => (
            <article
              className="client-logo-tile"
              key={`${client.type}-${index}`}
              aria-label={index < clientLogos.length ? client.name : undefined}
              aria-hidden={index >= clientLogos.length ? 'true' : undefined}
            >
              <div className={`client-logo-mark logo-${client.type}`} aria-hidden="true">
                {renderLogo(client.type)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function StudioImpact() {
  const headline = 'Wir machen digitale Arbeit leichter. Damit ihr wieder Zeit für Kunden, Entscheidungen und das Wesentliche habt.'
  const headlineWords = headline.split(' ')
  let letterIndex = 0
  const sectionRef = useRef(null)
  const [headingProgress, setHeadingProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const updateProgress = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const bounds = section.getBoundingClientRect()
      const start = window.innerHeight * .76
      const travel = Math.min(620, Math.max(360, bounds.height * .62))
      const nextProgress = Math.min(1, Math.max(0, (start - bounds.top) / travel))
      setHeadingProgress((current) => Math.abs(current - nextProgress) > .002 ? nextProgress : current)
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress)
    }
    updateProgress()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="studio-impact" id="impact" ref={sectionRef} aria-labelledby="studio-impact-title">
      <div className="studio-impact-copy">
        <h2 className="impact-scroll-title" id="studio-impact-title" aria-label={headline}>
          {headlineWords.map((word, wordIndex) => (
            <React.Fragment key={`${word}-${wordIndex}`}>
              {[...word].map((character) => {
                const currentIndex = letterIndex++
                return <span className="impact-letter" style={{ '--letter-fill': Math.min(1, Math.max(0, headingProgress * (headline.length + 8) - currentIndex)) }} key={`${character}-${currentIndex}`}>{character}</span>
              })}
              {wordIndex < headlineWords.length - 1 ? ' ' : null}
              {letterIndex++ && null}
            </React.Fragment>
          ))}
        </h2>
        <p>Websites, Automatisierungen und KI, die nicht mehr Arbeit machen — sondern sie abnehmen.</p>
      </div>
      <div className="studio-impact-grid">
        <article className="impact-card impact-projects">
          <div className="impact-project-mark" aria-hidden="true"><i /><i /><i /></div>
          <strong>10</strong>
          <span>Web-Projekte</span>
          <p>für Unternehmen aus der Region realisiert.</p>
        </article>
        <div className="impact-stack">
          <article className="impact-card impact-team">
            <div className="impact-portraits" aria-label="Alexandros Kodalis und Bilal Altuntas">
              <img src={asset('assets/people/alex-kodalis.png')} alt="Alexandros Kodalis" />
              <img src={asset('assets/people/bilal-altuntas.png')} alt="Bilal Altuntas" />
            </div>
            <strong>Zwei Köpfe.</strong>
            <p>Strategie und Umsetzung, zusammen gedacht.</p>
          </article>
          <article className="impact-card impact-speed">
            <strong>2×</strong><span>klarer entscheiden.</span>
          </article>
        </div>
        <article className="impact-card impact-time">
          <div className="impact-time-mark" aria-hidden="true"><i /><i /><i /></div>
          <strong>Mehr Zeit im Alltag.</strong>
          <p>Automatisierung nimmt Routine aus dem System.</p>
        </article>
        <article className="impact-card impact-quote">
          <span className="impact-quote-mark">„</span>
          <p>Wir sind die zweite Seite eures Unternehmens — die digitale, die mitdenkt.</p>
          <div><ChartLineUp size={18} weight="bold" /> <span>SideTwo</span></div>
        </article>
      </div>
    </section>
  )
}

function ReferencesSequence() {
  const [activeProject, setActiveProject] = useState(null)
  const [isCompact, setIsCompact] = useState(false)
  const [page, setPage] = useState(0)
  const swipeStart = useRef(null)
  const didSwipe = useRef(false)

  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') setActiveProject(null)
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px)')
    const sync = () => {
      setIsCompact(media.matches)
      setPage(0)
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const pageSize = isCompact ? 3 : 6
  const pageCount = Math.ceil(referenceProjects.length / pageSize)
  const visibleProjects = referenceProjects.slice(page * pageSize, page * pageSize + pageSize)
  const changePage = (direction) => setPage((current) => (current + direction + pageCount) % pageCount)
  const endSwipe = (event) => {
    if (swipeStart.current === null) return
    const distance = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(distance) > 42) {
      didSwipe.current = true
      changePage(distance < 0 ? 1 : -1)
    }
  }

  return (
    <section className="references-sequence" id="referenzen" aria-labelledby="references-title">
      <header className="references-heading">
        <h2 id="references-title">Digitale Arbeit, die<br /><em>sichtbar wirkt.</em></h2>
        <div className="references-heading-side">
          <p>Ein Ausschnitt der Auftritte, die wir für Unternehmen aus der Region gestaltet und umgesetzt haben.</p>
          {pageCount > 1 ? <div className="reference-pagination"><span aria-live="polite">{String(page + 1).padStart(2, '0')} / {String(pageCount).padStart(2, '0')}</span><button type="button" onClick={() => changePage(-1)} aria-label="Vorherige Referenzen"><CaretLeft weight="bold" /></button><button type="button" onClick={() => changePage(1)} aria-label="Nächste Referenzen"><CaretRight weight="bold" /></button></div> : null}
        </div>
      </header>
      <div className="references-wall" onPointerDown={(event) => { swipeStart.current = event.clientX }} onPointerUp={endSwipe} onPointerCancel={() => { swipeStart.current = null }}>
        {visibleProjects.map((project) => (
          <button className="reference-tile" type="button" key={project.name} onClick={() => { if (didSwipe.current) { didSwipe.current = false; return } setActiveProject(project) }} aria-label={`Details zu ${project.name} öffnen`}>
            <img src={project.image} alt={`Website-Referenz: ${project.name}`} loading="lazy" />
            <span className="reference-tile-cover">
              <span><b>{project.name}</b><small>{project.meta}</small></span>
              <i><Plus weight="bold" /></i>
            </span>
          </button>
        ))}
      </div>
      {activeProject ? (
        <div className="reference-modal-backdrop" role="presentation" onMouseDown={() => setActiveProject(null)}>
          <article className="reference-modal" role="dialog" aria-modal="true" aria-labelledby="reference-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="reference-modal-close" type="button" onClick={() => setActiveProject(null)} aria-label="Referenz schließen"><X weight="bold" /></button>
            <div className="reference-modal-image"><img src={activeProject.image} alt={`Website-Referenz: ${activeProject.name}`} /></div>
            <div className="reference-modal-copy"><p>{activeProject.meta}</p><h3 id="reference-modal-title">{activeProject.name}</h3><span>{activeProject.description}</span>{activeProject.location ? <small className="reference-location">Standort: {activeProject.location}</small> : null}{activeProject.url ? <a href={activeProject.url} target="_blank" rel="noreferrer">Website ansehen <ArrowRight size={16} weight="bold" /></a> : null}<a href="#kontakt" onClick={() => setActiveProject(null)}>Ähnliche Website anfragen <ArrowRight size={16} weight="bold" /></a></div>
          </article>
        </div>
      ) : null}
    </section>
  )
}

function ProjectCollage() {
  const [active, setActive] = useState(0)
  const project = projects[active]
  const nextProject = projects[(active + 1) % projects.length]

  return (
    <section className="projects dark-panel" id="projekte">
      <ServiceRail />
      <div className="projects-head reveal-on-scroll">
        <h2>Ausgewählte<br /><em>Projekte.</em></h2>
        <p>Eine Auswahl echter Auftritte für Handwerk, Dienstleistung und lokale Unternehmen. Von der Idee bis zum fertigen Produkt.</p>
      </div>
      <div className="project-showcase reveal-on-scroll" key={project.name}>
        <article className="project-main">
          <div className="project-paper-copy"><strong>{project.short}</strong><p>{project.meta}</p></div>
          <div className="project-screen"><img src={project.image} alt={`Projekt ${project.name}`} /></div>
          <div className="project-caption"><span>{project.meta}</span><strong>{project.name}</strong></div>
        </article>
        <article className="project-side">
          <div className="accent-cut" />
          <div className="project-poster-title">Designing<span>²</span></div>
          <img src={nextProject.image} alt={`Projekt ${nextProject.name}`} />
          <p>{nextProject.short}<br /><b>{nextProject.name}</b></p>
        </article>
      </div>
      <div className="project-controls">
        <button onClick={() => setActive((active - 1 + projects.length) % projects.length)} aria-label="Vorheriges Projekt" title="Vorheriges Projekt"><CaretLeft weight="bold" /></button>
        <span aria-live="polite">{project.name}</span>
        <button onClick={() => setActive((active + 1) % projects.length)} aria-label="Nächstes Projekt" title="Nächstes Projekt"><CaretRight weight="bold" /></button>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="services grid-bg" id="leistungen">
      <div className="services-visual reveal-on-scroll">
        <div className="services-halo" />
        <img src={asset('assets/people/alex-kodalis.png')} alt="Alex Kodalis" loading="lazy" width="1254" height="1254" />
        {serviceItems.map(({ Icon, title, text }, index) => (
          <div className={`service-card card-${index + 1}`} key={title}>
            <Icon weight="duotone" /><div><strong>{title}</strong><span>{text}</span></div>
          </div>
        ))}
      </div>
      <div className="services-copy reveal-on-scroll">
        <h2>Was wir am<br /><em>besten können.</em></h2>
        <p><b>Wir bauen nicht einfach digital.</b> Gestaltung, Entwicklung und Automatisierung werden zu Lösungen, die klar aussehen und zuverlässig funktionieren.</p>
        <div className="services-actions"><Button>Projekt anfragen</Button><Button href="#projekte" secondary>Projekte ansehen</Button></div>
      </div>
    </section>
  )
}

function Execution() {
  return (
    <section className="execution dark-panel" id="ablauf">
      <div className="execution-copy reveal-on-scroll">
        <h2>Von der Idee<br />bis <em>live.</em></h2>
        <p>Drei klare Schritte. Direkte Abstimmung. Keine unnötigen Umwege.</p>
        <div className="steps-mini"><span><b>Verstehen</b></span><span><b>Bauen</b></span><span><b>Live gehen</b></span></div>
      </div>
      <div className="showcase-stack reveal-on-scroll" aria-label="Verschiedene Projektansichten">
        <div className="browser-layer"><img src={projects[1].image} alt="Avci Gerüstbau in einer Desktopansicht" loading="lazy" /></div>
        <div className="poster-layer"><img src={projects[2].image} alt="Stadtmüller als Projektplakat" loading="lazy" /><b>Ideen werden Systeme.</b></div>
        <div className="phone-layer"><div className="phone-notch" /><img src={projects[0].image} alt="da nico auf einem Smartphone" loading="lazy" /></div>
      </div>
    </section>
  )
}

function Contact() {
  const [notice, setNotice] = useState(false)

  return (
    <section className="contact grid-bg" id="kontakt">
      <div className="contact-person reveal-on-scroll">
        <div className="portrait-halo" />
        <img src={asset('assets/people/bilal-altuntas.png')} alt="Bilal Altuntas" width="1254" height="1254" />
        <EditorialMark className="contact-mark" />
      </div>
      <div className="contact-copy reveal-on-scroll">
        <h2>Bringt eure Idee<br />zum <em>Leben.</em></h2>
        <p>Ihr habt eine Idee oder wisst noch nicht, welche Lösung passt? Erzählt uns davon. Wir melden uns persönlich mit einer ersten Einschätzung.</p>
        <form onSubmit={(event) => { event.preventDefault(); setNotice(true) }}>
          <div className="field-group">
            <label htmlFor="contact-email">E-Mail-Adresse</label>
            <div className="input-shell"><EnvelopeSimple size={18} /><input id="contact-email" name="email" type="email" required placeholder="name@firma.de" /></div>
            <small>Wir verwenden die Adresse nur für eure Anfrage.</small>
          </div>
          <button className="button" type="submit"><span>Projekt anfragen</span><ArrowRight size={17} weight="bold" /></button>
        </form>
        {notice ? <p className="contact-notice" role="status">Noch nichts gesendet. Eine bestätigte Empfängeradresse muss zuerst hinterlegt werden.</p> : null}
      </div>
    </section>
  )
}

function ProcessCards() {
  const processImage = asset('assets/editorial/process-motifs.png')

  return (
    <section className="process dark-panel" id="prozess" aria-labelledby="process-title">
      <div className="process-heading reveal-on-scroll"><h2 id="process-title">Vier Schritte. <em>Ein Ziel.</em></h2></div>
      <div className="process-grid reveal-on-scroll">
        {processSteps.map(([title, text], index) => (
          <article key={title}>
            <div className="process-art" style={{ '--motif-index': index }}><img src={processImage} alt="" loading="lazy" /></div>
            <div className="process-label"><strong>{title}</strong><ArrowRight size={16} weight="bold" /></div>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer grid-bg" id="ueber-uns">
      <div className="footer-brand"><SideTwoLogo className="footer-brand-logo" /><p>Digitale Auftritte, Automatisierungen und KI-Lösungen, die im Alltag wirklich arbeiten.</p><span>Alexandros Kodalis & Bilal Altuntas</span></div>
      <div className="footer-col"><strong>Sitemap</strong><a href="#top">Start</a><a href="#projekte">Projekte</a><a href="#leistungen">Leistungen</a><a href="#ablauf">Ablauf</a></div>
      <div className="footer-col"><strong>Mehr</strong><a href="#ueber-uns">Über uns</a><a href="#kontakt">Kontakt</a><a href="#kontakt">Projekt anfragen</a></div>
      <div className="footer-contact"><span>Kontakt</span><h2>Lasst uns etwas bauen,<br /><em>das arbeitet.</em></h2><a href="#kontakt">Projekt anfragen <ArrowRight size={18} weight="bold" /></a>{/* TODO: bestätigte E-Mail-Adresse oder Formular-Endpunkt ergänzen. */}</div>
      <div className="footer-bottom"><span>© 2026 CODE². Alle Rechte vorbehalten.</span><span>Direkt. Klar. Persönlich.</span></div>
    </footer>
  )
}

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.16 })

    document.documentElement.classList.add('motion-ready')
    elements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return <main><Hero /><StudioImpact /><ReferencesSequence /><ProjectCollage /><Services /><Execution /><Contact /><ProcessCards /><Footer /></main>
}

createRoot(document.getElementById('root')).render(<App />)
