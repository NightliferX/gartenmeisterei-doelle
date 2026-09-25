import { ArrowUpRight } from "lucide-react";
import { gartenjahr } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// V2-Prinzip: ein grüner Streifen, der von unten in den Hero hineinragt.
// Vier Zellen, aktuelle Saison markiert. Jede Zelle verlinkt auf die
// dazugehoerige Saison-Unterseite.
const GartenjahrRibbon = () => {
  const month = new Date().getMonth();
  const currentSeason = gartenjahr.find((s) => s.months.includes(month))?.season;

  return (
    <section id="gartenjahr" className="relative z-20 -mt-28 pb-4 md:-mt-36">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="overflow-hidden rounded-[1.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/25">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {gartenjahr.map((entry) => {
              const active = entry.season === currentSeason;
              return (
                <a
                  key={entry.season}
                  href={withBase(`/gartenpflege-${entry.slug}`)}
                  className={`group relative flex flex-col border-primary-foreground/10 p-6 transition-colors max-lg:border-b lg:border-r lg:last:border-r-0 hover:bg-primary-foreground/10 ${
                    active ? "bg-primary-foreground/10" : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[1.35rem] font-semibold text-primary-foreground">
                      {entry.season}
                    </h3>
                    {active ? (
                      <span className="rounded-full bg-primary-foreground px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary">
                        Jetzt gefragt
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-primary-foreground/80">
                    {entry.work}
                  </p>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-4 h-4 w-4 text-primary-foreground/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-foreground"
                    strokeWidth={2.25}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GartenjahrRibbon;
