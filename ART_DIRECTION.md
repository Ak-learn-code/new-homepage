# CODE² Art Direction & Responsive Composition

Status: verbindliche Gestaltungs- und Responsive-Vorgabe vor der Implementierung  
Basis: Referenzbild `1440 × 4730`, Live-Seite geprüft bei `1440 × 900` und `430 × 900`, Repository-Stand vor dem Rebuild  
Scope dieses Dokuments: Art Direction (Agent C) + Responsive Strategy (Agent F); noch keine Produktcode-Änderungen

## 1. Leitidee

Die Seite soll nicht wie ein Website-Template wirken, sondern wie eine sorgfältig gesetzte, analoge Editorial-Strecke für eine kleine Creative-Tech-Agentur. Der wiedererkennbare Kern der Referenz ist:

- ein heller, fast papierweißer Hero als große Bühne;
- ein einziges, mittiges Personenmotiv als visueller Anker;
- eine schwebende Leistungsleiste als Übergang in eine dunkle Editorial-Fläche;
- bewusst ungleiche Bildformate statt gleichförmiger Cards;
- ein Wechsel aus hellen, offenen Bereichen und dunklen, stark gerundeten Bühnen;
- Orange nur als präzise Markierung, nicht als flächiger Markenverlauf;
- handgezeichnete Pfeile und Marker, die Blickrichtungen erklären;
- kleine, dichte Typografie neben großen, luftigen Headlines;
- kontrollierte Überlappungen zwischen Bild, Text und Section-Grenzen.

CODE² bleibt in Text, Personen, Logo und Projekten vollständig erkennbar. Die Referenz liefert die Komposition, nicht die fremden Inhalte.

## 2. Harte Abgrenzung: Was nicht entstehen darf

- Kein SaaS-/Dashboard-Look, kein Bento-Grid, kein überall identischer Card-Radius.
- Kein durchgehender braun-oranger Glow. Das aktuelle starke Glow-Raster auf Mobile ist zu präsent.
- Keine erfundenen Sterne, Bewertungen, Kundenzahlen, Auszeichnungen oder Social-Links.
- Keine drei gleichartigen Smartphone-Mockups nebeneinander.
- Keine großflächig hochskalierte 400-px-Projektgrafik als unscharfer Hintergrund.
- Keine sichtbare Schachbrett-Textur aus vermeintlich transparenten Portrait-Dateien.
- Keine überlangen Bereiche, nur damit Inhalte „mehr Raum“ bekommen.
- Keine Mobile-Fassung, die nur Desktop untereinander stapelt.

## 3. Globales visuelles System

### 3.1 Farben

| Rolle | Zielwert | Anwendung |
|---|---:|---|
| Paper | `#F8F8F6` | echte, neutrale helle Flächen; nicht beige einfärben |
| Ink | `#202020` | Haupttext und Navigation |
| Dark | `#1E1E1E` | dunkle Bühnen |
| Orange | `#FF4B0B` | Key-Wörter, CTA, Scribbles, aktive Marker |
| Gray surface | `#6B6B6B` bei 60–75 % Deckkraft | Service Rail und Glass-Labels |
| Light muted | `#686868` | Bodytext auf hell |
| Dark muted | `#C7C7C2` | Bodytext auf dunkel |

Atmosphärisches Braun ist nur als sehr weicher Randglow erlaubt: maximal 12–16 % sichtbare Deckkraft, nur an einer Ecke pro dunkler Bühne. Orange darf nie die Lesbarkeit des Rasters oder der Bilder überziehen.

### 3.2 Grid

- Desktop-Raster: `104 × 104 px` ist als Ausgangswert passend, Deckkraft auf hell `5–7 %`, auf dunkel `3–4 %`.
- Das Raster darf in den Bildmotiven verschwinden und an freien Flächen sichtbar werden.
- Mobile-Raster: `56–64 px`, Deckkraft jeweils nochmals um etwa 1 Prozentpunkt reduzieren.
- Keine orangefarbenen Rasterpunkte oder wiederholten Glows pro Zelle.

### 3.3 Typografie

DM Sans kann bleiben, aber mit strengerer Größenhierarchie:

