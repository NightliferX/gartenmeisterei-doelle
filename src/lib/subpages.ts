// Daten für die SEO-Unterseiten: eine Seite pro Leistung und pro Stadtteil/Umlandort.
// Routen werden in App.tsx aus diesen Arrays generiert.

// Uebersetzt eine service.id aus siteContent.ts in den URL-Slug der
// zugehoerigen Leistungsseite. Zentral hier, damit Header, AreaPage
// und ServicesV8 nicht dieselbe Map dreimal pflegen.
export const serviceSlugFor = (id: string) =>
  ({
    gartenpflege: "gartenpflege",
    heckenschnitt: "heckenschnitt",
    baumschnitt: "baumschnitt",
    rasenpflege: "rasenpflege",
    herbst: "laubentsorgung",
    saison: "winterservice",
    rollrasen: "rollrasen",
    terrasse: "terrasse",
  }[id] ?? id);

export type ServicePage = {
  slug: string;
  serviceId: string; // verweist auf services[].id in siteContent.ts
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  // Optionales Bild je Punkt: dann wird die Karte zur Foto-Kachel statt Icon-Karte.
  included: { title: string; text: string; image?: string; imageAlt?: string }[];
  faq: { question: string; answer: string }[];
  // Optional: eigenes Hero-Bild der Unterseite (sonst services[].image)
  heroImage?: string;
  heroAlt?: string;
  // Optional: Hero-Bild horizontal spiegeln (falls Blickrichtung ins Layout passt).
  heroImageMirror?: boolean;
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
    slug: "gartenpflege",
    serviceId: "gartenpflege",
    metaTitle: "Gartenpflege Düsseldorf | Gärtnermeister Dölle",
    metaDescription:
      "Regelmäßige Gartenpflege in Düsseldorf vom Gärtnermeister: Rasen, Hecken, Beete und Saisonarbeiten, zuverlässig nach Plan, auf Wunsch als Pflegevertrag. Kostenlose Erstberatung.",
    h1: "Gartenpflege vom Meisterbetrieb, für Düsseldorf und Umland",
    intro: [
      "Ein Garten sieht nur dann das ganze Jahr gut aus, wenn die richtige Arbeit zur richtigen Zeit passiert. Genau das übernehmen wir: Als Gärtnermeister-Betrieb pflegen wir Gärten in ganz Düsseldorf und im nahen Umland, regelmäßig, zuverlässig und mit einem festen Ansprechpartner.",
      "Ob wöchentlicher Rasenschnitt, saisonale Beetpflege oder die komplette Betreuung im Pflegevertrag: Sie bestimmen den Umfang, wir kümmern uns um den Rest. Nach jedem Termin bleibt Ihr Garten aufgeräumt zurück, Schnittgut und Grünabfall nehmen wir direkt mit.",
    ],
    included: [
      {
        title: "Rasen-, Beet- und Strauchpflege",
        text: "Mähen, Kanten stechen, jäten, schneiden, die Grundpflege, die den Unterschied macht.",
        image: "/services/rasenpflege/rasenpflege-sabo-rasenmaeher-reihenhaus-vorgarten-duesseldorf.webp",
        imageAlt: "Gärtnermeister mäht den Rasen in einem Reihenhaus-Vorgarten in Düsseldorf",
      },
      {
        title: "Feste Pflegetermine",
        text: "Wir kommen nach Plan, nicht nach Zuruf. Sie müssen an nichts denken.",
        image: "/services/gartenpflege/beetpflege-lavendel-rueckschnitt-handschere-nahaufnahme-duesseldorf.webp",
        imageAlt: "Rückschnitt von Lavendel mit der Handschere, Nahaufnahme",
      },
      {
        title: "Pflegeverträge",
        text: "Für Privatgärten und Gewerbeobjekte: klar vereinbarter Umfang zum planbaren Preis.",
        image: "/references/nachher-hecke.webp",
        imageAlt: "Dauerhaft gepflegter Vorgarten mit sauber geschnittener Hecke und freiem Weg",
      },
      {
        title: "Entsorgung inklusive",
        text: "Schnittgut, Laub und Grünabfall nehmen wir nach jedem Termin mit.",
        image: "/services/herbst/laubentsorgung-stihl-laubblaeser-herbstlaub-nahaufnahme-duesseldorf.webp",
        imageAlt: "Laubbläser räumt Herbstlaub von der Rasenfläche, Nahaufnahme",
      },
    ],
    heroImage: "/services/gartenpflege/gartenpflege-beetpflege-gaertnermeister-lavendel-hortensien-duesseldorf.webp",
    heroAlt: "Gärtnermeister bei der Beetpflege an Lavendel und Hortensien in einem Düsseldorfer Vorgarten",
    faq: [
      {
        question: "Was kostet regelmäßige Gartenpflege in Düsseldorf?",
        answer:
          "Das hängt von Gartengröße und Umfang ab. Nach der kostenlosen Erstberatung vor Ort erhalten Sie ein klares Angebot, beim Pflegevertrag mit festem, planbarem Preis pro Termin oder Saison.",
      },
      {
        question: "Wie oft sollte ein Garten gepflegt werden?",
        answer:
          "Für die meisten Gärten hat sich ein Rhythmus von zwei bis vier Wochen in der Saison bewährt, ergänzt um Frühjahrs- und Herbsttermine. Wir stimmen den Plan auf Ihren Garten ab.",
      },
    ],
  },
  {
    slug: "heckenschnitt",
    serviceId: "heckenschnitt",
    metaTitle: "Heckenschnitt Düsseldorf | Gärtnermeister Dölle",
    metaDescription:
      "Heckenschnitt in Düsseldorf vom Gärtnermeister: Form- und Rückschnitt zur richtigen Zeit, saubere Kanten, Abtransport inklusive. Jetzt Beratung anfragen.",
    h1: "Heckenschnitt & Formschnitt, für Düsseldorf und Umland",
    intro: [
      "Eine gut geschnittene Hecke rahmt den Garten und schützt die Privatsphäre, eine schlecht geschnittene wird von Jahr zu Jahr breiter, kahler und unförmiger. Wir schneiden Hecken fachgerecht: mit geraden Kanten, leicht konischem Aufbau und zum richtigen Zeitpunkt im Jahr.",
      "Wichtig zu wissen: Zwischen 1. März und 30. September sind radikale Rückschnitte zum Schutz brütender Vögel gesetzlich eingeschränkt, schonende Form- und Pflegeschnitte sind erlaubt. Wir beraten Sie, welcher Schnitt wann sinnvoll ist.",
    ],
    heroImage: "/services/heckenschnitt/heckenschnitt-hecke-stihl-motorsaege-detail-duesseldorf.webp",
    heroAlt: "Nahaufnahme der Stihl-Heckenschere beim Formschnitt einer Hecke",
    heroImageMirror: true,
    included: [
      {
        title: "Form- und Pflegeschnitt",
        text: "Gerade Kanten und dichte Flächen, von Liguster über Kirschlorbeer bis Eibe.",
        image: "/services/heckenschnitt/heckenschnitt-buchsbaum-stihl-formschnitt-detail-duesseldorf.webp",
        imageAlt: "Heckenschere zieht eine gerade Kante über eine Buchsbaumhecke",
      },
      {
        title: "Rückschnitt & Verjüngung",
        text: "Aus der Form gewachsene Hecken holen wir schrittweise wieder in Form.",
        image: "/services/heckenschnitt/heckenschnitt-hecke-stihl-motorsaege-detail-duesseldorf.webp",
        imageAlt: "Rückschnitt einer hoch gewachsenen Hecke mit der Motorheckenschere",
      },
      {
        title: "Schnitt zur richtigen Zeit",
        text: "Terminplanung unter Beachtung von Vogelschutz und Pflanzengesundheit.",
        image: "/services/heckenschnitt/heckenrueckschnitt-spaetwinter-kahle-hecke-duesseldorf.webp",
        imageAlt: "Kräftiger Heckenrückschnitt im Spätwinter an einer kahlen Hecke",
      },
      {
        title: "Abtransport inklusive",
        text: "Das Schnittgut nehmen wir mit, Ihr Garten bleibt sauber zurück.",
        image: "/services/heckenschnitt/schnittgut-abtransport-plane-anhaenger-duesseldorf.webp",
        imageAlt: "Heckenschnittgut wird auf einer Plane zum Anhänger getragen",
      },
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
    slug: "baumschnitt",
    serviceId: "baumschnitt",
    metaTitle: "Baumschnitt Düsseldorf | Gärtnermeister Dölle",
    metaDescription:
      "Fachgerechter Baumschnitt in Düsseldorf: Obstbaumschnitt, Kronenpflege, Totholz-Entfernung, vom Gärtnermeister, inklusive Entsorgung. Kostenlose Erstberatung.",
    h1: "Baumschnitt & Baumpflege, für Düsseldorf und Umland",
    intro: [
      "Bäume verzeihen falsche Schnitte jahrelang nicht. Deshalb schneiden wir nach Fachregeln: die Krone lichten statt kappen, Totholz entfernen, Wunden klein halten, damit der Baum gesund bleibt und sicher steht.",
      "Vom Obstbaum im Reihenhausgarten bis zum alten Einzelbaum: Wir beurteilen den Zustand vor Ort, empfehlen den passenden Schnitt und führen ihn zur richtigen Jahreszeit aus. Das Schnittgut nehmen wir mit.",
    ],
    included: [
      {
        title: "Obstbaumschnitt",
        text: "Erhaltungs- und Verjüngungsschnitt für mehr Gesundheit und Ertrag.",
        image: "/services/baumschnitt/baumschnitt-obstbaum-bypass-astschere-nahaufnahme-duesseldorf.webp",
        imageAlt: "Astschere setzt einen sauberen Schnitt an einem Obstbaumast",
      },
      {
        title: "Kronen- und Pflegeschnitt",
        text: "Lichten, einkürzen, aufasten, fachgerecht statt radikal gekappt.",
        image: "/services/baumschnitt/kronenschnitt-hochentaster-baumpflege-duesseldorf.webp",
        imageAlt: "Gärtnermeister schneidet mit dem Hochentaster einen Ast in der Baumkrone",
      },
      {
        title: "Totholz-Entfernung",
        text: "Für Sicherheit über Wegen, Terrassen und Spielbereichen.",
        image: "/services/baumschnitt/totholz-handsaege-schnittflaeche-baumpflege-duesseldorf.webp",
        imageAlt: "Abgestorbener Ast wird mit der Handsäge abgesetzt, frische Schnittfläche",
      },
      {
        title: "Beratung zur Nachpflanzung",
        text: "Wenn ein Baum nicht zu halten ist, beraten wir zum passenden Ersatz.",
        image: "/services/baumschnitt/nachpflanzung-jungbaum-wurzelballen-duesseldorf.webp",
        imageAlt: "Junger Baum mit Wurzelballen wird ins Pflanzloch gestellt",
      },
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
          "Kleinere Fällungen im Garten übernehmen wir inklusive Abtransport. Wichtig: In Düsseldorf schützt die Baumschutzsatzung viele Bäume ab einem bestimmten Stammumfang, wir klären vorab, ob eine Genehmigung nötig ist.",
      },
    ],
  },
  {
    slug: "rasenpflege",
    serviceId: "rasenpflege",
    metaTitle: "Rasenpflege Düsseldorf | Gärtnermeister Dölle",
    metaDescription:
      "Rasenpflege in Düsseldorf vom Gärtnermeister: Mähen, Vertikutieren, Düngen und Nachsaat für einen dichten, gesunden Rasen. Kostenlose Erstberatung vor Ort.",
    h1: "Rasenpflege, für Düsseldorf und Umland",
    intro: [
      "Moos, kahle Stellen, braune Flecken: Die meisten Rasenprobleme entstehen durch verdichteten Boden, falsches Mähen und fehlende Nährstoffe. Mit dem richtigen Pflegeprogramm wird aus einer müden Fläche wieder ein dichter, belastbarer Rasen.",
      "Wir übernehmen die komplette Rasenpflege, vom regelmäßigen Schnitt über Vertikutieren und Düngen bis zur Nachsaat kahler Stellen. Auf Wunsch als festes Rasenprogramm über die ganze Saison.",
    ],
    heroImage: "/services/rasenpflege/rasenpflege-sabo-rasenmaeher-frontal-vorgarten-duesseldorf.webp",
    heroAlt: "Rasenmäher zieht eine frische Bahn durch einen Vorgarten in Düsseldorf",
    included: [
      {
        title: "Mähen & Kanten stechen",
        text: "Regelmäßiger Schnitt in der richtigen Höhe, die Basis für dichten Wuchs.",
        image: "/services/rasenpflege/kantenschnitt-stihl-freischneider-motorsense-rasenpflege-duesseldorf.webp",
        imageAlt: "Freischneider zieht eine saubere Rasenkante entlang der Beeteinfassung",
      },
      {
        title: "Vertikutieren",
        text: "Entfernt Moos und Rasenfilz, damit Luft und Wasser wieder an die Wurzeln kommen.",
        image: "/services/rasenpflege/vertikutieren-moosfilz-rasenpflege-duesseldorf.webp",
        imageAlt: "Vertikutierer mit Fangkorb auf der Rasenfläche, ausgekämmter Moosfilz liegt daneben",
      },
      {
        title: "Düngen nach Saison",
        text: "Frühjahrs-, Sommer- und Herbstdüngung, abgestimmt auf Ihren Boden.",
        image: "/services/rasenpflege/duengen-streuwagen-rasenduenger-rasenpflege-duesseldorf.webp",
        imageAlt: "Streuwagen verteilt Rasendünger im breiten Fächer über die Rasenfläche",
      },
      {
        title: "Nachsaat & Regeneration",
        text: "Kahle Stellen schließen wir gezielt mit passendem Saatgut.",
        image: "/services/rasenpflege/nachsaat-rasensamen-kahle-stelle-rasenpflege-duesseldorf.webp",
        imageAlt: "Behandschuhte Hand streut Rasensamen auf eine kahle, aufgeraute Erdstelle",
      },
    ],
    faq: [
      {
        question: "Wann lohnt sich Vertikutieren?",
        answer:
          "Ideal sind Frühjahr (April/Mai) und früher Herbst, wenn der Rasen aktiv wächst und sich schnell erholt. Stark vermooste Flächen kombinieren wir mit Düngung und Nachsaat.",
      },
      {
        question: "Mein Rasen ist stark vermoost, muss er komplett neu?",
        answer:
          "Meist nicht. Mit Vertikutieren, gezielter Düngung und Nachsaat lässt sich die vorhandene Fläche in einer Saison sichtbar regenerieren, deutlich günstiger als eine Neuanlage.",
      },
    ],
  },
  {
    slug: "rollrasen",
    serviceId: "rollrasen",
    metaTitle: "Rollrasen legen Düsseldorf | Gärtnermeister Dölle",
    metaDescription:
      "Rollrasen in Düsseldorf vom Gärtnermeister: Bodenvorbereitung, fugenlose Verlegung und Anwuchspflege. Sofort fertiger Rasen statt monatelang warten. Kostenlose Erstberatung.",
    h1: "Rollrasen legen, an einem Tag zum fertigen Rasen",
    intro: [
      "Wenn schnell ein fertiger Rasen her muss, nach einer Baumaßnahme, bei stark vermoosten Flächen oder vor einem geplanten Termin, ist Rollrasen die zuverlässigste Lösung. In wenigen Stunden verlegt, in zwei bis drei Wochen belastbar.",
      "Wir übernehmen alles: Wir prüfen den Untergrund, bereiten das Planum sauber vor, verlegen den Rollrasen fugenlos und begleiten die Anwuchspflege in den ersten Wochen, damit die Fläche dicht und dauerhaft schön bleibt.",
    ],
    heroImage: "/services/rollrasen/rollrasen-verlegen-bahnen-duesseldorf.webp",
    heroAlt: "Rollrasenbahn wird auf dem vorbereiteten Planum ausgerollt, daneben die bereits verlegten Bahnen",
    included: [
      {
        title: "Untergrund & Planum",
        text: "Alter Rasen entfernen, Boden lockern, Feinplanum ziehen, die Grundlage für gleichmäßigen Anwuchs.",
        image: "/services/rollrasen/feinplanum-planierrechen-bodenvorbereitung-duesseldorf.webp",
        imageAlt: "Planierrechen zieht das Feinplanum auf der vorbereiteten Erdfläche glatt",
      },
      {
        title: "Rollrasen fugenlos verlegen",
        text: "Frische Rollen von zertifizierten Züchtern, versetzt verlegt und angewalzt, keine sichtbaren Fugen.",
        image: "/services/rollrasen/rollrasen-stossfuge-verlegen-detail-duesseldorf.webp",
        imageAlt: "Zwei Rollrasenbahnen werden an der Stoßfuge dicht aneinandergedrückt",
      },
      {
        title: "Anwuchspflege",
        text: "Bewässerungshinweise, erster Schnitt zur richtigen Zeit, Düngung, wir bleiben in den ersten Wochen ansprechbar.",
        image: "/services/rollrasen/rollrasen-bewaessern-rasensprenger-duesseldorf.webp",
        imageAlt: "Rasensprenger wässert den frisch verlegten Rollrasen im Gegenlicht",
      },
      {
        title: "Kleine Flächen bis große Gärten",
        text: "Vom Vorgartenstreifen bis zum kompletten Hausgarten, wir kalkulieren fair und arbeiten sauber.",
        image: "/services/rollrasen/rollrasen-fertige-flaeche-vorgarten-duesseldorf.webp",
        imageAlt: "Fertig verlegter Rollrasen im Vorgarten mit sauberer Kante zum Weg",
      },
    ],
    faq: [
      {
        question: "Wie schnell kann Rollrasen betreten werden?",
        answer:
          "Vorsichtig nach zwei bis drei Wochen, dann sind die Wurzeln fest im Boden. In der ersten Woche nur zum Wässern betreten, danach kurz und trocken.",
      },
      {
        question: "Wann ist die beste Zeit für Rollrasen?",
        answer:
          "Verlegt werden kann von März bis November, solange der Boden frostfrei ist. Ideal sind Frühjahr und Frühherbst, weil dann Feuchtigkeit und Temperatur den Anwuchs unterstützen.",
      },
      {
        question: "Wie lange dauert das Verlegen?",
        answer:
          "Eine typische Vorgartenfläche (bis 80 m²) legen wir an einem Tag, von altem Rasen bis fertig verlegt. Größere Flächen dauern entsprechend länger, meist bleibt es aber bei ein bis zwei Arbeitstagen.",
      },
    ],
  },
  {
    slug: "laubentsorgung",
    serviceId: "herbst",
    metaTitle: "Laubentsorgung Düsseldorf | Gärtnermeister Dölle",
    metaDescription:
      "Laub entfernen und entsorgen in Düsseldorf: Rasen, Wege und Beete gründlich vom Laub befreit, auf Wunsch mehrmals pro Saison. Jetzt Termin sichern.",
    h1: "Laubentsorgung & Herbstputz, für Düsseldorf und Umland",
    intro: [
      "Liegengebliebenes Laub ist mehr als ein Schönheitsproblem: Auf dem Rasen erstickt es das Gras, auf Wegen wird es rutschig, in Rinnen und Abläufen sorgt es für Staunässe. Im Herbst zählt deshalb Regelmäßigkeit.",
      "Wir befreien Rasen, Beete, Wege und Einfahrten gründlich vom Laub und entsorgen es fachgerecht, als einmaliger Herbstputz oder mit mehreren festen Terminen über die Laubsaison.",
    ],
    heroImage: "/services/laubentsorgung/laubsaecke-anhaenger-entsorgung-duesseldorf.webp",
    heroAlt: "Gefüllte Laubsäcke werden nach dem Herbstputz in den Anhänger geladen",
    included: [
      {
        title: "Laub entfernen",
        text: "Von Rasen, Beeten, Wegen, Terrassen und Einfahrten, gründlich und zügig.",
        image: "/services/herbst/laubentsorgung-stihl-laubblaeser-herbstlaub-nahaufnahme-duesseldorf.webp",
        imageAlt: "Laubbläser räumt Herbstlaub von der Rasenfläche",
      },
      {
        title: "Rinnen & Abläufe",
        text: "Wir halten Wasserabläufe frei, bevor Staunässe Schäden anrichtet.",
        image: "/services/laubentsorgung/entwaesserungsrinne-laub-freiraeumen-duesseldorf.webp",
        imageAlt: "Nasses Herbstlaub wird von Hand aus einer Entwässerungsrinne geholt",
      },
      { title: "Fachgerechte Entsorgung", text: "Das Laub nehmen wir mit, keine vollen Biotonnen, keine Fahrten zum Wertstoffhof." },
      { title: "Saison-Termine", text: "Auf Wunsch mehrere Termine von Oktober bis Dezember, damit es dauerhaft gepflegt bleibt." },
    ],
    faq: [
      {
        question: "Wie oft sollte Laub entfernt werden?",
        answer:
          "Auf Rasenflächen möglichst alle ein bis zwei Wochen während des Laubfalls, sonst drohen gelbe, erstickte Stellen. Für Wege gilt: je häufiger, desto sicherer.",
      },
      {
        question: "Nehmen Sie das Laub auch mit?",
        answer:
          "Ja, die Entsorgung ist bei uns immer inklusive. Ihr Garten und Ihre Tonnen bleiben frei.",
      },
    ],
  },
  {
    slug: "winterservice",
    serviceId: "saison",
    metaTitle: "Garten winterfest machen | Gärtnermeister Dölle Düsseldorf",
    metaDescription:
      "Garten winterfest machen in Düsseldorf: Herbstschnitt, Winterschutz für Pflanzen und Frühjahrs-Startpflege vom Gärtnermeister. Jetzt Beratung anfragen.",
    h1: "Garten winterfest machen, und im Frühjahr stark starten",
    intro: [
      "Was im Herbst versäumt wird, kostet im Frühjahr doppelt: erfrorene Kübelpflanzen, verfilzter Rasen, überalterte Stauden. Mit dem richtigen Saisonabschluss übersteht Ihr Garten den Winter gesund, und startet im Frühjahr ohne Rückstand.",
      "Wir übernehmen beides: den kompletten Herbstabschluss mit letztem Schnitt, Laub und Winterschutz, und im Frühjahr den Startschnitt mit Bodenpflege und Startdüngung. Alles in je einem festen Termin.",
    ],
    included: [
      {
        title: "Herbstschnitt",
        text: "Stauden, Sträucher und Rosen, was jetzt geschnitten gehört, kommt in Form.",
        image: "/services/winterservice/herbstschnitt-stauden-rueckschnitt-felco-duesseldorf.webp",
        imageAlt: "Rückschnitt verblühter Stauden mit der Handschere im Herbstbeet",
      },
      {
        title: "Winterschutz",
        text: "Kübelpflanzen, empfindliche Gehölze und Beete werden fachgerecht geschützt.",
        image: "/services/winterservice/winterschutz-kuebelpflanze-jute-winterservice-duesseldorf.webp",
        imageAlt: "Kübelpflanze wird mit Jutematte eingepackt und mit Schnur gebunden",
      },
      {
        title: "Frühjahrsschnitt & Startpflege",
        text: "Rückschnitt, Beete vorbereiten, Startdüngung, der Garten kommt in Schwung.",
        image: "/services/fruehjahr/fruehjahrsschnitt-rosenschnitt-gaertnermeister-vorgarten-duesseldorf.webp",
        imageAlt: "Frühjahrsschnitt an Rosen im Vorgarten",
      },
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
  {
    slug: "terrasse",
    serviceId: "terrasse",
    metaTitle: "Terrassenreinigung Düsseldorf | Gärtnermeister Dölle",
    metaDescription:
      "Terrassen, Einfahrten und Wege mit dem Kärcher K5 fachgerecht reinigen: Moos, Algen und Schmutz raus, Fugensand nachpflegen. Für Düsseldorf und Umland.",
    h1: "Terrassen- & Wegereinigung, für Düsseldorf und Umland",
    intro: [
      "Steinterrassen, Betonwege und Klinker-Einfahrten sammeln über den Winter Moos, Algen und einen grauen Schmutzfilm, vor allem in schattigen Ecken. Wer im Frühjahr wieder auf der eigenen Terrasse sitzen will, sollte damit nicht zu lange warten.",
      "Wir reinigen mit dem Kärcher K5 gründlich und trotzdem materialschonend: Naturstein, Betonwerkstein, Klinker, Waschbeton, je nach Belag mit passender Düse und Druckstufe. Fugensand wird bei Bedarf nachgefüllt, damit die Steine stabil sitzen.",
    ],
    heroImage: "/services/gartenpflege/terrassenreinigung-kaercher-k5-hochdruckreiniger-duesseldorf.webp",
    heroAlt: "Terrassenreinigung mit dem Kärcher K5, Moos und Schmutzfilm werden von Steinplatten entfernt",
    included: [
      {
        title: "Kärcher-Hochdruckreinigung",
        text: "Wir arbeiten mit dem Kärcher K5 (mit passendem Terrassenreiniger-Aufsatz für gleichmäßiges Ergebnis ohne Streifen).",
        image: "/services/gartenpflege/terrassenreinigung-kaercher-k5-hochdruckreiniger-duesseldorf.webp",
        imageAlt: "Person mit Kärcher K5 reinigt eine Steinterrasse in einem Düsseldorfer Vorgarten",
      },
      {
        title: "Terrassen, Wege & Einfahrten",
        text: "Naturstein, Betonwerkstein, Klinker, Waschbeton, wir wählen Düse und Druck passend zum Belag, damit die Oberfläche nicht leidet.",
      },
      {
        title: "Fugensand ergänzen",
        text: "Nach der Reinigung sind Fugen oft ausgespült. Wir ergänzen Fugensand und bürsten ihn ein, für stabilen Halt und weniger Unkraut.",
      },
      {
        title: "Randflächen & Regenrinnen",
        text: "Auf Wunsch auch die Randflächen an der Hauswand, Terrassenkanten und Regenrinnen an den Terrassenabläufen.",
      },
    ],
    faq: [
      {
        question: "Wie oft sollte die Terrasse gereinigt werden?",
        answer:
          "Meist einmal im Jahr im Frühjahr reicht, je nach Lage (Schatten, Bäume in der Nähe) und Belag kann auch ein Zwischentermin im Spätsommer sinnvoll sein.",
      },
      {
        question: "Nimmt der Hochdruckreiniger die Fugen mit raus?",
        answer:
          "Nur wenn zu viel Druck auf schmalen Fugen verwendet wird. Wir nutzen den Terrassenreiniger-Aufsatz und passende Druckstufe pro Belag, Fugensand ergänzen wir am Ende, falls doch etwas ausgespült wurde.",
      },
      {
        question: "Kann man Naturstein und Terrakotta genauso reinigen?",
        answer:
          "Ja, aber mit geringerem Druck und ohne aggressive Reiniger. Bei sehr empfindlichen Belägen sprechen wir das vorher mit Ihnen ab und testen an einer kleinen Stelle.",
      },
    ],
  },
];

export const areaPages: AreaPage[] = [
  {
    slug: "gartenpflege-oberkassel",
    name: "Düsseldorf-Oberkassel",
    kind: "Stadtteil",
    metaTitle: "Gartenpflege Oberkassel | Gärtnermeister Dölle, linksrheinisch",
    metaDescription:
      "Gartenpflege in Düsseldorf-Oberkassel: Hecken, Rasen, Bäume und Saisonservice vom Gärtnermeister, kurze Wege linksrheinisch, kostenlose Erstberatung.",
    h1: "Gartenpflege in Oberkassel",
    intro: [
      "Altbau mit Vorgarten, gewachsene Hecken, gepflegte Innenhöfe: Die linksrheinischen Düsseldorfer Stadtteile Oberkassel, Niederkassel (Stadtteil von Düsseldorf, nicht zu verwechseln mit der gleichnamigen Stadt bei Bonn) und Lörick haben Charakter, und verdienen Pflege, die dazu passt.",
      "Wir betreuen Gärten in Oberkassel mit festen Terminen und kurzen Wegen: vom Heckenschnitt an der Grundstücksgrenze über die Rasenpflege bis zum kompletten Pflegevertrag.",
    ],
  },
  {
    slug: "gartenpflege-kaiserswerth",
    name: "Düsseldorf-Kaiserswerth",
    kind: "Stadtteil",
    metaTitle: "Gartenpflege Kaiserswerth | Gärtnermeister Dölle",
    metaDescription:
      "Gartenpflege in Düsseldorf-Kaiserswerth und Wittlaer: große Gärten, alte Bäume, gepflegte Hecken, vom Gärtnermeister mit festen Pflegeterminen.",
    h1: "Gartenpflege in Kaiserswerth",
    intro: [
      "Im Düsseldorfer Norden, Kaiserswerth, Wittlaer, Angermund, stehen viele große Gärten mit altem Baumbestand. Genau hier zählt fachgerechter Schnitt: für gesunde Kronen, sichere Wege und Hecken in Form.",
      "Wir übernehmen die regelmäßige Pflege ebenso wie einzelne Einsätze, vom Obstbaumschnitt bis zum Herbstputz mit Laubentsorgung.",
    ],
  },
  {
    slug: "gartenpflege-benrath",
    name: "Düsseldorf-Benrath",
    kind: "Stadtteil",
    metaTitle: "Gartenpflege Benrath | Gärtnermeister Dölle, im Düsseldorfer Süden",
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
    metaTitle: "Gartenpflege Gerresheim | Gärtnermeister Dölle, im Düsseldorfer Osten",
    metaDescription:
      "Gartenpflege in Düsseldorf-Gerresheim und Umgebung: Hecken- und Baumschnitt, Rasenpflege und Laubservice vom Gärtnermeister-Betrieb.",
    h1: "Gartenpflege in Gerresheim",
    intro: [
      "Zwischen Altstadtkern und Waldrand: In Gerresheim, Ludenberg und Hubbelrath wachsen Gärten oft kräftiger als anderswo, der Übergang zum Grünen bringt Laub, Wildwuchs und viel Schnittarbeit mit sich.",
      "Wir halten dagegen: mit fachgerechtem Schnitt, regelmäßiger Pflege und einem Laubservice, der im Herbst zuverlässig kommt.",
    ],
  },
  {
    slug: "gartenpflege-meerbusch",
    name: "Meerbusch",
    kind: "Umland",
    metaTitle: "Gartenpflege Meerbusch | Gärtnermeister Dölle Düsseldorf",
    metaDescription:
      "Gartenpflege in Meerbusch, Büderich, Osterath, Lank-Latum, Strümp: große Gärten linksrheinisch in Meisterhand. Regelmäßige Pflege, fachgerechter Schnitt, faire Anfahrt aus Düsseldorf.",
    h1: "Gartenpflege in Meerbusch",
    intro: [
      "Meerbusch ist die grüne Seite gegenüber vom Rhein, großzügige Grundstücke, gewachsene Baumbestände, Hecken, die im Sommer schnell aus der Form laufen. Von Büderich über Osterath und Strümp bis Lank-Latum betreuen wir hier private Gärten, in denen die Pflege den Unterschied macht.",
      "Als Gärtnermeister-Betrieb aus dem direkt angrenzenden Düsseldorf sind wir mit kurzer Anfahrt vor Ort, das rechnet sich bei regelmäßigen Terminen und macht auch spontane Einsätze möglich, ohne dass gleich ein voller Halbtag pauschal in Rechnung steht.",
      "Typisch für Meerbusch: viele Kirschlorbeer- und Buchsbaumhecken, alte Obstbäume und ausgedehnte Rasenflächen. Wir schneiden formsicher, kontrollieren Kronen im Winter und halten den Rasen über die ganze Saison dicht, inklusive Vertikutieren im Frühjahr und Herbstlaubservice.",
      "Auf Wunsch als kompletter Pflegevertrag mit festen Terminen für das ganze Jahr, Sie bekommen einen Ansprechpartner, klare Absprachen und einen Garten, der nach jedem Einsatz aufgeräumt zurückbleibt.",
    ],
  },
  {
    slug: "gartenpflege-neuss",
    name: "Neuss",
    kind: "Umland",
    metaTitle: "Gartenpflege Neuss | Gärtnermeister Dölle Düsseldorf",
    metaDescription:
      "Gartenpflege in Neuss vom Gärtnermeister: regelmäßige Pflege, Heckenschnitt, Rasen, Baumpflege und Winterservice für Neuss, Grimlinghausen, Weckhoven, Norf. Anfahrt aus Düsseldorf.",
    h1: "Gartenpflege in Neuss",
    intro: [
      "Neuss liegt für uns über die Rheinbrücke, ideal für regelmäßige Pflegetermine ohne lange Anfahrtsstrecken. Wir betreuen hier Privatgärten in allen Stadtteilen: vom Reihenhausgarten in Weckhoven über die klassische Vorstadt-Situation in Grimlinghausen bis zu Grundstücken mit altem Baumbestand in Erfttal und Rosellen.",
      "Als Meisterbetrieb übernehmen wir die komplette Pflege: regelmäßiges Mähen, Heckenschnitt zur richtigen Zeit, Vertikutieren im Frühjahr, Herbstlaubservice und Baumpflege im Winter. Entsorgung von Schnittgut und Laub gehört bei jedem Termin dazu, Sie müssen nichts nachbestellen.",
      "In Neuss ist die Bodenqualität oft besser als bei uns in Düsseldorf, dafür sind die Rasenflächen häufig größer. Wir kalkulieren fair nach Fläche und Zeitaufwand, mit einem festen Ansprechpartner statt Callcenter.",
      "Auf Wunsch als Pflegevertrag für die ganze Saison, mit festen Wochenintervallen oder monatlich. Beratung und Angebot sind kostenlos und unverbindlich.",
    ],
  },
  {
    slug: "gartenpflege-ratingen",
    name: "Ratingen",
    kind: "Umland",
    metaTitle: "Gartenpflege Ratingen | Gärtnermeister Dölle Düsseldorf",
    metaDescription:
      "Gartenpflege Ratingen: Heckenschnitt, Baumpflege, Rasenpflege und Winterservice vom Gärtnermeister, für Ratingen-Mitte, Hösel, Lintorf, Homberg und Breitscheid. Feste Termine, faire Preise.",
    h1: "Gartenpflege in Ratingen",
    intro: [
      "Am Übergang zum Bergischen Land liegen die Gärten in Ratingen meist auf gewachsenem Boden mit altem Baumbestand, von Hösel und Homberg mit den klassischen villenartigen Grundstücken bis zu den Reihenhaus-Vierteln in Ratingen-West und Tiefenbroich. Genau hier zahlt sich Erfahrung im Schnitt aus: gesunde Kronen, dichte Hecken, sauber geführte Beetkanten.",
      "Wir kommen aus Düsseldorf zu festen Terminen, nur 15 Minuten Fahrt, ideal für regelmäßige Pflege ohne lange Anfahrtskosten. Ob wöchentlicher Rasenschnitt, saisonale Beetpflege oder die komplette Betreuung im Pflegevertrag: Sie bestimmen den Umfang, wir kümmern uns um den Rest.",
      "Typisch Ratingen: viele hohe Buchsbaum-, Kirschlorbeer- und Eiben-Hecken, große Rasenflächen an Hanglagen und alte Obst- sowie Laubbäume. Wir schneiden formsicher und zur richtigen Zeit (Vogelschutz-Fristen inklusive), pflegen Kronen im Winter und übernehmen den Herbstlaubservice komplett, Entsorgung von Schnittgut und Laub ist immer dabei.",
      "Auf Wunsch als Pflegevertrag mit festen Terminen für die ganze Saison. Die Erstberatung vor Ort ist kostenlos und unverbindlich.",
    ],
  },
  {
    slug: "gartenpflege-hilden",
    name: "Hilden",
    kind: "Umland",
    metaTitle: "Gartenpflege Hilden | Gärtnermeister Dölle, für Hilden & Erkrath",
    metaDescription:
      "Gartenpflege in Hilden und Erkrath: Rasenpflege, Heckenschnitt, Laubentsorgung und Winterservice vom Gärtnermeister-Betrieb aus Düsseldorf.",
    h1: "Gartenpflege in Hilden",
    intro: [
      "Hilden liegt direkt südöstlich von Düsseldorf und ist über die A46 und die B228 in gut 15 Minuten erreichbar. Ideale Entfernung für regelmäßige Pflegetermine ohne teure Anfahrtskosten.",
      "Typisch für Hilden ist der Mix aus Reihenhaussiedlungen (Hilden-Nord, Hilden-Süd), älteren Zweifamilienhäusern rund um den Bahnhof und größeren Grundstücken im Osten Richtung Karnap. Viele Vorgärten sind kompakt, die Gartenflächen hinter dem Haus dafür intensiv genutzt, mit Rasen, Beeten und einer Hecke zur Grundstücksgrenze.",
      "Wir übernehmen die komplette Gartenpflege: regelmäßiges Rasenmähen, Heckenschnitt zur richtigen Zeit (mit Blick auf die Vogelschutzfristen), Beetpflege, Baumschnitt und den kompletten Herbstservice inklusive Laubentsorgung. Für Hausverwaltungen und Wohnungseigentümergemeinschaften in Hilden bieten wir Objektbetreuung mit festen Terminen und einer Ansprechperson.",
      "Auf Wunsch als Pflegevertrag für die ganze Saison. Beratung und Angebot vor Ort sind kostenlos und unverbindlich.",
    ],
  },
  {
    slug: "gartenpflege-erkrath",
    name: "Erkrath",
    kind: "Umland",
    metaTitle: "Gartenpflege Erkrath | Gärtnermeister Dölle, im Kreis Mettmann",
    metaDescription:
      "Gartenpflege in Erkrath, Alt-Erkrath und Hochdahl: Heckenschnitt, Rasenpflege und Saisonservice vom Gärtnermeister, kurze Anfahrt aus Düsseldorf.",
    h1: "Gartenpflege in Erkrath",
    intro: [
      "Zwischen Düsseldorf und dem Neandertal liegt Erkrath mit seinen Ortsteilen Alt-Erkrath, Hochdahl, Unterfeldhaus und Trills. Der Übergang vom Rheinland ins Bergische Land ist im Garten spürbar: mehr Laubbäume, tiefergründige Böden, oft leichte Hanglage.",
      "Wir betreuen in Alt-Erkrath viele klassische Reihenhausgärten mit gepflegten Hecken und Vorgärten, in Hochdahl größere Einfamilienhaus-Grundstücke aus den 70er- und 80er-Jahren mit altem Baumbestand. In Trills und Unterfeldhaus stehen Neubauviertel mit jungen Rasenflächen, die vor allem in der Anwuchsphase intensive Pflege brauchen.",
      "Wir sind aus Düsseldorf in einer Viertelstunde bei Ihnen und übernehmen die komplette Pflege: Rasenmähen nach Plan, Heckenschnitt zur passenden Zeit, Beete richten, Baumpflege im Winter und den saisonalen Herbstputz. Schnittgut nehmen wir immer mit.",
      "Für die Nähe zum Naturschutzgebiet Neandertal beraten wir zusätzlich zu heimischen Gehölzen und insektenfreundlicher Bepflanzung, wenn Sie Ihren Garten in diese Richtung entwickeln wollen.",
    ],
  },
  {
    slug: "gartenpflege-langenfeld",
    name: "Langenfeld",
    kind: "Umland",
    metaTitle: "Gartenpflege Langenfeld | Gärtnermeister Dölle",
    metaDescription:
      "Gartenpflege in Langenfeld (Rheinland): Rasenpflege, Formschnitt, Baumpflege und Laubentsorgung vom Gärtnermeister-Betrieb, feste Pflegetermine.",
    h1: "Gartenpflege in Langenfeld",
    intro: [
      "Langenfeld (Rheinland) liegt an der A3 zwischen Düsseldorf und Leverkusen, gut erreichbar für regelmäßige Pflegeeinsätze in Immigrath, Richrath, Reusrath, Wiescheid, Berghausen und Gieslenberg.",
      "Typisch für Langenfeld: viele Einfamilienhäuser mit mittelgroßen Gärten, gepflegte Vorgärten und Hecken entlang der Wohnstraßen. In den älteren Siedlungen rund um Immigrath und Richrath finden sich noch Obstbäume aus der Zeit vor der Zusammenlegung der Ortsteile, die mit fachgerechtem Winterschnitt Ertrag und Krone in Balance halten.",
      "Wir kommen für einzelne Einsätze (Frühjahrsstart, Heckenschnitt, Herbstlaub) oder als Pflegevertrag mit festen Terminen über die ganze Saison. Rasen, Hecken, Beete und Bäume aus einer Hand, Schnittgut- und Laubentsorgung inklusive.",
      "Für Neubaugebiete in Gieslenberg und rund um den Freizeitpark begleiten wir gerne die Startpflege einer frisch angelegten Rasenfläche oder eines neuen Rollrasens, in den ersten Wochen kommt es dort auf jeden Termin an.",
    ],
  },
  {
    slug: "gartenpflege-kaarst",
    name: "Kaarst",
    kind: "Umland",
    metaTitle: "Gartenpflege Kaarst | Gärtnermeister Dölle, für Kaarst & Rhein-Kreis Neuss",
    metaDescription:
      "Gartenpflege in Kaarst, Büttgen und Vorst: Heckenschnitt, Rasen, Beete und Saisonservice vom Gärtnermeister, kurze Wege aus Düsseldorf ins Kaarster Feld.",
    h1: "Gartenpflege in Kaarst",
    intro: [
      "Zwischen Düsseldorf-Büderich und Neuss liegt Kaarst mit seinen Ortsteilen Kaarst-Mitte, Büttgen, Vorst, Holzbüttgen und Driesch. Klassischer linksrheinischer Speckgürtel mit vielen Einfamilienhausgärten und ruhigen Wohnlagen.",
      "In Kaarst-Mitte und Büttgen dominieren gepflegte Reihen- und Doppelhaussiedlungen mit klaren Vorgärten und Buchsbaum- oder Kirschlorbeerhecken zur Grundstücksgrenze. In Vorst und Richtung Holzbüttgen finden sich mehr freistehende Häuser mit größeren Rasenflächen, teilweise mit altem Baumbestand.",
      "Wir betreuen Kaarster Gärten mit festen Terminen: vom wöchentlichen Rasenschnitt über den Formschnitt der Buchsbaumhecken (mit Blick auf den Buchsbaumzünsler, den wir bei jedem Termin mit prüfen) bis zum kompletten Herbstlaub-Service. Anfahrt aus Düsseldorf ist kurz, das schlägt sich fair in unseren Anfahrtskosten nieder.",
      "Auf Wunsch als Pflegevertrag mit festen Terminen über die ganze Saison, mit einer Ansprechperson und klaren Positionen im Angebot.",
    ],
  },
  {
    slug: "gartenpflege-mettmann",
    name: "Mettmann",
    kind: "Umland",
    metaTitle: "Gartenpflege Mettmann | Gärtnermeister Dölle",
    metaDescription:
      "Gartenpflege in Mettmann: Heckenschnitt, Rasenpflege, Baumpflege und Laubentsorgung vom Gärtnermeister-Betrieb, regelmäßige Termine, Anfahrt aus Düsseldorf.",
    h1: "Gartenpflege in Mettmann",
    intro: [
      "Mettmann ist Kreisstadt des Kreises Mettmann und liegt am Übergang vom Rheinland ins Bergische Land. Aus Düsseldorf sind wir über die A3 und A44 in unter 20 Minuten vor Ort.",
      "In Mettmann-Zentrum und rund um den historischen Stadtkern gibt es viele gewachsene Gärten mit altem Baumbestand, Hainbuchen- und Rotbuchenhecken sowie klassischen Rasenflächen. In den umliegenden Ortsteilen wie Metzkausen und den Wohnlagen am Goldberg finden sich größere Grundstücke, teilweise mit Hanglage.",
      "Wir übernehmen die klassische Rasen- und Heckenpflege ebenso wie den fachgerechten Obstbaum- und Kronenschnitt. Für alte Bäume in Nähe zu Wegen oder Terrassen prüfen wir die Krone im Winter auf Totholz und statische Auffälligkeiten und schneiden nach Fachregel statt einfach zu kappen.",
      "Auf Wunsch als kompletter Pflegevertrag mit festen Terminen über die ganze Saison. Erstberatung und Angebot vor Ort sind kostenlos.",
    ],
  },
  {
    slug: "gartenpflege-haan",
    name: "Haan",
    kind: "Umland",
    metaTitle: "Gartenpflege Haan | Gärtnermeister Dölle, für Haan & Gruiten",
    metaDescription:
      "Gartenpflege in Haan (Rheinland) und Gruiten: Rasenpflege, Heckenschnitt und Saisonservice vom Gärtnermeister-Betrieb aus Düsseldorf.",
    h1: "Gartenpflege in Haan",
    intro: [
      "Haan (Rheinland) und der historische Ortsteil Gruiten liegen zwischen Erkrath und Solingen, verkehrsgünstig an der A46. Aus Düsseldorf sind wir in gut 20 Minuten vor Ort.",
      "Haan ist als Gartenstadt bekannt: viele Einfamilienhäuser mit mittelgroßen bis großen Grundstücken, gepflegte Vorgärten, klassische Hecken zur Grundstücksgrenze. In Gruiten mit seinem alten Ortskern und den umliegenden Höfen finden sich noch Streuobstwiesen und Obstbäume, die mit fachgerechtem Erhaltungsschnitt lange gesund bleiben.",
      "Wir übernehmen die regelmäßige Pflege ebenso wie einzelne Einsätze: Rasenmähen, Heckenschnitt zur passenden Jahreszeit, Beetpflege, Baumpflege im Winter und die komplette Herbstarbeit inklusive Laubentsorgung. In den Hanglagen Richtung Solingen arbeiten wir mit passender Technik, damit auch schwierigere Flächen sicher gepflegt werden können.",
      "Auf Wunsch als Pflegevertrag mit festen Terminen. Ein Ansprechpartner, klare Absprachen, saubere Ergebnisse.",
    ],
  },
  {
    slug: "gartenpflege-monheim",
    name: "Monheim am Rhein",
    kind: "Umland",
    metaTitle: "Gartenpflege Monheim am Rhein | Gärtnermeister Dölle, für Monheim",
    metaDescription:
      "Gartenpflege in Monheim am Rhein und Baumberg: Rasen, Hecken, Beete und Saisonservice vom Gärtnermeister-Betrieb, feste Pflegetermine, Anfahrt aus Düsseldorf.",
    h1: "Gartenpflege in Monheim am Rhein",
    intro: [
      "Monheim am Rhein mit den Stadtteilen Baumberg, Monheim-Innenstadt und den Wohnlagen am Rhein hat sich in den letzten Jahren stark entwickelt. Aus Düsseldorf sind wir über die B8 in unter 20 Minuten bei Ihnen.",
      "In Baumberg finden sich viele klassische Rheinvorgärten mit gepflegten Hecken, Buchskugeln und dichten Rasenflächen. In der Innenstadt und den umliegenden Neubaugebieten stehen dagegen junge Reihenhaussiedlungen mit kleinen, aber intensiv genutzten Gärten. Für beide Situationen bringen wir die passende Herangehensweise mit.",
      "Wir übernehmen die gesamte Gartenpflege: Rasenschnitt in der richtigen Schnitthöhe, Heckenschnitt zur passenden Zeit, Beete richten, Obstbaum- und Kronenschnitt sowie den saisonalen Herbstservice mit Laubentsorgung. Für die Rheinlagen mit typischer Auenbepflanzung beraten wir zusätzlich zur Bewässerung in Trockenphasen.",
      "Auf Wunsch als Pflegevertrag mit festen Terminen über die ganze Saison. Beratung und Angebot vor Ort sind kostenlos und unverbindlich.",
    ],
  },
  {
    slug: "gartenpflege-dormagen",
    name: "Dormagen",
    kind: "Umland",
    metaTitle: "Gartenpflege Dormagen | Gärtnermeister Dölle",
    metaDescription:
      "Gartenpflege in Dormagen, Zons und Stürzelberg: Heckenschnitt, Rasenpflege und Saisonservice vom Gärtnermeister-Betrieb, kurze Anfahrt aus Düsseldorf.",
    h1: "Gartenpflege in Dormagen",
    intro: [
      "Dormagen liegt im Rhein-Kreis Neuss südlich von Düsseldorf, mit dem historischen Stadtteil Zons als Zoll- und Festungsstadt am Rhein, dazu Stürzelberg, Delhoven und Straberg. Aus Düsseldorf sind wir über die B9 in gut 25 Minuten vor Ort.",
      "Das milde Rheinklima wirkt sich auf die Gärten aus: mediterrane Pflanzen wie Oleander, Feige und Lavendel wachsen hier besser als im Bergischen, Rasenflächen brauchen dafür in Trockenphasen mehr Aufmerksamkeit. In Zons prägen historische Innenhöfe und Rankpflanzen an alten Mauern das Bild, in Delhoven und Straberg finden sich klassische Einfamilienhausgärten mit Rasen, Beeten und Hecken.",
      "Wir übernehmen die komplette Betreuung: klassische Rasenpflege, Heckenschnitt zur richtigen Jahreszeit, Baumschnitt und Kronenpflege im Winter, den Herbst-Laubservice inklusive Entsorgung. Für Kübelpflanzen an Terrassen und Innenhöfen richten wir auf Wunsch den Winterschutz her und stellen die Bewässerung im Sommer ein.",
      "Feste Termine, ein Ansprechpartner, saubere Ausführung. Auf Wunsch als Pflegevertrag mit klarem Umfang und planbarem Preis.",
    ],
  },
  {
    slug: "gartenpflege-krefeld",
    name: "Krefeld",
    kind: "Umland",
    metaTitle: "Gartenpflege Krefeld | Gärtnermeister Dölle Düsseldorf",
    metaDescription:
      "Gartenpflege in Krefeld: Heckenschnitt, Rasenpflege, Baumpflege und Saisonservice vom Gärtnermeister-Betrieb, für private Gärten in Krefeld und Umgebung.",
    h1: "Gartenpflege in Krefeld",
    intro: [
      "Krefeld mit seinen gewachsenen Villenvierteln in Bockum, Verberg, Traar und Uerdingen sowie den klassischen Wohnlagen in Fischeln, Oppum und Linn profitiert von regelmäßiger, fachgerechter Gartenpflege. Aus Düsseldorf sind wir über die A57 in rund 25 Minuten vor Ort.",
      "In Bockum und Verberg stehen viele repräsentative Grundstücke mit altem Baumbestand, gepflegten Rasenflächen und formsicher geschnittenen Hecken, die Kontinuität in der Pflege brauchen. In Fischeln und Oppum finden sich klassische Einfamilienhaus-Situationen mit kompakten Vorgärten und intensiv genutzten Gartenflächen hinter dem Haus. Uerdingen mit seinen Rheinlagen bringt zusätzliche Anforderungen an feuchte Böden mit.",
      "Wir kommen aus Düsseldorf gezielt für die vereinbarten Pflegetermine: Rasen, Hecken, Beete, Bäume und der komplette Herbstservice inklusive Laubentsorgung. Für die alten Bäume in den Villenvierteln arbeiten wir mit dem Hochentaster und schneiden Kronen fachgerecht statt zu kappen.",
      "Auf Wunsch im Pflegevertrag mit festen Intervallen und einem Ansprechpartner. Erstberatung und Angebot sind kostenlos und unverbindlich.",
    ],
  },
  {
    slug: "gartenpflege-wuelfrath",
    name: "Wülfrath",
    kind: "Umland",
    metaTitle: "Gartenpflege Wülfrath | Gärtnermeister Dölle, für Wülfrath im Kreis Mettmann",
    metaDescription:
      "Gartenpflege in Wülfrath: Heckenschnitt, Rasenpflege und Saisonservice vom Gärtnermeister-Betrieb, Anfahrt aus Düsseldorf, feste Pflegetermine.",
    h1: "Gartenpflege in Wülfrath",
    intro: [
      "Wülfrath liegt am östlichen Rand des Kreises Mettmann in der Kalkstein-Region zwischen Neandertal und Bergischem Land. Aus Düsseldorf sind wir über die A46 in rund 25 Minuten vor Ort, für Wülfrath-Zentrum, Düssel, Flandersbach, Rohdenhaus und Rützkausen.",
      "Typisch für Wülfrath sind Hanggärten und teilweise sehr kalkhaltige Böden aus der Region der alten Kalksteinbrüche. Beides stellt eigene Anforderungen: die Hanglagen brauchen sichere Technik und einen Blick für Erosion, der kalkhaltige Boden verlangt eine passende Pflanzenauswahl und angepasste Düngung, damit Rhododendron, Hortensien und Rasen dort dauerhaft gut wachsen.",
      "Wir kommen aus Düsseldorf für regelmäßige Pflegeeinsätze: Rasen, Hecken, Beete, Baumpflege und den kompletten Herbstschnitt inklusive Laubentsorgung. Für die vielen alten Obstbäume in Wülfrath und Umgebung übernehmen wir Erhaltungs- und Verjüngungsschnitt zur richtigen Jahreszeit.",
      "Ein Ansprechpartner, feste Termine, klare Absprachen. Auf Wunsch als Pflegevertrag mit klarem Umfang und planbarem Preis.",
    ],
  },
];
