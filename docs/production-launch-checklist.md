# SideTwo Production Launch Checklist

# ALEX – NOCH ZU ERLEDIGEN

- [ ] Cloudflare → Turnstile: Widget für `sidetwo.de` und `www.sidetwo.de` anlegen; den **Sitekey** für den ALL-INKL-Build und das **Secret** nur in Coolify verwenden.
- [ ] Coolify → sidetwo-os → Environment Variables: `TURNSTILE_SECRET_KEY=<dein Secret>`, SMTP-Variablen sowie `CONTACT_ALLOWED_ORIGINS=https://sidetwo.de,https://www.sidetwo.de` setzen. `CONTACT_TRUST_PROXY=true` nur nach Prüfung des Traefik-Proxys setzen.
- [ ] Coolify → sidetwo-os: optional `DIRECTUS_CMS_ASSETS_FOLDER_ID=<UUID des SideTwo CMS-Ordners>` und `WEBSITE_MANAGEMENT_ROLE_IDS=<autorisierte Directus-Rollen>` setzen.
- [ ] Coolify/CI: einen HTTPS-Deployment-Webhook für `WEBSITE_DEPLOY_WEBHOOK_URL` und `WEBSITE_DEPLOY_WEBHOOK_SECRET` bereitstellen, der HMAC prüft, `npm run build:production` im Website-Repository ausführt und ausschließlich `dist/` nach ALL-INKL hochlädt.
- [ ] ALL-INKL → KAS/Webspace: `docs/all-inkl-deployment.md` befolgen, `dist/` und die dort beschriebene `.htaccess` nur nach Staging-Prüfung aktivieren.
- [ ] DNS: `sidetwo.de` und `www.sidetwo.de` auf den vorgesehenen ALL-INKL-Webspace zeigen lassen; danach `www` per 301 auf `https://sidetwo.de` prüfen.
- [ ] Directus → Settings → CORS: für die öffentliche Website nur `https://sidetwo.de` und `https://www.sidetwo.de` freigeben. Das Dashboard nutzt seinen serverseitigen Proxy und benötigt dafür keine zusätzliche Browser-CORS-Freigabe. Keine breite Wildcard freigeben.
- [ ] Test: echten Kontaktversand, Turnstile-Fail-Case, Mailzustellung, CRM-Lead, Build-/Deploy-Trigger und direkten Reload aller öffentlichen Seiten auf der echten Domain testen.

## Vor dem Launch

- [ ] ALL-INKL AVV prüfen/abschließen.
- [ ] Hetzner AVV für Directus und Dashboard prüfen/abschließen.
- [ ] Cloudflare-/Turnstile-Vertrags- und Datenschutzthemen prüfen, falls aktiviert.
- [ ] Asset- und Claim-Checklisten abschließen.
- [ ] Directus Public Permissions und Editorrechte manuell prüfen.
- [ ] Impressum und Datenschutzerklärung gegen die tatsächlich aktive Produktion final prüfen.

## Kontaktformular und Turnstile

- [ ] Coolify → SideTwo OS: den serverseitigen `POST /api/public/contact`-Endpoint mit SMTP, CRM-Token und Rate Limit deployen.
- [ ] Serverseitige Validierung aus dem SideTwo-OS-Contact-Contract und dem Website-Contract abgleichen.
- [ ] In Coolify `TURNSTILE_SECRET_KEY`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` und optional `CONTACT_MAIL_TO` ausschließlich serverseitig setzen.
- [ ] In ALL-INKL-Build `VITE_CONTACT_API_URL=https://dashboard.sidetwo.de/api/public/contact` und `VITE_TURNSTILE_SITE_KEY` setzen.
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
