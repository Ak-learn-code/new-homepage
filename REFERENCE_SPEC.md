# CODE² Reference Specification

## Status und Messgrundlage

Diese Datei beschreibt ausschließlich die visuelle Referenz. Sie ist keine Bestandsaufnahme der aktuellen CODE²-Implementierung und enthält keine Vorgabe, fremde Markeninhalte zu übernehmen.

- Referenzdatei: `codex-clipboard-d6aed16c-8676-4ec2-b00e-e6ac7bc3ba6b.png`
- Originalgröße: **1440 × 4730 px**
- Primäre Zielbreite: **1440 px Desktop**
- Messgenauigkeit: Geometrie in der Regel **±8 px**, kleine Details **±4 px**, Fonts wegen Rasterbild **±2 px**
- Alle Werte sind aus der Referenz abgeleitet. Fremde Logos, Texte, Personen, Kontaktdaten und Kennzahlen sind nicht zu kopieren.
- Die Referenz zeigt nur Desktop. Angaben für kleinere Viewports sind deshalb eine kontrollierte Ableitung, keine gemessene Kopie.

## 1. Globale Geometrie

### Seitenraster

- Die Komposition nutzt ein sichtbares, aber sehr leises **120 × 120 px Grundraster**.
- Vertikale Rasterlinien liegen ungefähr bei `x = 120, 240, 360, ... 1320`.
- Zentrale Nutzbreite: **1200 px**, also von `x = 120` bis `x = 1320`.
- Normales horizontales Desktop-Padding: **120 px / 8.33 vw**.
- Große gerundete Flächen sind fast viewportbreit: ungefähr `x = 0–1440`; Hero und Footer lassen an den Seiten etwa **16–18 px** dunklen Untergrund sichtbar.
- Rasterlinie: neutralgrau, ca. `rgba(25,25,25,.08)` auf hell und `rgba(255,255,255,.07)` auf dunkel; Strichstärke rund **1 px**.
- Das Raster ist Orientierung und Textur, nicht Dekoration im Vordergrund. Es darf nie stärker als Text, Bilder oder Doodles wirken.

### Vertikaler Seitenrhythmus bei 1440 px Breite

| Bereich | ungefährer Y-Bereich | Höhe | Anteil an 900-px-Viewport |
|---|---:|---:|---:|
| Hero inklusive Navigation | `0–834` | `834 px` | `0.93 vh` |
| Floating Rail / Einstieg Dark Project | `834–1030` | Rail `130 px` | — |
| Dark Project / Editorial insgesamt | `834–1914` | `1080 px` | `1.20 vh` |
| Services / What We Do | `1914–2512` | `598 px` | `0.66 vh` |
| Dark Execution Showcase | `2512–3104` | `592 px` | `0.66 vh` |
| Contact CTA | `3104–3834` | `730 px` | `0.81 vh` |
| Process | `3834–4325` | `491 px` | `0.55 vh` |
| Footer inkl. Abschlussleiste | `4325–4730` | `405 px` | `0.45 vh` |

Die Höhen sind nicht gleichmäßig. Der Hero und die erste dunkle Editorial-Section dominieren; alle nachfolgenden Sections sind deutlich kompakter. Diese Abstufung ist wesentlich für die Ähnlichkeit.

### Formhierarchie

- Hero: extrem große untere Ecken, ungefähr **150–175 px Radius**.
- Große dunkle Showcase-Flächen: **64–72 px Radius**.
- Footer oben: ungefähr **130–150 px Radius**.
- Große Visuals: **38–48 px Radius**.
- Service- und Process-Cards: **24–32 px Radius**.
- Navigation, Buttons, Inputs: vollständige Pillen.
- Nicht global einen einheitlichen Radius verwenden.

### Hell-/Dunkel-Rhythmus

1. heller Hero auf dunklem braun-schwarzem Seitenuntergrund
2. große dunkle Editorial-Fläche
3. helle Services-Collage
4. kompakte dunkle Execution-Fläche
5. großzügige helle Kontaktfläche
6. dunkle Process-Fläche
7. heller Footer innerhalb des dunklen Untergrunds

## 2. Farbe, Licht und Oberflächen

### Beobachtete Palette

- Paper / Hauptfläche: überwiegend `#F9F9F9`, mit Varianten zwischen `#F7F7F7` und `#FEFEFC`.
- Ink: `#1F1F1F` bis `#232323`.
- Dark Surface: überwiegend `#222222` / `#232323`.
- Orange: im Rasterbild häufig `#FF4400`; zulässiger CODE²-Zielbereich `#FF4400–#FF4B0B`.
- Warm brown glow: ungefähr `#4D291C` bis `#622D1B`, stets weich und entsättigt.
- Card gray: `#545454–#77706D`, je nach Overlay und Verlauf.
- Hairline / Separator hell: `rgba(255,255,255,.65)`.

