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
  FlowArrow,
  GoogleLogo,
  List,
  Plus,
  Robot,
  ShareNetwork,
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
  { Icon: ShareNetwork, title: 'Social Media', text: 'Content, der sichtbar bleibt.' },
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

const founderProfiles = {
  alex: {
    name: 'Alexandros Kodalis',
    portrait: 'assets/people/alex-kodalis.png',
    intro: 'Marketing, Design und digitale Systeme.',
    facts: ['Ausbildung zum Kaufmann für Marketingkommunikation', 'Fokus auf Web Development & Frontend Engineering', 'Spezialisierung auf KI-Workflows und Automatisierung', 'Leidenschaft für UI/UX und digitales Design', 'Performance-, SEO- und Conversion-orientierte Entwicklung'],
    experience: [['2024–2026', 'Kaufmann für Marketingkommunikation (Ausbildung)'], ['Marketing', 'Webentwicklung & E-Commerce'], ['Frontend', 'Responsive Websites & UI-Systeme'], ['Automation', 'n8n, APIs & KI-Workflows'], ['Design', 'Corporate Design & digitale Markenauftritte']],
    linkedin: 'https://www.linkedin.com/in/alexandros-kodalis-42a908334/',
  },
  bilal: {
    name: 'Bilal Altuntas',
    portrait: 'assets/people/bilal-altuntas.png',
    intro: 'Profil und Lebenslauf folgen.',
    facts: ['Quick Facts werden ergänzt.', 'Fokus und Spezialisierung folgen.', 'Berufliche Stationen werden ergänzt.'],
    experience: [['Profil', 'Wird aktuell ergänzt.']],
  },
}

