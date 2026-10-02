import { useMemo, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import BeratungCtaV8 from "@/components/v8/BeratungCtaV8";
import SkipToContent from "@/components/SkipToContent";
import GartenFilm from "@/components/ratgeber/GartenFilm";
import { siteConfig } from "@/lib/siteContent";
import { ratgeber } from "@/lib/ratgeber";

const ALLE = "Alle";

// Ratgeber-Hub: Scroll-Gartenfahrt als Einstieg, darunter die Artikel mit
// Themenfilter. Reine Fachpraxis-Artikel, keine Rechtsberatung.
const RatgeberHub = () => {
  const [topic, setTopic] = useState(ALLE);
  const reduceMotion = useReducedMotion();
  const topics = useMemo(() => [ALLE, ...new Set(ratgeber.map((p) => p.category))], []);
  const posts = ratgeber.filter((p) => topic === ALLE || p.category === topic);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Ratgeber ${siteConfig.brandName}`,
    description:
      "Fachwissen aus dem Meisterbetrieb: Pflanzenschutz, Pflege und praktische Antworten für den Garten.",
    url: `${siteConfig.domain}/ratgeber`,
    isPartOf: { "@id": `${siteConfig.domain}/#website` },
  };

  const zeigeThema = (t: string) => {
    setTopic(topics.includes(t) ? t : ALLE);
    document.getElementById("ratgeber-liste")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
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
          <GartenFilm onTopic={zeigeThema} />

          <section id="ratgeber-liste" className="scroll-mt-28 bg-background pb-16 pt-14 md:pb-20 md:pt-16">
            <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">Ratgeber</p>
              <div className="mt-4 grid gap-5 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-12">
                <h2 className="text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
                  Fachwissen aus dem Meisterbetrieb.
                </h2>
                <p className="text-[1.05rem] leading-relaxed text-muted-foreground">
                  Pflanzenschutz, Pflegetipps und praktische Antworten rund um den Garten in Düsseldorf und Umgebung,
                  direkt vom Gärtnermeister.
                </p>
              </div>

              <div role="group" aria-label="Ratgeber nach Thema filtern" className="mt-10 flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={topic === t}
                    onClick={() => setTopic(t)}
                    className={`v8-press h-10 rounded-full px-5 text-[0.95rem] font-medium shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-colors ${
                      topic === t ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:text-primary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p aria-live="polite" className="mt-5 text-[0.9rem] text-muted-foreground">
                {posts.length} Ratgeber {topic === ALLE ? "für Ihr Gartenjahr" : `zum Thema ${topic}`}
              </p>

              <LayoutGroup>
                <motion.ul layout={!reduceMotion} className="mt-5 grid gap-5 md:gap-6 lg:grid-cols-2">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {posts.map((post, i) => (
                      <motion.li
                        key={post.slug}
                        layout={!reduceMotion}
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                        transition={{ type: "spring", stiffness: 260, damping: 30, delay: reduceMotion ? 0 : i * 0.03 }}
                      >
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
                          <h3 className="mt-4 text-[1.35rem] font-semibold leading-tight tracking-[-0.01em] text-foreground group-hover:text-primary md:text-[1.5rem]">
                            {post.h1}
                          </h3>
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
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </LayoutGroup>
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
