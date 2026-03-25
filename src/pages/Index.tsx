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
import { faqItems, projects, serviceAreas, services, siteConfig } from "@/lib/siteContent";

const Index = () => {
  useScrollAnimation();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.brandName,
      url: siteConfig.domain,
      description:
        "Haus- und Gartensanierung in Grevenbroich und Umgebung mit Fokus auf Sanierung, Gartenbau und Innenausbau.",
    },
    {
      "@context": "https://schema.org",
      "@type": "GeneralContractor",
      "@id": `${siteConfig.domain}/#business`,
      name: siteConfig.brandName,
      image: siteConfig.ogImage,
      url: siteConfig.domain,
      email: siteConfig.email,
      telephone: siteConfig.phoneRaw,
      founder: siteConfig.ownerName,
      priceRange: "EUR",
      description:
        "Professionelle Haus- und Gartensanierung in Grevenbroich und Umgebung mit Leistungen von Fassadensanierung bis Terrassenbau.",
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
        title="Haus&Garten Profi | Sanierung, Gartenbau & Innenausbau in Grevenbroich"
        description="Professionelle Haus- und Gartensanierung in Grevenbroich und Umgebung. Haussanierung, Gartengestaltung, Innenausbau, Pflasterarbeiten und kostenlose Beratung."
        path="/"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <ValuePropsSection />
          <ProofSection />
          <Services />
          <Gallery />
          <About />
          <Testimonials />
          <ServiceAreas />
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
