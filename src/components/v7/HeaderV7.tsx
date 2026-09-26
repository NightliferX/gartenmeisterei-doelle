import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const links = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Gartenjahr", href: "/#gartenjahr" },
  { label: "Projekte", href: "/#projekte" },
  { label: "Meister", href: "/#meister" },
  { label: "Einsatzgebiete", href: "/#einsatzgebiete" },
  { label: "Kontakt", href: "/#kontakt" },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Apple-Materialitaet mit Design-1-Farben, Seiten-Drawer wie in V6.
const HeaderV7 = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 220);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      openerRef.current?.focus?.({ preventScroll: true });
    }
    wasOpenRef.current = open;
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`v7-material transition-[box-shadow] duration-200 ${
            scrolled || open ? "shadow-[0_1px_0_hsl(var(--border)/0.7)]" : ""
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 lg:px-6">
            <a href={withBase("/")} className="flex items-center gap-2">
              <img
                src={withBase("/logo-gaertnermeister-doelle.png")}
                alt={`${siteConfig.brandName} Logo`}
                className="h-10 w-auto md:h-11"
              />
              <span className="hidden text-[1rem] font-semibold tracking-[-0.005em] text-foreground sm:inline">
                {siteConfig.brandName}
              </span>
            </a>

            <nav
              aria-label="Hauptnavigation"
              className="hidden items-center gap-7 lg:flex"
            >
              {links.slice(0, 5).map((link) => (
                <a
                  key={link.href}
                  href={withBase(link.href)}
                  className="text-[0.9rem] font-medium text-foreground/75 transition-colors duration-150 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={withBase("/#kontakt")}
                className="v7-press inline-flex h-9 items-center rounded-full bg-primary px-4 text-[0.85rem] font-semibold text-primary-foreground shadow-sm"
              >
                Kostenlose Beratung
              </a>
            </nav>

            <div className="flex items-center gap-1.5 lg:hidden">
              <a
                href={withBase("/#kontakt")}
                className="v7-press inline-flex h-9 items-center rounded-full bg-primary px-3.5 text-[0.8rem] font-semibold text-primary-foreground"
              >
                Beratung
              </a>
              <button
                ref={openerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="v7-side-menu"
                aria-label="Menü öffnen"
                className="v7-press inline-flex h-11 w-11 items-center justify-center text-foreground"
              >
                <Menu className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <SideMenu key="v7-side" firstLinkRef={firstLinkRef} onClose={() => setOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
};

type SideMenuProps = {
  firstLinkRef: React.RefObject<HTMLAnchorElement>;
  onClose: () => void;
};

const SideMenu = ({ firstLinkRef, onClose }: SideMenuProps) => (
  <div
    id="v7-side-menu"
    role="dialog"
    aria-modal="true"
    aria-label="Menü"
    className="fixed inset-0 z-[60] lg:hidden"
  >
    <motion.button
      type="button"
      aria-label="Menü schließen"
      onClick={onClose}
      className="absolute inset-0 h-full w-full cursor-default bg-black/45 backdrop-blur-[6px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.24, ease: EASE_OUT } }}
      exit={{ opacity: 0, transition: { duration: 0.18, ease: EASE_OUT } }}
    />
    <motion.aside
      className="absolute inset-y-0 right-0 flex h-[100dvh] w-[86%] max-w-[380px] flex-col bg-background shadow-[0_0_60px_-10px_rgba(0,0,0,0.35)]"
      initial={{ x: "100%" }}
      animate={{ x: "0%", transition: { type: "spring", stiffness: 380, damping: 42, mass: 0.9 } }}
      exit={{ x: "100%", transition: { duration: 0.24, ease: EASE_OUT } }}
    >
      <div className="flex h-16 items-center justify-between px-5">
        <span className="text-[1.05rem] font-semibold tracking-[-0.005em] text-foreground">
          Menü
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Menü schließen"
          className="v7-press inline-flex h-10 w-10 items-center justify-center text-foreground"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
      <nav
        aria-label="Mobile Navigation"
        className="flex flex-1 flex-col justify-between overflow-y-auto px-5 pb-[env(safe-area-inset-bottom,1rem)]"
      >
        <motion.ul
          className="mt-2 flex flex-col divide-y divide-border/70"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
          }}
        >
          {links.map((link, i) => (
            <motion.li
              key={link.href}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.32, ease: EASE_OUT },
                },
              }}
            >
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={withBase(link.href)}
                onClick={onClose}
                className="group flex items-center justify-between py-4 text-[1.5rem] font-semibold leading-tight tracking-[-0.008em] text-foreground"
              >
                {link.label}
                <ChevronRight
                  aria-hidden
                  className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          className="mt-8 flex flex-col gap-3 pb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.42, ease: EASE_OUT, delay: 0.1 + links.length * 0.04 },
          }}
        >
          <a
            href={siteConfig.phoneHref}
            className="v7-press inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-[0.95rem] font-medium text-foreground"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="v7-press inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-[0.95rem] font-medium text-foreground"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            WhatsApp
          </a>
          <a
            href={withBase("/#kontakt")}
            onClick={onClose}
            className="v7-press inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-[1rem] font-medium text-primary-foreground"
          >
            Kostenlose Beratung anfragen
          </a>
        </motion.div>
      </nav>
    </motion.aside>
  </div>
);

export default HeaderV7;
