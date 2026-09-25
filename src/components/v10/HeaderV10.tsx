import { Menu, Phone, Search } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Barmer-Style-Header: klare Corporate-Nav mit grünem Logo, Telefon
// prominent oben rechts, weiter Weißraum.
const HeaderV10 = () => (
  <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-white">
    {/* Info-Leiste oben — sehr Barmer */}
    <div className="hidden bg-[#F5F5F0] md:block">
      <div className="mx-auto flex h-9 max-w-[1240px] items-center justify-between px-4 text-[0.78rem] text-[#4D4D4D] sm:px-6">
        <span>Meisterbetrieb · Düsseldorf und Umgebung</span>
        <div className="flex items-center gap-5">
          <a href={withBase("/impressum")} className="hover:text-[#009B39]">Impressum</a>
          <a href={withBase("/datenschutz")} className="hover:text-[#009B39]">Datenschutz</a>
        </div>
      </div>
    </div>

    <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-4 sm:px-6">
      <a
        href={withBase("/")}
        className="flex items-center gap-3 font-semibold text-[#1B1B1B]"
      >
        <span className="grid h-11 w-11 place-items-center rounded-md bg-[#009B39] text-white">
          <span className="text-[1.35rem] font-bold leading-none">G</span>
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[1.05rem] font-bold tracking-tight text-[#009B39]">
            {siteConfig.brandName}
          </span>
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[#4D4D4D]">
            Gärtnermeister · Düsseldorf
          </span>
        </span>
      </a>

      <nav className="hidden items-center gap-6 lg:flex">
        {[
          { href: "/#leistungen", label: "Leistungen" },
          { href: "/#gartenjahr", label: "Gartenjahr" },
          { href: "/#meister", label: "Über uns" },
          { href: "/#einsatzgebiete", label: "Einsatzgebiete" },
          { href: "/#faq", label: "Häufige Fragen" },
        ].map((l) => (
          <a
            key={l.href}
            href={withBase(l.href)}
            className="text-[0.95rem] font-medium text-[#1B1B1B] hover:text-[#009B39]"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Suchen"
          className="hidden h-10 w-10 place-items-center rounded-full text-[#1B1B1B] hover:bg-black/[0.04] md:grid"
        >
          <Search className="h-5 w-5" strokeWidth={2} />
        </button>
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="hidden items-center gap-2 rounded-md border-2 border-[#009B39] px-4 py-2 text-[0.9rem] font-semibold text-[#009B39] hover:bg-[#009B39] hover:text-white sm:inline-flex"
        >
          <Phone className="h-4 w-4" strokeWidth={2.25} />
          {siteConfig.phone}
        </a>
        <button
          type="button"
          aria-label="Menü"
          className="grid h-11 w-11 place-items-center rounded-md border border-black/10 lg:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  </header>
);

export default HeaderV10;
