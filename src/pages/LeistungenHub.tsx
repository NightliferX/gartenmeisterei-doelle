import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import BeratungCtaV8 from "@/components/v8/BeratungCtaV8";
import SkipToContent from "@/components/SkipToContent";
import { services, siteConfig } from "@/lib/siteContent";
import { serviceSlugFor } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

// Hub-Seite für alle Leistungen. Ergänzt die 8 Service-Detailseiten
// um einen zentralen Zubringer mit Ablauf-Erklärung, Vergleich
// Pflegevertrag vs. Einzeltermin und FAQ zum Auftragsablauf.
const ablauf = [
  {
    title: "Ihre Anfrage",
    text: `Kurz beschreiben, worum es geht: per Formular, WhatsApp oder Telefon. ${siteConfig.responsePromise}.`,
  },
  {
    title: "Beratung im Garten",
    text: "Wir schauen uns die Fläche vor Ort an und sagen ehrlich, was nötig ist und was warten kann. Kostenlos und unverbindlich.",
  },
  {
    title: "Angebot mit klarem Umfang",
    text: "Sie bekommen schriftlich, was gemacht wird, auf Wunsch als Pflegevertrag mit festem Preis pro Termin.",
  },
  {
    title: "Termin nach Plan",
    text: "Wir kommen zum vereinbarten Zeitpunkt. Schnittgut und Grünabfall nehmen wir direkt mit.",
  },
];

const vertragsVergleich = [
  {
    title: "Pflegevertrag",
    points: [
      "Feste Termine über die Saison, keine wiederholten Anrufe nötig",
      "Ein Ansprechpartner, der Ihren Garten kennt",
      "Planbarer Preis pro Termin, klar vereinbarter Umfang",
      "Bei Wetterausfällen kein Extraaufwand für Sie",
      "Nach der Saison bleibt der Garten in Bestform",
    ],
    empfohlen: "für Kunden mit dauerhaftem Pflegebedarf und wenig Zeit",
  },
  {
    title: "Einzeltermine",
    points: [
      "Sie rufen an, wenn etwas ansteht: Heckenschnitt, Laubentsorgung, Frühjahrsstart",
      "Jeder Termin wird einzeln abgerechnet",
      "Ideal für gut gepflegte Gärten mit nur wenigen Terminen pro Jahr",
      "Auch für einmalige Projekte (Rollrasen, Neuanlage, Grundpflege nach Umzug)",
      "Termin nach Verfügbarkeit, in der Hauptsaison mit Vorlauf",
    ],
    empfohlen: "für Kunden, die vieles selbst machen und uns nur punktuell brauchen",
  },
];

const faq = [
  {
    question: "Können wir mit einem einzelnen Termin starten und später auf Pflegevertrag umsteigen?",
    answer:
      "Ja, klassischer Weg. Viele unserer Kunden fangen mit einem Einzeltermin an (Rückschnitt nach dem Winter, Grundpflege nach Umzug) und merken dann, wie viel Ruhe der Pflegevertrag bringt. Umstellung ist jederzeit möglich, wir schauen uns dafür Ihren Garten und Ihren Pflegeaufwand gemeinsam an.",
  },
  {
    question: "Kommen Sie auch für kleine Aufträge?",
    answer:
      "Ja, mit Mindestpauschale. Für sehr kleine Einsätze (ein Baum stutzen, eine kurze Hecke schneiden) sammeln wir gerne mehrere Aufgaben zu einem Termin oder kombinieren mit einem benachbarten Kunden, damit die Anfahrt fair bleibt.",
  },
  {
    question: "Was kostet ein durchschnittlicher Pflegevertrag im Reihenhausgarten?",
    answer:
      "Ein typischer Reihenhausgarten (200-400 Quadratmeter) mit Rasen, Hecke und Beeten liegt bei 10-20 Terminen pro Saison im mittleren dreistelligen bis niedrigen vierstelligen Bereich pro Jahr. Nach der kostenlosen Erstberatung geben wir Ihnen einen festen Preis mit klaren Positionen.",
  },
  {
    question: "Übernehmen Sie auch Objektbetreuung für Hausverwaltungen und WEG?",
    answer:
      "Ja, wir betreuen mehrere Wohnungseigentümergemeinschaften und Hausverwaltungen in Düsseldorf. Feste Ansprechpartner, dokumentierte Einsätze, klare Rechnungsstellung, alles was in dem Bereich Standard sein sollte.",
  },
  {
    question: "Was gehört zu jedem Termin dazu?",
    answer:
      "Immer inklusive: Schnittgut und Grünabfall werden mitgenommen, keine Fahrten zum Wertstoffhof für Sie. Werkzeug und Verbrauchsmaterial (Kraftstoff, Bindegut, Rasensaat für Nachsaat) sind Teil des Preises. Bei größeren Sonderaktionen (Rollrasen legen, Fällarbeiten) sprechen wir Materialkosten transparent vorher ab.",
  },
];

