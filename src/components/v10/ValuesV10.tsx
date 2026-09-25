import { Award, Clock, Leaf, Truck } from "lucide-react";

const items = [
  {
    icon: Award,
    title: "Meisterbetrieb",
    text: "Gärtnermeister mit Fachrichtung Garten- und Landschaftsbau — Beratung direkt vom Chef.",
  },
  {
    icon: Clock,
    title: "Feste Termine",
    text: "Wir kommen nach Plan — wöchentlich, monatlich oder saisonal, ganz nach Bedarf.",
  },
  {
    icon: Truck,
    title: "Alles inklusive",
    text: "Schnittgut, Laub und Grünabfall nehmen wir nach jedem Termin direkt mit.",
  },
  {
    icon: Leaf,
    title: "Saisongerecht",
    text: "Der richtige Schnitt zur richtigen Zeit — Vogelschutz, Frost und Pflanzenwohl inklusive.",
  },
];

// Barmer-Werte-Leiste: 4 Icon-Cards nebeneinander, sehr aufgeräumt.
const ValuesV10 = () => (
  <section className="border-y border-black/[0.06] bg-[#F8F8F5] py-14 md:py-16">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-[#009B39] text-white">
              <Icon className="h-6 w-6" strokeWidth={2} />
            </span>
            <h3 className="mt-4 text-[1.05rem] font-bold text-[#1B1B1B]">
              {title}
            </h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-[#4D4D4D]">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ValuesV10;
