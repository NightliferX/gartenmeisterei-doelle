import ScrollExpansionHero from "./ScrollExpansionHero";
import GartenjahrBlock from "./GartenjahrBlock";
import ServiceIndex from "./ServiceIndex";
import WorkCompare from "./WorkCompare";
import MeisterSection from "./MeisterSection";
import AreaMarquee from "./AreaMarquee";

// Design-Variante 5 („Aus Wildwuchs wird Garten"): eigene Startseiten-Dramaturgie.
// FAQ und Kontakt kommen weiterhin aus den gemeinsamen Komponenten (Index.tsx).
const LandingV5 = () => (
  <>
    <ScrollExpansionHero />
    <GartenjahrBlock />
    <ServiceIndex />
    <WorkCompare />
    <MeisterSection />
    <AreaMarquee />
  </>
);

export default LandingV5;
