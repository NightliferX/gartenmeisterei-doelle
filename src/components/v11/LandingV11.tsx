import HeroV11 from "./HeroV11";
import TrustStripV11 from "./TrustStripV11";
import ServicesV11 from "./ServicesV11";
import WerkstattV11 from "./WerkstattV11";
import WarumV11 from "./WarumV11";
import StimmenV11 from "./StimmenV11";
import AreaBlockV11 from "./AreaBlockV11";
import FaqV11 from "./FaqV11";
import BeratungCtaV11 from "./BeratungCtaV11";

// Design-Variante 11 = V8 + Audit-Fixes:
// - Em-Dashes global raus (Design-Taste Fix 1)
// - Eyebrows nur noch bei Services (Fix 2)
// - CTA-Wording einheitlich "Beratung anfragen" (Fix 3)
// - Micro-Meta unter Kontakt raus (Fix 4)
// - Testimonials ohne Service-Meta (Fix 5)
// - Gartenjahr sauber unter Hero, kein Overlap (Fix 6)
// - Services als Bento-Rhythmus (Fix 7)
// - UX: Basis-Font 18px + line-height 1.6 (Zielgruppe 60+)
// - UX: Trust-Strip unter Hero mit Meisterbrief-Anker
const LandingV11 = () => (
  <>
    <HeroV11 />
    <TrustStripV11 />
    <ServicesV11 />
    <WerkstattV11 />
    <WarumV11 />
    <StimmenV11 />
    <AreaBlockV11 />
    <FaqV11 />
    <BeratungCtaV11 />
  </>
);

export default LandingV11;
