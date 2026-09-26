import { withBase } from "@/lib/utils";

// Foto-Sektion mit dem Detail-/Task-Focus-Bild aus der Bildreihe.
// Wirkt wie ein Editorial-Break zwischen ProofSection und Services.
const MeisterFotoSection = () => (
  <section className="py-8 md:py-12">
    <div className="container px-4">
      <div className="relative overflow-hidden rounded-3xl shadow-xl">
        <img
          src={withBase("/team/heckenschnitt-stihl-motorsaege-nahaufnahme-duesseldorf.jpg")}
          alt="Nahaufnahme der Heckenschere beim Formschnitt eines Buchsbaums, Gärtnermeister Dölle"
          className="block h-[42vh] w-full min-h-[280px] object-cover md:h-[52vh]"
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
            Handwerk
          </p>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold leading-tight text-white md:text-4xl">
            Präzise Schnitte — sauber, ruhig, saisongerecht.
          </h2>
        </div>
      </div>
    </div>
  </section>
);

export default MeisterFotoSection;
