import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import BeratungCtaV8 from "@/components/v8/BeratungCtaV8";
import BreadcrumbsV8 from "@/components/v8/BreadcrumbsV8";
import { gartenjahr, monthRange, siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

type Season = (typeof gartenjahr)[number];

const SeasonPage = ({ season }: { season: Season }) => {
  const current = new Date().getMonth();
  const isActive = season.months.includes(current);
  const path = `/gartenpflege-${season.slug}`;
  const metaTitle = `Gartenpflege im ${season.season} — ${siteConfig.brandName}`;
  const metaDescription = `${season.intro} Gärtnermeister-Betrieb aus Düsseldorf für ${season.season}-Arbeiten: ${season.work}.`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Gartenpflege ${season.season}`,
      description: metaDescription,
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
  ];

  return (
    <>
      <Seo title={metaTitle} description={metaDescription} path={path} jsonLd={jsonLd} />
      <div className="min-h-screen bg-background">
        <HeaderV8 />
        <main>
          <BreadcrumbsV8
            items={[
              { label: "Start", href: "/" },
              { label: "Gartenjahr", href: "/#gartenjahr" },
              { label: season.season },
            ]}
          />

          {/* Cinematic Hero — V8/Apple-Stil */}
          <section className="relative isolate min-h-[80vh] w-full overflow-hidden bg-foreground">
            <img
              src={withBase(season.heroImage)}
              alt={season.heroAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-[1240px] flex-col justify-end px-4 pb-16 pt-40 sm:px-6 md:pb-24">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-white/85">
                Gartenjahr · {monthRange(season.months)}
                {isActive ? (
                  <span className="ml-3 inline-flex items-center rounded-full bg-primary px-3 py-1 text-[0.7rem] font-semibold text-primary-foreground">
                    Jetzt gefragt
                  </span>
                ) : null}
              </p>
              <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-white">
                Gartenpflege im {season.season}.
              </h1>
              <p className="mt-6 max-w-[52ch] text-[1.1rem] leading-relaxed text-white/85 md:text-[1.2rem]">
                {season.intro}
              </p>
            </div>
          </section>

          {/* Aufgaben — Apple-Cards mit soften Schatten, viel Whitespace */}
          <section className="bg-background py-20 md:py-28">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Was ansteht
                </p>
                <h2 className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  {season.season}-Arbeiten aus einer Hand.
                </h2>
              </div>

              <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
                {season.tasks.map((task) => (
                  <article
                    key={task.title}
                    className="group flex flex-col rounded-[1.75rem] bg-card p-8 shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:p-10"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <CheckCircle2 className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <h3 className="mt-5 text-[1.35rem] font-semibold leading-tight text-foreground md:text-[1.5rem]">
                      {task.title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground md:text-[1.02rem]">
                      {task.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Tipps — dunkles Editorial-Panel, wie WerkstattV8 */}
          <section className="bg-[#0d120d] py-20 md:py-24">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="inline-flex items-center gap-2 text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2.25} />
                  Tipps vom Gärtnermeister
                </p>
                <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-white">
                  Was jetzt zählt.
                </h2>
              </div>

              <ul className="mx-auto mt-10 grid max-w-4xl gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
                {season.tips.map((tip) => (
                  <li
                    key={tip}
                    className="rounded-[1.5rem] bg-white/[0.06] p-6 text-[0.98rem] leading-relaxed text-white/85"
                  >
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Andere Jahreszeiten — Foto-Kacheln im V8-Cinematic-Look */}
          <section className="bg-background py-20 md:py-28">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Das Gartenjahr
                </p>
                <h2 className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Andere Jahreszeiten.
                </h2>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3">
                {gartenjahr
                  .filter((s) => s.slug !== season.slug)
                  .map((s) => (
                    <a
                      key={s.slug}
                      href={withBase(`/gartenpflege-${s.slug}`)}
                      className="group relative block aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_2px_18px_rgba(0,0,0,0.06)]"
                    >
                      <img
                        src={withBase(s.heroImage)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/80">
                          {monthRange(s.months)}
                        </p>
                        <h3 className="mt-1 text-2xl font-semibold leading-tight text-white md:text-[1.7rem]">
                          {s.season}
                        </h3>
                        <span className="mt-3 inline-flex items-center gap-1 text-[0.85rem] font-semibold text-white">
                          Mehr erfahren
                          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                        </span>
                      </div>
                    </a>
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

export default SeasonPage;
