// HINWEIS: Adresse, Telefonnummer, E-Mail und Domain sind MUSTERDATEN
// für die Pitch-Phase. Vor dem Livegang durch echte Daten ersetzen.
export const siteConfig = {
  brandName: "Gärtnermeister Dölle",
  ownerName: "Benedikt Dölle",
  ownerTitle: "Gärtnermeister",
  legalRepresentative: "Benedikt Dölle",
  domain: "https://www.gaertnermeister-doelle.de",
  email: "info@gaertnermeister-doelle.de",
  phoneDisplay: "0211 / 123 45 67",
  phoneHref: "tel:+492111234567",
  phoneRaw: "+49 211 1234567",
  whatsappHref:
    "https://wa.me/492111234567?text=Hallo%20G%C3%A4rtnermeister%20D%C3%B6lle,%20ich%20m%C3%B6chte%20eine%20Beratung%20f%C3%BCr%20meinen%20Garten%20anfragen.",
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
  serviceAreaLabel: "Düsseldorf, Meerbusch, Neuss, Ratingen, Hilden, Mettmann, Monheim & Umgebung",
  ogImage:
    "https://nightliferx.github.io/gartenmeisterei-doelle/team/gaertnermeister-buchsbaum-formschnitt-duesseldorf.jpg",
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
    image: "/team/gaertnermeister-buchsbaum-formschnitt-duesseldorf.jpg",
  },
  {
    id: "heckenschnitt",
    title: "Heckenschnitt & Formschnitt",
    description:
      "Fachgerechter Schnitt zur richtigen Zeit: Wir schneiden Hecken und Sträucher so, dass sie gesund, dicht und in Form bleiben — unter Beachtung der Schnittzeiten zum Vogelschutz.",
    highlights: ["Form- & Rückschnitt", "Dichte, gesunde Hecken", "Abtransport des Schnittguts"],
    image: "/services/heckenschnitt/heckenschnitt-buchsbaum-stihl-formschnitt-detail-duesseldorf.jpg",
  },
  {
    id: "baumschnitt",
    title: "Baumschnitt & Baumpflege",
    description:
      "Vom Obstbaumschnitt bis zum Pflegeschnitt großer Bäume: Wir schneiden fachgerecht, erhalten gesunde Kronen und entfernen Totholz — inklusive Entsorgung.",
    highlights: ["Obstbaum- & Kronenschnitt", "Totholz-Entfernung", "Schnitt zur richtigen Jahreszeit"],
    image: "/services/baumschnitt/baumschnitt-obstbaumschnitt-apfelbaum-gaertnermeister-duesseldorf.png",
  },
  {
    id: "rasenpflege",
    title: "Rasenpflege",
    description:
      "Dichter, gesunder Rasen braucht regelmäßige Pflege: Wir mähen, vertikutieren, düngen und säen nach — damit die Rasenfläche das ganze Jahr gut aussieht.",
    highlights: ["Mähen & Kanten stechen", "Vertikutieren & Düngen", "Nachsaat kahler Stellen"],
    image: "/services/rasenpflege/rasenpflege-sabo-rasenmaeher-person-nahaufnahme-duesseldorf.png",
  },
  {
    id: "herbst",
    title: "Laubentsorgung & Herbstputz",
    description:
      "Wenn das Laub fällt, übernehmen wir: Wege, Rasen und Beete werden gründlich vom Laub befreit — inklusive fachgerechter Entsorgung, auf Wunsch mehrmals pro Saison.",
    highlights: ["Laub entfernen & entsorgen", "Wege & Rinnen frei halten", "Termine über die ganze Saison"],
    image: "/services/herbst/laubentsorgung-stihl-laubblaeser-herbstlaub-nahaufnahme-duesseldorf.png",
  },
  {
    id: "saison",
    title: "Frühjahrs- & Winterservice",
    description:
      "Wir machen Ihren Garten fit für die Saison: im Frühjahr mit Schnitt, Bodenpflege und Startdüngung — im Herbst machen wir Pflanzen, Beete und Rasen winterfest.",
    highlights: ["Frühjahrsschnitt & Startpflege", "Garten winterfest machen", "Schutz für empfindliche Pflanzen"],
    image: "/services/fruehjahr/fruehjahrsschnitt-rosen-felco-handschere-narzissen-duesseldorf.png",
  },
  {
    id: "rollrasen",
    title: "Rollrasen legen",
    description:
      "Sofort fertiger, dichter Rasen statt monatelang auf Nachsaat warten: Wir bereiten den Boden vor, verlegen den Rollrasen fugenlos und begleiten die Anwuchspflege der ersten Wochen.",
    highlights: ["Bodenvorbereitung & Planum", "Rollrasen fugenlos verlegen", "Anwuchspflege in den ersten Wochen"],
    image: "/services/rollrasen/rollrasen-verlegen-bahnen-duesseldorf.jpg",
  },
  {
    id: "terrasse",
    title: "Terrassen- & Wegereinigung",
    description:
      "Wenn Moos, Algen und Schmutz sich zwischen den Steinen festgesetzt haben: Mit dem Kärcher K5 reinigen wir Terrassen, Einfahrten und Gartenwege fachgerecht — inklusive Sichtprüfung und Fugensand-Nachpflege.",
    highlights: ["Kärcher-Hochdruckreinigung", "Terrassen, Wege & Einfahrten", "Fugensand nach Bedarf ergänzen"],
    image: "/services/gartenpflege/terrassenreinigung-kaercher-k5-hochdruckreiniger-duesseldorf.jpg",
  },
];

