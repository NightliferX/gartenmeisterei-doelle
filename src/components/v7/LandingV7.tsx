import HeroV7 from "./HeroV7";
import GartenjahrRibbon from "./GartenjahrRibbon";
import ServiceBentoV7 from "./ServiceBentoV7";
import MeisterPortrait from "./MeisterPortrait";
import AreaListing from "./AreaListing";
import TrustBar from "./TrustBar";
import MeisterFotoSection from "@/components/MeisterFotoSection";
import Gallery from "@/components/Gallery";

// Design-Variante 7 „Best-of": das Beste aus allen Varianten in Design-1-Farben.
// FAQ und Kontakt kommen weiterhin aus den gemeinsamen Komponenten (Index.tsx).
const LandingV7 = () => (
  <>
    <HeroV7 />
    <GartenjahrRibbon />
    <TrustBar />
    <ServiceBentoV7 />
    <MeisterFotoSection />
    <Gallery />
    <MeisterPortrait />
    <AreaListing />
  </>
);

export default LandingV7;
