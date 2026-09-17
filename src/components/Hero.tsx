import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { siteConfig, trustItems } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const Hero = () => {
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
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-foreground/60" />

      {/* Content */}
      <div className="relative z-10 container px-4 pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Moderne Sanierung und
            <br />
            <span className="text-primary brightness-150">
              gepflegte Außenbereiche
            </span>
            <br />
            für Grevenbroich und Umgebung.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-primary-foreground/80 md:text-xl">
            {siteConfig.brandName} begleitet Projekte von der ersten Besichtigung
            bis zur sauberen Umsetzung: Haussanierung, Gartenbau, Innenausbau,
            Terrassen, Pflaster und mehr.
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