const LeistungenHub = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteConfig.domain}/leistungen`,
      name: "Leistungen Gärtnermeister Dölle",
      description:
        "Alle Leistungen des Meisterbetriebs Gärtnermeister Dölle für Düsseldorf und Umgebung: Gartenpflege, Hecken- und Baumschnitt, Rasenpflege, Rollrasen, Laubentsorgung, Winterservice, Terrassenreinigung.",
      url: `${siteConfig.domain}/leistungen`,
      about: { "@id": `${siteConfig.domain}/#business` },
      hasPart: services.map((service) => ({
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": `${siteConfig.domain}/#business` },
        url: `${siteConfig.domain}/${serviceSlugFor(service.id)}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: siteConfig.domain },
        { "@type": "ListItem", position: 2, name: "Leistungen", item: `${siteConfig.domain}/leistungen` },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={`Leistungen | ${siteConfig.brandName} Düsseldorf`}
        description="Alle Leistungen im Überblick: Gartenpflege, Hecken- und Baumschnitt, Rasenpflege, Rollrasen, Laubentsorgung, Winterservice, Terrassenreinigung. Vom Meisterbetrieb in Düsseldorf und Umgebung."
        path="/leistungen"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-background">
        <SkipToContent />
        <HeaderV8 />
        <main id="main">
          {/* Hero */}
          <section className="bg-secondary/40 pb-14 pt-32 md:pt-40">
            <div className="mx-auto max-w-[880px] px-4 sm:px-6">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                Unsere Leistungen
              </p>
              <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
                Gartenpflege in Düsseldorf: Alle Leistungen im Überblick.
              </h1>
              <p className="mt-5 max-w-[54ch] text-[1.08rem] leading-relaxed text-muted-foreground md:text-[1.15rem]">
                Vom regelmäßigen Rasenschnitt über Hecken- und Baumpflege bis zum kompletten Pflegevertrag: acht Leistungen aus einer Hand, vom Meisterbetrieb.
              </p>
            </div>
          </section>

          {/* 8 Leistungs-Karten */}
          <section className="bg-background py-16 md:py-20">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {services.map((service) => {
                  const src = service.image
                    ? (/^https?:\/\//.test(service.image) ? service.image : withBase(service.image))
                    : undefined;
                  return (
                    <Link
                      key={service.id}
                      to={`/${serviceSlugFor(service.id)}`}
                      className="v8-press group flex flex-col overflow-hidden rounded-[1.75rem] bg-card shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                        {src ? (
                          <img
                            src={src}
                            width={1500}
                            height={1000}
                            alt={service.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col p-6 md:p-7">
                        <h2 className="text-[1.2rem] font-semibold leading-tight text-foreground group-hover:text-primary md:text-[1.3rem]">
                          {service.title}
                        </h2>
                        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground md:text-[1rem]">
                          {service.description}
                        </p>
                        {service.highlights?.length ? (
                          <ul className="mt-4 space-y-1.5 text-[0.85rem] text-muted-foreground">
                            {service.highlights.slice(0, 3).map((h) => (
                              <li key={h} className="flex gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" strokeWidth={2} aria-hidden />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-primary">
                          Zur Leistung
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* So läuft es ab */}
          <section className="bg-[#0d120d] py-20 md:py-24">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  So läuft es ab
                </p>
                <h2 className="mt-3 text-[clamp(1.9rem,3.8vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-white">
                  Vier Schritte. Keine Überraschungen.
                </h2>
              </div>
              <ol className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
                {ablauf.map((step, index) => (
                  <li key={step.title} className="rounded-[1.5rem] bg-white/[0.06] p-7">
                    <span className="text-[0.8rem] font-semibold tracking-[0.18em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-[1.15rem] font-semibold leading-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-white/75">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Pflegevertrag vs. Einzeltermin */}
          <section className="bg-background py-20 md:py-24">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Auftragsformen
                </p>
                <h2 className="mt-3 text-[clamp(1.9rem,3.8vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Pflegevertrag oder Einzeltermin?
                </h2>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-muted-foreground md:text-[1.08rem]">
                  Zwei Wege, uns zu buchen. Beide führen zum gleichen Ergebnis, unterschieden nur im Rhythmus und in der Planbarkeit.
                </p>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
                {vertragsVergleich.map((v) => (
                  <article key={v.title} className="rounded-[1.75rem] bg-card p-8 shadow-[0_2px_18px_rgba(0,0,0,0.05)] md:p-10">
                    <h3 className="text-[1.35rem] font-semibold leading-tight text-foreground md:text-[1.5rem]">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-[0.9rem] font-medium uppercase tracking-[0.14em] text-primary">
                      Empfohlen {v.empfohlen}
                    </p>
                    <ul className="mt-5 space-y-3 text-[0.98rem] leading-relaxed text-muted-foreground md:text-[1rem]">
                      {v.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} aria-hidden />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-secondary/40 py-20 md:py-24">
            <div className="mx-auto max-w-[880px] px-4 sm:px-6">
              <div className="text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Häufige Fragen
                </p>
                <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Zum Auftrag und Ablauf.
                </h2>
              </div>
              <div className="mt-10 divide-y divide-border/60 rounded-3xl bg-white p-2 shadow-sm ring-1 ring-border/60 sm:p-4 md:p-6">
                {faq.map((item) => (
                  <details key={item.question} className="group px-3 py-4 sm:px-4">
                    <summary className="v8-press flex cursor-pointer items-center justify-between gap-4 text-left text-[1.02rem] font-semibold text-foreground md:text-[1.1rem]">
                      {item.question}
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" strokeWidth={2.25} aria-hidden />
                    </summary>
                    <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground md:text-[1rem]">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <BeratungCtaV8 />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LeistungenHub;