### Atmosphärische Verläufe

- Dunkle Bereiche sind nicht flach schwarz. Basis ist `#222`, ergänzt durch große, unscharfe braun-orange Radialverläufe.
- Beim ersten Dark Project liegt Wärme vor allem links oben/hinter der Rail; Mitte und rechter unterer Bereich bleiben fast neutral dunkel.
- Execution und Process tragen den warmen Glow eher rechts.
- Glows dürfen keine klaren Kanten besitzen und sollen grob **35–55 %** der Sectionbreite einnehmen.

### Schatten

- Große dunkle Sections: weicher Drop-Shadow unter der unteren Rundung, etwa `0 24px 36px rgba(0,0,0,.18)`.
- CTA-Gruppen: kompakter, deutlich sichtbarer Schatten, etwa `0 14px 24px rgba(0,0,0,.20)` plus helle Außenkante.
- Floating Cards: diffuser Schatten **20–35 px Blur**, geringe Deckkraft.
- Kein dominantes Glas-/Neonleuchten.

## 3. Typografisches System

Die UI-Typografie ist eine neutrale Grotesk mit hoher x-Höhe und relativ breiten Buchstaben. DM Sans ist geometrisch ausreichend nah. Der Kontrast entsteht durch Größe, Gewicht und Orange-Italic, nicht durch viele Schriftfamilien.

| Verwendung | Desktopgröße | Line-height | Gewicht / Stil | Tracking |
|---|---:|---:|---|---:|
| Hero Headline | `72–78 px` | `0.94–1.00` | 400; Keyword 750–800 italic | `-0.035em` |
| Große Section-Headline | `56–62 px` | `0.94–1.00` | 400; Keyword 750–800 italic | `-0.03em` |
| Services / Contact Headline | `56–60 px` | `0.98–1.02` | 400; Keyword bold italic | `-0.03em` |
| Body groß | `18–20 px` | `1.18–1.30` | 400, Lead-in 700 | `-0.015em` |
| Body normal | `15–17 px` | `1.20–1.35` | 400 | `-0.01em` |
| Microcopy | `12–14 px` | `1.16–1.30` | 400 | `-0.01em` |
| Cardtitel | `22–25 px` | `1.0–1.08` | 700 | `-0.025em` |
| Nav | `16–18 px` | `1` | 400 | `0` |
| Button | `16–18 px` | `1` | 600–700 | `-0.015em` |

Wichtige Regeln:

- Headline-Zeilen sind eng gesetzt; zwischen zwei Zeilen entsteht kein normaler Absatzabstand.
- Das orange Keyword ist nahezu immer **bold italic** und sitzt in derselben Zeile bzw. direkt im Zeilenumbruch.
- Nicht jede Headline wird identisch gebrochen. Der Zeilenbruch folgt der verfügbaren Kompositionsbreite.
- Poster-Typografie innerhalb von Bildassets darf kontrastierende Display-/Serif-Schriften verwenden; das ist keine zweite UI-Schrift.

## 4. Navigation

### Position und Maße

- Außenmaß ungefähr `x = 120–1320`, `y = 51–103`.
- Breite **1200 px**, Höhe **52 px**, Radius **26 px**.
- Abstand zum oberen Rand **50–52 px**.
- Schwarze Oberfläche `#222`; sehr feiner Shadow, keine transparente Glasscheibe.

### Layout

- Das Logo liegt optisch exakt im Mittelpunkt bei `x ≈ 720`.
- Zwei Navigationsziele links, zwei rechts; die Verteilung ist breit und nutzt fast die ganze Pillenbreite.
- Innenpadding links/rechts ungefähr **32 px**.
- Navigationsschrift rund **17 px**, weiß mit leicht reduzierter Deckkraft.
- Unter dem zentrierten Logo liegt ein kurzer orangefarbener Aktivstrich, etwa **60–65 px breit** und **3 px hoch**.

### Verhalten

- Die Navigation ist in den Hero integriert und nicht als separates großes Headerband wahrnehmbar.
- Hover darf nur Kontrast bzw. den kurzen Unterstrich verändern; keine wachsenden Cards.

### Mobile-Ableitung

- Eine kompakte Pill mit CODE² Logo links und Burger rechts.
- Horizontaler Seitenabstand **16 px**, Höhe **52–56 px**.
- Menü als dunkles Dropdown/Overlay mit mindestens **44 px** hohen Touch-Flächen.
- Die visuelle Mitte des Logos ist wichtiger als symmetrisch gleich breite linke/rechte Controls.

## 5. Hero — P0

### Section Shape und Hintergrund

