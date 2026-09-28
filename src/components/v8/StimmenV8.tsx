import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/siteContent";

// Kundenstimmen-Section (V8): rendert Kundenzitate aus dem Content-Kanon
// `testimonials` in siteContent.ts. Section wird nur gerendert wenn
// mindestens ein Testimonial vorhanden ist.

const StimmenV8 = () => {
  const scrollerRef = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("li");
    const gap = first ? parseFloat(getComputedStyle(el).columnGap || "0") : 0;
    const step = first ? first.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (testimonials.length === 0) return null;

  return (
    <section
      aria-labelledby="stimmen-headline"
      className="cv-auto bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="mx-auto max-w-[42rem] text-center">
          <h2
            id="stimmen-headline"
            className="text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-foreground"
          >
            Das sagen unsere Kundinnen und Kunden.
          </h2>
        </div>


        <ul
          ref={scrollerRef}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 md:mt-16 md:gap-6 md:scroll-px-6 md:pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Kundenstimmen (horizontal scrollen)"
        >
          {testimonials.map((t, i) => (
            <li
              key={t.name + i}
              className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-[1.75rem] bg-card p-7 shadow-[0_2px_18px_rgba(0,0,0,0.05)] md:w-[calc((100%-4.5rem)/3.35)] md:p-8"
            >
              <Quote
                className="h-6 w-6 text-primary/40"
                strokeWidth={2}
                aria-hidden
              />
              <blockquote className="mt-4 flex-1 text-[1rem] leading-relaxed text-foreground md:text-[1.02rem]">
                „{t.quote}"
              </blockquote>
              <div className="mt-6 border-t border-border/60 pt-4">
                <p className="text-[0.95rem] font-semibold text-foreground">
                  {t.displayName}
                </p>
                <p className="mt-0.5 text-[0.85rem] text-muted-foreground">
                  {t.location}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Slider-Pfeile (nur Desktop) */}
        <div className="mt-6 hidden justify-end gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Vorherige Stimme"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-md"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Nächste Stimme"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary hover:shadow-md"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StimmenV8;
