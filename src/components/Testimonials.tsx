import { ArrowRight, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/lib/siteContent";
import { useCarouselAutoplay } from "@/hooks/useCarouselAutoplay";
import { withBase } from "@/lib/utils";

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const displayedTestimonials = testimonials;
  const hasMultipleTestimonials = displayedTestimonials.length >= 2;

  useCarouselAutoplay(api, hasMultipleTestimonials, 5200);

  if (!displayedTestimonials.length) {
    return null;
  }

  return (
    <section id="bewertungen" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="scroll-fade-in text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Kundenstimmen
          </p>
          <h2 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight md:text-4xl">
            Stimmen aus Grevenbroich und Umgebung
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            Mehrere Stimmen aus der Region zeigen am besten, wie unsere Arbeit
            bei Kunden in Grevenbroich und Umgebung ankommt.
          </p>
        </div>

        <div className="scroll-fade-in mt-14">
          <Carousel
            opts={{ align: "start", loop: hasMultipleTestimonials }}
            setApi={setApi}
            className="w-full px-4 sm:px-8 md:px-14"
          >
            <CarouselContent className="-ml-4">
              {displayedTestimonials.map((review) => (
                <CarouselItem
                  key={`${review.displayName}-${review.location}`}
                  className="pl-4 md:basis-1/2 xl:basis-1/3"
                >
                  <article className="h-full rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="mt-5 text-base leading-relaxed text-foreground/90">
                      "{review.quote}"
                    </blockquote>
                    <div className="mt-6 border-t border-border/70 pt-4">
                      <p className="font-semibold">{review.displayName}</p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{review.location}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {review.project}
                        {review.projectType ? ` · ${review.projectType}` : ""}
                        {review.year ? ` · ${review.year}` : ""}
                      </p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            {hasMultipleTestimonials ? (
              <>
                <CarouselPrevious className="-left-2 top-[42%] h-11 w-11 border-border bg-background/95 sm:left-0" />
                <CarouselNext className="-right-2 top-[42%] h-11 w-11 border-border bg-background/95 sm:right-0" />
              </>
            ) : null}
          </Carousel>
        </div>

        <div className="scroll-fade-in mt-12 text-center">
          <Button asChild size="lg">
            <a href={withBase("/#kontakt")}>
              Eigenes Projekt anfragen
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
