# Directus Insights – sicherer Release-Ablauf

Die öffentliche Website verwendet bis zur bewussten Umstellung weiterhin Sanity. Ein Push auf `main` führt deshalb unverändert `npm run build` aus und kann die bestehende Website nicht unbemerkt auf Directus umstellen.

## Voraussetzungen

1. `npm run cms:migrate:verify` im SideTwo-OS-Repository ist ohne Abweichungen durchgelaufen.
2. Eine unabhängige Abnahme bestätigt Inhalte, Bilder und Slugs in Directus.
3. Die öffentliche Directus-Rolle darf ausschließlich veröffentlichte `cms_posts`, `cms_categories`, `cms_authors` und die zugehörigen Dateien lesen. Sie erhält keine Schreibrechte und keinen Zugriff auf `os_*`, CRM-, Rechnungs- oder Angebotsdaten.
4. Der anonyme Aufruf von `https://directus.sidetwo.de/items/cms_posts?limit=1` liefert veröffentlichte Daten statt HTTP 403. Die gleichen anonymen Aufrufe auf `os_proposals`, `os_invoices` und `os_projects` müssen weiterhin HTTP 403 liefern.

## Veröffentlichung

Nach erfüllten Voraussetzungen wird in GitHub Actions der Workflow **Website veröffentlichen** manuell gestartet und als `content_source` **directus** gewählt. Dadurch läuft `npm run build:directus`:

- Vite baut die Website mit `VITE_CONTENT_SOURCE=directus`.
- Der Prerender-Schritt liest nur veröffentlichte Posts.
- Für jeden veröffentlichten Post entsteht `/insights/<slug>/index.html` mit Title, Description, Canonical, Open-Graph-Daten und `BlogPosting`-JSON-LD bereits im HTML.
- Falls die CMS-Leserechte fehlen oder Directus nicht erreichbar ist, bricht der Release ab. Es wird keine unvollständige GitHub-Pages-Version veröffentlicht.

Es werden keine Tokens benötigt oder in den Browser übertragen. Die Direktabfragen nutzen ausschließlich die minimal freigegebenen öffentlichen CMS-Endpunkte.

## Rückweg

Falls ein Problem auffällt, den Workflow erneut manuell mit `content_source: sanity` starten. Das stellt die vorhandene Sanity-Variante wieder her, ohne Directus- oder Sanity-Daten zu verändern.
