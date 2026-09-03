import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

function Icon({ children, size = 24, strokeWidth = 2, ...props }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>
}
const ArrowRight = (props) => <Icon {...props}><path d="M5 12h14M14 7l5 5-5 5" /></Icon>
const ArrowDownRight = (props) => <Icon {...props}><path d="M7 7h10v10M7 17 17 7" /></Icon>
const ChevronLeft = (props) => <Icon {...props}><path d="m15 18-6-6 6-6" /></Icon>
const ChevronRight = (props) => <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>
const Check = (props) => <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>
const Menu = (props) => <Icon {...props}><path d="M4 8h16M4 16h16" /></Icon>
const X = (props) => <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>
const Mail = (props) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></Icon>
const Sparkles = (props) => <Icon {...props}><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></Icon>
const PanelsTopLeft = (props) => <Icon {...props}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></Icon>
const Workflow = (props) => <Icon {...props}><rect x="3" y="3" width="6" height="6" rx="2" /><rect x="15" y="15" width="6" height="6" rx="2" /><path d="M9 6h4a4 4 0 0 1 4 4v5M15 18h-4a4 4 0 0 1-4-4V9" /></Icon>
const Bot = (props) => <Icon {...props}><rect x="4" y="7" width="16" height="13" rx="3" /><path d="M9 12h.01M15 12h.01M9 16h6M12 7V3M9 3h6" /></Icon>
const Code2 = (props) => <Icon {...props}><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" /></Icon>

const projects = [
  { name: 'Gardinen Mannheim', meta: 'Website · UX/UI · Booking', image: asset('assets/projects/gardinen-mannheim-dark.jpg') },
  { name: 'Avci Gerüstbau', meta: 'Website · UX/UI · Development', image: asset('assets/projects/avci-geruestbau.jpg') },
  { name: 'Stadtmüller Bedachungen', meta: 'Website · UX/UI · Development', image: asset('assets/projects/stadtmueller.jpg') },
  { name: 'Ingenieurbüro Nuri', meta: 'Website · UX/UI · Development', image: asset('assets/projects/kfz-nuri.jpg') },
  { name: 'Campingglück', meta: 'Website · UX/UI', image: asset('assets/projects/campingglueck.jpg') },
]

const services = [
  { icon: PanelsTopLeft, title: 'Webseiten', text: 'Design, Texte, SEO, Hosting und Wartung — aus einer Hand.' },
  { icon: Workflow, title: 'Automatisierung', text: 'Angebote, Termine, Rechnungen und Nachfassen laufen von selbst.' },
  { icon: Bot, title: 'KI-Agenten', text: 'Digitale Mitarbeiter für Anrufe, E-Mails und qualifizierte Anfragen.' },
  { icon: Code2, title: 'Interne Tools', text: 'Klare Systeme, die eure Abläufe vereinfachen und täglich genutzt werden.' },
]

function Doodle({ className = '' }) {
  return (
    <svg className={`doodle ${className}`} viewBox="0 0 110 70" aria-hidden="true">
      <path d="M8 18c12 8 8 18 1 31M2 34h29M15 8v50M60 45c15 13 29 15 43 13M69 32c-4 4-8 8-10 13M94 47l9 11-14 1" />
    </svg>
  )
}

function Button({ href = '#kontakt', children, secondary = false, onClick }) {
  return (
    <a className={`button ${secondary ? 'button-secondary' : ''}`} href={href} onClick={onClick}>
      {children}<ArrowRight size={17} strokeWidth={2.5} />
    </a>
  )
}

