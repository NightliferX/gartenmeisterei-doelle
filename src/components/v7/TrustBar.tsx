import { Award, CheckCircle2, Clock3 } from "lucide-react";

// Sticky Trust-Bar direkt unter dem Header — die drei wichtigsten
// Vertrauens-Signale immer sichtbar, sobald man den Hero verlaesst.
const items = [
  { icon: Award, label: "Meisterbetrieb" },
  { icon: Clock3, label: "Antwort in 24 h" },
  { icon: CheckCircle2, label: "Kostenlose Erstberatung" },
];

const TrustBar = () => (
  <div className="border-y border-border/70 bg-secondary/40 py-3">
    <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 sm:px-6">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-[0.85rem] font-medium text-muted-foreground">
          <item.icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
          {item.label}
        </div>
      ))}
    </div>
  </div>
);

export default TrustBar;
