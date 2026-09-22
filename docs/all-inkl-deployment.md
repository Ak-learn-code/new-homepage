# ALL-INKL-Deployment für `sidetwo.de`

## 1. Produktionsartefakt erzeugen

Im Repository `new-homepage` ausführen:

```bash
npm run build:production
```

Das erzeugte Verzeichnis `dist/` ist das vollständige öffentliche Artefakt. Vor dem Build nur öffentliche Werte bereitstellen:

```text
VITE_CONTACT_API_URL=https://dashboard.sidetwo.de/api/public/contact
VITE_TURNSTILE_SITE_KEY=<öffentlicher Cloudflare-Sitekey>
```

Keine Secrets in diesem Build setzen oder hochladen. Insbesondere niemals `DIRECTUS_SERVER_TOKEN`, `TURNSTILE_SECRET_KEY`, SMTP-Zugangsdaten, GitHub-Tokens, `.env`, `src/`, `node_modules/` oder interne `docs/` nach ALL-INKL kopieren.

## 2. Upload

1. In KAS den Webspace für `sidetwo.de` öffnen und einen leeren Staging-Ordner festlegen.
2. **Nur den Inhalt** von `dist/` (nicht den Ordner selbst) in das Document Root hochladen.
3. Die unten stehende `.htaccess` in dasselbe Document Root legen.
4. Erst auf Staging testen, dann das echte Document Root auf diesen Ordner zeigen lassen bzw. denselben Inhalt dorthin hochladen.

Die Dateien `sitemap.xml`, `robots.txt`, `impressum/index.html`, `datenschutz/index.html` und `insights/<slug>/index.html` liegen bereits im Artefakt und müssen mit hochgeladen werden.

## 3. `.htaccess`

Die folgende Vorlage setzt HTTPS und die non-www-Domain durch, ohne den statischen Insight-Ordnern eine SPA-Fallback-Route aufzuzwingen:

```apacheconf
RewriteEngine On

# Erst aktivieren, sobald sidetwo.de und www.sidetwo.de gültige Zertifikate haben.
RewriteCond %{HTTPS} !=on [OR]
RewriteCond %{HTTP_HOST} ^www\.sidetwo\.de$ [NC]
RewriteRule ^ https://sidetwo.de%{REQUEST_URI} [R=301,L]

DirectoryIndex index.html
Options -Indexes
```

Die Security-Header-Vorlage aus `docs/all-inkl-production-headers.md` unterhalb davon ergänzen. Danach direkt `/`, `/blog.html`, `/insights/<slug>/`, `/impressum/`, `/datenschutz/`, `/sitemap.xml` und `/robots.txt` testen.

## 4. Nach jeder Veröffentlichung

Ein in SideTwo OS veröffentlichter Insight ist zuerst in Directus gespeichert. Für die statische Website muss anschließend der Produktionsbuild erneut erzeugt und `dist/` hochgeladen werden – automatisiert über den konfigurierten Deployment-Webhook oder bewusst manuell.
