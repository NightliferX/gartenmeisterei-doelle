# Haus&Garten Profi

Modernisierte Marketing-Website auf Basis von Vite + React fuer `hausgartenprofi.eu`.

## Lokal starten

```bash
cd "/Users/Thorsten/Documents/Codex/Haus Garten"
npm install
npm run dev -- --host 127.0.0.1 --port 4173
```

Preview:

- `http://127.0.0.1:4173/`

## Wichtige Projektdateien

- `src/lib/siteContent.ts`: Inhalte, Leistungen, Referenzen, Testimonials, Kontakt
- `public/services/`: echte Leistungsbilder
- `public/references/`: echte Vorher-/Nachher-Projektbilder
- `src/pages/Impressum.tsx`: Impressum
- `src/pages/Datenschutz.tsx`: Datenschutz
- `src/components/Contact.tsx`: Kontaktformular

## Formular-Konfiguration

Das Kontaktformular nutzt den Build-Wert `VITE_CONTACT_FORM_ENDPOINT`.

Standard-Fallback:

- `https://formsubmit.co/ajax/info@hausgartenprofi.eu`

Eigene Konfiguration:

1. `.env.example` nach `.env` kopieren
2. `VITE_CONTACT_FORM_ENDPOINT` auf deinen echten Endpoint setzen

Beispiel:

```bash
cp .env.example .env
```

## GitHub vorbereiten

Falls das Repository noch nicht mit deinem GitHub-Repo verbunden ist:

```bash
git remote -v
git remote add origin git@github.com:DEIN-USERNAME/hausgartenprofi.git
```

Dann:

```bash
git add .
git commit -m "Prepare production-ready website and VPS deployment"
git push -u origin main
```

## Deploy auf Hostinger VPS

Dieses Repo ist fuer eine einfache Docker-basierte VPS-Auslieferung vorbereitet:

- `Dockerfile`
- `docker-compose.yml`
- `deploy/nginx/default.conf`

### Variante A: Manuell per SSH auf dem VPS

1. Auf dem VPS Docker und Docker Compose Plugin installieren
2. Repo klonen:

```bash
git clone git@github.com:DEIN-USERNAME/hausgartenprofi.git /root/apps/hausgartenprofi
cd /root/apps/hausgartenprofi
```

3. Optional `.env` anlegen, falls du einen eigenen Formular-Endpoint nutzen willst
4. Container starten:

```bash
docker compose up -d --build
```

5. Testweise ist die Website danach auf `http://DEINE-SERVER-IP:8081` erreichbar
6. Nginx im Container liefert die App intern auf Port `80` aus, nach aussen ist aktuell `8081` freigegeben

### Variante B: GitHub + Hostinger Deploy Action

Im Ordner `deploy/` liegt eine Vorlage:

- `deploy/hostinger-github-action.example.yml`

Wenn du automatisches Deploy willst:

1. Datei nach `.github/workflows/deploy-hostinger.yml` kopieren
2. In GitHub diese Secrets setzen:
   - `HOSTINGER_HOST`
   - `HOSTINGER_USERNAME`
   - `HOSTINGER_SSH_KEY`
3. Danach deployed jeder Push auf `main` automatisch

## Nginx / SPA Routing

Die Datei `deploy/nginx/default.conf` ist bereits fuer React Router vorbereitet.
Damit funktionieren auch Direktaufrufe wie:

- `/impressum`
- `/datenschutz`

## Produktions-Checkliste

- echte Telefonnummer in `src/lib/siteContent.ts` pruefen
- echte Firmenanschrift und Rechtsdaten pruefen
- Formular-Endpoint festlegen
- Datenschutz an Live-Setup anpassen
- Cookie-/Consent-Loesung ergaenzen, falls Tracking oder weitere Drittanbieter dazukommen
- DNS der Domain auf den Hostinger-VPS zeigen lassen

## Testen

```bash
npm run build
npm test
```
