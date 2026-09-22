# Asset- und Lizenzcheck vor dem Launch

| Bereich | Bestand im Repository | Status | Manuelle Prüfung |
| --- | --- | --- | --- |
| Webfont | `@fontsource-variable/manrope` | THIRD PARTY | Lizenzhinweis des Pakets/der Schrift für den gewünschten Einsatz dokumentieren. |
| UI-Icons | `@phosphor-icons/react` | THIRD PARTY | Paketlizenz und Version im Lockfile prüfen. |
| SideTwo-Logo/Favicon | `public/assets/sidetwo-logo-currentcolor.svg`, `public/favicon.svg` | OWN ASSET (angenommen) | Rechteinhaberschaft intern bestätigen. |
| Projekt- und Editorialbilder | `public/assets/projects`, `editorial`, `services`, `contact`, `people` | NEEDS REVIEW | Für jedes Bild Urheberrecht, Nutzungsumfang und Einwilligung ablegen. |
| Kunden-/Referenzlogos | `public/assets/client-logos` | NEEDS REVIEW | Freigabe zur öffentlichen Nutzung und aktuelle Markenführung bestätigen. |
| Directus-CMS-Bilder | über `directus.sidetwo.de/assets` | NEEDS REVIEW | Uploadrechte, Alt-Texte und mögliche personenbezogene Inhalte prüfen. |
| Referenz-Websites/Screenshots | Verlinkungen und Projektbilder in `src/main.jsx` | NEEDS REVIEW | Kundenfreigabe und Rechte an Screenshots bestätigen. |

Diese Liste ist kein Lizenznachweis. Sie dient als Abnahmeprotokoll vor der Veröffentlichung.
