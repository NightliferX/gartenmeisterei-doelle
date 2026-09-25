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

// Barmer-Style Service-Cards: kleine Foto-Tiles + Info-Text +
// klarer "Mehr erfahren"-Link mit Pfeil. Sachlich, sehr Corporate.
const ServicesV10 = () => (
  <section id="leistungen" className="bg-white py-20 md:py-24">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#009B39]">
          Leistungen
        </p>
        <h2 className="mt-2 text-[clamp(1.9rem,3.8vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.01em] text-[#1B1B1B]">
          Ihre Pflege — Schritt für Schritt.
        </h2>
        <p className="mt-3 max-w-[56ch] text-[1rem] leading-relaxed text-[#4D4D4D]">
          Ob einzelner Einsatz oder komplette Betreuung im Pflegevertrag —
          finden Sie hier die passende Leistung für Ihren Garten.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const src = srcFor(service.image);
          return (
            <a
              key={service.id}
              href={withBase(`/${slugFor(service.id)}`)}
              className="group flex flex-col overflow-hidden rounded-md border border-black/[0.08] bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F2F2F0]">
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
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[1.15rem] font-bold leading-tight text-[#1B1B1B] group-hover:text-[#009B39]">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-[#4D4D4D]">
                  {service.highlights?.join(" · ")}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-[#009B39]">
                  Mehr erfahren
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
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
