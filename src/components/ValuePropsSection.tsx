import { valueProps } from "@/lib/siteContent";

const ValuePropsSection = () => {
  // V4 („Cinematic") verzichtet auf diese Zwischensektion — die schwarze
  // Statement-Sektion im Hero übernimmt ihre Aussage.
  if (import.meta.env.VITE_THEME === "v4") return null;
  return (
    <section className="bg-background py-10 md:py-14">
      <div className="container px-4">
        <div className="grid gap-4 md:grid-cols-3">
          {valueProps.map((item, index) => (
            <div
              key={item.title}
              className="scroll-fade-in rounded-3xl border border-border/80 bg-card px-6 py-6 shadow-sm"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
