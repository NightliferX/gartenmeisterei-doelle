import { faqItems } from "@/lib/siteContent";

// Barmer FAQ-Accordion-Look: klar strukturiert, große Fragen, kein
// Bling. Nutzt native <details>.
const FaqV10 = () => (
  <section id="faq" className="bg-[#F8F8F5] py-20 md:py-24">
    <div className="mx-auto max-w-[880px] px-4 sm:px-6">
      <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#009B39]">
        Häufige Fragen
      </p>
      <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.01em] text-[#1B1B1B]">
        Antworten auf Ihre Fragen.
      </h2>

      <div className="mt-10 divide-y divide-black/[0.08] border-y border-black/[0.08]">
        {faqItems.slice(0, 6).map((item) => (
          <details
            key={item.question}
            className="group py-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[1.02rem] font-semibold text-[#1B1B1B] hover:text-[#009B39]">
              {item.question}
              <span
                aria-hidden
                className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#009B39] text-[#009B39] transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 pr-8 text-[0.98rem] leading-relaxed text-[#4D4D4D]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FaqV10;
