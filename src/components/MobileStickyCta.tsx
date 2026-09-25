import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";

const MobileStickyCta = () => {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 120) {
        setVisible(true);
      } else if (y > lastY.current + 6) {
        setVisible(false);
      } else if (y < lastY.current - 6) {
        setVisible(true);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{
        y: visible ? 0 : 140,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 360, damping: 36, mass: 0.7 }}
      className="fixed inset-x-0 bottom-0 z-40 bg-primary/[0.08] px-4 pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={siteConfig.phoneHref}
          className="v8-press flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <Phone className="h-4 w-4 text-primary" strokeWidth={2.25} />
          Anrufen
        </a>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="v8-press flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

export default MobileStickyCta;
