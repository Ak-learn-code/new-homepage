import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

function Icon({ children, size = 24, ...props }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>
}
const Arrow = (props) => <Icon {...props}><path d="M5 12h14M14 7l5 5-5 5" /></Icon>
const ChevronLeft = (props) => <Icon {...props}><path d="m15 18-6-6 6-6" /></Icon>
const ChevronRight = (props) => <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>
const Menu = (props) => <Icon {...props}><path d="M4 8h16M4 16h16" /></Icon>
const X = (props) => <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>
const Mail = (props) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></Icon>
const Panels = (props) => <Icon {...props}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></Icon>
const Flow = (props) => <Icon {...props}><rect x="3" y="3" width="6" height="6" rx="2" /><rect x="15" y="15" width="6" height="6" rx="2" /><path d="M9 6h4a4 4 0 0 1 4 4v5M15 18h-4a4 4 0 0 1-4-4V9" /></Icon>
const Bot = (props) => <Icon {...props}><rect x="4" y="7" width="16" height="13" rx="3" /><path d="M9 12h.01M15 12h.01M9 16h6M12 7V3M9 3h6" /></Icon>
const Code = (props) => <Icon {...props}><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" /></Icon>

const projects = [
  { name: 'Gardinen Mannheim', meta: 'Website · UX/UI · Booking', image: asset('assets/projects/gardinen-mannheim-dark.jpg'), short: 'Räume neu gedacht.' },
  { name: 'Avci Gerüstbau', meta: 'Website · UX/UI · Entwicklung', image: asset('assets/projects/avci-geruestbau.jpg'), short: 'Starker Auftritt fürs Handwerk.' },
  { name: 'Stadtmüller', meta: 'Website · UX/UI · Entwicklung', image: asset('assets/projects/stadtmueller.jpg'), short: 'Klarheit bis ins Detail.' },
  { name: 'Ingenieurbüro Nuri', meta: 'Website · UX/UI · Entwicklung', image: asset('assets/projects/kfz-nuri.jpg'), short: 'Technik verständlich gemacht.' },
  { name: 'Campingglück', meta: 'Website · UX/UI', image: asset('assets/projects/campingglueck.jpg'), short: 'Freiheit digital erzählt.' },
]

const serviceItems = [
  { Icon: Panels, title: 'Webseiten', text: 'Design, Texte, SEO und Hosting.' },
  { Icon: Flow, title: 'Automatisierung', text: 'Weniger Routine, mehr Zeit.' },
  { Icon: Bot, title: 'KI-Agenten', text: 'Erreichbar, wenn ihr es nicht seid.' },
  { Icon: Code, title: 'Interne Tools', text: 'Systeme, die täglich genutzt werden.' },
]

function Doodle({ className = '' }) {
  return <svg className={`doodle ${className}`} viewBox="0 0 120 76" aria-hidden="true"><path d="M11 11v50M-1 34h28M4 18l18 31M63 42c15 13 30 17 49 13M67 29l-6 13M101 44l11 11-16 2" /></svg>
}

function Button({ href = '#kontakt', children, secondary = false }) {
  return <a className={`button${secondary ? ' button-secondary' : ''}`} href={href}>{children}<Arrow size={17} /></a>
}

function Navigation() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])
  return (
    <header className="nav-shell"><nav className="nav-pill" aria-label="Hauptnavigation">
      <a href="#ueber-uns">Über uns</a><a href="#kontakt">Kontakt</a><a className="nav-logo" href="#top" aria-label="CODE² Startseite"><img src={asset('assets/code2-wordmark.png')} alt="CODE²" /></a><a href="#projekte">Projekte</a><a href="#leistungen">Leistungen</a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Menü schließen' : 'Menü öffnen'}>{open ? <X /> : <Menu />}</button>
    </nav>{open && <div className="mobile-menu" id="mobile-navigation">{['projekte', 'leistungen', 'ablauf', 'ueber-uns', 'kontakt'].map((item) => <a key={item} href={`#${item}`} onClick={() => setOpen(false)}>{item.replace('-', ' ')}</a>)}</div>}</header>
  )
}

