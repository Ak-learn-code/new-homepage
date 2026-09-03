# CODE² Visual Gap Report

Stand: 4. September 2026  
Vergleichsbasis: aktueller `main`-Stand (`0dde7a8`), Masterprompt und Referenzbild (1440 × 4730 px)  
Audit-Viewport: 1440 × 900 px; Responsive-Messung zusätzlich bei 375, 430, 768, 1024, 1280 und 1920 px

## Ergebnis in Kürze

Die aktuelle Umsetzung besitzt bereits die richtige Seitenreihenfolge, das passende Hell-/Dunkel-Grundmuster, CODE²-Inhalte und einen funktionierenden React/Vite-Unterbau. Sie ist aber noch keine enge Übertragung der Referenz. Die größten Abweichungen liegen in den Bildassets und in der Art Direction: Die Projektsektion ist ca. 34 % zu hoch und wirkt wie eine normale Portfolio-Galerie, die Execution-Sektion besteht aus drei nahezu identischen Phones, die Process-Cards sind Icon-Karten statt visueller Motive, und beide eingesetzten „Editorial“-Porträts zeigen ein fest eingebranntes Transparenzraster.

Aktueller visueller Baseline-Score (vor Umbau): **5,4 / 10**. Damit ist die im Masterprompt geforderte Schwelle von 8,5 / 10 klar nicht erreicht.

### Priorisierte P0-Liste

1. Beide verwendeten Editorial-Porträts sind nicht freigestellt; das Schachbrettmuster ist Teil der RGB-Dateien.
2. Hero: sichtbarer Assetfehler, zu breite/kompakte Headline und nicht ausreichend dominante Person.
3. Der Sterneblock suggeriert eine Bewertung, ohne dass eine belegte Bewertung im Repository existiert.
4. Projektsektion: 1423 px statt ungefähr 1050–1100 px; klassische Karten statt Editorial-Collage.
5. Services: nur drei statt vier Floating Cards; schwache, generische Collage.
6. Execution: drei fast identische Phone-Rahmen statt eines heterogenen Screen-/Poster-/Device-Clusters.
7. Contact: sichtbarer Raster-Hintergrund im Bilal-Porträt und keine echte Kontaktstrecke.
8. Process: vier große Outline-Icons statt vier eigenständiger visueller Motive.
9. Footer: vorhandenes weißes Wordmark ist auf hellem Hintergrund beinahe unsichtbar; Referenzstruktur und echte Kontaktspalte fehlen.
10. Responsive: zwischen 761 und 1000 px bleibt das Desktop-Layout aktiv; bei 768 px werden Elemente sichtbar abgeschnitten.

## Gemessene Struktur

| Bereich | Aktuell bei 1440 px | Referenz, ca. | Befund |
|---|---:|---:|---|
| Hero | 838 px | 830–850 px | Gesamthöhe passend, Innenkomposition/Asset nicht passend |
| Projects inkl. Rail | 1423 px, beginnt mit 96 px Overlap | 1050–1100 px | ca. 34 % zu hoch |
| Services | 760 px | 590–650 px | zu hoch und zu luftig |
| Execution | 614 px | 590–620 px | Außenmaß passend, Inhalt falsch komponiert |
| Contact | 690 px | 680–740 px | Außenmaß passend, Asset/CTA problematisch |
| Process | 494 px | 470–520 px | Außenmaß passend, Motive fehlen |
| Footer | 520 px | 400–460 px | zu hoch, Struktur abweichend |
| Gesamtdokument | 5243 px | 4730 px | 513 px bzw. 10,8 % zu lang |

Hinweis: Die Referenzhöhen sind aus dem 1440 × 4730 px großen Bild abgeleitet und daher Näherungswerte. Die aktuellen Werte stammen aus der gerenderten DOM-Geometrie.

## Section-by-Section Gap Analysis

### 01 Navigation

