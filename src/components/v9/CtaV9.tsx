import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Warmer Rausch-CTA im Airbnb-Stil — großzügig, mit weichen Rundungen.
const CtaV9 = () => (
  <section id="kontakt" className="bg-white pb-24 pt-8 md:pb-32 md:pt-12">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="rounded-[24px] bg-[#FF5A5F] p-8 text-white shadow-[0_16px_48px_-16px_rgba(255,90,95,0.45)] md:p-12">
        <div className="grid gap-8 md:grid-cols-[1.35fr_1fr] md:items-end">
          <div>
            <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-white/85">
              Beratung
            </p>
            <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em]">
              Sagen Sie uns, was Ihr Garten braucht.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1.02rem] leading-relaxed text-white/90">
              Kostenlose Erstberatung vor Ort — wir schauen uns Ihren Garten
              an, hören zu und schlagen einen passenden Plan vor.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-[0.95rem] font-semibold text-[#FF5A5F] shadow-sm transition-transform hover:scale-[1.02]"
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-6 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/10"
            >
              {siteConfig.email}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CtaV9;
