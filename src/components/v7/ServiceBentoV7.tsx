import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

type ServiceCard = {
  id: string;
  title: string;
  image?: string;
  span: string;
  height: string;
};

// Bento-Anordnung: Gartenpflege gross, Heckenschnitt und Baumschnitt mittig,
// Rasen breit, Herbst und Winter kompakt.
const layout: ServiceCard[] = [
  { id: "gartenpflege", title: "Gartenpflege", image: "/team/gaertnermeister-buchsbaum-formschnitt-duesseldorf.jpg", span: "md:col-span-2 md:row-span-2", height: "h-[420px] md:h-full" },
  { id: "heckenschnitt", title: "Heckenschnitt & Formschnitt", image: "/team/heckenschnitt-stihl-motorsaege-nahaufnahme-duesseldorf.jpg", span: "md:col-span-2", height: "h-[280px]" },
  { id: "baumschnitt", title: "Baumschnitt & Baumpflege", span: "md:col-span-1 md:row-span-2", height: "h-[280px] md:h-full" },
  { id: "rasenpflege", title: "Rasenpflege", span: "md:col-span-1", height: "h-[280px]" },
  { id: "herbst", title: "Laubentsorgung & Herbstputz", span: "md:col-span-1", height: "h-[220px]" },
  { id: "saison", title: "Frühjahrs- & Winterservice", span: "md:col-span-1", height: "h-[220px]" },
];

const ServiceBentoV7 = () => {
  const map = new Map(services.map((s) => [s.id, s]));

  return (
    <section id="leistungen" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
            Unsere Leistungen
          </p>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
            Vom Heckenschnitt bis zum Winterservice.
          </h2>
          <p className="mt-4 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted-foreground">
            Wir halten Ihren Garten das ganze Jahr in Form — aus einer Hand,
            zuverlässig, mit Meisterhand.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:auto-rows-[220px] md:grid-cols-3">
          {layout.map((card) => {
            const service = map.get(card.id);
            if (!service) return null;
            const img = card.image ?? service.image;
            return (
              <a
                key={card.id}
                href={withBase(`/${card.id === "gartenpflege" ? "gartenpflege-duesseldorf" : card.id === "heckenschnitt" ? "heckenschnitt-duesseldorf" : card.id === "baumschnitt" ? "baumschnitt-duesseldorf" : card.id === "rasenpflege" ? "rasenpflege-duesseldorf" : card.id === "herbst" ? "laubentsorgung-duesseldorf" : "winterservice-duesseldorf"}`)}
                className={`v7-press group relative isolate overflow-hidden rounded-[1.25rem] bg-secondary/60 shadow-sm ring-1 ring-border/60 transition-all duration-300 hover:shadow-xl hover:ring-primary/25 ${card.span} ${card.height}`}
              >
                {img ? (
                  <img
                    src={/^https?:\/\//.test(img) ? img : withBase(img)}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary" />
                )}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
                  <div>
                    <h3 className="text-[1.05rem] font-semibold leading-tight text-white md:text-[1.2rem]">
                      {service.title}
                    </h3>
                    <p className="mt-1 hidden text-[0.85rem] text-white/85 md:block md:max-w-[36ch]">
                      {service.highlights?.[0]}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/95 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceBentoV7;
