import { ArrowRight } from "lucide-react";
import { withBase } from "@/lib/utils";

// Barmer-Hero: großes Foto Fullscreen, freches grün-gelbes Kreis-Badge
// oben rechts als "Störer", Headline und CTA links unten.
const HeroV10 = () => (
  <section id="start" className="relative isolate overflow-hidden bg-white">
    <div className="relative mx-auto max-w-[1240px] px-4 pt-6 sm:px-6">
      <div className="relative overflow-hidden rounded-[32px] bg-[#F3E9FF]">
        <img
          src={withBase("/team/gaertnermeister-buchsbaum-formschnitt-duesseldorf.jpg")}
          alt="Gärtnermeister beim Formschnitt in einem Düsseldorfer Vorgarten"
          className="block h-[62vh] min-h-[520px] w-full object-cover md:h-[72vh]"
          loading="eager"
          decoding="async"
        />

        {/* Störer-Badge oben rechts — Barmer-Signature */}
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <div className="relative grid aspect-square w-28 place-items-center rounded-full bg-[#C5E86C] text-[#0F0F0F] shadow-lg md:w-36">
            <div className="text-center leading-tight">
              <p className="font-serif text-[0.72rem] font-medium italic md:text-[0.85rem]">
                Erstberatung
              </p>
              <p className="mt-0.5 font-serif text-[1.85rem] font-bold md:text-[2.4rem]">
                kostenlos
              </p>
              <p className="mt-0.5 font-serif text-[0.7rem] italic md:text-[0.8rem]">
                & unverbindlich
              </p>
            </div>
          </div>
        </div>

        {/* Headline links unten */}
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 md:inset-x-10 md:bottom-10">
          <div className="max-w-[38rem] rounded-[24px] bg-white/95 p-6 backdrop-blur md:p-8">
            <h1 className="font-serif text-[clamp(1.9rem,4.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.01em] text-[#0F0F0F]">
              Ihr Garten. Für Sie gepflegt.
            </h1>
            <p className="mt-3 text-[1rem] leading-relaxed text-[#4A4A4A] md:text-[1.05rem]">
              Gärtnermeister-Betrieb aus Düsseldorf — persönlich, verlässlich
              und über die ganze Saison.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={withBase("/#kontakt")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#7E3AE0] px-6 text-[0.98rem] font-semibold text-white transition-colors hover:bg-[#6B2FC7]"
              >
                Beratung anfragen
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
              <a
                href={withBase("/#leistungen")}
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#0F0F0F] px-6 text-[0.98rem] font-semibold text-[#0F0F0F] transition-colors hover:bg-[#0F0F0F] hover:text-white"
              >
                Leistungen ansehen
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroV10;
