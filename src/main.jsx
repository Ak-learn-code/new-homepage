import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowBendDownRight,
  ArrowRight,
  Asterisk,
  BracketsCurly,
  Browser,
  CaretLeft,
  CaretRight,
  EnvelopeSimple,
  FlowArrow,
  GoogleLogo,
  List,
  Robot,
  X,
} from '@phosphor-icons/react'
import '@fontsource-variable/manrope'
import './styles.css'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const projects = [
  { name: 'Gardinen Mannheim', meta: 'Website, UX/UI, Booking', image: asset('assets/projects/gardinen-mannheim-dark.jpg'), short: 'Räume neu gedacht.' },
  { name: 'Avci Gerüstbau', meta: 'Website, UX/UI, Entwicklung', image: asset('assets/projects/avci-geruestbau.jpg'), short: 'Starker Auftritt fürs Handwerk.' },
  { name: 'Stadtmüller', meta: 'Website, UX/UI, Entwicklung', image: asset('assets/projects/stadtmueller.jpg'), short: 'Klarheit bis ins Detail.' },
  { name: 'Ingenieurbüro Nuri', meta: 'Website, UX/UI, Entwicklung', image: asset('assets/projects/kfz-nuri.jpg'), short: 'Technik verständlich gemacht.' },
  { name: 'Campingglück', meta: 'Website, UX/UI', image: asset('assets/projects/campingglueck.jpg'), short: 'Freiheit digital erzählt.' },
]

const heroProjects = projects.slice(0, 4)

const serviceItems = [
  { Icon: Browser, title: 'Webseiten', text: 'Design, Texte, SEO und Hosting.' },
  { Icon: FlowArrow, title: 'Automatisierung', text: 'Weniger Routine, mehr Zeit.' },
  { Icon: Robot, title: 'KI-Agenten', text: 'Erreichbar, wenn ihr es nicht seid.' },
  { Icon: BracketsCurly, title: 'Interne Tools', text: 'Systeme, die täglich genutzt werden.' },
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
        <a className="nav-logo" href="#top" aria-label="CODE² Startseite">
          <img src={asset('assets/code2-wordmark.png')} alt="CODE²" />
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
        <span className="hero-orb hero-orb-one" />
        <span className="hero-orb hero-orb-two" />
      </div>
      <div className="hero-content">
        <div className="hero-heading">
          <div className="google-rating" aria-label="Google-Bewertungen, Profil wird verknüpft">
            <GoogleLogo size={28} weight="bold" aria-hidden="true" />
            <div>
              <strong>Google-Bewertungen</strong>
              <small>Profil wird verknüpft</small>
            </div>
          </div>
          <h1>Wir bauen digitale Auftritte,<br />die <em>arbeiten.</em></h1>
          <p>Websites, Automatisierung und KI, die euren Alltag einfacher machen.</p>
          <HeroActions className="hero-copy-actions" />
        </div>
        <div className="hero-founders" aria-label="Alex und Bilal von CODE²">
          <span className="founder-aura" aria-hidden="true" />
          <img className="hero-person hero-person-bilal" src={asset('assets/people/bilal-altuntas.png')} alt="Bilal Altuntas" width="1254" height="1254" />
          <img className="hero-person hero-person-alex" src={asset('assets/people/alex-kodalis.png')} alt="Alex Kodalis" width="1254" height="1254" />
          <div className="founder-signature"><strong>Alex & Bilal</strong><span>CODE²</span></div>
        </div>
      </div>
      <div className="hero-project-rail" aria-label="Ausgewählte Website-Referenzen">
        {heroProjects.map((project) => (
          <a className="hero-project-card" href="#projekte" key={project.name}>
            <img src={project.image} alt={`Website-Referenz ${project.name}`} />
            <span><strong>{project.name}</strong><small>{project.meta.split(',')[0]}</small></span>
          </a>
        ))}
      </div>
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

function ProjectCollage() {
  const [active, setActive] = useState(0)
  const project = projects[active]
  const nextProject = projects[(active + 1) % projects.length]

  return (
    <section className="projects dark-panel" id="projekte">
      <ServiceRail />
      <div className="projects-head reveal-on-scroll">
        <h2>Digitale Arbeit,<br />die schon <em>läuft.</em></h2>
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
        <div className="phone-layer"><div className="phone-notch" /><img src={projects[0].image} alt="Gardinen Mannheim auf einem Smartphone" loading="lazy" /></div>
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
      <div className="footer-brand"><img src={asset('assets/code2-wordmark.png')} alt="CODE²" /><p>Digitale Auftritte, Automatisierungen und KI-Lösungen, die im Alltag wirklich arbeiten.</p><span>Alexandros Kodalis & Bilal Altuntas</span></div>
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

  return <main><Hero /><ProjectCollage /><Services /><Execution /><Contact /><ProcessCards /><Footer /></main>
}

createRoot(document.getElementById('root')).render(<App />)