**SECTION:** Navigation  
**CURRENT:** Schwarze, 56 px hohe Pill mit fünf gleichmäßig verteilten Slots, CODE²-Wortmarke mittig, Desktop-Links links/rechts; Mobile mit Logo und Burger.  
**REFERENCE:** Kompakte schwarze Pill, visuell leichter und näher am oberen Rand; kleines Logo exakt in der Mitte; dezente Navigationsschrift.  
**DIFFERENCE:** Grundform und Anordnung stimmen, aber die aktuelle Pill ist höher und massiver. Das Logo ist deutlich breiter und wird im Header rein weiß gefiltert, wodurch der markante CODE²-Akzent verloren geht. Desktop-Links besitzen nur die intrinsische Text-Klickfläche.  
**REQUIRED CHANGE:** Pill optisch auf Referenzmaß reduzieren, Wordmark als korrektes schwarzes/weißes CODE²-Logo mit orangefarbenem Akzent bereitstellen, Links über die gesamte Navigationshöhe klickbar machen, sichtbare `:focus-visible`-Zustände ergänzen. Beim geöffneten mobilen Menü muss das Label „Menü schließen“ heißen.  
**PRIORITY:** P1

### 02 Hero

**SECTION:** Hero  
**CURRENT:** 838 px hoch, Headline bis 82 px, zentraler Alex mit 465 px hoher Bildbox und 410 px Halo; Microcopy links/rechts; CTAs am unteren Porträt. Das eingesetzte Bild `alex-editorial.png` enthält ein sichtbares Schachbrettmuster.  
**REFERENCE:** Headline schmaler und mit stärker kontrollierten Zeilenlängen; Person als klares visuelles Zentrum mit natürlicher Freistellung; CTA-Pills direkt auf/nahe der Person; seitliche Texte sehr klein und mit viel negativer Fläche; großer Bottom-Radius.  
**DIFFERENCE:** Außenform und Reihenfolge sind grundsätzlich nah, der Rasterfehler zerstört aber die Freistellungswirkung. Alex wirkt im Verhältnis zur Gesamtbreite schmaler und statischer als die Referenzperson. Die Headline ist sehr breit und ähnelt dadurch eher einer Tech-Landingpage. Das Doodle sitzt links neben der ersten Zeile, erzeugt aber weniger visuelle Führung als die Kombination aus Stern und Pfeil der Referenz. Der rechte Sterneblock sieht wie eine unbelegte 5-Sterne-Bewertung aus. Bei 1920 px springt die erste Headline-Zeile wegen des 82-px-Maximums in eine zusätzliche Zeile; dadurch wächst der Hero auf 921 px.  
**REQUIRED CHANGE:** Echtes transparentes Alex-Cutout erzeugen/verwenden; Person 10–20 % stärker skalieren und den Crop näher an die Referenz bringen; Headline-Container und Typografie auf feste 1440-Komposition kalibrieren; Doodle als zwei gezielte SVG-Details ausarbeiten; Sterne durch belegbaren Positionierungs-/Trust-Text ohne Rating-Symbolik ersetzen; 1920-Zeilenbruch explizit stabilisieren.  
**PRIORITY:** P0

### 03 Floating Service Rail

**SECTION:** Floating Service Rail  
**CURRENT:** 122 px hohe, vollbreite Glasfläche innerhalb der dunklen Projektsektion, vier gleich breite Spalten mit „01+“ bis „04+“.  
**REFERENCE:** Etwa 130 px hohe, kompakte schwebende Statistik-/Info-Rail mit sichtbarem Abstand zu den Seiten, deutlichen Separatoren und kontrolliertem Overlap.  
**DIFFERENCE:** Dimension und Viererstruktur stimmen. Der aktuelle Verlauf und die helle Transparenz wirken jedoch stärker nach Glassmorphism als in der Referenz. Das Plus hinter Ordnungsnummern kann wie eine erfundene Kennzahl gelesen werden. Auf Mobile wird daraus ein 2×2-Raster, während die Referenzsprache eine horizontale, kompakte Rail nahelegt.  
**REQUIRED CHANGE:** Oberfläche dunkler und weniger glasig gestalten, Schatten/Border subtiler, Pluszeichen nur nutzen, wenn klar rein grafisch; sonst `01`–`04`. Für Mobile eine gezielt komponierte, flache 2×2- oder horizontale Lösung mit klaren Separatoren entwerfen.  
**PRIORITY:** P1

### 04 Dark Project / Editorial Section

