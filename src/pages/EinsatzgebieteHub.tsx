import { ArrowRight, Building2, MapPin, Route, TreePine, Users } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import BeratungCtaV8 from "@/components/v8/BeratungCtaV8";
import SkipToContent from "@/components/SkipToContent";
import { siteConfig } from "@/lib/siteContent";
import { areaPages } from "@/lib/subpages";

// Einsatzgebiete-Hub im Apple-Editorial-Look: kompakter Hero mit
// Stat-Row (macht die Reichweite auf einen Blick begreifbar), drei
// Value-Cards die die Radius-Logik erklaeren, zweispaltiges Kartenpaar
// Duesseldorf/Umland statt zwei Textwaende. Weniger Text, mehr Struktur.
const EinsatzgebieteHub = () => {
  const stadtteile = areaPages.filter((a) => a.kind === "Stadtteil");
  const umland = areaPages.filter((a) => a.kind === "Umland");

  const stats = [
    { value: stadtteile.length + umland.length, label: "Orte, in denen wir regelmäßig unterwegs sind" },
    { value: "25", suffix: "km", label: "Umkreis um Düsseldorf, links- und rechtsrheinisch" },
    { value: "0", suffix: "€", label: "Anfahrtspauschale bei geplanten Pflegeterminen" },
  ] as const;

  const values = [
    {
      Icon: Route,
      title: "Kein Aufschlag im Radius",
      body: "Bei geplanten Pflegeterminen innerhalb der 25 Kilometer fahren wir ohne Anfahrtspauschale. Der Weg ist im Preis.",
    },
    {
      Icon: Users,
      title: "Nachbarschafts-Bonus",
      body: "Mehrere Gärten am selben Tag in einer Straße sparen Anfahrtszeit pro Termin. Der Effekt geht direkt in den Preis.",
    },
    {
      Icon: MapPin,
      title: "Außerhalb nach Absprache",
      body: "Über 25 Kilometer prüfen wir im Einzelfall, ob eine regelmäßige Betreuung wirtschaftlich sinnvoll ist.",
    },
  ] as const;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteConfig.domain}/einsatzgebiete`,
      name: "Einsatzgebiete Gärtnermeister Dölle",
      description:
        "Wo wir für Sie arbeiten: Düsseldorf und das nahe Umland innerhalb von 25 Kilometern. Alle Stadtteile und Umland-Städte im Überblick.",
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
        description="Gärtnermeister Dölle betreut Gärten in Düsseldorf und im Umland innerhalb von 25 Kilometern: Meerbusch, Neuss, Ratingen, Erkrath, Hilden, Kaarst und weitere. Keine Anfahrtspauschale bei geplanten Terminen."
        path="/einsatzgebiete"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-background">
        <SkipToContent />
        <HeaderV8 />
        <main id="main">
          {/* Hero: kompakt, mit Stat-Row als Substanz-Anker */}
          <section className="bg-secondary/40 pb-16 pt-32 md:pb-20 md:pt-40">
            <div className="mx-auto max-w-[960px] px-4 sm:px-6">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                Einsatzgebiete
              </p>
              <h1 className="mt-5 text-[clamp(2.2rem,4.8vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-foreground">
                Von Kaiserswerth bis Benrath, von Meerbusch bis Ratingen.
              </h1>
              <p className="mt-6 max-w-[62ch] text-[1.1rem] leading-[1.55] text-muted-foreground md:text-[1.2rem]">
                Wir kennen die Gärten in Düsseldorf und den Nachbarorten. Kurze Wege bedeuten pünktliche Termine, feste Ansprechpartner — und keine Anfahrtspauschale bei geplanter Pflege.
              </p>

              {/* Stat-Row: Zahlen machen die Reichweite auf einen Blick begreifbar */}
              <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-border/60 pt-8 sm:gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-none tracking-[-0.02em] text-foreground">
                      {s.value}
                      {"suffix" in s ? (
                        <span className="ml-1 text-[0.55em] font-medium text-muted-foreground">{s.suffix}</span>
                      ) : null}
                    </dt>
                    <dd className="mt-2 text-[0.82rem] leading-snug text-muted-foreground sm:text-[0.9rem]">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Value-Cards: Radius-Logik in 3 verstaendlichen Bloecken */}
          <section className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
              <div className="max-w-2xl">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  Warum Radius statt Reichweite
                </p>
                <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Kurze Wege sind kein Marketing-Argument. Sie sind die Grundlage für faire Preise.
                </h2>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
                {values.map(({ Icon, title, body }) => (
                  <div
                    key={title}
                    className="flex flex-col rounded-[1.4rem] bg-card p-7 shadow-[0_2px_10px_rgba(10,20,10,0.05),0_12px_32px_rgba(10,20,10,0.06)] md:p-8"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/12 text-primary">
                      <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[1.15rem] font-semibold leading-snug text-foreground">
                      {title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-[1.6] text-muted-foreground">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Zwei-Karten-Layout Stadtteile + Umland: klare Trennung,
              aber gleiche Card-Sprache, damit beides gleichwertig wirkt */}
          <section className="bg-secondary/40 py-16 md:py-24">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
              <div className="mb-10 max-w-2xl md:mb-12">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  Wo wir arbeiten
                </p>
                <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Düsseldorf und die 13 Nachbarorte im Radius.
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <AreaCard
                  Icon={Building2}
                  kicker="Düsseldorf"
                  title="Stadtteile mit Schwerpunkt"
                  meta={`${stadtteile.length} Seiten, alle anderen Stadtteile ebenso im Einsatz`}
                  entries={stadtteile.map((a) => ({
                    slug: a.slug,
                    name: a.name.replace("Düsseldorf-", ""),
                  }))}
                />
                <AreaCard
                  Icon={TreePine}
                  kicker="Umland"
                  title="Nahes Umland im 25 km-Radius"
                  meta={`${umland.length} Orte, feste Anfahrtstage`}
                  entries={umland.map((a) => ({ slug: a.slug, name: a.name }))}
                />
              </div>
            </div>
          </section>

          {/* CTA-Section: schlicht, mit Telefon-Alternative */}
          <section className="bg-background py-20 md:py-24">
            <div className="mx-auto max-w-[880px] px-4 text-center sm:px-6">
              <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                Ihr Ort nicht dabei?
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[1.05rem] leading-[1.55] text-muted-foreground md:text-[1.12rem]">
                Rufen Sie kurz an. Wenn der Weg noch passt, machen wir einen Termin. Wenn nicht, sagen wir es Ihnen ehrlich.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

// Card fuer Stadtteil- und Umland-Bloecke. Gleiche visuelle Sprache fuer
// beide, damit weder Duesseldorf noch das Umland wichtiger wirkt.
const AreaCard = ({
  Icon,
  kicker,
  title,
  meta,
  entries,
}: {
  Icon: typeof Building2;
  kicker: string;
  title: string;
  meta: string;
  entries: { slug: string; name: string }[];
}) => (
  <article className="flex flex-col rounded-[1.4rem] bg-card p-7 shadow-[0_2px_10px_rgba(10,20,10,0.05),0_12px_32px_rgba(10,20,10,0.06)] md:p-8">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
        <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
      </span>
      <div>
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary">
          {kicker}
        </p>
        <h3 className="text-[1.15rem] font-semibold leading-tight text-foreground">
          {title}
        </h3>
      </div>
    </div>
    <p className="mt-4 text-[0.9rem] leading-snug text-muted-foreground">{meta}</p>
    <ul className="mt-6 flex flex-wrap gap-2">
      {entries.map((entry) => (
        <li key={entry.slug}>
          <Link
            to={`/${entry.slug}`}
            className="v8-press group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-3.5 py-1.5 text-[0.9rem] font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            {entry.name}
            <ArrowRight
              className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
              strokeWidth={2.25}
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  </article>
);

export default EinsatzgebieteHub;
