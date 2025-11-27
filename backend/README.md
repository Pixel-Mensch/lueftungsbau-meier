# Backend Setup - Lüftungsbau Meier Kontaktformular

## Konfiguration

Bevor das Kontaktformular funktioniert, müssen Sie folgende Einstellungen in `backend/kontakt.php` anpassen:

### 1. E-Mail-Empfänger anpassen (Zeile 13)

```php
define('EMPFAENGER_EMAIL', 'ihre-echte-email@domain.de');
```

### 2. URLs anpassen (Zeilen 15-16)

```php
define('ERFOLG_URL', '../index.html#kontakt');
define('FEHLER_URL', '../index.html#kontakt');
```

## Server-Anforderungen

- PHP 7.0 oder höher
- `mail()` Funktion aktiviert
- Schreibrechte für `backend/rate_limit.log`

## Installation

1. Kompletten `backend/` Ordner auf den Server hochladen
2. Sicherstellen, dass das Backend-Verzeichnis Schreibrechte hat:
   ```bash
   chmod 755 backend/
   ```

## Sicherheitsfeatures

✅ **CSRF-Schutz** - Prüft Referer-Header  
✅ **Rate Limiting** - Max. 5 Anfragen pro IP/Stunde  
✅ **Honeypot** - Unsichtbares Feld gegen Spam-Bots  
✅ **Input-Validierung** - Prüft alle Eingaben  
✅ **Spam-Filter** - Blockiert verdächtige Keywords  
✅ **XSS-Schutz** - Alle Eingaben werden sanitized

## Honeypot-Feld hinzufügen (optional)

Für besseren Spam-Schutz können Sie im HTML-Formular ein verstecktes Feld hinzufügen:

```html
<!-- Honeypot für Spam-Bots (versteckt mit CSS) -->
<div style="position:absolute;left:-5000px" aria-hidden="true">
  <input type="text" name="website" tabindex="-1" autocomplete="off" />
</div>
```

## E-Mail-Versand testen

Nach dem Upload können Sie das Formular testen. Prüfen Sie:

- Ob die E-Mail ankommt
- Ob die Bestätigungsmail versendet wird
- Ob Rate Limiting funktioniert

## Fehlerbehandlung

Bei Problemen aktivieren Sie die Debug-Ausgabe in `kontakt.php` (Zeilen 9-10):

```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

**Wichtig:** In Produktion wieder deaktivieren!

## SMTP-Server verwenden (optional)

Falls `mail()` nicht funktioniert, können Sie PHPMailer verwenden:

1. PHPMailer installieren
2. SMTP-Zugangsdaten eintragen
3. Funktion `sendEmail()` anpassen

## Datenschutz

Das Script:

- Speichert keine personenbezogenen Daten dauerhaft
- Loggt nur IP-Adressen für Rate Limiting (1 Stunde)
- Entspricht DSGVO-Anforderungen bei korrekter Konfiguration

## Support

Bei Fragen zum Backend:

- Prüfen Sie die Server-Error-Logs
- Testen Sie die `mail()`-Funktion des Servers
- Kontaktieren Sie Ihren Hosting-Provider bei Mail-Problemen
