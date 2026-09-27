import { ArrowRight, ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import BeratungCtaV8 from "@/components/v8/BeratungCtaV8";
import SkipToContent from "@/components/SkipToContent";
import { siteConfig } from "@/lib/siteContent";
import { areaPages } from "@/lib/subpages";

// Hub für alle Einsatzgebiete. Trennt Stadtteile Düsseldorfs vom Umland,
// zeigt beides als Chip-Wolke mit Anfahrt-Statement.
const EinsatzgebieteHub = () => {
  const stadtteile = areaPages.filter((a) => a.kind === "Stadtteil");
  const umland = areaPages.filter((a) => a.kind === "Umland");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteConfig.domain}/einsatzgebiete`,
      name: "Einsatzgebiete Gärtnermeister Dölle",
      description:
        "Wo wir für Sie arbeiten: Düsseldorf und das nahe Umland. Alle betreuten Stadtteile und Umland-Städte im Überblick.",
      url: `${siteConfig.domain}/einsatzgebiete`,
      about: { "@id": `${siteConfig.domain}/#business` },
      hasPart: areaPages.map((a) => ({
        "@type": "Place",
        name: a.name,
        url: `${siteConfig.domain}/${a.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: siteConfig.domain },
        { "@type": "ListItem", position: 2, name: "Einsatzgebiete", item: `${siteConfig.domain}/einsatzgebiete` },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={`Einsatzgebiete | ${siteConfig.brandName} Düsseldorf`}
        description="Gärtnermeister Dölle betreut Gärten in ganz Düsseldorf und im Umland: Meerbusch, Neuss, Ratingen, Erkrath, Hilden, Kaarst und weitere. Kurze Anfahrt, feste Pflegetermine."
        path="/einsatzgebiete"
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
                Einsatzgebiete
              </p>
              <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
                Wo wir für Sie im Garten stehen.
              </h1>
              <p className="mt-5 max-w-[58ch] text-[1.08rem] leading-relaxed text-muted-foreground md:text-[1.15rem]">
                Düsseldorf komplett und das nahe Umland: {stadtteile.length} Stadtteile und {umland.length} Umlandorte im festen Einsatzradius. Kurze Anfahrt macht regelmäßige Pflege wirtschaftlich, auch außerhalb der Stadtgrenze.
              </p>
            </div>
          </section>

          {/* Stadtteile Düsseldorf */}
          <section className="bg-background py-16 md:py-20">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
              <div className="max-w-2xl">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  Düsseldorf
                </p>
                <h2 className="mt-3 text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                  Düsseldorf komplett.
                </h2>
                <p className="mt-4 text-[1rem] leading-relaxed text-muted-foreground">
                  Von Kaiserswerth im Norden bis Benrath im Süden, linksrheinisch bis Oberkassel, rechtsrheinisch bis Gerresheim. Vier Schwerpunkt-Stadtteile haben eigene Seiten mit Beispielprojekten aus der Nachbarschaft, alle anderen Düsseldorfer Stadtteile pflegen wir mit dem gleichen Anspruch.
                </p>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {stadtteile.map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={`/${a.slug}`}
                      className="v8-press group flex min-h-[52px] w-full items-center justify-between gap-2 rounded-2xl border border-border bg-card px-5 py-3 text-[0.98rem] font-medium text-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <span className="inline-flex items-center gap-2 truncate">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} aria-hidden />
                        <span className="truncate">{a.name.replace("Düsseldorf-", "")}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Umland */}
          <section className="bg-secondary/40 py-16 md:py-20">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
              <div className="max-w-2xl">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  Umland
                </p>
                <h2 className="mt-3 text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                  Nahes Umland, feste Pflegetermine.
                </h2>
                <p className="mt-4 text-[1rem] leading-relaxed text-muted-foreground">
                  Für die im Umkreis von 25 Kilometern liegenden Orte lohnt sich regelmäßige Pflege wirtschaftlich, die Anfahrt schlägt fair in unseren Terminen zu Buche. Rechtsrheinisch, linksrheinisch, Bergisches Vorland: wir kommen.
                </p>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {umland.map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={`/${a.slug}`}
                      className="v8-press group flex min-h-[52px] w-full items-center justify-between gap-2 rounded-2xl border border-border bg-card px-5 py-3 text-[0.98rem] font-medium text-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <span className="inline-flex items-center gap-2 truncate">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} aria-hidden />
                        <span className="truncate">{a.name}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Anfahrt / Radius-Erklärung */}
          <section className="bg-background py-20 md:py-24">
            <div className="mx-auto max-w-[880px] px-4 sm:px-6">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                Anfahrt
              </p>
              <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                Warum kurze Wege für regelmäßige Pflege den Unterschied machen.
              </h2>
              <div className="mt-6 space-y-5 text-[1.02rem] leading-[1.7] text-foreground/85 md:text-[1.08rem]">
                <p>
                  Ein Betrieb, der 40 Kilometer zu Ihnen fährt, muss die Anfahrt in Rechnung stellen, sonst rechnet sich der Termin nicht. Kurze Wege sind kein Marketing-Argument, sondern die Grundlage dafür, dass wir Pflegeverträge zu fairen Preisen anbieten können.
                </p>
                <p>
                  Unser fester Einsatzradius liegt bei rund 25 Kilometern um Düsseldorf. Innerhalb dieses Radius kommen wir zu geplanten Terminen ohne extra Anfahrtspauschale. Außerhalb prüfen wir im Einzelfall, ob eine Betreuung wirtschaftlich sinnvoll ist.
                </p>
                <p>
                  Für Objekte in benachbarten Wohnstraßen oder für Nachbarschafts-Verbünde ergeben sich Bonus-Effekte: wenn wir am selben Tag mehrere Gärten in einer Straße betreuen, sinkt die Anfahrtszeit pro Termin, das geht direkt in den Preis.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/leistungen"
                  className="v8-press inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-primary px-6 text-[1rem] font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  Zu unseren Leistungen
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                </Link>
                <a
                  href={siteConfig.phoneHref}
                  className="v8-press inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-[1rem] font-medium text-foreground hover:bg-secondary/60"
                >
                  Anrufen: {siteConfig.phoneDisplay}
                </a>
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

export default EinsatzgebieteHub;
