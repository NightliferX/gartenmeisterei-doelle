import { ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/MobileStickyCta";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services, siteConfig } from "@/lib/siteContent";
import { servicePages, type ServicePage as ServicePageData } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

const ServicePage = ({ page }: { page: ServicePageData }) => {
  const service = services.find((s) => s.id === page.serviceId);

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
  ];

  return (
    <>
      <Seo
        title={page.metaTitle}
        description={page.metaDescription}
        path={`/${page.slug}`}
        image={service?.image?.startsWith("http") ? service.image : undefined}
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pb-28">
          <section className="container px-4 pt-28 md:pt-32">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Leistung · Düsseldorf & Umgebung
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

          {service ? (
            <section className="container px-4 pt-14">
              <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border/80 shadow-sm">
                <img
                  src={withBase(service.image)}
                  alt={service.title}
                  className="aspect-[2/1] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </section>
          ) : null}

          <section className="container px-4 pt-14">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Das ist enthalten
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {page.included.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="container px-4 pt-14">
            <div className="mx-auto max-w-4xl rounded-3xl border bg-card px-6 py-3 shadow-sm md:px-8">
              <Accordion type="single" collapsible>
                {page.faq.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section className="container px-4 pt-14">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-border/80 bg-secondary/60 p-8 text-center shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">
                {siteConfig.consultationPromise}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Beschreiben Sie uns kurz Ihren Garten — wir melden uns meist
                innerhalb von 24 Stunden mit einer ersten Einschätzung.
              </p>
              <Button size="lg" asChild className="mt-6">
                <a href={withBase("/#kontakt")}>
                  Jetzt anfragen
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <p className="mt-6 text-sm text-muted-foreground">
                Weitere Leistungen:{" "}
                {servicePages
                  .filter((p) => p.slug !== page.slug)
                  .slice(0, 3)
                  .map((p, index) => (
                    <span key={p.slug}>
                      {index > 0 ? " · " : ""}
                      <a className="text-primary hover:underline" href={withBase(`/${p.slug}`)}>
                        {services.find((s) => s.id === p.serviceId)?.title}
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

export default ServicePage;
