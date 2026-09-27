// Stilisierte Signature-Icons fuer die 4 Duesseldorfer Schwerpunkt-
// Stadtteile. Line-Art, 24x24, currentColor. Machen die Stadtteile in
// der Chip-Liste sofort erkennbar, ohne 4 Fotos zu brauchen.

type IconProps = React.SVGProps<SVGSVGElement>;

// Oberkassel: klassizistischer Altbau mit drei Fenstern und Balkon.
export const IconOberkassel = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <path d="M3 8 L12 4 L21 8" />
    <path d="M4 8 L4 21 L20 21 L20 8" />
    <rect x="5.8" y="10.5" width="3" height="4" />
    <rect x="10.5" y="10.5" width="3" height="4" />
    <rect x="15.2" y="10.5" width="3" height="4" />
    <path d="M10 21 L10 16.5 L14 16.5 L14 21" />
  </svg>
);

// Kaiserswerth: romanischer Basilika-Turm ueber Rheinwelle.
export const IconKaiserswerth = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <path d="M12 3 L12 1.5" />
    <path d="M9 6 L12 3 L15 6" />
    <path d="M9 6 L9 17 L15 17 L15 6 Z" />
    <path d="M11 17 L11 12 L13 12 L13 17" />
    <path d="M3 21 C 6 19, 9 22, 12 20 C 15 18, 18 21, 21 20" />
  </svg>
);

// Benrath: klassizistischer Schlossbau mit Kuppel und Saeulen.
export const IconBenrath = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <path d="M12 4 L12 6.5" />
    <path d="M8 12 C 8 8, 16 8, 16 12" />
    <path d="M3 12 L3 21 L21 21 L21 12 Z" />
    <path d="M6 15 L6 21 M9 15 L9 21 M12 15 L12 21 M15 15 L15 21 M18 15 L18 21" />
    <path d="M3 12 L21 12" />
  </svg>
);

// Gerresheim: romanische Doppel-Turm-Basilika.
export const IconGerresheim = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <path d="M6 8 L8 5 L10 8" />
    <path d="M14 8 L16 5 L18 8" />
    <path d="M6 8 L6 21 L10 21 L10 8 Z" />
    <path d="M14 8 L14 21 L18 21 L18 8 Z" />
    <path d="M10 14 L14 14 L14 21 L10 21 Z" />
    <path d="M12 14 L12 21" />
  </svg>
);

export const stadtteilIconFor: Record<string, (p: IconProps) => JSX.Element> = {
  "gartenpflege-oberkassel": IconOberkassel,
  "gartenpflege-kaiserswerth": IconKaiserswerth,
  "gartenpflege-benrath": IconBenrath,
  "gartenpflege-gerresheim": IconGerresheim,
};
