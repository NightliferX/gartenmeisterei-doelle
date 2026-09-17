import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const facts = [
  {
    term: "Meisterbetrieb",
    detail: "Beratung und Ausführung direkt vom Gärtnermeister",
  },
  { term: "Schnelle Antwort", detail: siteConfig.responsePromise },
  { term: "Erstberatung", detail: siteConfig.consultationPromise },
  { term: "Einsatzgebiet", detail: siteConfig.serviceAreaLabel },
];

const MeisterSection = () => (
  <section id="ueber-uns" className="py-24 lg:py-36">
    <div className="mx-auto grid max-w-[1400px] gap-10 px-4 lg:grid-cols-[0.9fr_1.2fr] lg:items-end lg:gap-20 lg:px-10">
      <img
        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&q=80"
        alt={`Gärtnermeister ${siteConfig.ownerName} bei der Arbeit`}
        loading="lazy"
        className="aspect-[4/5] w-full rounded-[1.8rem] object-cover"
      />

      <div>
        <h2 className="text-[clamp(2.5rem,10vw,4.75rem)] leading-[0.95]">
          Ein Gärtnermeister.
          <br />
          Kein Callcenter.
        </h2>
        <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
          Ich betreue Gärten in Düsseldorf und Umgebung persönlich — vom ersten
          Rückschnitt bis zur Pflege über das ganze Jahr. Sie haben einen
          Ansprechpartner, der Ihren Garten kennt.
        </p>

        <dl className="mt-10 divide-y divide-border border-y border-border">
          {facts.map((fact) => (
            <div
              key={fact.term}
              className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
            >
              <dt className="text-sm font-semibold text-foreground">
                {fact.term}
              </dt>
              <dd className="text-[15px] text-muted-foreground">
                {fact.detail}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={withBase("/#kontakt")}
          className="v5-press mt-8 inline-flex h-12 items-center rounded-full bg-foreground px-6 text-[15px] font-semibold text-background"
        >
          Garten ansehen lassen
        </a>
      </div>
    </div>
  </section>
);

export default MeisterSection;
