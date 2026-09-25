import { ArrowRight, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

// Barmer-Kontakt-Block: Lila BG mit weißem Text, weiße Buttons.
const CtaV10 = () => (
  <section id="kontakt" className="bg-white pb-24 pt-8 md:pb-32 md:pt-12">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="rounded-[32px] bg-[#7E3AE0] p-8 text-white md:p-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-white/75">
              Kontakt
            </p>
            <h2 className="mt-2 font-serif text-[clamp(2rem,3.8vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.01em]">
              Sagen Sie uns, was Ihr Garten braucht.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1.02rem] leading-relaxed text-white/90">
              Kostenlose Erstberatung vor Ort — wir schauen uns Ihren Garten
              an und schlagen einen passenden Plan vor.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="group flex items-center justify-between gap-4 rounded-full bg-white/10 py-4 pl-5 pr-4 backdrop-blur transition-colors hover:bg-white/20"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
                  <Phone className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="text-[1.02rem] font-semibold">{siteConfig.phone}</span>
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center justify-between gap-4 rounded-full bg-white/10 py-4 pl-5 pr-4 backdrop-blur transition-colors hover:bg-white/20"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
                  <Mail className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="text-[0.98rem] font-semibold">{siteConfig.email}</span>
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
            </a>
            <a
              href={withBase("/#kontakt")}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C5E86C] px-6 text-[0.98rem] font-semibold text-[#0F0F0F] transition-transform hover:scale-[1.02]"
            >
              Termin anfragen
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CtaV10;
