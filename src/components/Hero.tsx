import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, MessageCircle, Sprout } from "lucide-react";
import { gartenjahr, siteConfig, trustItems } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const isV2 = import.meta.env.VITE_THEME === "v2";
const isV3 = import.meta.env.VITE_THEME === "v3";
const isV4 = import.meta.env.VITE_THEME === "v4";

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

// Design-Variante 3: Der Hero ist eine Arbeitsprobe — ein Vorher/Nachher-Regler.
const CompareSlider = () => {
  const [pos, setPos] = useState(16);

  useEffect(() => {
    // Eine orchestrierte Bewegung beim Laden: der Regler fährt auf die Mitte.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPos(50);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPos(16 + eased * 34);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative select-none overflow-hidden rounded-[var(--radius)] border border-border shadow-lg shadow-black/10">
      <img
        src={withBase("/references/nachher-hecke.jpg")}
        alt="Akkurat geschnittene Hecke nach dem Termin"
        className="block aspect-[3/2] w-full object-cover"
        draggable={false}
      />
      <img
        src={withBase("/references/vorher-hecke.jpg")}
        alt="Ausgewachsene Hecke vor dem Termin"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      {/* Griff in Messing — die eine Akzentstelle der Seite */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--v3-brass))] text-white shadow-md">
            <ArrowRight className="h-4 w-4 rotate-180" />
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-[hsl(var(--v3-loden)/0.75)] px-3 py-1 text-sm font-medium text-white">
        Vorher
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[hsl(var(--v3-loden)/0.75)] px-3 py-1 text-sm font-medium text-white">
        Nachher
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Vorher-Nachher-Vergleich verschieben"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
};

const HeroV3 = () => {
  return (
    <section id="start" className="pb-8 pt-28 md:pt-32">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Der Unterschied ist Handwerk.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Gartenpflege vom Gärtnermeister in Düsseldorf: Hecken, Bäume, Rasen
            und alles, was das Gartenjahr verlangt. Ziehen Sie den Regler — so
            sieht ein Termin bei uns aus.
          </p>
        </div>

        <div className="mt-8">
          <CompareSlider />
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Beispiel Heckenschnitt: Form- und Rückschnitt, Abtransport inklusive.</p>
            <p>{siteConfig.responsePromise}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild className="px-8 py-6 text-base">
            <a href={withBase("/#kontakt")}>
              Kostenlose Beratung anfragen
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="px-8 py-6 text-base">
            <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp starten
              <MessageCircle className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Design-Variante 4: cinematischer Auftritt — Vollbild-Statement,
// dann eine dunkle Filmsequenz mit dem Handwerk in Großaufnahme.
const HeroV4 = () => {
  return (
    <>
      <section id="start" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80"
          alt="Gepflegter Gartenweg zwischen hohen, geschnittenen Hecken"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="container relative z-10 px-4 pt-16 text-center">
          <h1 className="v4-rise mx-auto max-w-5xl text-[clamp(2.9rem,8vw,6.5rem)] leading-[0.98] text-white">
            Ihr Garten.
            <br />
            In Meisterhand.
          </h1>
          <p className="v4-rise-2 mx-auto mt-7 max-w-2xl text-lg text-white/85 md:text-xl">
            Gartenpflege von Gärtnermeister Benedikt Dölle — für Düsseldorf und
            Umgebung, durch alle Jahreszeiten.
          </p>
          <div className="v4-rise-3 mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-white px-8 py-6 text-base font-semibold text-foreground hover:bg-white/90"
            >
              <a href={withBase("/#kontakt")}>Kostenlose Beratung anfragen</a>
            </Button>
            <a
              href={withBase("/#leistungen")}
              className="inline-flex items-center gap-1 text-base font-medium text-white/90 underline-offset-4 hover:underline"
            >
              Leistungen ansehen
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#0d120d] py-24 text-white md:py-32">
        <div className="container px-4">
          <h2 className="mx-auto max-w-4xl text-center text-[clamp(2rem,5vw,3.8rem)] leading-[1.04] text-white">
            Der richtige Schnitt.
            <br />
            Zur richtigen Zeit.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/70">
            Hecken, Bäume, Rasen und Beete folgen dem Gartenjahr — wir kennen
            seinen Takt. Deshalb bleibt Ihr Garten gesund, dicht und in Form.
          </p>
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
            <img
              src={withBase("/references/nachher-hecke.jpg")}
              alt="Akkurat in Form geschnittene Hecke"
              className="aspect-[4/3] w-full rounded-[1.4rem] object-cover"
              loading="lazy"
            />
            <img
              src={withBase("/references/nachher-obstbaum.jpg")}
              alt="Fachgerecht geschnittener Obstbaum mit lichter Krone"
              className="aspect-[4/3] w-full rounded-[1.4rem] object-cover"
              loading="lazy"
            />
          </div>
          <p className="mt-6 text-center text-sm text-white/50">
            Beispiele: Formschnitt einer Ligusterhecke, Verjüngungsschnitt eines Apfelbaums
          </p>
        </div>
      </section>
    </>
  );
};

const Hero = () => {
  if (isV2) return <HeroV2 />;
  if (isV3) return <HeroV3 />;
  if (isV4) return <HeroV4 />;
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
