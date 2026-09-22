# Domain-Migration: GitHub Pages zu `https://sidetwo.de/`

Der aktuelle Standard bleibt bewusst GitHub Pages:

- `VITE_SITE_URL=https://ak-learn-code.github.io/new-homepage`
- `VITE_BASE_PATH=/new-homepage/`

Für den späteren Produktivbuild werden ausschließlich diese Build-Werte geändert:

```dotenv
VITE_SITE_URL=https://sidetwo.de
VITE_BASE_PATH=/
VITE_DIRECTUS_URL=https://directus.sidetwo.de
```

Die Werte werden zentral in `scripts/site-config.mjs` verwendet. Vite setzt damit Asset-Pfade und die HTML-Metadaten; die Prerender-Skripte erzeugen Sitemap, Robots und Insight-Canonicals aus derselben Site-URL.

## Inventar der bisherigen GitHub-Pages-Abhängigkeiten

- `scripts/site-config.mjs`: sichere Test-Fallbacks für URL und Base-Pfad.
- `vite.config.js`: Vite-Base und Ersetzung der Site-Metadaten.
- `index.html`: Canonical, OG-URL, OG-Bild, Favicon über Base-Pfad.
- `blog.html`: Canonical.
- `scripts/prerender-insights.mjs`: Sitemap und `robots.txt` im finalen `dist`.
- `scripts/insight-prerender-utils.mjs`: Insight-Canonical, BlogPosting JSON-LD und Asset-Pfade.
- `.github/workflows/deploy.yml`: bleibt absichtlich GitHub-Pages-Testdeployment.

## Manuelle Schritte beim echten Launch

1. ALL-INKL-Staging mit dem Produktivbuild hochladen und direkte Aufrufe, Reloads sowie `/insights/<slug>/` prüfen.
2. `sidetwo.de` als kanonische Domain verwenden; `www.sidetwo.de` per 301 auf die non-www-Domain umleiten.
3. HTTPS und HTTP→HTTPS-Redirect vor HSTS prüfen.
4. In Directus CORS ausschließlich die benötigte Origin `https://sidetwo.de` ergänzen und den öffentlichen CMS-Abruf testen.
5. `robots.txt`, `sitemap.xml`, Canonicals, OG-Tags und BlogPosting JSON-LD im hochgeladenen Artefakt prüfen.
6. Alte GitHub-Pages-URL nicht als Produktiv-Canonical verwenden. Sie kann als Testumgebung bestehen bleiben; Redirects sind erst nach einer bewussten SEO-Entscheidung einzurichten.
