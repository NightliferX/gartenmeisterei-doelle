import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { services } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const imageOf = (id: string) => services.find((s) => s.id === id)?.image ?? "";

const highlights = [
  {
    title: "Hecken in Form.",
    sub: "Zur richtigen Zeit geschnitten.",
    image: "/references/nachher-hecke.jpg",
    alt: "Akkurat geschnittene Ligusterhecke am Gartenweg",
  },
  {
    title: "Obstbäume, die wieder tragen.",
    sub: "Lichte Kronen, kein Totholz.",
    image: "/references/nachher-obstbaum.jpg",
    alt: "Fachgerecht geschnittener Apfelbaum mit lichter Krone",
  },
  {
    title: "Rasen ohne Moos.",
    sub: "Dicht, sattgrün, belastbar.",
    image: "/references/nachher-rasen.jpg",
    alt: "Dichte, frisch gemähte Rasenfläche",
  },
  {
    title: "Pflege nach Plan.",
    sub: "Feste Termine, Sie müssen an nichts denken.",
    image: imageOf("gartenpflege"),
    alt: "Gärtner beim Kantenschnitt an einer Rasenfläche",
  },
  {
    title: "Durch alle Jahreszeiten.",
    sub: "Frühjahrsstart und Winterschutz.",
    image: imageOf("saison"),
    alt: "Gartenwerkzeug und frisch vorbereitete Erde",
  },
];

const SLIDE_SECONDS = 5;

const HighlightsGallery = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.45 });

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!reduceMotion);
  const [hovered, setHovered] = useState(false);
  const running = playing && inView && !hovered && !reduceMotion;

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const card = track?.children[index] as HTMLElement | undefined;
      if (!track || !card) return;
      track.scrollTo({
        left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion],
  );

  // Aktive Karte = die, deren Mitte der Mitte der Leiste am nächsten liegt.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDistance = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const el = child as HTMLElement;
          const distance = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = i;
          }
        });
        setActive(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Wer selbst wischt, übernimmt — der automatische Durchlauf hört auf.
  const stopOnInteraction = () => setPlaying(false);

  return (
    <section ref={sectionRef} aria-labelledby="highlights-titel" className="pb-24 lg:pb-36">
      <div className="mx-auto max-w-[1024px] px-4 lg:px-6">
        <h2 id="highlights-titel" className="v6-headline text-foreground">
          Das Wichtigste auf einen Blick.
        </h2>
      </div>

      <div
        ref={trackRef}
        onPointerDown={stopOnInteraction}
        onWheel={(e) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stopOnInteraction();
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="v6-no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[7%] sm:px-[15%] lg:gap-6 lg:px-[max(1.5rem,calc((100vw-980px)/2))]"
      >
        {highlights.map((item, index) => (
          <figure
            key={item.title}
            aria-roledescription="Folie"
            aria-label={`${index + 1} von ${highlights.length}`}
            className="relative aspect-[4/5] w-[86%] shrink-0 snap-center overflow-hidden rounded-[28px] bg-secondary sm:w-[70%] sm:aspect-[4/3] lg:aspect-[16/10] lg:w-[min(980px,86vw)]"
          >
            <img
              src={withBase(item.image)}
              alt={item.alt}
              loading={index === 0 ? "eager" : "lazy"}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/55 to-transparent" />
            <figcaption className="absolute left-0 top-0 max-w-[22rem] p-6 lg:max-w-[30rem] lg:p-10">
              <span className="v6-title block text-white">{item.title}</span>
              <span className="mt-1 block text-[1.05rem] text-white/85">{item.sub}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="flex h-14 items-center gap-3 rounded-full bg-secondary px-5">
          {highlights.map((item, index) => {
            const isActive = index === active;
            return (
              <motion.button
                key={item.title}
                type="button"
                layout
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                onClick={() => {
                  stopOnInteraction();
                  goTo(index);
                }}
                aria-label={`Zu Folie ${index + 1}: ${item.title}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative h-2 overflow-hidden rounded-full bg-foreground/30 ${
                  isActive ? "w-12" : "w-2"
                }`}
              >
                {isActive ? (
                  <span
                    key={`${index}-${playing}`}
                    className={`absolute inset-0 rounded-full bg-foreground ${playing ? "v6-progress" : ""}`}
                    data-paused={!running}
                    style={{ "--v6-duration": `${SLIDE_SECONDS}s` } as CSSProperties}
                    onAnimationEnd={() => goTo((index + 1) % highlights.length)}
                  />
                ) : null}
              </motion.button>
            );
          })}
        </div>

        {!reduceMotion ? (
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            aria-label={playing ? "Automatischen Durchlauf anhalten" : "Automatischen Durchlauf starten"}
            className="v6-press flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-foreground"
          >
            {playing ? (
              <Pause className="h-5 w-5" fill="currentColor" strokeWidth={0} />
            ) : (
              <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" strokeWidth={0} />
            )}
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default HighlightsGallery;
