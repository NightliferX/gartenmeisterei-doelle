// Accessibility: erlaubt Tastatur- und Screenreader-Nutzern, Header und
// Navigation zu überspringen und direkt zum Hauptinhalt zu springen.
// Sichtbar nur bei Fokus (Tab-Navigation).
const SkipToContent = () => (
  <a
    href="#main"
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline focus:outline-2 focus:outline-white"
  >
    Zum Inhalt springen
  </a>
);

export default SkipToContent;
