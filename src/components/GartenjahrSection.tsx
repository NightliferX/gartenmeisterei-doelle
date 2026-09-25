import { ArrowUpRight } from "lucide-react";
import { gartenjahr } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Gartenjahr-Leiste fuer Design 1: exakt die V2-Aufteilung (ein Block, vier
// Zellen, aktuelle Saison markiert), nur in den Design-1-Farben und -Schrift.
// Jede Zelle verlinkt auf die dazugehoerige Saison-Unterseite.
// V2 und V4 haben ihren eigenen Block bereits im Hero — dort nichts rendern.
const GartenjahrSection = () => {
  const theme = import.meta.env.VITE_THEME;
  if (theme === "v2" || theme === "v4") return null;

  const month = new Date().getMonth();
  const currentSeason = gartenjahr.find((s) => s.months.includes(month))?.season;

  return (
    <section id="gartenjahr" className="relative z-20 -mt-24 pb-4 md:-mt-32">
      <div className="container px-4">
        <div className="overflow-hidden rounded-[var(--radius)] bg-primary text-primary-foreground shadow-xl shadow-primary/30">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {gartenjahr.map((entry) => {
              const active = entry.season === currentSeason;
              return (
                <a
                  key={entry.season}
                  href={withBase(`/gartenpflege-${entry.slug}-duesseldorf`)}
                  className={`group relative flex flex-col border-primary-foreground/10 p-6 transition-colors max-lg:border-b lg:border-r lg:last:border-r-0 hover:bg-primary-foreground/10 ${
                    active ? "bg-primary-foreground/10" : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold text-primary-foreground">
                      {entry.season}
                    </h3>
                    {active ? (
                      <span className="rounded-full bg-primary-foreground px-3 py-1 text-xs font-semibold text-primary">
                        Jetzt gefragt
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
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

export default GartenjahrSection;
