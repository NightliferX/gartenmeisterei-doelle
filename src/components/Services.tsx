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

const Services = () => {
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
