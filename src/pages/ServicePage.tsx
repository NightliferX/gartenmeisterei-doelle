import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Phone } from "lucide-react";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BeratungCtaV8, { oeffneBeratung } from "@/components/v8/BeratungCtaV8";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { projects, services, siteConfig } from "@/lib/siteContent";
import { servicePages, type ServicePage as ServicePageData } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

// Leistungs-Unterseite im V8-/Apple-Look: Cinematic-Hero, viel Weissraum,
// weiche Schatten statt Rahmen, dunkles Editorial-Panel für den Ablauf.

// Passendes Referenzprojekt je Leistung (Titel-Teilstring aus siteContent).
// Zu einer Leistung koennen mehrere Referenzen gehoeren — sie werden dann
// untereinander gezeigt, jede mit eigenem Namen und Ort.
const projectMatchFor: Record<string, string[]> = {
  gartenpflege: ["Verwilderten Garten"],
  heckenschnitt: ["Hecke am Hausweg", "Vorgartenhecke"],
  baumschnitt: ["Obstbäume"],
  rasenpflege: ["Rollrasen"],
  rollrasen: ["Rollrasen"],
  herbst: ["Garten winterfest"],
  saison: ["Garten winterfest"],
};

const ablauf = [
  {
    title: "Ihre Anfrage",
    text: `Kurz beschreiben, worum es geht — per Formular, WhatsApp oder Telefon. ${siteConfig.responsePromise}.`,
  },
  {
    title: "Beratung im Garten",
    text: "Wir schauen uns die Fläche vor Ort an und sagen ehrlich, was nötig ist und was warten kann. Kostenlos und unverbindlich.",
  },
  {
    title: "Angebot mit klarem Umfang",
    text: "Sie bekommen schriftlich, was gemacht wird — auf Wunsch als Pflegevertrag mit festem Preis pro Termin.",
  },
  {
    title: "Termin nach Plan",
    text: "Wir kommen zum vereinbarten Zeitpunkt. Schnittgut und Grünabfall nehmen wir direkt mit.",
  },
];

