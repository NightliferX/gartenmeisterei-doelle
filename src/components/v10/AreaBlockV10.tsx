import { MapPin } from "lucide-react";
import { serviceAreas } from "@/lib/siteContent";
import { areaPages } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

// Barmer-Style-Einsatzgebiete: helle Chip-Wolke mit vollen Rundungen.
const AreaBlockV10 = () => {
  const areaMap = new Map(
    areaPages.map((a) => [a.name.replace("Düsseldorf-", ""), a.slug]),
  );

  return (
    <section id="einsatzgebiete" className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#7E3AE0]">
            Einsatzgebiete
          </p>
          <h2 className="mt-2 font-serif text-[clamp(2rem,3.8vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.01em] text-[#0F0F0F]">
            Düsseldorf & Umgebung.
          </h2>
          <p className="mt-3 max-w-[56ch] text-[1rem] leading-relaxed text-[#4A4A4A]">
            Kurze Wege, feste Pflegetermine, faire Anfahrtskosten — 14 Städte
            in Rhein-Nähe.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2.5">
          {serviceAreas.map((area) => {
            const slug = areaMap.get(area);
            const inner = (
              <>
                <MapPin
                  className="h-3.5 w-3.5 text-[#7E3AE0]"
                  strokeWidth={2.25}
                />
                {area}
              </>
            );
            const cls =
              "inline-flex items-center gap-2 rounded-full bg-[#F3E9FF] px-4 py-2.5 text-[0.92rem] font-semibold text-[#0F0F0F] transition-colors hover:bg-[#7E3AE0] hover:text-white [&:hover_svg]:text-white";
            return slug ? (
              <a key={area} href={withBase(`/${slug}`)} className={cls}>
                {inner}
              </a>
            ) : (
              <span key={area} className={cls}>{inner}</span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AreaBlockV10;
