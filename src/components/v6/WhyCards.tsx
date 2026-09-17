import { Clock, Leaf, MessagesSquare, Sprout, Truck } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";

// Nur Versprechen, die der Betrieb selbst so kommuniziert — keine Zahlen, keine Siegel.
const reasons = [
  {
    icon: Sprout,
    title: "Meisterbetrieb.",
    text: "Beratung und Ausführung direkt vom Gärtnermeister.",
  },
  {
    icon: Leaf,
    title: "Kostenlose Erstberatung.",
    text: "Wir schauen uns Ihren Garten vor Ort an — unverbindlich.",
  },
  {
    icon: Clock,
    title: "Schnelle Antwort.",
    text: `${siteConfig.responsePromise}.`,
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
];

const WhyCards = () => (
  <section aria-labelledby="darum-titel" className="bg-secondary py-24 lg:py-36">
    <div className="mx-auto max-w-[1024px] px-4 lg:px-6">
      <h2 id="darum-titel" className="v6-headline max-w-[18ch] text-foreground">
        Darum die Gartenmeisterei.
      </h2>
    </div>

    <ul className="v6-no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 lg:mx-auto lg:grid lg:max-w-[1024px] lg:grid-cols-5 lg:overflow-visible lg:px-6">
      {reasons.map(({ icon: Icon, title, text }) => (
        <li
          key={title}
          className="flex min-h-[15rem] w-[72%] shrink-0 snap-start flex-col rounded-[18px] bg-background p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:w-[42%] lg:w-auto"
        >
          <Icon aria-hidden="true" className="h-8 w-8 text-accent" strokeWidth={1.75} />
          <p className="mt-auto pt-10 text-[1.05rem] font-semibold leading-snug text-foreground">
            {title}
          </p>
          <p className="mt-1 text-[0.95rem] leading-snug text-muted-foreground">{text}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default WhyCards;
