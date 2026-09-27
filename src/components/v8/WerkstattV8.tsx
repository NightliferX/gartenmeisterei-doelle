import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { projects } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";
import { oeffneBeratung } from "@/components/v8/BeratungCtaV8";

const tabs = [
  { key: "hecke", label: "Hecke", match: "Hecke am Hausweg", slug: "heckenschnitt" },
  { key: "vorgarten", label: "Vorgarten", match: "Vorgartenhecke", slug: "heckenschnitt" },
  { key: "garten", label: "Garten", match: "Verwilderten Garten", slug: "gartenpflege" },
  { key: "obstbaum", label: "Obstbaum", match: "Obstbäume", slug: "baumschnitt" },
  { key: "rasen", label: "Rasen", match: "Vermoosten Rasen", slug: "rasenpflege" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const WerkstattV8 = () => {
  const [active, setActive] = useState<TabKey>("hecke");
  const tab = tabs.find((t) => t.key === active) ?? tabs[0];
  const project =
    projects.find((p) => p.title.includes(tab.match) && p.beforeImage && p.afterImage) ??
    projects.find((p) => p.beforeImage && p.afterImage);
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    hecke: null,
    vorgarten: null,
    garten: null,
    obstbaum: null,
    rasen: null,
  });

  // ARIA-Tabs-Tastaturmuster: Pfeil links/rechts wandern, Home/End
  // springen an Rand. Aktivierung folgt dem Fokus (Automatic Activation).
  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === null) return;
    e.preventDefault();
    const nextKey = tabs[nextIndex].key;
    setActive(nextKey);
    tabRefs.current[nextKey]?.focus();
  };

  return (
    <section id="projekte" className="relative overflow-hidden bg-[#0d120d] py-20 md:py-28">
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

        {/* Mobile: waagerechter Snap-Scroll mit Bleed-Padding, damit
            der letzte Tab nie ausgeschnitten wirkt. Ab sm: zentriert
            als Pill wie gehabt. */}
        <div
          role="tablist"
          aria-label="Projekt-Kategorie"
          className="mt-8 flex snap-x snap-mandatory gap-1 overflow-x-auto -mx-4 px-4 py-1 sm:mx-auto sm:w-fit sm:snap-none sm:justify-center sm:gap-0 sm:overflow-visible sm:rounded-full sm:bg-white/[0.08] sm:p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((t, index) => {
            const selected = t.key === active;
            return (
              <button
                key={t.key}
                ref={(node) => {
                  tabRefs.current[t.key] = node;
                }}
                id={`werkstatt-tab-${t.key}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`werkstatt-panel-${t.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(t.key)}
                onKeyDown={(e) => onTabKeyDown(e, index)}
                className={`v8-press shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2 text-[0.85rem] font-semibold transition-colors sm:px-5 sm:text-[0.9rem] ${
                  selected
                    ? "bg-white text-foreground shadow-sm"
                    : "bg-white/[0.08] text-white/85 hover:text-white sm:bg-transparent"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {project ? (
          <div
            id={`werkstatt-panel-${tab.key}`}
            role="tabpanel"
            aria-labelledby={`werkstatt-tab-${tab.key}`}
            className="relative mt-10 md:mt-12"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] } }}
                className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-center lg:gap-12"
              >
                <BeforeAfterSlider
                  className="border-0 shadow-2xl shadow-black/50"
                  title={project.title}
                  beforeImage={project.beforeImage ? withBase(project.beforeImage) : undefined}
                  afterImage={project.afterImage ? withBase(project.afterImage) : undefined}
                  beforeAlt={project.beforeAlt}
                  afterAlt={project.afterAlt}
                />

                <div className="text-center lg:text-left">
                  <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-white/85">
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
                    <button
                      type="button"
                      onClick={oeffneBeratung}
                      className="inline-flex items-center gap-1 text-[0.9rem] font-semibold text-white/85 underline-offset-4 hover:underline"
                    >
                      Beratung anfragen
                      <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default WerkstattV8;
