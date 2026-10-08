import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  title: string;
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
};

const BeforeAfterSlider = ({
  title,
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  className,
}: BeforeAfterSliderProps) => {
  // Position lebt in einer Ref und wird per rAF als CSS-Variable geschrieben.
  // Ein React-Render pro pointermove ruckelte auf dem iPhone.
  const positionRef = useRef(50);
  const frameRef = useRef<number | null>(null);
  const [selectedView, setSelectedView] = useState<"before" | "after" | null>(null);
  // Fade-in-on-load: Bild ist unsichtbar bis das dekodierte Frame steht,
  // dann sanft eingeblendet. Verhindert den „Pop"-Effekt beim Laden.
  const [afterLoaded, setAfterLoaded] = useState(false);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const hasPair = Boolean(beforeImage && afterImage);
  const fallbackImage = afterImage ?? beforeImage;
  const isBeforeSelected = selectedView === "before";
  const activeImage = isBeforeSelected ? beforeImage : afterImage;
  const activeAlt = isBeforeSelected
    ? beforeAlt ?? `${title} vor der Umsetzung`
    : afterAlt ?? `${title} nach der Umsetzung`;
  const activeLabel = isBeforeSelected ? "Vorher" : "Nachher";
  const preventImageDrag = useCallback((event: React.DragEvent<HTMLImageElement>) => {
    event.preventDefault();
  }, []);
  const fadeInClass = "transition-opacity duration-700 ease-out";

  const clampPosition = useCallback((value: number) => {
    return Math.max(5, Math.min(95, value));
  }, []);

  const setPosition = useCallback(
    (value: number) => {
      positionRef.current = clampPosition(value);
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        const el = sliderRef.current;
        if (!el) return;
        el.style.setProperty("--pos", `${positionRef.current}%`);
        el.setAttribute("aria-valuenow", String(Math.round(positionRef.current)));
      });
    },
    [clampPosition],
  );

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const updatePositionFromClientX = useCallback(
    (clientX: number) => {
      const bounds = sliderRef.current?.getBoundingClientRect();

      if (!bounds || bounds.width === 0) {
        return;
      }

      setPosition(((clientX - bounds.left) / bounds.width) * 100);
    },
    [setPosition],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      updatePositionFromClientX(event.clientX);
    },
    [updatePositionFromClientX],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) {
        return;
      }

      updatePositionFromClientX(event.clientX);
    },
    [updatePositionFromClientX],
  );

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setPosition(positionRef.current - 3);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setPosition(positionRef.current + 3);
      }
    },
    [setPosition],
  );

  if (!fallbackImage) {
    return (
      <div
        className={cn(
          "flex aspect-[4/3] items-center justify-center rounded-[1.75rem] border border-dashed border-border/80 bg-secondary/40 p-6 text-center text-sm text-muted-foreground",
          className,
        )}
      >
        Bildmaterial für dieses Projekt wird derzeit vorbereitet.
      </div>
    );
  }

  if (!hasPair) {
    return (
      <>
        <div className={cn("overflow-hidden rounded-[1.75rem] border border-border/80 bg-card", className)}>
          <div className="relative aspect-[4/3] overflow-hidden bg-secondary/60">
            <img
              src={fallbackImage}
              alt={afterAlt ?? beforeAlt ?? title}
              className={cn(
                "h-full w-full select-none object-cover",
                fadeInClass,
                afterLoaded ? "opacity-100" : "opacity-0",
              )}
              loading="lazy"
              decoding="async"
              draggable={false}
              onLoad={() => setAfterLoaded(true)}
              onDragStart={preventImageDrag}
            />
            <button
              type="button"
              onClick={() => setSelectedView("after")}
              className="absolute left-4 top-4 z-20 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm transition-colors hover:bg-background"
            >
              Referenzbild
            </button>
          </div>
        </div>

        <Dialog open={Boolean(selectedView)} onOpenChange={(open) => !open && setSelectedView(null)}>
          <DialogContent className="w-[min(94vw,1400px)] max-w-none border-none bg-transparent p-0 shadow-none">
            <DialogTitle className="sr-only">{title}</DialogTitle>
            <DialogDescription className="sr-only">
              Referenzbild in großer Ansicht.
            </DialogDescription>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/50 shadow-2xl">
              <img
                src={fallbackImage}
                alt={afterAlt ?? beforeAlt ?? title}
                className="max-h-[90vh] w-full select-none object-contain"
                draggable={false}
                onDragStart={preventImageDrag}
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <div className={cn("overflow-hidden rounded-[1.75rem] border border-border/80 bg-card", className)}>
        <div
          ref={sliderRef}
          className="relative aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden bg-secondary/60"
          style={{ "--pos": "50%" } as React.CSSProperties}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-label={`Vorher-Nachher-Vergleich für ${title}`}
          aria-valuemin={5}
          aria-valuemax={95}
          aria-valuenow={50}
          tabIndex={0}
        >
          {/* Sanfter Placeholder: bleibt sichtbar solange die Bilder laden,
              gleicht den Blitz bei niedrigen Netzwerken aus. */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60",
              fadeInClass,
              afterLoaded ? "opacity-0" : "opacity-100",
            )}
          />

          <img
            src={afterImage}
            alt={afterAlt ?? `${title} nach der Umsetzung`}
            className={cn(
              "h-full w-full select-none object-cover",
              fadeInClass,
              afterLoaded ? "opacity-100" : "opacity-0",
            )}
            loading="lazy"
            decoding="async"
            draggable={false}
            onLoad={() => setAfterLoaded(true)}
            onDragStart={preventImageDrag}
          />

          {/* Vorher-Bild über zwei gegenläufige Transforms freigelegt statt
              per clip-path: läuft komplett auf der GPU, kein Repaint. */}
          <div
            className="absolute inset-0 overflow-hidden will-change-transform"
            style={{ transform: "translate3d(calc(var(--pos) - 100%), 0, 0)" }}
          >
            <img
              src={beforeImage}
              alt={beforeAlt ?? `${title} vor der Umsetzung`}
              className={cn(
                "h-full w-full select-none object-cover will-change-transform",
                fadeInClass,
                beforeLoaded ? "opacity-100" : "opacity-0",
              )}
              style={{ transform: "translate3d(calc(100% - var(--pos)), 0, 0)" }}
              loading="lazy"
              decoding="async"
              draggable={false}
              onLoad={() => setBeforeLoaded(true)}
              onDragStart={preventImageDrag}
            />
          </div>

          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-20 will-change-transform",
              fadeInClass,
              afterLoaded && beforeLoaded ? "opacity-100" : "opacity-0",
            )}
            style={{ transform: "translate3d(var(--pos), 0, 0)" }}
          >
            <div className="relative h-full w-px -translate-x-1/2 bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
            <div className="absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-background/95 text-xs font-semibold text-foreground shadow-lg">
              ↔
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedView("before")}
            onPointerDown={(event) => event.stopPropagation()}
            className="absolute left-4 top-4 z-40 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm transition-colors hover:bg-background"
          >
            Vorher
          </button>
          <button
            type="button"
            onClick={() => setSelectedView("after")}
            onPointerDown={(event) => event.stopPropagation()}
            className="absolute right-4 top-4 z-40 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-sm transition-colors hover:bg-primary"
          >
            Nachher
          </button>
        </div>
      </div>

      <Dialog open={Boolean(selectedView)} onOpenChange={(open) => !open && setSelectedView(null)}>
        <DialogContent className="w-[min(94vw,1400px)] max-w-none border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">
            {title} · {activeLabel}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Großansicht des {activeLabel.toLowerCase()}-Bildes.
          </DialogDescription>
          {activeImage ? (
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/50 shadow-2xl">
              <img
                src={activeImage}
                alt={activeAlt}
                className="max-h-[90vh] w-full select-none object-contain"
                draggable={false}
                onDragStart={preventImageDrag}
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BeforeAfterSlider;