- Hero Desktop: `72–78 px`, `0.94–0.98` line-height, `-0.045em` tracking, Gewicht 450–500.
- Section Headline Desktop: `52–62 px`, `0.96–1.00`, `-0.04em`, Gewicht 400–500.
- Body Desktop: `14–16 px`, `1.40–1.52`, maximal 48–56 Zeichen pro Zeile.
- Microcopy Desktop: `11–12 px`, `1.28–1.40`.
- Mobile Hero: `42 px` bei 430 und `38 px` bei 375, höchstens drei Zeilen.
- Mobile Section Headline: `38–42 px` bei 430 und `34–38 px` bei 375.
- Orange Hervorhebung: italic + 700; nicht jede Überschrift identisch umbrechen.

### 3.4 Geometrie

| Ebene | 1440-Ziel |
|---|---:|
| Hero Bottom Radius | `150–170 px` |
| Dark Section Radius | `54–64 px` |
| Footer Top Radius | `92–110 px` |
| Große Editorial Frames | `34–42 px` |
| Service/Process Visuals | `22–28 px` |
| Floating Labels | `14–20 px` |
| Pills | `999 px` |

Hero und Footer müssen die größten Radien besitzen. Section-, Card- und Label-Radien dürfen nicht gleich aussehen.

### 3.5 Bildbehandlung

- Für Alex und Bilal nur echte Alpha-Cutouts als Kompositionsquelle einsetzen. Die Dateien `alex-editorial.png` und `bilal-editorial.png` besitzen laut Dateiprüfung keine echte Alpha-Transparenz und zeigen aktuell eine sichtbare Schachbrett-/Rechteckfläche. Das ist P0.
- Primärquellen: `public/assets/people/alex-kodalis.png` und `bilal-altuntas.png`; daraus kontrastreiche monochrome Varianten mit sauberer transparenter Kante ableiten.
- Portraits nicht in weiße Rechtecke setzen. Der Kreis/Halo liegt separat als CSS-Fläche dahinter.
- Projektbilder liegen überwiegend nur mit 400 px Breite vor. Sie dürfen deshalb nicht mehr als vollflächige 700-px-Hintergründe behandelt werden. Besser: innerhalb eines Posterrahmens bei circa 320–430 CSS-px Breite zeigen, mit großen typografischen und grafischen Flächen ergänzen.
- Grayscale bei Projektmotiven auf `85–100 %`; Orange als punktueller Tint/Marker auf höchstens 10–18 % der jeweiligen Komposition.

## 4. 1440-px-Masterkomposition

Die Referenz ist bei 1440 px etwa 4730 px hoch. Die aktuelle Live-Seite ist 5243 px hoch. Ziel für die finale 1440-Seite: `4680–4860 px`. Die Reduktion kommt vor allem aus Projects, Services und Footer; nicht aus einer pauschalen Verkleinerung aller Elemente.

### 4.1 Navigation

Ziel:

- Außenbreite `calc(100% - 240px)` beziehungsweise `1200 px`, Höhe `52–56 px`, Top `48–52 px`.
- Logo geometrisch exakt in der Seitenmitte; links zwei und rechts zwei Textlinks.
- Schrift `12–13 px`, Farbe 85 % Weiß, keine große Desktop-CTA in der Pill.
- Dezenter Shadow: ungefähr `0 8px 18px rgba(0,0,0,.12)`.
- Orange Unterstrich nur unter dem Logo, `42–48 × 3 px`.

### 4.2 Hero — P0

Zielhöhe: `820–850 px`; Hero endet als helle, sehr stark gerundete Fläche. Der aktuelle Bereich ist mit 838 px bereits nahe an der Referenz, die innere Komposition ist jedoch noch nicht sauber genug.

Komposition bei 1440:

