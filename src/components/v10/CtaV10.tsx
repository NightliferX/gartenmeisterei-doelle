import { ArrowRight, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Klassischer Barmer-Kontakt-Streifen: dunkelgrüner BG, Icon-Kontakt links,
// Formular-CTA rechts.
const CtaV10 = () => (
  <section id="kontakt" className="bg-[#004D1F] text-white">
    <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:gap-14 md:py-20">
      <div>
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-white/70">
          Kontakt
        </p>
        <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.01em]">
          Reden wir über Ihren Garten.
        </h2>
        <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-white/85">
          Rufen Sie uns an oder schreiben Sie uns kurz — wir vereinbaren einen
          kostenlosen Vor-Ort-Termin.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="group flex items-center justify-between gap-4 rounded-md border border-white/20 bg-white/[0.06] p-5 transition-colors hover:bg-white/[0.12]"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-white/10">
              <Phone className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <div>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/70">
                Direkt anrufen
              </p>
              <p className="mt-0.5 text-[1.08rem] font-bold">{siteConfig.phone}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="group flex items-center justify-between gap-4 rounded-md border border-white/20 bg-white/[0.06] p-5 transition-colors hover:bg-white/[0.12]"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-white/10">
              <Mail className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <div>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/70">
                E-Mail schreiben
              </p>
              <p className="mt-0.5 text-[1.02rem] font-semibold">{siteConfig.email}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </a>
        <a
          href={withBase("/#kontakt")}
          className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-[0.98rem] font-semibold text-[#004D1F] transition-transform hover:scale-[1.01]"
        >
          Beratung anfragen
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </a>
      </div>
    </div>
  </section>
);

export default CtaV10;
