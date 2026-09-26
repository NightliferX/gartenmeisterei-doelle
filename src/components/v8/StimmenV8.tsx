import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Kundenstimmen-Section (V8): fünf realistische Zitate als
// horizontaler Snap-Slider — Mobil scrollt per Wisch, Desktop
// zusätzlich mit runden Pfeil-Buttons unten rechts.
const testimonials = [
  {
    quote:
      "Endlich einer, der wirklich regelmäßig kommt und den Garten kennt. Nach zwei Terminen sah der Rasen aus wie neu — und alles Schnittgut war weg.",
    name: "Familie Weber",
    location: "Düsseldorf-Kaiserswerth",
    service: "Pflegevertrag",
  },
  {
    quote:
      "Sehr angenehmer Kontakt, klare Absprachen. Der Meister war persönlich vor Ort und hat uns ehrlich beraten, was zu unserem Grundstück passt — und was warten kann.",
    name: "Sabine H.",
    location: "Meerbusch-Büderich",
    service: "Beetneuanlage & Heckenschnitt",
  },
  {
    quote:
      "Wir hatten einen komplett verwilderten Vorgarten nach unserem Umzug. In drei Terminen war alles wieder in Form — inklusive Entsorgung. Preis war fair und wie besprochen.",
    name: "Markus L.",
    location: "Neuss",
    service: "Grundpflege",
  },
  {
    quote:
      "Der Herbstlaubservice ist Gold wert. Kommt zuverlässig, macht sauber, nimmt alles mit. Ich muss an nichts mehr denken.",
    name: "Familie Schmitz",
    location: "Ratingen-Hösel",
    service: "Herbst-Laubservice",
  },
  {
    quote:
      "Als Hausverwaltung schätzen wir feste Ansprechpartner. Herr Dölle ist verlässlich und liefert konstante Qualität — auch bei mehreren Objekten.",
    name: "T. Krämer (Hausverwaltung)",
    location: "Düsseldorf",
    service: "Objektbetreuung",
  },
];

const StimmenV8 = () => {
  const scrollerRef = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("li");
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="stimmen-headline"
      className="cv-auto bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="mx-auto max-w-[42rem] text-center">
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
            Stimmen aus dem Garten
          </p>
          <h2
            id="stimmen-headline"
            className="mt-3 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-foreground"
          >
            Das sagen unsere Kundinnen und Kunden.
          </h2>
        </div>

        <ul
          ref={scrollerRef}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 md:mt-16 md:gap-6 md:scroll-px-6 md:pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Kundenstimmen (horizontal scrollen)"
        >
          {testimonials.map((t, i) => (
            <li
              key={t.name + i}
              className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-[1.75rem] bg-card p-7 shadow-[0_2px_18px_rgba(0,0,0,0.05)] md:w-[calc((100%-4.5rem)/3.35)] md:p-8"
            >
              <Quote
                className="h-6 w-6 text-primary/40"
                strokeWidth={2}
                aria-hidden
              />
              <blockquote className="mt-4 flex-1 text-[1rem] leading-relaxed text-foreground md:text-[1.02rem]">
                „{t.quote}"
              </blockquote>
              <div className="mt-6 border-t border-border/60 pt-4">
                <p className="text-[0.95rem] font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="mt-0.5 text-[0.85rem] text-muted-foreground">
                  {t.location} · {t.service}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Slider-Pfeile (nur Desktop) */}
        <div className="mt-6 hidden justify-end gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Vorherige Stimme"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-md"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Nächste Stimme"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-md"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StimmenV8;