- Helle Fläche ungefähr `x = 17–1423`, `y = 0–834`.
- Unten gerade Mittelkante, aber extrem gerundete untere Ecken; die Kurve beginnt ungefähr bei `y = 655–675`.
- Unter dem Hero bleibt der dunkelbraun-schwarze Seitenuntergrund sichtbar.
- Feines 120-px-Raster auf Paper.

### Headline

- Bounding Box ungefähr `x = 369–1072`, `y = 152–306`.
- Nimmt rund **59 %** der 1200-px-Contentbreite ein.
- Zweizeilig und zentriert.
- Erste Zeile länger, zweite Zeile kürzer.
- Visuelle Schriftgröße ca. **74 px**, Line-height knapp unter 1.
- Orange Keyword nimmt ungefähr das letzte Drittel der zweiten Zeile ein.

### Doodles an der Headline

- Linker Stern/Asterisk: ungefähr `x = 294–357`, `y = 205–275`, ca. **62 × 70 px**.
- Rechter Pfeil: beginnt knapp rechts unter dem Keyword und zieht als organische Kurve nach rechts unten; ungefähr **110 × 78 px**.
- Strichstärke **7–9 px**, abgerundete Enden, ungleichmäßig. Nicht durch sterile Icon-Symbole ersetzen.

### Linker Microcopy-Block

- Position ungefähr `x = 120–380`, `y = 418–555`.
- Textbreite **255–270 px**; 5–6 kurze Zeilen.
- Schrift **13–14 px**, Line-height etwa `1.18`.
- Kleine Outline-Pill darunter: ca. **162 × 38 px**, 1-px-Ink-Border, transparenter/heller Hintergrund.
- Der Block sitzt deutlich links vom Portrait und unterhalb der Headline, nicht an der oberen Headlinekante.

### Zentralportrait

- Portraitkopf beginnt ungefähr bei `y = 355`.
- Sichtbare Personenbox etwa `x = 535–908`, `y = 355–834`; sichtbare Breite rund **375 px**.
- Die Person belegt **31 %** der 1200-px-Contentbreite und ist das unmissverständliche Zentrum.
- Freigestellt, schwarzweiß, kontrastreich, frontal; unterhalb des Hero-Endes hart durch Section-Clip abgeschnitten.
- Dahinter ein neutralgrauer Halo/Kreis mit ungefähr `x = 402–1038`, Durchmesser **620–640 px**; am unteren Rand ebenfalls geclippt.
- Das Bild ist kein Rechteck und erhält keinen eigenen Card-Radius.
- Kopf und Haare müssen sich klar vom Halo abheben; Schultern/Arme bilden unten die breite Basis.

### CTA auf dem Portrait

- Zentrierte Doppel-Pill ungefähr `x = 555–890`, `y = 718–768`.
- Gesamtabmessung **335 × 50 px**.
- Sie liegt auf Unterarmen/Brustbereich, nicht unter dem Bild.
- Linke Hälfte orange, rechte halbtransparent grau; innen weiße 1-px-Kontur, außen graue 3–4-px-Fassung.
- Buttons rund **156 × 38 px**, Schrift **17 px / 700**.

### Rechter Trust-Block

- Zentriert um `x ≈ 1215`, `y ≈ 520`.
- Fünf kleine orange Sterne oder ein inhaltlich ehrlicher CODE²-Ersatz in einer Zeile.
- Hauptzeile ungefähr **40 px / 700**, Subline **23–25 px**.
- Gesamtbreite etwa **190 px**.
- Er darf keine erfundene Bewertung oder Erfahrung behaupten.

### Balance

- Hero folgt einer Dreiecks-Komposition: große Headline oben, Portraitspitze in der Mitte, Microcopy links und Trust rechts als Gegengewichte.
- Der Mittelbereich ist absichtlich nicht in drei gleich breite Cards geteilt.

### Transition

- Der helle Hero endet bei ca. `y = 834`; Portrait und Halo werden an derselben Kante geclippt.
- Darunter entsteht **64–66 px** freie dunkle Fläche bis zur Rail.
- Der starke Radius und der folgende schwebende Rail erzeugen die Transition; keine zusätzliche Trennlinie.

## 6. Floating Service Rail

### Geometrie

- Position ungefähr `x = 120–1320`, `y = 898–1029`.
- Breite **1200 px**, Höhe **130–132 px**, Radius **30–32 px**.
- Vier gleich breite Zonen von rund **300 px**.
- Vertikale Separatoren bei ungefähr `x = 410, 721, 1035`; Höhe **90–92 px**, mittig ausgerichtet.

### Oberfläche

- Graubraune, leicht transparente Fläche mit Verlauf: links wärmer, rechts neutralgrau.
- 1-px helle Border, diffuses dunkles Shadow.
- Kein starker Blur und keine glänzende Glasoptik.

### Inhalt

