import { Menu, Sprout } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Airbnb-Style-Header: freistehende Nav-Bar mit rundem Logo-Badge, weißem
// Hintergrund und Rausch als CTA-Farbe.
const HeaderV9 = () => (
  <header className="sticky top-0 z-40 w-full border-b border-black/[0.06] bg-white/95 backdrop-blur">
    <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-4 sm:px-6">
      <a
        href={withBase("/")}
        className="flex items-center gap-2.5 font-semibold tracking-[-0.01em] text-[#222]"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FF5A5F] text-white">
          <Sprout className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <span className="text-[1.05rem]">{siteConfig.brandName}</span>
      </a>

      <nav className="hidden items-center gap-1 md:flex">
        {[
          { href: "/#leistungen", label: "Leistungen" },
          { href: "/#gartenjahr", label: "Gartenjahr" },
          { href: "/#meister", label: "Meister" },
          { href: "/#einsatzgebiete", label: "Wo wir sind" },
        ].map((l) => (
          <a
            key={l.href}
            href={withBase(l.href)}
            className="rounded-full px-4 py-2 text-[0.9rem] font-medium text-[#222] transition-colors hover:bg-black/[0.04]"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <a
          href={withBase("/#kontakt")}
          className="hidden rounded-full bg-[#FF5A5F] px-5 py-2.5 text-[0.9rem] font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] sm:inline-flex"
        >
          Kostenlose Beratung
        </a>
        <button
          type="button"
          aria-label="Menü öffnen"
          className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-[#222] shadow-sm md:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  </header>
);

export default HeaderV9;