// Beispielprojekte für die Pitch-Phase — nach den ersten echten Projekten
// durch eigene Vorher-/Nachher-Bilder ersetzen.
export const projects: ProjectReference[] = [
  {
    title: "Hecke am Hausweg geschnitten",
    category: "Schnitt",
    location: "Neuss",
    serviceTags: ["Heckenschnitt", "Formschnitt", "Entsorgung"],
    summary: "Formschnitt für eine gewachsene Heckenanlage rund um Haus und Gartenweg.",
    challenge: "Die Hecken waren aus der Form gewachsen und nahmen Wegen und Beeten das Licht.",
    solution: "Fachgerechter Form- und Rückschnitt mit sauberer Kante und Abtransport des Schnittguts.",
    result: "Dichte, gleichmäßige Hecken, die den Garten wieder rahmen",
    beforeImage: "/references/vorher-heckenschnitt-hausweg-neuss.jpg",
    afterImage: "/references/nachher-heckenschnitt-hausweg-neuss.jpg",
    beforeAlt: "Überwachsene Hecke, die den Plattenweg zum Hauseingang zuwächst",
    afterAlt: "Dieselbe Hecke nach dem Formschnitt: gerade Oberkante und der Weg wieder frei",
  },
  {
    title: "Vorgartenhecke neu in Form",
    category: "Schnitt",
    location: "Meerbusch",
    serviceTags: ["Heckenschnitt", "Rückschnitt", "Entsorgung"],
    summary: "Eine über die Vorgartenmauer gewachsene Hecke wurde wieder auf Maß gebracht.",
    challenge: "Die Hecke war so breit geworden, dass sie über die Mauer auf den Gehweg ragte und die Fenster verschattete.",
    solution: "Kräftiger Rückschnitt auf Mauerhöhe plus Aufbau einer geraden Oberkante und senkrechter Flanke.",
    result: "Ein freier Gehweg und wieder Licht an der Hausfront",
    beforeImage: "/references/vorher-heckenschnitt-vorgarten-meerbusch.jpg",
    afterImage: "/references/nachher-heckenschnitt-vorgarten-meerbusch.jpg",
    beforeAlt: "Breit gewachsene Vorgartenhecke, die über die Mauer auf den Gehweg ragt",
    afterAlt: "Dieselbe Hecke nach dem Rückschnitt: gerade Oberkante, Gehweg wieder frei",
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
    beforeAlt: "Verwilderter Reihenhausgarten mit hohem Gras, Unkraut im Weg und ungeschnittenen Sträuchern",
    afterAlt: "Derselbe Garten nach der Grundpflege: gemähter Rasen, freier Plattenweg, saubere Beetkanten",
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
    afterAlt: "Fachgerecht geschnittener Apfelbaum mit lichter, gleichmäßig aufgebauter Krone über dem Rasen",
  },
  {
    title: "Rollrasen neu verlegt",
    category: "Pflege",
    location: "Meerbusch",
    serviceTags: ["Bodenvorbereitung", "Rollrasen", "Startpflege"],
    summary: "Rollrasen auf einer alten, vermoosten Fläche neu verlegt — ab dem ersten Tag begehbar.",
    challenge: "Die alte Rasenfläche war vermoost, lückig und ließ sich mit Nachsaat nicht mehr retten.",
    solution: "Alte Grasnarbe abgefräst, Boden feinplaniert und gedüngt, hochwertigen Rollrasen versetzt verlegt und gewalzt — inklusive Bewässerungsplan für die ersten Wochen.",
    result: "Dichte, belastbare Rasenfläche vom ersten Tag an — statt einer Saison Nachsaat.",
    beforeImage: "/references/vorher-rasen.jpg",
    afterImage: "/references/nachher-rasen.jpg",
    beforeAlt: "Vermooste, lückige Rasenfläche vor dem Rollrasen-Verlegen",
    afterAlt: "Frisch verlegter, sattgrüner Rollrasen mit sichtbaren Bahnen",
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
  "Mettmann",
  "Haan",
  "Monheim am Rhein",
  "Dormagen",
  "Krefeld",
  "Wülfrath",
];

export const faqItems = [
  {
    question: "Welche Leistungen übernimmt die Gärtnermeister Dölle?",
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
      "In allen Stadtteilen — von Oberkassel über Kaiserswerth und Derendorf bis Benrath und Gerresheim. Dazu betreuen wir das nahe Umland, unter anderem Meerbusch, Neuss, Ratingen, Erkrath, Hilden, Langenfeld, Kaarst, Mettmann, Haan, Monheim am Rhein, Dormagen, Krefeld und Wülfrath.",
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

// Das Gartenjahr — Grundlage der Saison-Leiste und der Saison-Unterseiten.
// months: Monatsindizes (0 = Januar), in denen die Saison als „Jetzt gefragt" gilt.
// slug: URL-Fragment für /gartenpflege-<slug>-duesseldorf.
export const gartenjahr = [
  {
    season: "Frühjahr",
    slug: "fruehjahr",
    months: [2, 3, 4],
    work: "Startschnitt, Beete vorbereiten, Rasen in Schwung bringen",
    heroImage: "/team/gaertnermeister-buchsbaum-formschnitt-duesseldorf.jpg",
    heroAlt:
      "Gärtnermeister beim Frühjahrsschnitt am Buchsbaum in einem gepflegten Vorgarten",
    intro:
      "Wenn der Boden abtrocknet und die ersten Triebe kommen, entscheidet der Frühjahrsstart über das ganze Gartenjahr. Wir übernehmen den fachgerechten Startschnitt, bringen Rasen und Beete in Schwung und machen Ihren Garten fit für die Saison.",
    tasks: [
      {
        title: "Rückschnitt und Formschnitt",
        text: "Sträucher, Rosen und Gräser werden zurückgeschnitten, bevor sie neu austreiben. Wir schneiden zum richtigen Zeitpunkt und mit Blick auf die jeweilige Pflanze.",
      },
      {
        title: "Rasen wecken",
        text: "Vertikutieren, kahle Stellen nachsäen, Startdüngung. So wird der Rasen dicht und drückt Unkraut zurück.",
      },
      {
        title: "Beete vorbereiten",
        text: "Winterschutz entfernen, Boden lockern, kompostieren und mulchen. Grundlage für gesunde Stauden und kräftige Frühblüher.",
      },
      {
        title: "Obstbaum-Kontrolle",
        text: "Feinschnitt an Obstbäumen (soweit im Frühjahr noch sinnvoll), Wundverschluss prüfen, Baumscheibe freistellen.",
      },
    ],
    tips: [
      "Buchsbaum: erst schneiden, wenn keine Nachtfröste mehr drohen (meist ab April).",
      "Rasen erst mähen, wenn die Halme rund 8 cm hoch stehen — dann bleibt er dicht.",
      "Beete nicht zu früh freilegen: der Winterschutz schützt auch vor Spätfrost.",
    ],
  },
  {
    season: "Sommer",
    slug: "sommer",
    months: [5, 6, 7],
    work: "Hecken in Form halten, Rasen mähen, Beete pflegen",
    heroImage: "/team/heckenschnitt-stihl-motorsaege-nahaufnahme-duesseldorf.jpg",
    heroAlt: "Nahaufnahme einer Heckenschere beim sommerlichen Formschnitt",
    intro:
      "Der Sommer ist Pflegesaison. Damit Rasen dicht, Hecken in Form und Beete frisch bleiben, kommen wir in festen Intervallen — je nach Wetter, Wachstum und Absprache. So bleibt der Garten das ganze Jahr in Bestform.",
    tasks: [
      {
        title: "Hecken- und Formschnitt",
        text: "Sommerschnitt an Hecken und Formgehölzen. Der zweite Schnitt in der Saison hält Form und Dichte — unter Beachtung der Vogelschutz-Fristen.",
      },
      {
        title: "Rasenpflege",
        text: "Regelmäßiges Mähen mit sauberer Schnittkante, bei Trockenheit angepasste Schnitthöhe. Auf Wunsch Düngung und Bewässerungs-Check.",
      },
      {
        title: "Beetpflege",
        text: "Verblühtes ausputzen, Unkraut jäten, Stauden bei Bedarf teilen, Mulch nachziehen. Kübelpflanzen bekommen frische Erde.",
      },
      {
        title: "Wasser und Hitze",
        text: "Bewässerungshinweise, Schattenspender, empfindliche Pflanzen absichern. In Hitzephasen kürzere Intervalle statt weniger Wasser.",
      },
    ],
    tips: [
      "Rasen bei Hitze auf 5–6 cm mähen — schützt die Grasnarbe vor dem Austrocknen.",
      "Hecken lieber morgens oder abends schneiden, nie in praller Mittagssonne.",
      "Nach dem Gießen 1 cm Mulch auflegen — hält die Feuchte länger im Beet.",
    ],
  },
  {
    season: "Herbst",
    slug: "herbst",
    months: [8, 9, 10],
    work: "Laub entsorgen, letzter Schnitt, Garten winterfest machen",
    heroImage: "/references/nachher-obstbaum.jpg",
    heroAlt:
      "Gärtner beim Obstbaumschnitt in einem herbstlichen Garten mit Fallobst",
    intro:
      "Im Herbst geht es um zwei Dinge: den letzten Schnitt vor dem Winter und das saubere Beseitigen von Laub. Wir übernehmen Laubberäumung, Herbst­schnitt und alles, was den Garten winterfest macht.",
    tasks: [
      {
        title: "Laubentsorgung",
        text: "Rasen, Wege und Rinnen werden gründlich vom Laub befreit — auf Wunsch mehrmals über die Saison. Entsorgung inklusive.",
      },
      {
        title: "Herbstschnitt",
        text: "Letzter Formschnitt an Hecken, Rückschnitt von Stauden und mehrjährigen Gräsern, wo es sinnvoll ist. Vieles bleibt bewusst bis zum Frühjahr stehen — als Winterschutz und Lebensraum.",
      },
      {
        title: "Obstbaum-Pflegeschnitt",
        text: "An Kern- und Steinobst der Auslichtungsschnitt nach der Ernte. Totholz raus, Krone locker halten, Fruchtholz gezielt fördern.",
      },
      {
        title: "Winterschutz",
        text: "Empfindliche Kübelpflanzen einwintern, Rosen anhäufeln, Vlies für frostempfindliche Beete. Wasserhähne und Leitungen frostsicher machen.",
      },
    ],
    tips: [
      "Laub auf dem Rasen liegen lassen kostet die Grasnarbe Licht — regelmäßig abnehmen.",
      "Immergrüne (Kirschlorbeer, Buchs) an frostfreien Tagen bei Trockenheit gießen.",
      "Ein Teil des Laubs kommt in die Beete — natürlicher Winterschutz für Stauden.",
    ],
  },
  {
    season: "Winter",
    slug: "winter",
    months: [11, 0, 1],
    work: "Obstbaum- und Gehölzschnitt, Planung fürs neue Gartenjahr",
    heroImage: "/services/winter/winterschnitt-hecke-gaertnermeister-doelle-duesseldorf.png",
    heroAlt:
      "Winterschnitt an einer kahlen Hecke in Düsseldorf — Gärtnermeister Benedikt Dölle bei der Winterarbeit",
    intro:
      "Der Winter ist keine Pause — jetzt wird geschnitten, geplant und vorbereitet. Ohne Laub sieht man die Struktur der Bäume, das ist der beste Zeitpunkt für den Formschnitt. Und der Räum- und Streudienst gehört im Rheinland dazu.",
    tasks: [
      {
        title: "Obstbaum- und Gehölzschnitt",
        text: "Bester Zeitpunkt für Winterschnitt an Obstbäumen, Ziergehölzen und Formhecken (frostfreie Tage). Klare Kronenstruktur, gesunder Neuaustrieb im Frühjahr.",
      },
      {
        title: "Winterservice",
        text: "Räum- und Streudienst für Gehwege, Einfahrten und Zugänge nach der Räum- und Streupflicht. Feste Einsatzzeiten, Streugut inklusive.",
      },
      {
        title: "Planung fürs neue Jahr",
        text: "Beetplanung, Neupflanzungen, größere Pflegeprojekte — jetzt in Ruhe besprechen und für die Saison einplanen.",
      },
      {
        title: "Werkzeug und Technik",
        text: "Scharfe Klingen, gewartete Geräte, saubere Technik. Wir kommen im Frühjahr mit Ausrüstung, die einsatzbereit ist.",
      },
    ],
    tips: [
      "Obstbaumschnitt an frostfreien Tagen — nicht bei starkem Dauerfrost.",
      "Immergrüne bei Trockenfrost gießen: sie verdunsten weiter über die Blätter.",
      "Kübelpflanzen brauchen Winterlicht — nicht komplett im Dunkeln überwintern.",
    ],
  },
];

const MONTH_NAMES = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

// months sind in Saison-Reihenfolge angegeben (Winter: [11, 0, 1]).
export const monthRange = (months: number[]) =>
  `${MONTH_NAMES[months[0]]} – ${MONTH_NAMES[months[months.length - 1]]}`;