**SECTION:** Dark Project / Editorial Section  
**CURRENT:** Große Card links (705 × 720 px) und kleinere weiße Card rechts (337 × 720 px); beide exakt gleich hoch. Projekte wechseln über zwei Buttons. Der Hauptscreen wird von nur 400 px breiten JPEGs auf 705 px hochskaliert.  
**REFERENCE:** Großes quadratisches Editorial Visual links plus deutlich kleineres Hochformat-Poster rechts; ungleiche Ober- und Unterkanten, Collage-/Posterästhetik, orange Eingriffe und außergewöhnliche Crops. Die ganze dunkle Section bleibt kompakter.  
**DIFFERENCE:** Die Section ist mit 1423 px der Hauptgrund für die um 513 px zu lange Seite. Gleich hohe Cards und saubere Website-Screenshots erzeugen eine klassische Portfolio-Galerie. Es fehlen Collage, organische Überlagerungen, große Typografieelemente und gezielte orange Bildmanipulation. Das rechte Motiv ist lediglich ein Website-Screenshot in einer weißen Card. Die 400-px-Quellen sind für die große Darstellung sichtbar unterdimensioniert, besonders auf Retina-Displays.  
**REQUIRED CHANGE:** Showcase auf ungefähr 520–600 px Höhe reduzieren; Hauptvisual näher an quadratisch, Side-Poster schmaler und vertikal versetzt; aus echten Projektassets Editorial-Composites bauen (Graustufen, orange Masken, Typografie-/Papierlayer, kontrollierte Crops); höher aufgelöste Projektquellen beschaffen oder neue Mockups aus vorhandenen Screens erstellen; Carousel-State in dieser Komposition weiterverwenden.  
**PRIORITY:** P0

### 05 Services / What We Do

**SECTION:** Services  
**CURRENT:** 760 px hohe helle Zweispaltensektion. Links wieder Alex in derselben Pose, dahinter ein geometrischer Streifen-Polygon; drei halbtransparente Service-Cards. Rechts Headline, Text, Checkliste und CTA.  
**REFERENCE:** Dichterer, asymmetrischer People-/Scribble-Cluster links, vier unterschiedlich platzierte Service-Labels rund um die Person; rechts kompakte Headline, kurzer Text und zwei kleine CTAs.  
**DIFFERENCE:** Ein Service („Interne Tools“) fehlt vollständig aus der Collage. Die drei Cards wirken als gleichartige UI-Cards statt als redaktionelle Annotationen. Das wiederverwendete, nicht transparente Alex-Bild zeigt erneut das Schachbrettmuster. Das CSS-Polygon ist regelmäßig und wirkt technisch statt handgezeichnet. Die zusätzliche Checkliste verlängert den Textblock und entfernt sich von der Referenz.  
**REQUIRED CHANGE:** Vier Service-Labels mit bewusst unterschiedlichen Positionen, Breiten und Ebenen; echtes transparentes Portrait; organisches orangefarbenes SVG/Illustrationsmotiv; Copy rechts verdichten und Buttonanordnung näher an der Referenz; Section um ca. 100–150 px komprimieren.  
**PRIORITY:** P0

### 06 Dark Execution Showcase

**SECTION:** Dark Execution Showcase  
**CURRENT:** Drei fast identische 230 × 430 px Phone-Rahmen mit denselben Proportionen und nur Rotation/Helligkeit als Variation. Links zusätzliche Dreierschritt-Liste.  
**REFERENCE:** Heterogener Cluster aus großem zentralem Smartphone/Poster, zwei teilweise verdeckten Screens verschiedener Größen, starker Tiefenwirkung und orangefarbenem Artwork. Links nur eine kurze, ruhige Textgruppe.  
**DIFFERENCE:** Genau die vom Masterprompt kritisierte Device-Mockup-Wiederholung. Gleichartige Phones wirken wie eine Slider-/App-Präsentation und nicht wie Editorial Art Direction. Bei 375/430 px ragen die äußeren Phones über beide Seiten hinaus; `main { overflow:hidden }` verdeckt das Problem lediglich. Bei 768 px ragt das rechte Phone bis x=845 und wird abgeschnitten.  
**REQUIRED CHANGE:** Drei unterschiedliche Assettypen/Seitenverhältnisse verwenden (z. B. Desktop-Website, Phone, schmales Poster), verschiedene Tiefenebenen, Overlaps und Größen erzeugen; nur ein echtes Phone als Fokus; orange Akzentgrafik ergänzen; mobile Komposition separat bauen, ohne außerhalb des Viewports liegende Inhalte.  
**PRIORITY:** P0

### 07 Contact CTA

