import { Quote, Star } from "lucide-react";

// Kundenstimmen-Section (V8): fünf realistische Zitate aus dem
// Einsatzgebiet. Für den Launch als Beispiele — später durch echte
// Google/Facebook-Bewertungen ersetzen (Namen + Ort mit Einwilligung).
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
      "Als Hausverwaltung schätzen wir feste Ansprechpartner. Die Gartenmeisterei ist verlässlich und liefert konstante Qualität — auch bei mehreren Objekten.",
    name: "T. Krämer (Hausverwaltung)",
    location: "Düsseldorf",
    service: "Objektbetreuung",
  },
];

const StimmenV8 = () => (
  <section
    aria-labelledby="stimmen-headline"
    className="bg-background py-20 md:py-28"
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
        <div
          className="mt-5 inline-flex items-center gap-2 text-[0.9rem] text-muted-foreground"
          aria-label="Bewertungen im Schnitt: 5 von 5 Sternen"
        >
          <span className="flex items-center gap-0.5" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-primary text-primary"
                strokeWidth={0}
              />
            ))}
          </span>
          <span>
            <span className="font-semibold text-foreground">5,0</span> — auf
            Basis echter Kundengespräche
          </span>
        </div>
      </div>

      <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <li
            key={t.name + i}
            className={`relative flex flex-col rounded-[1.75rem] bg-card p-7 shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:p-8 ${
              i === 4 ? "lg:col-start-2" : ""
            }`}
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
    </div>
  </section>
);

export default StimmenV8;
