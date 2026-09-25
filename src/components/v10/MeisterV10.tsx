import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Barmer "Über uns"-Stil: Foto links, ruhiger Fließtext rechts + kleine
// Fakt-Liste. Sachlich, sehr redaktionell.
const MeisterV10 = () => (
  <section id="meister" className="bg-[#F8F8F5] py-20 md:py-24">
    <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-14">
      <div>
        <img
          src={withBase("/team/benedikt-doelle-gaertnermeister-vorgarten-portrait-duesseldorf.png")}
          alt={`${siteConfig.ownerName}, Gärtnermeister`}
          className="block aspect-[4/5] w-full rounded-md object-cover shadow-[0_16px_48px_-24px_rgba(0,0,0,0.25)]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div>
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#009B39]">
          Über uns
        </p>
        <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.01em] text-[#1B1B1B]">
          Gärtnermeister {siteConfig.ownerName}.
        </h2>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-[#4D4D4D] md:text-[1.08rem]">
          Als Gärtnermeister-Betrieb kümmern wir uns um Ihren Garten so, als
          wäre es unser eigener. Beratung, Angebot und Ausführung kommen aus
          einer Hand — Sie sprechen immer mit dem, der später bei Ihnen im
          Garten steht.
        </p>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-[#4D4D4D] md:text-[1.08rem]">
          Klare Absprachen, saisongerechtes Handwerk, ein sauberes Ergebnis
          — und feste Ansprechbarkeit, wenn spontan etwas anfällt.
        </p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Abschluss", value: "Gärtnermeister" },
            { label: "Fachrichtung", value: "Garten- und Landschaftsbau" },
            { label: "Standort", value: `${siteConfig.city} & Umland` },
          ].map((f) => (
            <div
              key={f.label}
              className="rounded-md border border-black/[0.08] bg-white p-4"
            >
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#4D4D4D]">
                {f.label}
              </dt>
              <dd className="mt-1 text-[0.95rem] font-semibold text-[#1B1B1B]">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={withBase("/#kontakt")}
          className="mt-8 inline-flex items-center gap-1.5 text-[1rem] font-semibold text-[#009B39] hover:underline"
        >
          Persönliches Erstgespräch vereinbaren
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </a>
      </div>
    </div>
  </section>
);

export default MeisterV10;