function Navigation() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav-shell">
      <nav className="nav-pill" aria-label="Hauptnavigation">
        <a href="#ueber-uns">Über uns</a>
        <a href="#kontakt">Kontakt</a>
        <a className="nav-logo" href="#top" aria-label="CODE² Startseite">
          <img src={asset('assets/code2-wordmark.png')} alt="CODE²" />
        </a>
        <a href="#projekte">Projekte</a>
        <a href="#leistungen">Leistungen</a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menü öffnen">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="mobile-menu">
          {['projekte', 'leistungen', 'ablauf', 'ueber-uns', 'kontakt'].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setOpen(false)}>{item.replace('-', ' ')}</a>
          ))}
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="hero grid-bg" id="top">
      <Navigation />
      <div className="hero-heading">
        <Doodle className="hero-doodle" />
        <h1>Wir bauen digitale Auftritte,<br />die <em>arbeiten.</em></h1>
      </div>
      <div className="hero-stage">
        <div className="hero-side hero-side-left">
          <p>Websites, Automatisierungen und interne Tools, die Abläufe vereinfachen und im Alltag wirklich genutzt werden.</p>
          <a className="outline-link" href="#ueber-uns">Mehr über uns</a>
        </div>
        <div className="portrait-wrap">
          <div className="portrait-halo"></div>
          <img src={asset('assets/people/alex-editorial.png')} alt="Alex Kodalis" />
          <div className="portrait-actions">
            <Button>Projekt starten</Button>
            <Button href="#projekte" secondary>Projekte</Button>
          </div>
        </div>
        <div className="hero-side hero-side-right">
          <div className="stars">★★★★★</div>
          <strong>Direkt mit uns</strong>
          <span>Von der Idee bis live.</span>
        </div>
      </div>
    </section>
  )
}