- Headline-Block: Breite `700–760 px`, Oberkante `184–198 px`, optisch zentriert.
- Fest gesetzter Umbruch: `Wir bauen digitale Auftritte,` / `die arbeiten.`; „arbeiten.“ orange und italic.
- Doodle links an die erste Zeile koppeln, nicht frei im Rand schweben: Markerzentrum ungefähr `x 275`, `y 235`, Breite `90–110 px`.
- Stage als Dreieckskomposition: linke Microcopy `x 118–320`, Portrait `x 505–935`, rechter Trust-Block `x 1120–1320`.
- Alex: Kopf startet ungefähr bei `y 350–370`, Körper schließt bündig am Hero-Boden. Sichtbare Bildbreite `360–430 px`, Höhe `470–500 px`.
- Halo: `390–430 px` Durchmesser, Unterkante 35–55 px unterhalb des Hero-Clippings.
- CTA-Gruppe liegt auf Brusthöhe nahe Hero-Unterkante; Primärbutton links, Sekundärbutton rechts. Buttonhöhe `42–46 px`.
- Linke Microcopy maximal 200 px breit, darunter Outline-Link.
- Rechts keine Sterne. Ersatz mit gleicher visueller Masse: kleines oranges handgezeichnetes Zeichen oder `CODE²`-Marker, darunter `Direkt mit uns.` und `Von der Idee bis live.`. Keine Bewertungsanmutung.

Aktuelle P0-Abweichungen:

1. Das Portrait wird von einer sichtbaren quadratischen Checkerboard-Fläche hinterlegt.
2. Die Headline nimmt zu viel Breite ein und wirkt als einzelne große Textmasse weniger editorial.
3. Sterne suggerieren eine Bewertung, die nicht belegt ist.
4. Die drei Side-/Center-Bereiche wirken nebeneinander platziert statt als ein zusammenhängendes Bühnenbild.

### 4.3 Floating Service Rail — P0-Übergang

- Der Rail bleibt innerhalb der dunklen Project-Section, sitzt aber optisch `54–66 px` unterhalb des Hero-Bodens und verbindet beide Flächen.
- Breite `1180–1200 px`, Höhe `118–128 px`, Radius `26–30 px`.
- Vier identische Spalten mit vertikalen Separatoren; `01`, `02`, `03`, `04` ohne Pluszeichen, da das Plus aktuell wie eine Zahlenaussage wirkt.
- Servicebezeichnungen klein darunter: Webseiten, Automationen, KI-Agenten, Interne Tools.
- Die Fläche darf transluzent wirken, aber nicht wie starkes Glassmorphism: kein Blur über `10 px`, keine helle Außenkante über 28 %.

### 4.4 Dark Projects / Editorial — P0

Ziel: sichtbare dunkle Strecke vom Hero-Boden bis etwa `y 1880–1950`; berechnete Section-Höhe inklusive Überlappung etwa `1120–1180 px`. Aktuell endet dieser Bereich erst bei y 2165 und ist rund 220–300 px zu lang.

Header:

- Beginn Headline etwa `y 1120–1160`, linke Spalte `42 %`, rechte Beschreibung `48 %`, dazwischen `8–10 %` Luft.
- Headline `Digitale Arbeit, / die schon läuft.` mit `54–60 px`.
- Body rechts auf `430–520 px` begrenzen; Grundlinie an der unteren Headline-Zeile ausrichten.

Editorial-Visual statt Portfolio-Card:

- Gesamthöhe `500–540 px`, nicht 720 px.
- Grid `60/40`, Gap `26–30 px`.
- Linkes Visual: `Gardinen Mannheim` als Posterkomposition. Die 400-px-Screenshotdatei nicht voll aufziehen. Bildschirmmotiv bei `340–410 px` Breite in einen größeren grauen Papier-Frame setzen; große Typo `LICHT. / STOFF. / RAUM.` und ein orangefarbener Ausschnitt/Marker schaffen das visuelle Gewicht.
- Rechtes Visual: vertikales Poster, etwa `420–450 px` hoch und 65–75 % der linken Visual-Höhe; oben mit CODE²-Wortmarke oder Projektname, darunter ein zweites echtes Projektfragment. Unterkante darf gegenüber links um 16–28 px versetzt sein.
- Beide Motive: keine identische Caption-Anatomie. Links kann die Projektbezeichnung an der Unterkante sitzen, rechts als gedruckte Posterzeile.
- Carousel-Steuerung bleibt klein unten rechts und darf nicht die Section verlängern: `40 px` Kreise, Nummer dazwischen.
- Ein orangefarbenes Scribble darf links außerhalb des großen Visuals um 20–30 px überstehen und wird von der Section geclippt.

### 4.5 Services / „Was wir am besten können“ — P0

Zielhöhe: `600–650 px` statt aktuell 760 px. Helle Fläche ohne eigenes großes Section-Card-Gerüst.