- Pro Feld: große kurze Nummer/Indexzeile oben und kleinere Bezeichnung direkt darunter.
- Große Zeile rund **34–36 px / 700**, kleine Zeile **18–20 px**.
- Orange nur als kleines Suffix bzw. Markierung.
- CODE²-Adaption verwendet Service-Indizes + echte Service-Namen, keine erfundenen Statistiken.

### Überlappung

- Die Rail liegt vollständig innerhalb der dunklen Fläche, wirkt aber als Brücke vom Hero zur Project-Section.
- Zwischen Hero-Ende und Railoberkante etwa **64 px**, danach bis Project-Headline etwa **110 px**.

### Mobile-Ableitung

- Als 2 × 2 Grid oder horizontal scrollbare Rail; keine vier gequetschten Desktopspalten.
- Separatoren der neuen Anordnung anpassen.
- Höhe etwa **150–180 px** als 2 × 2 Variante; Außenabstand **16 px**.

## 7. Dark Project / Editorial Section — P0

### Sectionrahmen

- Gesamtbereich ungefähr `y = 834–1914`, effektiv **1080 px** hoch.
- Volle Breite; untere Ecken **68–72 px** Radius.
- Hintergrundbasis `#222` mit warmbraunem Glow links oben und sehr subtilem Dark Grid.
- Unter dem unteren Radius liegt ein breiter diffuser Schatten.

### Editorial Header

- Linke Headline ungefähr `x = 120–515`, `y = 1138–1243`.
- Zwei Zeilen, Schrift **58–62 px**, sehr enge Line-height.
- Orange Keyword auf der zweiten Zeile.
- Rechter Absatz ungefähr `x = 648–1285`, `y = 1147–1235`, Breite **600–640 px**.
- Body **18–20 px**, erste Phrase fett.
- Spaltenverhältnis effektiv ungefähr **5 : 7**; kein zentrierter Fullwidth-Text.

### Hauptvisual links

- Box ungefähr `x = 120–807`, `y = 1282–1763`.
- Größe **687 × 481 px**, Verhältnis **1.43 : 1**.
- Radius **40–44 px**.
- Crop füllt die Box vollständig; Motivzentrum leicht links/zentral.
- Behandlung: fast vollständig schwarzweiß, ein massiver orange-roter Fokus im zentralen Gesicht/Motiv.
- Das Bild besitzt eigene Collage-Typografie/Textur und wirkt wie ein Editorial Cover, nicht wie ein Website-Screenshot.

### Nebenvisual rechts

- Box ungefähr `x = 840–1320`, `y = 1234–1797`.
- Größe **480 × 563 px**, Verhältnis **0.85 : 1**.
- Radius **42–46 px**.
- Beginnt etwa **48 px oberhalb** des linken Visuals und endet etwa **34 px darunter**.
- Hoher heller Negativraum, große orange Displayheadline, kleine freigestellte schwarzweiße Person, orange/schwarzes Objekt am unteren Rand.

### Asymmetrie und Doodle

- Horizontaler Gap zwischen Visuals nur ungefähr **33 px**.
- Ein orangefarbenes Stern-/Sunburst-Doodle ragt links hinter das Hauptvisual; sichtbarer Teil etwa `x = 79–130`, `y = 1250–1335`.
- Das Doodle sitzt hinter der Bildkante und wird teilweise verdeckt.

### Innenraum und Abschluss

- Nach dem unteren Bildende bleiben rund **115 px** bis zum Sectionende.
- Keine Projektcard-Titelzeilen, Badges oder gleichförmige Metadaten unter den Bildern.
- Carousel-Funktion darf vorhanden sein, die sichtbare Grundkomposition bleibt jedoch **ein großes Querformat + ein kleineres Hochformat**.

### Mobile-Ableitung

- Headline vor Absatz; Absatzbreite auf ca. **32–36 Zeichen** begrenzen.
- Visuals neu komponieren: großes Querformat zuerst, Poster danach entweder 70–82 % breit und nach rechts versetzt oder kontrolliert überlappend.
- Unterschiedliche Größen beibehalten; nicht zwei gleich große Cards stapeln.
- Doodle kleiner und weiter außen; kein horizontales Overflow.

## 8. Services / What We Do

### Sectionrahmen

- Heller Bereich ungefähr `y = 1914–2512`, Höhe **598 px**.
- Paper ohne eigene gerundete Außenbox.
- Feines Raster möglich, aber schwächer als im Hero.
- Inhalt nutzt `x = 90–1320`; linke Collage darf die normale 120-px-Kante leicht überschreiten.

### Linke Collage

