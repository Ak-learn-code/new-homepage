# CODE² Final Rebuild — Implementation Plan

Stand: 4. September 2026  
Basis: `REFERENCE_SPEC.md`, `VISUAL_GAP_REPORT.md`, `ART_DIRECTION.md`, Referenz 1440 × 4730 px

## Ziel und Abnahmeschwelle

Die vorhandene React/Vite-Seite wird sectionweise in die Komposition der Referenz überführt. CODE²-Inhalte, Personen und echte Projekte bleiben erhalten. Die 1440-px-Version ist die visuelle Source of Truth; danach folgen gezielte Tablet- und Mobile-Kompositionen. Abnahme erst bei mindestens 8,5/10 und ohne offene P0-Abweichung.

## P0 — Visuelle Kernkorrekturen

1. **Portraits und Hero**
   - RGB-Editorial-Dateien mit eingebranntem Schachbrett nicht mehr verwenden.
   - Echte Alpha-Originale einsetzen, per CSS hochwertig monochrom behandeln.
   - Hero auf 834 px halten, 1200-px-Nutzbreite und 120-px-Raster kalibrieren.
   - Alex dominanter, Halo größer, CTA auf dem Portrait; Trustblock ohne Sterne/Ratings.

2. **Floating Service Rail**
   - Nummern `01–04` ohne Pluszeichen.
   - Weniger Glassmorphism, klarere Separatoren und gezielter Hero/Projects-Overlap.

3. **Projects als Editorial-Komposition**
   - Section von 1423 px auf ca. 1100–1180 px reduzieren.
   - Links ca. 687 × 481 px großes Querformat-/Poster-Motiv, rechts ca. 480 × 563 px Hochformat, um rund 48 px vertikal versetzt.
   - Projekt-Screens nur als Material innerhalb von Papier-, Masken-, Typo- und Orange-Layern einsetzen.
   - Carousel beibehalten, aber innerhalb der Collage steuern.

4. **Services-Collage**
   - Zielhöhe ca. 600–640 px.
   - Vier asymmetrische Service-Labels um Alex, inklusive `Interne Tools`.
   - Checkliste entfernen; Copy verdichten; organische SVG-Scribbles statt regelmäßigem Polygon.
   - Portrait darf die folgende dunkle Section optisch berühren.

5. **Execution-Showcase**
   - Drei gleiche Phones durch Browserfragment + zentrales Phone + Poster ersetzen.
   - Verschiedene Seitenverhältnisse, Tiefen, Helligkeiten und Overlaps.
   - Linke Copy auf drei kurze Aussagen reduzieren.

6. **Contact**
   - Bilal-Original mit echtem Alpha verwenden.
   - Copy kürzen, Feld und CTA kompakt halten.
   - Fake-Success entfernen. Bis ein echter Empfänger/Endpoint vorliegt, transparent kennzeichnen, dass nichts versendet wurde.

7. **Process-Motive**
   - Große Line-Icons durch vier individuelle Projekt-/Typografie-/Device-Kompositionen ersetzen.
   - Karte 02 orange hervorheben; Labels am unteren Visualrand; Text auf maximal zwei Zeilen.

8. **Footer**
   - Auf ca. 400–440 px verdichten.
   - Dunkel lesbare CODE²-Wortmarke aus vorhandenem Asset ableiten.
   - Brand, Sitemap/Leistungen und Kontaktzone statt zusätzlicher großer Marketing-CTA.
   - Fehlende echte Kontaktdaten nur als Code-TODO, keine erfundenen Angaben.

## P1 — Responsive, Accessibility und visuelle Konsistenz

1. Separate Layoutregeln für 1920, 1280, 1024, 768, 430 und 375 px.
2. 768 px als eigene Tablet-Komposition statt Desktop-Cliff.
3. 430/375: Projects asymmetrisch statt voll gestapelt, Services-Labels im Zickzack, Execution echte Mobile-Maße statt transformiertem Desktopcluster.
4. Navigation: dynamisches Menülabel, Escape-Schließen, Fokusmanagement und mindestens 44-px-Touchziele.
5. Globale `:focus-visible`-Zustände; korrekte Link-/Button-Semantik.
6. Grid pro Section unterschiedlich subtil; Orange/Brown-Glow nur als atmosphärischer Übergang.
7. Typografie und feste redaktionelle Zeilenumbrüche pro Breakpoint kontrollieren.

## P2 — Performance, SEO und Motion

1. Nicht mehr benötigte mehrmegabytegroße Editorial-RGB-Dateien aus der ausgelieferten Oberfläche entfernen.
2. Below-the-fold-Bilder lazy laden, Maße ergänzen; keine neue UI-Bibliothek.
3. Canonical, Open Graph, Twitter Card, Favicon, `robots.txt` und `sitemap.xml` ergänzen.
4. Motion erst nach statischem Match: kurze `transform`-/`opacity`-Übergänge mit ease-out/ease-in-out; keine Layoutanimation, kein Bounce.
5. `prefers-reduced-motion` ohne Restanimationen berücksichtigen.

## Implementierungsreihenfolge

1. Markup/Assets: Hero, Navigation, Rail.
2. Projects-Editorial und Carousel-State.
3. Services-Collage.
4. Execution-Layercluster.
5. Contact ohne Fake-Success.
6. Process-Motive und Footer.
7. 1440 Visual-QA-Runde 1 und Korrektur.
8. Responsive-Pass 1920/1280/1024/768/430/375.
9. Functional/A11y/Console/Asset/Overflow-QA.
10. SEO/Performance/Motion-Polish.
11. Visual-QA-Runde 2, `QA_REPORT.md`, Build, Commit, Push und Live-Prüfung.

## Verbindliche QA-Matrix

Für 1920, 1440, 1280, 1024, 768, 430 und 375 px werden dokumentiert:

- Viewport und Dokumenthöhe
- Sectionhöhen und Übergänge
- Headlineumbrüche und Typografie
- Portrait-Crops und Collage-Layer
- vollständige Service-/Process-Motive
- kein horizontales Overflow oder verborgenes Clipping
- Navigation, Anchorlinks, Mobile-Menü, Carousel und Kontaktzustand
- Bildladefehler, Console-Warnungen/-Fehler und Build

Der finale 1440-Screenshot wird direkt mit der 1440 × 4730-px-Referenz verglichen. Die Kategorien Layout, Proportionen, Typografie, Spacing, Bildplatzierung, Art Direction, Farbe, Radien, Details und Gesamtähnlichkeit müssen im Mittel mindestens 8,5/10 erreichen; kein sichtbarer P0 darf offen bleiben.
