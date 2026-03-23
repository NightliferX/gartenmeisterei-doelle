import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const trustItems = [
  "Grevenbroich & Umgebung",
  "Qualität & Zuverlässigkeit",
  "Individuelle Lösungen",
  "Kostenlose Beratung",
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-foreground/60" />

      {/* Content */}
      <div className="relative z-10 container text-center px-4 pt-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary-foreground leading-tight max-w-4xl mx-auto">
          Ihr Zuhause.
          <br />
          <span className="text-primary brightness-150">Unsere Leidenschaft.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Professionelle Haus- und Gartensanierung in Grevenbroich, Köln und dem Rhein-Kreis Neuss – von der Planung bis zur Umsetzung.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="text-base px-8 py-6">
            <a href="#kontakt">
              Jetzt Beratung anfragen
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-base px-8 py-6 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
            <a href="#leistungen">Unsere Leistungen</a>
          </Button>
        </div>

        {/* Trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
              <CheckCircle2 className="w-4 h-4 text-primary brightness-150 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
