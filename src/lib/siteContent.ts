// HINWEIS: Adresse, Telefonnummer, E-Mail und Domain sind MUSTERDATEN
// für die Pitch-Phase. Vor dem Livegang durch echte Daten ersetzen.
export const siteConfig = {
  brandName: "Gartenmeisterei Dölle",
  ownerName: "Benedikt Dölle",
  ownerTitle: "Gärtnermeister",
  legalRepresentative: "Benedikt Dölle",
  domain: "https://www.gartenmeisterei-doelle.de",
  email: "info@gartenmeisterei-doelle.de",
  phoneDisplay: "0211 / 123 45 67",
  phoneHref: "tel:+492111234567",
  phoneRaw: "+49 211 1234567",
  whatsappHref:
    "https://wa.me/492111234567?text=Hallo%20Gartenmeisterei%20D%C3%B6lle,%20ich%20m%C3%B6chte%20eine%20Beratung%20f%C3%BCr%20meinen%20Garten%20anfragen.",
  streetAddress: "Musterstraße 12",
  postalCode: "40210",
  city: "Düsseldorf",
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
  consultationPromise: "Kostenlose Erstberatung in Ihrem Garten",
  serviceAreaLabel: "Düsseldorf, Meerbusch, Neuss, Ratingen, Hilden & Umgebung",
  ogImage:
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1600&q=80",
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
  category: "Schnitt" | "Pflege" | "Saison";
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
  { label: "Projekte", href: "/#projekte" },
  { label: "Über Uns", href: "/#ueber-uns" },
  { label: "Einsatzgebiete", href: "/#einsatzgebiete" },
  { label: "Kontakt", href: "/#kontakt" },
];

export const trustItems = [
  "Meisterbetrieb: Gärtnermeister Benedikt Dölle",
  "Vor Ort in Düsseldorf & Umgebung",
  "Antwort meist innerhalb von 24 Stunden",
  "Kostenlose Erstberatung in Ihrem Garten",
];

export const valueProps = [
  {
    title: "Dauerhafte Gartenpflege",
    text: "Regelmäßige Pflege nach Plan: Rasen, Hecken und Beete — auf Wunsch als fester Pflegevertrag mit einem Ansprechpartner.",
  },
  {
    title: "Schnitt vom Profi",
    text: "Hecken, Sträucher und Bäume werden fachgerecht und zur richtigen Jahreszeit geschnitten — inklusive Abtransport.",
  },
  {
    title: "Meister-Qualität",
    text: "Beratung und Ausführung direkt vom Gärtnermeister — mit klaren Absprachen und einem sauberen Ergebnis.",
  },
];

export const services = [
  {
    id: "gartenpflege",
    title: "Gartenpflege",
    description:
      "Regelmäßige Pflege hält Ihren Garten dauerhaft in Form: Wir übernehmen Rasen, Beete, Sträucher und saisonale Arbeiten — zuverlässig nach Plan, auf Wunsch als Pflegevertrag.",
    highlights: ["Rasen-, Beet- & Strauchpflege", "Feste Pflegetermine nach Plan", "Pflegeverträge für Privat & Gewerbe"],
    image:
      "https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "heckenschnitt",
    title: "Heckenschnitt & Formschnitt",
    description:
      "Fachgerechter Schnitt zur richtigen Zeit: Wir schneiden Hecken und Sträucher so, dass sie gesund, dicht und in Form bleiben — unter Beachtung der Schnittzeiten zum Vogelschutz.",
    highlights: ["Form- & Rückschnitt", "Dichte, gesunde Hecken", "Abtransport des Schnittguts"],
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "baumschnitt",
    title: "Baumschnitt & Baumpflege",
    description:
      "Vom Obstbaumschnitt bis zum Pflegeschnitt großer Bäume: Wir schneiden fachgerecht, erhalten gesunde Kronen und entfernen Totholz — inklusive Entsorgung.",
    highlights: ["Obstbaum- & Kronenschnitt", "Totholz-Entfernung", "Schnitt zur richtigen Jahreszeit"],
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "rasenpflege",
    title: "Rasenpflege",
    description:
      "Dichter, gesunder Rasen braucht regelmäßige Pflege: Wir mähen, vertikutieren, düngen und säen nach — damit die Rasenfläche das ganze Jahr gut aussieht.",
    highlights: ["Mähen & Kanten stechen", "Vertikutieren & Düngen", "Nachsaat kahler Stellen"],
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "herbst",
    title: "Laubentsorgung & Herbstputz",
    description:
      "Wenn das Laub fällt, übernehmen wir: Wege, Rasen und Beete werden gründlich vom Laub befreit — inklusive fachgerechter Entsorgung, auf Wunsch mehrmals pro Saison.",
    highlights: ["Laub entfernen & entsorgen", "Wege & Rinnen frei halten", "Termine über die ganze Saison"],
    image:
      "https://images.unsplash.com/photo-1611843467160-25afb8df1074?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "saison",
    title: "Frühjahrs- & Winterservice",
    description:
      "Wir machen Ihren Garten fit für die Saison: im Frühjahr mit Schnitt, Bodenpflege und Startdüngung — im Herbst machen wir Pflanzen, Beete und Rasen winterfest.",
    highlights: ["Frühjahrsschnitt & Startpflege", "Garten winterfest machen", "Schutz für empfindliche Pflanzen"],
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  },
];

