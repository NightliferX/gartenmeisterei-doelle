import { Award, Clock, Leaf, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const facts = [
  { icon: Award, label: "Gärtnermeister", value: "Garten- und Landschaftsbau" },
  { icon: MapPin, label: "Standort", value: `${siteConfig.city} & Umland` },
  { icon: Leaf, label: "Fokus", value: "Gartenpflege, Schnitt, Saisonarbeit" },
  { icon: Clock, label: "Antwort", value: siteConfig.responsePromise },
];

// Airbnb "Meet your host"-Style: Foto in runder Kachel + Facts + persönliche
// Copy — die Person ist die Marke.
const MeisterV9 = () => (
  <section id="meister" className="bg-[#F7F7F7] py-20 md:py-28">
    <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-14">
      <div className="relative overflow-hidden rounded-[24px] bg-[#EDEDED] shadow-[0_16px_48px_-24px_rgba(0,0,0,0.25)]">
        <img
          src={withBase("/team/benedikt-doelle-gaertnermeister-vorgarten-portrait-duesseldorf.png")}
          alt={`${siteConfig.ownerName}, Gärtnermeister`}
          className="block aspect-[4/5] w-full object-cover md:aspect-[3/4]"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div>
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#FF5A5F]">
          Ihr Meister
        </p>
        <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-[#222]">
          {siteConfig.ownerName}
        </h2>
        <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-[#484848] md:text-[1.05rem]">
          Beratung, Angebot und Ausführung direkt vom Gärtnermeister — Sie
          sprechen immer mit dem, der später bei Ihnen im Garten steht.
          Klare Absprachen, saisongerechtes Handwerk, sauberes Ergebnis.
        </p>

        <dl className="mt-8 grid gap-3 sm:grid-cols-2">
          {facts.map((f) => (
            <div
              key={f.label}
              className="flex items-start gap-3 rounded-[14px] bg-white p-4 shadow-[0_2px_18px_rgba(0,0,0,0.05)]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#FF5A5F]/10 text-[#FF5A5F]">
                <f.icon className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <div>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#767676]">
                  {f.label}
                </dt>
                <dd className="mt-0.5 text-[0.95rem] font-medium text-[#222]">
                  {f.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
);

export default MeisterV9;
