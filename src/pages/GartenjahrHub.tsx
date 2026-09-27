import { ArrowRight, ArrowUpRight, ChevronRight, Flower2, Leaf, Snowflake, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import BeratungCtaV8 from "@/components/v8/BeratungCtaV8";
import SkipToContent from "@/components/SkipToContent";
import { gartenjahr, monthRange, siteConfig } from "@/lib/siteContent";

// Hub-Seite für das Gartenjahr. Zeigt die vier Saisons als Karten, mit
// dem aktuellen Zeitpunkt hervorgehoben. Erklärt, warum ein Pflegevertrag
// dem Takt des Jahres folgt statt dem Kalender.
const saisonIcon = {
  fruehjahr: Flower2,
  sommer: Sun,
  herbst: Leaf,
  winter: Snowflake,
} as const;

const GartenjahrHub = () => {
  const currentMonth = new Date().getMonth();
  const currentSaison = gartenjahr.find((s) => s.months.includes(currentMonth));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteConfig.domain}/gartenjahr`,
      name: "Gartenjahr Gärtnermeister Dölle",
      description:
        "Der Jahres-Takt der Gartenpflege: was in Frühjahr, Sommer, Herbst und Winter im Düsseldorfer Garten ansteht.",
      url: `${siteConfig.domain}/gartenjahr`,
      about: { "@id": `${siteConfig.domain}/#business` },
      hasPart: gartenjahr.map((s) => ({
        "@type": "WebPage",
        name: `Gartenpflege im ${s.season}`,
        url: `${siteConfig.domain}/gartenpflege-${s.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: siteConfig.domain },
        { "@type": "ListItem", position: 2, name: "Gartenjahr", item: `${siteConfig.domain}/gartenjahr` },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={`Gartenjahr | ${siteConfig.brandName} Düsseldorf`}
        description="Das Gartenjahr im Rheinland: was in Frühjahr, Sommer, Herbst und Winter im Düsseldorfer Garten ansteht. Vom Gärtnermeister für Pflege im Takt der Saison."
        path="/gartenjahr"
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
                Das Gartenjahr
              </p>
              <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
                Jede Jahreszeit hat ihre Arbeit. Wir kennen den Takt.
              </h1>
              <p className="mt-5 max-w-[56ch] text-[1.08rem] leading-relaxed text-muted-foreground md:text-[1.15rem]">
                Frühjahrsschnitt, Sommer-Formhalt, Herbstlaub und Winter-Kronen: die Jahreszeit entscheidet, was im Düsseldorfer Garten gerade dran ist. Als Meisterbetrieb kommen wir zum richtigen Zeitpunkt, nicht nach Zuruf.
              </p>
            </div>
          </section>

          {/* Aktuelle Saison, wenn passend */}
          {currentSaison ? (
            <section className="bg-background py-12 md:py-14">
              <div className="mx-auto max-w-[880px] px-4 sm:px-6">
                <div className="rounded-[1.75rem] border border-primary/15 bg-primary/[0.04] p-7 md:p-10">
                  <div className="flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary">
                    <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
                    Aktuell im {new Date().toLocaleDateString("de-DE", { month: "long" })}
                  </div>
                  <h2 className="mt-4 text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold leading-tight text-foreground">
                    Jetzt gefragt: {currentSaison.season}
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-relaxed text-muted-foreground md:text-[1.08rem]">
                    {currentSaison.intro}
                  </p>
                  <Link
                    to={`/gartenpflege-${currentSaison.slug}`}
                    className="v8-press mt-6 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-primary hover:underline"
                  >
                    Details zum {currentSaison.season}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          {/* Alle 4 Saisons */}
          <section className="bg-background py-16 md:py-20">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
              <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
                {gartenjahr.map((entry) => {
                  const Icon = saisonIcon[entry.slug as keyof typeof saisonIcon];
                  const active = entry.months.includes(currentMonth);
                  return (
                    <Link
                      key={entry.season}
                      to={`/gartenpflege-${entry.slug}`}
                      className={`v8-press group flex h-full flex-col rounded-[1.5rem] p-6 shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)] md:p-7 ${
                        active ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {monthRange(entry.months)}
                        </span>
                        {Icon ? (
                          <Icon aria-hidden className={`h-5 w-5 shrink-0 ${active ? "text-primary-foreground/80" : "text-primary/70"}`} strokeWidth={2} />
                        ) : null}
                      </div>
                      <h3 className={`mt-4 text-[1.6rem] font-semibold leading-tight tracking-[-0.01em] md:text-[1.8rem] ${active ? "text-primary-foreground" : "text-foreground group-hover:text-primary"}`}>
                        {entry.season}
                      </h3>
                      <p className={`mt-3 flex-1 text-[0.92rem] leading-relaxed md:text-[0.95rem] ${active ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
                        {entry.work}
                      </p>
                      <span className={`mt-5 inline-flex items-center gap-1 text-[0.85rem] font-semibold ${active ? "text-primary-foreground" : "text-primary"}`}>
                        Zur Saison
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Erklärung: Warum Pflegevertrag dem Takt folgt */}
          <section className="bg-secondary/40 py-20 md:py-24">
            <div className="mx-auto max-w-[880px] px-4 sm:px-6">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                Warum Pflegevertrag
              </p>
              <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                Der Takt des Gartens ist keine Frage des Kalenders.
              </h2>
              <div className="mt-6 space-y-5 text-[1.02rem] leading-[1.7] text-foreground/85 md:text-[1.08rem]">
                <p>
                  Ein Buchsbaum, der im Juli statt im Juni geschnitten wird, verzeiht das. Ein Buchsbaum, den man vergisst, verzeiht es nicht. Das Gartenjahr hat feste Termine, die nicht warten: Vogelschutzfristen für Hecken, Schnittzeitpunkt für Obstbäume, Vertikutier-Fenster für Rasen, letzte Chance für den Herbstschnitt.
                </p>
                <p>
                  Als Pflegevertrag-Kunde kümmern Sie sich um nichts davon. Wir kommen zum richtigen Zeitpunkt, ohne Erinnerung, ohne Absprache. Sie sehen den Effekt: der Garten sieht das ganze Jahr gepflegt aus, weil die Arbeiten dann passieren, wenn sie im Takt sind.
                </p>
                <p>
                  Für Einzeltermine funktioniert das genauso, nur dass Sie den Anruf machen. Wenn Sie sich sicher sind, welchen Termin Sie wann brauchen, ist das ok. Wenn Sie den Kopf dafür frei haben wollen, ist der Pflegevertrag die naheliegende Antwort.
                </p>
              </div>
              <Link
                to="/leistungen"
                className="v8-press mt-8 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-primary hover:underline"
              >
                Alle Leistungen im Überblick
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
              </Link>
            </div>
          </section>

          <BeratungCtaV8 />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GartenjahrHub;
