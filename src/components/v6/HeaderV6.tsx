import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const links = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Gartenjahr", href: "/#gartenjahr" },
  { label: "Vorher/Nachher", href: "/#projekte" },
  { label: "Kontakt", href: "/#kontakt" },
];

// Produkt-Navigation wie auf apple.com: durchscheinendes Material, Inhalt scrollt
// darunter; statt einer festen Linie erscheint die Kante erst beim Scrollen.
const HeaderV6 = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`v6-material transition-[box-shadow] duration-200 ${
          scrolled || open ? "shadow-[0_1px_0_hsl(var(--border)/0.7)]" : ""
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[1024px] items-center justify-between px-4 lg:px-6">
          <a
            href={withBase("/")}
            className="text-[1.3rem] font-semibold tracking-[0.01em] text-foreground"
          >
            {siteConfig.brandName}
          </a>

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={withBase(link.href)}
                className="text-[0.8rem] text-foreground/80 transition-colors duration-150 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={withBase("/#kontakt")}
              className="v6-press inline-flex h-7 items-center rounded-full bg-accent px-3.5 text-[0.8rem] font-medium text-accent-foreground"
            >
              Anfragen
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={withBase("/#kontakt")}
              className="v6-press inline-flex h-8 items-center rounded-full bg-accent px-3.5 text-[0.8rem] font-medium text-accent-foreground"
            >
              Anfragen
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className="v6-press inline-flex h-11 w-11 items-center justify-center text-foreground"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.nav
              aria-label="Mobile Navigation"
              className="overflow-hidden md:hidden"
              initial={{ opacity: 0, transform: "translateY(-8px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0, transform: "translateY(-8px)" }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <ul className="mx-auto flex max-w-[1024px] flex-col px-4 pb-6 pt-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={withBase(link.href)}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-[1.6rem] font-semibold leading-tight tracking-[0.004em] text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="mt-3 text-[0.9rem] text-muted-foreground">
                  <a href={siteConfig.phoneHref} className="v6-link">
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default HeaderV6;
