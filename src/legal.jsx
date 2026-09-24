import React from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/manrope'
import './styles.css'
import { legalPages } from './lib/legal-page-content'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`
const home = (anchor = '') => `${asset('')}${anchor}`
const logoStyle = { WebkitMaskImage: `url("${asset('assets/sidetwo-logo-currentcolor.svg')}")`, maskImage: `url("${asset('assets/sidetwo-logo-currentcolor.svg')}")` }

function Header() { return <header className="nav-shell legal-header"><nav className="nav-pill" aria-label="Hauptnavigation"><a className="nav-logo" href={home('#top')} aria-label="SideTwo Startseite"><span className="sidetwo-logo" style={logoStyle} /></a><div className="nav-links"><a href={home('#leistungen')}>Leistungen</a><a href={home('#referenzen')}>Projekte</a><a href={asset('insights/')}>Insights</a></div><a className="nav-contact" href={home('#kontakt')}>Kontakt</a></nav></header> }
function Footer() { return <footer className="footer"><div className="footer-inner"><div className="footer-brand"><span className="sidetwo-logo footer-brand-logo" style={logoStyle} /><p>Wir bauen digitale Auftritte, Systeme und Automatisierungen, die im Alltag wirklich arbeiten.</p></div><div className="footer-col"><strong>Studio</strong><a href={home('#impact')}>Über uns</a><a href={asset('insights/')}>Insights</a></div><div className="footer-col"><strong>Rechtliches</strong><a href={asset('impressum')}>Impressum</a><a href={asset('datenschutz')}>Datenschutz</a></div></div><div className="footer-bottom"><span>© 2026 SideTwo. Alle Rechte vorbehalten.</span><span>Direkt. Klar. Persönlich.</span></div></footer> }
const Page = ({ page }) => <main id="main-content" className="legal-page"><a className="skip-link" href="#legal-content">Zum Hauptinhalt springen</a><Header /><article id="legal-content" className="legal-content"><span className="legal-eyebrow">SIDETWO · RECHTLICHES</span><h1>{page.title}</h1><div dangerouslySetInnerHTML={{ __html: page.html }} /></article><Footer /></main>
function Impressum() { return <Page page={legalPages.impressum} /> }
function Datenschutz() { return <Page page={legalPages.datenschutz} /> }
const isPrivacy = window.location.pathname.includes('datenschutz')
createRoot(document.getElementById('root')).render(isPrivacy ? <Datenschutz /> : <Impressum />)
