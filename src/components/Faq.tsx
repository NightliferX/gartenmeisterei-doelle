import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/siteContent";

const Faq = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl">
          <div className="scroll-fade-in text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              FAQ
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Häufige Fragen zur Gartenpflege
            </h2>
            <p className="mt-4 text-muted-foreground">
              Diese Antworten helfen bei der ersten Einordnung. Für Details
              beraten wir Sie gern persönlich.
            </p>
          </div>

          <div className="scroll-fade-in mt-12 rounded-3xl border bg-card px-6 py-3 shadow-sm md:px-8">
            <Accordion type="single" collapsible>
              {faqItems.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
