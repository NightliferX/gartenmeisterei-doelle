import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/MobileStickyCta";
import Seo from "@/components/Seo";
import { siteConfig } from "@/lib/siteContent";

const Impressum = () => {
  return (
    <>
      <Seo
        title={`Impressum | ${siteConfig.brandName}`}
        description={`Impressum und Anbieterkennzeichnung von ${siteConfig.brandName} in ${siteConfig.city}.`}
        path="/impressum"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 pb-28 pt-28 md:pt-32">
          <div className="mx-auto max-w-3xl rounded-3xl border bg-card p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Rechtliches
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Impressum
            </h1>

            <div className="mt-8 space-y-8 text-sm leading-7 text-muted-foreground">
              <section>
                <h2 className="text-base font-semibold text-foreground">
                  Angaben gemäß § 5 TMG
                </h2>
                <p className="mt-3">
                  {siteConfig.brandName}
                  <br />
                  Inhaber: {siteConfig.legalRepresentative}
                  <br />
                  {siteConfig.streetAddress}
                  <br />
                  {siteConfig.postalCode} {siteConfig.city}
                  <br />
                  Deutschland
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  Kontakt
                </h2>
                <p className="mt-3">
                  Telefon:{" "}
                  <a className="text-primary hover:underline" href={siteConfig.phoneHref}>
                    {siteConfig.phoneDisplay}
                  </a>
                  <br />
                  E-Mail:{" "}
                  <a
                    className="text-primary hover:underline"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
                </h2>
                <p className="mt-3">
                  {siteConfig.legalRepresentative}
                  <br />
                  {siteConfig.streetAddress}
                  <br />
                  {siteConfig.postalCode} {siteConfig.city}
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  Hinweis
                </h2>
                <p className="mt-3">
                  Dieses Impressum wurde für die aktuelle Website-Struktur
                  angelegt. Vor dem finalen Livegang sollten Unternehmensdaten,
                  Rechtsform und gegebenenfalls steuerliche Angaben nochmals mit
                  den offiziellen Firmendaten abgeglichen werden.
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
        <MobileStickyCta />
      </div>
    </>
  );
};

export default Impressum;