- Spaltenverhältnis `62/38`.
- Linkes Portrait von Alex als eigenständige Collage: sichtbare Höhe `480–530 px`; Person ragt optisch 30–55 px in den nachfolgenden dunklen Execution-Bereich, wird jedoch dort sauber geclippt/überlagert.
- Hinter Alex keine repetitive Stripe-Polygonfläche. Stattdessen zwei handgezeichnete orange Flügel-/Strichcluster, asymmetrisch links unten und rechts mittig.
- Vier Floating Labels, nicht drei. Positionen bei 1440 relativ zur linken Collage:
  - Webseiten: links oben, ca. `x 110 / y 90`;
  - Automatisierung: rechts oben, ca. `x 500 / y 55`;
  - KI-Agenten: links-mittig, ca. `x 95 / y 310`;
  - Interne Tools: rechts-mittig, ca. `x 520 / y 290`.
- Labelgröße `190–230 × 82–98 px`; Icons optisch `26–30 px`, keine ausgefüllten generischen Dashboard-Symbole.
- Die Karten dürfen den Körper überdecken, aber nie Gesicht/Augen.
- Rechte Headline `Was wir am / besten können.` bei `54–60 px`; Textblock maximal 420 px.
- Die aktuelle zusätzliche Checkliste entfernt den Bezug zur Referenz und macht die rechte Spalte zu lang. P0: entfernen. Nur Positionierungstext + zwei kleine CTA-Pills.

### 4.6 Dark Execution Showcase — P0

Zielhöhe `590–630 px`, Radius `56–64 px`. Aktuelle Section-Höhe ist passend; der rechte Cluster ist das Problem.

- Linke Spalte `42 %`, rechte `58 %`.
- Headline `Von der Idee / bis live.` bei `54–60 px`.
- Darunter genau drei kurze Sätze/Zeilen: `Direkte Abstimmung. / Klare Schritte. / Keine unnötigen Umwege.`. Die nummerierte Mini-Prozessliste entfällt hier, da der Prozess später separat erzählt wird.
- Rechter Cluster aus drei verschiedenen Ebenen:
  1. hinten links: breiter Website-Ausschnitt in einem flachen Browserframe, `360 × 235 px`, 10–14° gegen den Uhrzeigersinn;
  2. vorn mittig: ein Smartphone, `220 × 410 px`, gerade oder maximal 2°;
  3. hinten rechts: vertikales Poster/Detail, `255 × 330 px`, 6–10° im Uhrzeigersinn.
- Hintere Ebenen in 75–90 % Graustufen und 65–80 % Helligkeit; vorderes Motiv farbig mit echtem Projektbild.
- Frames überlappen um jeweils `60–110 px`, nicht nur nebeneinander stehen.
- Orange Glow nur unter dem vorderen Gerät, nicht als vollflächiger Hintergrundverlauf.

### 4.7 Contact CTA — P0

Zielhöhe `620–670 px`.

- Linke Bildzone `48 %`, rechte Textzone `52 %`.
- Bilal als echte Freistellung, sichtbare Höhe `460–520 px`; sein Kopf/Arm muss in Richtung der Headline zeigen. Mit vorhandenem Portrait ohne zeigende Pose wird die Blickrichtung über einen Pfeil vom Kopf/Schulterbereich zur Headline hergestellt.
- Halo `390–430 px`, leicht nach links versetzt.
- Kein weißes Bildrechteck und keine Checkerboard-Fläche.
- Headline `Bringt eure Idee / zum Leben.` `54–60 px`.
- Formularbereich auf 500 px begrenzen. Ein schlankes E-Mail-Feld und orangefarbener CTA.
- Da kein Backend vorhanden ist: Form nicht mit einer künstlichen Erfolgsmeldung abschließen. P0: CTA als `mailto:` oder klarer Link `E-Mail schreiben`; alternativ Formular disabled mit ehrlicher Kennzeichnung, bis ein echtes Ziel verbunden ist.

### 4.8 Process / Methode — P0

Zielhöhe `500–540 px`.

