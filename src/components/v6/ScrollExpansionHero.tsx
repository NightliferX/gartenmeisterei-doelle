import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Dieselbe Szene zweimal: in der Karte wird aus dem verwilderten Garten beim
// Scrollen der gepflegte, während sich die Karte zum Vollbild öffnet.
const WILD = "/references/vorher-verwildert.jpg";
const TENDED = "/references/nachher-verwildert.jpg";
const WILD_ALT = "Verwilderter Reihenhausgarten mit hohem Gras und zugewucherten Beeten";
const TENDED_ALT =
  "Derselbe Garten gepflegt: gemähter Rasen, geschnittene Sträucher, freigelegter Plattenweg";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
};

const HeroActions = ({ onDark }: { onDark: boolean }) => (
  <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
    <a
      href={withBase("/#kontakt")}
      className="v6-press inline-flex h-11 items-center rounded-full bg-accent px-6 text-[1.05rem] text-accent-foreground"
    >
      Beratung anfragen
    </a>
    <a
      href={withBase("/#leistungen")}
      className={`v6-link text-[1.05rem] ${onDark ? "!text-white" : ""}`}
    >
      Leistungen ansehen
      <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
    </a>
  </div>
);

// Ohne Bewegung: gleiche Aussage, sofort vollständig sichtbar.
const StaticHero = () => (
  <section id="start" className="bg-background px-4 pb-40 pt-24 text-center lg:pb-48 lg:pt-32">
    <p className="v6-eyebrow text-foreground">{siteConfig.brandName}</p>
    <h1 className="v6-hero mx-auto mt-2 max-w-[14ch] text-foreground">
      Aus Wildwuchs wird Garten.
    </h1>
    <img
      src={withBase(TENDED)}
      alt={TENDED_ALT}
      className="mx-auto mt-10 aspect-[4/5] w-full max-w-5xl rounded-[28px] object-cover sm:aspect-[16/10]"
    />
    <p className="v6-headline mx-auto mt-12 max-w-[18ch] text-foreground">
      Gartenpflege vom Gärtnermeister.
    </p>
    <HeroActions onDark={false} />
  </section>
);

const ScrollExpansionHero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Motion würde die Werte sonst an die native ViewTimeline übergeben; mit Sticky-
  // Container und eigenen Offsets rechnet die in Chromium falsch (Werte kehren zurück).
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  useEffect(() => progress.set(scrollYProgress.get()), [progress, scrollYProgress]);

  // Karte startet unter der Headline und öffnet sich bis 75 % zum Vollbild.
  const insetTop = useTransform(progress, [0, 0.75], isDesktop ? [33, 0] : [35, 0]);
  const insetBottom = useTransform(progress, [0, 0.75], isDesktop ? [6, 0] : [9, 0]);
  const insetX = useTransform(progress, [0, 0.75], isDesktop ? [17, 0] : [4.5, 0]);
  const radius = useTransform(progress, [0, 0.75], [28, 0]);
  const clipPath = useTransform(
    [insetTop, insetX, insetBottom, radius],
    ([t, x, b, r]) => `inset(${t}% ${x}% ${b}% ${x}% round ${r}px)`,
  );

  const headlineOpacity = useTransform(progress, [0.12, 0.38], [1, 0]);
  const headlineTransform = useTransform(progress, [0, 0.38], ["translateY(0px)", "translateY(-48px)"]);

  const imageTransform = useTransform(progress, [0, 0.75], ["scale(1.14)", "scale(1)"]);
  const tendedOpacity = useTransform(progress, [0.35, 0.7], [0, 1]);
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);
  const shadeOpacity = useTransform(progress, [0.7, 0.9], [0, 1]);

  const copyOpacity = useTransform(progress, [0.78, 0.92], [0, 1]);
  const copyTransform = useTransform(progress, [0.78, 0.92], ["translateY(24px)", "translateY(0px)"]);
  const copyVisibility = useTransform(copyOpacity, (v) => (v > 0.05 ? "visible" : "hidden"));

  if (reduceMotion) return <StaticHero />;

  return (
    <section ref={ref} id="start" className="relative h-[260svh] bg-background">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-[12%] px-4 text-center lg:top-[13%]"
          style={{ opacity: headlineOpacity, transform: headlineTransform }}
        >
          <p className="v6-eyebrow text-foreground">{siteConfig.brandName}</p>
          <h1 className="v6-hero mx-auto mt-2 max-w-[14ch] text-foreground lg:max-w-none">
            Aus Wildwuchs wird Garten.
          </h1>
        </motion.div>

        <motion.div className="absolute inset-0 overflow-hidden bg-foreground" style={{ clipPath }}>
          <motion.img
            src={withBase(WILD)}
            alt={WILD_ALT}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: imageTransform }}
          />
          <motion.img
            src={withBase(TENDED)}
            alt={TENDED_ALT}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: imageTransform, opacity: tendedOpacity }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/55 to-black/45"
            style={{ opacity: shadeOpacity }}
          />
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[63%] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: hintOpacity }}
        >
          <div className="flex items-center gap-3 whitespace-nowrap rounded-full bg-white/75 py-2.5 pl-3.5 pr-4 text-[0.9rem] font-medium text-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <span className="relative block h-5 w-0.5 overflow-hidden rounded-full bg-foreground/15">
              <span className="v6-scroll-cue absolute inset-x-0 top-0 h-2 rounded-full bg-accent" />
            </span>
            Zum Öffnen scrollen
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 top-[34%] px-4 text-center lg:bottom-[25%] lg:top-auto"
          style={{ opacity: copyOpacity, transform: copyTransform, visibility: copyVisibility }}
        >
          <p className="v6-headline mx-auto max-w-[18ch] text-white">
            Gartenpflege vom Gärtnermeister.
          </p>
          <p className="v6-lead mx-auto mt-4 max-w-[34ch] text-white/85">
            Hecken, Bäume, Rasen und Beete in Düsseldorf und Umgebung — gepflegt
            im Takt des Gartenjahres.
          </p>
          <HeroActions onDark />
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollExpansionHero;
