import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/siteContent";

// Alle Fragen in einer weissen Editorial-Card, ohne Themen-Filter — nur
// Accordion. Apple-Support-Anmutung.
const FaqV8 = () => (
  <section id="faq" className="bg-secondary/40 py-20 md:py-28">
    <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
      <div className="text-center">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.22em] text-primary">
          Häufige Fragen
        </p>
        <h2 className="mt-3 text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground">
          Alles, was Sie vor der Buchung wissen möchten.
        </h2>
      </div>

      <div className="mt-10 rounded-3xl bg-white p-2 shadow-sm ring-1 ring-border/60 sm:p-4 md:p-6">
        <ul className="divide-y divide-border/60">
          {faqItems.map((item, i) => (
            <li key={item.question}>
              <FaqRow question={item.question} answer={item.answer} defaultOpen={i === 0} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const FaqRow = ({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="px-3 sm:px-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="v8-press flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[1.05rem] font-semibold leading-snug tracking-[-0.005em] text-foreground md:text-[1.15rem]">
          {question}
        </span>
        <ChevronDown
          aria-hidden
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="text-[0.95rem] leading-relaxed text-muted-foreground md:text-[1rem]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqV8;
