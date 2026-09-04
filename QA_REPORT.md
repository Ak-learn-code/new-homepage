# CODE² – QA Report

Stand: 4. September 2026

## Ergebnis

Der Neuaufbau erreicht die gewünschte Editorial-Komposition ohne offene P0-Fehler. Die 1440-px-Fassung ist 4.750 px hoch (Referenz: 4.730 px), nutzt ein 120-px-Raster und folgt derselben Abfolge aus hellem Hero, dunklem Projektblock, heller Leistungs-Collage, dunklem Showcase, hellem Kontaktbereich, dunklem Prozess und hellem Bogen-Footer.

## Visual-QA

| Kategorie | Wertung |
| --- | ---: |
| Aufbau und Abschnittsrhythmus | 9.3 / 10 |
| Hero-Komposition | 9.0 / 10 |
| Projekt-Collage | 9.1 / 10 |
| Leistungen / Personen-Collage | 8.8 / 10 |
| Execution-Showcase | 9.0 / 10 |
| Kontakt und Prozess | 8.7 / 10 |
| Typografie | 8.7 / 10 |
| Farbe, Raster und Radien | 9.2 / 10 |
| Responsive Verhalten | 8.8 / 10 |
| Inhaltliche Glaubwürdigkeit | 9.4 / 10 |

Durchschnitt: **9.0 / 10**

## Viewport-Prüfung

Geprüft wurden 1440, 1280, 1024, 768, 430 und 375 px. Für 1440 und 430 px erfolgte zusätzlich eine Browser-DOM-Messung; die übrigen Größen wurden mit vollständigen Headless-Chrome-Screenshots geprüft.

- Kein horizontales Seiten-Overflow bei 1440 und 430 px.
- Keine abgeschnittenen Kerninhalte in den vollständigen Screenshots.
- Desktop-Navigation wechselt unter 820 px in ein touchfreundliches Menü.
- 768 px verwendet eine eigene Hero-Komposition; Textblöcke liegen nicht mehr außerhalb des sichtbaren Bereichs.
- 430 und 375 px stapeln Projects, Services, Execution, Contact, Process und Footer eigenständig.

## Funktion und Zugänglichkeit

- Produktions-Build erfolgreich.
- Carousel wechselt zwischen realen Projekten.
- Formular zeigt bewusst keinen falschen Versand-Erfolg, sondern den noch fehlenden bestätigten Empfänger.
- Alle internen Anker zeigen auf vorhandene IDs.
- Genau eine H1, keine doppelten IDs, keine Bilder ohne `alt`-Attribut und keine unbeschrifteten Buttons.
- Keine Fehler oder Warnungen der Anwendung in der Browserkonsole.
- Fokusmarkierungen, Mindesthöhe von 44 px für zentrale Controls und `prefers-reduced-motion` sind vorhanden.

## Offener Produktpunkt

Das Kontaktformular versendet absichtlich noch keine Nachricht, weil aus der bestehenden Website keine bestätigte geschäftliche Zieladresse oder ein Formular-Endpunkt übernommen werden konnte. Im Code ist der Anschluss eindeutig als TODO markiert; bis dahin kommuniziert die Oberfläche diesen Zustand transparent.

## Assets

Die zwei fehlerhaften Editorial-Porträts mit eingebranntem Schachbrett wurden entfernt. Hero, Leistungen und Kontakt verwenden die vorhandenen Personenbilder mit freigestelltem Hintergrund. Projektbilder stammen aus dem bestehenden CODE²-Auftritt.
