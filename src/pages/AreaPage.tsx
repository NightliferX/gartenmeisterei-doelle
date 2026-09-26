import { ArrowRight, MapPin } from "lucide-react";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import BeratungCtaV8 from "@/components/v8/BeratungCtaV8";
import { services, siteConfig } from "@/lib/siteContent";
import { areaPages, servicePages, type AreaPage as AreaPageData } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

const serviceSlugFor = (id: string) =>
  ({
    gartenpflege: "gartenpflege",
    heckenschnitt: "heckenschnitt",
    baumschnitt: "baumschnitt",
    rasenpflege: "rasenpflege",
    herbst: "laubentsorgung",
    saison: "winterservice",
    rollrasen: "rollrasen",
  }[id] ?? id);

const srcFor = (image?: string) =>
  image ? (/^https?:\/\//.test(image) ? image : withBase(image)) : undefined;

const AreaPage = ({ page }: { page: AreaPageData }) => {
  const shortName = page.name.replace("Düsseldorf-", "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Landscaper",
    name: siteConfig.brandName,
    description: page.metaDescription,
    telephone: siteConfig.phoneRaw,
    areaServed: { "@type": "Place", name: page.name },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.country,
    },
  };

  return (
    <>
      <Seo
        title={page.metaTitle}
        description={page.metaDescription}
        path={`/${page.slug}`}
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-background">
        <HeaderV8 />
        <main>
          {/* Cinematic Hero — V8/Apple */}
          <section className="relative isolate min-h-[62vh] w-full overflow-hidden bg-foreground">
            <img
              src={withBase("/team/gaertnermeister-buchsbaum-formschnitt-duesseldorf.jpg")}
              alt={`Gepflegter Vorgarten in ${shortName}`}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20"
            />

            <div className="relative z-10 mx-auto flex min-h-[62vh] max-w-[1240px] flex-col justify-end px-4 pb-14 pt-40 sm:px-6 md:pb-20">
              <p className="inline-flex items-center gap-2 text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-white/85">
                <MapPin className="h-4 w-4" strokeWidth={2.25} />
                Einsatzgebiet · {page.kind === "Stadtteil" ? "Düsseldorf" : "Umland"}
              </p>
              <h1 className="mt-4 max-w-[20ch] text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.02em] text-white">
                {page.h1}
              </h1>
              {page.intro[0] ? (
                <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-white/85 md:text-[1.15rem]">
                  {page.intro[0]}
                </p>
              ) : null}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={withBase("/#kontakt")}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[0.98rem] font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
                >
                  Kostenlose Beratung anfragen
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 text-[0.98rem] font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </section>

          {/* Weiterer Intro-Text (Absatz 2+), wenn vorhanden */}
          {page.intro.length > 1 ? (
            <section className="bg-background py-16 md:py-20">
              <div className="mx-auto max-w-[880px] px-4 sm:px-6">
                {page.intro.slice(1).map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-[1.05rem] leading-relaxed text-muted-foreground md:text-[1.1rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {/* Leistungen in dieser Stadt — Foto-Kacheln im V8-Look */}
          <section className="bg-background py-20 md:py-24">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Leistungen
                </p>
                <h2 className="mt-3 text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
                  Was wir in {shortName} für Sie tun.
                </h2>
              </div>

              <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {services.map((service) => {
                  const src = srcFor(service.image);
                  return (
                    <a
                      key={service.id}
                      href={withBase(`/${serviceSlugFor(service.id)}`)}
                      className="group flex flex-col overflow-hidden rounded-[1.5rem] bg-card shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                        {src ? (
                          <img
                            src={src}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-[1.15rem] font-semibold leading-tight text-foreground group-hover:text-primary">
                          {service.title}
                        </h3>
                        <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-muted-foreground">
                          {service.highlights?.join(" · ")}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-primary">
                          Mehr erfahren
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            strokeWidth={2.5}
                          />
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Andere Einsatzgebiete — Chip-Wolke im V8-Look */}
          <section className="bg-background pb-20 md:pb-24">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  Auch in der Nähe
                </p>
                <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[1.15] tracking-[-0.015em] text-foreground">
                  Wir sind auch in Ihrer Umgebung.
                </h2>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {areaPages
                  .filter((a) => a.slug !== page.slug)
                  .map((a) => (
                    <a
                      key={a.slug}
                      href={withBase(`/${a.slug}`)}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-[0.92rem] font-medium text-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <MapPin
                        className="h-4 w-4 text-primary"
                        strokeWidth={2.25}
                      />
                      {a.name.replace("Düsseldorf-", "")}
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

export default AreaPage;
