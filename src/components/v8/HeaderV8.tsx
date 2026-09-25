import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ChevronRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const links = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Gartenjahr", href: "/#gartenjahr" },
  { label: "So arbeiten wir", href: "/#projekte" },
  { label: "Meister", href: "/#meister" },
  { label: "Einsatzgebiete", href: "/#einsatzgebiete" },
  { label: "Kontakt", href: "/#kontakt" },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const HeaderV8 = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 220);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (wasOpenRef.current && !open) openerRef.current?.focus?.({ preventScroll: true });
    wasOpenRef.current = open;
  }, [open]);

  return (
    <>
      {/* Barmer-Style: der komplette Header schwebt als weisse Pill mit Rand */}
      <header
        className={`fixed inset-x-0 z-50 px-3 transition-[top] duration-300 sm:px-6 ${
          scrolled ? "top-2" : "top-4"
        }`}
      >
        <div
          className="v8-material mx-auto flex h-16 max-w-[1240px] items-center rounded-full px-3 shadow-[0_6px_28px_-8px_rgba(0,0,0,0.2)] sm:px-5"
        >
          {/* Logo normal ohne Umrahmung */}
          <a href={withBase("/")} className="flex items-center pl-1">
            <img
              src={withBase("/logo-gartenmeisterei.svg")}
              alt={siteConfig.brandName}
              className="h-11 w-auto"
            />
          </a>

          {/* Nav-Links mittig — Hover-Pille folgt der Maus via layoutId */}
          <LayoutGroup id="v8-nav-hover">
            <nav
              aria-label="Hauptnavigation"
              onMouseLeave={() => setHovered(null)}
              className="mx-auto hidden items-center gap-1 lg:flex"
            >
              {links.slice(0, 5).map((link) => (
                <a
                  key={link.href}
                  href={withBase(link.href)}
                  onMouseEnter={() => setHovered(link.href)}
                  onFocus={() => setHovered(link.href)}
                  onBlur={() => setHovered(null)}
                  className={`relative rounded-full px-4 py-2.5 text-[1rem] font-medium transition-colors duration-200 ${
                    hovered === link.href ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {hovered === link.href ? (
                    <motion.span
                      layoutId="v8-nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.6 }}
                      className="absolute inset-0 -z-10 rounded-full bg-primary"
                    />
                  ) : null}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </nav>
          </LayoutGroup>

          {/* CTA rechts (Desktop) + Hamburger (Mobile) */}
          <div className="ml-auto flex items-center gap-2">
            <a
              href={withBase("/#kontakt")}
              className="v8-press hidden h-11 items-center rounded-full bg-primary px-5 text-[0.95rem] font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 lg:inline-flex"
            >
              Kostenlose Beratung
            </a>
            <a
              href={withBase("/#kontakt")}
              className="v8-press inline-flex h-10 items-center rounded-full bg-primary px-4 text-[0.85rem] font-semibold text-primary-foreground lg:hidden"
            >
              Beratung
            </a>
            <button
              ref={openerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="v8-side-menu"
              aria-label="Menü öffnen"
              className="v8-press inline-flex h-11 w-11 items-center justify-center text-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open ? <SideMenu key="v8-side" firstLinkRef={firstLinkRef} onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
};

const SideMenu = ({ firstLinkRef, onClose }: { firstLinkRef: React.RefObject<HTMLAnchorElement>; onClose: () => void }) => (
  <div id="v8-side-menu" role="dialog" aria-modal="true" aria-label="Menü" className="fixed inset-0 z-[60] lg:hidden">
    <motion.button type="button" aria-label="Menü schließen" onClick={onClose}
      className="absolute inset-0 h-full w-full cursor-default bg-black/45 backdrop-blur-[6px]"
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.24, ease: EASE_OUT } }} exit={{ opacity: 0, transition: { duration: 0.18, ease: EASE_OUT } }} />
    <motion.aside className="absolute inset-y-0 right-0 flex h-[100dvh] w-[86%] max-w-[380px] flex-col bg-background shadow-[0_0_60px_-10px_rgba(0,0,0,0.35)]"
      initial={{ x: "100%" }} animate={{ x: "0%", transition: { type: "spring", stiffness: 380, damping: 42, mass: 0.9 } }} exit={{ x: "100%", transition: { duration: 0.24, ease: EASE_OUT } }}>
      <div className="flex h-16 items-center justify-between px-5">
        <span className="text-[1.05rem] font-semibold tracking-[-0.005em] text-foreground">Menü</span>
        <button type="button" onClick={onClose} aria-label="Menü schließen" className="v8-press inline-flex h-10 w-10 items-center justify-center text-foreground">
          <X className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
      <nav aria-label="Mobile Navigation" className="flex flex-1 flex-col justify-between overflow-y-auto px-5 pb-[env(safe-area-inset-bottom,1rem)]">
        <motion.ul className="mt-2 flex flex-col divide-y divide-border/70" initial="hidden" animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}>
          {links.map((link, i) => (
            <motion.li key={link.href} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE_OUT } } }}>
              <a ref={i === 0 ? firstLinkRef : undefined} href={withBase(link.href)} onClick={onClose}
                className="group flex items-center justify-between py-4 text-[1.5rem] font-semibold leading-tight tracking-[-0.008em] text-foreground">
                {link.label}
                <ChevronRight aria-hidden className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </a>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div className="mt-8 flex flex-col gap-3 pb-6" initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE_OUT, delay: 0.1 + links.length * 0.04 } }}>
          <a href={siteConfig.phoneHref} className="v8-press inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-[0.95rem] font-medium text-foreground">
            <Phone className="h-4 w-4" strokeWidth={2} />{siteConfig.phoneDisplay}
          </a>
          <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" className="v8-press inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-[0.95rem] font-medium text-foreground">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />WhatsApp
          </a>
          <a href={withBase("/#kontakt")} onClick={onClose} className="v8-press inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-[1rem] font-medium text-primary-foreground">
            Kostenlose Beratung anfragen
          </a>
        </motion.div>
      </nav>
    </motion.aside>
  </div>
);

export default HeaderV8;
