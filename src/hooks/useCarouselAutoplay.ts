import { useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

export const useCarouselAutoplay = (
  api: CarouselApi | undefined,
  enabled: boolean,
  delay = 4800,
) => {
  useEffect(() => {
    if (!api || !enabled) {
      return;
    }

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        api.scrollNext();
      }
    }, delay);

    return () => window.clearInterval(interval);
  }, [api, delay, enabled]);
};
