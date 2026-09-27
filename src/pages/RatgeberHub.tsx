import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import BeratungCtaV8 from "@/components/v8/BeratungCtaV8";
import SkipToContent from "@/components/SkipToContent";
import { siteConfig } from "@/lib/siteContent";
import { ratgeber } from "@/lib/ratgeber";

// Ratgeber-Hub. Reine Fachpraxis-Artikel, keine Rechtsberatung.
const RatgeberHub = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Ratgeber ${siteConfig.brandName}`,
    description:
      "Fachwissen aus dem Meisterbetrieb: Pflanzenschutz, Pflege und praktische Antworten für den Garten.",
    url: `${siteConfig.domain}/ratgeber`,
    isPartOf: { "@id": `${siteConfig.domain}/#website` },
  };

  return (
    <>
      <Seo
        title={`Ratgeber | ${siteConfig.brandName}`}
        description="Fachwissen aus dem Meisterbetrieb: Pflanzenschutz, Pflegetipps und praktische Antworten rund um den Garten in Düsseldorf und Umgebung."
        path="/ratgeber"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-background">
        <SkipToContent />
        <HeaderV8 />
        <main id="main">
          <section className="bg-secondary/40 pb-14 pt-32 md:pt-40">
            <div className="mx-auto max-w-[880px] px-4 text-center sm:px-6">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                Ratgeber
              </p>
              <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
                Fachwissen aus dem Meisterbetrieb.
              </h1>
              <p className="mt-5 text-[1.08rem] leading-relaxed text-muted-foreground md:text-[1.15rem]">
                Pflanzenschutz, Pflegetipps und praktische Antworten rund um den Garten in Düsseldorf und Umgebung, direkt vom Gärtnermeister.
              </p>
            </div>
          </section>

          <section className="bg-background py-16 md:py-20">
            <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
              <ul className="grid gap-5 md:gap-6 lg:grid-cols-2">
                {ratgeber.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/ratgeber/${post.slug}`}
                      className="v8-press group flex h-full flex-col rounded-[1.75rem] bg-card p-7 shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)] md:p-8"
                    >
                      <div className="flex items-center gap-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        <span className="text-primary">{post.category}</span>
                        <span aria-hidden>·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                          {post.readingMinutes} Min
                        </span>
                      </div>
                      <h2 className="mt-4 text-[1.35rem] font-semibold leading-tight tracking-[-0.01em] text-foreground group-hover:text-primary md:text-[1.5rem]">
                        {post.h1}
                      </h2>
                      <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-muted-foreground md:text-[1rem]">
                        {post.lead}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-primary">
                        Zum Ratgeber
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={2.25}
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <BeratungCtaV8 />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RatgeberHub;
