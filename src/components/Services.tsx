import { Home, TreePine, PaintBucket, Building2 } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Haussanierung",
    description:
      "Komplettsanierung, Fassadenarbeiten, Dach- und Kellerarbeiten. Wir bringen Ihr Haus in neuem Glanz erstrahlen.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    icon: TreePine,
    title: "Gartengestaltung",
    description:
      "Gartenplanung, Terrassen, Zäune, Pflasterarbeiten und Bepflanzung – Ihr Traumgarten wird Wirklichkeit.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
  {
    icon: PaintBucket,
    title: "Innenausbau",
    description:
      "Malerarbeiten, Bodenverlegung, Trockenbau und Badezimmer-Renovierung – alles aus einer Hand.",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80",
  },
  {
    icon: Building2,
    title: "Gewerbesanierung",
    description:
      "Renovierung und Sanierung von Gewerbeimmobilien. Büros, Ladenlokale und mehr – termingerecht und professionell.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
];

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
            Von der Gartenmauer bis zur Komplettsanierung – wir sind Ihr zuverlässiger Partner für alle Projekte rund um Haus und Garten.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="scroll-fade-in group bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
