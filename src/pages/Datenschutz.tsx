import { CalendarDays, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { siteConfig } from "@/lib/siteContent";
import SkipToContent from "@/components/SkipToContent";

// Datenschutzerklaerung im V8-Look, analog zu Impressum und
// RatgeberPage: Hero-Section, sticky Inhaltsverzeichnis auf Desktop,
// saubere Section-Typo mit weichen Trennern. Inhalte inhaltlich
// unveraendert, nur Struktur und Look ziehen an.
const sections = [
  { id: "verantwortlicher", heading: "Verantwortlicher" },
  { id: "allgemein", heading: "Allgemeine Hinweise zur Datenverarbeitung" },
  { id: "hosting", heading: "Hosting und Server-Logfiles" },
  { id: "formular", heading: "Kontaktformular und Kontaktaufnahme" },
  { id: "kommunikation", heading: "Telefon, E-Mail und WhatsApp" },
  { id: "fonts", heading: "Schriftarten" },
  { id: "karten", heading: "Karten und Standortdienste" },
  { id: "cookies", heading: "Cookies, Tracking und Analyse" },
  { id: "speicherdauer", heading: "Speicherdauer" },
  { id: "rechte", heading: "Ihre Rechte" },
  { id: "aktualisierung", heading: "Aktualisierungshinweis" },
];

const Datenschutz = () => {
  const usesDefaultFormSubmit = !import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
  const stand = new Date().toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
  });

  return (
    <>
      <Seo
        title={`Datenschutz | ${siteConfig.brandName}`}
        description={`Datenschutzhinweise für die Website von ${siteConfig.brandName}.`}
        path="/datenschutz"
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
                Datenschutzerklärung
              </h1>
              <p className="mt-5 max-w-[54ch] text-[1.05rem] leading-relaxed text-muted-foreground">
                Wie wir personenbezogene Daten auf dieser Website behandeln, welche Rechtsgrundlagen dafür gelten und welche Rechte Sie haben.
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] text-muted-foreground">
                <CalendarDays className="h-4 w-4" strokeWidth={2} aria-hidden />
                Stand: {stand}
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
                <section id="verantwortlicher" className="scroll-mt-28">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    1. Verantwortlicher
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                    <br />
                    {siteConfig.brandName}
                    <br />
                    {siteConfig.legalRepresentative}
                    <br />
                    {siteConfig.streetAddress}
                    <br />
                    {siteConfig.postalCode} {siteConfig.city}
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

                <section id="allgemein" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    2. Allgemeine Hinweise zur Datenverarbeitung
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website, zur Bearbeitung von Anfragen, zur Kommunikation mit Interessenten sowie für einen sicheren technischen Betrieb erforderlich ist. Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. a DSGVO, sofern Sie eine Einwilligung erteilen, Art. 6 Abs. 1 lit. b DSGVO für die Anbahnung und Durchführung vorvertraglicher Maßnahmen sowie Art. 6 Abs. 1 lit. f DSGVO auf Grundlage unseres berechtigten Interesses an einem sicheren, funktionierenden und wirtschaftlichen Webauftritt.
                  </p>
                </section>

                <section id="hosting" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    3. Hosting und Server-Logfiles
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Diese Website wird derzeit über GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA) bereitgestellt. Beim Aufruf verarbeitet der Hosting-Anbieter die technisch erforderlichen Verbindungsdaten (insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten, Browsertyp, Betriebssystem und Referrer-URL), um die Website auszuliefern und die Stabilität sowie Sicherheit des Systems zu gewährleisten. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                  </p>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Eine Übermittlung in Drittstaaten (USA) kann dabei nicht ausgeschlossen werden. GitHub ist nach dem EU-US Data Privacy Framework zertifiziert. Weitere Informationen finden Sie in den Datenschutzhinweisen von GitHub.
                  </p>
                </section>

                <section id="formular" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    4. Kontaktformular und Kontaktaufnahme
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Wenn Sie uns über das Kontaktformular kontaktieren, verarbeiten wir die von Ihnen eingegebenen Daten zur Bearbeitung Ihrer Anfrage. Dazu gehören insbesondere Name, E-Mail-Adresse, Telefonnummer, gewählte Leistung und Ihre Nachricht. Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage und zur Anbahnung möglicher vertraglicher Leistungen auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO sowie ergänzend auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                  </p>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    {usesDefaultFormSubmit
                      ? "Das Formular wird technisch über den externen Dienst FormSubmit (formsubmit.co) verarbeitet, der die Nachricht an unsere im Impressum angegebene E-Mail-Adresse weiterleitet. Dabei werden die von Ihnen eingegebenen Daten an FormSubmit übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und lit. f DSGVO. Vor dem finalen Livegang wird geprüft, ob dieser Dienst dauerhaft eingesetzt wird oder durch einen eigenen Formularempfang ersetzt wird; diese Datenschutzerklärung wird bei Bedarf angepasst."
                      : "Für das Kontaktformular ist in der aktuellen Build-Konfiguration ein individueller Formular-Endpunkt hinterlegt. Welche Empfänger oder Dienstleister dabei konkret eingebunden sind, richtet sich nach der jeweiligen Live-Konfiguration; Details ergänzen wir hier, sobald der Endpunkt final festgelegt ist."}
                  </p>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Wenn Sie uns per E-Mail, Telefon oder auf anderem Weg kontaktieren, verarbeiten wir Ihre Angaben ebenfalls zur Bearbeitung Ihres Anliegens. Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
                  </p>
                </section>

                <section id="kommunikation" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    5. Telefon, E-Mail und WhatsApp
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Auf dieser Website finden Sie Telefon-, E-Mail- und WhatsApp-Verlinkungen. Wenn Sie auf einen solchen Link klicken, verlassen Sie gegebenenfalls diese Website oder es wird eine Verbindung zu dem jeweiligen Kommunikationsanbieter hergestellt. Dabei können technische Daten, insbesondere Ihre IP-Adresse und Nutzungsdaten, durch den jeweiligen Anbieter verarbeitet werden. Die Nutzung dieser Kommunikationswege erfolgt freiwillig.
                  </p>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Bei einer Kontaktaufnahme über WhatsApp (Anbieter: WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland) gelten zusätzlich die Datenschutzbestimmungen des Anbieters. Bitte nutzen Sie diesen Kontaktweg nur, wenn Sie mit der damit verbundenen Datenverarbeitung einverstanden sind.
                  </p>
                </section>

                <section id="fonts" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    6. Schriftarten
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Diese Website nutzt die Schriftfamilien „Inter" und „Inter Tight". Beide werden lokal vom eigenen Server ausgeliefert (self-hosted). Es findet dabei keine Verbindung zu Google Fonts oder einem anderen externen Schrift-Anbieter statt und es werden keine personenbezogenen Daten (insbesondere keine IP-Adresse) an Dritte übermittelt.
                  </p>
                </section>

                <section id="karten" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    7. Karten und Standortdienste
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Auf dieser Website ist derzeit keine interaktive Karte (etwa Google Maps oder OpenStreetMap) eingebunden. Falls in Zukunft eine Kartenlösung ergänzt wird, wird diese Datenschutzerklärung vorher entsprechend aktualisiert und gegebenenfalls eine vorgelagerte Einwilligungslösung eingesetzt.
                  </p>
                </section>

                <section id="cookies" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    8. Cookies, Tracking und Analyse
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Diese Website setzt derzeit keine Analyse-, Tracking- oder Marketing-Tools ein (kein Google Analytics, kein Meta Pixel, kein Matomo und keine vergleichbaren Dienste). Es werden keine nicht technisch erforderlichen Cookies gesetzt. Soweit technisch erforderliche Speichermechanismen verwendet werden, dienen diese ausschließlich dem sicheren und funktionalen Betrieb der Website.
                  </p>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Falls später Analyse-, Marketing- oder weitere externe Drittanbieter-Dienste eingebunden werden, wird diese Datenschutzerklärung entsprechend aktualisiert und gegebenenfalls eine Einwilligungs- oder Cookie-Lösung ergänzt.
                  </p>
                </section>

                <section id="speicherdauer" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    9. Speicherdauer
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen (insbesondere handels- und steuerrechtliche Aufbewahrungsfristen von in der Regel bis zu 10 Jahren). Kontaktanfragen werden regelmäßig gelöscht, sobald die Bearbeitung abgeschlossen ist und keine weitere Korrespondenz oder gesetzliche Pflicht zur Aufbewahrung besteht.
                  </p>
                </section>

                <section id="rechte" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    10. Ihre Rechte
                  </h2>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Sie haben nach Maßgabe der gesetzlichen Bestimmungen das Recht auf Auskunft über die Sie betreffenden personenbezogenen Daten (Art. 15 DSGVO), auf Berichtigung unrichtiger Daten (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO), auf Datenübertragbarkeit (Art. 20 DSGVO) sowie auf Widerspruch gegen bestimmte Verarbeitungen (Art. 21 DSGVO). Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen.
                  </p>
                  <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
                    Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist für uns die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf.
                  </p>
                </section>

                <section id="aktualisierung" className="scroll-mt-28 border-t border-border/40 pt-14">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-[-0.015em] text-foreground">
                    11. Aktualisierungshinweis
                  </h2>
                  <p className="mt-4 rounded-2xl border border-border/60 bg-secondary/60 p-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                    Diese Datenschutzerklärung bildet den derzeit erkennbaren technischen Stand dieser Website ab. Wenn Hosting, Formular-Versand, Karten-Einbindung, Schriftarten, Analyse-Tools oder sonstige Drittanbieter-Dienste geändert werden, wird diese Seite entsprechend angepasst. Vor dem finalen Livegang empfehlen wir eine rechtliche Prüfung der verwendeten Angaben, Unternehmensdaten und Dienstleister.
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

export default Datenschutz;