**SECTION:** Contact CTA  
**CURRENT:** Bilal links vor Kreis und Doodle, rechts Headline, langer Text, E-Mail-Feld und Submit. Nach Submit erscheint lokal „Danke! Eure Anfrage ist für diese Demo vorgemerkt.“  
**REFERENCE:** Sehr reduzierte, großzügige Section; freigestellte Person links, kurze Headline/Copy rechts, flaches Input und kleiner orangefarbener CTA.  
**DIFFERENCE:** Außenkomposition ist grundsätzlich nah. `bilal-editorial.png` ist jedoch eine RGB-Datei mit sichtbar eingebranntem Transparenzraster und kann nicht sauber vor dem Halo liegen. Der CTA stellt keinen Kontakt her; er ersetzt das Formular lediglich durch einen lokalen Demo-Hinweis. Damit ist der primäre Conversion-Pfad praktisch tot.  
**REQUIRED CHANGE:** Echtes transparentes Bilal-Cutout; Copy kürzen; Form an einen realen Kontaktweg anbinden (bevorzugt vorhandene E-Mail/Form-Endpoint) oder als `mailto:` umsetzen; bis dahin nicht als funktionale Anfrageübermittlung darstellen.  
**PRIORITY:** P0

### 08 Process / Method Cards

**SECTION:** Process / Method Cards  
**CURRENT:** Vier identische quadratische Gradient-Flächen mit sehr großen Outline-Icons; zweite Card orange bei Hover/aktiv; Text unter den Motiven; Progress-Linie.  
**REFERENCE:** Vier starke, jeweils eigenständige Bild-/Objektmotive; Labels als Glasleiste am unteren Bildrand; ein Objekt/Panel orange betont; kaum zusätzlicher Fließtext.  
**DIFFERENCE:** Die Karten sind funktional korrekt, aber visuell generisch. Icons allein erreichen weder die Materialität noch die erzählerische Qualität der Referenz. Die separaten Beschreibungen unterhalb vergrößern den vertikalen Raum und schwächen den visuellen Rhythmus.  
**REQUIRED CHANGE:** Vier eigenständige CODE²-Motive aus vorhandenen Projektfragmenten, Typografie und CSS/SVG-Kompositionen entwickeln; Beschreibungen in/unter die Label-Leiste integrieren oder stark reduzieren; aktive orange Card statisch wie Referenz auszeichnen; Progress-Indikator maßlich angleichen.  
**PRIORITY:** P0

### 09 Footer

**SECTION:** Footer  
**CURRENT:** 520 px hohe helle Fläche mit vier Spalten, 100 px oberem Radius, großer CTA-Spalte und oranger Abschlussleiste. `code2-wordmark.png` wird hier ungefiltert auf Weiß eingesetzt.  
**REFERENCE:** Kompakter heller Footer innerhalb der dunklen Umgebung; sehr großer oberer Radius; klar sichtbares schwarzes/orangefarbenes Logo links, Navigation mittig, echte Kontaktinformationen und nur vorhandene Social Links rechts; flache orange Bottom-Bar.  
**DIFFERENCE:** Das vorhandene Wordmark ist fast vollständig weiß/silbern und auf hellem Grund nahezu unsichtbar; nur das violette Hoch-2 bleibt sichtbar. Die CTA-Spalte ersetzt die Kontaktinformationen. Der Footer ist ca. 60–120 px zu hoch. Es fehlen explizite TODOs für nicht verfügbare Kontaktdaten.  
**REQUIRED CHANGE:** Geeignete dunkle/orange Logo-Variante erstellen; Footer auf drei funktionale Zonen ausrichten; echte Kontaktdaten aus der bestehenden CODE²-Seite übernehmen oder klar als TODO im Code führen; Höhe reduzieren; keine Socials erfinden.  
**PRIORITY:** P0

## Cross-Cutting Gaps

### Responsive System

