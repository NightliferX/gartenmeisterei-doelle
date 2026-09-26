import HeroV8 from "./HeroV8";
import ServicesV8 from "./ServicesV8";
import WerkstattV8 from "./WerkstattV8";
import WarumV8 from "./WarumV8";
import AreaBlockV8 from "./AreaBlockV8";
import FaqV8 from "./FaqV8";
import BeratungCtaV8 from "./BeratungCtaV8";

// Design-Variante 8 „Best-of #2":
// V4-Cinematic-Hero + Gartenjahr-Block (mobil kompakt), V6-Grün, Systemschrift.
// „So arbeiten wir" mit Filter-Chips + Snap-Carousel (V7-Tabs auf V4-Karten).
const LandingV8 = () => (
  <>
    <HeroV8 />
    <ServicesV8 />
    <WerkstattV8 />
    <WarumV8 />
    <AreaBlockV8 />
    <FaqV8 />
    <BeratungCtaV8 />
  </>
);

export default LandingV8;
