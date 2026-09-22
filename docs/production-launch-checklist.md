# SideTwo Production Launch Checklist

## Vor dem Launch

- [ ] ALL-INKL AVV prüfen/abschließen.
- [ ] Hetzner AVV für Directus und Dashboard prüfen/abschließen.
- [ ] Cloudflare-/Turnstile-Vertrags- und Datenschutzthemen prüfen, falls aktiviert.
- [ ] Asset- und Claim-Checklisten abschließen.
- [ ] Directus Public Permissions und Editorrechte manuell prüfen.
- [ ] Impressum und Datenschutzerklärung gegen die tatsächlich aktive Produktion final prüfen.

## Kontaktformular und Turnstile

- [ ] Sicheren `POST /api/contact`-Endpoint bereitstellen.
- [ ] Serverseitige Validierung aus `src/lib/contact-contract.js` übernehmen.
- [ ] Request-Größe begrenzen, Rate-Limit und sichere Log-/Mail-Verarbeitung aktivieren.
- [ ] `TURNSTILE_SECRET_KEY` ausschließlich serverseitig setzen.
- [ ] `VITE_CONTACT_API_URL` und `VITE_TURNSTILE_SITE_KEY` im Produktivbuild setzen.
- [ ] Siteverify mit erwarteter Aktion `contact` und Hostname `sidetwo.de` fail-closed testen.
- [ ] Mailzustellung und Dashboard-Übernahme mit Testdaten prüfen.

## Domain und Hosting

- [ ] Produktivbuild mit `VITE_SITE_URL=https://sidetwo.de` und `VITE_BASE_PATH=/` erzeugen.
- [ ] ALL-INKL-Deployment testen; GitHub Pages bleibt bis zur Abnahme unverändert als Testumgebung verfügbar.
- [ ] Kanonische Domain `https://sidetwo.de/` festlegen; `www.sidetwo.de` per permanenter Weiterleitung darauf umleiten.
- [ ] Canonicals, OG-URLs, JSON-LD, Sitemap, Robots und Favicon im Produktivbuild prüfen.
- [ ] Directus CORS gezielt um `https://sidetwo.de` ergänzen.
- [ ] HTTPS, HTTP→HTTPS-Redirect, 404 und direkte Reloads prüfen.

## Security und Qualität

- [ ] Header-Vorlage auf Staging prüfen: `docs/all-inkl-production-headers.md`.
- [ ] HSTS erst nach bestätigtem HTTPS aktivieren; `includeSubDomains` separat entscheiden.
- [ ] CSP mit Directus-Bildern und – falls aktiviert – Turnstile testen.
- [ ] `npm run test:content`, `npm run build` und `npm audit --omit=dev` vor Release ausführen.
- [ ] Secret-/Bundle-Scan ausführen.
- [ ] Desktop, Tablet, Mobile, Tastatur- und Formular-Tests gegen die echte Domain durchführen.
