import { ArrowRight } from "lucide-react";
import { services } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Cinematic-Tiles mit Fotos + Text.
// Mobil: Karten stapeln sich beim Scrollen (Sticky-Stack, wie V5 mobile).
// Desktop (md+): klassisches 2-Spalten-Grid nebeneinander.
const slugFor = (id: string) =>
  ({
    gartenpflege: "gartenpflege",
    heckenschnitt: "heckenschnitt",
    baumschnitt: "baumschnitt",
    rasenpflege: "rasenpflege",
    herbst: "laubentsorgung",
    saison: "winterservice",
    rollrasen: "rollrasen",
    terrasse: "terrasse",
  }[id] ?? id);

const srcFor = (image: string | undefined) => {
  if (!image) return undefined;
  return /^https?:\/\//.test(image) ? image : withBase(image);
};

const Card = ({ service }: { service: (typeof services)[number] }) => {
  const src = srcFor(service.image);
  return (
    <a
      href={withBase(`/${slugFor(service.id)}`)}
      className="v8-press group relative block aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_-20px_40px_-24px_rgba(0,0,0,0.35)] md:aspect-[16/10] md:shadow-none"
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
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:from-black/75 md:via-black/25"
      />
      <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
        <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
          {service.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
          {service.highlights?.join(" · ")}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white transition-transform group-hover:translate-x-0.5">
          Mehr erfahren
          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
        </span>
      </div>
    </a>
  );
};

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

      {/* Mobil: Karten stapeln sich beim Scrollen (Sticky-Stack) */}
      <ul className="mt-12 md:hidden">
        {services.map((service, index) => (
          <li
            key={service.id}
            className="sticky pb-4"
            style={{ top: `calc(5rem + ${index * 1.1}rem)` }}
          >
            <Card service={service} />
          </li>
        ))}
      </ul>

      {/* Desktop: klassisches 2-Spalten-Grid nebeneinander */}
      <div className="mt-14 hidden gap-5 md:grid md:grid-cols-2 md:gap-6">
        {services.map((service) => (
          <Card key={service.id} service={service} />
        ))}
      </div>
    </div>
  </section>
);

export default ServicesV8;
