import HeaderV8 from "@/components/v8/HeaderV8";
import LandingV8 from "@/components/v8/LandingV8";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/MobileStickyCta";
import Seo from "@/components/Seo";
import SkipToContent from "@/components/SkipToContent";
import { faqItems, projects, serviceAreas, services, siteConfig } from "@/lib/siteContent";

// Root-Route der Website. V8 ist die aktive Design-Variante, alle anderen
// Landings (V2/V4/V5/V6/V7/V9/V10/V11) sind aus dem Live-Bundle raus,
// die Files liegen weiter im Repo als Design-Reserve, werden aber nicht
// mehr geladen. Ueberarbeitung im Ordner src/components/v8.
const Index = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteConfig.domain}/#website`,
      name: siteConfig.brandName,
      url: siteConfig.domain,
      inLanguage: "de-DE",
      publisher: { "@id": `${siteConfig.domain}/#business` },
      description:
        "Gartenpflege vom Gärtnermeister in Düsseldorf und Umgebung: Heckenschnitt, Baumschnitt, Rasenpflege, Laubentsorgung und Winterservice.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Landscaper",
      "@id": `${siteConfig.domain}/#business`,
      name: siteConfig.brandName,
      alternateName: "Gaertnermeister Doelle Duesseldorf",
      image: siteConfig.ogImage,
      logo: `${siteConfig.domain}/logo.svg`,
      url: siteConfig.domain,
      email: siteConfig.email,
      telephone: siteConfig.phoneRaw,
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Bar, Überweisung, Rechnung",
      slogan: "Gartenpflege vom Meister. Persönlich. Zuverlässig.",
      description:
        "Meisterbetrieb für Gartenpflege in Düsseldorf: Hecken- und Baumschnitt, Rasen- und Beetpflege, Rollrasen, Laubentsorgung, Frühjahrs- und Winterservice, Terrassenreinigung.",
      founder: {
        "@type": "Person",
        "@id": `${siteConfig.domain}/#benedikt`,
        name: siteConfig.ownerName,
        jobTitle: siteConfig.ownerTitle,
        worksFor: { "@id": `${siteConfig.domain}/#business` },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Meisterbrief",
          name: "Gärtnermeister (Meisterprüfung nach § 51 HwO)",
          recognizedBy: {
            "@type": "Organization",
            name: "Handwerkskammer Düsseldorf",
          },
        },
      },
      areaServed: serviceAreas.map((area) => ({
        "@type": "City",
        name: area,
      })),
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.streetAddress,
        postalCode: siteConfig.postalCode,
        addressLocality: siteConfig.city,
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.country,
      },
      // Volmarweg 8, 40221 Düsseldorf (grobe Koordinate, vor GBP-Cutover verifizieren)
      geo: {
        "@type": "GeoCoordinates",
        latitude: 51.2115,
        longitude: 6.7469,
      },
      openingHoursSpecification: siteConfig.openingHours.map((slot) => ({
        "@type": "OpeningHoursSpecification",
        ...slot,
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Leistungen",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: { "@id": `${siteConfig.domain}/#business` },
          },
        })),
      },
      subjectOf: projects.map((project) => ({
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        areaServed: project.location,
      })),
      // TODO nach GBP-Anlage ergaenzen: sameAs (Google Business Profile,
      // Instagram, Facebook), aggregateRating, review.
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <>
      <Seo
        title="Gartenpflege Düsseldorf | Gärtnermeister Dölle, Meisterbetrieb"
        description="Gartenpflege vom Gärtnermeister in Düsseldorf & Umgebung: Heckenschnitt, Baumschnitt, Rasenpflege, Laubentsorgung und Winterservice. Kostenlose Erstberatung, persönliche Rückmeldung."
        path="/"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen">
        <SkipToContent />
        <HeaderV8 />
        <main id="main">
          <LandingV8 />
        </main>
        <Footer />
        <MobileStickyCta />
      </div>
    </>
  );
};

export default Index;