**SECTION:** Responsive  
**CURRENT:** Nur zwei Breakpoints (`1000px`, `760px`). Bei 761–1000 px bleibt die Desktop-Zweispaltenlogik aktiv. Gemessene Dokumenthöhen: 6682 px bei 375, 6732 px bei 430, 5052 px bei 768, 5129 px bei 1024, 5207 px bei 1280, 5243 px bei 1440 und 5326 px bei 1920.  
**REFERENCE:** Desktop zuerst präzise bei 1440, danach eigenständige Kompositionen bei 1920/1280/1024/768/430/375; kontrollierte Overlaps und kein Abschneiden.  
**DIFFERENCE:** 768 px ist ein klarer Breakpoint-Fehler: Phone-Cluster, Contact-Halo und Footer-Bottom ragen aus dem Viewport. Auf 375/430 px liegen die äußeren Phones 44–71 px außerhalb; `overflow:hidden` verhindert zwar einen horizontalen Scrollbalken, schneidet aber sichtbare Inhalte ab. Der mobile Hero zeigt Microcopy und Trust-Block sehr dicht nebeneinander; der Trust-Text bricht in mehrere schmale Zeilen. Mobile ist mit 6,7k px sehr lang und vor allem eine gestapelte Desktopseite. Bei 1920 verursacht die Headline einen zusätzlichen Umbruch.  
**REQUIRED CHANGE:** Dedizierte Regeln/Kompositionen für 768–1024, 430 und 375; Off-canvas-Positionen nicht nur clippen; Section-Höhen mobil reduzieren; bewusste Reihenfolge der Hero-Microcopy; Headline-Breaks pro Bereich kontrollieren; 1920-Maxwidth/Font-Interaktion korrigieren.  
**PRIORITY:** P0

### Typography

**SECTION:** Typography  
**CURRENT:** DM Sans, enge Headline-Line-Height, negatives Tracking, orange Keywords; Hero 48–82 px, Section Headlines 42–70 px.  
**REFERENCE:** Ähnliche Grotesk-Anmutung, aber etwas leichter, weniger breit und mit präziserem redaktionellem Zeilenbild.  
**DIFFERENCE:** Grundsystem ist passend. Die aktuelle Hero-Headline ist bei 1440 sehr breit und wirkt schwerer; an mehreren Breakpoints entstehen zufällige statt art-direktierter Zeilenumbrüche. `@import` von Google Fonts ist render-blockierend und ohne lokale Fallback-Metrik-Kalibrierung.  
**REQUIRED CHANGE:** DM Sans kann bleiben, aber Breite/Tracking/Weight je Section kalibrieren; explizite Zeilenumbrüche nur dort, wo sie über alle relevanten Breakpoints funktionieren; Font optional lokal/self-hosted ausliefern.  
**PRIORITY:** P1

### Grid, Color, Radius und Section-Übergänge

**SECTION:** Global Art Direction  
**CURRENT:** Einheitliches 104-px-Grid für fast alle hellen/dunklen Flächen; dunkle Panels teilen denselben radialen Orange-Glow; Hero 150 px Bottom-Radius, Panels 58 px, Footer 100 px.  
**REFERENCE:** Grid pro Section unterschiedlich subtil; braun/orange Atmosphäre vor allem als Übergang zwischen dunklen Flächen; abwechslungsreiche, klar hierarchische Radien; stärkere Überlappungen der großen Sections.  
**DIFFERENCE:** Das Grid ist in der aktuellen 1440-Darstellung deutlich sichtbar und wird zum Hauptmotiv. Dunkle Sections wirken wegen identischer Hintergrunddefinition wiederholt. Der Hero-Radius ist gut, aber nachgelagerte Sektionen haben überwiegend denselben 58-px-Radius und damit weniger Hierarchie.  
**REQUIRED CHANGE:** Grid-Opacity pro Section kalibrieren, dunkle Hintergründe differenzieren, Glow gezielter an Übergängen einsetzen; Radius-System abschnittsspezifisch abstimmen; insbesondere Project→Services und Contact→Process näher an Referenz überlappen.  
**PRIORITY:** P1

### Motion

**SECTION:** Motion  
**CURRENT:** Hover-Transitions auf Buttons/Bildern; IntersectionObserver toggelt `.is-visible`, aber `.reveal` ist dauerhaft sichtbar und es existiert keine wirksame `.is-visible`-Regel.  
**REFERENCE:** Statisches Matching hat Vorrang; nur subtile Reveals/Movement.  
**DIFFERENCE:** Der Observer ist derzeit wirkungsloser Code. Carousel-Bilder wechseln ohne definierte Übergangsbewegung.  
**REQUIRED CHANGE:** Bis nach dem visuellen Matching Observer entfernen oder bewusstes, reduziertes Reveal-System implementieren; Carousel-Transition erst nach statischer Freigabe ergänzen.  
**PRIORITY:** P2

