import { useEffect, useRef } from "react";
import { gartenjahr, monthRange } from "@/lib/siteContent";

const GartenjahrBlock = () => {
  const month = new Date().getMonth();
  const activeIndex = gartenjahr.findIndex((s) => s.months.includes(month));
  const trackRef = useRef<HTMLDivElement>(null);

  // Mobil ist die Leiste wischbar: sie startet direkt bei der aktuellen Saison.
  useEffect(() => {
    const track = trackRef.current;
    const tile = track?.children[activeIndex] as HTMLElement | undefined;
    if (!track || !tile || track.scrollWidth <= track.clientWidth) return;
    track.scrollLeft = tile.offsetLeft - 20;
  }, [activeIndex]);

  return (
    <section
      id="gartenjahr"
      aria-labelledby="gartenjahr-titel"
      className="relative z-10 -mt-24 scroll-mt-16 pb-24 lg:-mt-32 lg:pb-36"
    >
      <div className="mx-auto max-w-[1024px] px-4 lg:px-6">
        <div className="rounded-[28px] bg-background py-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] lg:p-9">
          <div className="px-6 lg:px-0">
            <h2 id="gartenjahr-titel" className="v6-title text-foreground">
              Das Gartenjahr.
            </h2>
            <p className="mt-1 text-muted-foreground">
              Jede Jahreszeit hat ihre Arbeit. Die aktuelle ist markiert.
            </p>
          </div>

          <div
            ref={trackRef}
            className="v6-no-scrollbar relative mt-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0"
          >
            {gartenjahr.map((entry, index) => {
              const active = index === activeIndex;
              return (
                <article
                  key={entry.season}
                  aria-current={active ? "true" : undefined}
                  className={`flex w-[76%] shrink-0 snap-start flex-col rounded-[18px] p-6 sm:w-[45%] lg:min-h-[13.5rem] lg:w-auto ${
                    active ? "bg-foreground text-white" : "bg-secondary text-foreground"
                  }`}
                >
                  <p className={`v6-fine ${active ? "text-white/60" : "text-muted-foreground"}`}>
                    {monthRange(entry.months)}
                  </p>
                  <h3 className={`v6-title mt-1 ${active ? "text-white" : "text-foreground"}`}>
                    {entry.season}
                  </h3>
                  {active ? (
                    <span className="mt-3 inline-flex w-fit rounded-full bg-accent px-2.5 py-0.5 text-[0.75rem] font-semibold text-accent-foreground">
                      Jetzt gefragt
                    </span>
                  ) : null}
                  <p
                    className={`mt-auto pt-6 text-[0.95rem] leading-snug ${
                      active ? "text-white/85" : "text-foreground/80"
                    }`}
                  >
                    {entry.work}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GartenjahrBlock;
