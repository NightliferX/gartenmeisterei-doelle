import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig, testimonials } from "@/lib/siteContent";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCarouselAutoplay } from "@/hooks/useCarouselAutoplay";
import { withBase } from "@/lib/utils";

const proofItems = [
  {
    icon: UserRound,
    value: "1",
    label: "persönlicher Ansprechpartner",
    text: "Direkte Abstimmung mit dem Gärtnermeister statt Weitergabe an wechselnde Kontakte.",
  },
  {
    icon: Clock3,
    value: "24h",
    label: "Rückmeldung im Regelfall",
    text: "Anfragen werden schnell eingeordnet, damit Sie zeitnah planen können.",
  },
  {
    icon: MapPin,
    value: "Lokal",
    label: "für Düsseldorf und Umgebung",
    text: "Kurze Wege für Vor-Ort-Termine, Besichtigungen und feste Pflegetermine.",
  },
  {
    icon: ShieldCheck,
    value: "Meister",
    label: "Gärtnermeister-Betrieb",
    text: "Schnitt, Pflege und Beratung nach Meisterstandard — zur richtigen Zeit im Gartenjahr.",
  },
];

const featuredTestimonials = testimonials.slice(0, 5);

const ProofSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const hasMultipleTestimonials = featuredTestimonials.length > 1;

  useCarouselAutoplay(api, hasMultipleTestimonials, 5600);

  return (
    <section className="py-10 md:py-14">
      <div className="container px-4">
        <div className="scroll-fade-in text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Warum Kunden anfragen
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Klarer Ablauf, lokale Nähe und sichtbare Ergebnisse
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            Genau diese Punkte machen bei der Gartenpflege den Unterschied:
            schnelle Abstimmung, verbindliche Termine und ein Gärtnermeister,
            der Ihren Garten wirklich kennt.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.22fr_.78fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {proofItems.map((item, index) => (
              <div
                key={item.label}
                className="scroll-fade-in rounded-3xl border border-border/80 bg-card p-6 shadow-sm"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                      {item.label}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="scroll-fade-in rounded-[2rem] border border-border/80 bg-secondary/60 p-7 shadow-sm lg:max-w-[31rem] lg:justify-self-end">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {featuredTestimonials.length > 0
                  ? "Kundenstimme aus der Region"
                  : "Ihr Garten in Meisterhand"}
              </p>
              {hasMultipleTestimonials ? (
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-border bg-background/95"
                    onClick={() => api?.scrollPrev()}
                    aria-label="Vorherige Kundenstimme"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-border bg-background/95"
                    onClick={() => api?.scrollNext()}
                    aria-label="Nächste Kundenstimme"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}
            </div>
            {featuredTestimonials.length === 0 ? (
              <div className="mt-5">
                <p className="text-xl font-semibold leading-relaxed text-foreground">
                  Als Gärtnermeister übernehme ich Ihren Garten persönlich —
                  vom ersten Rückschnitt bis zur dauerhaften Pflege über das
                  ganze Gartenjahr.
                </p>
                <div className="mt-6">
                  <p className="font-semibold">{siteConfig.ownerName}</p>
                  <p className="text-sm text-muted-foreground">
                    Gärtnermeister · Düsseldorf
                  </p>
                </div>
              </div>
            ) : null}
            <Carousel
              opts={{ align: "start", loop: hasMultipleTestimonials }}
              setApi={setApi}
              className="mt-5"
            >
              <CarouselContent className="-ml-4">
                {featuredTestimonials.map((item) => (
                  <CarouselItem key={`${item.displayName}-${item.location}`} className="pl-4">
                    <div className="min-h-[240px]">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: item.rating }).map((_, index) => (
                          <Star key={index} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <blockquote className="mt-5 text-xl font-semibold leading-relaxed text-foreground">
                        "{item.quote}"
                      </blockquote>
                      <div className="mt-6">
                        <p className="font-semibold">{item.displayName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.project} · {item.location}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="mt-8 rounded-2xl border border-border/80 bg-card px-5 py-4">
              <p className="text-sm text-muted-foreground">
                {siteConfig.consultationPromise} und {siteConfig.responsePromise.toLowerCase()}.
              </p>
            </div>
            <Button asChild className="mt-7 w-full sm:w-auto">
              <a href={withBase("/#kontakt")}>
                Beratung unverbindlich anfragen
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
