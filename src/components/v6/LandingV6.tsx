import ScrollExpansionHero from "./ScrollExpansionHero";
import GartenjahrBlock from "./GartenjahrBlock";
import HighlightsGallery from "./HighlightsGallery";
import ServiceBento from "./ServiceBento";
import WorkCompare from "./WorkCompare";
import WhyCards from "./WhyCards";
import MeisterSection from "./MeisterSection";
import AreaDirectory from "./AreaDirectory";

// Design-Variante 6: Aufbau einer Apple-Produktseite, Thema Garten.
// FAQ und Kontakt kommen weiterhin aus den gemeinsamen Komponenten (Index.tsx).
const LandingV6 = () => (
  <>
    <ScrollExpansionHero />
    <GartenjahrBlock />
    <HighlightsGallery />
    <ServiceBento />
    <WorkCompare />
    <WhyCards />
    <MeisterSection />
    <AreaDirectory />
  </>
);

export default LandingV6;
