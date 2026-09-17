#!/usr/bin/env bash
# Baut die Website und veröffentlicht sie auf dem gh-pages-Branch (GitHub Pages).
# Aufruf:                ./deploy/deploy-github-pages.sh
# Mit eigener Domain:    VITE_BASE=/ CUSTOM_DOMAIN=www.hausgartenprofi.eu ./deploy/deploy-github-pages.sh
set -euo pipefail

cd "$(dirname "$0")/.."

REPO_URL="$(git remote get-url origin)"
BASE="${VITE_BASE:-/hausgartenprofi-pro-boost/}"

echo "==> Build mit Basispfad: $BASE"
VITE_BASE="$BASE" npm run build

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