- Dunkle Section startet mit großem Radius oben, keine zusätzliche Headline nötig (wie Referenz).
- Vier Visualkarten `250–270 px` breit, Bild-/Objektzone `250–270 px` hoch, darunter ein überlagerndes Label `44–50 px`.
- Nur Karte 02 erhält eine orange Grundfläche. Die anderen nutzen drei verschiedene Grauwerte.
- Jede Karte braucht ein eigenes visuelles Objekt statt eines 40-px-Line-Icons:
  - `01 Verstehen`: vergrößertes Brief-/Wireframe-Fragment mit orange markierter Problemstelle;
  - `02 Gestalten`: typografischer Mini-Poster-Ausschnitt aus einem echten CODE² Projekt;
  - `03 Umsetzen`: freigestellter Device-/Browser-Fragment-Cluster mit sichtbarer Layerung;
  - `04 Verbessern`: Projektfragment mit handgezeichneter Kreis-/Loop-Markierung, ohne erfundene Analytics.
- Objekt deckt 55–70 % der Bildzone ab. Kleine Icons sind höchstens unterstützend.
- Beschreibungen können unterhalb der Visuals auf Desktop bleiben, aber maximal zwei Zeilen.
- Progress-Line über fast die gesamte Contentbreite; Orange-Marker bei `34–38 %`, passend zur hervorgehobenen zweiten Karte.

### 4.9 Footer — P0

Zielhöhe `390–440 px` statt aktuell 520 px.

- Große helle Fläche mit `100 px` Top-Radius.
- Drei Hauptzonen wie Referenz: Brand links (`36 %`), Sitemap Mitte (`28 %`), Kontakt rechts (`36 %`).
- Links: CODE²-Logo `180–210 px`, kurze Beschreibung, Namen der beiden Personen.
- Mitte: zwei schmale Linkspalten können bleiben, aber keine erfundene Leistung wie `Hosting`, wenn sie nicht als eigener Leistungsbereich bestätigt ist.
- Rechts: echte E-Mail-Adresse/Telefon nur aus vorhandener, bestätigter Quelle. Fehlen Daten, sichtbaren Text neutral halten (`Projekt anfragen`) und intern `TODO` setzen; keine Fake-Social-Icons.
- Der aktuelle große zusätzliche Marketingblock `Lasst uns daraus ein System machen.` macht den Footer zu einer weiteren CTA-Section und weicht von der Referenz ab. P0: entfernen.
- Untere orange Leiste `46–52 px` hoch, Copyright zentriert oder links/rechts sehr knapp gesetzt.

## 5. Eigene Kompositionen je Viewport

Die Werte sind konkrete Zielgrößen, keine pauschalen Breakpoint-Vorschläge. Zwischen den Stützstellen wird fließend interpoliert.

### 5.1 1920 px

- Seitenkörper nicht auf 1440 px begrenzen; Ziel-Max-Width `1720–1760 px`. Außen bleibt dunkler Rand von ca. 80–100 px.
- Grid `120 px`, Navigation `1500–1580 px` breit.
- Hero `900–930 px` hoch; Headline `86–92 px`, max. 900 px; Alex `500–550 px` hoch.
- Rail `1460–1540 × 132 px`.
- Projects: `1180–1240 px` Section-Höhe, Visualhöhe `570–600 px`; linke/rechte Motive dürfen breiter werden, nicht höher als proportional sinnvoll.
- Services `700 px`, Execution `660 px`, Contact `700 px`, Process `560 px`, Footer `450 px`.
- Textspalten nicht unendlich verbreitern: Bodymaxima bleiben wie bei 1440; zusätzliche Breite geht in Luft, Bildrahmen und Gutter.

### 5.2 1440 px — Source of truth

- Contentgutter `8.5 %` beziehungsweise etwa `122 px`.
- Gesamthöhe `4680–4860 px`.
- Section-Zielhöhen: Hero `830`, Projects rechnerisch `1120–1180` mit Überlappung, Services `620`, Execution `610`, Contact `650`, Process `520`, Footer `420`.
- Exakte Komposition gemäß Abschnitt 4.

### 5.3 1280 px

- Contentgutter `72–82 px`; Navbreite etwa `1080–1120 px`.
- Hero `800–820 px`; Headline `66–72 px`, max. 700 px; Alex `450–475 px`.
- Sidecopy-Breiten auf 185 px begrenzen, rechten Trustblock bei x ≈ 990 verankern.
- Rail Höhe `116 px`.
- Projects: Visualgrid `59/41`, Höhe `490–510 px`; rechte Posterüberschrift kleiner (`46–50 px`).
- Services: vier Labels enger um die Person, maximal 205 px breit. Keine Karte darf in die rechte Textspalte ragen.
- Execution-Cluster insgesamt auf `600–640 px` Breite komprimieren; hintere Frames teilweise stärker clippen statt alle Geräte gleich klein zu skalieren.
- Footer bleibt dreispaltig.