// Beispielprojekte für die Pitch-Phase — nach den ersten echten Projekten
// durch eigene Vorher-/Nachher-Bilder ersetzen.
export const projects: ProjectReference[] = [
  {
    title: "Hecken in Form gebracht",
    category: "Schnitt",
    location: "Düsseldorf-Oberkassel",
    serviceTags: ["Heckenschnitt", "Formschnitt", "Entsorgung"],
    summary: "Formschnitt für eine gewachsene Heckenanlage rund um Haus und Gartenweg.",
    challenge: "Die Hecken waren aus der Form gewachsen und nahmen Wegen und Beeten das Licht.",
    solution: "Fachgerechter Form- und Rückschnitt mit sauberer Kante und Abtransport des Schnittguts.",
    result: "Dichte, gleichmäßige Hecken, die den Garten wieder rahmen",
    beforeImage: "/references/vorher-hecke.jpg",
    afterImage: "/references/nachher-hecke.jpg",
    beforeAlt: "Ausgewachsene, unförmige Hecke vor dem Formschnitt",
    afterAlt: "Akkurat in Form geschnittene Hecke nach dem Heckenschnitt",
  },
  {
    title: "Verwilderten Garten zurückgeschnitten",
    category: "Pflege",
    location: "Düsseldorf-Gerresheim",
    serviceTags: ["Rückschnitt", "Grundpflege", "Entsorgung"],
    summary: "Ein länger sich selbst überlassener Garten wurde wieder nutzbar gemacht.",
    challenge: "Beete, Sträucher und Rasen waren so zugewachsen, dass der Garten kaum noch nutzbar war.",
    solution: "Kompletter Rückschnitt, Grundpflege der Beete und Neuaufbau der Rasenkanten.",
    result: "Ein aufgeräumter Garten als Basis für die regelmäßige Pflege",
    beforeImage: "/references/vorher-verwildert.jpg",
    afterImage: "/references/nachher-verwildert.jpg",
    beforeAlt: "Zugewachsener Garten vor dem Rückschnitt",
    afterAlt: "Aufgeräumter Garten mit gemähtem Rasen und freiem Weg nach der Grundpflege",
  },
  {
    title: "Obstbäume fachgerecht geschnitten",
    category: "Schnitt",
    location: "Düsseldorf-Kaiserswerth",
    serviceTags: ["Obstbaumschnitt", "Kronenpflege", "Totholz"],
    summary: "Winterschnitt für ältere Obstbäume mit Blick auf Gesundheit und Ertrag.",
    challenge: "Die Kronen waren dicht und ungepflegt, die Bäume trugen kaum noch Früchte.",
    solution: "Fachgerechter Erhaltungs- und Verjüngungsschnitt mit Entfernung des Totholzes.",
    result: "Lichte, gesunde Kronen und wieder deutlich mehr Ertrag",
    beforeImage: "/references/vorher-obstbaum.jpg",
    afterImage: "/references/nachher-obstbaum.jpg",
    beforeAlt: "Ungeschnittener Apfelbaum mit dichter, verwachsener Krone",
    afterAlt: "Fachgerecht geschnittener Apfelbaum mit lichter Krone",
  },
  {
    title: "Rasenfläche regeneriert",
    category: "Pflege",
    location: "Meerbusch",
    serviceTags: ["Vertikutieren", "Düngen", "Nachsaat"],
    summary: "Regeneration einer vermoosten Rasenfläche zur dichten Grünfläche.",
    challenge: "Der Rasen war vermoost, lückig und erholte sich trotz Mähens nicht mehr.",
    solution: "Vertikutieren, gezielte Düngung und Nachsaat der kahlen Stellen.",
    result: "Dichte, belastbare Rasenfläche über die ganze Saison",
    beforeImage: "/references/vorher-rasen.jpg",
    afterImage: "/references/nachher-rasen.jpg",
    beforeAlt: "Vermooste, lückige Rasenfläche vor der Regeneration",
    afterAlt: "Dichte, sattgrüne Rasenfläche nach Vertikutieren, Düngung und Nachsaat",
  },
  {
    title: "Garten winterfest gemacht",
    category: "Saison",
    location: "Ratingen",
    serviceTags: ["Winterfest", "Laub", "Pflanzenschutz"],
    summary: "Kompletter Herbstservice: Laub, Rückschnitt und Winterschutz in einem Termin.",
    challenge: "Vor dem Winter standen Laub, letzter Schnitt und der Schutz empfindlicher Pflanzen an.",
    solution: "Laubentsorgung, Herbstschnitt und Winterschutz für Kübel- und Beetpflanzen.",
    result: "Ein winterfester Garten, der im Frühjahr gesund austreibt",
    afterImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
    afterAlt: "Herbstlicher Garten nach dem Winterfest-Service",
  },
  {
    title: "Privatgarten im Pflegevertrag",
    category: "Pflege",
    location: "Düsseldorf-Benrath",
    serviceTags: ["Pflegevertrag", "Rasenpflege", "Beetpflege"],
    summary: "Ganzjährige Betreuung eines Privatgartens mit festen Pflegeterminen.",
    challenge: "Den Eigentümern fehlte die Zeit, den großen Garten dauerhaft selbst zu pflegen.",
    solution: "Fester Pflegeplan mit Rasen-, Hecken- und Beetpflege über die ganze Saison.",
    result: "Ein dauerhaft gepflegter Garten ohne eigenen Aufwand",
    afterImage:
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=900&q=80",
    afterAlt: "Regelmäßige Beetpflege im Privatgarten durch die Gärtnerin",
  },
];

