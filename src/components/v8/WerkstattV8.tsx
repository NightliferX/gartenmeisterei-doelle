import { useState } from "react";
import { ArrowRight } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { projects } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const tabs = [
  { key: "hecke", label: "Hecke", match: "Hecken in Form gebracht", slug: "heckenschnitt" },
  { key: "garten", label: "Garten", match: "Verwilderten Garten", slug: "gartenpflege" },
  { key: "obstbaum", label: "Obstbaum", match: "Obstbäume", slug: "baumschnitt" },
  { key: "rasen", label: "Rasen", match: "Rollrasen", slug: "rasenpflege" },
] as const;

const WerkstattV8 = () => {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("hecke");
  const tab = tabs.find((t) => t.key === active) ?? tabs[0];
  const project =
    projects.find((p) => p.title.includes(tab.match) && p.beforeImage && p.afterImage) ??
    projects.find((p) => p.beforeImage && p.afterImage);

  return (
    <section id="projekte" className="bg-[#0d120d] py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Header + Tabs immer zentriert, Split-Layout darunter */}
        <div className="scroll-fade-in mx-auto max-w-3xl text-center">
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
            Unsere Arbeit
          </p>
          <h2 className="mt-3 text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
            So arbeiten wir.
          </h2>
        </div>

        <div className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Kategorie"
            className="inline-flex rounded-full bg-white/[0.08] p-1"
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                type="button"
                aria-selected={t.key === active}
                onClick={() => setActive(t.key)}
                className={`v8-press rounded-full px-4 py-2 text-[0.85rem] font-semibold transition-colors sm:px-5 sm:text-[0.9rem] ${
                  t.key === active
                    ? "bg-white text-foreground shadow-sm"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {project ? (
          <div className="mt-10 grid gap-8 md:mt-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
            <BeforeAfterSlider
              className="border-0 shadow-2xl shadow-black/50"
              title={project.title}
              beforeImage={project.beforeImage ? withBase(project.beforeImage) : undefined}
              afterImage={project.afterImage ? withBase(project.afterImage) : undefined}
              beforeAlt={project.beforeAlt}
              afterAlt={project.afterAlt}
            />

            <div className="text-center lg:text-left">
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-white/60">
                {project.location}
              </p>
              <h3 className="mt-2 text-[clamp(1.4rem,2.8vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-white">
                {project.title}
              </h3>
              <p className="mx-auto mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-white/75 lg:mx-0 lg:text-[1.05rem]">
                {project.result}
              </p>

              <dl className="mt-6 hidden gap-4 lg:grid">
                {[
                  { label: "Ausgangslage", value: project.challenge },
                  { label: "Umsetzung", value: project.solution },
                ].map((row) => (
                  <div key={row.label} className="border-t border-white/10 pt-3">
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/50">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-[0.95rem] leading-relaxed text-white/80">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href={withBase(`/${tab.slug}`)}
                  className="v8-press inline-flex h-11 items-center gap-1.5 rounded-full bg-primary px-5 text-[0.9rem] font-semibold text-primary-foreground shadow-sm"
                >
                  Zur Leistung
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </a>
                <a
                  href={withBase("/#kontakt")}
                  className="inline-flex items-center gap-1 text-[0.9rem] font-semibold text-white/85 underline-offset-4 hover:underline"
                >
                  Ihr Garten
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default WerkstattV8;
