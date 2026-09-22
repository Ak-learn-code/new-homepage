# Kontakt-API für den Produktivstart

GitHub Pages kann keinen geheimen Schlüssel schützen. Deshalb bleibt das Formular ohne Konfiguration bewusst im Testmodus und versendet keine Daten.

## Öffentlicher Request

`POST /api/contact` (bevorzugt same-origin auf dem künftigen ALL-INKL-/Backend-Host) mit `Content-Type: application/json`:

```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "company": "Optional GmbH",
  "phone": "+49 621 123456",
  "message": "Projektanfrage",
  "turnstileToken": "client-token"
}
```

Nur diese sechs Felder dürfen übernommen werden. Der Server muss dieselben Regeln aus `src/lib/contact-contract.js` anwenden, alle unbekannten Felder ablehnen, Zeichen-/Größenlimits vor jeder Weiterverarbeitung durchsetzen und niemals Header aus Benutzereingaben zusammensetzen.

## Serverseitige Pflichtschritte

1. JSON-Größe am Webserver begrenzen und ausschließlich `POST` akzeptieren.
2. Request gegen den gemeinsamen Contract validieren.
3. Rate-Limit pro IP und angemessene Missbrauchserkennung anwenden.
4. `turnstileToken` serverseitig mit `TURNSTILE_SECRET_KEY` über Siteverify prüfen. Bei fehlender, ungültiger, abgelaufener oder nicht erreichbarer Prüfung: **ablehnen**.
5. Erwarteten `hostname` (`sidetwo.de`) und die Aktion `contact` prüfen.
6. Erst danach die Anfrage per sicherer Mail-Integration und/oder an das Dashboard weitergeben. Keine Secrets, Roh-Header oder Stacktraces an den Browser ausgeben.

## Antworten

Erfolg: `200 { "success": true, "message": "Vielen Dank …" }`.

Fehler: `400`, `403`, `413`, `429` oder `500` mit `{ "success": false, "code": "…", "message": "benutzerfreundlicher Text" }`. Keine internen Fehlerdetails zurückgeben.

## Konfiguration

- `VITE_CONTACT_API_URL`: öffentliche Endpoint-URL; leer lassen, bis der Endpoint existiert.
- `VITE_TURNSTILE_SITE_KEY`: öffentlicher Sitekey; nur zusammen mit dem Endpoint setzen.
- `TURNSTILE_SECRET_KEY`: ausschließlich im Server-/Hosting-Secret-Store, niemals als `VITE_*`-Variable.