// Noch keine echten Kundenstimmen — der Bewertungs-Bereich bleibt ausgeblendet,
// bis erste Google-Rezensionen für den Betrieb vorliegen.
export const testimonials: Testimonial[] = [];

export const serviceAreas = [
  "Düsseldorf",
  "Meerbusch",
  "Neuss",
  "Ratingen",
  "Erkrath",
  "Hilden",
  "Langenfeld",
  "Kaarst",
];

export const faqItems = [
  {
    question: "Welche Leistungen übernimmt die Gartenmeisterei Dölle?",
    answer:
      "Wir übernehmen alles rund um die Gartenpflege: Hecken- und Baumschnitt, Rasenpflege, Beetpflege, Laubentsorgung, Frühjahrsschnitt und das Winterfest-Machen des Gartens — in Düsseldorf und der näheren Umgebung.",
  },
  {
    question: "Bieten Sie regelmäßige Gartenpflege im Pflegevertrag an?",
    answer:
      "Ja. Viele Kunden lassen ihren Garten dauerhaft von uns betreuen: mit festen Pflegeterminen über die Saison, klar vereinbartem Umfang und einem Ansprechpartner. So bleibt der Garten das ganze Jahr in Form.",
  },
  {
    question: "Nehmen Sie Schnittgut und Laub direkt mit?",
    answer:
      "Ja. Die fachgerechte Entsorgung von Schnittgut und Laub gehört bei uns dazu — Ihr Garten bleibt nach jedem Termin sauber und aufgeräumt zurück.",
  },
  {
    question: "In welchen Stadtteilen von Düsseldorf sind Sie im Einsatz?",
    answer:
      "In allen Stadtteilen — von Oberkassel über Kaiserswerth und Derendorf bis Benrath und Gerresheim. Dazu betreuen wir das nahe Umland, unter anderem Meerbusch, Neuss, Ratingen, Erkrath, Hilden, Langenfeld und Kaarst.",
  },
  {
    question: "Was kostet die Erstberatung?",
    answer:
      "Die Erstberatung bei Ihnen im Garten ist kostenlos und unverbindlich. Wir schauen uns die Situation vor Ort an, besprechen Ihre Wünsche und Sie erhalten im Anschluss ein klares Angebot.",
  },
  {
    question: "Wie schnell bekomme ich eine Rückmeldung auf meine Anfrage?",
    answer:
      "In der Regel melden wir uns innerhalb von 24 Stunden zurück, um Ihr Anliegen kurz einzuordnen und einen Termin für die Besichtigung oder ein erstes Telefonat abzustimmen.",
  },
];

export const legalLinks = {
  impressum: "/impressum",
  datenschutz: "/datenschutz",
};

// Das Gartenjahr — Grundlage der Saison-Leiste in Design-Variante 2.
// months: Monatsindizes (0 = Januar), in denen die Saison als „Jetzt gefragt" gilt.
export const gartenjahr = [
  {
    season: "Frühjahr",
    months: [2, 3, 4],
    work: "Startschnitt, Beete vorbereiten, Rasen in Schwung bringen",
  },
  {
    season: "Sommer",
    months: [5, 6, 7],
    work: "Hecken in Form halten, Rasen mähen, Beete pflegen",
  },
  {
    season: "Herbst",
    months: [8, 9, 10],
    work: "Laub entsorgen, letzter Schnitt, Garten winterfest machen",
  },
  {
    season: "Winter",
    months: [11, 0, 1],
    work: "Obstbaum- und Gehölzschnitt, Planung fürs neue Gartenjahr",
  },
];
