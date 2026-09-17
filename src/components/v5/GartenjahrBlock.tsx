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
      aria-labelledby="gartenjahr-titel"
      className="relative z-10 -mt-24 pb-20 lg:-mt-32 lg:pb-32"
    >
      <div className="mx-auto max-w-[1400px] px-4 lg:px-10">
        <div className="rounded-[2rem] bg-background py-6 shadow-[0_40px_80px_-40px_hsl(var(--foreground)/0.55)] lg:p-8">
          <div className="flex flex-col gap-2 px-5 lg:flex-row lg:items-end lg:justify-between lg:px-0">
            <h2
              id="gartenjahr-titel"
              className="text-[2.1rem] leading-none lg:text-[2.9rem]"
            >
              Das Gartenjahr
            </h2>
            <p className="text-[15px] text-muted-foreground">
              Was wann ansteht — die aktuelle Saison ist markiert.
            </p>
          </div>

          <div
            ref={trackRef}
            className="relative mt-6 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {gartenjahr.map((entry, index) => {
              const active = index === activeIndex;
              return (
                <article
                  key={entry.season}
                  aria-current={active ? "true" : undefined}
                  className={`flex w-[78%] shrink-0 snap-start flex-col rounded-[1.4rem] p-6 sm:w-[46%] lg:min-h-[14rem] lg:w-auto ${
                    active
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <p
                    className={`text-sm ${active ? "text-background/60" : "text-muted-foreground"}`}
                  >
                    {monthRange(entry.months)}
                  </p>
                  <h3
                    className={`mt-2 text-[2.1rem] leading-none ${
                      active ? "text-background" : "text-foreground"
                    }`}
                  >
                    {entry.season}
                  </h3>
                  {active ? (
                    <span className="mt-4 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      Jetzt gefragt
                    </span>
                  ) : null}
                  <p
                    className={`mt-auto pt-8 text-[15px] leading-relaxed ${
                      active ? "text-background/80" : "text-foreground/75"
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