### Accessibility und Interaktionen

**SECTION:** Functional/A11y  
**CURRENT:** Semantische Sections, korrektes H1/H2-Grundgerüst, Alt-Texte für sichtbare Bilder, `aria-expanded`, Formularlabel und Reduced-Motion-Regel vorhanden. Mobile Menü, Anchor-Links und Carousel funktionieren. Build erfolgreich; keine Console-Warnungen/-Fehler bei der Prüfung.  
**REFERENCE:** Funktionale, tastaturfreundliche Seite ohne Dead Buttons/Fake Interaction.  
**DIFFERENCE:** Keine globalen sichtbaren Fokuszustände; mobile Links haben keine großen Touch-Flächen; Menübutton heißt auch geöffnet „Menü öffnen“; Menü reagiert nicht auf Escape/Außenklick. Das Contact-Formular sendet nichts. `Button` rendert grundsätzlich `<a>`, obwohl manche Aktionen später echte Buttons erfordern könnten. Decorative Project-Phone-Bilder besitzen leere Alt-Texte korrekt, der Container beschreibt sie aber nur allgemein.  
**REQUIRED CHANGE:** `:focus-visible`, 44×44-px-Touchziele, dynamisches Menülabel, Escape-/Außenklick und ggf. Fokusmanagement; CTA an echten Kontaktweg; Link/Button-Semantik je Aktion sauber halten.  
**PRIORITY:** P1 (Contact-Pfad selbst P0)

### Performance und SEO

**SECTION:** Performance/SEO  
**CURRENT:** Vite-Build erfolgreich (CSS 16,70 kB, JS 204,10 kB, jeweils unkomprimiert); GitHub-Pages-Workflow und `base: '/new-homepage/'` korrekt. Basis-Title, Description, Sprache, Viewport und Theme-Color vorhanden.  
**REFERENCE:** Production-ready, responsive Bilder, Lazy Loading unterhalb des Folds, Performance ≥90, vollständige Social-/Canonical-/Crawler-Metadaten.  
**DIFFERENCE:** `alex-editorial.png` ist 2,49 MB, `bilal-editorial.png` 1,77 MB; beide werden mehrfach/unterhalb des Folds ohne `loading="lazy"`, `srcset`, WebP/AVIF oder feste HTML-Dimensionen geladen. Projekt-JPEGs sind umgekehrt nur 400 px breit und werden teils auf 705 px vergrößert. Favicon, canonical, Open Graph, Twitter Card, robots.txt und sitemap.xml fehlen.  
**REQUIRED CHANGE:** Neue saubere Cutouts gleichzeitig als WebP/AVIF optimieren; responsive Quellen/`sizes`; Below-fold-Assets lazy laden; wichtige Hero-Quelle priorisieren; Projektquellen höher auflösen; SEO-Metadaten und statische Dateien ergänzen; Pages-Deployment unverändert beibehalten.  
**PRIORITY:** P1

## Asset-Matrix

