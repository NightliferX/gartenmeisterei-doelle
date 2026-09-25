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

const IMG = "/team/gaertnermeister-buchsbaum-formschnitt-duesseldorf.jpg";
const IMG_ALT = "Gärtnermeister beim Formschnitt eines Buchsbaums im gepflegten Vorgarten";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Full-Bleed Hero-Prinzip aus V6, uebersetzt in Design-1-Farben.
const HeroV7 = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  useEffect(() => progress.set(scrollYProgress.get()), [progress, scrollYProgress]);

  const imageY = useTransform(progress, [0, 1], ["0%", "14%"]);
  const imageScale = useTransform(progress, [0, 1], [1.02, 1.08]);
  const copyY = useTransform(progress, [0, 1], ["0%", "-18%"]);
  const copyOpacity = useTransform(progress, [0.55, 0.95], [1, 0]);
  const vignetteOpacity = useTransform(progress, [0, 0.7], [0.55, 0.9]);

  return (
    <section
      ref={ref}
      id="start"
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-foreground pb-40 md:pb-56"
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[42dvh] bg-gradient-to-b from-black/55 via-black/25 to-transparent"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[75dvh] bg-gradient-to-t from-black/90 via-black/55 to-transparent"
        style={reduceMotion ? undefined : { opacity: vignetteOpacity }}
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1240px] flex-col justify-end px-5 pb-28 pt-28 sm:px-8 sm:pb-32 lg:px-10 lg:pb-40"
        style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.12 }}
          className="text-[0.95rem] font-semibold uppercase tracking-[0.25em] text-white/85"
        >
          Meisterbetrieb Düsseldorf
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
          className="mt-3 max-w-[18ch] text-[clamp(2.75rem,7.5vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white"
        >
          Aus Wildwuchs wird Garten.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.32 }}
          className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-white/85 md:text-[1.15rem]"
        >
          Hecken, Bäume, Rasen und Beete in Düsseldorf und Umgebung —
          gepflegt im Takt des Gartenjahres, vom Gärtnermeister.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.44 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
        >
          <a
            href={withBase("/#kontakt")}
            className="v7-press inline-flex h-12 items-center rounded-full bg-primary px-7 text-[1rem] font-semibold text-primary-foreground shadow-lg shadow-black/25"
          >
            Kostenlose Beratung anfragen
          </a>
          <a
            href={withBase("/#leistungen")}
            className="inline-flex items-center gap-1 text-[1rem] font-medium text-white/90 underline-offset-4 hover:underline"
          >
            Leistungen ansehen
            <ChevronRight aria-hidden className="h-4 w-4" strokeWidth={2.25} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroV7;
