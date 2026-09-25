import { useEffect, useRef } from "react";
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

// Apple-Produktseiten-Prinzip: das Produkt (der gepflegte Garten) ist ab
// Frame 1 vollflaechig da. Text liegt darauf, statt darueber zu stehen.
const IMG = "/team/hero-buchsbaum.jpg";
const IMG_ALT =
  "Gaertnermeister beim Formschnitt eines Buchsbaums im gepflegten Vorgarten";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const HeroV6 = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Motion feuert die ViewTimeline sonst nativ, was mit unseren Offsets zickt.
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  useEffect(() => progress.set(scrollYProgress.get()), [progress, scrollYProgress]);

  // Sanfte Parallaxe: Bild bewegt sich langsamer als der Vordergrund.
  const imageY = useTransform(progress, [0, 1], ["0%", "14%"]);
  const imageScale = useTransform(progress, [0, 1], [1.02, 1.08]);
  const copyY = useTransform(progress, [0, 1], ["0%", "-18%"]);
  const copyOpacity = useTransform(progress, [0.55, 0.95], [1, 0]);
  const vignetteOpacity = useTransform(progress, [0, 0.7], [0.55, 0.9]);
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  return (
    <section
      ref={ref}
      id="start"
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-foreground"
    >
      <motion.img
        src={withBase(IMG)}
        alt={IMG_ALT}
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
        initial={reduceMotion ? undefined : { opacity: 0.9, scale: 1.06 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1.02 }}
        transition={{ duration: 1, ease: EASE_OUT }}
      />

      {/* Verlaeufe fuer Lesbarkeit oben (Header) und unten (Copy) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[38dvh] bg-gradient-to-b from-black/55 via-black/20 to-transparent"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70dvh] bg-gradient-to-t from-black/90 via-black/55 to-transparent"
        style={reduceMotion ? undefined : { opacity: vignetteOpacity }}
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-5 pb-20 pt-28 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28"
        style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.12 }}
          className="v6-eyebrow text-white/85"
        >
          {siteConfig.brandName}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
          className="v6-hero mt-3 max-w-[16ch] text-white"
        >
          Aus Wildwuchs wird Garten.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.32 }}
          className="v6-lead mt-5 max-w-[46ch] text-white/85"
        >
          Hecken, Bäume, Rasen und Beete in Düsseldorf und Umgebung —
          gepflegt im Takt des Gartenjahres, vom Gärtnermeister.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.44 }}
          className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
        >
          <a
            href={withBase("/#kontakt")}
            className="v6-press inline-flex h-12 items-center rounded-full bg-accent px-7 text-[1.05rem] font-medium text-accent-foreground"
          >
            Beratung anfragen
          </a>
          <a
            href={withBase("/#leistungen")}
            className="v6-link !text-white text-[1.05rem]"
          >
            Leistungen ansehen
            <ChevronRight aria-hidden className="ml-1 h-4 w-4" strokeWidth={2.25} />
          </a>
        </motion.div>
      </motion.div>

      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center"
          style={{ opacity: hintOpacity }}
        >
          <div className="flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-[0.78rem] font-medium text-white/85 backdrop-blur-md">
            <span className="relative block h-4 w-0.5 overflow-hidden rounded-full bg-white/25">
              <span className="v6-scroll-cue absolute inset-x-0 top-0 h-1.5 rounded-full bg-white" />
            </span>
            Weiter scrollen
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroV6;