- Belegt ungefähr **65 %** der Contentbreite, `x ≈ 90–880`.
- Freigestellte schwarzweiße Person im Mittelpunkt; grobe sichtbare Box `x = 200–760`, `y = 2070–2515`.
- Person kippt/öffnet die Körperhaltung diagonal und überlappt den Beginn der nachfolgenden dunklen Section um wenige Pixel.
- Große handgezeichnete Flügel bzw. Linienillustration hinter der Person, schwarz und orange alternierend.
- Flügel beginnen schon knapp oberhalb der Servicecards bei `y ≈ 1915` und reichen breit bis etwa `x = 90–885`.
- Kleines oranges Halo-Scribble über/um den Kopf.

### Floating Service Cards

- Vier Cards in lockerem 2 × 2 Muster, nicht exakt symmetrisch.
- Ungefähre Positionen:
  - oben links `x = 120–440`, `y = 2025–2157`
  - oben rechts `x = 562–882`, `y = 2025–2157`
  - unten links `x = 120–440`, `y = 2275–2410`
  - unten rechts `x = 560–880`, `y = 2275–2410`
- Cardmaß ungefähr **320 × 132 px**, Radius **26–30 px**.
- Halbtransparente warmgraue Fläche mit weichem Verlauf und Schatten.
- Pro Card: Icon links rund **55–65 px**, Textbereich rechts; Titel **23–25 px / 700**, Beschreibung **14–16 px**.
- Cards verdecken Person und Flügel teilweise; Person liegt bei einzelnen Bereichen wiederum vor der Card. Diese wechselnde Z-Reihenfolge erzeugt die Collage.

### Rechter Textblock

- Ungefähr `x = 960–1310`, `y = 2028–2365`, Breite **350 px**.
- Headline zweizeilig, **56–60 px**, Keyword orange bold italic.
- Body folgt mit ca. **34–40 px Abstand**, **17–19 px**, Lead-in fett.
- Doppel-CTA ungefähr `x = 960–1295`, `y = 2315–2365`, also gleiche Grundform wie im Hero, aber nicht größer.

### Transition zur Execution-Section

- Die dunkle Section beginnt bei `y ≈ 2512` mit großen oberen Ecken.
- Person/Flügel dürfen diese Kante sichtbar berühren oder leicht überlagern.
- Kein großer Leerraum zwischen Collage und Dunkelfläche.

### Mobile-Ableitung

- Textblock vor oder unmittelbar nach einer vereinfachten Portraitcollage.
- Maximal zwei Cards gleichzeitig über dem Portrait; weitere Services in klarer 2 × 2 Folge.
- Flügel stark reduzieren, Portrait als Hauptmotiv erhalten.
- Cards etwa **calc(50% - 6px)** oder bewusst einspaltig, niemals vier winzige Desktopkarten.

## 9. Dark Execution Showcase — P0

### Sectionrahmen

- Ungefähr `x = 0–1440`, `y = 2512–3104`.
- Höhe **592 px**, obere und untere Radien **66–72 px**.
- Dark Grid mit 120-px-Zellen.
- Basis `#222`; warmer brauner Glow vor allem rechts oben/rechts außen.
- Weicher Shadow unter dem Sectionabschluss.

### Linker Copyblock

- Ungefähr `x = 120–560`, `y = 2695–2925`.
- Headline **55–60 px**, zwei Zeilen, orange Keyword auf Zeile zwei.
- Body ungefähr `x = 120–515`, `y = 2830–2915`, Breite **390–410 px**, Schrift **16–18 px**.
- Letzte kurze Aussage fett gesetzt.
- Text sitzt vertikal ungefähr mittig, nicht am Sectionanfang.

### Rechter Visual Cluster

- Gesamtbox ungefähr `x = 715–1320`, `y = 2605–3028`.
- Drei klar unterschiedliche Ebenen:
  1. linkes Hintergrundvisual ca. **250 × 300 px**, unscharf/entsättigt
  2. zentrales Vordergrundposter bzw. Phone ca. **280 × 390 px**, scharf und dominant
  3. rechtes Hintergrundvisual ca. **210 × 255 px**, dunkel, teilweise verdeckt
- Vordergrundelement überdeckt beide seitlichen Visuals und sitzt ungefähr **80–110 px** höher als deren Unterkanten.
- Nur das Zentrum trägt starkes Orange; Seitenbilder sind schwarzweiß bzw. stark gedämpft.
- Layering über `z-index`, Scale, Schatten und teilweise Blur; nicht drei gleiche Phones nebeneinander.
- Kleine Carousel-Dots direkt unter dem Cluster, ungefähr `y = 3010`; aktiver Dot orange, andere grau.

### Mobile-Ableitung

- Copyblock zuerst, Cluster darunter.
- Zentralmotiv etwa **58–66 vw** breit; Seitenmotive schauen nur teilweise dahinter hervor.
- Gesamthöhe so wählen, dass der Cluster nicht auf drei gleich breite Miniaturen schrumpft.

## 10. Contact CTA

### Sectionrahmen