function Hero() {
  return <section className="hero grid-bg" id="top"><Navigation /><div className="hero-heading"><Doodle className="hero-doodle" /><h1>Wir bauen digitale Auftritte,<br />die <em>arbeiten.</em></h1></div><div className="hero-stage">
    <div className="hero-side hero-side-left"><p>Websites, Automatisierungen und interne Tools, die Abläufe vereinfachen und im Alltag wirklich genutzt werden.</p><a className="outline-link" href="#ueber-uns">Mehr über uns</a></div>
    <div className="portrait-wrap"><div className="portrait-halo" /><img src={asset('assets/people/alex-kodalis.png')} alt="Alex Kodalis" width="1254" height="1254" /><div className="portrait-actions"><Button>Projekt starten</Button><Button href="#projekte" secondary>Projekte ansehen</Button></div></div>
    <div className="hero-side hero-side-right"><div className="trust-marks"><i /><i /><i /></div><strong>Direkt mit uns</strong><span>Von der Idee bis live.</span></div>
  </div></section>
}

function ServiceRail() {
  return <div className="service-rail" aria-label="Unsere Leistungsbereiche">{['Webseiten', 'Automationen', 'KI-Agenten', 'Interne Tools'].map((label, index) => <div key={label}><strong>0{index + 1}</strong><span>{label}</span></div>)}</div>
}

