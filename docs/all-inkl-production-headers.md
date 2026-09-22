# Vorschlag für Security-Header auf dem produktiven ALL-INKL-Host

Diese Datei ist eine **Vorlage** für die produktive Apache-/`.htaccess`-Konfiguration auf `sidetwo.de`. Sie wird nicht vom GitHub-Pages-Workflow ausgeliefert und darf erst nach einem Staging-Test auf dem künftigen Host aktiviert werden.

Die erste CSP-Variante beschreibt den aktuellen Code: lokale Assets und Fonts sowie öffentliche Bild-/Content-Anfragen an `https://directus.sidetwo.de`. Cloudflare Turnstile ist aktuell nicht eingebunden und deshalb bewusst nicht freigegeben.

```apacheconf
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  Header always set X-Frame-Options "DENY"
  Header always set Content-Security-Policy "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self'; style-src 'self'; font-src 'self' data:; img-src 'self' data: https://directus.sidetwo.de; connect-src 'self' https://directus.sidetwo.de; media-src 'self'; manifest-src 'self'"

  # Erst aktivieren, wenn sidetwo.de und alle verwendeten Subdomains dauerhaft per HTTPS erreichbar sind.
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>
```

Vor dem Einschalten von Turnstile muss die CSP gezielt erweitert werden. Die produktiv eingesetzte Widget-Variante bestimmt die erforderlichen Quellen; typischerweise sind mindestens `https://challenges.cloudflare.com` in `script-src` und `frame-src` nötig. Der Formular-Endpunkt muss den Turnstile-Token ausschließlich serverseitig gegen Siteverify prüfen und ungültige oder abgelaufene Tokens ablehnen.

## Abnahme vor Aktivierung

- Mit Browser-Entwicklerwerkzeugen prüfen, dass keine CSP-Verstöße auftreten.
- Direktaufruf, Reload, Blog, Insight-Detailseiten und Directus-Bilder prüfen.
- Nach der Formular-Implementierung den echten Submit, Fehlermeldungen und Turnstile-Fehlerfall testen.
- HSTS erst nach bestätigtem HTTPS-Redirect aktiv lassen; anschließend die Header mit einem externen Header-Check gegen `https://sidetwo.de` verifizieren.
