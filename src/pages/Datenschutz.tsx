import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/MobileStickyCta";
import Seo from "@/components/Seo";
import { siteConfig } from "@/lib/siteContent";

const Datenschutz = () => {
  const usesDefaultFormSubmit = !import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

  return (
    <>
      <Seo
        title={`Datenschutz | ${siteConfig.brandName}`}
        description={`Datenschutzhinweise fur die Website von ${siteConfig.brandName}.`}
        path="/datenschutz"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 pb-28 pt-28 md:pt-32">
          <div className="mx-auto max-w-3xl rounded-3xl border bg-card p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Rechtliches
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Datenschutzerklarung
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Stand: 24. Marz 2026
            </p>

            <div className="mt-8 space-y-8 text-sm leading-7 text-muted-foreground">
              <section>
                <h2 className="text-base font-semibold text-foreground">
                  1. Verantwortlicher
                </h2>
                <p className="mt-3">
                  Verantwortlich fur die Datenverarbeitung auf dieser Website ist:
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

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  2. Allgemeine Hinweise zur Datenverarbeitung
                </h2>
                <p className="mt-3">
                  Wir verarbeiten personenbezogene Daten nur, soweit dies zur
                  Bereitstellung dieser Website, zur Bearbeitung von Anfragen,
                  zur Kommunikation mit Interessenten sowie fur einen sicheren
                  technischen Betrieb erforderlich ist. Rechtsgrundlagen sind
                  insbesondere Art. 6 Abs. 1 lit. a DSGVO, sofern Sie eine
                  Einwilligung erteilen, Art. 6 Abs. 1 lit. b DSGVO fur die
                  Anbahnung und Durchfuhrung vorvertraglicher Massnahmen sowie
                  Art. 6 Abs. 1 lit. f DSGVO auf Grundlage unseres berechtigten
                  Interesses an einem sicheren, funktionierenden und
                  wirtschaftlichen Webauftritt.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  3. Hosting und Server-Logfiles
                </h2>
                <p className="mt-3">
                  Beim Aufruf dieser Website verarbeitet unser Hosting-Anbieter
                  die technisch erforderlichen Verbindungsdaten, um die Website
                  auszuliefern und die Stabilitat sowie Sicherheit des Systems zu
                  gewahrleisten. Dazu konnen insbesondere IP-Adresse, Datum und
                  Uhrzeit des Zugriffs, aufgerufene Seiten, Browsertyp,
                  Betriebssystem sowie Referrer-URL gehoren. Die Verarbeitung
                  erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Die
                  Speicherdauer richtet sich nach den technischen und
                  organisatorischen Erfordernissen des jeweils eingesetzten
                  Hosting-Anbieters.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  4. Kontaktformular und Kontaktaufnahme
                </h2>
                <p className="mt-3">
                  Wenn Sie uns uber das Kontaktformular kontaktieren,
                  verarbeiten wir die von Ihnen eingegebenen Daten zur
                  Bearbeitung Ihrer Anfrage. Dazu gehoren insbesondere Name,
                  E-Mail-Adresse, Telefonnummer, gewahlte Leistung und Ihre
                  Nachricht. Die Verarbeitung erfolgt zur Bearbeitung Ihrer
                  Anfrage und zur Anbahnung moglicher vertraglicher Leistungen
                  auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO sowie erganzend
                  auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                </p>
                <p className="mt-3">
                  {usesDefaultFormSubmit
                    ? "Nach der derzeitigen technischen Standard-Konfiguration dieser Website wird das Formular uber einen externen Formular-Dienst verarbeitet. Dabei konnen die von Ihnen eingegebenen Daten an diesen Dienst ubermittelt werden, bevor sie an uns weitergeleitet werden. Vor dem finalen Livegang sollten die konkrete Live-Konfiguration und der tatsachlich eingesetzte Formular-Dienst nochmals gepruft und diese Datenschutzerklarung bei Bedarf angepasst werden."
                    : "Fur das Kontaktformular ist in der aktuellen Build-Konfiguration ein individueller Formular-Endpunkt hinterlegt. Welche Empfanger oder Dienstleister dabei konkret eingebunden sind, richtet sich nach der jeweiligen Live-Konfiguration des Hostings und sollte vor dem finalen Livegang nochmals gepruft und dokumentiert werden."}
                </p>
                <p className="mt-3">
                  Wenn Sie uns per E-Mail, Telefon oder auf anderem Weg
                  kontaktieren, verarbeiten wir Ihre Angaben ebenfalls zur
                  Bearbeitung Ihres Anliegens. Die Daten werden geloescht, sobald
                  sie fur die Bearbeitung nicht mehr erforderlich sind und keine
                  gesetzlichen Aufbewahrungspflichten entgegenstehen.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  5. Telefon, E-Mail und WhatsApp
                </h2>
                <p className="mt-3">
                  Auf dieser Website finden Sie Telefon-, E-Mail- und
                  WhatsApp-Verlinkungen. Wenn Sie auf einen solchen Link klicken,
                  verlassen Sie gegebenenfalls diese Website oder es wird eine
                  Verbindung zu dem jeweiligen Kommunikationsanbieter hergestellt.
                  Dabei konnen technische Daten, insbesondere Ihre IP-Adresse und
                  Nutzungsdaten, durch den jeweiligen Anbieter verarbeitet werden.
                  Die Nutzung dieser Kommunikationswege erfolgt freiwillig.
                </p>
                <p className="mt-3">
                  Bei einer Kontaktaufnahme uber WhatsApp gelten zusatzlich die
                  Datenschutzbestimmungen des jeweiligen Anbieters. Bitte nutzen
                  diesen Kontaktweg nur, wenn Sie mit der damit verbundenen
                  Datenverarbeitung einverstanden sind.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  6. Google Maps
                </h2>
                <p className="mt-3">
                  Im Kontaktbereich dieser Website ist eine Karte von Google Maps
                  eingebunden. Beim Laden der Karte kann eine Verbindung zu
                  Servern von Google hergestellt werden. Dabei konnen
                  insbesondere Ihre IP-Adresse, Browserinformationen und weitere
                  technische Nutzungsdaten verarbeitet werden. Die Einbindung
                  dient einer nutzerfreundlichen Darstellung unseres Standorts
                  und erfolgt auf Grundlage unseres berechtigten Interesses nach
                  Art. 6 Abs. 1 lit. f DSGVO.
                </p>
                <p className="mt-3">
                  Bitte beachten Sie, dass hierbei eine Verarbeitung auch
                  ausserhalb der Europaischen Union nicht ausgeschlossen werden
                  kann. Vor dem finalen Livegang sollte gepruft werden, ob fur
                  die konkrete Einbindung eine vorgelagerte Einwilligungslosung
                  eingesetzt werden soll.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  7. Google Fonts
                </h2>
                <p className="mt-3">
                  Diese Website bindet Schriftarten von Google Fonts ein. Beim
                  Laden der Schriftarten kann eine Verbindung zu Servern von
                  Google aufgebaut werden. Dabei konnen insbesondere die
                  IP-Adresse sowie technische Informationen zum verwendeten
                  Browser verarbeitet werden. Die Einbindung dient einer
                  einheitlichen und ansprechenden Darstellung der Website.
                </p>
                <p className="mt-3">
                  Auch hier sollte vor dem Livegang gepruft werden, ob die
                  Schriftarten lokal eingebunden werden sollen, um externe
                  Verbindungen zu vermeiden.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  8. Cookies und lokale Speichertechniken
                </h2>
                <p className="mt-3">
                  Nach dem aktuellen technischen Stand dieser Website werden keine
                  Analyse- oder Marketing-Tools wie Google Analytics, Meta Pixel,
                  Matomo oder vergleichbare Tracking-Dienste eingesetzt. Soweit
                  technisch erforderliche Speichermechanismen oder
                  Verbindungsdaten verwendet werden, dienen diese ausschliesslich
                  dem sicheren und funktionalen Betrieb der Website.
                </p>
                <p className="mt-3">
                  Falls spaeter Analyse-, Marketing- oder weitere externe
                  Drittanbieter-Dienste eingebunden werden, ist diese
                  Datenschutzerklarung entsprechend zu aktualisieren und
                  gegebenenfalls eine Einwilligungs- oder Cookie-Losung zu
                  erganzen.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  9. Speicherdauer
                </h2>
                <p className="mt-3">
                  Wir speichern personenbezogene Daten nur so lange, wie dies fur
                  die jeweiligen Zwecke erforderlich ist oder gesetzliche
                  Aufbewahrungspflichten bestehen. Kontaktanfragen werden
                  regelmassig geloescht, sobald die Bearbeitung abgeschlossen ist
                  und keine weitere Korrespondenz oder gesetzliche Pflicht zur
                  Aufbewahrung besteht.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  10. Ihre Rechte
                </h2>
                <p className="mt-3">
                  Sie haben nach Massgabe der gesetzlichen Bestimmungen das Recht
                  auf Auskunft uber die Sie betreffenden personenbezogenen Daten,
                  auf Berichtigung unrichtiger Daten, auf Loschung, auf
                  Einschrankung der Verarbeitung, auf Datenubertragbarkeit sowie
                  auf Widerspruch gegen bestimmte Verarbeitungen. Erteilte
                  Einwilligungen konnen Sie jederzeit mit Wirkung fur die Zukunft
                  widerrufen.
                </p>
                <p className="mt-3">
                  Ausserdem haben Sie das Recht, sich bei einer
                  Datenschutz-Aufsichtsbehorde zu beschweren. Fur Nordrhein-
                  Westfalen ist dies insbesondere die Landesbeauftragte fur
                  Datenschutz und Informationsfreiheit Nordrhein-Westfalen.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-foreground">
                  11. Aktualisierungshinweis
                </h2>
                <p className="mt-3">
                  Diese Datenschutzerklarung bildet den derzeit erkennbaren
                  technischen Stand dieser Website ab. Wenn Hosting, Formular-
                  Versand, Karten-Einbindung, Schriftarten, Analyse-Tools oder
                  sonstige Drittanbieter-Dienste geandert werden, muss diese
                  Seite entsprechend angepasst werden. Vor dem finalen Livegang
                  empfehlen wir eine rechtliche Prufung der verwendeten Angaben,
                  Unternehmensdaten und Dienstleister.
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

export default Datenschutz;
