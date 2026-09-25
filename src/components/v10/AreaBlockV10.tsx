import { MapPin } from "lucide-react";
import { serviceAreas } from "@/lib/siteContent";
import { areaPages } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

// Barmer-Style-Einsatzgebiete: klare Liste in Spalten, jede Stadt ist ein
// Text-Link mit MapPin-Icon.
const AreaBlockV10 = () => {
  const areaMap = new Map(
    areaPages.map((a) => [a.name.replace("Düsseldorf-", ""), a.slug]),
  );

  return (
    <section id="einsatzgebiete" className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#009B39]">
            Einsatzgebiete
          </p>
          <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.01em] text-[#1B1B1B]">
            Wo wir für Sie arbeiten.
          </h2>
          <p className="mt-3 max-w-[56ch] text-[1rem] leading-relaxed text-[#4D4D4D]">
            Wir pflegen Gärten in allen Düsseldorfer Stadtteilen und im nahen
            Umland — kurze Wege, faire Anfahrtskosten.
          </p>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area) => {
            const slug = areaMap.get(area);
            const inner = (
              <>
                <MapPin
                  className="h-4 w-4 shrink-0 text-[#009B39]"
                  strokeWidth={2.25}
                />
                <span className="text-[0.98rem] font-medium">{area}</span>
              </>
            );
            const cls =
              "flex items-center gap-2.5 border-b border-black/[0.08] py-3 text-[#1B1B1B]";
            return slug ? (
              <li key={area}>
                <a
                  href={withBase(`/${slug}`)}
                  className={`${cls} transition-colors hover:text-[#009B39]`}
                >
                  {inner}
                </a>
              </li>
            ) : (
              <li key={area} className={cls}>{inner}</li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default AreaBlockV10;
