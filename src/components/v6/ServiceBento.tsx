import { ChevronRight } from "lucide-react";
import { services } from "@/lib/siteContent";
import { servicePages } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

const hrefFor = (serviceId: string) => {
  const page = servicePages.find((p) => p.serviceId === serviceId);
  return withBase(page ? `/${page.slug}` : "/#kontakt");
};

// Erster Satz der Leistungsbeschreibung reicht für die Kachel.
const lead = (description: string) => `${description.split(/[.:]/)[0].trim()}.`;

// Desktop-Bento: Gartenpflege über die ganze Breite, dann 2 halbe, dann 3 Drittel.
const spans: Record<string, string> = {
  gartenpflege: "lg:col-span-6 lg:grid lg:grid-cols-2",
  heckenschnitt: "lg:col-span-3",
  baumschnitt: "lg:col-span-3",
  rasenpflege: "lg:col-span-2",
  herbst: "lg:col-span-2",
  saison: "lg:col-span-2",
};

const ServiceBento = () => (
  <section id="leistungen" aria-labelledby="leistungen-titel" className="scroll-mt-16 bg-secondary py-24 lg:py-36">
    <div className="mx-auto max-w-[1024px] px-4 lg:px-6">
      <h2 id="leistungen-titel" className="v6-headline max-w-[16ch] text-foreground">
        Alles für Ihren Garten.
      </h2>
      <p className="v6-lead mt-4 max-w-[40ch] text-muted-foreground">
        Sechs Leistungen aus einer Hand. Schnittgut und Laub nehmen wir immer mit.
      </p>

      <ul className="mt-12 grid gap-5 lg:grid-cols-6">
        {services.map((service) => {
          const wide = service.id === "gartenpflege";
          return (
            <li
              key={service.id}
              className={`flex flex-col overflow-hidden rounded-[28px] bg-background ${spans[service.id] ?? "lg:col-span-2"}`}
            >
              <div className={`p-8 ${wide ? "lg:flex lg:flex-col lg:justify-center lg:p-12" : "lg:p-9"}`}>
                <h3 className={`text-foreground ${wide ? "v6-headline" : "v6-title"}`}>
                  {service.title}
                </h3>
                <p className="mt-3 max-w-[40ch] text-muted-foreground">{lead(service.description)}</p>
                <a href={hrefFor(service.id)} className="v6-link mt-4">
                  Mehr erfahren
                  <span className="sr-only"> über {service.title}</span>
                  <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
                </a>
              </div>
              <img
                src={withBase(service.image)}
                alt={service.title}
                loading="lazy"
                className={`mt-auto w-full object-cover ${
                  wide ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[4/3]"
                }`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default ServiceBento;
