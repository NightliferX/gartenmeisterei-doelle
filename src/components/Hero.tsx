import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, MessageCircle, Sprout } from "lucide-react";
import { gartenjahr, siteConfig, trustItems } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const isV2 = import.meta.env.VITE_THEME === "v2";

// Design-Variante 2: Split-Hero + Gartenjahr-Leiste mit Saison-Hervorhebung
const HeroV2 = () => {
  const month = new Date().getMonth();
  const currentSeason = gartenjahr.find((s) => s.months.includes(month))?.season;

  return (
    <section id="start" className="overflow-hidden pb-10">
      {/* Vollflächiger Hero-Header in V2-Sprache: Foto + Tannengrün-Verlauf, Text linksbündig */}
      <div className="relative flex min-h-[88vh] items-center">
        <img
          src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80"
          alt="Gepflegter Gartenweg mit akkurat geschnittenen Hecken"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[hsl(var(--v2-pine)/0.45)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--v2-pine)/0.85)] via-[hsl(var(--v2-pine)/0.4)] to-transparent" />

        <div className="container relative z-10 px-4 pb-36 pt-28">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-base font-medium text-[hsl(var(--v2-pollen))]">
              <Sprout className="h-5 w-5" />
              Meisterbetrieb von Benedikt Dölle, Gärtnermeister
            </p>
            <h1 className="mt-4 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Gepflegte Gärten sind kein Zufall.
              <br />
              Sie haben einen Gärtner.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Die {siteConfig.brandName} hält Gärten in Düsseldorf und Umgebung
              das ganze Jahr in Form — vom Hecken- und Baumschnitt über Rasen-
              und Beetpflege bis zu Laub- und Winterservice.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="px-8 py-6 text-base shadow-lg shadow-black/15">
                <a href={withBase("/#kontakt")}>
                  Kostenlose Beratung anfragen
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/40 bg-white/10 px-8 py-6 text-base text-white hover:bg-white/20 hover:text-white"
              >
                <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer">
                  WhatsApp starten
                  <MessageCircle className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <p className="mt-5 text-sm text-white/70">
              {siteConfig.responsePromise} · {siteConfig.consultationPromise}
            </p>
          </div>
        </div>
      </div>

      <div className="container relative z-20 -mt-24 px-4">
        {/* Gartenjahr-Leiste: was wann ansteht — die aktuelle Saison ist markiert */}
        <div className="overflow-hidden rounded-[var(--radius)] bg-[hsl(var(--v2-pine))] text-white shadow-xl shadow-[hsl(var(--v2-pine)/0.3)]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {gartenjahr.map((entry) => {
              const active = entry.season === currentSeason;
              return (
                <div
                  key={entry.season}
                  className={`border-white/10 p-6 max-lg:border-b lg:border-r lg:last:border-r-0 ${
                    active ? "bg-white/10" : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl text-white">{entry.season}</h3>
                    {active ? (
                      <span className="rounded-full bg-[hsl(var(--v2-pollen))] px-3 py-1 text-xs font-semibold text-[hsl(var(--v2-pine))]">
                        Jetzt gefragt
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {entry.work}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Hero = () => {
  if (isV2) return <HeroV2 />;
  return (
    <section
      id="start"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pb-16 md:pb-20"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-foreground/70" />

      {/* Content */}
      <div className="relative z-10 container px-4 pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Ihr Gärtnermeister für
            <br />
            <span className="text-primary brightness-150 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
              gepflegte Gärten
            </span>
            <br />
            in Düsseldorf und Umgebung.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-primary-foreground/80 md:text-xl">
            Die {siteConfig.brandName} hält Ihren Garten das ganze Jahr in Form:
            Hecken- und Baumschnitt, Rasen- und Beetpflege, Laubentsorgung und
            Winterservice — zuverlässig und mit Meisterhand.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="px-8 py-6 text-base shadow-lg shadow-black/10">
              <a href={withBase("/#kontakt")}>
                Jetzt Beratung anfragen
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/30 bg-primary-foreground/10 px-8 py-6 text-base text-primary-foreground hover:bg-primary-foreground/20"
            >
              <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp starten
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {trustItems.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-2 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground/85 shadow-sm backdrop-blur-sm"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary brightness-150" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
