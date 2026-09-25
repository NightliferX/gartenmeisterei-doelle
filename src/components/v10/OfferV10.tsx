import { ArrowRight } from "lucide-react";
import { withBase } from "@/lib/utils";

// Barmer-Angebot-Section: Lila Panel mit weißem Text, danach Aufzählung
// in weißen runden Chips.
const OfferV10 = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:gap-8">
        {/* Lila Panel */}
        <div className="rounded-[32px] bg-[#7E3AE0] p-8 text-white md:p-12">
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-white/75">
            Pflegevertrag
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.9rem,3.6vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.01em]">
            Ein Vertrag. Ein Ansprechpartner. Ein Garten in Bestform.
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-white/90">
            Wir übernehmen die komplette Betreuung Ihres Gartens nach festem
            Plan — Sie müssen sich um nichts kümmern.
          </p>
          <a
            href={withBase("/#kontakt")}
            className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[0.98rem] font-semibold text-[#7E3AE0] transition-transform hover:scale-[1.02]"
          >
            Pflegevertrag anfragen
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>

        {/* Vorteile-Grid */}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 md:content-start">
          {[
            { title: "Alle Leistungen abgedeckt", text: "Rasen, Hecken, Beete, Bäume." },
            { title: "Feste Termine", text: "Wir kommen wann vereinbart." },
            { title: "Fairer Fixpreis", text: "Klare Kosten, keine Überraschungen." },
            { title: "Ein Ansprechpartner", text: "Direkt beim Gärtnermeister." },
          ].map((row) => (
            <div key={row.title} className="rounded-[20px] border border-black/[0.08] bg-[#F8F5FF] p-5">
              <p className="font-serif text-[1.1rem] font-bold text-[#0F0F0F]">
                {row.title}
              </p>
              <p className="mt-1 text-[0.9rem] text-[#4A4A4A]">{row.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default OfferV10;
