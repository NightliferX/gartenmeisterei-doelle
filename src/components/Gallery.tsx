import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/siteContent";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { withBase } from "@/lib/utils";

const categories = ["Alle", "Schnitt", "Pflege", "Saison"];
const theme = import.meta.env.VITE_THEME;

// V2 „Das Gartenjahr": Magazin-Strecke — ein Projekt pro Zeile, Bilder im Wechsel.
const GalleryV2 = () => {
  return (
    <section id="projekte" className="bg-secondary/50 py-20 md:py-28">
      <div className="container px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Aus unserer Arbeit
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            So arbeiten wir
          </h2>
          <p className="mt-4 text-muted-foreground">
            Beispielprojekte zeigen, was gute Gartenpflege ausmacht — echte
            Kundengärten folgen mit den ersten Projekten.
          </p>
        </div>

        <div className="mt-14 space-y-16 md:space-y-24">
          {projects.map((project, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={project.title}
                className={`grid items-center gap-8 md:gap-14 lg:grid-cols-[1.15fr_1fr] ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-3xl shadow-sm">
                  <BeforeAfterSlider
                    title={project.title}
                    beforeImage={project.beforeImage ? withBase(project.beforeImage) : undefined}
                    afterImage={project.afterImage ? withBase(project.afterImage) : undefined}
                    beforeAlt={project.beforeAlt}
                    afterAlt={project.afterAlt}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {project.location}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <p className="mt-3 leading-relaxed text-foreground/80">
                    {project.result}.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
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

// V4 „Cinematic": filmische Wisch-Galerie mit Scroll-Snap.
const GalleryV4 = () => {
  return (
    <section id="projekte" className="bg-secondary/50 py-20 md:py-28">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Die Arbeit spricht.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Wischen Sie durch die Beispiele — jedes Bild lässt sich zwischen
            Vorher und Nachher umschalten.
          </p>
        </div>
      </div>

      <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1rem,calc((100vw-72rem)/2))] pb-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="w-[85%] flex-none snap-center overflow-hidden rounded-[2rem] bg-card shadow-sm sm:w-[60%] lg:w-[44%]"
          >
            <BeforeAfterSlider
              title={project.title}
              beforeImage={project.beforeImage ? withBase(project.beforeImage) : undefined}
              afterImage={project.afterImage ? withBase(project.afterImage) : undefined}
              beforeAlt={project.beforeAlt}
              afterAlt={project.afterAlt}
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.location} · {project.result}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="container px-4">
        <div className="mt-8 text-center">
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

const GalleryDefault = () => {
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
            So arbeiten wir
          </h2>
          <p className="mt-4 text-muted-foreground">
            Beispielprojekte zeigen, was gute Gartenpflege ausmacht — die
            Vorher-/Nachher-Bilder aus echten Kundengärten folgen mit den
            ersten Projekten.
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

const Gallery = () => {
  if (theme === "v2") return <GalleryV2 />;
  if (theme === "v4") return <GalleryV4 />;
  return <GalleryDefault />;
};

export default Gallery;
