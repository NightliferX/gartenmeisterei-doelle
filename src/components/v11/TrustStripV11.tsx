import { Award, MapPin, Shield, Sparkles } from "lucide-react";

// Trust-Strip direkt unter dem Hero. Trägt die vier zentralen Vertrauens-
// Anker für einen Meisterbetrieb: Meister-Titel, Region, Versicherung,
// Reaktionszeit. Statt AI-Slop-Slogans harte Fakten.
const items = [
  {
    icon: Award,
    label: "Meisterbetrieb",
    sub: "Handwerkskammer Düsseldorf",
  },
  {
    icon: MapPin,
    label: "Düsseldorf & Umland",
    sub: "Umkreis 25 km",
  },
  {
    icon: Shield,
    label: "Haftpflicht bis 5 Mio €",
    sub: "Für Ihr Grundstück",
  },
  {
    icon: Sparkles,
    label: "Antwort in Stunden",
    sub: "Persönlich vom Meister",
  },
];

const TrustStripV11 = () => (
  <section
    aria-label="Trust-Anker: Meisterbetrieb, Region, Versicherung, Reaktionszeit"
    className="border-y border-black/[0.06] bg-background py-8 md:py-10"
  >
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        {items.map(({ icon: Icon, label, sub }) => (
          <li key={label} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <div>
              <p className="text-[0.98rem] font-semibold leading-tight text-foreground">
                {label}
              </p>
              <p className="mt-0.5 text-[0.85rem] leading-tight text-muted-foreground">
                {sub}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default TrustStripV11;
