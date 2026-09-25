import {
  Award,
  Clock,
  Leaf,
  MapPin,
  MessagesSquare,
  Sprout,
  Truck,
} from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// NEUE Warum-Section-Variante nach User-Skizze:
// - Zentrierte Header „Warum wir / Darum die Gartenmeisterei."
// - Links: große Meister-Foto-Kachel mit Chip + Überschrift + Fließtext
// - Rechts oben: „Der Meister"-Karte mit Name, Fließtext und 3 Fact-Rows
// - Rechts unten: 2x2 Grid mit 4 Reason-Cards

const facts = [
  { icon: Award, label: "Gärtnermeister", value: "Fachrichtung Garten- und Landschaftsbau" },
  { icon: MapPin, label: "Standort", value: `${siteConfig.city} und Umgebung` },
  { icon: Leaf, label: "Fokus", value: "Gartenpflege, Schnitt und Saisonarbeit" },
];

const reasons = [
  {
    icon: Leaf,
    title: "Kostenlose Erstberatung.",
    text: "Wir schauen uns Ihren Garten vor Ort an — unverbindlich.",
  },
  {
    icon: Truck,
    title: "Alles wird mitgenommen.",
    text: "Schnittgut und Laub entsorgen wir nach jedem Termin.",
  },
  {
    icon: MessagesSquare,
    title: "Ein Ansprechpartner.",
    text: "Kein Callcenter, sondern jemand, der Ihren Garten kennt.",
  },
  {
    icon: Clock,
    title: "Schnelle Antwort.",
    text: `${siteConfig.responsePromise}.`,
  },
];

const WhyV8Neu = () => (
  <section
    aria-labelledby="darum-v8-neu"
    className="bg-secondary/50 py-20 md:py-28"
  >
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      {/* Header — zentriert, große Headline */}
      <div className="mx-auto max-w-[42rem] text-center">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
          Warum wir
        </p>
        <h2
          id="darum-v8-neu"
          className="mt-3 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-foreground"
        >
          Darum die Gartenmeisterei.
        </h2>
      </div>

      {/* Grid: links Meister-Foto (Row-Span), rechts oben Meister-Karte,
          rechts unten 4 Reasons */}
      <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:gap-8">
        {/* LINKS: große Meister-Foto-Kachel */}
        <article className="relative flex min-h-[520px] overflow-hidden rounded-[2rem] bg-primary text-primary-foreground shadow-xl shadow-primary/25 md:row-span-2 md:min-h-[720px]">
          <img
            src={withBase("/team/benedikt-doelle-gaertnermeister-vorgarten-portrait-duesseldorf.png")}
            alt={`${siteConfig.ownerName}, Gärtnermeister`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"
          />
          <div className="relative z-10 mt-auto flex flex-col p-7 md:p-9">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground backdrop-blur-sm">
              <Sprout className="h-3.5 w-3.5" strokeWidth={2.25} />
              Meisterbetrieb
            </span>
            <h3 className="mt-5 text-[1.75rem] font-semibold leading-[1.08] text-primary-foreground md:text-[2rem]">
              Direkt vom Gärtnermeister.
            </h3>
            <p className="mt-3 max-w-[46ch] text-[1rem] leading-relaxed text-primary-foreground/90 md:text-[1.05rem]">
              Beratung, Angebot und Ausführung aus einer Hand — Sie sprechen
              immer mit dem, der später bei Ihnen im Garten steht.
            </p>
          </div>
        </article>

        {/* RECHTS OBEN: Der Meister-Karte mit Fakten */}
        <article className="rounded-[2rem] bg-background p-7 shadow-[0_2px_18px_rgba(0,0,0,0.05)] md:p-9">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-primary">
            Der Meister
          </p>
          <h3 className="mt-2 text-[clamp(1.6rem,2.6vw,2rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-foreground">
            {siteConfig.ownerName}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[0.98rem] leading-relaxed text-muted-foreground md:text-[1rem]">
            Beratung und Ausführung direkt vom Gärtnermeister — klare
            Absprachen, saisongerechtes Handwerk und ein sauberes Ergebnis.
            Wer hier anfragt, spricht mit dem, der später im Garten steht.
          </p>

          <dl className="mt-6 space-y-2.5">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex items-start gap-3 rounded-2xl bg-secondary/70 p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="mt-0.5 text-[0.95rem] font-medium text-foreground">
                    {f.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </article>

        {/* RECHTS UNTEN: 4 Reasons als kompakte horizontale Zeilen —
            Icon links, Titel + Text rechts. Dadurch ist die rechte
            Spalte kürzer und das Meister-Foto links läuft nicht mehr
            überproportional lang. */}
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
          {reasons.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="flex items-start gap-4 rounded-2xl bg-background p-4 shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] md:p-5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon aria-hidden className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-[0.98rem] font-semibold leading-tight text-foreground">
                  {title}
                </p>
                <p className="mt-1.5 text-[0.88rem] leading-snug text-muted-foreground">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyV8Neu;
