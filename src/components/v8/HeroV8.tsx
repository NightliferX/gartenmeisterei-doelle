import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gartenjahr, siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// V4-Cinematic-Hero mit dem Buchsbaum-Bild und V6-Grün.
// Bild scrollt langsamer als der Vordergrund (Parallax), Text bleibt statisch.
// Gartenjahr als dunkler Block, der von unten in den Hero ragt.
type HeroV8Props = { imageSrc?: string; imageAlt?: string };
const DEFAULT_HERO_IMG = "/team/gaertnermeister-buchsbaum-formschnitt-duesseldorf.jpg";
const DEFAULT_HERO_ALT = "Gärtnermeister beim Formschnitt im Vorgarten";
const HeroV8 = ({ imageSrc, imageAlt }: HeroV8Props = {}) => {
  const month = new Date().getMonth();
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  useEffect(() => progress.set(scrollYProgress.get()), [progress, scrollYProgress]);

  const imageY = useTransform(progress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(progress, [0, 1], [1.05, 1.15]);
  const overlayOpacity = useTransform(progress, [0, 0.8], [0.45, 0.75]);

  return (
    <>
      <section
        ref={heroRef}
        id="start"
        className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden bg-foreground"
      >
        <motion.img
          src={withBase(imageSrc ?? DEFAULT_HERO_IMG)}
          alt={imageAlt ?? DEFAULT_HERO_ALT}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-black"
          style={reduceMotion ? { opacity: 0.45 } : { opacity: overlayOpacity }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-4 pb-40 pt-32 text-center sm:px-6 md:pb-44">
          <h1 className="v8-rise mx-auto max-w-5xl text-[clamp(2.9rem,8vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-white">
            Ihr Garten.
            <br />
            In Meisterhand.
          </h1>
          <p className="v8-rise-2 mx-auto mt-7 max-w-2xl text-lg text-white/85 md:text-xl">
            Gartenpflege von Gärtnermeister {siteConfig.ownerName} — für Düsseldorf
            und Umgebung, durch alle Jahreszeiten.
          </p>
          <div className="v8-rise-3 mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={withBase("/#kontakt")}
              className="v8-press inline-flex h-12 items-center rounded-full bg-white px-8 text-[1rem] font-semibold text-foreground shadow-lg shadow-black/25 hover:bg-white/90"
            >
              Kostenlose Beratung anfragen
            </a>
            <a
              href={withBase("/#leistungen")}
              className="inline-flex items-center gap-1 text-[1rem] font-medium text-white/90 underline-offset-4 hover:underline"
            >
              Leistungen ansehen
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </section>

      {/* Gartenjahr-Block ragt von unten in den Hero — nur leicht,
          damit möglichst viel vom Hero-Foto sichtbar bleibt. */}
      <section id="gartenjahr" className="relative z-20 -mt-16 pb-4 md:-mt-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="rounded-[1.5rem] bg-[#0d120d] p-3 text-white shadow-2xl shadow-black/30 sm:p-5">
            <div className="flex flex-col gap-1 px-3 pb-3 pt-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:pb-4">
              <h2 className="text-[clamp(1.4rem,2.8vw,2rem)] font-semibold leading-tight text-white">
                Das Gartenjahr.
              </h2>
              <p className="hidden text-[0.95rem] text-white/60 sm:block">
                Jede Jahreszeit hat ihre Arbeit — wir kennen den Takt.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
              {gartenjahr.map((entry) => {
                const active = entry.months.includes(month);
                return (
                  <a
                    key={entry.season}
                    href={withBase(`/gartenpflege-${entry.slug}`)}
                    className={`group relative flex min-h-[9.5rem] flex-col rounded-[1rem] p-3 transition-colors sm:min-h-[11rem] sm:p-4 lg:min-h-[12rem] lg:p-5 ${
                      active
                        ? "bg-white text-foreground"
                        : "bg-white/[0.06] text-white hover:bg-white/[0.1]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[0.62rem] font-medium uppercase tracking-[0.1em] sm:text-[0.72rem] ${
                          active ? "text-muted-foreground" : "text-white/45"
                        }`}
                      >
                        {entry.months.length > 0
                          ? `${["Jan","Feb","März","Apr","Mai","Juni","Juli","Aug","Sept","Okt","Nov","Dez"][entry.months[0]]} – ${["Jan","Feb","März","Apr","Mai","Juni","Juli","Aug","Sept","Okt","Nov","Dez"][entry.months[entry.months.length - 1]]}`
                          : ""}
                      </span>
                      {active ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-1.5 py-[0.1rem] text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-primary-foreground sm:px-2 sm:text-[0.6rem]">
                          <span
                            aria-hidden
                            className="h-1 w-1 rounded-full bg-primary-foreground"
                          />
                          Jetzt
                        </span>
                      ) : null}
                    </div>
                    <h3
                      className={`mt-1 text-[clamp(1.1rem,4.5vw,1.9rem)] font-semibold leading-none ${
                        active ? "text-foreground" : "text-white"
                      }`}
                    >
                      {entry.season}
                    </h3>
                    <p
                      className={`mt-2 text-[0.72rem] leading-snug sm:mt-3 sm:text-[0.85rem] sm:leading-relaxed ${
                        active ? "text-foreground/75" : "text-white/60"
                      }`}
                    >
                      {entry.work}
                    </p>
                    <span
                      className={`mt-auto inline-flex items-center gap-1 pt-3 text-[0.72rem] font-semibold transition-transform group-hover:translate-x-0.5 sm:text-[0.8rem] ${
                        active ? "text-primary" : "text-white/90"
                      }`}
                    >
                      Erfahre mehr
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.25} />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroV8;
