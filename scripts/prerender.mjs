#!/usr/bin/env node
/**
 * Post-Build Prerender.
 *
 * Vite baut nur eine einzige dist/index.html mit SPA-Shell. AI-Crawler
 * (GPTBot, ClaudeBot, PerplexityBot, CCBot) rendern kein JavaScript und
 * saehen darum auf allen 30+ Routen dieselben Meta-Tags und kein JSON-LD.
 *
 * Dieses Skript loest das ohne Puppeteer/SSR: fuer jede Route wird die
 * dist/index.html gelesen, per String-Ersetzung die richtigen Meta-Tags
 * + JSON-LD injiziert und unter dist/<route>/index.html gespeichert.
 * Body bleibt SPA-Shell — beim ersten Frame uebernimmt React Router und
 * hydratet regulaer. Meta-Tags stehen aber schon im Initial-HTML fuer
 * alle Crawler.
 *
 * WICHTIG: Diese Route-Metadaten sind eine SYNCED-Kopie aus
 * src/lib/subpages.ts und src/lib/siteContent.ts. Bei Aenderungen dort
 * bitte hier nachziehen.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const DOMAIN = "https://www.gaertnermeister-doelle.de";
const BUSINESS_ID = `${DOMAIN}/#business`;

const routes = [
  {
    path: "/",
    title: "Gartenpflege Düsseldorf | Gärtnermeister Dölle",
    description:
      "Gartenpflege vom Gärtnermeister in Düsseldorf & Umgebung: Heckenschnitt, Baumschnitt, Rasenpflege, Laubentsorgung und Winterservice. Kostenlose Erstberatung.",
  },
  {
    path: "/impressum",
    title: "Impressum | Gärtnermeister Dölle",
    description: "Impressum und Anbieterkennzeichnung von Gärtnermeister Dölle in Düsseldorf.",
  },
  {
    path: "/datenschutz",
    title: "Datenschutz | Gärtnermeister Dölle",
    description: "Datenschutzhinweise für die Website von Gärtnermeister Dölle.",
  },
  // Hubs
  { path: "/leistungen", title: "Leistungen | Gärtnermeister Dölle Düsseldorf", description: "Alle Leistungen im Überblick: Gartenpflege, Hecken- und Baumschnitt, Rasenpflege, Rollrasen, Laubentsorgung, Winterservice, Terrassenreinigung. Vom Meisterbetrieb in Düsseldorf und Umgebung." },
  { path: "/gartenjahr", title: "Gartenjahr | Gärtnermeister Dölle Düsseldorf", description: "Das Gartenjahr im Rheinland: was in Frühjahr, Sommer, Herbst und Winter im Düsseldorfer Garten ansteht. Vom Gärtnermeister für Pflege im Takt der Saison." },
  { path: "/einsatzgebiete", title: "Einsatzgebiete | Gärtnermeister Dölle Düsseldorf", description: "Gärtnermeister Dölle betreut Gärten in ganz Düsseldorf und im Umland: Meerbusch, Neuss, Ratingen, Erkrath, Hilden, Kaarst und weitere. Kurze Anfahrt, feste Pflegetermine." },
  // Service-Pages
  { path: "/gartenpflege", title: "Gartenpflege Düsseldorf | Gärtnermeister Dölle", description: "Regelmäßige Gartenpflege in Düsseldorf vom Gärtnermeister: Rasen, Hecken, Beete und Saisonarbeiten, zuverlässig nach Plan, auf Wunsch als Pflegevertrag. Kostenlose Erstberatung." },
  { path: "/heckenschnitt", title: "Heckenschnitt Düsseldorf | Gärtnermeister Dölle", description: "Heckenschnitt in Düsseldorf vom Gärtnermeister: Form- und Rückschnitt zur richtigen Zeit, saubere Kanten, Abtransport inklusive. Jetzt Beratung anfragen." },
  { path: "/baumschnitt", title: "Baumschnitt Düsseldorf | Gärtnermeister Dölle", description: "Fachgerechter Baumschnitt in Düsseldorf: Obstbaumschnitt, Kronenpflege, Totholz-Entfernung, vom Gärtnermeister, inklusive Entsorgung. Kostenlose Erstberatung." },
  { path: "/rasenpflege", title: "Rasenpflege Düsseldorf | Gärtnermeister Dölle", description: "Rasenpflege in Düsseldorf vom Gärtnermeister: Mähen, Vertikutieren, Düngen und Nachsaat für einen dichten, gesunden Rasen. Kostenlose Erstberatung vor Ort." },
  { path: "/rollrasen", title: "Rollrasen legen Düsseldorf | Gärtnermeister Dölle", description: "Rollrasen in Düsseldorf vom Gärtnermeister: Bodenvorbereitung, fugenlose Verlegung und Anwuchspflege. Sofort fertiger Rasen statt monatelang warten. Kostenlose Erstberatung." },
  { path: "/laubentsorgung", title: "Laubentsorgung Düsseldorf | Gärtnermeister Dölle", description: "Laub entfernen und entsorgen in Düsseldorf: Rasen, Wege und Beete gründlich vom Laub befreit, auf Wunsch mehrmals pro Saison. Jetzt Termin sichern." },
  { path: "/winterservice", title: "Garten winterfest machen | Gärtnermeister Dölle Düsseldorf", description: "Garten winterfest machen in Düsseldorf: Herbstschnitt, Winterschutz für Pflanzen und Frühjahrs-Startpflege vom Gärtnermeister. Jetzt Beratung anfragen." },
  { path: "/terrasse", title: "Terrassenreinigung Düsseldorf | Gärtnermeister Dölle", description: "Terrassen, Einfahrten und Wege fachgerecht mit dem Hochdruckreiniger säubern: Moos, Algen und Schmutz raus, Fugensand nachpflegen. Für Düsseldorf und Umland." },
  // Area-Pages: Stadtteile
  { path: "/gartenpflege-oberkassel", title: "Gartenpflege Oberkassel | Gärtnermeister Dölle, linksrheinisch", description: "Gartenpflege in Düsseldorf-Oberkassel: Hecken, Rasen, Bäume und Saisonservice vom Gärtnermeister, kurze Wege linksrheinisch, kostenlose Erstberatung." },
  { path: "/gartenpflege-kaiserswerth", title: "Gartenpflege Kaiserswerth | Gärtnermeister Dölle", description: "Gartenpflege in Düsseldorf-Kaiserswerth und Wittlaer: große Gärten, alte Bäume, gepflegte Hecken, vom Gärtnermeister mit festen Pflegeterminen." },
  { path: "/gartenpflege-benrath", title: "Gartenpflege Benrath | Gärtnermeister Dölle, im Düsseldorfer Süden", description: "Gartenpflege in Düsseldorf-Benrath, Urdenbach und Garath: Rasen, Hecken und Saisonservice vom Gärtnermeister. Kostenlose Erstberatung im Garten." },
  { path: "/gartenpflege-gerresheim", title: "Gartenpflege Gerresheim | Gärtnermeister Dölle, im Düsseldorfer Osten", description: "Gartenpflege in Düsseldorf-Gerresheim und Umgebung: Hecken- und Baumschnitt, Rasenpflege und Laubservice vom Gärtnermeister-Betrieb." },
  // Area-Pages: Umland
  { path: "/gartenpflege-meerbusch", title: "Gartenpflege Meerbusch | Gärtnermeister Dölle Düsseldorf", description: "Gartenpflege in Meerbusch, Büderich, Osterath, Lank-Latum, Strümp: große Gärten linksrheinisch in Meisterhand. Regelmäßige Pflege, fachgerechter Schnitt, faire Anfahrt aus Düsseldorf." },
  { path: "/gartenpflege-neuss", title: "Gartenpflege Neuss | Gärtnermeister Dölle Düsseldorf", description: "Gartenpflege in Neuss vom Gärtnermeister: regelmäßige Pflege, Heckenschnitt, Rasen, Baumpflege und Winterservice für Neuss, Grimlinghausen, Weckhoven, Norf. Anfahrt aus Düsseldorf." },
  { path: "/gartenpflege-ratingen", title: "Gartenpflege Ratingen | Gärtnermeister Dölle Düsseldorf", description: "Gartenpflege Ratingen: Heckenschnitt, Baumpflege, Rasenpflege und Winterservice vom Gärtnermeister, für Ratingen-Mitte, Hösel, Lintorf, Homberg und Breitscheid. Feste Termine, faire Preise." },
  { path: "/gartenpflege-hilden", title: "Gartenpflege Hilden | Gärtnermeister Dölle, für Hilden & Erkrath", description: "Gartenpflege in Hilden und Erkrath: Rasenpflege, Heckenschnitt, Laubentsorgung und Winterservice vom Gärtnermeister-Betrieb aus Düsseldorf." },
  { path: "/gartenpflege-erkrath", title: "Gartenpflege Erkrath | Gärtnermeister Dölle, im Kreis Mettmann", description: "Gartenpflege in Erkrath, Alt-Erkrath und Hochdahl: Heckenschnitt, Rasenpflege und Saisonservice vom Gärtnermeister, kurze Anfahrt aus Düsseldorf." },
  { path: "/gartenpflege-langenfeld", title: "Gartenpflege Langenfeld | Gärtnermeister Dölle", description: "Gartenpflege in Langenfeld (Rheinland): Rasenpflege, Formschnitt, Baumpflege und Laubentsorgung vom Gärtnermeister-Betrieb, feste Pflegetermine." },
  { path: "/gartenpflege-kaarst", title: "Gartenpflege Kaarst | Gärtnermeister Dölle, für Kaarst & Rhein-Kreis Neuss", description: "Gartenpflege in Kaarst, Büttgen und Vorst: Heckenschnitt, Rasen, Beete und Saisonservice vom Gärtnermeister, kurze Wege aus Düsseldorf ins Kaarster Feld." },
  { path: "/gartenpflege-mettmann", title: "Gartenpflege Mettmann | Gärtnermeister Dölle", description: "Gartenpflege in Mettmann: Heckenschnitt, Rasenpflege, Baumpflege und Laubentsorgung vom Gärtnermeister-Betrieb, regelmäßige Termine, Anfahrt aus Düsseldorf." },
  { path: "/gartenpflege-haan", title: "Gartenpflege Haan | Gärtnermeister Dölle, für Haan & Gruiten", description: "Gartenpflege in Haan (Rheinland) und Gruiten: Rasenpflege, Heckenschnitt und Saisonservice vom Gärtnermeister-Betrieb aus Düsseldorf." },
  { path: "/gartenpflege-monheim", title: "Gartenpflege Monheim am Rhein | Gärtnermeister Dölle, für Monheim", description: "Gartenpflege in Monheim am Rhein und Baumberg: Rasen, Hecken, Beete und Saisonservice vom Gärtnermeister-Betrieb, feste Pflegetermine, Anfahrt aus Düsseldorf." },
  { path: "/gartenpflege-dormagen", title: "Gartenpflege Dormagen | Gärtnermeister Dölle", description: "Gartenpflege in Dormagen, Zons und Stürzelberg: Heckenschnitt, Rasenpflege und Saisonservice vom Gärtnermeister-Betrieb, kurze Anfahrt aus Düsseldorf." },
  { path: "/gartenpflege-krefeld", title: "Gartenpflege Krefeld | Gärtnermeister Dölle Düsseldorf", description: "Gartenpflege in Krefeld: Heckenschnitt, Rasenpflege, Baumpflege und Saisonservice vom Gärtnermeister-Betrieb, für private Gärten in Krefeld und Umgebung." },
  { path: "/gartenpflege-wuelfrath", title: "Gartenpflege Wülfrath | Gärtnermeister Dölle", description: "Gartenpflege in Wülfrath: Heckenschnitt, Rasenpflege und Saisonservice vom Gärtnermeister-Betrieb, Anfahrt aus Düsseldorf, feste Pflegetermine." },
  // Season-Pages (Gartenjahr)
  { path: "/gartenpflege-fruehjahr", title: "Gartenpflege Frühjahr Düsseldorf | Gärtnermeister Dölle", description: "Frühjahrsschnitt, Beete vorbereiten und Rasen in Schwung bringen: Gartenpflege im Frühjahr vom Gärtnermeister in Düsseldorf und Umgebung." },
  { path: "/gartenpflege-sommer", title: "Gartenpflege Sommer Düsseldorf | Gärtnermeister Dölle", description: "Sommerpflege im Garten: Hecken in Form halten, Rasen mähen, Beete pflegen. Gärtnermeister Benedikt Dölle für Düsseldorf und Umgebung." },
  { path: "/gartenpflege-herbst", title: "Gartenpflege Herbst Düsseldorf | Gärtnermeister Dölle", description: "Herbstpflege im Garten: Laub entsorgen, letzter Schnitt, Garten winterfest machen. Vom Gärtnermeister in Düsseldorf und Umgebung." },
  { path: "/gartenpflege-winter", title: "Gartenpflege Winter Düsseldorf | Gärtnermeister Dölle", description: "Wintergartenarbeit: Obstbaum- und Gehölzschnitt, Planung fürs neue Gartenjahr. Vom Gärtnermeister in Düsseldorf und Umgebung." },
  // Ratgeber
  { path: "/hausverwaltung", title: "Hausverwaltung & Gewerbe | Gärtnermeister Dölle Düsseldorf", description: "Grünpflege für Wohnanlagen, WEG und Gewerbeobjekte in Düsseldorf: fester Pflegeturnus, Nachweis nach jedem Einsatz, Abrechnung je Objekt. Vom Meisterbetrieb." },
  { path: "/ratgeber", title: "Ratgeber | Gärtnermeister Dölle", description: "Fachwissen aus dem Meisterbetrieb: Pflanzenschutz, Pflegetipps und praktische Antworten rund um den Garten in Düsseldorf und Umgebung." },
  { path: "/ratgeber/buchsbaumzuensler-bekaempfen", title: "Buchsbaumzünsler bekämpfen: was 2026 wirklich hilft | Gärtnermeister Dölle", description: "Buchsbaumzünsler erkennen, den Lebenszyklus verstehen und wirksam behandeln: Meisterwissen aus der Praxis für Düsseldorfer Buchsbaum-Hecken. Mechanisch, biologisch, chemisch und die Frage nach Alternativen." },
  { path: "/ratgeber/kuebelpflanzen-einwintern", title: "Kübelpflanzen einwintern in Düsseldorf: Anleitung | Gärtnermeister Dölle", description: "Wann kommen Kübelpflanzen rein, welche vertragen den Winter draußen, wie schützen Sie empfindliche Pflanzen richtig? Praxis-Anleitung vom Gärtnermeister für Düsseldorfer Balkone und Terrassen." },
  { path: "/ratgeber/herbstlaub-warum-nicht-liegen-lassen", title: "Herbstlaub: warum es nicht liegen bleiben sollte | Gärtnermeister Dölle", description: "Herbstlaub schadet Rasen, blockiert Rinnen und macht Wege rutschig. Wo Laub bleiben darf, wo es weg muss und wie oft geräumt werden sollte. Ratgeber vom Gärtnermeister Düsseldorf." },
  { path: "/ratgeber/winterschutz-empfindliche-pflanzen", title: "Winterschutz für empfindliche Pflanzen im Rheinland | Gärtnermeister Dölle", description: "Rosen, Hortensien, Feige, Kirschlorbeer: welche Pflanzen im Rheinland Winterschutz brauchen, welches Material sich bewährt und was Frosttrocknis wirklich ist. Praxis vom Gärtnermeister." },
  { path: "/ratgeber/obstbaumschnitt-winter", title: "Obstbaumschnitt im Winter: Zeitpunkt & Wetterfenster | Gärtnermeister Dölle", description: "Warum der Winterschnitt an Obstbäumen wirksam ist, welches Wetter geeignet ist und wie die Krone fachgerecht aufgebaut wird. Praxis vom Gärtnermeister aus Düsseldorf." },
  { path: "/ratgeber/baum-kronen-check-winter", title: "Baum-Kronen-Check im Winter: krank oder gesund? | Gärtnermeister Dölle", description: "Wie erkennen Sie, ob Ihr Baum gesund ist? Der Winter zeigt die Krone ohne Blätter, jetzt sehen Sie Totholz, Pilze und statische Schwächen. Praxis vom Gärtnermeister Düsseldorf." },
  { path: "/ratgeber/vertikutieren-im-fruehjahr", title: "Vertikutieren im Frühjahr: Zeitpunkt & Anleitung | Gärtnermeister Dölle", description: "Wann lohnt sich Vertikutieren, wie oft, mit welchem Gerät? Praxis vom Gärtnermeister für Rasenflächen in Düsseldorf und Umgebung." },
  { path: "/ratgeber/rasen-startduengung-fruehjahr", title: "Rasen düngen im Frühjahr: die Startdüngung richtig | Gärtnermeister Dölle", description: "Wann startet man mit der Rasendüngung, welcher Dünger passt zu welchem Rasen, und wieviel? Praxis vom Gärtnermeister für Düsseldorfer Gärten." },
  { path: "/ratgeber/rollrasen-anwuchspflege", title: "Rollrasen-Anwuchspflege: die ersten sechs Wochen | Gärtnermeister Dölle", description: "Frisch verlegter Rollrasen braucht in den ersten Wochen konsequente Bewässerung, den richtigen ersten Schnitt und eine passende Düngung. Praxis vom Gärtnermeister Düsseldorf." },
  { path: "/ratgeber/rasen-bei-hitze-und-trockenheit", title: "Rasen bei Hitze: Mähen, Wässern, Retten | Gärtnermeister Dölle", description: "Wie kommt Ihr Rasen durch die Sommerhitze in Düsseldorf? Wann wässern, wie hoch mähen, was tun bei braunem Rasen. Praxis vom Gärtnermeister." },
  { path: "/ratgeber/zweiter-heckenschnitt-im-juli", title: "Zweiter Heckenschnitt im Juli: sinnvoll oder Stress? | Gärtnermeister Dölle", description: "Braucht die Hecke im Juli einen zweiten Schnitt? Welche Heckenarten davon profitieren, was der Vogelschutz erlaubt und wie wir vorgehen. Praxis vom Gärtnermeister Düsseldorf." },
  { path: "/ratgeber/kirschlorbeer-krankheiten", title: "Kirschlorbeer-Krankheiten: erkennen & behandeln | Gärtnermeister Dölle", description: "Schrotschuss, Echter Mehltau, Frosttrocknis: die wichtigsten Krankheiten und Schäden an Kirschlorbeer im Rheinland und was wirklich hilft. Praxis vom Gärtnermeister." },
];

const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function main() {
  if (!existsSync(DIST)) {
    console.error(`[prerender] dist/ nicht gefunden unter ${DIST}. Erst 'vite build' ausfuehren.`);
    process.exit(1);
  }
  const shellPath = path.join(DIST, "index.html");
  const shell = await readFile(shellPath, "utf8");

  let written = 0;
  for (const route of routes) {
    const url = `${DOMAIN}${route.path === "/" ? "/" : route.path}`;
    const title = escapeHtml(route.title);
    const description = escapeHtml(route.description);

    // Meta-Bloecke in der Shell ersetzen. String-Ersetzung ist bewusst
    // spezifisch, damit versehentliche Doppeltreffer ausgeschlossen sind.
    let html = shell;
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    html = html.replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${description}">`,
    );
    html = html.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${escapeHtml(url)}" />`,
    );
    html = html.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`,
    );
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${title}" />`,
    );
    html = html.replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${description}" />`,
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${description}" />`,
    );
    html = html.replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${escapeHtml(url)}" />`,
    );

    // JSON-LD-Stub: mindestens WebPage + Business-Ref. Vollstaendige
    // Landscaper/Service/FAQ-Payloads liefert Seo.tsx zur Laufzeit; hier
    // reicht der Business-Anker, damit AI-Crawler die Entitaet finden.
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: route.title,
      description: route.description,
      url,
      isPartOf: { "@type": "WebSite", "@id": `${DOMAIN}/#website` },
      about: { "@id": BUSINESS_ID },
      inLanguage: "de-DE",
    };
    const jsonLdTag = `\n    <script type="application/ld+json" data-seo-jsonld-static="true">${JSON.stringify(jsonLd)}</script>`;
    html = html.replace(/<\/head>/, `${jsonLdTag}\n  </head>`);

    const outPath =
      route.path === "/"
        ? path.join(DIST, "index.html")
        : path.join(DIST, route.path.slice(1), "index.html");
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, "utf8");
    written += 1;
  }

  console.log(`[prerender] ${written} Routen als static HTML mit Meta+JSON-LD geschrieben.`);
}

main().catch((err) => {
  console.error("[prerender] Fehler:", err);
  process.exit(1);
});
