import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ArrowRight } from "lucide-react";

// Scroll-gesteuerte Gartenfahrt: Bildsequenz aus dem Seedance-Video (public/film/),
// die beim Scrollen im Canvas abgespielt wird. Kapitel-Karten wechseln links/rechts.
const FRAME_COUNT = 160;
const FILM_PATH = `${import.meta.env.BASE_URL}film/pfingstrose-2k`;
// Auflösung der Einzelbilder (d = Desktop 1600×900, m = Handy 720×900).
// Das Canvas wird nie größer gerechnet als das Bild hergibt: mehr Pixel
// bringen keine Schärfe, kosten auf dem iPhone aber jede Frame Füllrate.
const FRAME_SIZE = { d: { w: 1600, h: 900 }, m: { w: 720, h: 900 } } as const;

type Kapitel = { from: number; to: number; dark?: boolean; topic: string; title: string; text: string };

const kapitel: Kapitel[] = [
  {
    from: 0.08,
    to: 0.24,
    dark: true,
    topic: "Rasen",
    title: "Alles beginnt im Boden.",
    text: "Bevor oben etwas wächst, muss unten alles stimmen: lockere Erde, Licht und die richtige Startdüngung.",
  },
  {
    from: 0.3,
    to: 0.48,
    topic: "Baum",
    title: "Richtig pflanzen.",
    text: "Standort, Abstand, Pflanzzeit: Wer beim Pflanzen sorgfältig ist, spart sich später viel Arbeit.",
  },
  {
    from: 0.54,
    to: 0.72,
    topic: "Pflanzenschutz",
    title: "Gesund halten.",
    text: "Genau hinsehen statt vorschnell spritzen. Schädlinge und Krankheiten früh erkennen und gezielt handeln.",
  },
  {
    from: 0.8,
    to: 0.97,
    topic: "Saison",
    title: "Im Rhythmus der Jahreszeiten.",
    text: "Jeder Monat stellt andere Fragen. Wir begleiten Ihren Garten vom ersten Austrieb bis zur Winterruhe.",
  },
];

// Grob nach fein laden: erst jedes 24. Bild, dann verdichten.
const loadOrder = (() => {
  const order: number[] = [0, FRAME_COUNT - 1];
  for (const step of [24, 12, 6, 3, 1]) {
    for (let i = 0; i < FRAME_COUNT; i += step) if (!order.includes(i)) order.push(i);
  }
  return order;
})();

