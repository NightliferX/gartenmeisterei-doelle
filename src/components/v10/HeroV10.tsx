import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Barmer-Hero: großes Foto rechts, links Text-Block mit klarer H1,
// Vertrauensliste und primär+sekundär CTA. Sehr Corporate.
const HeroV10 = () => (
  <section id="start" className="bg-white">
    <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-14 md:py-16 lg:py-20">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-[#E8F4E5] px-3 py-1 text-[0.78rem] font-semibold text-[#009B39]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#009B39]" aria-hidden />
          Meisterbetrieb
        </p>
        <h1 className="mt-5 text-[clamp(2.2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[#1B1B1B]">
          Damit Ihr Garten <br className="hidden sm:block" />
          das ganze Jahr <br className="hidden sm:block" />
          <span className="text-[#009B39]">gepflegt aussieht.</span>
        </h1>
        <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-[#4D4D4D] md:text-[1.15rem]">
          Gartenpflege vom Gärtnermeister {siteConfig.ownerName} — verlässlich
          und mit einem festen Ansprechpartner für Düsseldorf und das nahe
          Umland.
        </p>

        <ul className="mt-6 space-y-3 text-[0.98rem] text-[#1B1B1B]">
          {[
            "Kostenlose Erstberatung vor Ort",
            "Feste Pflegetermine — auf Wunsch als Vertrag",
            "Schnittgut und Laub nehmen wir immer mit",
          ].map((line) => (
            <li key={line} className="flex items-start gap-2.5">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-[#009B39]"
                strokeWidth={2}
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={withBase("/#kontakt")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#009B39] px-6 text-[0.98rem] font-semibold text-white shadow-sm transition-colors hover:bg-[#00822F]"
          >
            Beratung anfragen
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a
            href={withBase("/#leistungen")}
            className="inline-flex h-12 items-center justify-center rounded-md border-2 border-[#009B39] px-6 text-[0.98rem] font-semibold text-[#009B39] transition-colors hover:bg-[#E8F4E5]"
          >
            Leistungen ansehen
          </a>
        </div>
      </div>

      <div className="relative">
        <img
          src={withBase("/team/gaertnermeister-buchsbaum-formschnitt-duesseldorf.jpg")}
          alt="Gärtnermeister beim Formschnitt in einem Düsseldorfer Vorgarten"
          className="block aspect-[4/5] w-full rounded-md object-cover shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] md:aspect-[4/5]"
          loading="eager"
          decoding="async"
        />
        {/* Barmer-typisches Badge/Störer */}
        <div className="absolute -bottom-4 -left-4 hidden rounded-md bg-white p-4 shadow-lg sm:block md:-bottom-6 md:-left-6 md:p-5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#4D4D4D]">
            Erstberatung
          </p>
          <p className="mt-1 text-[1.5rem] font-bold leading-none text-[#009B39]">
            kostenlos
          </p>
          <p className="mt-1 text-[0.78rem] text-[#4D4D4D]">
            und unverbindlich
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroV10;
