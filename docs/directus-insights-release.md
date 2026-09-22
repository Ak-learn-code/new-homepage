# Directus Insights – sicherer Release-Ablauf

Die öffentliche Website verwendet Directus als einzige Blog-Quelle. Ein Push auf `main` führt `npm run build` aus; dieser Build enthält den Directus-Prerender und bricht bei nicht lesbaren öffentlichen Insights ab.

## Voraussetzungen

1. `npm run cms:migrate:verify` im SideTwo-OS-Repository ist ohne Abweichungen durchgelaufen.
2. Eine unabhängige Abnahme bestätigt Inhalte, Bilder und Slugs in Directus.
3. Die öffentliche Directus-Rolle darf ausschließlich veröffentlichte `cms_posts`, `cms_categories`, `cms_authors` und die zugehörigen Dateien lesen. Sie erhält keine Schreibrechte und keinen Zugriff auf `os_*`, CRM-, Rechnungs- oder Angebotsdaten.
4. Der anonyme Aufruf von `https://directus.sidetwo.de/items/cms_posts?limit=1` liefert veröffentlichte Daten statt HTTP 403. Die gleichen anonymen Aufrufe auf `os_proposals`, `os_invoices` und `os_projects` müssen weiterhin HTTP 403 liefern.

## Veröffentlichung

Der Workflow **Website veröffentlichen** führt automatisch `npm run build` aus:

- Der Prerender-Schritt liest nur veröffentlichte Posts.
- Für jeden veröffentlichten Post entsteht `/insights/<slug>/index.html` mit Title, Description, Canonical, Open-Graph-Daten und `BlogPosting`-JSON-LD bereits im HTML.
- Falls die CMS-Leserechte fehlen oder Directus nicht erreichbar ist, bricht der Release ab. Es wird keine unvollständige GitHub-Pages-Version veröffentlicht.

Es werden keine Tokens benötigt oder in den Browser übertragen. Die Direktabfragen nutzen ausschließlich die minimal freigegebenen öffentlichen CMS-Endpunkte.

Ein fehlerhafter Directus-Read beendet den Build, statt veraltete Inhalte aus einer anderen Quelle zu veröffentlichen.