### 5.4 1024 px

- Dies ist die letzte zweispaltige Fassung, aber keine verkleinerte 1440-Seite.
- Gutter `42–48 px`; Nav `calc(100% - 84px)`, mittlere Logospalte 140 px.
- Hero `760–790 px`, Headline `56–60 px`, zwei Zeilen; linke Microcopy bei `x 48`, Trustblock bei `x 790`; Portrait `390–420 px` hoch.
- Rail `920 × 108 px`, Texte `11–12 px`.
- Projects-Header `43/57`; Visual `58/42`, Höhe `430–460 px`. Linkes Poster wird typografisch reduziert, Screenshot bleibt höchstens 340 CSS-px breit.
- Services `570–600 px`, linke Collage `58 %`, rechte Copy `42 %`; Labels `165–185 px`, Beschreibungen je maximal zwei kurze Zeilen.
- Execution: Text `38 %`, Cluster `62 %`; nur vorderes Smartphone vollständig zeigen, Hintergründe dürfen seitlich zu 25–35 % abgeschnitten werden.
- Contact 50/50; Inputbreite maximal 410 px.
- Process-Cards in einer horizontalen Viererreihe, Gap `18–22 px`, Beschreibungen mit fester Mindesthöhe.
- Footer drei Zonen, aber Linkspalten enger.

### 5.5 768 px

- Tablet bekommt eine bewusste Hybridkomposition.
- Navigation: Logo links, Burger rechts in schwarzer Pill; kein Desktop-Linktext. Höhe `56 px`, Gutter `28–32 px`.
- Hero `780–820 px`; Headline `50–54 px` und drei Zeilen. Microcopy links und Trust rechts bilden eine schmale Zeile oberhalb des Portraits; Portrait `430–450 px`, horizontal zentriert, CTA über der Brust.
- Rail als horizontale 2×2-Matrix, `calc(100% - 64px)` breit, `150–165 px` hoch. Separatoren nur als Kreuz, nicht vier einzelne Cards.
- Projects-Header bleibt zweispaltig `48/52`, Visual darunter `62/38`, Höhe `400–430 px`; rechte Posterkarte kleiner und 22 px tiefer setzen.
- Services wird zweistufig: Text oben rechtsbündig auf 58 % Breite; darunter eine breite Portraitcollage mit vier Labels. Nicht Text plus komplettes Desktop-Bild einfach stapeln.
- Execution: Text oben links; Cluster darunter rechtslastig, ein vorderes Phone plus zwei angeschnittene Ebenen, Section `720–760 px`.
- Contact: Bilal links unten, Copy rechts oben; beide bleiben in derselben Fläche, nicht vollständig untereinander. Höhe `650–700 px`.
- Process: 2×2, aber als eine zusammenhängende Bühne. Visualcards etwa `300 × 240 px`; Progress-Line unter der zweiten Reihe.
- Footer: Brand volle Breite oben, darunter Navigation und Kontakt in zwei Spalten.

### 5.6 430 px

