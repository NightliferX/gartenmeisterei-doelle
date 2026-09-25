// Daten für die SEO-Unterseiten: eine Seite pro Leistung und pro Stadtteil/Umlandort.
// Routen werden in App.tsx aus diesen Arrays generiert.

export type ServicePage = {
  slug: string;
  serviceId: string; // verweist auf services[].id in siteContent.ts
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  included: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  // Optional: eigenes Hero-Bild der Unterseite (sonst services[].image)
  heroImage?: string;
  heroAlt?: string;
  // Optional: Detailbilder unter dem Einstiegstext
  gallery?: { src: string; alt: string; caption: string }[];
};

export type AreaPage = {
  slug: string;
  name: string;
  kind: "Stadtteil" | "Umland";
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "gartenpflege-duesseldorf",
    serviceId: "gartenpflege",
    metaTitle: "Gartenpflege Düsseldorf | Gartenmeisterei Dölle – Meisterbetrieb",
    metaDescription:
      "Regelmäßige Gartenpflege in Düsseldorf vom Gärtnermeister: Rasen, Hecken, Beete und Saisonarbeiten — zuverlässig nach Plan, auf Wunsch als Pflegevertrag. Kostenlose Erstberatung.",
    h1: "Gartenpflege in Düsseldorf — dauerhaft gepflegt vom Meisterbetrieb",
    intro: [
      "Ein Garten sieht nur dann das ganze Jahr gut aus, wenn die richtige Arbeit zur richtigen Zeit passiert. Genau das übernehmen wir: Als Gärtnermeister-Betrieb pflegen wir Gärten in ganz Düsseldorf und im nahen Umland — regelmäßig, zuverlässig und mit einem festen Ansprechpartner.",
      "Ob wöchentlicher Rasenschnitt, saisonale Beetpflege oder die komplette Betreuung im Pflegevertrag: Sie bestimmen den Umfang, wir kümmern uns um den Rest. Nach jedem Termin bleibt Ihr Garten aufgeräumt zurück — Schnittgut und Grünabfall nehmen wir direkt mit.",
    ],
    included: [
      { title: "Rasen-, Beet- und Strauchpflege", text: "Mähen, Kanten stechen, jäten, schneiden — die Grundpflege, die den Unterschied macht." },
      { title: "Feste Pflegetermine", text: "Wir kommen nach Plan, nicht nach Zuruf. Sie müssen an nichts denken." },
      { title: "Pflegeverträge", text: "Für Privatgärten und Gewerbeobjekte: klar vereinbarter Umfang zum planbaren Preis." },
      { title: "Entsorgung inklusive", text: "Schnittgut, Laub und Grünabfall nehmen wir nach jedem Termin mit." },
    ],
    heroImage: "/services/gartenpflege/gartenpflege-beetpflege-gaertnermeister-lavendel-hortensien-duesseldorf.jpg",
    heroAlt: "Gärtnermeister bei der Beetpflege an Lavendel und Hortensien in einem Düsseldorfer Vorgarten",
    gallery: [
      {
        src: "/services/rasenpflege/rasenpflege-sabo-rasenmaeher-reihenhaus-vorgarten-duesseldorf.jpg",
        alt: "Rasenmäher beim Mähen einer Vorgartenfläche in Düsseldorf",
        caption: "Rasen mähen und Kanten stechen — bei jedem Pflegetermin.",
      },
      {
        src: "/services/gartenpflege/beetpflege-lavendel-rueckschnitt-handschere-nahaufnahme-duesseldorf.png",
        alt: "Rückschnitt von Lavendel mit der Handschere, Nahaufnahme",
        caption: "Beete werden von Hand gepflegt, nicht pauschal zurückgeschnitten.",
      },
      {
        src: "/services/gartenpflege/gaertnermeister-buchsbaum-formschnitt-duesseldorf.jpg",
        alt: "Formschnitt an einem Buchsbaum im Vorgarten",
        caption: "Sträucher und Formgehölze bleiben das ganze Jahr in Form.",
      },
      {
        src: "/services/gartenpflege/gartenpflege-beetpflege-lavendel-hortensien-vorgarten-duesseldorf.jpg",
        alt: "Gepflegter Vorgarten mit Lavendel und Hortensien nach der Beetpflege",
        caption: "Das Ergebnis: ein Vorgarten, der ohne eigenen Aufwand gepflegt bleibt.",
      },
    ],
    faq: [
      {
        question: "Was kostet regelmäßige Gartenpflege in Düsseldorf?",
        answer:
          "Das hängt von Gartengröße und Umfang ab. Nach der kostenlosen Erstberatung vor Ort erhalten Sie ein klares Angebot — beim Pflegevertrag mit festem, planbarem Preis pro Termin oder Saison.",
      },
      {
        question: "Wie oft sollte ein Garten gepflegt werden?",
        answer:
          "Für die meisten Gärten hat sich ein Rhythmus von zwei bis vier Wochen in der Saison bewährt, ergänzt um Frühjahrs- und Herbsttermine. Wir stimmen den Plan auf Ihren Garten ab.",
      },
    ],
  },
  {
    slug: "heckenschnitt-duesseldorf",
    serviceId: "heckenschnitt",
    metaTitle: "Heckenschnitt Düsseldorf | Gartenmeisterei Dölle – Formschnitt vom Profi",
    metaDescription:
      "Heckenschnitt in Düsseldorf vom Gärtnermeister: Form- und Rückschnitt zur richtigen Zeit, saubere Kanten, Abtransport inklusive. Jetzt kostenlose Beratung anfragen.",
    h1: "Heckenschnitt in Düsseldorf — saubere Form, gesunde Hecke",
    intro: [
      "Eine gut geschnittene Hecke rahmt den Garten und schützt die Privatsphäre — eine schlecht geschnittene wird von Jahr zu Jahr breiter, kahler und unförmiger. Wir schneiden Hecken fachgerecht: mit geraden Kanten, leicht konischem Aufbau und zum richtigen Zeitpunkt im Jahr.",
      "Wichtig zu wissen: Zwischen 1. März und 30. September sind radikale Rückschnitte zum Schutz brütender Vögel gesetzlich eingeschränkt — schonende Form- und Pflegeschnitte sind erlaubt. Wir beraten Sie, welcher Schnitt wann sinnvoll ist.",
    ],
    included: [
      { title: "Form- und Pflegeschnitt", text: "Gerade Kanten und dichte Flächen — von Liguster über Kirschlorbeer bis Eibe." },
      { title: "Rückschnitt & Verjüngung", text: "Aus der Form gewachsene Hecken holen wir schrittweise wieder in Form." },
      { title: "Schnitt zur richtigen Zeit", text: "Terminplanung unter Beachtung von Vogelschutz und Pflanzengesundheit." },
      { title: "Abtransport inklusive", text: "Das Schnittgut nehmen wir mit — Ihr Garten bleibt sauber zurück." },
    ],
    faq: [
      {
        question: "Wann ist die beste Zeit für den Heckenschnitt?",
        answer:
          "Der kräftige Rückschnitt gehört in den Spätwinter (bis Ende Februar), der Formschnitt je nach Art in den Juni und bei Bedarf ein zweites Mal im Spätsommer. Wir planen die Termine passend zur Heckenart.",
      },
      {
        question: "Schneiden Sie auch sehr hohe oder lange Hecken?",
        answer:
          "Ja. Auch hohe Hecken und lange Grundstücksgrenzen schneiden wir mit der passenden Technik sicher und gleichmäßig. Bei der Besichtigung schätzen wir Aufwand und Preis realistisch ein.",
      },
    ],
  },
  {
    slug: "baumschnitt-duesseldorf",
    serviceId: "baumschnitt",
    metaTitle: "Baumschnitt Düsseldorf | Gartenmeisterei Dölle – Obstbaum- & Kronenschnitt",
    metaDescription:
      "Fachgerechter Baumschnitt in Düsseldorf: Obstbaumschnitt, Kronenpflege, Totholz-Entfernung — vom Gärtnermeister, inklusive Entsorgung. Kostenlose Erstberatung.",
    h1: "Baumschnitt in Düsseldorf — gesunde Bäume, sichere Kronen",
    intro: [
      "Bäume verzeihen falsche Schnitte jahrelang nicht. Deshalb schneiden wir nach Fachregeln: die Krone lichten statt kappen, Totholz entfernen, Wunden klein halten — damit der Baum gesund bleibt und sicher steht.",
      "Vom Obstbaum im Reihenhausgarten bis zum alten Einzelbaum: Wir beurteilen den Zustand vor Ort, empfehlen den passenden Schnitt und führen ihn zur richtigen Jahreszeit aus. Das Schnittgut nehmen wir mit.",
    ],
    included: [
      { title: "Obstbaumschnitt", text: "Erhaltungs- und Verjüngungsschnitt für mehr Gesundheit und Ertrag." },
      { title: "Kronen- und Pflegeschnitt", text: "Lichten, einkürzen, aufasten — fachgerecht statt radikal gekappt." },
      { title: "Totholz-Entfernung", text: "Für Sicherheit über Wegen, Terrassen und Spielbereichen." },
      { title: "Beratung zur Nachpflanzung", text: "Wenn ein Baum nicht zu halten ist, beraten wir zum passenden Ersatz." },
    ],
    faq: [
      {
        question: "Wann sollten Obstbäume geschnitten werden?",
        answer:
          "Kernobst wie Apfel und Birne meist im Spätwinter, Steinobst wie Kirsche direkt nach der Ernte im Sommer. Wir sagen Ihnen für jeden Baum den richtigen Zeitpunkt.",
      },
      {
        question: "Übernehmen Sie auch Fällungen?",
        answer:
          "Kleinere Fällungen im Garten übernehmen wir inklusive Abtransport. Wichtig: In Düsseldorf schützt die Baumschutzsatzung viele Bäume ab einem bestimmten Stammumfang — wir klären vorab, ob eine Genehmigung nötig ist.",
      },
    ],
  },
  {
    slug: "rasenpflege-duesseldorf",
    serviceId: "rasenpflege",
    metaTitle: "Rasenpflege Düsseldorf | Gartenmeisterei Dölle – Vertikutieren & Nachsaat",
    metaDescription:
      "Rasenpflege in Düsseldorf vom Gärtnermeister: Mähen, Vertikutieren, Düngen und Nachsaat für einen dichten, gesunden Rasen. Kostenlose Erstberatung vor Ort.",
    h1: "Rasenpflege in Düsseldorf — dichter Rasen statt Moos und Lücken",
    intro: [
      "Moos, kahle Stellen, braune Flecken: Die meisten Rasenprobleme entstehen durch verdichteten Boden, falsches Mähen und fehlende Nährstoffe. Mit dem richtigen Pflegeprogramm wird aus einer müden Fläche wieder ein dichter, belastbarer Rasen.",
      "Wir übernehmen die komplette Rasenpflege — vom regelmäßigen Schnitt über Vertikutieren und Düngen bis zur Nachsaat kahler Stellen. Auf Wunsch als festes Rasenprogramm über die ganze Saison.",
    ],
    included: [
      { title: "Mähen & Kanten stechen", text: "Regelmäßiger Schnitt in der richtigen Höhe — die Basis für dichten Wuchs." },
      { title: "Vertikutieren", text: "Entfernt Moos und Rasenfilz, damit Luft und Wasser wieder an die Wurzeln kommen." },
      { title: "Düngen nach Saison", text: "Frühjahrs-, Sommer- und Herbstdüngung, abgestimmt auf Ihren Boden." },
      { title: "Nachsaat & Regeneration", text: "Kahle Stellen schließen wir gezielt mit passendem Saatgut." },
    ],
    faq: [
      {
        question: "Wann lohnt sich Vertikutieren?",
        answer:
          "Ideal sind Frühjahr (April/Mai) und früher Herbst, wenn der Rasen aktiv wächst und sich schnell erholt. Stark vermooste Flächen kombinieren wir mit Düngung und Nachsaat.",
      },
      {
        question: "Mein Rasen ist stark vermoost — muss er komplett neu?",
        answer:
          "Meist nicht. Mit Vertikutieren, gezielter Düngung und Nachsaat lässt sich die vorhandene Fläche in einer Saison sichtbar regenerieren — deutlich günstiger als eine Neuanlage.",
      },
    ],
  },
  {
    slug: "laubentsorgung-duesseldorf",
    serviceId: "herbst",
    metaTitle: "Laubentsorgung Düsseldorf | Gartenmeisterei Dölle – Herbstputz vom Profi",
    metaDescription:
      "Laub entfernen und entsorgen in Düsseldorf: Rasen, Wege und Beete gründlich vom Laub befreit — auf Wunsch mehrmals pro Saison. Jetzt Termin sichern.",
    h1: "Laubentsorgung in Düsseldorf — bevor Rasen und Wege leiden",
    intro: [
      "Liegengebliebenes Laub ist mehr als ein Schönheitsproblem: Auf dem Rasen erstickt es das Gras, auf Wegen wird es rutschig, in Rinnen und Abläufen sorgt es für Staunässe. Im Herbst zählt deshalb Regelmäßigkeit.",
      "Wir befreien Rasen, Beete, Wege und Einfahrten gründlich vom Laub und entsorgen es fachgerecht — als einmaliger Herbstputz oder mit mehreren festen Terminen über die Laubsaison.",
    ],
    included: [
      { title: "Laub entfernen", text: "Von Rasen, Beeten, Wegen, Terrassen und Einfahrten — gründlich und zügig." },
      { title: "Rinnen & Abläufe", text: "Wir halten Wasserabläufe frei, bevor Staunässe Schäden anrichtet." },
      { title: "Fachgerechte Entsorgung", text: "Das Laub nehmen wir mit — keine vollen Biotonnen, keine Fahrten zum Wertstoffhof." },
      { title: "Saison-Termine", text: "Auf Wunsch mehrere Termine von Oktober bis Dezember, damit es dauerhaft gepflegt bleibt." },
    ],
    faq: [
      {
        question: "Wie oft sollte Laub entfernt werden?",
        answer:
          "Auf Rasenflächen möglichst alle ein bis zwei Wochen während des Laubfalls — sonst drohen gelbe, erstickte Stellen. Für Wege gilt: je häufiger, desto sicherer.",
      },
      {
        question: "Nehmen Sie das Laub auch mit?",
        answer:
          "Ja, die Entsorgung ist bei uns immer inklusive. Ihr Garten und Ihre Tonnen bleiben frei.",
      },
    ],
  },
  {
    slug: "winterservice-duesseldorf",
    serviceId: "saison",
    metaTitle: "Garten winterfest machen Düsseldorf | Gartenmeisterei Dölle",
    metaDescription:
      "Garten winterfest machen in Düsseldorf: Herbstschnitt, Winterschutz für Pflanzen und Frühjahrs-Startpflege vom Gärtnermeister. Kostenlose Beratung anfragen.",
    h1: "Garten winterfest machen — und im Frühjahr stark starten",
    intro: [
      "Was im Herbst versäumt wird, kostet im Frühjahr doppelt: erfrorene Kübelpflanzen, verfilzter Rasen, überalterte Stauden. Mit dem richtigen Saisonabschluss übersteht Ihr Garten den Winter gesund — und startet im Frühjahr ohne Rückstand.",
      "Wir übernehmen beides: den kompletten Herbstabschluss mit letztem Schnitt, Laub und Winterschutz, und im Frühjahr den Startschnitt mit Bodenpflege und Startdüngung. Alles in je einem festen Termin.",
    ],
    included: [
      { title: "Herbstschnitt", text: "Stauden, Sträucher und Rosen — was jetzt geschnitten gehört, kommt in Form." },
      { title: "Winterschutz", text: "Kübelpflanzen, empfindliche Gehölze und Beete werden fachgerecht geschützt." },
      { title: "Frühjahrsschnitt & Startpflege", text: "Rückschnitt, Beete vorbereiten, Startdüngung — der Garten kommt in Schwung." },
      { title: "Ein Termin, alles erledigt", text: "Sie buchen den Saisonservice, wir bringen Material und nehmen Grünabfall mit." },
    ],
    faq: [
      {
        question: "Wann sollte der Garten winterfest gemacht werden?",
        answer:
          "Ideal ist der Zeitraum von Ende Oktober bis Anfang Dezember, vor dem ersten harten Frost. Für den Frühjahrsstart kommen wir je nach Wetter ab März.",
      },
      {
        question: "Was gehört alles zum Winterfest-Machen?",
        answer:
          "Je nach Garten: letzter Rasenschnitt, Laub, Rückschnitt von Stauden und Sommerblühern, Winterschutz für empfindliche Pflanzen und Kübel, Entleeren von Außenwasserleitungen. Wir stellen das Paket passend zusammen.",
      },
    ],
  },
];

