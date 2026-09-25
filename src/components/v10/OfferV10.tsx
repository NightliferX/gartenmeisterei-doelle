import { ArrowRight, CheckCircle2 } from "lucide-react";
import { withBase } from "@/lib/utils";

// Barmer-artiges Angebot-Highlight: großes Band mit grünem BG links,
// weißem Info-Panel rechts. Sehr klare Value-Prop.
const OfferV10 = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="overflow-hidden rounded-md border border-black/[0.08] shadow-sm">
        <div className="grid md:grid-cols-[1fr_1.2fr]">
          {/* Grüner Highlight-Block */}
          <div className="flex flex-col justify-center bg-[#009B39] p-8 text-white md:p-12">
            <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-white/80">
              Unser Angebot
            </p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.01em]">
              Der Pflegevertrag —<br />
              damit Sie nichts mehr vergessen.
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-white/90">
              Wir übernehmen die komplette Betreuung Ihres Gartens nach festem
              Plan — Sie müssen sich um nichts kümmern.
            </p>
          </div>

          {/* Info-Panel rechts */}
          <div className="bg-white p-8 md:p-12">
            <ul className="space-y-4">
              {[
                {
                  title: "Alle Leistungen abgedeckt",
                  text: "Rasen, Hecken, Beete, Bäume und Saisonarbeiten.",
                },
                {
                  title: "Feste Termine im Jahr",
                  text: "Wir kommen wann vereinbart — ohne dass Sie erinnern müssen.",
                },
                {
                  title: "Fairer Fixpreis",
                  text: "Klare Kosten für die ganze Saison, keine Überraschungen.",
                },
                {
                  title: "Ein Ansprechpartner",
                  text: "Immer direkt beim Gärtnermeister — kein Callcenter.",
                },
              ].map((row) => (
                <li key={row.title} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#009B39]"
                    strokeWidth={2}
                  />
                  <div>
                    <p className="text-[1rem] font-semibold text-[#1B1B1B]">
                      {row.title}
                    </p>
                    <p className="mt-0.5 text-[0.92rem] text-[#4D4D4D]">
                      {row.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={withBase("/#kontakt")}
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#009B39] px-6 text-[0.98rem] font-semibold text-white transition-colors hover:bg-[#00822F]"
            >
              Pflegevertrag anfragen
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default OfferV10;
