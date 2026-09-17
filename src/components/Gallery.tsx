import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/siteContent";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { withBase } from "@/lib/utils";

const categories = ["Alle", "Haus", "Garten", "Innen"];

const Gallery = () => {
  const [active, setActive] = useState("Alle");

  const filtered = useMemo(
    () => (active === "Alle" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

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
            Vorher-/Nachher-Vergleiche zeigen am besten, wie stark eine saubere
            Umsetzung auf Haus, Garten und Innenraume wirkt.
          </p>
        </div>

        {/* Filter */}
        <div className="mt-10 flex justify-center gap-2 scroll-fade-in">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
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
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className="scroll-fade-in visible group overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <BeforeAfterSlider
                title={project.title}
                beforeImage={project.beforeImage ? withBase(project.beforeImage) : undefined}
                afterImage={project.afterImage ? withBase(project.afterImage) : undefined}
                beforeAlt={project.beforeAlt}
                afterAlt={project.afterAlt}
              />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{project.location}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.serviceTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Projekt:</span>{" "}
                  {project.summary}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Ausgangslage:</span>{" "}
                  {project.challenge}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Umsetzung:</span>{" "}
                  {project.solution}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Ergebnis:</span>{" "}
                  {project.result}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="scroll-fade-in mt-12 text-center">
          <Button asChild size="lg">
            <a href={withBase("/#kontakt")}>
              Ihr Projekt unverbindlich besprechen
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