const useMedia = (query: string) => {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatch(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return match;
};

type Props = { onTopic: (topic: string) => void };

const GartenFilm = ({ onTopic }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | undefined)[]>([]);
  const current = useRef(0);
  const target = useRef(0);
  const raf = useRef(0);
  const drawn = useRef(-1);
  const posterRef = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState(-1);
  const reduceMotion = useReducedMotion();
  const isPhone = useMedia("(max-width: 640px)");
  const set = useMedia("(max-width: 767px) and (orientation: portrait)") ? "m" : "d";
  const frameSrc = (i: number) => `${FILM_PATH}/${set}/${String(i + 1).padStart(3, "0")}.webp`;

  // Kein React-State im Zeichenpfad: jeder Render pro Frame kostet auf dem
  // Handy spürbar. Gezeichnet wird nur, wenn sich das Bild wirklich ändert.
  const draw = useCallback((index: number, force = false) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let img: HTMLImageElement | undefined;
    let found = -1;
    for (let d = 0; d < FRAME_COUNT && !img; d++) {
      if (frames.current[index - d]) found = index - d;
      else if (frames.current[index + d]) found = index + d;
      img = frames.current[found];
    }
    if (!img || (!force && found === drawn.current)) return;
    drawn.current = found;
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    if (posterRef.current) posterRef.current.style.opacity = "0";
  }, []);

  // Bilder laden (6 parallel), bei Wechsel Desktop/Handy neu.
  useEffect(() => {
    frames.current = [];
    drawn.current = -1;
    let next = 0;
    let cancelled = false;
    const loadMore = () => {
      if (cancelled || next >= loadOrder.length) return;
      const i = loadOrder[next++];
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        // Vorab dekodieren, sonst dekodiert drawImage beim ersten Zeichnen
        // synchron auf dem Hauptthread und der Scroll stockt.
        img
          .decode()
          .catch(() => undefined)
          .then(() => {
            if (cancelled) return;
            frames.current[i] = img;
            if (Math.abs(i - Math.round(current.current)) < 4) draw(Math.round(current.current), true);
            loadMore();
          });
      };
      img.onerror = loadMore;
      img.src = frameSrc(i);
    };
    for (let k = 0; k < 6; k++) loadMore();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set, draw]);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !canvas.clientWidth || !canvas.clientHeight) return;
      const src = FRAME_SIZE[set];
      // Bildpixel je CSS-Pixel bei object-fit: cover.
      const cover = Math.min(src.w / canvas.clientWidth, src.h / canvas.clientHeight);
      const ratio = Math.max(1, Math.min(window.devicePixelRatio || 1, 2, cover));
      const w = Math.round(canvas.clientWidth * ratio);
      const h = Math.round(canvas.clientHeight * ratio);
      // Safari feuert beim Ein-/Ausblenden der Adressleiste resize. Ein neu
      // gesetztes canvas.width leert und alloziert das Canvas: nur bei echter
      // Größenänderung anfassen.
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      draw(Math.round(current.current), true);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, [draw, set]);

  // Weiches Nachziehen des Bildes hinter dem Scroll (scrub).
  const tick = useCallback(() => {
    const diff = target.current - current.current;
    current.current = Math.abs(diff) < 0.05 ? target.current : current.current + diff * 0.2;
    draw(Math.round(current.current));
    raf.current = current.current === target.current ? 0 : requestAnimationFrame(tick);
  }, [draw]);

  const introRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

  // Direkt setzen statt useTransform: motion beschleunigt scroll-gekoppelte
  // Opacity sonst per ScrollTimeline, die hier falsche Werte lieferte.
  const applyProgress = useCallback((p: number) => {
    const intro = clamp01(1 - p / 0.06);
    if (introRef.current) {
      introRef.current.style.opacity = String(intro);
      introRef.current.style.transform = `translateY(${(1 - intro) * -24}px)`;
      introRef.current.style.visibility = intro === 0 ? "hidden" : "visible";
    }
    if (shadeRef.current) shadeRef.current.style.opacity = String(1 - 0.6 * clamp01((p - 0.22) / 0.12));
    if (fadeRef.current) fadeRef.current.style.opacity = String(clamp01((p - 0.9) / 0.1));
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useEffect(() => applyProgress(scrollYProgress.get()), [applyProgress, scrollYProgress]);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    applyProgress(p);
    target.current = p * (FRAME_COUNT - 1);
    if (!raf.current) raf.current = requestAnimationFrame(tick);
    const idx = kapitel.findIndex((k) => p >= k.from && p <= k.to);
    setActive((prev) => (prev === idx ? prev : idx));
  });


  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const mid = (kapitel[i].from + kapitel[i].to) / 2;
    window.scrollTo({
      top: el.offsetTop + (el.offsetHeight - window.innerHeight) * mid,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const hidden = (i: number) => {
    if (reduceMotion) return { opacity: 0 };
    if (isPhone) return { opacity: 0, y: 40, scale: 0.97 };
    const side = i % 2 ? 1 : -1;
    return { opacity: 0, x: side * 110, rotate: side * 2.5, scale: 0.94 };
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Gartenreise: vom Austrieb bis zur Blüte"
      className="relative h-[560vh] bg-[hsl(120_12%_8%)] sm:h-[640vh]"
    >
      {/* 100lvh statt 100dvh: dvh ändert sich auf dem iPhone während des
          Scrollens mit der Adressleiste und erzwingt Layout + Canvas-Neuaufbau. */}
      <div className="sticky top-0 h-[100lvh] overflow-hidden">
        <img
          ref={posterRef}
          src={frameSrc(0)}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        />
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
        <div
          ref={shadeRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(10,16,10,0.6)_0%,rgba(10,16,10,0.1)_55%,transparent_75%)] sm:bg-[linear-gradient(90deg,rgba(10,16,10,0.55)_0%,rgba(10,16,10,0.15)_45%,transparent_70%)]"
        />

        <div
          ref={introRef}
          className="absolute bottom-[calc(100lvh-100svh+3.5rem)] left-4 right-4 max-w-[640px] text-white sm:bottom-[clamp(48px,12vh,140px)] sm:left-[clamp(16px,6vw,96px)]"
        >
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[hsl(147_55%_72%)]">
            Ratgeber vom Meisterbetrieb
          </p>
          <h1 className="mt-4 pb-[0.06em] text-[clamp(3.2rem,8.5vw,7.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            Wissen,
            <br />
            das <em className="text-[hsl(147_55%_68%)]">wächst.</em>
          </h1>
          <p className="mt-5 max-w-[34ch] text-[1.1rem] leading-relaxed text-white/85 sm:text-[1.2rem]">
            Scrollen Sie durch ein Gartenjahr: vom ersten Austrieb bis zur vollen Blüte.
          </p>
          <span className="mt-8 inline-flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="h-9 w-px origin-top animate-pulse bg-gradient-to-b from-white to-transparent" aria-hidden />
            Scrollen
          </span>
        </div>

        <AnimatePresence>
          {active >= 0 ? (
            <motion.article
              key={active}
              initial={hidden(active)}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              exit={hidden(active)}
              transition={reduceMotion ? { duration: 0.2 } : { type: "spring", stiffness: 140, damping: 22 }}
              className={`absolute bottom-[calc(100lvh-100svh+1.25rem)] left-3 right-3 rounded-[1.5rem] p-6 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.35)] will-change-transform sm:bottom-[clamp(40px,10vh,120px)] sm:backdrop-blur-xl sm:w-[440px] sm:rounded-[1.75rem] sm:p-7 ${
                active % 2
                  ? "sm:left-auto sm:right-[calc(clamp(16px,3vw,40px)+76px)]"
                  : "sm:left-[clamp(16px,6vw,96px)] sm:right-auto"
              } ${kapitel[active].dark ? "bg-[rgba(14,22,14,0.82)] text-white sm:bg-[rgba(14,22,14,0.55)]" : "bg-white/95 text-foreground sm:bg-white/85"}`}
            >
              <p
                className={`text-[0.8rem] font-bold uppercase tracking-[0.16em] ${
                  kapitel[active].dark ? "text-[hsl(147_55%_72%)]" : "text-primary"
                }`}
              >
                Kapitel 0{active + 1}
              </p>
              <h2 className="mt-3 text-[clamp(1.75rem,3.2vw,2.35rem)] font-bold leading-[1.08] tracking-[-0.025em]">
                {kapitel[active].title}
              </h2>
              <p className={`mt-2.5 text-[1rem] leading-relaxed ${kapitel[active].dark ? "text-white/80" : "text-muted-foreground"}`}>
                {kapitel[active].text}
              </p>
              <button
                type="button"
                onClick={() => onTopic(kapitel[active].topic)}
                className={`group mt-4 inline-flex items-center gap-2 text-[0.95rem] font-semibold ${
                  kapitel[active].dark ? "text-[hsl(147_55%_72%)]" : "text-primary"
                }`}
              >
                Ratgeber zum Thema {kapitel[active].topic}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
              </button>
            </motion.article>
          ) : null}
        </AnimatePresence>

        <ol
          aria-label="Kapitel"
          className="absolute right-[clamp(16px,3vw,40px)] top-1/2 hidden -translate-y-1/2 gap-1.5 rounded-full bg-white/70 p-2 shadow-[0_6px_28px_-8px_rgba(0,0,0,0.2)] backdrop-blur-md sm:grid"
        >
          {kapitel.map((k, i) => (
            <li key={k.title}>
              <button
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Kapitel ${i + 1}: ${k.title}`}
                aria-current={active === i ? "step" : undefined}
                className={`h-9 w-9 rounded-full text-[0.75rem] font-bold transition-colors ${
                  active === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
                }`}
              >
                0{i + 1}
              </button>
            </li>
          ))}
        </ol>

        <div
          ref={fadeRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent to-background"
        />
      </div>
    </section>
  );
};

export default GartenFilm;