| Asset | Datei / Qualität | Aktuelle Verwendung | Ziel-Section | Crop / Position | Filter | Background | Mobile-Version | Bewertung / Maßnahme |
|---|---|---|---|---|---|---|---|---|
| CODE² Wordmark | `code2-wordmark.png`, 640×165, 13,9 kB, Alpha | Nav + Footer | Nav + Footer | Nav 116 px, Footer 180 px | Nav: `brightness(0) invert(1)`; Footer: keiner | Transparent | dieselbe Datei | **P0:** fast weiß/silbern mit violettem `²`; im hellen Footer beinahe unsichtbar. Dunkel/orange und Weiß/orange Varianten erstellen. |
| Alex Original | `people/alex-kodalis.png`, 1254×1254, 489 kB, Alpha | ungenutzt | möglicher Services-Cutout | quadratisches Bust-Porträt | aktuell keiner | echt transparent | eigene Crop-Variante möglich | **Geeignet:** sauberer Alpha-Kanal; für Services/kleinere Collage besser als Editorial-Datei. Für Hero fehlt Körperhöhe. |
| Alex Editorial | `people/alex-editorial.png`, 1024×1536, 2,49 MB, **RGB ohne Alpha** | Hero + Services | Hero / Services | Hero in 600×465-Box; Services 520×590 | Services zusätzlich grayscale/contrast | sichtbares Schachbrett ist eingebrannt | dieselbe Datei | **P0:** kein echtes Cutout. Neu freistellen/generieren; danach getrennte Hero-/Services-Crops und moderne Formate. |
| Bilal Original | `people/bilal-altuntas.png`, 1254×1254, 1,46 MB, Alpha | ungenutzt | möglicher Contact-Cutout | quadratisches Bust-Porträt | aktuell keiner | echt transparent | eigene Crop-Variante möglich | **Geeignet:** besitzt Alpha; vor Neugenerierung testen. |
| Bilal Editorial | `people/bilal-editorial.png`, 1122×1402, 1,77 MB, **RGB ohne Alpha** | Contact | Contact | 576×530-Render, bottom aligned | grayscale/contrast | sichtbares Schachbrett ist eingebrannt | dieselbe Datei | **P0:** neu freistellen/generieren oder Original-Alpha verwenden; optimieren. |
| Gardinen Mannheim | `projects/gardinen-mannheim-dark.jpg`, 400×669, 30 kB | initiales Main Project + Phone | Projects / Execution | Hauptcard 705×720, top crop | grayscale/contrast | JPEG | dieselbe Datei | **P1:** zu klein für Hauptvisual. Höher aufgelöste Quelle oder Editorial-Composite/Mockup erzeugen. |
| Avci Gerüstbau | `projects/avci-geruestbau.jpg`, 400×782, 48 kB | Side Poster + Phone, Carousel | Projects / Execution | Side 337×330, Phones | grayscale / teils farbiger Mittelpunkt | JPEG | dieselbe Datei | Als Detail brauchbar; nicht groß ausgeben. Projekt enthält im Screenshot eigene Kennzahlen – nicht als CODE²-Claims interpretieren. |
| Stadtmüller | `projects/stadtmueller.jpg`, 400×663, 28 kB | Carousel + Phone | Projects / Execution | top crop | grayscale | JPEG | dieselbe Datei | Für Side-Layer brauchbar; Auflösung für große Screens zu niedrig. |
| Ingenieurbüro/KFZ Nuri | `projects/kfz-nuri.jpg`, 400×766, 42 kB | Carousel | Projects | top crop | grayscale | JPEG | dieselbe Datei | Dateiname und sichtbarer Projektname sollten fachlich verifiziert/vereinheitlicht werden. |
| Campingglück | `projects/campingglueck.jpg`, 400×670, 32 kB | Carousel | Projects | top crop | grayscale | JPEG | dieselbe Datei | Für Poster-/Device-Layer brauchbar, nicht als großes 1×/2×-Hero-Visual. |
| Handpan Noll | `projects/handpan-noll.jpg`, 400×669, 35 kB | ungenutzt | Reserve für Collage/Process | frei | noch keiner | JPEG | nicht definiert | Echtes vorhandenes Asset; kann Process/Execution ohne Stockbild stärken, sofern Projekt weiter gezeigt werden darf. |
| MP Dienstleistungen | `projects/mp-dienstleistungen.jpg`, 400×669, 31 kB | ungenutzt | Reserve für Collage/Process | frei | noch keiner | JPEG | nicht definiert | Echtes vorhandenes Asset; als kleiner Layer geeignet. |
| Sordillo | `projects/sordillo.jpg`, 400×669, 48 kB | ungenutzt | Reserve für Collage/Process | frei | noch keiner | JPEG | nicht definiert | Echtes vorhandenes Asset; als kleiner Layer geeignet. |
| Inline UI Icons | React-SVG (`Icon`, `PanelsTopLeft`, `Workflow`, `Bot`, etc.) | Buttons, Services, Process | UI-Chrome; nicht Hauptmotive | SVG | `currentColor` | transparent | skalierbar | Für Bedienicons geeignet; **nicht** als Ersatz für Process-Visuals. |
| Doodle | Inline SVG mit einem kombinierten Pfad | Hero + Contact | Hero / Contact | identischer Pfad, nur Rotation/Größe | orange stroke | transparent | verkleinert | **P1:** Wiederholung sichtbar. Zwei bis vier eigenständige organische SVG-Motive erstellen. |
| Orange Sketch | reines CSS-Polygon mit Streifen | Services | Services | 520×350 | orange Lines | transparent | 90 % Breite | **P1:** technisch/geometrisch statt handgezeichnet; durch SVG-/Collageillustration ersetzen. |
| Website-/Device Mockups | keine eigenständigen Assets | per CSS aus Projekt-JPEGs gebaut | Projects / Execution / Process | drei gleiche Phone-Rahmen | grayscale/brightness | CSS | skaliert/abgeschnitten | **P0:** heterogene Mockup-Assets/Composites fehlen vollständig. |