const faqItems = [
  {
    question: 'Welche digitalen Leistungen bietet SideTwo?',
    answer: 'Wir entwickeln Websites, Automatisierungen, KI-gestützte Workflows, interne Tools und Social-Media-Auftritte. Entscheidend ist nicht das einzelne Tool, sondern eine Lösung, die eure Arbeit und eure Anfragen wirklich leichter macht.',
  },
  {
    question: 'Für welche Unternehmen arbeitet ihr?',
    answer: 'Wir arbeiten besonders gern mit Handwerksbetrieben, Dienstleistungsunternehmen, Gastronomie und lokalen Marken aus der Region Mannheim, Worms, Bergstraße und darüber hinaus. Wichtig ist ein echtes Vorhaben, kein bestimmtes Unternehmensalter oder eine bestimmte Größe.',
  },
  {
    question: 'Kann SideTwo eine bestehende Website verbessern?',
    answer: 'Ja. Wir schauen zuerst auf Struktur, Inhalte, Geschwindigkeit, mobile Nutzung und Anfragen. Danach entscheiden wir gemeinsam, ob ein gezieltes Update reicht oder ein neuer digitaler Auftritt sinnvoller ist.',
  },
  {
    question: 'Unterstützt ihr bei SEO und lokaler Sichtbarkeit?',
    answer: 'Bei neuen Websites legen wir eine saubere technische Basis für Suchmaschinen an: klare Seitenstruktur, relevante Inhalte, schnelle mobile Darstellung und lokale Signale. Konkrete Rankings versprechen wir nicht, aber wir bauen die Voraussetzungen dafür.',
  },
  {
    question: 'Wann sind Automatisierung oder KI-Agenten sinnvoll?',
    answer: 'Wenn wiederkehrende Anfragen, Terminabstimmungen, Nachfassaktionen oder interne Informationen Zeit kosten, prüfen wir den Ablauf mit euch. Dann automatisieren wir nur die Schritte, die eurem Team zuverlässig Arbeit abnehmen.',
  },
  {
    question: 'Könnt ihr Website, Backend und Bestellsystem zusammen umsetzen?',
    answer: 'Ja. Wenn ein Projekt es braucht, verbinden wir den sichtbaren Auftritt mit den Prozessen dahinter, zum Beispiel Anfragen, Bestellungen, Formulare oder interne Abläufe. So entsteht kein schöner Auftritt ohne funktionierendes System.',
  },
  {
    question: 'Wie startet ein Projekt mit SideTwo?',
    answer: 'Ihr beschreibt kurz euer Vorhaben über das Kontaktformular. Danach sprechen wir persönlich über Ziel, Ausgangslage und Prioritäten. Erst wenn klar ist, was sinnvoll ist, schlagen wir den nächsten konkreten Schritt vor.',
  },
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
      <Button href="#referenzen" secondary>Projekte ansehen</Button>
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
          <a href="#referenzen">Projekte</a>
          <a href="#fallstudien">Fallstudien</a>
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
          {[['referenzen', 'Projekte'], ['leistungen', 'Leistungen'], ['ueber-uns', 'Über uns'], ['kontakt', 'Kontakt']].map(([item, label]) => (
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

function ScrollFillHeading({ id, className = '', text, fillColor, mutedColor }) {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const words = text.split(' ')
  let letterIndex = 0

  useEffect(() => {
    let frame = 0
    const updateProgress = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const bounds = section.getBoundingClientRect()
      const start = window.innerHeight * .78
      const travel = Math.min(620, Math.max(330, bounds.height * .56))
      const nextProgress = Math.min(1, Math.max(0, (start - bounds.top) / travel))
      setProgress((current) => Math.abs(current - nextProgress) > .002 ? nextProgress : current)
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
    <h2 ref={sectionRef} id={id} className={`scroll-fill-title ${className}`} style={{ '--scroll-fill': fillColor, '--scroll-muted': mutedColor }} aria-label={text}>
      {words.map((word, wordIndex) => (
        <React.Fragment key={`${word}-${wordIndex}`}>
          {[...word].map((character) => {
            const currentIndex = letterIndex++
            return <span className="scroll-fill-letter" style={{ '--letter-fill': Math.min(1, Math.max(0, progress * (text.length + 8) - currentIndex)) }} key={`${character}-${currentIndex}`}>{character}</span>
          })}
          {wordIndex < words.length - 1 ? ' ' : null}
          {letterIndex++ && null}
        </React.Fragment>
      ))}
    </h2>
  )
}

function StudioImpact() {
  const headline = 'Wir machen digitale Arbeit leichter. Damit ihr wieder Zeit für Kunden, Entscheidungen und das Wesentliche habt.'
  const headlineWords = headline.split(' ')
  let letterIndex = 0
  const sectionRef = useRef(null)
  const [headingProgress, setHeadingProgress] = useState(0)
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setProfileOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

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
          <button className="impact-card impact-team" type="button" onClick={() => setProfileOpen(true)} aria-haspopup="dialog" aria-label="Profile von Alexandros Kodalis und Bilal Altuntas öffnen">
            <div className="impact-portraits" aria-label="Alexandros Kodalis und Bilal Altuntas">
              <img src={asset('assets/people/alex-kodalis.png')} alt="Alexandros Kodalis" />
              <img src={asset('assets/people/bilal-altuntas.png')} alt="Bilal Altuntas" />
            </div>
            <strong>Zwei Köpfe.</strong>
            <p>Strategie und Umsetzung, zusammen gedacht.</p>
            <span className="impact-team-plus" aria-hidden="true"><Plus weight="bold" /></span>
          </button>
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
      {profileOpen ? (
        <div className="reference-modal-backdrop team-modal-backdrop" role="presentation" onMouseDown={() => setProfileOpen(false)}>
          <article className="team-modal team-overview-modal" role="dialog" aria-modal="true" aria-labelledby="team-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="reference-modal-close" type="button" onClick={() => setProfileOpen(false)} aria-label="Profil schließen"><X weight="bold" /></button>
            <header className="team-overview-head"><span>SideTwo</span><h3 id="team-modal-title">Zwei Köpfe. Eine digitale Seite.</h3><p>Strategie, Gestaltung und technische Umsetzung direkt aus einer Hand.</p></header>
            <div className="team-overview-grid">
              {Object.entries(founderProfiles).map(([key, founder]) => (
                <article className={`team-profile-card team-profile-card-${key}`} key={key}>
                  <div className="team-profile-image"><img src={asset(founder.portrait)} alt={founder.name} /></div>
                  <div className="team-profile-content">
                    <p>Gründer · SideTwo</p><h4>{founder.name}</h4><strong>{founder.intro}</strong>
                    <ul>{founder.facts.slice(0, key === 'alex' ? 3 : 2).map((fact) => <li key={fact}>{fact}</li>)}</ul>
                    {founder.linkedin ? <a href={founder.linkedin} target="_blank" rel="noreferrer">LinkedIn-Profil <ArrowRight size={15} weight="bold" /></a> : <span>Profil wird ergänzt.</span>}
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>
      ) : null}
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
        <ScrollFillHeading id="references-title" className="references-scroll-title" text="Digitale Arbeit, die sichtbar wirkt." fillColor="#182425" mutedColor="rgba(24, 36, 37, .19)" />
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

function ServiceShowcase() {
  const serviceSlides = [
    {
      name: 'Webseiten',
      Icon: Browser,
      description: 'Ein Auftritt, der eure Leistung verständlich macht – und die passenden Anfragen auslöst.',
      image: asset('assets/services/websites-showcase.jpg'),
      type: 'website',
    },
    {
      name: 'Automatisierung',
      Icon: FlowArrow,
      description: 'Wiederkehrende Abläufe laufen verlässlich im Hintergrund. Euer Team gewinnt Zeit zurück.',
      image: asset('assets/services/automation-showcase.jpg'),
      type: 'automation',
    },
    {
      name: 'KI-Agenten',
      Icon: Robot,
      description: 'Digitale Mitarbeitende, die Anfragen sortieren, zuhören und zuverlässig antworten.',
      image: asset('assets/services/agents-showcase.jpg'),
      type: 'agent',
    },
    {
      name: 'Interne Tools',
      Icon: BracketsCurly,
      description: 'Eigene kleine Systeme, die Informationen bündeln und eure tägliche Arbeit klar machen.',
      image: asset('assets/services/tools-showcase.jpg'),
      type: 'tools',
    },
    {
      name: 'Social Media',
      Icon: ShareNetwork,
      description: 'Content und Betreuung, die euren Auftritt konsistent sichtbar und relevant hält.',
      image: asset('assets/services/social-media-showcase.jpg'),
      type: 'social',
    },
  ]
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const sectionRef = useRef(null)
  const serviceLineRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window)) {
      setHasEntered(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setHasEntered(true)
      observer.disconnect()
    }, { threshold: .22 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame = 0
    const updateLine = () => {
      frame = 0
      const section = sectionRef.current
      const line = serviceLineRef.current
      if (!section || !line) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        line.style.setProperty('--service-line-dash', '2200px')
        return
      }
      const bounds = section.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (window.innerHeight * .98 - bounds.top) / (bounds.height + window.innerHeight * .08)))
      line.style.setProperty('--service-line-dash', `${Math.round(2200 * (1 - progress))}px`)
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateLine)
    }
    updateLine()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (paused) return undefined
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % serviceSlides.length)
    }, 4600)
    return () => window.clearInterval(interval)
  }, [paused, serviceSlides.length])

  const cardClassName = (index) => {
    const distance = (index - activeIndex + serviceSlides.length) % serviceSlides.length
    if (distance === 0) return 'is-active'
    if (distance === 1) return 'is-next'
    if (distance === serviceSlides.length - 1) return 'is-previous'
    return 'is-hidden'
  }

  return (
    <section className="service-carousel" id="leistungen" ref={sectionRef} aria-labelledby="service-carousel-title">
      <div className="service-scroll-orbit" ref={serviceLineRef} aria-hidden="true">
        <svg viewBox="0 0 1600 560" preserveAspectRatio="none" focusable="false">
          <defs>
            <linearGradient id="service-loop-amber" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#f4a24d" />
              <stop offset=".55" stopColor="#ffb16a" />
              <stop offset="1" stopColor="#ee8e39" />
            </linearGradient>
          </defs>
          <path d="M -96 414 C 155 267 331 558 622 426 C 858 319 835 177 1085 125 C 1348 71 1481 219 1369 359 C 1260 495 1044 448 1053 324 C 1062 202 1251 191 1415 277 C 1532 338 1646 401 1710 345" />
        </svg>
      </div>
      <div className="service-carousel-head">
        <ScrollFillHeading id="service-carousel-title" className="service-scroll-title" text="Das sind unsere Dienstleistungen." fillColor="#edf1ec" mutedColor="rgba(237, 241, 236, .3)" />
        <p>Die Bausteine für einen Auftritt, der im Alltag wirklich etwas leichter macht.</p>
      </div>
      <div className="service-carousel-shell" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className={`service-carousel-list${hasEntered ? ' is-visible' : ''}`} aria-label="Leistungsbereiche">
          {serviceSlides.map(({ name, Icon }, index) => (
            <button key={name} style={{ '--option-index': index }} className={index === activeIndex ? 'is-active' : ''} type="button" onClick={() => setActiveIndex(index)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} aria-pressed={index === activeIndex}>
              <Icon size={19} weight="regular" aria-hidden="true" /><span>{name}</span>
            </button>
          ))}
        </div>
        <div className="service-carousel-stage" aria-live="polite">
          {serviceSlides.map((slide, index) => (
            <article className={`service-carousel-card ${cardClassName(index)}`} key={slide.name} aria-hidden={index !== activeIndex}>
              <div className={`service-carousel-media service-carousel-media-${slide.type}`}><img src={slide.image} alt="" /></div>
              <div className="service-carousel-caption"><span>{slide.name}</span><h3>{slide.description}</h3><ArrowRight size={22} weight="light" /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudiesPlaceholder() {
  return (
    <section className="proof-placeholder" id="fallstudien" aria-labelledby="proof-placeholder-title">
      <div className="proof-placeholder-head">
        <h2 id="proof-placeholder-title">Fallstudien und Stimmen,<br />die bald <em>mehr erzählen.</em></h2>
        <p>Hier entsteht Raum für ausführliche Einblicke in Projekte und für echte Rückmeldungen unserer Kundinnen und Kunden.</p>
      </div>
      <div className="proof-placeholder-grid">
        <article className="case-study-placeholder">
          <div className="case-study-art" aria-hidden="true"><i /><i /><i /><b /></div>
          <div><span>Fallstudien</span><h3>Wie aus Anforderungen funktionierende digitale Auftritte werden.</h3><p>In Vorbereitung</p></div>
        </article>
        <article className="reviews-placeholder">
          <div className="review-quote" aria-hidden="true">„</div>
          <h3>Echte Kundenstimmen folgen hier.</h3>
          <div className="review-lines" aria-hidden="true"><i /><i /><i /></div>
          <p>In Vorbereitung</p>
        </article>
      </div>
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
    <section className="services grid-bg" id="leistungen-archiv">
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
  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState('Webseite')

  return (
    <section className="project-start" id="kontakt" aria-labelledby="project-start-title">
      <div className="project-start-inner">
        <div className="project-start-copy">
          <h2 id="project-start-title">Lasst uns herausfinden,<br />was wir für euch <em>umsetzen können.</em></h2>
          <p>Ihr habt eine Idee, ein konkretes Projekt oder wisst noch nicht genau, welche Lösung passt? Beantwortet ein paar kurze Fragen – wir melden uns mit einer ehrlichen ersten Einschätzung.</p>
          <div className="project-start-trust" aria-label="Hinweise zur Anfrage"><span>Unverbindlich</span><span>Persönliche Rückmeldung</span><span>In der Regel innerhalb von 24 Stunden</span></div>
          <div className="project-start-image"><img src={asset('assets/contact/project-start-team.jpg')} alt="Alex und Bilal von SideTwo bei der gemeinsamen Projektarbeit" /></div>
        </div>
        <div className="project-start-form-wrap">
          <form className="project-start-form" onSubmit={(event) => { event.preventDefault(); if (step === 1) setStep(2); else setNotice(true) }}>
            <div className="project-start-progress"><div><span>Schritt {step} von 2</span><strong>{step === 1 ? 'Leistung auswählen' : 'Kontakt teilen'}</strong></div></div>
            {step === 1 ? (
              <fieldset className="project-service-choices">
                <legend>Wobei können wir euch unterstützen?</legend>
                {['Webseite', 'Automatisierung', 'KI-Agenten', 'Social Media Betreuung', 'Noch nicht sicher'].map((choice) => (
                  <label key={choice} className={projectType === choice ? 'is-selected' : ''}><input type="radio" name="projectType" value={choice} checked={projectType === choice} onChange={() => setProjectType(choice)} /><span>{choice}</span><i>✓</i></label>
                ))}
              </fieldset>
            ) : (
              <div className="project-contact-fields">
                <label htmlFor="contact-name">Name<input id="contact-name" name="name" required placeholder="Vor- und Nachname" /></label>
                <label htmlFor="contact-email">E-Mail-Adresse<input id="contact-email" name="email" type="email" required placeholder="name@firma.de" /></label>
                <label htmlFor="contact-message">Kurz zum Projekt<textarea id="contact-message" name="message" rows="3" placeholder="Worum geht es?" /></label>
                <label className="privacy-consent"><input type="checkbox" name="privacy" required /><span>Ich habe die <a href={asset('datenschutz')}>Datenschutzerklärung</a> gelesen und akzeptiere sie.</span></label>
              </div>
            )}
            <div className="project-start-actions">
              {step === 2 ? <button className="project-back" type="button" onClick={() => setStep(1)}>Zurück</button> : <span />}
              <button className="project-next" type="submit"><span>{step === 1 ? 'Weiter' : 'Anfrage vorbereiten'}</span><ArrowRight size={17} weight="bold" /></button>
            </div>
          </form>
          {notice ? <p className="contact-notice" role="status">Die Anfrage ist vorbereitet. Für den Versand fehlt nur noch die Empfängeradresse des Kontaktformulars.</p> : null}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="faq-intro">
        <h2 id="faq-title">Fragen, die vor dem<br /><em>Start wichtig sind.</em></h2>
        <p>Hier findet ihr klare Antworten zu Websites, Automatisierung, KI und der Zusammenarbeit mit SideTwo.</p>
        <a href="#kontakt" className="faq-contact-link">Etwas anderes vor? <span>Projekt anfragen</span><ArrowRight size={16} weight="bold" /></a>
      </div>
      <div className="faq-list">
        {faqItems.map((item, index) => {
          const open = index === openIndex
          return (
            <article className={`faq-item${open ? ' is-open' : ''}`} key={item.question}>
              <h3>
                <button type="button" aria-expanded={open} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(open ? -1 : index)}>
                  <span>{item.question}</span><i aria-hidden="true"><Plus size={19} weight="bold" /></i>
                </button>
              </h3>
              <div className="faq-answer" id={`faq-answer-${index}`} hidden={!open}><p>{item.answer}</p></div>
            </article>
          )
        })}
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
    <footer className="footer" id="ueber-uns">
      <div className="footer-inner">
        <div className="footer-brand"><SideTwoLogo className="footer-brand-logo" /><p>Wir bauen digitale Auftritte, Systeme und Automatisierungen, die im Alltag wirklich arbeiten.</p><a className="footer-linkedin" href="https://www.linkedin.com/in/alexandros-kodalis-42a908334/" target="_blank" rel="noreferrer">LinkedIn <ArrowRight size={15} weight="bold" /></a></div>
        <div className="footer-col"><strong>Leistungen</strong><a href="#leistungen">Webseiten</a><a href="#leistungen">Automatisierung</a><a href="#leistungen">KI-Agenten</a><a href="#leistungen">Social Media</a></div>
        <div className="footer-col"><strong>Studio</strong><a href="#impact">Über uns</a><a href="#referenzen">Projekte</a><a href="#fallstudien">Fallstudien</a><a href="#faq">Fragen &amp; Antworten</a><a href="#kontakt">Kontakt</a></div>
        <div className="footer-col"><strong>Starten</strong><a href="#kontakt">Projekt anfragen</a><a href="#kontakt">Unverbindlich sprechen</a><a href={asset('datenschutz')}>Datenschutz</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 SideTwo. Alle Rechte vorbehalten.</span><span>Alexandros Kodalis &amp; Bilal Altuntas</span><span>Direkt. Klar. Persönlich.</span></div>
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

  return <main><Hero /><StudioImpact /><ReferencesSequence /><ServiceShowcase /><CaseStudiesPlaceholder /><Contact /><FAQ /><Footer /></main>
}

createRoot(document.getElementById('root')).render(<App />)
