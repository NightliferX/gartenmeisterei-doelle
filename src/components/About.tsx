import { Shield, Heart, Users } from "lucide-react";

const values = [
  { icon: Shield, title: "Qualität", text: "Hochwertige Materialien und sorgfältige Ausführung bei jedem Projekt." },
  { icon: Heart, title: "Leidenschaft", text: "Wir lieben, was wir tun – und das sieht man an unseren Ergebnissen." },
  { icon: Users, title: "Persönlich", text: "Direkte Kommunikation mit dem Inhaber – keine Callcenter, keine Umwege." },
];

const About = () => {
  return (
    <section id="ueber-uns" className="py-20 md:py-28 bg-secondary/50">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="scroll-fade-in rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
              alt="Team Haus&Garten Profi"
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
              Robert Jovanovic & sein Team
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Als Inhaber von Haus&Garten Profi stehe ich persönlich für jedes Projekt. 
              Mit meinem erfahrenen Team realisieren wir Sanierungs- und Gestaltungsprojekte 
              in Grevenbroich, Köln und dem gesamten Rhein-Kreis Neuss. Ob kleine Reparatur 
              oder Komplettsanierung – bei uns ist Ihr Projekt in guten Händen.
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
