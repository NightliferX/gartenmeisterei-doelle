export const siteConfig = {
  brandName: "Haus&Garten Profi",
  ownerName: "Robert Jovanovic",
  legalRepresentative: "Robert Jovanovic",
  domain: "https://www.hausgartenprofi.eu",
  email: "info@hausgartenprofi.eu",
  phoneDisplay: "0 21 81 / 123 45 67",
  phoneHref: "tel:+4921811234567",
  phoneRaw: "+49 2181 1234567",
  whatsappHref:
    "https://wa.me/4921811234567?text=Hallo%20Haus%26Garten%20Profi,%20ich%20m%C3%B6chte%20eine%20Beratung%20f%C3%BCr%20mein%20Projekt%20anfragen.",
  streetAddress: "Am Hammerwerk 38",
  postalCode: "41515",
  city: "Grevenbroich",
  region: "Nordrhein-Westfalen",
  country: "DE",
  openingHoursDisplay: "Mo-Fr: 8:00 - 18:00 Uhr",
  openingHours: [
    { dayOfWeek: "Monday", opens: "08:00", closes: "18:00" },
    { dayOfWeek: "Tuesday", opens: "08:00", closes: "18:00" },
    { dayOfWeek: "Wednesday", opens: "08:00", closes: "18:00" },
    { dayOfWeek: "Thursday", opens: "08:00", closes: "18:00" },
    { dayOfWeek: "Friday", opens: "08:00", closes: "18:00" },
  ],
  responsePromise: "Antwort meist innerhalb von 24 Stunden",
  consultationPromise: "Kostenlose Vor-Ort-Beratung",
  serviceAreaLabel: "Grevenbroich, Neuss, Dormagen, Juchen, Rommerskirchen, Koln & Umgebung",
  ogImage:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
};

export type Testimonial = {
  name: string;
  displayName: string;
  location: string;
  project: string;
  quote: string;
  rating: number;
  projectType?: string;
  year?: string;
  isVerified: boolean;
  avatar?: string;
};

export type ProjectReference = {
  title: string;
  category: "Haus" | "Garten" | "Innen";
  location: string;
  serviceTags: string[];
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
};

export const navLinks = [
  { label: "Start", href: "/#start" },
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Referenzen", href: "/#projekte" },
  { label: "Uber Uns", href: "/#ueber-uns" },
  { label: "Einsatzgebiete", href: "/#einsatzgebiete" },
  { label: "Kontakt", href: "/#kontakt" },
];

export const trustItems = [
  "Grevenbroich & Rhein-Kreis Neuss",
  "Antwort meist innerhalb von 24 Stunden",
  "Kostenlose Erstberatung vor Ort",
  "Saubere Ausfuhrung aus einer Hand",
];

export const valueProps = [
  {
    title: "Haus & Sanierung",
    text: "Fassade, Renovierung, Innenausbau und Modernisierung mit klarer Projektbegleitung.",
  },
  {
    title: "Garten & Aussenbereich",
    text: "Terrassen, Pflaster, Zaune, Bepflanzung und funktionale Aussenanlagen fur jedes Grundstuck.",
  },
  {
    title: "Direkter Draht",
    text: "Kein Callcenter: Sie sprechen direkt mit dem Inhaber und erhalten schnelle Ruckmeldung.",
  },
];

