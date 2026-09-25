import { Menu, Search, User } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Barmer-Header: hellblauer Info-Balken oben mit lila CTA, darunter die
// weiße Nav-Leiste mit rundem Logo-Badge (G statt B), Suche & Menü.
const HeaderV10 = () => (
  <header className="sticky top-0 z-40 w-full">
    {/* Info-Balken hellblau — sehr Barmer */}
    <div className="hidden bg-[#E5F1FA] md:block">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid h-6 w-6 place-items-center rounded-full border border-[#0F0F0F] text-[0.75rem] font-bold">
            i
          </span>
          <div className="max-w-[52ch]">
            <p className="text-[0.95rem] font-semibold text-[#0F0F0F]">
              Feste Pflegetermine für die ganze Saison — sichern Sie sich Ihren
              Wunschtermin.
            </p>
          </div>
        </div>
        <a
          href={withBase("/#kontakt")}
          className="inline-flex items-center gap-2 rounded-full bg-[#7E3AE0] px-5 py-2.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-[#6B2FC7]"
        >
          Termin anfragen
        </a>
      </div>
    </div>

    <div className="bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-4 sm:px-6">
        <a href={withBase("/")} className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#C5E86C] font-serif text-[1.5rem] font-bold text-[#0F0F0F]">
            G
          </span>
          <span className="text-[1.05rem] font-serif font-semibold tracking-tight text-[#0F0F0F]">
            {siteConfig.brandName}
          </span>
        </a>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Suchen"
            className="hidden h-11 w-11 place-items-center rounded-full text-[#0F0F0F] hover:bg-black/[0.04] md:grid"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Kunden-Login"
            className="hidden h-11 w-11 place-items-center rounded-full text-[#0F0F0F] hover:bg-black/[0.04] md:grid"
          >
            <User className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Menü"
            className="grid h-11 w-11 place-items-center rounded-full text-[#0F0F0F] hover:bg-black/[0.04]"
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  </header>
);

export default HeaderV10;
