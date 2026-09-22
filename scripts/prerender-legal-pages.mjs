import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { legalPages } from '../src/lib/legal-page-content.js'
import { getSiteConfig } from './site-config.mjs'

const root = process.cwd()
const { base, siteUrl } = getSiteConfig()
const asset = (path = '') => `${base}${path}`
const logo = `<span class="sidetwo-logo" aria-hidden="true" style="-webkit-mask-image:url('${asset('assets/sidetwo-logo-currentcolor.svg')}');mask-image:url('${asset('assets/sidetwo-logo-currentcolor.svg')}')"></span>`
const footerLogo = `<span class="sidetwo-logo footer-brand-logo" aria-hidden="true" style="-webkit-mask-image:url('${asset('assets/sidetwo-logo-currentcolor.svg')}');mask-image:url('${asset('assets/sidetwo-logo-currentcolor.svg')}')"></span>`
const header = `<header class="nav-shell legal-header"><nav class="nav-pill" aria-label="Hauptnavigation"><a class="nav-logo" href="${asset('#top')}" aria-label="SideTwo Startseite">${logo}</a><div class="nav-links"><a href="${asset('#leistungen')}">Leistungen</a><a href="${asset('#referenzen')}">Projekte</a><a href="${asset('blog.html')}">Insights</a></div><a class="nav-contact" href="${asset('#kontakt')}">Kontakt</a></nav></header>`
const footer = `<footer class="footer"><div class="footer-inner"><div class="footer-brand">${footerLogo}<p>Wir bauen digitale Auftritte, Systeme und Automatisierungen, die im Alltag wirklich arbeiten.</p></div><div class="footer-col"><strong>Studio</strong><a href="${asset('#impact')}">Über uns</a><a href="${asset('blog.html')}">Insights</a></div><div class="footer-col"><strong>Rechtliches</strong><a href="${asset('impressum')}">Impressum</a><a href="${asset('datenschutz')}">Datenschutz</a></div></div><div class="footer-bottom"><span>© 2026 SideTwo. Alle Rechte vorbehalten.</span><span>Direkt. Klar. Persönlich.</span></div></footer>`

for (const [slug, page] of Object.entries(legalPages)) {
  const output = resolve(root, 'dist', slug, 'index.html')
  const html = await readFile(output, 'utf8')
  const canonical = `${siteUrl}/${slug}/`
  const prerendered = `<main id="main-content" class="legal-page"><a class="skip-link" href="#legal-content">Zum Hauptinhalt springen</a>${header}<article id="legal-content" class="legal-content"><span class="legal-eyebrow">SIDETWO · RECHTLICHES</span><h1>${page.title}</h1><div>${page.html}</div></article>${footer}</main>`
  await writeFile(output, html
    .replace('</head>', `    <meta name="description" content="${page.description}" />\n    <link rel="canonical" href="${canonical}" />\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${prerendered}</div>`))
}
