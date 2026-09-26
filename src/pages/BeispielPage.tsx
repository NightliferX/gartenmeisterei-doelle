import HeroV8 from "@/components/v8/HeroV8";
import ServicesV8 from "@/components/v8/ServicesV8";
import WerkstattV8 from "@/components/v8/WerkstattV8";
import WhyV8 from "@/components/v8/WhyV8";
import AreaBlockV8 from "@/components/v8/AreaBlockV8";
import FaqV8 from "@/components/v8/FaqV8";
import BeratungCtaV8 from "@/components/v8/BeratungCtaV8";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Preview-Varianten zum Vergleich: eine Version zeigt Benedikt zweimal
// (Hero + WhyV8-Portrait), die andere nur im Hero. In beiden Fällen ist
// die separate MeisterPortrait-Section aus V7 entfernt, damit V8 nicht
// dreimal ein Benedikt-Bild rendert.
type BeispielProps = { variant: "1" | "2" };

const BeispielPage = ({ variant }: BeispielProps) => {
  useScrollAnimation();
  return (
    <>
    <HeaderV8 />
    {variant === "1" ? (
      <>
        <HeroV8 />
        <ServicesV8 />
        <WerkstattV8 />
        <WhyV8 />
        <AreaBlockV8 />
        <FaqV8 />
        <BeratungCtaV8 />
      </>
    ) : (
      <>
        <HeroV8 />
        <ServicesV8 />
        <WerkstattV8 />
        <WhyV8
          meisterImageSrc="/services/baumschnitt/baumschnitt-obstbaum-bypass-astschere-nahaufnahme-duesseldorf.png"
          meisterImageAlt="Bypass-Astschere beim Obstbaumschnitt — Handwerk von Gärtnermeister Dölle"
        />
        <AreaBlockV8 />
        <FaqV8 />
        <BeratungCtaV8 />
      </>
    )}
    <Footer />
  </>
  );
};

export default BeispielPage;