function ServiceRail() {
  return (
    <div className="service-rail" aria-label="Unsere Leistungsbereiche">
      {['Webseiten', 'Automationen', 'KI-Agenten', 'Interne Tools'].map((label, index) => (
        <div key={label}>
          <strong>0{index + 1}<b>+</b></strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

function ProjectCollage() {
  const [active, setActive] = useState(0)
  const prev = () => setActive((active - 1 + projects.length) % projects.length)
  const next = () => setActive((active + 1) % projects.length)
  return (
    <section className="projects dark-panel" id="projekte">
      <ServiceRail />
      <div className="projects-head reveal">
        <h2>Digitale Arbeit,<br />die schon <em>läuft.</em></h2>
        <p>Eine Auswahl echter Auftritte für Handwerk, Dienstleistung und lokale Unternehmen. Entwickelt von der ersten Idee bis zum fertigen Produkt.</p>
      </div>
      <div className="project-showcase reveal">
        <article className="project-main">
          <img src={projects[active].image} alt={`Projekt ${projects[active].name}`} />
          <div className="project-caption">
            <span>{projects[active].meta}</span>
            <strong>{projects[active].name}</strong>
          </div>
        </article>
        <article className="project-side">
          <div className="project-poster-title">CODE<span>²</span></div>
          <img src={projects[(active + 1) % projects.length].image} alt={`Projekt ${projects[(active + 1) % projects.length].name}`} />
          <p>Design ist mehr als Oberfläche.<br /><b>Es ist ein System, das arbeitet.</b></p>
        </article>
      </div>
      <div className="project-controls">
        <button onClick={prev} aria-label="Vorheriges Projekt"><ChevronLeft /></button>
        <span>{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        <button onClick={next} aria-label="Nächstes Projekt"><ChevronRight /></button>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="services grid-bg" id="leistungen">
      <div className="services-visual reveal">
        <div className="orange-sketch"></div>
        <img src={asset('assets/people/alex-editorial.png')} alt="Alex Kodalis" />
        <div className="service-card card-one"><PanelsTopLeft /><div><strong>Webseiten</strong><span>Design, Entwicklung, SEO & Hosting.</span></div></div>
        <div className="service-card card-two"><Workflow /><div><strong>Automatisierung</strong><span>Weniger Routine, mehr Zeit.</span></div></div>
        <div className="service-card card-three"><Bot /><div><strong>KI-Agenten</strong><span>Erreichbar, wenn ihr es nicht seid.</span></div></div>
      </div>
      <div className="services-copy reveal">
        <h2>Was wir am<br /><em>besten können.</em></h2>
        <p><b>Wir bauen nicht einfach digital.</b> Wir verbinden Gestaltung, Entwicklung und Automatisierung zu Lösungen, die klar aussehen und im Alltag funktionieren.</p>
        <ul>
          <li><Check /> Moderne, schnelle Websites</li>
          <li><Check /> Automatisierte Abläufe</li>
          <li><Check /> KI-Lösungen für echte Aufgaben</li>
        </ul>
        <Button>Projekt starten</Button>
      </div>
    </section>
  )
}

function Execution() {
  return (
    <section className="execution dark-panel" id="ablauf">
      <div className="execution-copy reveal">
        <h2>Von der Idee<br />bis <em>live.</em></h2>
        <p>Drei klare Schritte. Direkte Abstimmung. Keine unnötigen Umwege.</p>
        <div className="steps-mini">
          <span><b>01</b> Verstehen</span>
          <span><b>02</b> Bauen</span>
          <span><b>03</b> Live gehen</span>
        </div>
      </div>
      <div className="phone-stack reveal" aria-label="Projektbeispiele">
        {projects.slice(0, 3).map((project, index) => (
          <div className={`phone phone-${index + 1}`} key={project.name}>
            <span></span>
            <img src={project.image} alt="" />
            <b>{project.name}</b>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const onSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }
  return (
    <section className="contact grid-bg" id="kontakt">
      <div className="contact-person reveal">
        <div className="portrait-halo"></div>
        <img src={asset('assets/people/bilal-editorial.png')} alt="Bilal Altuntas" />
        <Doodle />
      </div>
      <div className="contact-copy reveal">
        <h2>Bringt eure Idee<br />zum <em>Leben.</em></h2>
        <p>Ihr habt eine Idee, ein konkretes Projekt oder wisst noch nicht, welche Lösung passt? Erzählt uns kurz davon — wir melden uns persönlich mit einer ersten Einschätzung.</p>
        {sent ? (
          <div className="success-message"><Check /> Danke! Eure Anfrage ist für diese Demo vorgemerkt.</div>
        ) : (
          <form onSubmit={onSubmit}>
            <label>
              <span className="sr-only">E-Mail-Adresse</span>
              <Mail size={18} />
              <input type="email" required placeholder="E-Mail-Adresse" aria-label="E-Mail-Adresse" />
            </label>
            <button className="button" type="submit">Anfrage starten <ArrowRight size={17} /></button>
          </form>
        )}
      </div>
    </section>
  )
}

function ProcessCards() {
  const icons = [Sparkles, PanelsTopLeft, Workflow, ArrowDownRight]
  const steps = [
    ['Verstehen', 'Wir klären, was ihr wirklich braucht.'],
    ['Gestalten', 'Wir machen die Idee sichtbar und klar.'],
    ['Umsetzen', 'Wir bauen die passende digitale Lösung.'],
    ['Verbessern', 'Wir bleiben dran, wenn ihr wachst.'],
  ]
  return (
    <section className="process dark-panel">
      <div className="process-grid">
        {steps.map(([title, text], index) => {
          const Icon = icons[index]
          return (
            <article key={title} className={index === 1 ? 'active' : ''}>
              <div className="orb"><Icon /></div>
              <div className="process-label"><span>0{index + 1}</span><strong>{title}</strong></div>
              <p>{text}</p>
            </article>
          )
        })}
      </div>
      <div className="progress-line"><span></span></div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer grid-bg" id="ueber-uns">
      <div className="footer-brand">
        <img src={asset('assets/code2-wordmark.png')} alt="CODE²" />
        <p>Digitale Auftritte, Automatisierungen und KI-Lösungen, die im Alltag wirklich arbeiten.</p>
        <span>Alexandros Kodalis & Bilal Altuntas</span>
      </div>
      <div className="footer-col">
        <strong>Navigation</strong>
        <a href="#projekte">Projekte</a><a href="#leistungen">Leistungen</a><a href="#ablauf">Ablauf</a><a href="#kontakt">Kontakt</a>
      </div>
      <div className="footer-col">
        <strong>Leistungen</strong>
        <a href="#leistungen">Webseiten</a><a href="#leistungen">Automatisierung</a><a href="#leistungen">KI-Agenten</a><a href="#leistungen">Hosting</a>
      </div>
      <div className="footer-cta">
        <p>Eine Idee, die digital arbeiten soll?</p>
        <h2>Lasst uns daraus<br /><em>ein System machen.</em></h2>
        <Button>Projekt starten</Button>
      </div>
      <div className="footer-bottom"><span>© 2026 CODE². Alle Rechte vorbehalten.</span><span>Direkt. Klar. Persönlich.</span></div>
    </footer>
  )
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting))
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <Hero />
      <ProjectCollage />
      <Services />
      <Execution />
      <Contact />
      <ProcessCards />
      <Footer />
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
