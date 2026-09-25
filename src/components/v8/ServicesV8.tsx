import { ArrowRight } from "lucide-react";
import { services } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// V4-Prinzip „Cinematic-Tiles": grosse Foto-Kacheln mit Text im Bild.
// Karten stapeln sich beim Scrollen (Sticky-Stack, wie V5 mobile).
const slugFor = (id: string) =>
  ({
    gartenpflege: "gartenpflege-duesseldorf",
    heckenschnitt: "heckenschnitt-duesseldorf",
    baumschnitt: "baumschnitt-duesseldorf",
    rasenpflege: "rasenpflege-duesseldorf",
    herbst: "laubentsorgung-duesseldorf",
    saison: "winterservice-duesseldorf",
  }[id] ?? id);

const ServicesV8 = () => (
  <section id="leistungen" className="bg-background py-20 md:py-28">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
          Unsere Leistungen
        </p>
        <h2 className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
          Alles, was Ihr Garten braucht. Aus einer Hand.
        </h2>
      </div>

      <ul className="mt-12 md:mt-14">
        {services.map((service, index) => {
          const isExternal = /^https?:\/\//.test(service.image ?? "");
          const src = service.image
            ? isExternal
              ? service.image
              : withBase(service.image)
            : undefined;
          return (
            <li
              key={service.id}
              className="sticky pb-4 md:pb-6"
              style={{ top: `calc(5rem + ${index * 1.1}rem)` }}
            >
              <a
                href={withBase(`/${slugFor(service.id)}`)}
                className="v8-press group relative block aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_-20px_40px_-24px_rgba(0,0,0,0.35)] md:aspect-[16/9]"
              >
                {src ? (
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary" />
                )}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                  <h3 className="text-2xl font-bold leading-tight text-white md:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
                    {service.highlights?.join(" · ")}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white transition-transform group-hover:translate-x-0.5">
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default ServicesV8;
