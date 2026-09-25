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

// Custom easing im iOS-Drawer-Stil: sofort spuerbar, weiches Auslaufen.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const HeaderV6 = () => {
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

  // Body-Scroll sperren, ESC schliesst, Fokus ins Panel fuehren
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 220);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  // Fokus zurueck zum Trigger, sobald das Menue schliesst (nicht beim Erstrender)
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

            <nav
              aria-label="Hauptnavigation"
              className="hidden items-center gap-7 md:flex"
            >
              {links.slice(0, 4).map((link) => (
                <a
                  key={link.href}
                  href={withBase(link.href)}
                  className="text-[0.85rem] text-foreground/80 transition-colors duration-150 hover:text-foreground"
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

            <div className="flex items-center gap-1.5 md:hidden">
              <a
                href={withBase("/#kontakt")}
                className="v6-press inline-flex h-8 items-center rounded-full bg-accent px-3.5 text-[0.8rem] font-medium text-accent-foreground"
              >
                Anfragen
              </a>
              <button
                ref={openerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="v6-side-menu"
                aria-label="Menü öffnen"
                className="v6-press inline-flex h-11 w-11 items-center justify-center text-foreground"
              >
                <Menu className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <SideMenu
            key="v6-side"
            firstLinkRef={firstLinkRef}
            onClose={() => setOpen(false)}
          />
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
    id="v6-side-menu"
    role="dialog"
    aria-modal="true"
    aria-label="Menü"
    className="fixed inset-0 z-[60] md:hidden"
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
      animate={{
        x: "0%",
        transition: { type: "spring", stiffness: 380, damping: 42, mass: 0.9 },
      }}
      exit={{
        x: "100%",
        transition: { duration: 0.24, ease: EASE_OUT },
      }}
    >
      <div className="flex h-14 items-center justify-between px-5">
        <span className="text-[1.05rem] font-semibold tracking-[0.01em] text-foreground">
          Menü
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Menü schließen"
          className="v6-press inline-flex h-10 w-10 items-center justify-center text-foreground"
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
            visible: {
              transition: { staggerChildren: 0.04, delayChildren: 0.1 },
            },
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
                className="group flex items-center justify-between py-4 text-[1.5rem] font-semibold leading-tight tracking-[-0.005em] text-foreground"
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
            transition: {
              duration: 0.42,
              ease: EASE_OUT,
              delay: 0.1 + links.length * 0.04,
            },
          }}
        >
          <a
            href={siteConfig.phoneHref}
            className="v6-press inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-[0.95rem] font-medium text-foreground"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="v6-press inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-[0.95rem] font-medium text-foreground"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            WhatsApp
          </a>
          <a
            href={withBase("/#kontakt")}
            onClick={onClose}
            className="v6-press inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-[1rem] font-medium text-accent-foreground"
          >
            Beratung anfragen
          </a>
        </motion.div>
      </nav>
    </motion.aside>
  </div>
);

export default HeaderV6;
