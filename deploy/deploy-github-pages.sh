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

# ACHTUNG: gh-pages wird komplett überschrieben. SKIP_V2 … SKIP_V6=1
# entfernt die jeweilige Variante also von der Live-Seite — nur nutzen,
# wenn sie wirklich offline gehen soll.
for flag in SKIP_V2 SKIP_V4 SKIP_V5 SKIP_V6 SKIP_V7 SKIP_V8 SKIP_V9 SKIP_V10; do
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

# Design-Variante 4 zusätzlich unter <base>/v4/ veröffentlichen
if [[ "${SKIP_V4:-}" != "1" ]]; then
  echo "==> Build Design-Variante 4 unter ${BASE}v4/"
  VITE_BASE="${BASE}v4/" VITE_THEME=v4 npx vite build --outDir dist-v4
  mkdir -p dist/v4
  cp -R dist-v4/. dist/v4/
  cp dist/v4/index.html dist/v4/404.html
  rm -rf dist-v4
fi

# Design-Variante 5 zusätzlich unter <base>/v5/ veröffentlichen
if [[ "${SKIP_V5:-}" != "1" ]]; then
  echo "==> Build Design-Variante 5 unter ${BASE}v5/"
  VITE_BASE="${BASE}v5/" VITE_THEME=v5 npx vite build --outDir dist-v5
  mkdir -p dist/v5
  cp -R dist-v5/. dist/v5/
  cp dist/v5/index.html dist/v5/404.html
  rm -rf dist-v5
fi

# Design-Variante 6 (Apple-Produktseite) zusätzlich unter <base>/v6/ veröffentlichen
if [[ "${SKIP_V6:-}" != "1" ]]; then
  echo "==> Build Design-Variante 6 unter ${BASE}v6/"
  VITE_BASE="${BASE}v6/" VITE_THEME=v6 npx vite build --outDir dist-v6
  mkdir -p dist/v6
  cp -R dist-v6/. dist/v6/
  cp dist/v6/index.html dist/v6/404.html
  rm -rf dist-v6
fi

# Design-Variante 7 zusätzlich unter <base>/v7/ veröffentlichen
if [[ "${SKIP_V7:-}" != "1" ]]; then
  echo "==> Build Design-Variante 7 unter ${BASE}v7/"
  VITE_BASE="${BASE}v7/" VITE_THEME=v7 npx vite build --outDir dist-v7
  mkdir -p dist/v7
  cp -R dist-v7/. dist/v7/
  cp dist/v7/index.html dist/v7/404.html
  rm -rf dist-v7
fi

# Design-Variante 8 zusätzlich unter <base>/v8/ veröffentlichen
if [[ "${SKIP_V8:-}" != "1" ]]; then
  echo "==> Build Design-Variante 8 unter ${BASE}v8/"
  VITE_BASE="${BASE}v8/" VITE_THEME=v8 npx vite build --outDir dist-v8
  mkdir -p dist/v8
  cp -R dist-v8/. dist/v8/
  cp dist/v8/index.html dist/v8/404.html
  rm -rf dist-v8
fi

# Design-Variante 9 (Airbnb-Test) zusätzlich unter <base>/v9/ veröffentlichen
if [[ "${SKIP_V9:-}" != "1" ]]; then
  echo "==> Build Design-Variante 9 unter ${BASE}v9/"
  VITE_BASE="${BASE}v9/" VITE_THEME=v9 npx vite build --outDir dist-v9
  mkdir -p dist/v9
  cp -R dist-v9/. dist/v9/
  cp dist/v9/index.html dist/v9/404.html
  rm -rf dist-v9
fi

# Design-Variante 10 (Barmer-Test) zusätzlich unter <base>/v10/ veröffentlichen
if [[ "${SKIP_V10:-}" != "1" ]]; then
  echo "==> Build Design-Variante 10 unter ${BASE}v10/"
  VITE_BASE="${BASE}v10/" VITE_THEME=v10 npx vite build --outDir dist-v10
  mkdir -p dist/v10
  cp -R dist-v10/. dist/v10/
  cp dist/v10/index.html dist/v10/404.html
  rm -rf dist-v10
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
