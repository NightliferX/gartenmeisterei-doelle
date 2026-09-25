import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import BeratungCtaV8 from "@/components/v8/BeratungCtaV8";
import AreaBlockV8 from "@/components/v8/AreaBlockV8";
import { Button } from "@/components/ui/button";
import { gartenjahr, monthRange, siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

type Season = (typeof gartenjahr)[number];

const SeasonPage = ({ season }: { season: Season }) => {
  const current = new Date().getMonth();
  const isActive = season.months.includes(current);
  const path = `/gartenpflege-${season.slug}-duesseldorf`;
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
        <main className="pb-28">
          <section className="relative isolate min-h-[62vh] w-full overflow-hidden bg-foreground">
            <img
              src={withBase(season.heroImage)}
              alt={season.heroAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

            <div className="relative z-10 mx-auto flex min-h-[62vh] max-w-[1240px] flex-col justify-end px-4 pb-14 pt-32 sm:px-6 md:pb-20">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-white/85">
                Gartenjahr · {monthRange(season.months)}
                {isActive ? (
                  <span className="ml-3 inline-flex items-center rounded-full bg-primary px-3 py-1 text-[0.7rem] font-semibold text-primary-foreground">
                    Jetzt gefragt
                  </span>
                ) : null}
              </p>
              <h1 className="mt-3 max-w-[18ch] text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-white">
                Gartenpflege im {season.season}.
              </h1>
              <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-white/85 md:text-[1.15rem]">
                {season.intro}
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2">
              {season.tasks.map((task) => (
                <article
                  key={task.title}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm md:p-8"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-[1.15rem] font-semibold text-foreground md:text-[1.25rem]">
                        {task.title}
                      </h2>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                        {task.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="mt-10 rounded-2xl border border-primary/25 bg-primary/5 p-6 md:p-8">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" strokeWidth={2} />
                <h2 className="text-[1.1rem] font-semibold text-foreground md:text-[1.2rem]">
                  Tipps vom Gärtnermeister
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-foreground/85">
                {season.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-secondary/50 p-6 md:mt-16 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Beratung
                </p>
                <p className="mt-2 max-w-[46ch] text-[1rem] text-foreground/85">
                  Wir schauen uns Ihren Garten an und schlagen einen passenden
                  {" "}
                  {season.season}-Plan vor — kostenlos und unverbindlich.
                </p>
              </div>
              <Button size="lg" asChild className="rounded-full">
                <a href={withBase("/#kontakt")}>
                  Kostenlose Beratung anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <nav aria-label="Andere Jahreszeiten" className="mt-16">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                Andere Jahreszeiten
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {gartenjahr
                  .filter((s) => s.slug !== season.slug)
                  .map((s) => (
                    <li key={s.slug}>
                      <a
                        href={withBase(`/gartenpflege-${s.slug}-duesseldorf`)}
                        className="group flex items-center justify-between rounded-xl border border-border/70 bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                      >
                        <span className="text-[0.95rem] font-semibold text-foreground">
                          Gartenpflege im {s.season}
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                          strokeWidth={2}
                        />
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          </section>

          <AreaBlockV8 />
          <BeratungCtaV8 />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SeasonPage;
