#!/usr/bin/env node
// Batch-Konvertierung großer JPG/PNG-Bilder in public/ zu WebP.
// Ziel: alles > 300 KB kriegt ein .webp neben dem Original.
// Im HTML/JSX referenzieren wir weiter das JPG (Fallback), aber laden
// zuerst das WebP über <picture> oder src-Ersetzung im Build.
import { readdirSync, statSync, existsSync } from "node:fs";
import { extname, join, basename } from "node:path";
import sharp from "sharp";

const ROOT = new URL("../public/", import.meta.url).pathname;
const MIN_KB = 300;
const QUALITY = 82;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (/\.(jpe?g|png)$/i.test(entry) && s.size > MIN_KB * 1024) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
console.log(`Prüfe ${files.length} große Bilder (> ${MIN_KB} KB)...`);

let saved = 0, skipped = 0;
for (const f of files) {
  const webp = f.replace(/\.(jpe?g|png)$/i, ".webp");
  const origKB = Math.round(statSync(f).size / 1024);
  if (existsSync(webp)) {
    const webpKB = Math.round(statSync(webp).size / 1024);
    console.log(`  skip ${basename(f)} (webp exists, ${webpKB} KB)`);
    skipped++;
    continue;
  }
  try {
    const info = await sharp(f).webp({ quality: QUALITY, effort: 5 }).toFile(webp);
    const newKB = Math.round(info.size / 1024);
    const reduction = Math.round(100 - (newKB / origKB) * 100);
    console.log(`  ✓ ${basename(f)}: ${origKB} → ${newKB} KB (-${reduction}%)`);
    saved += origKB - newKB;
  } catch (e) {
    console.error(`  ✗ ${basename(f)}: ${e.message}`);
  }
}
console.log(`\nFertig. ${skipped} übersprungen, ~${Math.round(saved / 1024)} MB gespart.`);
