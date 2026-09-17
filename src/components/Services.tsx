import {
  CalendarClock,
  Leaf,
  Scissors,
  Sprout,
  Trash2,
  TreePine,
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/siteContent";
import { servicePages } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

const iconMap = {
  gartenpflege: Leaf,
  heckenschnitt: Scissors,
  baumschnitt: TreePine,
  rasenpflege: Sprout,
  herbst: Trash2,
  saison: CalendarClock,
};

const theme = import.meta.env.VITE_THEME;
const pageFor = (id: string) => servicePages.find((p) => p.serviceId === id);

// V2 „Das Gartenjahr": Magazin-Layout — große Bilder im Wechsel, keine Karten.
const ServicesV2 = () => {
  return (
    <section id="leistungen" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Unsere Leistungen
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Was wir für Ihren Garten tun
          </h2>
        </div>

        <div className="mt-14 space-y-16 md:space-y-24">
          {services.map((service, i) => {
            const page = pageFor(service.id);
            const reversed = i % 2 === 1;
            return (
              <div
                key={service.id}
                className={`grid items-center gap-8 md:gap-14 lg:grid-cols-2 ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <img
                  src={withBase(service.image)}
                  alt={service.title}
                  className={`w-full object-cover aspect-[4/3] ${
                    reversed
                      ? "rounded-[4.5rem_1.25rem_1.25rem_1.25rem]"
                      : "rounded-[1.25rem_4.5rem_1.25rem_1.25rem]"
                  }`}
                  loading="lazy"
                />
                <div>
                  <h3 className="text-2xl font-semibold md:text-3xl">{service.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mt-4 text-base text-foreground/80">
                    {service.highlights.join(" · ")}
                  </p>
                  {page ? (
                    <a
                      href={withBase(`/${page.slug}`)}
                      className="mt-5 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                    >
                      Mehr erfahren
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// V4 „Cinematic": große Foto-Kacheln mit Text im Bild (Apple-Tiles).
const ServicesV4 = () => {
  return (
    <section id="leistungen" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Leistungen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Alles, was Ihr Garten braucht. Aus einer Hand.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            const page = pageFor(service.id);
            const inner = (
              <>
                <img
                  src={withBase(service.image)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                  <h3 className="text-2xl font-bold text-white md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                    {service.highlights.join(" · ")}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white">
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </>
            );
            return page ? (
              <a
                key={service.id}
                href={withBase(`/${page.slug}`)}
                className="group relative block aspect-[4/3] overflow-hidden rounded-[2rem] md:aspect-[16/10]"
              >
                {inner}
              </a>
            ) : (
              <div
                key={service.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] md:aspect-[16/10]"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  if (theme === "v2") return <ServicesV2 />;
  if (theme === "v4") return <ServicesV4 />;
  return (
    <section id="leistungen" className="py-20 md:py-28 bg-secondary/50">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto scroll-fade-in">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Was wir bieten
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Unsere Leistungen
          </h2>
          <p className="mt-4 text-muted-foreground">
            Vom Heckenschnitt bis zum Winterservice — wir halten Ihren Garten
            das ganze Jahr über gepflegt, zuverlässig und aus einer Hand.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="scroll-fade-in group overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={withBase(service.image)}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  {(() => {
                    const Icon = iconMap[service.id as keyof typeof iconMap];
                    return <Icon className="h-6 w-6 text-primary" />;
                  })()}
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                  {service.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary/60" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {(() => {
                  const page = servicePages.find((p) => p.serviceId === service.id);
                  return page ? (
                    <a
                      href={withBase(`/${page.slug}`)}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                    >
                      Mehr erfahren
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null;
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
