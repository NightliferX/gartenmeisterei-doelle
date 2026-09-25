import { faqItems } from "@/lib/siteContent";

// Barmer FAQ: klare Trennlinien, große Headlines in Serif, Accordion-Icon
// als lila Plus-Kreis.
const FaqV10 = () => (
  <section id="faq" className="bg-white py-20 md:py-24">
    <div className="mx-auto max-w-[880px] px-4 sm:px-6">
      <p className="text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-[#7E3AE0]">
        Häufige Fragen
      </p>
      <h2 className="mt-2 font-serif text-[clamp(2rem,3.8vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.01em] text-[#0F0F0F]">
        Antworten auf Ihre Fragen.
      </h2>

      <div className="mt-10 divide-y divide-black/[0.1] border-y border-black/[0.1]">
        {faqItems.slice(0, 6).map((item) => (
          <details
            key={item.question}
            className="group py-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-[1.1rem] font-bold text-[#0F0F0F] hover:text-[#7E3AE0]">
              {item.question}
              <span
                aria-hidden
                className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F3E9FF] text-[#7E3AE0] transition-transform group-open:rotate-45"
              >
                <span className="text-[1.2rem] font-bold leading-none">+</span>
              </span>
            </summary>
            <p className="mt-3 pr-12 text-[0.98rem] leading-relaxed text-[#4A4A4A]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FaqV10;
