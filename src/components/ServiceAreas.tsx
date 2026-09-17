import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceAreas } from "@/lib/siteContent";

const ServiceAreas = () => {
  return (
    <section id="einsatzgebiete" className="py-20 md:py-28 bg-secondary/50">
      <div className="container px-4">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="scroll-fade-in">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Einsatzgebiete
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Für Grevenbroich und die Region rund um Haus & Garten
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
              Wir betreuen Projekte in Grevenbroich und im nahen Umland. Das ist
              ideal für kurze Abstimmung, Vor-Ort-Termine und eine verlässliche
              Bauabwicklung ohne lange Wege.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="scroll-fade-in rounded-3xl border border-border/80 bg-card p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
              Lokal stark
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              Kurze Wege. Klare Absprachen. Saubere Umsetzung.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Ob Sanierung, Pflasterarbeiten oder Gartenprojekt: Wir beraten bei
              Ihnen vor Ort, stimmen den Aufwand transparent ab und planen
              Leistungen passend zu Haus, Grundstück und Budget.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground/80">
              <li>Vor-Ort-Besichtigung für Haus- und Gartenprojekte</li>
              <li>Kurze Reaktionswege im Rhein-Kreis Neuss und Umgebung</li>
              <li>Abgestimmte Leistungen aus einer Hand statt Stuckwerk</li>
            </ul>
            <Button asChild className="mt-7 w-full sm:w-auto">
              <a href="/#kontakt">
                Projekt in Ihrer Region anfragen
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
