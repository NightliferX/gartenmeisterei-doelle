

# Haus&Garten Profi – Website Build Plan

## Struktur

8 Komponenten werden erstellt, alle in `src/components/`:

1. **Header** – Sticky, Logo-Text, Nav-Links (smooth scroll), CTA "Kostenlose Beratung", mobile Hamburger-Menü + Click-to-Call
2. **Hero** – Fullscreen Unsplash-Bild, Overlay, Headline, Subline, CTA-Button, Vertrauensleiste
3. **Services** – 4er Grid: Haussanierung, Gartengestaltung, Innenausbau, Gewerbesanierung mit Icons
4. **Gallery** – Bildergalerie mit Kategorie-Filter und Hover-Effekten, Unsplash-Platzhalter
5. **About** – Über Robert Jovanovic, Firmenwerte, Platz für Teamfoto
6. **Testimonials** – Karussell mit Oliver Hartman Zitat + Platzhalter-Bewertungen, Sterne
7. **Contact** – Formular (Name, E-Mail, Tel, Leistung-Dropdown, Nachricht) + Kontaktdaten + Google Maps
8. **Footer** – Nav, Impressum, Datenschutz, Kontaktinfos

## Design-System (index.css)

- Primary: Dunkelgrün (#1B5E20 → HSL)
- Background: Warmweiß (#FAFAF5)
- Accent: Helles Grün für Hover
- Font: Inter (Google Fonts via index.html)
- Radius: 0.75rem

## Seite

- `Index.tsx` kombiniert alle Sektionen
- Smooth-Scroll-Navigation zwischen Sektionen
- Scroll-triggered Fade-in Animationen (Intersection Observer)
- Mobile-first, responsive
- Echte Daten: Robert Jovanovic, Am Hammerwerk 38, 41515 Grevenbroich
- Keine erfundenen Zahlen – nur echte Wertversprechen

## Dateien

| Aktion | Datei |
|--------|-------|
| Neu | `src/components/Header.tsx` |
| Neu | `src/components/Hero.tsx` |
| Neu | `src/components/Services.tsx` |
| Neu | `src/components/Gallery.tsx` |
| Neu | `src/components/About.tsx` |
| Neu | `src/components/Testimonials.tsx` |
| Neu | `src/components/Contact.tsx` |
| Neu | `src/components/Footer.tsx` |
| Neu | `src/hooks/useScrollAnimation.ts` |
| Edit | `src/pages/Index.tsx` |
| Edit | `src/index.css` |
| Edit | `index.html` (Inter font) |

