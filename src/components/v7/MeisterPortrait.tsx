import { Award, Leaf, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const facts = [
  { icon: Award, label: "Gärtnermeister", value: "Fachrichtung Garten- und Landschaftsbau" },
  { icon: MapPin, label: "Standort", value: `${siteConfig.city} und Umgebung` },
  { icon: Leaf, label: "Fokus", value: "Gartenpflege, Schnitt und Saisonarbeit" },
];

// Editorial-Portrait im NYT/Zeit-Stil. Ruhig, meisterlich, seriös.
const MeisterPortrait = () => (
  <section id="meister" className="bg-secondary/40 py-20 md:py-28">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="grid gap-12 md:grid-cols-[1.05fr_1fr] md:items-center">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-muted shadow-xl">
          <img
            src={withBase("/team/hero-buchsbaum.jpg")}
            alt={`${siteConfig.ownerName}, Gärtnermeister der ${siteConfig.brandName}`}
            className="block aspect-[4/5] w-full object-cover md:aspect-[3/4]"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div>
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
            Der Meister
          </p>
          <h2 className="mt-3 text-[clamp(2rem,3.6vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
            {siteConfig.ownerName}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted-foreground">
            Beratung und Ausführung direkt vom Gärtnermeister — klare
            Absprachen, saisongerechtes Handwerk und ein sauberes Ergebnis. Wer
            hier anfragt, spricht mit dem, der später im Garten steht.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-1">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <dt className="text-[0.8rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-[0.95rem] font-medium text-foreground">
                    {f.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </section>
);

export default MeisterPortrait;