### Asset-Entscheidung vor Neugenerierung

1. Für Services zuerst `alex-kodalis.png` testen; das Original ist tatsächlich transparent.
2. Für Contact zuerst `bilal-altuntas.png` testen; auch dieses Original besitzt Alpha.
3. Für den Hero reicht Alex' quadratisches Original wahrscheinlich nicht, weil der benötigte dominante Torso-/Körper-Crop fehlt. Hier ist eine neue, identitätstreue transparente Variante gerechtfertigt.
4. Vor neuen Stock-/3D-Bildern die drei ungenutzten echten Projektassets für Execution und Process verwenden.
5. Neue visuelle Motive bevorzugt aus Projektfragmenten, CSS und SVG komponieren; ImageGen nur für fehlende Hero-/Objektmotive.

## Functional- und Deployment-Befund

| Check | Status | Evidenz / Restpunkt |
|---|---|---|
| Produktions-Build | Pass | `npm run build`, Vite 8.2.2, ohne Fehler |
| Lokale Page Identity | Pass | URL `/new-homepage/`, Titel `CODE² — Websites, Automationen & KI` |
| Blank Page / Overlay | Pass | vollständiger DOM-Inhalt, kein Framework-Overlay |
| Console | Pass | keine Warnungen oder Fehler bei 1440- und Mobile-Prüfung |
| Assets laden | Pass technisch | alle 10 im DOM genutzten Bilder mit gültigen Natural Dimensions; visuelle Alpha-Fehler bleiben |
| Desktop Anchors | Pass strukturell | Ziele `#projekte`, `#leistungen`, `#ablauf`, `#ueber-uns`, `#kontakt` existieren |
| Mobile Menu | Pass mit P1 | öffnet/schließt, Links sichtbar; Label/Fokus/Escape fehlen |
| Carousel | Pass | Wechsel von „Gardinen Mannheim“ zu „Avci Gerüstbau“, Zähler 01/05 → 02/05 |
| Contact | Fail funktional | keine Übertragung, nur lokaler Demo-State |
| Horizontaler Scroll | formell Pass | `scrollWidth === viewportWidth`; mehrere Kinder liegen dennoch außerhalb und werden abgeschnitten |
| GitHub Pages | Pass | Workflow mit `configure-pages`, Artifact `dist`, Deploy; Vite Base korrekt |

## Empfohlene Reihenfolge für die Umsetzung

1. **Asset-Fundament:** echte transparente Portraits und passende Logo-Varianten bereitstellen.
2. **P0 Desktop bei 1440:** Hero, Projects, Services, Execution, Process, Footer in dieser Reihenfolge neu komponieren.
3. **Section-Proportionen:** Projektsektion um ca. 320–380 px, Services um ca. 100–150 px und Footer um ca. 60–120 px reduzieren.
4. **Conversion:** echten Kontaktweg definieren und einbauen; Sterneblock durch belegbaren Trust-Text ersetzen.
5. **Responsive Art Direction:** 1024/768 zuerst (größter Layoutbruch), danach 430/375, anschließend 1280/1920.
6. **Erst nach statischem Matching:** Motion, Bildformate/Lazy Loading, SEO-Metadaten und Microinteractions.

## Abnahmebedingung für die nächste Runde

Eine neue Visual-QA-Runde ist erst sinnvoll, wenn alle P0-Kompositionen implementiert und die defekten Portrait-/Logoassets ersetzt sind. Der nächste 1440-Screenshot sollte gegenüber der Referenz insbesondere zeigen:

- Projektsektion mit klar ungleichen Visualflächen und deutlich reduzierter Höhe,
- echte Freisteller ohne Schachbrettmuster,
- vier visuelle Process-Motive,
- heterogenen Execution-Cluster,
- sichtbares Footer-Logo und echte/als TODO markierte Kontaktstruktur,
- stabile Hero-Zeilenbrüche und kein unbelegtes Sterne-Rating.
