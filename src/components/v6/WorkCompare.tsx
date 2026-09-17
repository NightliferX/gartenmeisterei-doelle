import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const pairs = projects.filter((p) => p.beforeImage && p.afterImage);

// Kurze Namen für den Segment-Umschalter, zugeordnet über das Vorher-Bild.
const shortLabels: Record<string, string> = {
  hecke: "Hecke",
  verwildert: "Garten",
  rasen: "Rasen",
  obstbaum: "Obstbaum",
};
const labelFor = (beforeImage?: string) => {
  const key = beforeImage?.match(/vorher-([a-z]+)\./)?.[1] ?? "";
  return shortLabels[key] ?? key;
};

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
    pos.set(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  const choose = (next: number) => {
    setIndex(next);
    pos.set(50);
  };

  if (!project) return null;

  return (
    <section id="projekte" aria-labelledby="projekte-titel" className="scroll-mt-16 bg-black py-24 text-white lg:py-36">
      <div className="mx-auto max-w-[1024px] px-4 text-center lg:px-6">
        <h2 id="projekte-titel" className="v6-headline text-white">
          Vorher. Nachher.
        </h2>
        <p className="v6-lead mx-auto mt-4 max-w-[36ch] text-white/65">
          Ziehen Sie über das Bild. Beispielprojekte — echte Kundengärten folgen
          mit den ersten Aufträgen.
        </p>

        <div
          role="group"
          aria-label="Beispielprojekt wählen"
          className="mx-auto mt-10 inline-flex rounded-full bg-white/[0.14] p-1"
        >
          {pairs.map((p, i) => {
            const selected = i === index;
            return (
              <button
                key={p.title}
                type="button"
                aria-pressed={selected}
                aria-label={p.title}
                onClick={() => choose(i)}
                className="relative h-9 rounded-full px-4 text-[0.9rem] font-medium sm:px-6"
              >
                {selected ? (
                  <motion.span
                    layoutId="v6-segment"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  />
                ) : null}
                <span
                  className={`relative transition-colors duration-200 ${
                    selected ? "text-foreground" : "text-white/75"
                  }`}
                >
                  {labelFor(p.beforeImage)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[1180px] px-4 lg:px-6">
        <div
          ref={areaRef}
          className="relative aspect-[4/5] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[28px] bg-white/5 sm:aspect-[16/10]"
          onPointerDown={(e) => {
            if (!e.isPrimary) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            if (e.pointerType === "mouse") setFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromClientX(e.clientX);
          }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={project.title}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
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

          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[0.8rem] font-medium text-white backdrop-blur-md">
            Vorher
          </span>
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[0.8rem] font-medium text-white backdrop-blur-md">
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
            className="pointer-events-none absolute inset-0 peer-focus-visible:[&>div>div]:ring-2 peer-focus-visible:[&>div>div]:ring-[hsl(var(--v6-green-on-dark))]"
            style={{ transform: handleTransform }}
          >
            <div className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-white">
              <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-[0_4px_16px_rgba(0,0,0,0.35)] ring-offset-2 ring-offset-black">
                <ChevronLeft className="-mr-1 h-4 w-4" strokeWidth={2.5} />
                <ChevronRight className="-ml-1 h-4 w-4" strokeWidth={2.5} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto mt-6 max-w-[48ch] text-center">
          <p className="text-[1.05rem] font-semibold text-white">{project.title}</p>
          <p className="mt-1 text-white/65">
            {project.location}. {project.result}.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkCompare;