- Heller Bereich ungefähr `y = 3104–3834`, Höhe **730 px**.
- Großzügiger Weißraum; kein eigener Card-Rahmen.
- Inhalt wirkt wie eine ruhige Pause zwischen zwei dunklen Sections.

### Linkes Portrait

- Halo/Kreis ungefähr `x = 120–585`, `y = 3275–3705`, Durchmesser **430–465 px**.
- Freigestellte schwarzweiße Person ungefähr `x = 165–545`, `y = 3255–3700`.
- Kopf blickt/zeigt diagonal nach rechts zum Copyblock.
- Portrait wird am unteren Halo-Kreis kontrolliert maskiert; Arme dürfen den Kreis optisch füllen.

### Doodle-Verbindung

- Orange Sternform ungefähr `x = 520–620`, `y = 3305–3400`.
- Geschwungener Pfeil führt nach rechts unten zum Headlineblock, Gesamtausdehnung rund **205 × 120 px**.
- Das Doodle besetzt bewusst den negativen Raum zwischen Person und Headline.

### Rechter Copy-/Formblock

- Position ungefähr `x = 775–1300`, `y = 3320–3575`.
- Headline **57–61 px**, zwei Zeilen; orange Keyword auf Zeile zwei.
- Bodybreite **500–520 px**, Schrift **17–19 px**.
- Input ungefähr **480–500 × 38 px**, sehr hellgrau, volle Pill, kein sichtbarer harter Rahmen.
- CTA darunter linksbündig, ungefähr **160 × 44 px**, orange Pill mit grauer Außenfassung und deutlichem Shadow.
- Vertikaler Abstand Body → Input rund **55–65 px**, Input → CTA rund **25–30 px**.

### Funktionsregel für CODE²

- Ohne Backend nur `mailto:` oder klar deklarierter Kontaktweg.
- Keine vorgetäuschte Erfolgsmeldung.

### Mobile-Ableitung

- Portrait und Doodle oberhalb des Textes oder als kompakte linke Hälfte einer 2-Spalten-Tabletansicht.
- Input und CTA auf Mobile volle sinnvolle Breite; Touchhöhe mindestens **44 px**.
- Doodle darf reduziert werden, muss aber die Blickrichtung Portrait → Headline weiterführen.

## 11. Process / Method Cards

### Sectionrahmen

- Dunkler Bereich beginnt ungefähr bei `y = 3834`.
- Oberer Radius **66–72 px**.
- Footer liegt ab etwa `y = 4325` als helle Form innerhalb desselben dunklen Hintergrundraums.
- Process-Nutzfläche bis Footer: rund **490 px**.
- Dark Surface mit warmem Glow rechts und sehr subtilem Grid.

### Vier Cards

- Gemeinsame horizontale Zone ungefähr `x = 120–1320`.
- Cardbreite etwa **255 px**, normaler Gap **55–60 px**.
- Normale Cards ungefähr `y = 3940–4210`, **255 × 270 px**.
- Aktive zweite Card ungefähr `y = 3918–4230`, also rund **20–25 px höher** und **40 px höher insgesamt**.
- Radius **25–30 px**.
- Drei Karten dunkelgrau/warmgrau; aktive Karte kräftig orange.
- Jede Karte enthält ein großflächiges, hochwertiges visuelles Objekt, das rund **65–75 %** der Kartenhöhe belegt.
- Motive werden am Kartenrand gecroppt; kein kleines Icon in leerer Standardcard.

### Beschriftungs-Overlay

- Unten auf jeder Karte eine halbtransparente graue Pill/Platte, Höhe etwa **70–78 px**.
- Icon links, dünner vertikaler Separator, zweizeiliger Titel rechts.
- Titel ca. **18–21 px / 700**, weiß.
- Overlay darf minimal über den Kartenrand hinauswirken und besitzt eigenen weichen Shadow.

### Progress Indicator

- Horizontale 1–2-px-Linie ungefähr `x = 120–1320`, `y = 4275`.
- Kurzer orangefarbener aktiver Abschnitt **55–60 px** breit, leicht dicker und mit Pill-Enden.
- Aktiver Abschnitt sitzt nicht ganz links, sondern ungefähr unter dem Zwischenraum zwischen erster und zweiter Card.

### Mobile-Ableitung

- Horizontaler Snap-Scroller ist der Referenzlogik am nächsten: eine große aktive Card plus angeschnittene nächste Card.
- Alternativ 2 × 2, wenn alle Motive stark genug bleiben; keine vier Mini-Karten in einer Reihe.
- Progress-Indikator bleibt sichtbar und folgt dem aktiven Element.

## 12. Footer

### Außenform

- Beginnt ungefähr bei `y = 4325`.
- Helle Fläche von `x ≈ 17–1423` bis `y ≈ 4657`.
- Oberer Radius **130–150 px**; untere Kante gerade.
- Dunkler Process-Hintergrund bleibt links/rechts als schmaler Rahmen sichtbar.
- Feines 120-px-Grid auf Paper.

