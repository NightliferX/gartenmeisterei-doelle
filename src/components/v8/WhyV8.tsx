import { Clock, Leaf, MessagesSquare, Sprout, Truck } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Feature-Bento: eine grosse Meister-Kachel mit Foto (Sprout=Meisterbetrieb),
// rechts daneben ein 2x2-Grid mit den drei restlichen Kern-Versprechen.
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

const WhyV8 = () => (
  <section aria-labelledby="darum-v8" className="bg-secondary/50 py-20 md:py-28">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="scroll-fade-in mx-auto max-w-[42rem] text-center">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
          Warum wir
        </p>
        <h2
          id="darum-v8"
          className="mt-3 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground"
        >
          Darum die Gartenmeisterei.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:mt-12 md:gap-5 lg:grid-cols-3 lg:grid-rows-2">
        {/* Feature-Kachel: Foto fuellt die ganze Kachel, Text overlay unten */}
        <article className="scroll-fade-in group relative flex overflow-hidden rounded-[1.75rem] bg-primary text-primary-foreground shadow-xl shadow-primary/25 min-h-[420px] lg:col-span-1 lg:row-span-2">
          <img
            src={withBase("/team/benedikt-doelle-gaertnermeister-vorgarten-portrait-duesseldorf.png")}
            alt={`${siteConfig.ownerName}, Gärtnermeister`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
          <div className="relative z-10 mt-auto flex flex-col p-6 md:p-7">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground backdrop-blur-sm">
              <Sprout className="h-3.5 w-3.5" strokeWidth={2.25} />
              Meisterbetrieb
            </span>
            <h3 className="mt-4 text-[1.35rem] font-semibold leading-tight text-primary-foreground md:text-[1.5rem]">
              Direkt vom Gärtnermeister.
            </h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-primary-foreground/90">
              Beratung, Angebot und Ausführung aus einer Hand — Sie sprechen
              immer mit dem, der später bei Ihnen im Garten steht.
            </p>
          </div>
        </article>

        {/* Vier Text-Kacheln (2x2 auf lg) */}
        {reasons.map(({ icon: Icon, title, text }, i) => (
          <article
            key={title}
            style={{ transitionDelay: `${(i + 1) * 80}ms` }}
            className="scroll-fade-in group flex flex-col rounded-[1.5rem] bg-background p-5 shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] md:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon aria-hidden className="h-5 w-5" strokeWidth={2} />
              </span>
              <p className="text-[1rem] font-semibold leading-tight text-foreground md:text-[1.05rem]">
                {title}
              </p>
            </div>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground md:text-[0.95rem]">
              {text}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default WhyV8;
