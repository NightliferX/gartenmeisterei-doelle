import { ArrowRight, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/MobileStickyCta";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { services, siteConfig } from "@/lib/siteContent";
import { areaPages, servicePages, type AreaPage as AreaPageData } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

const AreaPage = ({ page }: { page: AreaPageData }) => {
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
        <Header />
        <main className="pb-28">
          <section className="container px-4 pt-28 md:pt-32">
            <div className="mx-auto max-w-4xl">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
                <MapPin className="h-4 w-4" />
                Einsatzgebiet · {page.kind === "Stadtteil" ? "Düsseldorf" : "Umland"}
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                {page.h1}
              </h1>
              {page.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href={withBase("/#kontakt")}>
                    Kostenlose Beratung anfragen
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
                </Button>
              </div>
            </div>
          </section>

          <section className="container px-4 pt-14">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Unsere Leistungen in {page.name.replace("Düsseldorf-", "")}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {servicePages.map((sp) => {
                  const service = services.find((s) => s.id === sp.serviceId);
                  if (!service) return null;
                  return (
                    <a
                      key={sp.slug}
                      href={withBase(`/${sp.slug}`)}
                      className="group rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <h3 className="font-semibold group-hover:text-primary">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Mehr erfahren
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="container px-4 pt-14">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-border/80 bg-secondary/60 p-8 text-center shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">
                Garten in {page.name.replace("Düsseldorf-", "")}? Wir schauen ihn uns an.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                {siteConfig.consultationPromise} — {siteConfig.responsePromise.toLowerCase()}.
              </p>
              <Button size="lg" asChild className="mt-6">
                <a href={withBase("/#kontakt")}>
                  Jetzt anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <p className="mt-6 text-sm text-muted-foreground">
                Auch in der Nähe:{" "}
                {areaPages
                  .filter((a) => a.slug !== page.slug)
                  .slice(0, 3)
                  .map((a, index) => (
                    <span key={a.slug}>
                      {index > 0 ? " · " : ""}
                      <a className="text-primary hover:underline" href={withBase(`/${a.slug}`)}>
                        {a.name.replace("Düsseldorf-", "")}
                      </a>
                    </span>
                  ))}
              </p>
            </div>
          </section>
        </main>
        <Footer />
        <MobileStickyCta />
      </div>
    </>
  );
};

export default AreaPage;
