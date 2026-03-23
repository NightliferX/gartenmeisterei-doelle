import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const reviews = [
  {
    name: "Oliver Hartman",
    text: "Hervorragende Arbeit! Die Sanierung unseres Hauses wurde professionell und termingerecht durchgeführt. Absolut empfehlenswert.",
    rating: 5,
    project: "Haussanierung",
  },
  {
    name: "Familie Schneider",
    text: "Unser Garten ist ein Traum geworden. Kreative Planung, saubere Umsetzung und ein tolles Ergebnis. Vielen Dank!",
    rating: 5,
    project: "Gartengestaltung",
  },
  {
    name: "Thomas M.",
    text: "Vom ersten Beratungsgespräch bis zur Abnahme – alles top. Faire Preise und zuverlässige Arbeit. Gerne wieder!",
    rating: 5,
    project: "Innenausbau",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));

  const review = reviews[current];

  return (
    <section id="bewertungen" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto scroll-fade-in">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Kundenstimmen
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Was unsere Kunden sagen
          </h2>
        </div>

        <div className="mt-14 max-w-3xl mx-auto scroll-fade-in">
          <div className="bg-card rounded-2xl border p-8 md:p-12 text-center shadow-sm">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>

            <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90 italic">
              "{review.text}"
            </blockquote>

            <div className="mt-6">
              <p className="font-semibold">{review.name}</p>
              <p className="text-sm text-muted-foreground">{review.project}</p>
            </div>

            {/* Nav */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-muted-foreground">
                {current + 1} / {reviews.length}
              </span>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