- Ziel-Gesamthöhe `5300–5750 px`; aktuell 6732 px ist zu lang.
- Außengutter `20 px`; Section-Innengutter `20–24 px`; keine horizontale Überbreite.
- Hero `790–820 px`. Headline `42 px`, Umbruch: `Wir bauen` / `digitale Auftritte,` / `die arbeiten.`. Alex `405–430 px` hoch. Sidecopy wird auf zwei gegenüberliegende Microblöcke oberhalb der Schultern reduziert; maximal 5 kurze Zeilen links und 3 rechts. CTA-Höhe mindestens `44 px`.
- Rail `390 × 148 px`, 2×2 innerhalb einer einzigen Oberfläche.
- Projects `1220–1300 px` inklusive Rail-Überlappung: Headline + Body, großes Visual `365 × 420–460 px`, kleines Poster `285–315 × 350–380 px`, rechtsbündig und um 18 px überlappend. Nicht zwei nahezu volle 390-px-Cards untereinander; das reduziert Höhe und erhält die Asymmetrie.
- Services `900–980 px`: Headline/Copy zuerst, danach Alex-Collage. Vier Labels in einem versetzten Zickzack; Kartenbreite `165–185 px`, nur Titel + maximal eine kurze Zeile. Kein Label über den Augen.
- Execution `720–780 px`: Copy oben, Cluster unten; Phone `190–205 × 360–385 px`; linkes Browserfragment schaut 90–120 px heraus, rechtes Poster 80–100 px.
- Contact `800–860 px`: Headline, Text und Mail-CTA oben; Bilal darunter auf Halo. Die CTA darf nicht vom Bild überdeckt werden.
- Process `760–820 px`: 2×2, Kartenbreite `184–190 px`, Visualhöhe `205–220 px`; Beschreibung maximal zwei Zeilen.
- Footer `620–690 px`: Brand, dann zwei Linkspalten, dann Kontaktzeile; orange Abschlussleiste.
- Das aktuelle wiederholte orange Glow-Raster entfernen. Dark Sections fast neutral halten.

### 5.7 375 px

- Ziel-Gesamthöhe `5100–5550 px`.
- Außengutter `16 px`; Navigation `343 × 54 px`.
- Hero `770–800 px`; Headline `38 px`, gleicher Dreizeilenumbruch wie bei 430. Alex `375–400 px` hoch. Microcopy je maximal 150 px, rechts nur `Direkt mit uns. / Von der Idee bis live.`. CTA-Gruppe darf zwei kleine Pills nebeneinander behalten, muss aber mit je mindestens 44 px Höhe funktionieren.
- Rail `343 × 152 px`, 2×2; Zahlen `20–22 px`.
- Projects `1160–1240 px`: Hauptposter `343 × 410–435 px`; Sideposter `258–280 × 330–355 px` rechtsbündig und teilweise in den Leerraum unter der Hauptcaption gezogen. Buttons direkt neben Seitenzähler.
- Services `880–940 px`: Headline `36–38 px`; Alex maximal `350 px` breit. Floating Labels `148–165 px`; Bodycopy in Labels weglassen, wenn sie sonst über drei Zeilen wächst.
- Execution `700–750 px`: Phone `175–190 × 340–365 px`; Background-Layer stärker clippen. Keine Transform-Skalierung auf einen Desktopcluster, sondern echte mobile Maße.
- Contact `780–830 px`: Eingabe und Button jeweils volle Breite oder CTA als volle Mail-Pill; Bilal `330–350 px` breit.
- Process `720–780 px`: 2×2 mit `12–14 px` Gap, Visualcards `164–166 px` breit. Beschreibungen auf konsistente zwei Zeilen kürzen.
- Footer `620–680 px`; lange Headline entfällt, da Footer nicht als zweite CTA-Section dient.

## 6. Section-Übergänge

Die Referenz lebt von Übergängen, nicht von isolierten Blöcken:

1. Hero überlappt Projects um `80–100 px`; die weiße Rundung bleibt klar vor der dunklen Fläche sichtbar.
2. Rail sitzt vollständig auf dunkel, wird aber als Brücke direkt unter dem Hero gelesen.
3. Projects endet mit großem unteren Radius und kräftigem, weichem Shadow auf der folgenden hellen Fläche.
4. Alex aus Services darf die obere Kante der Execution-Section optisch berühren oder minimal überragen; Execution selbst bleibt im Vordergrund.
5. Contact beginnt mit viel Weißraum nach Execution, damit der dunkle Block atmen kann.
6. Process beginnt als dunkle, oben gerundete Bühne; Footer sitzt wie eine helle Kapsel darin und übernimmt die stärkste obere Rundung.

## 7. Motion nach statischem Match

- Scroll reveal: `opacity + translateY(12–18px)`, `420–560ms`, ease-out.
- Projektwechsel: Crossfade plus maximal 10 px Seitbewegung, keine 3D-Rotation.
- Service Labels: 2–4 px ruhige Parallaxverschiebung; auf Touch deaktivieren.
- CTA Hover: 1–2 px Lift; keine federnden/bouncenden Effekte.
- `prefers-reduced-motion` respektieren.

## 8. P0-Reihenfolge für die Umsetzung

