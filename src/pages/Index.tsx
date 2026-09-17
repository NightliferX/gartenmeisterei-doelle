import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/MobileStickyCta";
import ServiceAreas from "@/components/ServiceAreas";
import Faq from "@/components/Faq";
import Seo from "@/components/Seo";
import ValuePropsSection from "@/components/ValuePropsSection";
import ProofSection from "@/components/ProofSection";
import LandingV5 from "@/components/v5/LandingV5";
import LandingV6 from "@/components/v6/LandingV6";
import { faqItems, projects, serviceAreas, services, siteConfig } from "@/lib/siteContent";

const isV5 = import.meta.env.VITE_THEME === "v5";
const isV6 = import.meta.env.VITE_THEME === "v6";

const Index = () => {
  useScrollAnimation();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.brandName,
      url: siteConfig.domain,
      description:
        "Gartenpflege vom Gärtnermeister in Düsseldorf und Umgebung: Heckenschnitt, Baumschnitt, Rasenpflege, Laubentsorgung und Winterservice.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Landscaper",
      "@id": `${siteConfig.domain}/#business`,
      name: siteConfig.brandName,
      image: siteConfig.ogImage,
      url: siteConfig.domain,
      email: siteConfig.email,
      telephone: siteConfig.phoneRaw,
      founder: {
        "@type": "Person",
        name: siteConfig.ownerName,
        jobTitle: "Gärtnermeister",
      },
      priceRange: "EUR",
      description:
        "Gartenpflege vom Meisterbetrieb in Düsseldorf: Hecken- und Baumschnitt, Rasen- und Beetpflege, Laubentsorgung, Frühjahrs- und Winterservice.",
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
          },
        })),
      },
      subjectOf: projects.map((project) => ({
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        areaServed: project.location,
      })),
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
        title="Gartenpflege Düsseldorf | Gartenmeisterei Dölle – Ihr Gärtnermeister"
        description="Gartenpflege vom Gärtnermeister in Düsseldorf & Umgebung: Heckenschnitt, Baumschnitt, Rasenpflege, Laubentsorgung und Winterservice. Kostenlose Erstberatung, Antwort meist in 24 h."
        path="/"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen">
        <Header />
        <main>
          {isV6 ? (
            <LandingV6 />
          ) : isV5 ? (
            <LandingV5 />
          ) : (
            <>
              <Hero />
              <ValuePropsSection />
              <ProofSection />
              <Services />
              <Gallery />
              <About />
              <Testimonials />
              <ServiceAreas />
            </>
          )}
          <Faq />
          <Contact />
        </main>
        <Footer />
        <MobileStickyCta />
      </div>
    </>
  );
};

export default Index;
