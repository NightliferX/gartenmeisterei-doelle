import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Barmer "Über uns"-Style: Foto-Kachel mit runder Ecke, Serif-Headline,
// ruhiger Fließtext, alles auf hellblauem BG.
const MeisterV10 = () => (
  <section id="meister" className="bg-[#E5F1FA] py-20 md:py-24">
    <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-14">
      <div className="overflow-hidden rounded-[28px]">
        <img
          src={withBase("/team/benedikt-doelle-gaertnermeister-vorgarten-portrait-duesseldorf.png")}
          alt={`${siteConfig.ownerName}, Gärtnermeister`}
          className="block aspect-[4/5] w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div>
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#7E3AE0]">
          Über uns
        </p>
        <h2 className="mt-2 font-serif text-[clamp(2rem,3.8vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.01em] text-[#0F0F0F]">
          {siteConfig.ownerName}, Ihr Gärtnermeister.
        </h2>
        <p className="mt-5 text-[1.02rem] leading-relaxed text-[#4A4A4A] md:text-[1.08rem]">
          Als Gärtnermeister-Betrieb kümmern wir uns um Ihren Garten so, als
          wäre es unser eigener. Beratung, Angebot und Ausführung aus einer
          Hand — Sie sprechen immer mit dem, der später bei Ihnen im Garten
          steht.
        </p>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-[#4A4A4A] md:text-[1.08rem]">
          Klare Absprachen, saisongerechtes Handwerk, sauberes Ergebnis —
          und feste Ansprechbarkeit, wenn spontan etwas anfällt.
        </p>

        <a
          href={withBase("/#kontakt")}
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#7E3AE0] px-6 text-[0.98rem] font-semibold text-white transition-colors hover:bg-[#6B2FC7]"
        >
          Erstgespräch vereinbaren
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </a>
      </div>
    </div>
  </section>
);

export default MeisterV10;