function ProjectCollage() {
  const [active, setActive] = useState(0)
  const project = projects[active]
  const nextProject = projects[(active + 1) % projects.length]
  return <section className="projects dark-panel" id="projekte"><ServiceRail /><div className="projects-head"><h2>Digitale Arbeit,<br />die schon <em>läuft.</em></h2><p>Eine Auswahl echter Auftritte für Handwerk, Dienstleistung und lokale Unternehmen — von der ersten Idee bis zum fertigen Produkt.</p></div>
    <div className="project-showcase" key={project.name}><article className="project-main"><div className="project-paper-copy"><span>Selected work · 0{active + 1}</span><strong>{project.short}</strong><p>{project.meta}</p></div><div className="project-screen"><div className="screen-bar"><i /><i /><i /></div><img src={project.image} alt={`Projekt ${project.name}`} /></div><div className="project-caption"><span>{project.meta}</span><strong>{project.name}</strong></div><Doodle className="project-doodle" /></article>
      <article className="project-side"><div className="orange-cut" /><div className="project-poster-title">Designing<span>²</span></div><img src={nextProject.image} alt={`Projekt ${nextProject.name}`} /><p>{nextProject.short}<br /><b>{nextProject.name}</b></p></article></div>
    <div className="project-controls"><button onClick={() => setActive((active - 1 + projects.length) % projects.length)} aria-label="Vorheriges Projekt"><ChevronLeft /></button><span>{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><button onClick={() => setActive((active + 1) % projects.length)} aria-label="Nächstes Projekt"><ChevronRight /></button></div>
  </section>
}

function Services() {
  return <section className="services grid-bg" id="leistungen"><div className="services-visual"><svg className="wing-lines" viewBox="0 0 700 520" aria-hidden="true"><path d="M56 367c81-119 132-180 198-279-26 106-23 186-42 279M647 379C568 254 540 186 500 75c4 104-25 197-45 302M49 382c96-40 132-67 205-144M647 393c-93-61-122-101-171-180" /></svg><div className="services-halo" /><img src={asset('assets/people/alex-kodalis.png')} alt="Alex Kodalis" loading="lazy" width="1254" height="1254" />{serviceItems.map(({ Icon, title, text }, index) => <div className={`service-card card-${index + 1}`} key={title}><Icon /><div><strong>{title}</strong><span>{text}</span></div></div>)}</div>
    <div className="services-copy"><h2>Was wir am<br /><em>besten können.</em></h2><p><b>Wir bauen nicht einfach digital.</b> Wir verbinden Gestaltung, Entwicklung und Automatisierung zu Lösungen, die klar aussehen und im Alltag funktionieren.</p><div className="services-actions"><Button>Projekt starten</Button><Button href="#projekte" secondary>Arbeiten ansehen</Button></div></div></section>
}

function Execution() {
  return <section className="execution dark-panel" id="ablauf"><div className="execution-copy"><span className="eyebrow">Unser Ablauf</span><h2>Von der Idee<br />bis <em>live.</em></h2><p>Drei klare Schritte. Direkte Abstimmung. Keine unnötigen Umwege.</p><div className="steps-mini"><span><b>01</b> Verstehen</span><span><b>02</b> Bauen</span><span><b>03</b> Live gehen</span></div></div>
    <div className="showcase-stack" aria-label="Verschiedene Projektansichten"><div className="browser-layer"><div className="browser-chrome"><i /><i /><i /></div><img src={projects[1].image} alt="Avci Gerüstbau in einem Browser" loading="lazy" /></div><div className="poster-layer"><span>CODE² / WORK</span><img src={projects[2].image} alt="Stadtmüller Projektplakat" loading="lazy" /><b>Ideen werden Systeme.</b></div><div className="phone-layer"><div className="phone-notch" /><img src={projects[0].image} alt="Gardinen Mannheim auf einem Smartphone" loading="lazy" /><small>gardinen-mannheim.de</small></div></div>
  </section>
}

function Contact() {
  const [notice, setNotice] = useState(false)
  return <section className="contact grid-bg" id="kontakt"><div className="contact-person"><div className="portrait-halo" /><img src={asset('assets/people/bilal-altuntas.png')} alt="Bilal Altuntas" width="1254" height="1254" /><Doodle /></div><div className="contact-copy"><span className="eyebrow">Euer nächster Schritt</span><h2>Bringt eure Idee<br />zum <em>Leben.</em></h2><p>Ihr habt eine Idee oder wisst noch nicht, welche Lösung passt? Erzählt uns kurz davon — wir melden uns persönlich mit einer ersten Einschätzung.</p><form onSubmit={(event) => { event.preventDefault(); setNotice(true) }}><label><span className="sr-only">E-Mail-Adresse</span><Mail size={18} /><input type="email" required placeholder="E-Mail-Adresse" aria-label="E-Mail-Adresse" /></label><button className="button" type="submit">Anfrage vorbereiten <Arrow size={17} /></button></form>{notice && <p className="contact-notice" role="status">Noch nichts gesendet: Ein bestätigter E-Mail-Empfänger ist noch nicht hinterlegt.</p>}</div></section>
}

function ProcessCards() {
  const steps = [
    { title: 'Verstehen', text: 'Wir klären, was ihr wirklich braucht.', image: projects[3].image, style: 'brief' },
    { title: 'Gestalten', text: 'Wir machen die Idee sichtbar und klar.', image: projects[0].image, style: 'type' },
    { title: 'Umsetzen', text: 'Wir bauen die passende digitale Lösung.', image: projects[1].image, style: 'device' },
    { title: 'Verbessern', text: 'Wir bleiben dran, wenn ihr wachst.', image: projects[4].image, style: 'loop' },
  ]
  return <section className="process dark-panel" aria-labelledby="process-title"><div className="process-heading"><span className="eyebrow">So arbeiten wir</span><h2 id="process-title">Vier Schritte. <em>Ein Ziel.</em></h2></div><div className="process-grid">{steps.map(({ title, text, image, style }, index) => <article key={title} className={index === 1 ? 'active' : ''}><div className={`process-art ${style}`}><img src={image} alt="" loading="lazy" /><span>0{index + 1}</span></div><div className="process-label"><strong>{title}</strong><Arrow size={16} /></div><p>{text}</p></article>)}</div><div className="progress-line"><span /></div></section>
}

function Footer() {
  return <footer className="footer grid-bg" id="ueber-uns"><div className="footer-brand"><img src={asset('assets/code2-wordmark.png')} alt="CODE²" /><p>Digitale Auftritte, Automatisierungen und KI-Lösungen, die im Alltag wirklich arbeiten.</p><span>Alexandros Kodalis & Bilal Altuntas</span></div><div className="footer-col"><strong>Sitemap</strong><a href="#top">Start</a><a href="#projekte">Projekte</a><a href="#leistungen">Leistungen</a><a href="#ablauf">Ablauf</a></div><div className="footer-col"><strong>Mehr</strong><a href="#ueber-uns">Über uns</a><a href="#kontakt">Kontakt</a><a href="#kontakt">Projekt starten</a></div><div className="footer-contact"><span>Kontakt</span><h2>Lasst uns etwas bauen,<br /><em>das arbeitet.</em></h2><a href="#kontakt">Anfrage vorbereiten <Arrow size={18} /></a>{/* TODO: bestätigte E-Mail-Adresse oder Formular-Endpunkt ergänzen. */}</div><div className="footer-bottom"><span>© 2026 CODE². Alle Rechte vorbehalten.</span><span>Direkt. Klar. Persönlich.</span></div></footer>
}

function App() { return <main><Hero /><ProjectCollage /><Services /><Execution /><Contact /><ProcessCards /><Footer /></main> }
createRoot(document.getElementById('root')).render(<App />)
