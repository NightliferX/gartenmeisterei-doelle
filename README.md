# Gartenmeisterei Dölle

Website für den Gartenpflege-Meisterbetrieb von Benedikt Dölle (Gärtnermeister, Düsseldorf).
Vite + React + Tailwind/shadcn. Inhalte zentral in `src/lib/siteContent.ts`.

> Adresse, Telefonnummer, E-Mail und Domain sind aktuell **Musterdaten** —
> vor dem Livegang durch echte Daten ersetzen.

## Lokal starten

```bash
npm install
npm run dev
```

Preview: `http://localhost:8080/`

## Wichtige Dateien

- `src/lib/siteContent.ts`: alle Inhalte (Leistungen, Beispielprojekte, FAQ, Kontakt)
- `public/logo-gartenmeisterei.svg` / `-white.svg`: Logo (hell/dunkel)
- `src/pages/Impressum.tsx`, `src/pages/Datenschutz.tsx`: Rechtstexte
- `src/components/Contact.tsx`: Kontaktformular (Endpoint via `VITE_CONTACT_FORM_ENDPOINT`)

## Deployment (GitHub Pages)

```bash
./deploy/deploy-github-pages.sh
```

Baut mit Basispfad `/gartenmeisterei-doelle/` und pusht `dist/` auf den Branch
`gh-pages` → https://nightliferx.github.io/gartenmeisterei-doelle/

Mit eigener Domain (sobald registriert):

```bash
VITE_BASE=/ CUSTOM_DOMAIN=www.gartenmeisterei-doelle.de ./deploy/deploy-github-pages.sh
```

Danach beim Domain-Anbieter einen CNAME auf `nightliferx.github.io` setzen.

## Tests & Build

```bash
npm test
npm run build
```

## Vor dem Livegang (Checkliste)

- Echte Adresse, Telefonnummer, E-Mail in `src/lib/siteContent.ts` eintragen
- Domain registrieren und Deployment umstellen (siehe oben)
- Beispielprojekte durch echte Vorher-/Nachher-Fotos ersetzen
- Google Business Profile anlegen und Bewertungen sammeln
- Formular-Endpoint auf echte E-Mail-Adresse stellen
- Impressum/Datenschutz mit echten Firmendaten abgleichen
