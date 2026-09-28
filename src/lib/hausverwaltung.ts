// Inhalte der B2B-Seite für Hausverwaltungen, WEG und Gewerbeobjekte.
// Bewusst in einer eigenen Datei, damit siteContent.ts schlank bleibt.
//
// WICHTIG: Hier stehen ausschließlich Zusagen, die Benedikt heute halten kann.
// Keine Objektzahlen, keine Quadratmeter, keine Referenzkunden — die Liste
// `objektReferenzen` bleibt leer, bis echte Objekte freigegeben sind; der
// Abschnitt blendet sich dann automatisch ein.

export type ObjektLeistung = {
  title: string;
  text: string;
};

export type ObjektTyp = {
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
};

export type ObjektReferenz = {
  objekt: string; // z. B. „Wohnanlage mit 24 Einheiten"
  ort: string;
  umfang: string;
  turnus: string;
  ergebnis: string;
  image?: string;
  imageAlt?: string;
};

/** Was eine Verwaltung von uns bekommt — die Argumente, die im Angebot zählen. */
export const objektVorteile: ObjektLeistung[] = [
  {
    title: "Ein Ansprechpartner",
    text: "Sie sprechen mit dem Gärtnermeister selbst, nicht mit einer Zentrale. Wer Ihr Objekt betreut, kennt es auch.",
  },
  {
    title: "Feste Turnusse statt Zuruf",
    text: "Der Pflegeplan steht vor der Saison: Welche Leistung, in welchem Abstand, an welchen Flächen. Sie müssen nichts nachhalten.",
  },
  {
    title: "Nachweis nach jedem Einsatz",
    text: "Datum, ausgeführte Leistung, Besonderheiten — auf Wunsch mit Fotos. Damit können Sie in der Eigentümerversammlung belegen, was passiert ist.",
  },
  {
    title: "Abrechnung je Objekt",
    text: "Jedes Objekt bekommt seine eigene Rechnung mit klaren Positionen — passend zur Kostenstelle und zur Jahresabrechnung.",
  },
  {
    title: "Blick auf die Verkehrssicherheit",
    text: "Bei jedem Termin fällt uns auf, was auffallen sollte: Totholz über Wegen, überhängende Äste, zugewachsene Beleuchtung. Sie bekommen Bescheid, bevor daraus ein Problem wird.",
  },
  {
    title: "Entsorgung inklusive",
    text: "Schnittgut, Laub und Grünabfall nehmen wir nach jedem Termin mit. Keine vollen Tonnen im Hof, keine Extrafahrten.",
  },
];

/** Leistungen, die am Objekt typischerweise zusammenkommen. */
export const objektLeistungen: ObjektLeistung[] = [
  {
    title: "Grünflächen und Rasen",
    text: "Mähen im festen Rhythmus, Kanten stechen, Nachsaat kahler Stellen — auch auf größeren zusammenhängenden Flächen.",
  },
  {
    title: "Hecken und Sträucher",
    text: "Form- und Rückschnitt zum richtigen Zeitpunkt, Sichtachsen und Wege frei halten, Vogelschutzzeiten eingeplant.",
  },
  {
    title: "Bäume und Totholz",
    text: "Kronen- und Pflegeschnitt, Totholz über Wegen, Stellplätzen und Spielbereichen entfernen.",
  },
  {
    title: "Laub, Wege und Rinnen",
    text: "Über die Herbstsaison in mehreren Durchgängen: Laub von Wegen, Zufahrten und Rasen, Entwässerungsrinnen frei halten.",
  },
  {
    title: "Saisonwechsel",
    text: "Frühjahrsstart mit Schnitt und Bodenpflege, im Herbst Rückschnitt und Winterschutz für empfindliche Pflanzungen.",
  },
  {
    title: "Wege- und Terrassenreinigung",
    text: "Gehwege, Zufahrten und Innenhöfe bei Bedarf mit dem Hochdruckreiniger, Fugensand nach Bedarf ergänzt.",
  },
];

