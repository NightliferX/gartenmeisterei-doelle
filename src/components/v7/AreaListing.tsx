import { ChevronRight } from "lucide-react";
import { serviceAreas } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// V6-Prinzip: klare typografische Liste statt bunter Karten.
const AreaListing = () => (
  <section id="einsatzgebiete" className="bg-background py-20 md:py-28">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
          Einsatzgebiete
        </p>
        <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
          Vor Ort in Düsseldorf und Umgebung.
        </h2>
        <p className="mt-4 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted-foreground">
          Kurze Wege, feste Pflegetermine, verlässliche Rückmeldung.
        </p>
      </div>

      <ul className="mt-10 divide-y divide-border/70 border-y border-border/70">
        {serviceAreas.map((area) => (
          <li key={area}>
            <a
              href={withBase(`/gartenpflege-${area.toLowerCase().replace(/[^a-z]/g, "")}`)}
              className="group flex items-center justify-between gap-4 py-5"
            >
              <span className="text-[1.35rem] font-semibold tracking-[-0.005em] text-foreground md:text-[1.5rem]">
                {area}
              </span>
              <ChevronRight
                aria-hidden
                className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                strokeWidth={2}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default AreaListing;
