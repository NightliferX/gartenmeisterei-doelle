import { useState } from "react";

const categories = ["Alle", "Haus", "Garten", "Innen"];

const projects = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", category: "Haus", title: "Fassadensanierung Grevenbroich" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", category: "Garten", title: "Gartenanlage mit Terrasse" },
  { src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80", category: "Innen", title: "Badezimmer Komplettrenovierung" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", category: "Haus", title: "Dachsanierung & Dämmung" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", category: "Garten", title: "Pflasterarbeiten & Wege" },
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", category: "Innen", title: "Wohnzimmer Modernisierung" },
];

const Gallery = () => {
  const [active, setActive] = useState("Alle");

  const filtered = active === "Alle" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projekte" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto scroll-fade-in">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Unsere Arbeit
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Referenzprojekte
          </h2>
          <p className="mt-4 text-muted-foreground">
            Einblicke in unsere abgeschlossenen Projekte – Qualität, die man sieht.
          </p>
        </div>

        {/* Filter */}
        <div className="mt-10 flex justify-center gap-2 scroll-fade-in">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className="scroll-fade-in group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                    {project.category}
                  </span>
                  <p className="text-primary-foreground font-semibold text-lg">
                    {project.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
