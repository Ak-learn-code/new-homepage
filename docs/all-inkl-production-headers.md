# Vorschlag für Security-Header auf dem produktiven ALL-INKL-Host

Diese Datei ist eine **Vorlage** für die produktive Apache-/`.htaccess`-Konfiguration auf `sidetwo.de`. Sie wird nicht vom GitHub-Pages-Workflow ausgeliefert und darf erst nach einem Staging-Test auf dem künftigen Host aktiviert werden.

Die CSP beschreibt den Produktionscode: lokale Assets und Fonts, öffentliche Directus-Bilder/-Inhalte, den serverseitigen Contact-Endpunkt bei `dashboard.sidetwo.de` und Cloudflare Turnstile. Turnstile darf erst aktiviert werden, wenn der zugehörige Server-Secret im SideTwo-OS-Service gesetzt und Siteverify erfolgreich getestet ist.

```apacheconf
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  Header always set X-Frame-Options "DENY"
  Header always set Content-Security-Policy "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' https://challenges.cloudflare.com; style-src 'self'; font-src 'self' data:; img-src 'self' data: https://directus.sidetwo.de; connect-src 'self' https://directus.sidetwo.de https://dashboard.sidetwo.de https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; media-src 'self'; manifest-src 'self'"

  # Erst aktivieren, wenn sidetwo.de dauerhaft per HTTPS erreichbar ist.
  # includeSubDomains und preload bewusst nicht voreinstellen.
  Header always set Strict-Transport-Security "max-age=31536000"
</IfModule>
```

Der Formular-Endpunkt muss den Turnstile-Token ausschließlich serverseitig gegen Siteverify prüfen und ungültige oder abgelaufene Tokens ablehnen. Falls Turnstile beim finalen Launch noch nicht aktiv ist, die drei Cloudflare-Quellen bewusst wieder aus der CSP entfernen und die öffentlichen `VITE_*`-Formularwerte leer lassen.

## Abnahme vor Aktivierung

- Mit Browser-Entwicklerwerkzeugen prüfen, dass keine CSP-Verstöße auftreten.
- Direktaufruf, Reload, Blog, Insight-Detailseiten und Directus-Bilder prüfen.
- Nach der Formular-Implementierung den echten Submit, Fehlermeldungen und Turnstile-Fehlerfall testen.
- HSTS erst nach bestätigtem HTTPS-Redirect aktiv lassen; anschließend die Header mit einem externen Header-Check gegen `https://sidetwo.de` verifizieren.
