import { useState } from "react";
import { ArrowRight, Building2, CheckCircle2, ChevronDown, Phone, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import SkipToContent from "@/components/SkipToContent";
import BeratungCtaV8, { oeffneBeratung } from "@/components/v8/BeratungCtaV8";
import { siteConfig } from "@/lib/siteContent";
import {
  objektAblauf,
  objektFaq,
  objektHeroAlt,
  objektHeroImage,
  objektLeistungen,
  objektProfile,
  objektReferenzen,
  objektTypen,
  objektVorteile,
} from "@/lib/hausverwaltung";
import { withBase } from "@/lib/utils";

// B2B-Seite für Hausverwaltungen, WEG und Gewerbe. Aufbau nach dem Muster
// „Trust & Authority": Hero mit Anspruch, belegbare Argumente, Leistungs-
// und Objektüberblick, Ablauf, Referenzen (sobald vorhanden), FAQ, CTA.
// Ruhig gehalten — die Zielgruppe entscheidet nach Verlässlichkeit, nicht
// nach Effekt.

const HausverwaltungPage = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Objektbetreuung für Hausverwaltungen und Gewerbe",
      serviceType: "Grünflächenpflege für Wohnanlagen und Gewerbeobjekte",
      description:
        "Grünpflege für Mehrfamilienhäuser, Wohnanlagen und Gewerbeobjekte in Düsseldorf und Umgebung: fester Turnus, Nachweis je Einsatz, Abrechnung je Objekt.",
      areaServed: { "@type": "City", name: "Düsseldorf" },
      provider: {
        "@type": "Landscaper",
        name: siteConfig.brandName,
        telephone: siteConfig.phoneRaw,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.city,
          postalCode: siteConfig.postalCode,
          addressCountry: siteConfig.country,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: objektFaq.map((item) => ({
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Hausverwaltungen & Gewerbe",
          item: `${siteConfig.domain}/hausverwaltung`,
        },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={`Hausverwaltung & Gewerbe | ${siteConfig.brandName} Düsseldorf`}
        description="Grünpflege für Wohnanlagen, WEG und Gewerbeobjekte in Düsseldorf: fester Pflegeturnus, Nachweis nach jedem Einsatz, Abrechnung je Objekt. Vom Meisterbetrieb."
        path="/hausverwaltung"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-background">
        <SkipToContent />
        <HeaderV8 />
        <main id="main">
          {/* Hero */}
          <section className="bg-secondary/40 pb-16 pt-32 md:pb-20 md:pt-40">
            <div className="mx-auto max-w-[880px] px-4 sm:px-6">
              <p className="inline-flex items-center gap-2 text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                <Building2 className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                Für Hausverwaltungen & Gewerbe
              </p>
              <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
                Grünpflege für Wohnanlagen und Gewerbeobjekte.
              </h1>
              <p className="mt-5 max-w-[56ch] text-[1.08rem] leading-relaxed text-muted-foreground md:text-[1.15rem]">
                Ein fester Pflegeplan über die ganze Saison, ein Ansprechpartner
                für alle Flächen und ein Nachweis nach jedem Einsatz — damit Sie
                in der Eigentümerversammlung belegen können, was am Objekt
                passiert ist.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={oeffneBeratung}
                  className="v8-press inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[0.98rem] font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
                >
                  Objektbegehung anfragen
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                </button>
                <a
                  href={siteConfig.phoneHref}
                  aria-label={`Anrufen: ${siteConfig.phoneDisplay}`}
                  className="v8-press inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-[0.98rem] font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                  Anrufen
                </a>
              </div>
            </div>

            {/* Bühnenbild */}
            <div className="mx-auto mt-12 max-w-[1240px] px-4 sm:px-6 md:mt-14">
              <img
                src={withBase(objektHeroImage)}
                width={1536}
                height={1024}
                alt={objektHeroAlt}
                loading="eager"
                decoding="async"
                className="aspect-[16/9] w-full rounded-[1.75rem] object-cover shadow-[0_18px_48px_-24px_rgba(0,0,0,0.45)] md:aspect-[2.4/1]"
              />
            </div>
          </section>

          {/* Argumente */}
          <section className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Was Sie bekommen
                </p>
                <h2 className="mt-3 text-[clamp(1.8rem,3.8vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Planbar statt auf Zuruf.
                </h2>
              </div>

              <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {objektVorteile.map((punkt) => (
                  <article
                    key={punkt.title}
                    className="flex flex-col rounded-[1.75rem] bg-card p-7 shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:p-8"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <CheckCircle2 className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[1.2rem] font-semibold leading-tight text-foreground md:text-[1.3rem]">
                      {punkt.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground md:text-[1rem]">
                      {punkt.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Leistungen am Objekt */}
          <section className="bg-secondary/40 py-16 md:py-24">
            <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Leistungsumfang
                </p>
                <h2 className="mt-3 text-[clamp(1.8rem,3.8vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Das kommt am Objekt zusammen.
                </h2>
              </div>

              <dl className="mt-10 grid gap-x-10 gap-y-8 md:mt-12 md:grid-cols-2">
                {objektLeistungen.map((leistung) => (
                  <div key={leistung.title} className="border-t border-border pt-5">
                    <dt className="text-[1.05rem] font-semibold text-foreground md:text-[1.15rem]">
                      {leistung.title}
                    </dt>
                    <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground md:text-[1rem]">
                      {leistung.text}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-10 text-center text-[0.95rem] text-muted-foreground">
                Jede Position gibt es auch einzeln —{" "}
                <Link
                  to="/leistungen"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  alle Leistungen im Detail
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Objektarten */}
          <section className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Für welche Objekte
                </p>
                <h2 className="mt-3 text-[clamp(1.8rem,3.8vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Vom Mehrfamilienhaus bis zur Wohnanlage.
                </h2>
              </div>

              <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
                {objektTypen.map((typ) => (
                  <article
                    key={typ.title}
                    className="flex flex-col overflow-hidden rounded-[1.75rem] bg-card shadow-[0_2px_18px_rgba(0,0,0,0.05)]"
                  >
                    {typ.image ? (
                      <img
                        src={withBase(typ.image)}
                        width={typ.imageWidth ?? 1536}
                        height={typ.imageHeight ?? 1024}
                        alt={typ.imageAlt ?? ""}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full object-cover"
                      />
                    ) : null}
                    <div className="flex flex-1 flex-col p-7 md:p-8">
                      <h3 className="text-[1.2rem] font-semibold leading-tight text-foreground md:text-[1.3rem]">
                        {typ.title}
                      </h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground md:text-[1rem]">
                        {typ.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Ablauf */}
          <section className="bg-[#0d120d] py-16 md:py-24">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  So läuft die Zusammenarbeit
                </p>
                <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-white">
                  Vier Schritte bis zum Saisonplan.
                </h2>
              </div>

              <ol className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
                {objektAblauf.map((schritt, index) => (
                  <li key={schritt.title} className="rounded-[1.5rem] bg-white/[0.06] p-7">
                    <span className="text-[0.8rem] font-semibold tracking-[0.18em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-[1.15rem] font-semibold leading-tight text-white">
                      {schritt.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-white/75">
                      {schritt.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Musterobjekte: Größenordnungen, ausdrücklich als Beispiel gekennzeichnet */}
          <section className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Umfang
                </p>
                <h2 className="mt-3 text-[clamp(1.8rem,3.8vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  So groß dürfen die Flächen sein.
                </h2>
                <p className="mt-5 text-[1.02rem] leading-relaxed text-muted-foreground md:text-[1.08rem]">
                  Drei typische Zuschnitte, damit Sie den Aufwand einschätzen
                  können, bevor Sie anfragen. Das sind Beispiele und keine
                  Referenzkunden — was an Ihrem Objekt anfällt, steht nach der
                  Begehung schriftlich im Leistungsverzeichnis.
                </p>
              </div>

              <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
                {objektProfile.map((profil) => (
                  <article
                    key={profil.titel}
                    className="flex flex-col rounded-[1.75rem] bg-card p-7 shadow-[0_2px_18px_rgba(0,0,0,0.05)] md:p-8"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <Ruler className="h-5 w-5" strokeWidth={2} aria-hidden />
                      </span>
                      <span className="rounded-full bg-secondary px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Beispiel
                      </span>
                    </div>
                    <h3 className="mt-5 text-[1.2rem] font-semibold leading-tight text-foreground md:text-[1.3rem]">
                      {profil.titel}
                    </h3>
                    <p className="mt-1 text-[0.9rem] font-medium text-primary">
                      {profil.groesse}
                    </p>
                    <dl className="mt-5 space-y-4 border-t border-border/60 pt-5">
                      <div>
                        <dt className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Flächen
                        </dt>
                        <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-foreground/85">
                          {profil.flaechen}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Turnus
                        </dt>
                        <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-foreground/85">
                          {profil.turnus}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Abrechnung
                        </dt>
                        <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-foreground/85">
                          {profil.abrechnung}
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Referenzobjekte — erscheint, sobald echte Objekte freigegeben sind */}
          {objektReferenzen.length ? (
            <section className="bg-background py-16 md:py-24">
              <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                    Aus der Objektbetreuung
                  </p>
                  <h2 className="mt-3 text-[clamp(1.8rem,3.8vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                    Objekte, die wir betreuen.
                  </h2>
                </div>

                <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                  {objektReferenzen.map((referenz) => (
                    <article
                      key={`${referenz.objekt}-${referenz.ort}`}
                      className="flex flex-col overflow-hidden rounded-[1.75rem] bg-card shadow-[0_2px_18px_rgba(0,0,0,0.05)]"
                    >
                      {referenz.image ? (
                        <img
                          src={withBase(referenz.image)}
                          alt={referenz.imageAlt ?? ""}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[16/10] w-full object-cover"
                        />
                      ) : null}
                      <div className="flex flex-1 flex-col p-7">
                        <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          {referenz.ort}
                        </p>
                        <h3 className="mt-2 text-[1.2rem] font-semibold leading-tight text-foreground">
                          {referenz.objekt}
                        </h3>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                          {referenz.umfang}
                        </p>
                        <p className="mt-3 text-[0.9rem] text-muted-foreground">
                          <span className="font-semibold text-foreground">Turnus:</span>{" "}
                          {referenz.turnus}
                        </p>
                        <p className="mt-auto pt-4 text-[0.95rem] font-medium leading-relaxed text-foreground">
                          {referenz.ergebnis}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* FAQ */}
          <section className="bg-secondary/40 py-16 md:py-24">
            <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
              <div className="text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Häufige Fragen
                </p>
                <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Was Verwaltungen meistens wissen wollen.
                </h2>
              </div>

              <div className="mt-10 rounded-3xl bg-white p-2 shadow-sm ring-1 ring-border/60 sm:p-4 md:p-6">
                <ul className="divide-y divide-border/60">
                  {objektFaq.map((item, i) => (
                    <li key={item.question}>
                      <FaqRow question={item.question} answer={item.answer} defaultOpen={i === 0} />
                    </li>
                  ))}
                </ul>
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

const FaqRow = ({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="px-3 sm:px-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="v8-press flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[1.05rem] font-semibold leading-snug tracking-[-0.005em] text-foreground md:text-[1.15rem]">
          {question}
        </span>
        <ChevronDown
          aria-hidden
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="text-[0.95rem] leading-relaxed text-muted-foreground md:text-[1rem]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HausverwaltungPage;
