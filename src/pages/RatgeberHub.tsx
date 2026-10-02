import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
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

          <section id="ratgeber-liste" className="scroll-mt-28 bg-background pb-24 pt-16">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-primary">Ratgeber</p>
              <div className="mb-12 mt-5 grid gap-5 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
                <h2 className="pb-[0.06em] text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground">
                  Für alles, was bei Ihnen <em className="pr-[0.06em] italic text-primary">wächst.</em>
                </h2>
                <p className="max-w-[40ch] font-['Inter'] text-[1.06rem] leading-relaxed tracking-normal text-muted-foreground">
                  Praktische Antworten statt grüner Mythen. Unsere Ratgeber begleiten Sie durch Ihr Gartenjahr in
                  Düsseldorf und Umgebung.
                </p>
              </div>

              <div role="group" aria-label="Ratgeber nach Thema filtern" className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={topic === t}
                    onClick={() => setTopic(t)}
                    className={`h-10 rounded-full px-[18px] font-['Inter'] text-[0.94rem] font-medium tracking-normal shadow-[0_2px_10px_rgba(10,20,10,0.04),0_12px_32px_rgba(10,20,10,0.06)] transition-colors active:scale-[0.97] ${
                      topic === t ? "bg-primary text-primary-foreground" : "bg-white text-foreground hover:text-primary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p aria-live="polite" className="mb-5 mt-5 font-['Inter'] text-[0.875rem] tracking-normal text-muted-foreground">
                {posts.length} Ratgeber {topic === ALLE ? "für Ihr Gartenjahr" : `zum Thema ${topic}`}
              </p>

              <LayoutGroup>
                <motion.ul layout={!reduceMotion} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                          className="group flex h-full min-h-[260px] flex-col gap-3.5 rounded-[22px] bg-white px-[26px] pb-6 pt-[26px] shadow-[0_2px_10px_rgba(10,20,10,0.04),0_12px_32px_rgba(10,20,10,0.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-[0_2px_10px_rgba(10,20,10,0.05),0_20px_48px_rgba(10,20,10,0.1)]"
                        >
                          <span className="flex items-baseline gap-2.5 font-['Inter'] text-[0.75rem]">
                            <span className="font-semibold uppercase tracking-[0.14em] text-primary">{post.category}</span>
                            <span className="font-medium tracking-[0.02em] text-muted-foreground">
                              {post.readingMinutes} Min. Lesezeit
                            </span>
                          </span>
                          <h3 className="text-[1.31rem] leading-[1.2] text-foreground">{post.h1}</h3>
                          <p className="line-clamp-4 flex-1 font-['Inter'] text-[0.94rem] leading-[1.55] tracking-normal text-muted-foreground">
                            {post.lead}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-[0.94rem] font-semibold text-primary">
                            Ratgeber lesen
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
