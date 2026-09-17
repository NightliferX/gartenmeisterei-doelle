#!/usr/bin/env bash
# Baut die Website und veröffentlicht sie auf dem gh-pages-Branch (GitHub Pages).
# Aufruf:                ./deploy/deploy-github-pages.sh
# Mit eigener Domain:    VITE_BASE=/ CUSTOM_DOMAIN=www.gartenmeisterei-doelle.de ./deploy/deploy-github-pages.sh
set -euo pipefail

cd "$(dirname "$0")/.."

REPO_URL="$(git remote get-url origin)"
BASE="${VITE_BASE:-/gartenmeisterei-doelle/}"

echo "==> Build mit Basispfad: $BASE"
VITE_BASE="$BASE" npm run build

# ACHTUNG: gh-pages wird komplett überschrieben. SKIP_V2/SKIP_V3/SKIP_V4=1
# entfernt die jeweilige Variante also von der Live-Seite — nur nutzen,
# wenn sie wirklich offline gehen soll.
for flag in SKIP_V2 SKIP_V3 SKIP_V4; do
  if [[ "${!flag:-}" == "1" ]]; then
    echo "!!  $flag=1: diese Variante wird von der Live-Seite ENTFERNT"
  fi
done

# Design-Variante 2 („Das Gartenjahr") zusätzlich unter <base>/v2/ veröffentlichen
if [[ "${SKIP_V2:-}" != "1" ]]; then
  echo "==> Build Design-Variante 2 unter ${BASE}v2/"
  VITE_BASE="${BASE}v2/" VITE_THEME=v2 npx vite build --outDir dist-v2
  mkdir -p dist/v2
  cp -R dist-v2/. dist/v2/
  cp dist/v2/index.html dist/v2/404.html
  rm -rf dist-v2
fi

# Design-Variante 3 zusätzlich unter <base>/v3/ veröffentlichen
if [[ "${SKIP_V3:-}" != "1" ]]; then
  echo "==> Build Design-Variante 3 unter ${BASE}v3/"
  VITE_BASE="${BASE}v3/" VITE_THEME=v3 npx vite build --outDir dist-v3
  mkdir -p dist/v3
  cp -R dist-v3/. dist/v3/
  cp dist/v3/index.html dist/v3/404.html
  rm -rf dist-v3
fi

# Design-Variante 4 zusätzlich unter <base>/v4/ veröffentlichen
if [[ "${SKIP_V4:-}" != "1" ]]; then
  echo "==> Build Design-Variante 4 unter ${BASE}v4/"
  VITE_BASE="${BASE}v4/" VITE_THEME=v4 npx vite build --outDir dist-v4
  mkdir -p dist/v4
  cp -R dist-v4/. dist/v4/
  cp dist/v4/index.html dist/v4/404.html
  rm -rf dist-v4
fi

# SPA-Fallback: GitHub Pages liefert 404.html für unbekannte Pfade (z. B. /impressum)
cp dist/index.html dist/404.html

# Eigene Domain (CNAME-Datei) optional
if [[ -n "${CUSTOM_DOMAIN:-}" ]]; then
  echo "$CUSTOM_DOMAIN" > dist/CNAME
fi

echo "==> Veröffentliche dist/ auf Branch gh-pages"
cd dist
git init -q -b gh-pages
git config user.name "NightliferX"
git config user.email "NightliferX@users.noreply.github.com"
git add -A
git commit -q -m "Deploy $(date '+%Y-%m-%d %H:%M')"
git push -f "$REPO_URL" gh-pages:gh-pages
cd ..
rm -rf dist/.git

echo "==> Fertig."
