/**
 * Legt die statische Ratgeber-Welt (ratgeber-welt/) als /ratgeber/ in dist/.
 * Läuft nach prerender.mjs: die vorgerenderten Artikel unter dist/ratgeber/<slug>/
 * bleiben, nur dist/ratgeber/index.html wird ersetzt. Das JSON-LD der
 * vorgerenderten Hub-Seite wird in die neue Seite übernommen.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "ratgeber-welt");
const DEST = path.join(root, "dist", "ratgeber");

if (!fs.existsSync(path.join(root, "dist", "index.html"))) {
  console.error("[ratgeber-welt] dist/ fehlt. Erst 'vite build' + prerender ausführen.");
  process.exit(1);
}

const prerendered = path.join(DEST, "index.html");
const jsonLd = fs.existsSync(prerendered)
  ? fs.readFileSync(prerendered, "utf8").match(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g) ?? []
  : [];

fs.mkdirSync(DEST, { recursive: true });
fs.cpSync(SRC, DEST, { recursive: true, filter: (p) => !p.endsWith(".DS_Store") });

const indexPath = path.join(DEST, "index.html");
const html = fs.readFileSync(indexPath, "utf8").replace("</head>", `${jsonLd.join("\n")}\n</head>`);
fs.writeFileSync(indexPath, html);

console.log(`[ratgeber-welt] nach dist/ratgeber/ kopiert (${jsonLd.length} JSON-LD-Block/Blöcke übernommen).`);