/** Objektarten, für die der Zuschnitt passt. */
export const objektTypen: ObjektTyp[] = [
  {
    title: "Mehrfamilienhaus",
    text: "Vorgarten, Hofseite, Zuwegung und Mülleinhausung — meist ein kurzer Turnus über die Saison und zwei Schnitttermine für die Hecke.",
    image: "/objekte/mehrfamilienhaus-vorgarten-hecke-duesseldorf.webp",
    imageAlt:
      "Gepflegter Vorgarten eines Mehrfamilienhauses mit geschnittener Hecke und sauberem Zugang zur Haustür",
  },
  {
    title: "Wohnanlage und WEG",
    text: "Mehrere Hauseingänge, Rasenflächen zwischen den Häusern, Baumbestand. Pflegeplan je Fläche, Nachweise für die Verwaltung.",
    image: "/objekte/wohnanlage-weg-hauseingaenge-rasenflaeche-duesseldorf.webp",
    imageAlt:
      "Wohnanlage mit mehreren Hauseingängen, gemähter Rasenfläche und gepflegten Staudenbeeten",
  },
  {
    title: "Gewerbeobjekt",
    text: "Eingangsbereich, Parkplatzränder und Grünstreifen. Termine früh am Tag oder außerhalb der Öffnungszeiten, wenn es der Betrieb verlangt.",
    image: "/objekte/gewerbeobjekt-gruenstreifen-eingang-duesseldorf.webp",
    imageAlt:
      "Gepflegter Grünstreifen mit geschnittener Hecke vor dem Eingang eines Bürogebäudes",
  },
];

/** Ablauf, wie ihn eine Verwaltung erwartet. */
export const objektAblauf = [
  {
    title: "Objektbegehung",
    text: "Wir gehen das Objekt mit Ihnen ab, erfassen Flächen, Bestand und Problemstellen. Kostenlos und unverbindlich.",
  },
  {
    title: "Leistungsverzeichnis",
    text: "Sie bekommen schriftlich, welche Leistung an welcher Fläche in welchem Turnus erbracht wird — mit Preis je Position.",
  },
  {
    title: "Rahmenvertrag mit Saisonplan",
    text: "Nach Ihrer Freigabe legen wir die Termine für die ganze Saison fest. Sie wissen im Februar, wann im August gemäht wird.",
  },
  {
    title: "Einsatz mit Nachweis",
    text: "Nach jedem Termin erhalten Sie den Nachweis. Auffälligkeiten melden wir sofort, statt sie im Jahresbericht zu verstecken.",
  },
];

export const objektFaq = [
  {
    question: "Betreuen Sie mehrere Objekte einer Verwaltung gleichzeitig?",
    answer:
      "Ja. Sinnvoll ist ein gemeinsamer Saisonplan über alle Objekte, damit Anfahrten gebündelt werden — abgerechnet wird trotzdem je Objekt getrennt.",
  },
  {
    question: "Wie rechnen Sie ab?",
    answer:
      "Je Objekt, mit den Positionen aus dem Leistungsverzeichnis. Wahlweise pro Einsatz oder als gleichbleibende Monatsrate über die Saison, wenn Sie lieber mit festen Beträgen planen.",
  },
  {
    question: "Bekommen wir einen Nachweis für die Eigentümerversammlung?",
    answer:
      "Ja. Zu jedem Einsatz gibt es Datum, ausgeführte Leistung und auf Wunsch Fotos. Am Saisonende fassen wir das für Ihre Abrechnung zusammen.",
  },
  {
    question: "Können Sie kurzfristig einspringen, wenn etwas liegen bleibt?",
    answer:
      "In der Regel ja, wenn es sich um ein Objekt handelt, das wir ohnehin betreuen. Für Sturmschäden oder umgestürzte Äste versuchen wir, am selben oder nächsten Tag da zu sein.",
  },
  {
    question: "Übernehmen Sie auch den Winterdienst?",
    answer:
      "Nein. Räum- und Streudienst gehört nicht zu unserem Leistungsumfang — wir machen den Garten winterfest, kümmern uns aber nicht um Schnee und Eis auf Ihren Wegen.",
  },
];

/**
 * Referenzobjekte — bleibt leer, bis Benedikt echte Objekte freigibt.
 * Sobald hier Einträge stehen, erscheint der Abschnitt auf der Seite.
 */
export const objektReferenzen: ObjektReferenz[] = [];

/** Bühnenbild unter dem Seitenkopf. */
export const objektHeroImage = "/objekte/wohnanlage-gepflegte-gruenflaeche-duesseldorf.webp";
export const objektHeroAlt =
  "Gemähte Rasenfläche zwischen zwei Mehrfamilienhäusern, geschnittene Hecke und gepflasterter Weg zu den Hauseingängen";
