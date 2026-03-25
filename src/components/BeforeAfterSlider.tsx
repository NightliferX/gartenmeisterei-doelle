import { useCallback, useRef, useState } from "react";
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
  const [position, setPosition] = useState(50);
  const [selectedView, setSelectedView] = useState<"before" | "after" | null>(null);
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

  const clampPosition = useCallback((value: number) => {
    return Math.max(5, Math.min(95, value));
  }, []);

  const updatePositionFromClientX = useCallback(
    (clientX: number) => {
      const bounds = sliderRef.current?.getBoundingClientRect();

      if (!bounds || bounds.width === 0) {
        return;
      }

      const nextPosition = ((clientX - bounds.left) / bounds.width) * 100;
      setPosition(clampPosition(nextPosition));
    },
    [clampPosition],
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
        setPosition((current) => clampPosition(current - 3));
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setPosition((current) => clampPosition(current + 3));
      }
    },
    [clampPosition],
  );

  if (!fallbackImage) {
    return (
      <div
        className={cn(
          "flex aspect-[4/3] items-center justify-center rounded-[1.75rem] border border-dashed border-border/80 bg-secondary/40 p-6 text-center text-sm text-muted-foreground",
          className,
        )}
      >
        Bildmaterial fur dieses Projekt wird derzeit vorbereitet.
      </div>
    );
  }

  if (!hasPair) {
    return (
      <>
        <div className={cn("overflow-hidden rounded-[1.75rem] border border-border/80 bg-card", className)}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={fallbackImage}
              alt={afterAlt ?? beforeAlt ?? title}
              className="h-full w-full select-none object-cover"
              loading="lazy"
              draggable={false}
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
              Referenzbild in grosser Ansicht.
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
          className="relative aspect-[4/3] cursor-ew-resize overflow-hidden touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-label={`Vorher-Nachher-Vergleich fur ${title}`}
          aria-valuemin={5}
          aria-valuemax={95}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
        >
          <img
            src={afterImage}
            alt={afterAlt ?? `${title} nach der Umsetzung`}
            className="h-full w-full select-none object-cover"
            loading="lazy"
            draggable={false}
            onDragStart={preventImageDrag}
          />

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src={beforeImage}
              alt={beforeAlt ?? `${title} vor der Umsetzung`}
              className="h-full w-full select-none object-cover"
              loading="lazy"
              draggable={false}
              onDragStart={preventImageDrag}
            />
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 z-20"
            style={{ left: `${position}%` }}
          >
            <div className="relative h-full w-px -translate-x-1/2 bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
            <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-background/95 text-xs font-semibold text-foreground shadow-lg">
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
            Grossansicht des {activeLabel.toLowerCase()}-Bildes.
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