const ServicePage = ({ page }: { page: ServicePageData }) => {
  useScrollAnimation();
  const service = services.find((s) => s.id === page.serviceId);
  const heroImage = page.heroImage ?? service?.image;
  const heroAlt = page.heroAlt ?? service?.title ?? page.h1;
  const [headline, subline] = page.h1.split(" — ");
  const referenzen = (projectMatchFor[page.serviceId] ?? [])
    .map((match) =>
      projects.find((p) => p.title.includes(match) && p.beforeImage && p.afterImage),
    )
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  const otherPages = servicePages.filter((p) => p.slug !== page.slug);
  const photoItems = page.included.filter((item) => item.image);
  const plainItems = page.included.filter((item) => !item.image);
  // Ein einzelner Punkt laeuft ueber die volle Breite, drei stehen zu dritt
  // nebeneinander — sonst zwei Spalten.
  const colsFor = (count: number) =>
    count === 1 ? "" : count === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service?.title ?? page.h1,
      description: page.metaDescription,
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
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Start",
          item: siteConfig.domain,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: service?.title ?? page.h1,
          item: `${siteConfig.domain}/${page.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={page.metaTitle}
        description={page.metaDescription}
        path={`/${page.slug}`}
        image={heroImage?.startsWith("http") ? heroImage : undefined}
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-background">
        <HeaderV8 />
        <main>
          {/* Cinematic Hero */}
          <section className="relative isolate min-h-[84vh] w-full overflow-hidden bg-foreground">
            {heroImage ? (
              <img
                src={heroImage.startsWith("http") ? heroImage : withBase(heroImage)}
                alt={heroAlt}
                className="absolute inset-0 h-full w-full object-cover"
                style={page.heroImageMirror ? { transform: "scaleX(-1)" } : undefined}
                loading="eager"
                decoding="async"
              />
            ) : null}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25"
            />

            <div className="relative z-10 mx-auto flex min-h-[84vh] max-w-[1240px] flex-col justify-end px-4 pb-16 pt-40 sm:px-6 md:pb-24">
              <p className="v8-rise text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-white/85">
                Leistung · Düsseldorf & Umgebung
              </p>
              <h1 className="v8-rise mt-4 max-w-[18ch] text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-white">
                {headline}.
                {subline ? (
                  <span className="mt-3 block text-[0.42em] font-medium leading-[1.25] tracking-[-0.01em] text-white/75">
                    {subline.charAt(0).toUpperCase() + subline.slice(1)}.
                  </span>
                ) : null}
              </h1>
              <p className="v8-rise-2 mt-6 max-w-[54ch] text-[1.1rem] leading-relaxed text-white/85 md:text-[1.2rem]">
                {page.intro[0]}
              </p>
              <div className="v8-rise-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={oeffneBeratung}
                  className="v8-press inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-white px-7 text-[1rem] font-semibold text-foreground shadow-lg shadow-black/25 hover:bg-white/90"
                >
                  Kostenlose Beratung anfragen
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </button>
                <a
                  href={siteConfig.phoneHref}
                  aria-label={`Anrufen: ${siteConfig.phoneDisplay}`}
                  className="v8-press inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-[1rem] font-medium text-white backdrop-blur-sm hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  Anrufen
                </a>
              </div>
            </div>
          </section>

          {/* Einstiegstext */}
          {page.intro.length > 1 ? (
            <section className="bg-background py-16 md:py-24">
              <div className="mx-auto max-w-[760px] px-4 sm:px-6">
                {page.intro.slice(1).map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="scroll-fade-in text-[1.15rem] leading-[1.65] text-muted-foreground md:text-[1.3rem] md:leading-[1.6]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {/* Das ist enthalten */}
          <section className="bg-background py-20 md:py-28">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="scroll-fade-in mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Leistungsumfang
                </p>
                <h2 className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Das ist enthalten.
                </h2>
              </div>

              {/* Erst die Punkte mit Foto als große Kacheln, darunter die
                  übrigen als ruhige Icon-Karten — so bleiben die Reihen
                  gleich hoch, auch wenn es nicht zu jedem Punkt ein Bild gibt. */}
              {photoItems.length ? (
                <div
                  className={`mt-12 grid gap-5 md:mt-16 md:gap-6 ${colsFor(photoItems.length)}`}
                >
                  {photoItems.map((item) => (
                    <article
                      key={item.title}
                      className="scroll-fade-in group flex flex-col overflow-hidden rounded-[1.75rem] bg-card shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                    >
                      <img
                        src={withBase(item.image!)}
                        alt={item.imageAlt ?? ""}
                        loading="lazy"
                        decoding="async"
                        className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
                          photoItems.length > 1
                            ? "aspect-[16/10]"
                            : "aspect-[16/10] md:aspect-[2.6/1]"
                        }`}
                      />
                      <div className="flex flex-col p-8 md:p-10">
                        <h3 className="text-[1.35rem] font-semibold leading-tight text-foreground md:text-[1.5rem]">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-[60ch] text-[0.98rem] leading-relaxed text-muted-foreground md:text-[1.02rem]">
                          {item.text}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}

              {plainItems.length ? (
                <div
                  className={`grid gap-5 md:gap-6 ${photoItems.length ? "mt-5 md:mt-6" : "mt-12 md:mt-16"} ${colsFor(plainItems.length)}`}
                >
                  {plainItems.map((item) => (
                    <article
                      key={item.title}
                      className="scroll-fade-in flex flex-col rounded-[1.75rem] bg-card p-8 shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:p-10"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <CheckCircle2 className="h-6 w-6" strokeWidth={2} />
                      </span>
                      <h3 className="mt-5 text-[1.35rem] font-semibold leading-tight text-foreground md:text-[1.5rem]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground md:text-[1.02rem]">
                        {item.text}
                      </p>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </section>

          {/* Ablauf — dunkles Editorial-Panel */}
          <section className="bg-[#0d120d] py-20 md:py-28">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="scroll-fade-in mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  So läuft es ab
                </p>
                <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-white">
                  Vier Schritte. Keine Überraschungen.
                </h2>
              </div>

              <ol className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
                {ablauf.map((step, index) => (
                  <li
                    key={step.title}
                    className="scroll-fade-in rounded-[1.5rem] bg-white/[0.06] p-7"
                  >
                    <span className="text-[0.8rem] font-semibold tracking-[0.18em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-[1.2rem] font-semibold leading-tight text-white">
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

          {/* Vorher / Nachher — eine oder mehrere Referenzen untereinander */}
          {referenzen.length ? (
            <section className="bg-background py-20 md:py-28">
              <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
                <div className="scroll-fade-in mx-auto max-w-3xl text-center">
                  <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                    Aus der Praxis
                  </p>
                  <h2 className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                    {referenzen.length > 1 ? "Zwei Beispiele." : "Vorher. Nachher."}
                  </h2>
                </div>

                <div className="mt-10 flex flex-col gap-16 md:mt-14 md:gap-20">
                  {referenzen.map((referenz, index) => (
                    <div
                      key={referenz.title}
                      className={`grid gap-8 lg:items-center lg:gap-12 ${
                        index % 2 === 1
                          ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]"
                          : "lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
                      }`}
                    >
                      <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                        <BeforeAfterSlider
                          className="border-0 shadow-[0_18px_48px_-24px_rgba(0,0,0,0.45)]"
                          title={referenz.title}
                          beforeImage={
                            referenz.beforeImage ? withBase(referenz.beforeImage) : undefined
                          }
                          afterImage={
                            referenz.afterImage ? withBase(referenz.afterImage) : undefined
                          }
                          beforeAlt={referenz.beforeAlt}
                          afterAlt={referenz.afterAlt}
                        />
                      </div>
                      <div className={`text-center lg:text-left ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                        <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          {referenz.location}
                        </p>
                        <h3 className="mt-2 text-[clamp(1.4rem,2.8vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                          {referenz.title}
                        </h3>
                        <p className="mx-auto mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-muted-foreground lg:mx-0 lg:text-[1.05rem]">
                          {referenz.solution}
                        </p>
                        <p className="mx-auto mt-3 max-w-[52ch] text-[1rem] font-medium leading-relaxed text-foreground lg:mx-0">
                          {referenz.result}.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* Häufige Fragen */}
          <section className="bg-secondary/40 py-20 md:py-28">
            <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
              <div className="scroll-fade-in text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Häufige Fragen
                </p>
                <h2 className="mt-3 text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  {service?.title ?? "Diese Leistung"} — kurz erklärt.
                </h2>
              </div>

              <div className="mt-10 rounded-3xl bg-white p-2 shadow-sm ring-1 ring-border/60 sm:p-4 md:p-6">
                <ul className="divide-y divide-border/60">
                  {page.faq.map((item, i) => (
                    <li key={item.question}>
                      <FaqRow question={item.question} answer={item.answer} defaultOpen={i === 0} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Weitere Leistungen */}
          <section className="bg-background py-20 md:py-28">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="scroll-fade-in mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Alles aus einer Hand
                </p>
                <h2 className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Weitere Leistungen.
                </h2>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3">
                {otherPages.map((other) => {
                  const otherService = services.find((s) => s.id === other.serviceId);
                  const image = other.heroImage ?? otherService?.image;
                  return (
                    <a
                      key={other.slug}
                      href={withBase(`/${other.slug}`)}
                      className="v8-press group relative block aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_2px_18px_rgba(0,0,0,0.06)]"
                    >
                      {image ? (
                        <img
                          src={image.startsWith("http") ? image : withBase(image)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary" />
                      )}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                        <h3 className="text-2xl font-semibold leading-tight text-white md:text-[1.7rem]">
                          {otherService?.title ?? other.h1}
                        </h3>
                        <span className="mt-3 inline-flex items-center gap-1 text-[0.85rem] font-semibold text-white">
                          Mehr erfahren
                          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                        </span>
                      </div>
                    </a>
                  );
                })}
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

export default ServicePage;