export const services = [
  {
    id: "haussanierung",
    title: "Haussanierung",
    description:
      "Von der Teilmodernisierung bis zur Komplettsanierung: Wir koordinieren Arbeiten sauber, termintreu und mit Blick aufs Gesamtbild.",
    highlights: ["Fassade & Aussenhaut", "Dach- und Kellerbereiche", "Risssanierung & Anstrich"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "gartengestaltung",
    title: "Gartengestaltung",
    description:
      "Wir gestalten Garten und Hofe so, dass sie alltagstauglich, pflegeleicht und optisch hochwertig wirken.",
    highlights: ["Planung & Bepflanzung", "Mauern, Beete, Rasen", "Regen- und Wegekonzepte"],
    image: "/services/gartengestaltung.png",
  },
  {
    id: "innenausbau",
    title: "Innenausbau",
    description:
      "Wohnraume, Flure, Bader und Nutzbereiche modernisieren wir in einer klaren Linie und mit sauberer Ausfuhrung.",
    highlights: ["Trockenbau & Malerarbeiten", "Boden- und Oberflachen", "Bad- und Wohnraumumbau"],
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pflasterarbeiten",
    title: "Pflasterarbeiten",
    description:
      "Einfahrten, Wege und Hofe bauen wir robust, sauber eingefasst und passend zum Stil Ihres Hauses.",
    highlights: ["Einfahrten & Hofe", "Wege & Eingangsbereiche", "Entwasserung mitgedacht"],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "terrassenbau",
    title: "Terrassenbau",
    description:
      "Terrassen entstehen bei uns als echter Wohnraum im Freien, abgestimmt auf Nutzung, Sonne und Materialwirkung.",
    highlights: ["Stein- oder Plattenbelage", "Gefalle & Unterbau", "Anschluss an Garten und Haus"],
    image: "/services/terrassenbau.png",
  },
  {
    id: "zaunbau",
    title: "Zaunbau & Sichtschutz",
    description:
      "Funktion, Sicherheit und ein sauberer Abschluss des Grundstucks stehen beim Zaun- und Sichtschutzbau im Mittelpunkt.",
    highlights: ["Holz, Metall oder Verbund", "Tore & Zugange", "Sichtschutz passend zur Umgebung"],
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
  },
];

export const projects: ProjectReference[] = [
  {
    title: "Fassadensanierung mit neuem Farbkonzept",
    category: "Haus",
    location: "Grevenbroich",
    serviceTags: ["Fassade", "Ausbesserung", "Anstrich"],
    summary: "Fassadensanierung fur ein Wohnhaus mit sichtbar aufgewerteter Aussenwirkung.",
    challenge: "Uneinheitliche Oberflachen und ein insgesamt gealterter Eindruck im Eingangsbereich.",
    solution: "Ausbesserung, saubere Vorbereitung und ein neues, abgestimmtes Farbkonzept.",
    result: "Frischer Gesamteindruck und verbesserter Wetterschutz",
    beforeImage:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    beforeAlt: "Wohnhaus vor der Fassadensanierung in Grevenbroich",
    afterAlt: "Modernisierte Hausfassade nach der Sanierung in Grevenbroich",
  },
  {
    title: "Terrasse mit Pflaster und klaren Gartenachsen",
    category: "Garten",
    location: "Juchen",
    serviceTags: ["Terrasse", "Pflaster", "Gartenwege"],
    summary: "Neuordnung eines Aussenbereichs mit ruhiger Linienfuhrung und hochwertiger Nutzung.",
    challenge: "Der Garten wirkte unstrukturiert und bot wenig alltagstaugliche Aufenthaltsflache.",
    solution: "Terrassenflache, Randsteine und Wege wurden neu definiert und sauber verbunden.",
    result: "Mehr Nutzflache und ruhiger, hochwertiger Aussenbereich",
    beforeImage:
      "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=900&q=80",
    beforeAlt: "Gartenbereich vor der Neugestaltung in Juchen",
    afterAlt: "Neu angelegte Terrasse mit Pflaster und Gartenachsen in Juchen",
  },
  {
    title: "Badmodernisierung mit neuer Raumaufteilung",
    category: "Innen",
    location: "Neuss",
    serviceTags: ["Bad", "Trockenbau", "Oberflachen"],
    summary: "Badumbau mit hellerem Raumgefuhl und klarerer Aufteilung fur den Alltag.",
    challenge: "Beengte Situation und veraltete Flachen im Badbereich.",
    solution: "Neue Oberflachen, verbesserte Raumaufteilung und modernisierte Details.",
    result: "Zeitgemasses Bad mit hellerem Raumgefuhl",
    beforeImage:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=80",
    beforeAlt: "Badezimmer vor der Modernisierung in Neuss",
    afterAlt: "Modernisiertes Badezimmer nach dem Umbau in Neuss",
  },
  {
    title: "Innenausbau fur ein Einfamilienhaus",
    category: "Innen",
    location: "Dormagen",
    serviceTags: ["Innenausbau", "Malerarbeiten", "Boden"],
    summary: "Wohnbereich modernisiert mit einheitlicher Gestaltung vom Eingang bis zum Aufenthaltsraum.",
    challenge: "Unruhiger Bestand mit wenig gestalterischem Zusammenhang zwischen den Zimmern.",
    solution: "Neue Farben, abgestimmte Bodenwirkung und sauberer Feinschliff in den Ubergangen.",
    result: "Einheitlicher Look vom Eingangsbereich bis zum Wohnraum",
    beforeImage: "/references/vorher-innenausbau-einfamilienhaus.webp",
    afterImage: "/references/nachher-innenausbau-einfamilienhaus.png",
    beforeAlt: "Rohbauzustand vor dem Innenausbau im Einfamilienhaus",
    afterAlt: "Fertig ausgebauter Wohnbereich nach dem Innenausbau im Einfamilienhaus",
  },
  {
    title: "Hof- und Einfahrtsbereich neu gepflastert",
    category: "Garten",
    location: "Rommerskirchen",
    serviceTags: ["Pflaster", "Einfahrt", "Entwasserung"],
    summary: "Neu strukturierter Hof- und Zufahrtsbereich mit pflegeleichter Nutzung.",
    challenge: "Unebene Flachen und wenig klare Wegefuhrung im Einfahrtsbereich.",
    solution: "Neuer Unterbau, Pflasterung und mitgedachte Entwasserung fur langlebige Nutzung.",
    result: "Pflegeleichte Zufahrt mit sauberer Linienfuhrung",
    beforeImage: "/references/vorher-hof-einfahrtsbereich-gepflastert.png",
    afterImage: "/references/nachher-hof-einfahrtsbereich-gepflastert.jpg",
    beforeAlt: "Hof- und Einfahrtsbereich vor den Pflasterarbeiten",
    afterAlt: "Neu gepflasterter Hof- und Einfahrtsbereich nach der Umsetzung",
  },
  {
    title: "Gewerbeflache modernisiert und aufgefrischt",
    category: "Haus",
    location: "Koln",
    serviceTags: ["Gewerbesanierung", "Renovierung", "Oberflachen"],
    summary: "Reprasentative Gewerbeflache mit ruhigerer Optik und sauber koordinierten Arbeiten.",
    challenge: "Veraltete Wirkung und hoher Abstimmungsbedarf wahrend der laufenden Nutzung.",
    solution: "Renovierung der Flachen mit klarer Koordination und einheitlichem Auftritt.",
    result: "Reprasentativer Auftritt fur Kunden und Mitarbeitende",
    afterImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    afterAlt: "Modernisierte Gewerbeflache nach der Renovierung in Koln",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Oliver Hartmann",
    displayName: "Oliver H. aus Grevenbroich",
    location: "Grevenbroich",
    quote:
      "Die Abstimmung lief direkt, die Baustelle war sauber organisiert und das Ergebnis hat unsere Erwartungen deutlich ubertroffen.",
    rating: 5,
    project: "Haussanierung",
    projectType: "Fassade und Aussenbereich",
    year: "2025",
    isVerified: true,
  },
  {
    name: "Familie Schneider",
    displayName: "Familie S. aus Neuss",
    location: "Neuss",
    quote:
      "Von der Gartenplanung bis zur letzten Kante der Terrasse war alles strukturiert, freundlich und wirklich professionell umgesetzt.",
    rating: 5,
    project: "Gartengestaltung",
    projectType: "Terrasse und Gartenwege",
    year: "2025",
    isVerified: true,
  },
  {
    name: "Thomas M.",
    displayName: "Thomas M. aus Dormagen",
    location: "Dormagen",
    quote:
      "Klare Kommunikation, gute Ideen im Innenausbau und eine Ausfuhrung, die ordentlich und termintreu war. Genau so wunscht man sich das.",
    rating: 5,
    project: "Innenausbau",
    projectType: "Wohnbereich und Feinschliff",
    year: "2024",
    isVerified: true,
  },
  {
    name: "Murat M.",
    displayName: "Murat M. aus Rommerskirchen",
    location: "Rommerskirchen",
    quote:
      "Der Hof war vorher kaum noch ordentlich nutzbar. Nach der Neuverlegung wirkt alles strukturierter und deutlich hochwertiger.",
    rating: 5,
    project: "Pflasterarbeiten",
    projectType: "Hof und Einfahrt",
    year: "2025",
    isVerified: false,
  },
  {
    name: "Sabine K.",
    displayName: "Sabine K. aus Juchen",
    location: "Juchen",
    quote:
      "Wir wollten endlich einen Aussenbereich, der gepflegt aussieht und sich gut nutzen lasst. Genau das wurde sauber umgesetzt.",
    rating: 5,
    project: "Terrassenbau",
    projectType: "Terrasse und Gartenstruktur",
    year: "2024",
    isVerified: false,
  },
  {
    name: "Claudia R.",
    displayName: "Claudia R. aus Grevenbroich",
    location: "Grevenbroich",
    quote:
      "Wir wollten einen verlasslichen Ansprechpartner fur Haus und Aussenbereich. Die Abstimmung war schnell und das Ergebnis wirkt jetzt deutlich hochwertiger.",
    rating: 5,
    project: "Sanierung und Aussenbereich",
    projectType: "Eingang und Fassade",
    year: "2025",
    isVerified: false,
  },
  {
    name: "Daniel P.",
    displayName: "Daniel P. aus Monchengladbach",
    location: "Monchengladbach",
    quote:
      "Besonders gut fanden wir, dass sauber gearbeitet und alles nachvollziehbar erklart wurde. So stellt man sich eine Zusammenarbeit vor.",
    rating: 5,
    project: "Innenausbau",
    projectType: "Wohnbereich und Oberflachen",
    year: "2024",
    isVerified: false,
  },
  {
    name: "Andrea W.",
    displayName: "Andrea W. aus Grevenbroich",
    location: "Grevenbroich",
    quote:
      "Vom ersten Termin bis zur finalen Ausfuhrung war alles klar abgestimmt. Besonders angenehm war, dass wir immer direkt jemanden erreicht haben.",
    rating: 5,
    project: "Renovierung",
    projectType: "Eingangsbereich und Fassade",
    year: "2025",
    isVerified: false,
  },
  {
    name: "Patrick L.",
    displayName: "Patrick L. aus Dormagen",
    location: "Dormagen",
    quote:
      "Die Terrasse und die Wege sehen jetzt nicht nur besser aus, sondern funktionieren im Alltag endlich richtig. Das war fur uns der grosse Unterschied.",
    rating: 5,
    project: "Terrassenbau",
    projectType: "Terrasse und Gartenwege",
    year: "2025",
    isVerified: false,
  },
  {
    name: "Heike B.",
    displayName: "Heike B. aus Neuss",
    location: "Neuss",
    quote:
      "Saubere Arbeit, verlassliche Kommunikation und ein Ergebnis, das genau zu unserem Haus passt. Gerade bei der Abstimmung lief alles angenehm unkompliziert.",
    rating: 5,
    project: "Haussanierung",
    projectType: "Fassade und Details",
    year: "2024",
    isVerified: false,
  },
  {
    name: "Familie T.",
    displayName: "Familie T. aus Juchen",
    location: "Juchen",
    quote:
      "Wir hatten vorher viele Einzelfragen zu Garten, Wegen und Zugang. Am Ende war alles stimmig gelost und wir mussten nicht mehrere Firmen koordinieren.",
    rating: 5,
    project: "Gartengestaltung",
    projectType: "Wege, Beete und Zugang",
    year: "2025",
    isVerified: false,
  },
];

export const serviceAreas = [
  "Grevenbroich",
  "Neuss",
  "Dormagen",
  "Rommerskirchen",
  "Juchen",
  "Monchengladbach",
  "Koln-Nord",
  "Dusseldorf-Sud",
];

export const faqItems = [
  {
    question: "Welche Projekte ubernimmt Haus&Garten Profi?",
    answer:
      "Wir ubernehmen Haus- und Gartensanierung, Innenausbau, Fassadenarbeiten, Pflaster- und Terrassenbau sowie kleinere bis mittlere Gewerbesanierungen im Raum Grevenbroich und Umgebung.",
  },
  {
    question: "Wie schnell erhalten wir eine Ruckmeldung auf eine Anfrage?",
    answer:
      "In der Regel melden wir uns innerhalb von 24 Stunden zuruck, um Ihr Projekt kurz einzuordnen und einen Beratungstermin oder ein erstes Telefonat abzustimmen.",
  },
  {
    question: "Arbeiten Sie auch in Nachbarorten von Grevenbroich?",
    answer:
      "Ja. Neben Grevenbroich betreuen wir unter anderem Projekte in Neuss, Dormagen, Rommerskirchen, Juchen, Monchengladbach sowie im nordlichen Kolner und sudlichen Dusseldorfer Raum.",
  },
  {
    question: "Konnen mehrere Leistungen kombiniert werden?",
    answer:
      "Ja. Viele Projekte verbinden Haus, Garten und Innenausbau. Genau da liegt unser Vorteil: Sie bekommen eine abgestimmte Umsetzung aus einer Hand statt viele Einzelabsprachen.",
  },
];

export const legalLinks = {
  impressum: "/impressum",
  datenschutz: "/datenschutz",
};
