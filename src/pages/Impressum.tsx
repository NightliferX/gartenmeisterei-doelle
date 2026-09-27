import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/lib/siteContent";
import SkipToContent from "@/components/SkipToContent";

// Impressum im V8-Look: Hero-Section wie eine Ratgeber-Detail-Seite,
// sticky Inhaltsverzeichnis auf Desktop, saubere Section-Typo. Content
// bleibt inhaltlich identisch, nur Struktur und Look ziehen an die
// uebrigen V8-Seiten heran.
const sections = [
  { id: "angaben", heading: "Angaben gemäß § 5 TMG" },
  { id: "kontakt", heading: "Kontakt" },
  { id: "berufsrecht", heading: "Berufsbezeichnung und berufsrechtliche Regelungen" },
  { id: "ust", heading: "Umsatzsteuer-Identifikationsnummer" },
  { id: "verantwortlich", heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV" },
  { id: "streit", heading: "Streitschlichtung" },
  { id: "haftung-inhalte", heading: "Haftung für Inhalte" },
  { id: "haftung-links", heading: "Haftung für Links" },
  { id: "urheber", heading: "Urheberrecht" },
  { id: "hinweis", heading: "Hinweis" },
];

const Impressum = () => {
  return (
    <>
      <Seo
        title={`Impressum | ${siteConfig.brandName}`}
        description={`Impressum und Anbieterkennzeichnung von ${siteConfig.brandName} in ${siteConfig.city}.`}
        path="/impressum"
      />
      <div className="min-h-screen bg-background">
        <SkipToContent />
        <HeaderV8 />
        <main id="main">
          {/* Hero */}
          <section className="bg-secondary/40 pb-14 pt-32 md:pt-40">
            <div className="mx-auto max-w-[880px] px-4 sm:px-6">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
                Rechtliches
              </p>
              <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
                Impressum
              </h1>
              <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted-foreground">
                Anbieterkennzeichnung nach § 5 TMG und § 18 Abs. 2 MStV für {siteConfig.brandName}, Meisterbetrieb aus {siteConfig.city}.
              </p>
            </div>
          </section>

          {/* Content */}
          <section className="bg-background pb-20 md:pb-24">
            <div className="mx-auto grid max-w-[1180px] gap-10 px-4 pt-14 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 lg:pt-16">
              <aside className="hidden lg:block">
                <nav aria-label="Inhaltsverzeichnis" className="sticky top-28">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Inhalt
                  </p>
                  <ol className="mt-4 space-y-2 text-[0.9rem] leading-snug">
                    {sections.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="flex gap-2 text-muted-foreground transition-colors hover:text-primary"
                        >
                          <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                          <span>{s.heading}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <article className="max-w-[720px] space-y-14">
                <section id="angaben" className="scroll-mt-28">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    Angaben gemäß § 5 TMG
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
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

                <section id="kontakt" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    Kontakt
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
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

                <section id="berufsrecht" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    Berufsbezeichnung und berufsrechtliche Regelungen
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Berufsbezeichnung: Gärtnermeister
                    <br />
                    Verliehen in: Deutschland
                    <br />
                    Zuständige Kammer: Handwerkskammer Düsseldorf, Georg-Schulhoff-Platz 1, 40221 Düsseldorf
                    <br />
                    Es gelten die Handwerksordnung (HwO) sowie die berufsrechtlichen Regelungen der zuständigen Kammer. Diese können bei der Handwerkskammer Düsseldorf abgerufen werden.
                  </p>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Eintragung in die Handwerksrolle: [TODO: Nummer der Eintragung ergänzen]
                  </p>
                </section>

                <section id="ust" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    Umsatzsteuer-Identifikationsnummer
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    USt-IdNr. gemäß § 27 a Umsatzsteuergesetz: [TODO: USt-IdNr. ergänzen, sofern vorhanden. Kleinunternehmer nach § 19 UStG geben stattdessen bitte einen entsprechenden Hinweis an.]
                  </p>
                </section>

                <section id="verantwortlich" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    {siteConfig.legalRepresentative}
                    <br />
                    {siteConfig.streetAddress}
                    <br />
                    {siteConfig.postalCode} {siteConfig.city}
                  </p>
                </section>

                <section id="streit" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    Streitschlichtung
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                    <a
                      className="text-primary hover:underline"
                      href="https://ec.europa.eu/consumers/odr/"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      ec.europa.eu/consumers/odr
                    </a>
                    . Unsere E-Mail-Adresse finden Sie oben im Impressum.
                  </p>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </section>

                <section id="haftung-inhalte" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    Haftung für Inhalte
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                  </p>
                </section>

                <section id="haftung-links" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    Haftung für Links
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </section>

                <section id="urheber" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    Urheberrecht
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </section>

                <section id="hinweis" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    Hinweis
                  </h2>
                  <p className="mt-4 rounded-2xl border border-border/60 bg-secondary/60 p-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                    Adresse, Telefonnummer und E-Mail sind Betriebsdaten von {siteConfig.legalRepresentative}. Die mit [TODO] markierten Angaben (Handwerksrollennummer, USt-IdNr.) sind vor dem Livegang durch {siteConfig.legalRepresentative} einzutragen und rechtlich zu prüfen.
                  </p>
                </section>
              </article>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Impressum;