### Inhaltslayout

- Innenbereich ungefähr `x = 150–1290`, `y = 4405–4625`.
- Vier funktionale Zonen mit asymmetrischen Breiten:
  1. Marke / Kurzbeschreibung: ca. **360 px**
  2. Navigation: ca. **180 px**
  3. weitere Links: ca. **170 px**
  4. Social / Kontakt: ca. **320 px**
- Großes Logo links oben; Referenzbreite rund **260–285 px**, deutlich größer als Nav-Logo.
- Kleine Standort-/Beschreibungseinheit links unten mit orangefarbenem Kreisicon.
- Spaltenüberschriften **15–17 px / 700**, Linktext **16–18 px**, Zeilenabstand **28–32 px**.
- Rechts oben kleine echte Social-Icons in einer Zeile; darunter Kontaktzeilen mit orangefarbenen Kreisicons.
- Nur vorhandene CODE²-Kontaktdaten und Social-Links einsetzen; fehlende Werte als TODO behandeln.

### Orange Abschlussleiste

- Ungefähr `y = 4657–4730`, Höhe **73 px**.
- Vollbreit, kräftiges Orange.
- Copyrighttext mittig, weiß, ca. **14–16 px**.
- Die Leiste schließt die gesamte Seite ohne unteren Radius ab.

### Mobile-Ableitung

- Großer oberer Radius auf **56–72 px** reduzieren.
- Marke zuerst, danach Links in 2 Spalten, Kontakt zuletzt.
- Abschlussleiste darf höher werden, wenn Copyright umbricht; Text muss zentriert und lesbar bleiben.

## 13. Doodles und Editorial Details

- Insgesamt vier zentrale Doodle-Zonen: Hero links, Hero rechts, Project links hinter Bild, Services am Portrait sowie Contact zwischen Portrait und Copy.
- Farbe immer identisches Akzentorange.
- Strichstärke auf 1440 px meist **7–10 px**, mit runden Caps/Joins.
- Formen leicht unregelmäßig, jedoch klar geführt: Doodles verbinden oder betonen, sie füllen nicht zufällig Leerraum.
- Doodles liegen teilweise hinter Bildern und teilweise darüber. Die Z-Reihenfolge muss pro Section bewusst gesetzt werden.
- Auf Mobile pro Section höchstens ein dominantes Doodle; Skalierung ungefähr **55–70 %** der Desktopform.

## 14. Bildbehandlung und Crops

### Personen

- Immer freigestellt; nie als normales rechteckiges Foto.
- Schwarzweiß, erhöhter lokaler Kontrast, neutrale Hauttöne in Grau.
- Hero: frontal, symmetrisch, Kopf frei, Unterkörper am Sectionende geclippt.
- Services: dynamische diagonale Pose; Person verschränkt sich mit Cards und Illustration.
- Contact: Blick-/Zeigerichtung führt sichtbar zum Textblock.

### Projekte / Poster

- Kein Raster aus identischen 16:9-Screenshots.
- Project-Section: ein breites stark gecropptes Editorialmotiv plus ein schmales Hochformat.
- Execution: drei überlagerte Ebenen mit einem dominanten Hochformat im Vordergrund.
- Orange selektiv als Spot Color; große Teile bleiben monochrom.
- Seitenmotive dürfen leicht unscharf oder kontrastärmer sein, das Hauptmotiv bleibt scharf.

### Technische Zielwerte

- `object-fit: cover` für Cardvisuals, aber pro Asset bewusstes `object-position` festlegen.
- Personen bevorzugt als transparentes PNG/WebP/AVIF.
- Große Projektvisuals mindestens in ungefähr doppelter CSS-Auflösung bereitstellen.
- Schatten und Masken über CSS; keine Schatten in jedes Rasterasset einbacken, sofern nicht Teil des Posterdesigns.

## 15. Responsive Leitplanken

Die Desktopreferenz darf auf Mobile nicht bloß gestapelt werden.

### 1024 px

- Contentbreite etwa `calc(100% - 96px)`, Außenpadding **48 px**.
- 120-px-Raster kann beibehalten werden, aber mit geringerer Deckkraft.
- Heroheadline **58–64 px**; Portrait mindestens **330 px** breit.
- Große Visual-Proportionen beibehalten; rechter Project-Poster darf auf **38–40 %** schrumpfen.

### 768 px

- Außenpadding **28–32 px**.
- Heroheadline **48–54 px**.
- Hero-Seiteninfos unter Headline links/rechts anordnen, Portrait weiterhin zentral und dominant.
- Services in Copy + Collage untereinander, nicht in eine schmale Desktop-Zweispalte pressen.
- Execution-Cluster unter Copyblock.

