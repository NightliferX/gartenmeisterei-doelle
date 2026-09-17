// Umschalter zwischen den Design-Varianten (Pitch-Phase).
// Funktioniert über die veröffentlichten Pfade: <base>/, <base>/v2/, <base>/v3/, <base>/v4/, <base>/v5/, <base>/v6/.
// Vor dem finalen Go-Live einfach aus App.tsx entfernen.
const CURRENT = (import.meta.env.VITE_THEME as string) || "v1";

const VERSIONS = [
  { id: "v1", label: "1" },
  { id: "v2", label: "2" },
  { id: "v3", label: "3" },
  { id: "v4", label: "4" },
  { id: "v5", label: "5" },
  { id: "v6", label: "6" },
];

// Basis ohne Varianten-Suffix, z. B. "/gartenmeisterei-doelle/v3/" → "/gartenmeisterei-doelle/"
const rootBase = (import.meta.env.BASE_URL ?? "/").replace(/v[2-6]\/$/, "");

// Im Dev-Modus laufen die Varianten auf eigenen Ports (npm run dev / dev:v2 … dev:v6).
const DEV_PORTS: Record<string, string> = { v1: "8080", v2: "8085", v3: "8086", v4: "8087", v5: "8088", v6: "8089" };

const hrefFor = (id: string) => {
  if (import.meta.env.DEV) {
    return `${window.location.protocol}//${window.location.hostname}:${DEV_PORTS[id]}/`;
  }
  return id === "v1" ? rootBase : `${rootBase}${id}/`;
};

const DesignSwitcher = () => {
  return (
    <div className="fixed bottom-24 left-3 z-50 flex items-center gap-1 rounded-full border border-black/10 bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur-sm lg:bottom-4 lg:left-4">
      <span className="px-1.5 text-xs font-semibold text-neutral-500">Design</span>
      {VERSIONS.map((v) => (
        <a
          key={v.id}
          href={hrefFor(v.id)}
          aria-label={`Design-Variante ${v.label} ansehen`}
          aria-current={CURRENT === v.id ? "page" : undefined}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
            CURRENT === v.id
              ? "bg-neutral-900 text-white"
              : "text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          {v.label}
        </a>
      ))}
    </div>
  );
};

export default DesignSwitcher;
