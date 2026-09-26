import { ArrowRight } from "lucide-react";
import { services } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const slugFor = (id: string) =>
  ({
    gartenpflege: "gartenpflege",
    heckenschnitt: "heckenschnitt",
    baumschnitt: "baumschnitt",
    rasenpflege: "rasenpflege",
    herbst: "laubentsorgung",
    saison: "winterservice",
  }[id] ?? id);

const srcFor = (image?: string) =>
  image ? (/^https?:\/\//.test(image) ? image : withBase(image)) : undefined;

// Airbnb-Style Product-Cards: Foto oben mit weichen Rundungen, Titel
// und Mikrocopy direkt darunter — keine Overlays, viel Whitespace.
const ServicesV9 = () => (
  <section id="leistungen" className="bg-white py-20 md:py-28">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#FF5A5F]">
          Unsere Leistungen
        </p>
        <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-[#222]">
          Alles, was Ihr Garten braucht.
        </h2>
        <p className="mt-3 max-w-[52ch] text-[1rem] leading-relaxed text-[#484848]">
          Vom regelmäßigen Rasenschnitt bis zum kompletten Pflegevertrag —
          alles aus einer Hand.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {services.map((service) => {
          const src = srcFor(service.image);
          return (
            <a
              key={service.id}
              href={withBase(`/${slugFor(service.id)}`)}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#F2F2F2]">
                {src ? (
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>
              <h3 className="mt-4 text-[1.1rem] font-semibold leading-tight text-[#222] group-hover:text-[#FF5A5F]">
                {service.title}
              </h3>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[#767676]">
                {service.highlights?.join(" · ")}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[0.88rem] font-semibold text-[#222] underline-offset-4 group-hover:underline">
                Mehr erfahren
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesV9;