### 430 / 375 px

- Außenpadding **16–20 px**.
- Heroheadline ungefähr **38–44 px** bei 430 und **34–40 px** bei 375; feste sinnvolle Breaks.
- Portrait **76–90 vw** inklusive Halo, CTA auf dem unteren Portraitbereich.
- Hero-Microcopy und Trust nacheinander, ohne das Portrait auf eine Nebenrolle zu verkleinern.
- Projectvisuals asymmetrisch stapeln; Poster schmaler und nach rechts versetzt.
- Servicecards und Processcards als gestaltete Mobile-Komposition bzw. Snap-Scroller.
- Kein horizontales Overflow durch Doodles, Schatten oder überstehende Portraitteile.
- Buttons mindestens **44 px** hoch; Text nie unter **14 px**, Microcopy nie unter **12 px**.

## 16. Verbindliche visuelle Prioritäten

### P0 — muss vor jeder Detailpolitur stimmen

1. **Herohöhe, großer unterer Radius und zentrales Portrait**: Portrait darf weder klein noch wie eine normale Bildcard wirken.
2. **1200-px-Contentachse und 120-px-Grundraster**: Nav, Rail, Headlines und Hauptvisuals müssen dieselben vertikalen Leitlinien teilen.
3. **Sectionhöhen und Hell-/Dunkel-Rhythmus**: besonders Project nicht unnötig verlängern; Services und Execution bewusst kompakt halten.
4. **Project-Komposition**: ein großes Querformat links und ein höher startendes Hochformat rechts, keine klassische Portfolio-Gallery.
5. **Services-Collage**: freigestellte Person + Illustrationsmotiv + vier überlagernde Cards mit wechselnder Z-Reihenfolge.
6. **Execution-Cluster**: ein dominantes Vordergrundmotiv plus zwei ungleich große Hintergrundebenen, keine identischen Devices.
7. **Transitions**: Hero-Radius → Rail → Dark Project; Person/Illustration → Dark Execution; Dark Process → großer heller Footer-Radius.
8. **Processmotive**: bildstarke Cards mit großem Motiv und unterem Label-Overlay, nicht reine Icon-Cards.
9. **Footerform und -gliederung**: großer heller Bogen, vier Zonen, orange Vollbreiten-Abschluss.

### P1 — prägt die Art Direction

1. Orange bold-italic Keywords mit engen Zeilenhöhen.
2. Selektive Orange-Spot-Color in monochromen Bildwelten.
3. Warme braune Glows in dunklen Sections.
4. Organische Scribbles an den kompositorisch richtigen Stellen.
5. Unterschiedliche Radien je Hierarchieebene.
6. Schatten weich und tief, nicht glasig oder neonartig.

### P2 — Finish

1. Exakte Doodle-Strichstärken und kleine Positionskorrekturen.
2. Aktivstrich unter dem Nav-Logo.
3. Carousel-Dot- und Progress-Line-Maße.
4. Microcopy-Tracking, Iconabstände und Footer-Zeilenraster.

## 17. Desktop-Abnahmekriterien bei 1440 px

- Hero endet innerhalb `y = 826–842`.
- Nav liegt innerhalb `x = 116–124` / `y = 47–55`, Breite `1192–1208 px`.
- Heroheadline belegt ca. **55–62 %** der Contentbreite.
- Portraitbreite liegt ungefähr zwischen **360 und 410 px**, Halo zwischen **600 und 650 px**.
- Rail ist `1192–1208 px` breit und `124–136 px` hoch.
- Dark Project endet innerhalb `y = 1900–1925`.
- Linkes und rechtes Projectvisual haben sichtbar verschiedene Seitenverhältnisse; rechtes Visual startet **40–60 px** höher.
- Services endet innerhalb `y = 2495–2525`.
- Execution endet innerhalb `y = 3088–3118`.
- Contact endet innerhalb `y = 3818–3850`.
- Footerbogen beginnt innerhalb `y = 4310–4340`; orange Abschlussleiste ist **65–78 px** hoch.
- Kein Element erzeugt horizontales Overflow.
- Im direkten Vergleich sind Komposition und visuelle DNA ohne Erklärung erkennbar.

## 18. Nicht aus der Referenz übernehmen

- D-Tribe-Logo oder Markenname
- gezeigte Personen
- Texte und Claims
- Statistiken, Sternebewertung und Erfahrungsjahre
- Adresse, Telefonnummern, E-Mail, Social Accounts
- fremde Illustrationen, Poster oder 3D-Objekte als 1:1-Assets

Zu übernehmen bzw. auf CODE² zu adaptieren sind ausschließlich Layoutlogik, Größenverhältnisse, visuelle Hierarchie, Bildbehandlung, Hell-/Dunkel-Rhythmus, Doodle-Sprache und Editorial-Komposition.
