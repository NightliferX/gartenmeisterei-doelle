import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { withBase } from "@/lib/utils";

// Dieselbe Szene zweimal: der verwilderte Garten liegt dahinter, der gepflegte
// öffnet sich beim Scrollen darüber — die Arbeit des Gärtners als Bewegung.
const WILD = "/references/vorher-verwildert.jpg";
const TENDED = "/references/nachher-verwildert.jpg";
const TENDED_ALT =
  "Gepflegter Reihenhausgarten mit gemähtem Rasen, geschnittenen Sträuchern und freigelegtem Plattenweg";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
};

const HeroActions = () => (
  <div className="mt-7 flex flex-wrap items-center gap-3">
    <a
      href={withBase("/#kontakt")}
      className="v5-press inline-flex h-12 items-center rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-foreground"
    >
      Kostenlose Beratung anfragen
    </a>
    <a
      href={withBase("/#leistungen")}
      className="v5-press inline-flex h-12 items-center rounded-full border border-background/35 px-6 text-[15px] font-medium text-background"
    >
      Leistungen ansehen
    </a>
  </div>
);

const HeroCopy = () => (
  <>
    <p className="v5-display text-[clamp(2rem,8.5vw,4rem)] leading-[0.95] text-background">
      Gartenpflege vom Gärtnermeister.
    </p>
    <p className="mt-4 max-w-[38ch] text-base leading-relaxed text-background/80">
      Hecken, Bäume, Rasen und Beete in Düsseldorf und Umgebung — gepflegt im
      Takt des Gartenjahres.
    </p>
    <HeroActions />
  </>
);

// Ohne Bewegung: gleiche Aussage, sofort vollständig sichtbar.
const StaticHero = () => (
  <section
    id="start"
    className="relative min-h-[100dvh] overflow-hidden bg-foreground"
  >
    <img
      src={withBase(TENDED)}
      alt={TENDED_ALT}
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/20" />
    <div className="relative mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-4 pb-40 pt-28 lg:px-10 lg:pb-48">
      <h1 className="v5-display text-[clamp(2.75rem,12vw,7rem)] leading-[0.9] text-background">
        Aus Wildwuchs wird Garten.
      </h1>
      <div className="mt-8 max-w-xl">
        <HeroCopy />
      </div>
    </div>
  </section>
);

const ScrollExpansionHero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Motion würde die Werte sonst an die native ViewTimeline übergeben; mit Sticky-
  // Container und eigenen Offsets rechnet die in Chromium falsch (Wörter kehren zurück).
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  useEffect(
    () => progress.set(scrollYProgress.get()),
    [progress, scrollYProgress],
  );

  // Karte: mobil ein hoher Ausschnitt, Desktop ein schmales Fenster — öffnet sich bis 75 %.
  const insetY = useTransform(
    progress,
    [0, 0.75],
    isDesktop ? [17, 0] : [21, 0],
  );
  const insetX = useTransform(
    progress,
    [0, 0.75],
    isDesktop ? [34, 0] : [10, 0],
  );
  const radius = useTransform(progress, [0, 0.75], [28, 0]);
  const clipPath = useTransform(
    [insetY, insetX, radius],
    ([y, x, r]) => `inset(${y}% ${x}% ${y}% ${x}% round ${r}px)`,
  );

  const spread = isDesktop ? 42 : 70;
  const leftWord = useTransform(
    progress,
    [0, 0.6],
    ["translateX(0vw)", `translateX(-${spread}vw)`],
  );
  const rightWord = useTransform(
    progress,
    [0, 0.6],
    ["translateX(0vw)", `translateX(${spread}vw)`],
  );
  const wordsOpacity = useTransform(progress, [0.3, 0.55], [1, 0]);

  const wildTransform = useTransform(
    progress,
    [0, 1],
    ["scale(1.08)", "scale(1)"],
  );
  const tendedTransform = useTransform(
    progress,
    [0, 0.75],
    ["scale(1.2)", "scale(1)"],
  );
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);
  const shadeOpacity = useTransform(progress, [0.68, 0.92], [0, 1]);

  const copyOpacity = useTransform(progress, [0.78, 0.92], [0, 1]);
  const copyTransform = useTransform(
    progress,
    [0.78, 0.92],
    ["translateY(20px)", "translateY(0px)"],
  );
  const copyVisibility = useTransform(copyOpacity, (v) =>
    v > 0.05 ? "visible" : "hidden",
  );

  if (reduceMotion) return <StaticHero />;

  return (
    <section ref={ref} id="start" className="relative h-[260svh] bg-foreground">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.img
          src={withBase(WILD)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: wildTransform }}
        />
        <div className="absolute inset-0 bg-foreground/55" />

        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath }}
        >
          <motion.img
            src={withBase(TENDED)}
            alt={TENDED_ALT}
            className="h-full w-full object-cover"
            style={{ transform: tendedTransform }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/65 to-foreground/50"
            style={{ opacity: shadeOpacity }}
          />
        </motion.div>

        <h1 className="pointer-events-none absolute inset-0">
          <motion.span
            className="v5-display absolute left-4 top-[11%] block text-[clamp(2.75rem,12vw,7.5rem)] leading-[0.9] text-background lg:left-10 lg:top-[15%]"
            style={{ transform: leftWord, opacity: wordsOpacity }}
          >
            Aus Wildwuchs
          </motion.span>
          <motion.span
            className="v5-display absolute bottom-[18%] right-4 block text-right text-[clamp(2.75rem,12vw,7.5rem)] leading-[0.9] text-background lg:bottom-[10%] lg:right-10"
            style={{ transform: rightWord, opacity: wordsOpacity }}
          >
            wird Garten.
          </motion.span>
        </h1>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: hintOpacity }}
        >
          <div className="flex items-center gap-3 whitespace-nowrap rounded-full border border-background/15 bg-foreground/50 py-2.5 pl-3.5 pr-4 text-sm font-medium text-background shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
            <span className="relative block h-5 w-0.5 overflow-hidden rounded-full bg-background/25">
              <span className="v5-scroll-cue absolute inset-x-0 top-0 h-2 rounded-full bg-accent" />
            </span>
            Zum Öffnen scrollen
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 top-[30%] lg:bottom-[24%] lg:top-auto"
          style={{
            opacity: copyOpacity,
            transform: copyTransform,
            visibility: copyVisibility,
          }}
        >
          <div className="mx-auto max-w-[1400px] px-4 lg:px-10">
            <div className="max-w-xl">
              <HeroCopy />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollExpansionHero;
