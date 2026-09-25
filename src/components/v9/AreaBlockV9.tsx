import { MapPin } from "lucide-react";
import { serviceAreas } from "@/lib/siteContent";
import { areaPages } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

// Airbnb "Erkunde nach Region"-Style: Chip-Grid mit Rundungen, hier ohne
// Fotos (bewusst reduziert), Fokus auf Klickbarkeit.
const AreaBlockV9 = () => {
  const areaMap = new Map(
    areaPages.map((a) => [a.name.replace("Düsseldorf-", ""), a.slug]),
  );

  return (
    <section id="einsatzgebiete" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 text-center sm:px-6">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#FF5A5F]">
          Wo wir arbeiten
        </p>
        <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-[#222]">
          Düsseldorf & Umgebung.
        </h2>
        <p className="mx-auto mt-3 max-w-[52ch] text-[1rem] leading-relaxed text-[#484848]">
          Kurze Wege, feste Pflegetermine, keine langen Anfahrtskosten —
          14 Städte in Rhein-Nähe.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area) => {
            const slug = areaMap.get(area);
            const inner = (
              <>
                <MapPin className="h-3.5 w-3.5 text-[#FF5A5F]" strokeWidth={2.25} />
                {area}
              </>
            );
            const cls =
              "inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-[0.9rem] font-semibold text-[#222] shadow-sm transition-all hover:border-[#FF5A5F]/40 hover:text-[#FF5A5F] hover:shadow-md";
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

export default AreaBlockV9;
