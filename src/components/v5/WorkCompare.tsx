import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { ArrowLeftRight } from "lucide-react";
import { projects } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const pairs = projects.filter((p) => p.beforeImage && p.afterImage);

const WorkCompare = () => {
  const [index, setIndex] = useState(0);
  const project = pairs[index];

  // Reglerposition lebt außerhalb des React-Renders, damit Ziehen nie neu rendert.
  const pos = useMotionValue(50);
  const beforeClip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleTransform = useTransform(pos, (v) => `translateX(${v}%)`);

  const areaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () =>
      pos.on("change", (v) => {
        if (inputRef.current) inputRef.current.value = String(Math.round(v));
      }),
    [pos],
  );

  const setFromClientX = (clientX: number) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    pos.set(
      Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)),
    );
  };

  const choose = (next: number) => {
    setIndex(next);
    pos.set(50);
  };

  if (!project) return null;

  return (
    <section
      id="projekte"
      className="bg-foreground py-24 text-background lg:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)] lg:gap-16 lg:px-10">
        <div className="flex flex-col">
          <h2 className="text-[clamp(2.5rem,10vw,4.75rem)] leading-[0.95] text-background">
            Vorher. Nachher.
          </h2>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-background/70">
            Ziehen Sie über das Bild. Beispielprojekte — echte Kundengärten
            folgen mit den ersten Aufträgen.
          </p>

          <div
            aria-label="Beispielprojekt wählen"
            role="group"
            className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:items-start lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {pairs.map((p, i) => {
              const selected = i === index;
              return (
                <button
                  key={p.title}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => choose(i)}
                  className="v5-press relative shrink-0 rounded-full px-4 py-2.5 text-left text-sm font-medium"
                >
                  {selected ? (
                    <motion.span
                      layoutId="v5-projekt-auswahl"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{
                        type: "spring",
                        duration: 0.4,
                        bounce: 0.15,
                      }}
                    />
                  ) : null}
                  <span
                    className={`relative transition-colors duration-200 ${
                      selected ? "text-accent-foreground" : "text-background/65"
                    }`}
                  >
                    {p.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 hidden border-t border-background/15 pt-6 lg:block">
            <p className="text-sm text-background/55">{project.location}</p>
            <p className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-background/85">
              {project.summary} {project.result}.
            </p>
          </div>
        </div>

        <div>
          <div
            ref={areaRef}
            className="relative aspect-[4/5] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[1.8rem] bg-background/5 sm:aspect-[3/2]"
            onPointerDown={(e) => {
              if (!e.isPrimary) return;
              e.currentTarget.setPointerCapture(e.pointerId);
              if (e.pointerType === "mouse") setFromClientX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId))
                setFromClientX(e.clientX);
            }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={project.title}
                className="absolute inset-0"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <img
                  src={withBase(project.afterImage!)}
                  alt={project.afterAlt ?? ""}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <motion.img
                  src={withBase(project.beforeImage!)}
                  alt={project.beforeAlt ?? ""}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ clipPath: beforeClip }}
                />
              </motion.div>
            </AnimatePresence>

            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-foreground/60 px-3 py-1 text-sm font-medium text-background backdrop-blur-sm">
              Vorher
            </span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-foreground/60 px-3 py-1 text-sm font-medium text-background backdrop-blur-sm">
              Nachher
            </span>

            <input
              ref={inputRef}
              type="range"
              min={0}
              max={100}
              defaultValue={50}
              onChange={(e) => pos.set(Number(e.currentTarget.value))}
              aria-label={`Vorher-Nachher-Vergleich: ${project.title}`}
              className="peer sr-only"
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 peer-focus-visible:[&>div>div]:ring-2 peer-focus-visible:[&>div>div]:ring-background"
              style={{ transform: handleTransform }}
            >
              <div className="absolute inset-y-0 left-0 w-px bg-background">
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_8px_24px_-8px_hsl(var(--foreground)/0.7)] ring-offset-2 ring-offset-foreground">
                  <ArrowLeftRight className="h-5 w-5" strokeWidth={2} />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-4 lg:hidden">
            <p className="text-sm text-background/55">{project.location}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-background/85">
              {project.summary} {project.result}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkCompare;
