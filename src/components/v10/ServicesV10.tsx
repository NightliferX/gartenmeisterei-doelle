import { ArrowRight } from "lucide-react";
import { services } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const slugFor = (id: string) =>
  ({
    gartenpflege: "gartenpflege-duesseldorf",
    heckenschnitt: "heckenschnitt-duesseldorf",
    baumschnitt: "baumschnitt-duesseldorf",
    rasenpflege: "rasenpflege-duesseldorf",
    herbst: "laubentsorgung-duesseldorf",
    saison: "winterservice-duesseldorf",
  }[id] ?? id);

const srcFor = (image?: string) =>
  image ? (/^https?:\/\//.test(image) ? image : withBase(image)) : undefined;

// Barmer-Style Service-Grid: Foto-Kachel mit runder Ecke, unter dem
// Foto Headline (Serif) + kurze Beschreibung + Pfeil-Icon in
// schwarzem Kreis.
const ServicesV10 = () => (
  <section id="leistungen" className="bg-white py-20 md:py-24">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#7E3AE0]">
            Leistungen
          </p>
          <h2 className="mt-2 font-serif text-[clamp(2rem,4.2vw,3rem)] font-bold leading-[1.05] tracking-[-0.01em] text-[#0F0F0F]">
            Für Ihren Garten. Für jede Saison.
          </h2>
        </div>
        <a
          href={withBase("/#kontakt")}
          className="inline-flex h-11 items-center gap-2 self-start rounded-full border border-[#0F0F0F] px-5 text-[0.9rem] font-semibold text-[#0F0F0F] transition-colors hover:bg-[#0F0F0F] hover:text-white md:self-auto"
        >
          Alle Leistungen anfragen
          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {services.map((service) => {
          const src = srcFor(service.image);
          return (
            <a
              key={service.id}
              href={withBase(`/${slugFor(service.id)}`)}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#F2F2F0]">
                {src ? (
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : null}
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-serif text-[1.35rem] font-bold leading-tight text-[#0F0F0F]">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[#4A4A4A]">
                    {service.highlights?.join(" · ")}
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0F0F0F] text-white transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesV10;