export const areaPages: AreaPage[] = [
  {
    slug: "gartenpflege-oberkassel",
    name: "Düsseldorf-Oberkassel",
    kind: "Stadtteil",
    metaTitle: "Gartenpflege Oberkassel | Gartenmeisterei Dölle – Gärtner linksrheinisch",
    metaDescription:
      "Gartenpflege in Düsseldorf-Oberkassel: Hecken, Rasen, Bäume und Saisonservice vom Gärtnermeister — kurze Wege linksrheinisch, kostenlose Erstberatung.",
    h1: "Gartenpflege in Oberkassel",
    intro: [
      "Altbau mit Vorgarten, gewachsene Hecken, gepflegte Innenhöfe: Die Gärten linksrheinisch in Oberkassel, Niederkassel und Lörick haben Charakter — und verdienen Pflege, die dazu passt.",
      "Wir betreuen Gärten in Oberkassel mit festen Terminen und kurzen Wegen: vom Heckenschnitt an der Grundstücksgrenze über die Rasenpflege bis zum kompletten Pflegevertrag.",
    ],
  },
  {
    slug: "gartenpflege-kaiserswerth",
    name: "Düsseldorf-Kaiserswerth",
    kind: "Stadtteil",
    metaTitle: "Gartenpflege Kaiserswerth | Gartenmeisterei Dölle – Meisterbetrieb im Norden",
    metaDescription:
      "Gartenpflege in Düsseldorf-Kaiserswerth und Wittlaer: große Gärten, alte Bäume, gepflegte Hecken — vom Gärtnermeister mit festen Pflegeterminen.",
    h1: "Gartenpflege in Kaiserswerth",
    intro: [
      "Im Düsseldorfer Norden — Kaiserswerth, Wittlaer, Angermund — stehen viele große Gärten mit altem Baumbestand. Genau hier zählt fachgerechter Schnitt: für gesunde Kronen, sichere Wege und Hecken in Form.",
      "Wir übernehmen die regelmäßige Pflege ebenso wie einzelne Einsätze — vom Obstbaumschnitt bis zum Herbstputz mit Laubentsorgung.",
    ],
  },
  {
    slug: "gartenpflege-benrath",
    name: "Düsseldorf-Benrath",
    kind: "Stadtteil",
    metaTitle: "Gartenpflege Benrath | Gartenmeisterei Dölle – Gärtner im Düsseldorfer Süden",
    metaDescription:
      "Gartenpflege in Düsseldorf-Benrath, Urdenbach und Garath: Rasen, Hecken und Saisonservice vom Gärtnermeister. Kostenlose Erstberatung im Garten.",
    h1: "Gartenpflege in Benrath",
    intro: [
      "Der Düsseldorfer Süden rund um Benrath, Urdenbach und Hellerhof ist geprägt von Einfamilienhäusern mit Gärten, die im Alltag oft zu kurz kommen. Wir sorgen dafür, dass sie trotzdem dauerhaft gepflegt aussehen.",
      "Ob regelmäßiger Rasenschnitt, Heckenpflege oder der komplette Saisonservice: Wir kommen nach Plan und hinterlassen den Garten aufgeräumt.",
    ],
  },
  {
    slug: "gartenpflege-gerresheim",
    name: "Düsseldorf-Gerresheim",
    kind: "Stadtteil",
    metaTitle: "Gartenpflege Gerresheim | Gartenmeisterei Dölle – Gärtner im Düsseldorfer Osten",
    metaDescription:
      "Gartenpflege in Düsseldorf-Gerresheim und Umgebung: Hecken- und Baumschnitt, Rasenpflege und Laubservice vom Gärtnermeister-Betrieb.",
    h1: "Gartenpflege in Gerresheim",
    intro: [
      "Zwischen Altstadtkern und Waldrand: In Gerresheim, Ludenberg und Hubbelrath wachsen Gärten oft kräftiger als anderswo — der Übergang zum Grünen bringt Laub, Wildwuchs und viel Schnittarbeit mit sich.",
      "Wir halten dagegen: mit fachgerechtem Schnitt, regelmäßiger Pflege und einem Laubservice, der im Herbst zuverlässig kommt.",
    ],
  },
  {
    slug: "gartenpflege-meerbusch",
    name: "Meerbusch",
    kind: "Umland",
    metaTitle: "Gartenpflege Meerbusch | Gartenmeisterei Dölle – Gärtnermeister aus Düsseldorf",
    metaDescription:
      "Gartenpflege in Meerbusch — Büderich, Osterath, Lank: große Gärten in Meisterhand. Feste Pflegetermine, kostenlose Erstberatung, kurze Anfahrt aus Düsseldorf.",
    h1: "Gartenpflege in Meerbusch",
    intro: [
      "Von Büderich bis Lank-Latum: Meerbusch gehört zu den grünsten Wohnlagen der Region — mit entsprechend großen Gärten, Hecken und Rasenflächen.",
      "Als Meisterbetrieb aus dem benachbarten Düsseldorf betreuen wir Gärten in ganz Meerbusch: regelmäßig im Pflegevertrag oder projektweise vom Heckenschnitt bis zur Rasenregeneration.",
    ],
  },
  {
    slug: "gartenpflege-neuss",
    name: "Neuss",
    kind: "Umland",
    metaTitle: "Gartenpflege Neuss | Gartenmeisterei Dölle – Gärtnermeister für Neuss",
    metaDescription:
      "Gartenpflege in Neuss vom Gärtnermeister: Rasen, Hecken, Bäume und Saisonservice — zuverlässig, mit Entsorgung inklusive. Jetzt Beratung anfragen.",
    h1: "Gartenpflege in Neuss",
    intro: [
      "Direkt über die Rheinbrücke: Neuss liegt für uns auf kurzem Weg. Wir pflegen hier Privatgärten und kleinere Gewerbeflächen — vom Reihenhausgarten bis zum Grundstück mit altem Baumbestand.",
      "Sie bekommen feste Termine, klare Absprachen und einen Garten, der nach jedem Einsatz aufgeräumt zurückbleibt.",
    ],
  },
  {
    slug: "gartenpflege-ratingen",
    name: "Ratingen",
    kind: "Umland",
    metaTitle: "Gartenpflege Ratingen | Gartenmeisterei Dölle – Meisterbetrieb aus Düsseldorf",
    metaDescription:
      "Gartenpflege in Ratingen: Heckenschnitt, Baumpflege, Rasen und Winterservice vom Gärtnermeister — feste Termine, faire Preise, Entsorgung inklusive.",
    h1: "Gartenpflege in Ratingen",
    intro: [
      "Ob Ratingen-Mitte, Hösel oder Lintorf: Die Gärten am Übergang zum Bergischen sind grün, gewachsen — und pflegeintensiv. Wir bringen sie in Form und halten sie dort.",
      "Von der einmaligen Grundpflege verwilderter Ecken bis zum dauerhaften Pflegevertrag: Sie sagen, was der Garten braucht, wir liefern das Ergebnis.",
    ],
  },
  {
    slug: "gartenpflege-hilden",
    name: "Hilden",
    kind: "Umland",
    metaTitle: "Gartenpflege Hilden | Gartenmeisterei Dölle – Gärtner für Hilden & Erkrath",
    metaDescription:
      "Gartenpflege in Hilden und Erkrath: Rasenpflege, Heckenschnitt, Laubentsorgung und Winterservice vom Gärtnermeister-Betrieb aus Düsseldorf.",
    h1: "Gartenpflege in Hilden",
    intro: [
      "Hilden und das benachbarte Erkrath erreichen wir aus Düsseldorf in wenigen Minuten — ideal für regelmäßige Pflegetermine ohne lange Anfahrtskosten.",
      "Wir übernehmen die komplette Gartenpflege: Rasen, Hecken, Beete, Bäume und den Saisonservice im Herbst und Frühjahr. Zuverlässig, sauber und mit einem festen Ansprechpartner.",
    ],
  },
];
