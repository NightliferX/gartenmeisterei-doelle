// Barmer-Werte-Kacheln: 3 große Foto-Boxen mit runden Ecken und
// Headline + Kurztext + Pfeil-Link — sieht aus wie eine Themenwelt.
import { ArrowRight } from "lucide-react";
import { withBase } from "@/lib/utils";

const cards = [
  {
    title: "Feste Pflegetermine",
    text: "Wir kommen nach Plan — wöchentlich, monatlich oder saisonal.",
    href: "/#leistungen",
    bg: "#F3E9FF",
  },
  {
    title: "Meisterbetrieb",
    text: "Beratung, Angebot und Ausführung direkt vom Gärtnermeister.",
    href: "/#meister",
    bg: "#E5F1FA",
  },
  {
    title: "Alles inklusive",
    text: "Schnittgut und Laub nehmen wir nach jedem Termin mit.",
    href: "/#leistungen",
    bg: "#FFF3E5",
  },
];

const ValuesV10 = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {cards.map((c) => (
          <a
            key={c.title}
            href={withBase(c.href)}
            className="group flex flex-col justify-between rounded-[28px] p-7 transition-transform hover:-translate-y-1 md:p-8"
            style={{ backgroundColor: c.bg }}
          >
            <div>
              <h3 className="font-serif text-[1.5rem] font-bold leading-tight text-[#0F0F0F] md:text-[1.7rem]">
                {c.title}
              </h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-[#4A4A4A]">
                {c.text}
              </p>
            </div>
            <span className="mt-8 grid h-11 w-11 place-items-center rounded-full bg-[#0F0F0F] text-white transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ValuesV10;
