import { ArrowRight, Star } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Airbnb-Style-Hero: großes Foto, darüber eine weiße "Karte" mit
// Willkommenstext und CTAs — wie die Airbnb-Suchbox, aber statisch.
const HeroV9 = () => (
  <section id="start" className="relative isolate overflow-hidden bg-white px-4 pt-6 sm:px-6">
    <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[24px]">
      <img
        src={withBase("/team/gaertnermeister-buchsbaum-formschnitt-duesseldorf.jpg")}
        alt="Gärtnermeister beim Formschnitt in einem Düsseldorfer Vorgarten"
        className="block h-[64vh] min-h-[520px] w-full object-cover md:h-[72vh]"
        loading="eager"
        decoding="async"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Airbnb-artige Mikrocopy oben links */}
      <div className="absolute left-6 top-6 hidden items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[0.78rem] font-semibold text-[#222] backdrop-blur md:inline-flex">
        <Star className="h-3.5 w-3.5 fill-[#FF5A5F] text-[#FF5A5F]" strokeWidth={2} />
        Meisterbetrieb · Düsseldorf & Umgebung
      </div>

      {/* Text-Karte mit rundem Airbnb-Look */}
      <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 md:inset-x-10 md:bottom-10">
        <div className="max-w-[42rem] rounded-[20px] bg-white p-6 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.35)] md:p-8">
          <h1 className="text-[clamp(1.8rem,4.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-[#222]">
            Ihr Garten. In Meisterhand.
          </h1>
          <p className="mt-3 text-[1rem] leading-relaxed text-[#484848] md:text-[1.05rem]">
            Gartenpflege vom Gärtnermeister {siteConfig.ownerName} — für
            Düsseldorf, das Umland und über die ganze Saison.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={withBase("/#kontakt")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF5A5F] px-6 text-[0.95rem] font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Kostenlose Beratung anfragen
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <a
              href={withBase("/#leistungen")}
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/15 bg-white px-6 text-[0.95rem] font-semibold text-[#222] transition-colors hover:bg-black/[0.03]"
            >
              Leistungen ansehen
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroV9;