1. Portrait-Assets mit echter Transparenz herstellen/verwenden; sichtbare Checkerboards vollständig eliminieren.
2. Projects von 1423 px auf etwa 1120–1180 px verdichten und die Bildsprache von Gallery zu Editorial Poster umbauen.
3. Hero-Dreieckskomposition schärfen; Headlinebreite, Portraitzentrum, CTA-Layer und Microcopy neu setzen; Sterne entfernen.
4. Execution von drei ähnlichen Phones zu Browser + Phone + Poster umbauen.
5. Services auf vier überlagerte Labels und eine echte Collage reduzieren; Checkliste entfernen.
6. Process-Line-Icons durch vier individuelle visuelle Motive ersetzen.
7. Footer auf Brand + Sitemap + echte Kontaktzone zurückführen und überzählige CTA entfernen.
8. Contact-Formular auf einen echten Kontaktweg umstellen und Fake-Success entfernen.
9. Mobile 430/375 separat komponieren und Seitenhöhe um circa 1000–1400 px reduzieren.
10. Überzogenen braun-orangen Rasterglow aus allen dunklen Sections entfernen.

## 9. Erwartete QA-Bewertung

### Aktueller Stand (visuelle Einschätzung)

| Kategorie | Erwarteter Ist-Score |
|---|---:|
| Layout Accuracy | 6.8/10 |
| Section Proportions | 5.8/10 |
| Typography | 7.2/10 |
| Spacing | 6.4/10 |
| Image Placement | 5.9/10 |
| Art Direction | 6.0/10 |
| Colors | 7.1/10 |
| Border Radius | 7.6/10 |
| Decorative Details | 5.8/10 |
| Overall Similarity | 6.4/10 |

### Ziel nach P0 + Responsive-Pass

| Kategorie | Abnahmeschwelle | Erwartetes Ziel |
|---|---:|---:|
| Layout Accuracy | 8.5 | 9.0 |
| Section Proportions | 8.5 | 9.1 |
| Typography | 8.5 | 8.8 |
| Spacing | 8.5 | 8.9 |
| Image Placement | 8.5 | 8.8 |
| Art Direction | 8.5 | 9.0 |
| Colors | 8.5 | 9.2 |
| Border Radius | 8.5 | 9.2 |
| Decorative Details | 8.5 | 8.7 |
| Overall Similarity | 8.5 | 9.0 |

Kein P0 darf in der Abnahme offen sein. Ein Durchschnitt über 8.5 reicht nicht, wenn Portrait-Transparenz, Project-Proportion, Footerstruktur oder Mobile-Overflow sichtbar falsch bleiben.

## 10. QA-Checkliste pro Viewport

Für `1920 / 1440 / 1280 / 1024 / 768 / 430 / 375` jeweils dokumentieren:

- Hero-Unterkante, Portraitgröße und Headline-Umbruch;
- Rail-Position und Separatoren;
- Projects-Gesamthöhe und asymmetrisches 60/40-Verhältnis;
- keine hochskalierte/unscharfe Projektgrafik;
- alle vier Service Labels sichtbar, ohne Gesicht zu verdecken;
- Execution mit drei unterschiedlichen Layer-Typen;
- Contact ohne Fake-Success und ohne Bildrechteck;
- Process mit vier echten visuellen Motiven;
- Footer ohne erfundene Kontakt-/Social-Daten;
- Section-Radien klar hierarchisch;
- kein horizontales Overflow, auch nicht durch transformierte Collage-Layer;
- Touch-Ziele mindestens 44 px;
- Grid subtil und auf dunkel nahezu unsichtbar;
- Screenshot-Gesamthöhe innerhalb des jeweiligen Zielkorridors;
- direkte Side-by-Side-Bewertung mit Referenz bei 1440 px.

## 11. Erwartete Abnahmeaussage

Die Umsetzung ist art-direktional bereit für Sign-off, wenn beim nebeneinanderliegenden 1440-Vergleich dieselbe Reihenfolge und dieselben visuellen Gewichte sofort sichtbar sind: großer heller Hero, schwebende Rail, kompakte dunkle Editorial-Collage, helle Portrait-Collage, dunkler Layer-Showcase, luftiger Contact, vier bildstarke Process-Objekte und ein kompakter heller Footer. Funktionale Korrektheit oder ein erfolgreicher Build ersetzen diese visuelle Prüfung nicht.
