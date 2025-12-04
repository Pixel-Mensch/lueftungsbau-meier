# Lüftungsbau Meier – Unternehmenswebsite (300-€ Version)

Dies ist eine reduzierte und klar strukturierte One-Page-Website für den fiktiven Betrieb **Lüftungsbau Meier** aus Dortmund.
Sie wurde mit **HTML**, **CSS** und **JavaScript** umgesetzt und dient als Demo-/Portfolio-Projekt von Pixelmensch (Marc André Kommer).

> **Status**: ✅ Produktionsbereit (Stand: 04.12.2025)
> **Letzte Updates**: Sicherheits-Fixes, SEO-Optimierungen, JavaScript-Interaktivität

---

## 🔧 Technologien

- **HTML5** (semantisch, ARIA-Labels, Schema.org)
- **CSS3** (mobile-first, responsive, Custom Properties)
- **JavaScript (ES6+)** (Formular-Validierung, AJAX, Navigation)
- **PHP** (Kontaktformular-Backend mit CSRF-Schutz)
- **SEO**: robots.txt, sitemap.xml, JSON-LD Structured Data

---

## 🧩 Seitenstruktur

Diese Version enthält bewusst nur die wichtigsten Kernbereiche einer günstigen Einsteiger-Webseite:

- **Hero** mit Call-to-Action
- **Leistungen** (4 Services)
- **Vorteile** (3 USPs)
- **Über uns** (reduziert)
- **Kontakt** mit interaktivem Formular
- **Footer** mit Rechtlichem
- **Impressum** & **Datenschutzerklärung**

**Bewusst nicht enthalten:**
- Keine „Warum wir"-Sektion
- Keine aufwendigen Animationen
- Kein Design-Overhead
- Kein erweiterter Komfortbereich

Dies entspricht der üblichen Struktur einer realistisch umsetzbaren **300-€-Webseite**.

---

## ✨ Features & Highlights

### Sicherheit
✅ **CSRF-Schutz** für Formular-Submits
✅ **Rate Limiting** (max. 3 Anfragen/10 Min)
✅ **Honeypot-Feld** gegen Spam-Bots
✅ **Session-Management** für Token-Validierung

### Interaktivität
✅ **AJAX-Formular** ohne Seitenreload
✅ **Client-seitige Validierung** mit Live-Feedback
✅ **Smooth-Scroll** Navigation
✅ **Active-State** für aktuelle Sektion
✅ **Loading-States** beim Submit

### SEO & Performance
✅ **Schema.org LocalBusiness** Markup (Rich Results)
✅ **Twitter Card & Open Graph** Meta-Tags
✅ **robots.txt & sitemap.xml**
✅ **Lazy Loading** für Bilder
✅ **Mobile-First** responsives Design

---

## 📱 Responsives Design

- Mobile-first entwickelt
- Optimiert für Smartphones, Tablets und Desktop
- Breakpoints: 720px (Tablet), 1024px (Desktop)
- Kein externes CSS-Framework, reines Custom-CSS

---

## 🚀 Installation & Nutzung

### Voraussetzungen
- Webserver mit PHP 7.4+ (XAMPP, MAMP, oder Live-Server)
- Moderner Browser mit JavaScript-Support

### Lokale Entwicklung
1. Repository klonen oder herunterladen
2. Webserver starten (z.B. `php -S localhost:8000`)
3. Im Browser öffnen: `http://localhost:8000`

### Wichtig für Produktiv-Einsatz
- E-Mail-Adresse in `backend/kontakt.php` anpassen (Zeile 37)
- Domain in Meta-Tags und Schema.org ersetzen
- SSL-Zertifikat aktivieren (HTTPS)

---

## 📂 Projektstruktur

```
luftungsbau-meier/
├── index.html              # Haupt-HTML-Datei
├── robots.txt              # SEO Crawling-Regeln
├── sitemap.xml             # XML-Sitemap
├── README.md               # Diese Datei
├── CHANGELOG.md            # Änderungsprotokoll
├── backend/
│   ├── kontakt.php         # Formular-Verarbeitung
│   ├── csrf_init.php       # CSRF-Token Session-Sync
│   └── README.md
├── Bilder/
│   ├── favicon.png
│   ├── lueftung1.jpg       # Hero-Bild
│   ├── monteur.jpg
│   └── whatsapp.svg
├── css/
│   └── style.css           # Haupt-Stylesheet
└── js/
    └── main.js             # Formular-Logik & Navigation
```

---

## 🔐 Sicherheitshinweise

- **CSRF-Token** wird automatisch generiert und validiert
- **Rate Limiting** verhindert Formular-Spam
- **Honeypot-Feld** fängt einfache Bots ab
- **Input-Sanitization** gegen Header-Injection
- **Session-basierte Authentifizierung**

⚠️ **Produktiv-Empfehlungen:**
- SSL/TLS (HTTPS) aktivieren
- PHP mail() durch SMTP-Lösung ersetzen (z.B. PHPMailer)
- Content-Security-Policy Headers setzen
- Logging für Failed-Submits implementieren

---

## ⚖️ Rechtliches

Dieses Projekt ist ein **Demo-/Portfolio-Projekt** für Lernzwecke.
Alle Inhalte sind fiktiv. Die Datenschutzerklärung ist generisch und muss für echte Projekte angepasst werden.

- vollständiges **Impressum**
- einfache **Datenschutzerklärung**
- **keine Cookies**, **keine Tracker**, **keine externen Fonts**
- DSGVO-freundlich

---

## 🚀 Deployment

Diese Seite kann überall gehostet werden:

- GitHub Pages (statische Dateien + PHP-Alternative nötig)
- Hetzner Webhosting (PHP-Support)
- Netlify (mit Serverless Functions)
- Vercel (mit API Routes)
- jeder normale Hosting-Anbieter mit PHP

---

## 📈 Performance-Metriken (Richtwerte)

- **Lighthouse Score**: ~90-95 (Desktop)
- **Ladezeit**: <2s bei 3G
- **Dateigröße**: ~50KB (ohne Bilder)
- **First Contentful Paint**: <1.5s

---

## 🛠️ Bekannte Limitierungen (bewusst für 300€-Projekt)

- Keine Backend-Datenbank
- E-Mail-Versand via PHP `mail()` (hosting-abhängig)
- Keine automatischen Tests
- Bilder nicht WebP-optimiert
- Keine A/B-Testing-Integration

---

## 🤝 Erstellt von

**Pixelmensch – Webdesign & Entwicklung**
Marc André Kommer
E-Mail: pixelmensch@mail.de
Telefon: 015679735298

Dieses Projekt dient ausschließlich als Portfolio- und Demonstrationsseite.

---

## 📄 Weitere Dokumentation

Siehe `CHANGELOG.md` für detaillierte Änderungsliste und Update-Historie.
