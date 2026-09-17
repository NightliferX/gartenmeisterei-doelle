import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/siteContent";
import { servicePages } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

const hrefFor = (serviceId: string) => {
  const page = servicePages.find((p) => p.serviceId === serviceId);
  return withBase(page ? `/${page.slug}` : "/#kontakt");
};

const ServiceIndex = () => {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="leistungen" className="pb-24 lg:pb-36">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(2.5rem,10vw,4.75rem)] leading-[0.95]">
            Was wir tun
          </h2>
          <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted-foreground">
            Sechs Leistungen, ein Anspruch: Ihr Garten sieht das ganze Jahr
            gepflegt aus. Schnittgut und Laub nehmen wir immer mit.
          </p>
        </div>

        {/* Mobil: Karten, die sich beim Scrollen übereinanderlegen */}
        <ul className="mt-10 lg:hidden">
          {services.map((service, index) => (
            <li
              key={service.id}
              className="sticky pb-4"
              style={{ top: `calc(4.75rem + ${index * 0.85}rem)` }}
            >
              <a
                href={hrefFor(service.id)}
                className="v5-press flex flex-col overflow-hidden rounded-[1.6rem] bg-foreground text-background shadow-[0_-16px_32px_-20px_hsl(var(--foreground)/0.7)]"
              >
                {/* Titel oben: beim Stapeln bleibt er am längsten sichtbar */}
                <div className="flex items-start justify-between gap-4 px-5 pt-5">
                  <h3 className="text-[1.85rem] leading-[0.95] text-background">
                    {service.title}
                  </h3>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 h-6 w-6 shrink-0 text-accent"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="px-5 pb-5 pt-3 text-sm leading-relaxed text-background/70">
                  {service.highlights.join(", ")}
                </p>
                <img
                  src={withBase(service.image)}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop: Leistungsverzeichnis mit mitlaufendem Bild */}
        <div className="mt-16 hidden gap-14 lg:grid lg:grid-cols-[1.15fr_1fr]">
          <ul className="border-t border-border">
            {services.map((service, index) => {
              const isActive = index === active;
              return (
                <li key={service.id} className="border-b border-border">
                  <a
                    href={hrefFor(service.id)}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setActive(index);
                    }}
                    onFocus={() => setActive(index)}
                    className="group flex items-center justify-between gap-6 py-7"
                  >
                    <span
                      className={`v5-display text-[clamp(2.1rem,3.2vw,3.2rem)] leading-none transition-colors duration-200 ease-out ${
                        isActive ? "text-foreground" : "text-foreground/30"
                      }`}
                    >
                      {service.title}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className={`h-8 w-8 shrink-0 transition-[opacity,transform] duration-200 ease-out ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="relative">
            <div className="sticky top-28 h-[min(72vh,660px)] overflow-hidden rounded-[2rem] bg-foreground">
              <AnimatePresence initial={false}>
                <motion.img
                  key={current.id}
                  src={withBase(current.image)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{
                    opacity: 0,
                    filter: "blur(8px)",
                    transform: "scale(1.04)",
                  }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    transform: "scale(1)",
                  }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent p-8 pt-28">
                <p className="max-w-[44ch] text-[15px] leading-relaxed text-background/85">
                  {current.description}
                </p>
                <p className="mt-3 text-sm text-accent">
                  {current.highlights.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceIndex;
