import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Bei jedem Route-Wechsel scrollt der Browser sonst nicht zurück nach
// oben, man landet auf der neuen Seite auf derselben Y-Position wie
// vorher. Diese Komponente:
//   - scrollt bei Pfad-Wechsel ohne #hash nach oben (0/0),
//   - scrollt bei Pfad+Hash-Wechsel per requestAnimationFrame-Doppel-
//     Puffer zu #hash-Element, sodass Anker-Navigation von Sub-Pages
//     zur Homepage-Section funktioniert (auch mit Sections, die spät
//     ihre Höhe berechnen).
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, "");
      // Zwei Frames Puffer, damit React nach dem Route-Wechsel den DOM
      // aufgebaut hat und das Ziel-Element existiert.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            // Fallback: falls das Element noch nicht gemountet ist,
            // wenigstens nach oben scrollen, statt auf halber Höhe zu
            // bleiben.
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          }
        });
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
