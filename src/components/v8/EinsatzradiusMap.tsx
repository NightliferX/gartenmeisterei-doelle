// Stilisierte SVG-Karte des Einsatzgebiets: Düsseldorf-Zentrum, Rhein
// als weiche S-Linie, 25 km-Radiuskreis, Punkte für Umlandorte und
// Stadtteile an approximativ geografischen Positionen. Kein Foto, kein
// Copyright-Risiko, kein externes Karten-JS. Rein Editorial-Grafik.

const CENTER_X = 400;
const CENTER_Y = 300;
const KM = 10; // 1 km = 10 px, also 25 km = 250 px Radius

type Ort = { name: string; dx: number; dy: number; labelDx?: number; labelDy?: number };

// Positionen in Kilometern relativ zu Düsseldorf-Zentrum (Rathaus).
// dx positiv = Osten, dy positiv = Süden. Werte sind Luftlinien-Näherungen.
const umland: Ort[] = [
  { name: "Meerbusch", dx: -8, dy: -3, labelDx: -8 },
  { name: "Neuss", dx: -6, dy: 4, labelDx: -6 },
  { name: "Krefeld", dx: -16, dy: -7, labelDx: -8, labelDy: -6 },
  { name: "Kaarst", dx: -10, dy: -1, labelDx: -8, labelDy: -6 },
  { name: "Dormagen", dx: -4, dy: 15, labelDx: -8 },
  { name: "Ratingen", dx: 6, dy: -8, labelDx: 8 },
  { name: "Mettmann", dx: 10, dy: -1, labelDx: 8 },
  { name: "Wülfrath", dx: 12, dy: -10, labelDx: 8, labelDy: -6 },
  { name: "Erkrath", dx: 10, dy: 5, labelDx: 8, labelDy: 4 },
  { name: "Haan", dx: 14, dy: 2, labelDx: 8 },
  { name: "Hilden", dx: 6, dy: 8, labelDx: 8 },
  { name: "Langenfeld", dx: 0, dy: 15, labelDx: 8 },
  { name: "Monheim am Rhein", dx: 3, dy: 14, labelDx: 8 },
];

const stadtteile: Ort[] = [
  { name: "Kaiserswerth", dx: 0, dy: -9, labelDx: 8 },
  { name: "Oberkassel", dx: -2, dy: 1, labelDx: -8 },
  { name: "Gerresheim", dx: 6, dy: 2, labelDy: 6, labelDx: 8 },
  { name: "Benrath", dx: 1, dy: 10, labelDx: 8 },
];

const toX = (dx: number) => CENTER_X + dx * KM;
const toY = (dy: number) => CENTER_Y + dy * KM;

const EinsatzradiusMap = () => (
  <figure className="mx-auto w-full max-w-[720px]">
    <svg
      role="img"
      aria-labelledby="einsatzradius-title einsatzradius-desc"
      viewBox="0 0 800 600"
      className="h-auto w-full"
    >
      <title id="einsatzradius-title">Einsatzgebiet Gärtnermeister Dölle</title>
      <desc id="einsatzradius-desc">
        25 Kilometer Umkreis um Düsseldorf mit 4 Schwerpunkt-Stadtteilen und 13 Umlandorten.
      </desc>

      {/* 25 km-Radiuskreis, sehr subtil */}
      <circle
        cx={CENTER_X}
        cy={CENTER_Y}
        r={25 * KM}
        fill="hsl(var(--primary) / 0.04)"
        stroke="hsl(var(--primary) / 0.35)"
        strokeWidth={1.5}
        strokeDasharray="4 5"
      />

      {/* Rhein als weiche S-Linie durch die Karte (NNW → SSO) */}
      <path
        d="M 320 30 C 360 140, 420 200, 400 300 C 380 400, 430 460, 380 580"
        fill="none"
        stroke="hsl(var(--primary) / 0.22)"
        strokeWidth={12}
        strokeLinecap="round"
      />
      <text
        x={330}
        y={80}
        fontSize={11}
        fontStyle="italic"
        fill="hsl(var(--primary) / 0.55)"
      >
        Rhein
      </text>

      {/* Radius-Label am rechten Kreisrand */}
      <text
        x={CENTER_X + 25 * KM + 8}
        y={CENTER_Y}
        fontSize={11}
        fontWeight={500}
        fill="hsl(var(--primary))"
      >
        25 km
      </text>

      {/* Umlandorte: kleine Punkte + Label */}
      {umland.map((o) => {
        const x = toX(o.dx);
        const y = toY(o.dy);
        const lx = x + (o.labelDx ?? 8);
        const ly = y + (o.labelDy ?? 4);
        const anchor = (o.labelDx ?? 0) < 0 ? "end" : "start";
        return (
          <g key={o.name}>
            <circle cx={x} cy={y} r={4} fill="hsl(var(--primary))" opacity={0.75} />
            <text
              x={lx}
              y={ly}
              fontSize={12}
              fill="hsl(var(--foreground))"
              textAnchor={anchor}
            >
              {o.name}
            </text>
          </g>
        );
      })}

      {/* Stadtteile: eigene, kraeftigere Marker mit Ring */}
      {stadtteile.map((o) => {
        const x = toX(o.dx);
        const y = toY(o.dy);
        const lx = x + (o.labelDx ?? 8);
        const ly = y + (o.labelDy ?? 4);
        const anchor = (o.labelDx ?? 0) < 0 ? "end" : "start";
        return (
          <g key={o.name}>
            <circle cx={x} cy={y} r={7} fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth={1.8} />
            <circle cx={x} cy={y} r={3} fill="hsl(var(--primary))" />
            <text
              x={lx}
              y={ly}
              fontSize={12}
              fontWeight={600}
              fill="hsl(var(--foreground))"
              textAnchor={anchor}
            >
              {o.name}
            </text>
          </g>
        );
      })}

      {/* Duesseldorf-Zentrum: dominanter Marker + Label */}
      <g>
        <circle cx={CENTER_X} cy={CENTER_Y} r={11} fill="hsl(var(--primary))" />
        <circle cx={CENTER_X} cy={CENTER_Y} r={17} fill="none" stroke="hsl(var(--primary) / 0.35)" strokeWidth={1.5} />
        <text
          x={CENTER_X + 22}
          y={CENTER_Y - 6}
          fontSize={16}
          fontWeight={700}
          fill="hsl(var(--foreground))"
        >
          Düsseldorf
        </text>
        <text
          x={CENTER_X + 22}
          y={CENTER_Y + 10}
          fontSize={11}
          fill="hsl(var(--muted-foreground))"
        >
          Meisterbetrieb
        </text>
      </g>
    </svg>
    <figcaption className="mt-4 text-center text-[0.85rem] text-muted-foreground">
      Feste Anfahrtstage links- und rechtsrheinisch. Größere Punkte = Stadtteile mit eigener Seite.
    </figcaption>
  </figure>
);

export default EinsatzradiusMap;
