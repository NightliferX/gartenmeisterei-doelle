import { Heart, Shield, Users } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";

const values = [
  {
    icon: Shield,
    title: "Meisterhaftes Handwerk",
    text: "Schnitt, Pflege und Pflanzenauswahl nach Fachwissen aus der Meisterausbildung — zur richtigen Zeit und mit dem richtigen Maß.",
  },
  {
    icon: Heart,
    title: "Saubere Kommunikation",
    text: "Sie erhalten klare Aussagen zu Aufwand, Terminen und den nächsten Schritten — und einen Garten, der aufgeräumt zurückbleibt.",
  },
  {
    icon: Users,
    title: "Persönlich betreut",
    text: "Direkter Kontakt zum Gärtnermeister, der Ihren Garten kennt und über die Jahre begleitet.",
  },
];

const About = () => {
  return (
    <section id="ueber-uns" className="py-20 md:py-28 bg-secondary/50">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="scroll-fade-in rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
              alt={`Gärtnermeister ${siteConfig.ownerName} bei der Arbeit im Garten`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="scroll-fade-in">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Über Uns
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Benedikt Dölle — Gärtnermeister aus Düsseldorf
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Als Gärtnermeister betreue ich Gärten in Düsseldorf und Umgebung
              persönlich — von der ersten Besichtigung bis zum letzten
              Handgriff. Mein Anspruch: verlässliche Kommunikation, saubere
              Arbeit und ein Garten, der zu seinen Besitzern passt.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Ein Garten braucht über das Jahr die richtige Pflege zur richtigen
              Zeit. Deshalb denke ich in Jahreszeiten statt in Einzelterminen:
              vom Frühjahrsschnitt über die Sommerpflege bis zum Laub- und
              Winterservice — alles aus einer Hand.
            </p>

            <div className="mt-8 space-y-5">
              {values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 rounded-3xl border border-border/80 bg-card p-5 shadow-sm sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Region
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Düsseldorf, Meerbusch, Neuss, Ratingen und Umgebung
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Fokus
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Gartenpflege, Schnitt und Saisonservice
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Anspruch
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Meisterqualität mit klarer Abstimmung
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
