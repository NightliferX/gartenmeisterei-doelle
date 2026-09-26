import { MapPin } from "lucide-react";
import { serviceAreas } from "@/lib/siteContent";
import { areaPages } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

const marqueeNames = [
  "Düsseldorf",
  ...areaPages.map((a) => a.name.replace("Düsseldorf-", "")),
];

const Leaf = () => (
  <svg viewBox="0 0 24 24" className="mx-5 h-6 w-6 shrink-0 text-primary sm:mx-8 sm:h-8 sm:w-8" aria-hidden>
    <path
      fill="currentColor"
      d="M5 19c0-8 5.5-13.5 15-14-.5 9.5-6 15-14 15H5v-1Zm2.2-.9c2.9-3.9 5.7-6.7 9.3-9.2-4.2 1.7-7.4 4.8-9.3 9.2Z"
    />
  </svg>
);

const Row = () => (
  <div className="flex shrink-0 items-center">
    {marqueeNames.map((name) => (
      <span key={name} className="flex items-center">
        <span className="whitespace-nowrap text-[clamp(2rem,7vw,4.5rem)] font-semibold leading-none tracking-[-0.02em] text-foreground">
          {name}
        </span>
        <Leaf />
      </span>
    ))}
  </div>
);

// V4-Look (heller Hintergrund, Chip-Tags mit MapPin) + V5-Marquee direkt unter
// der Ueberschrift.
const AreaBlockV8 = () => {
  const areaMap = new Map(areaPages.map((a) => [a.name.replace("Düsseldorf-", ""), a.slug]));

  return (
    <section id="einsatzgebiete" className="cv-auto bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 text-center sm:px-6">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
          Einsatzgebiete
        </p>
        <h2 className="mx-auto mt-3 max-w-[24ch] text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
          Für Düsseldorf und die Region — von Oberkassel bis Benrath.
        </h2>
      </div>

      {/* Textscroller wie V5, aber hell/passend zum V4-Look. */}
      <div className="mt-8 overflow-hidden py-2 md:mt-10">
        <div aria-hidden className="flex w-max v8-marquee">
          <Row />
          <Row />
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[1240px] px-4 text-center sm:px-6 md:mt-12">
        <p className="mx-auto max-w-[64ch] text-[1rem] leading-relaxed text-muted-foreground md:text-[1.05rem]">
          Wir pflegen Gärten in allen Düsseldorfer Stadtteilen und im nahen
          Umland. Das ist ideal für kurze Abstimmung, Vor-Ort-Termine und
          feste Pflegetermine ohne lange Anfahrt.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5 md:gap-3">
          {serviceAreas.map((area) => {
            const slug = areaMap.get(area);
            const inner = (
              <>
                <MapPin className="h-4 w-4 text-primary" strokeWidth={2} />
                {area}
              </>
            );
            const cls =
              "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[0.9rem] font-medium text-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-primary";
            return slug ? (
              <a key={area} href={withBase(`/${slug}`)} className={cls}>
                {inner}
              </a>
            ) : (
              <span key={area} className={cls}>
                {inner}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AreaBlockV8;
