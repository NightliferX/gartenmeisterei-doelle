import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import { gartenjahr, monthRange, services, siteConfig } from "@/lib/siteContent";
import { areaPages } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

const serviceSlugFor = (id: string) =>
  ({
    gartenpflege: "gartenpflege-duesseldorf",
    heckenschnitt: "heckenschnitt-duesseldorf",
    baumschnitt: "baumschnitt-duesseldorf",
    rasenpflege: "rasenpflege-duesseldorf",
    herbst: "laubentsorgung-duesseldorf",
    saison: "winterservice-duesseldorf",
  }[id] ?? id);

// Mega-Menü-Struktur: die drei Nav-Punkte mit Unterseiten bekommen
// jeweils ein Dropdown-Panel auf Desktop und ein Accordion-Panel auf
// Mobile.
const megaMenus = [
  {
    key: "leistungen",
    label: "Leistungen",
    href: "/#leistungen",
    items: services.map((s) => ({
      label: s.title,
      href: `/${serviceSlugFor(s.id)}`,
      description: s.highlights?.[0],
    })),
  },
  {
    key: "gartenjahr",
    label: "Gartenjahr",
    href: "/#gartenjahr",
    items: gartenjahr.map((s) => ({
      label: `Gartenpflege im ${s.season}`,
      href: `/gartenpflege-${s.slug}`,
      description: `${monthRange(s.months)} · ${s.work}`,
    })),
  },
  {
    key: "einsatzgebiete",
    label: "Einsatzgebiete",
    href: "/#einsatzgebiete",
    twoColumns: true,
    items: areaPages.map((a) => ({
      label: a.name.replace("Düsseldorf-", ""),
      href: `/${a.slug}`,
      description: a.kind === "Stadtteil" ? "Düsseldorf" : "Umland",
    })),
  },
] as const;

// Zusatz-Nav-Punkte ohne Dropdown
const singleLinks = [
  { label: "Meister", href: "/#warum-wir" },
  { label: "Kontakt", href: "/#kontakt" },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const HeaderV8 = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
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
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 220);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (wasOpenRef.current && !mobileOpen) openerRef.current?.focus?.({ preventScroll: true });
    wasOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  // Delayed close: kleiner Puffer damit man von Button zu Panel wandern kann
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 px-3 transition-[top] duration-300 sm:px-6 ${
          scrolled ? "top-2" : "top-4"
        }`}
      >
        <div
          onMouseLeave={scheduleClose}
          className="v8-material relative mx-auto flex h-16 max-w-[1240px] items-center rounded-full px-3 shadow-[0_6px_28px_-8px_rgba(0,0,0,0.2)] sm:px-5"
        >
          {/* Logo */}
          <a href={withBase("/")} className="flex items-center pl-1">
            <img
              src={withBase("/logo-gartenmeisterei.svg")}
              alt={siteConfig.brandName}
              className="h-11 w-auto"
            />
          </a>

          {/* Desktop-Nav mit Mega-Menü-Dropdowns */}
          <nav
            aria-label="Hauptnavigation"
            className="mx-auto hidden items-center gap-1 lg:flex"
          >
            {megaMenus.map((menu) => {
              const isActive = activeMenu === menu.key;
              return (
                <div
                  key={menu.key}
                  onMouseEnter={() => {
                    cancelClose();
                    setActiveMenu(menu.key);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-haspopup="true"
                    onFocus={() => setActiveMenu(menu.key)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[1rem] font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-black/[0.04]"
                    }`}
                  >
                    {menu.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isActive ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.25}
                    />
                  </button>
                </div>
              );
            })}
            {singleLinks.map((link) => (
              <a
                key={link.href}
                href={withBase(link.href)}
                onMouseEnter={() => setActiveMenu(null)}
                onFocus={() => setActiveMenu(null)}
                className="rounded-full px-4 py-2.5 text-[1rem] font-medium text-foreground transition-colors hover:bg-black/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </nav>

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
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="v8-side-menu"
              aria-label="Menü öffnen"
              className="v8-press inline-flex h-11 w-11 items-center justify-center text-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          {/* Mega-Menü-Panel — Desktop only */}
          <AnimatePresence>
            {activeMenu ? (
              <motion.div
                key={activeMenu}
                initial={{ opacity: 0, y: 4 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.18, ease: EASE_OUT },
                }}
                exit={{
                  opacity: 0,
                  y: 4,
                  transition: { duration: 0.14, ease: EASE_OUT },
                }}
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                className="absolute left-1/2 top-full z-50 mt-2 hidden w-[min(720px,calc(100vw-3rem))] -translate-x-1/2 lg:block"
              >
                <div className="v8-material rounded-[1.5rem] p-6 shadow-[0_20px_48px_-16px_rgba(0,0,0,0.25)]">
                  {megaMenus.map((menu) => {
                    if (menu.key !== activeMenu) return null;
                    return (
                      <div key={menu.key}>
                        <div className="mb-4 flex items-baseline justify-between">
                          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            {menu.label}
                          </p>
                          <a
                            href={withBase(menu.href)}
                            className="text-[0.85rem] font-semibold text-primary hover:underline"
                          >
                            Übersicht →
                          </a>
                        </div>
                        <ul
                          className={
                            menu.twoColumns
                              ? "grid gap-1 sm:grid-cols-2"
                              : "grid gap-1"
                          }
                        >
                          {menu.items.map((item) => (
                            <li key={item.href}>
                              <a
                                href={withBase(item.href)}
                                className="group flex items-start justify-between gap-3 rounded-xl p-3 transition-colors hover:bg-primary/[0.06]"
                              >
                                <div className="min-w-0">
                                  <p className="text-[0.98rem] font-semibold text-foreground group-hover:text-primary">
                                    {item.label}
                                  </p>
                                  {item.description ? (
                                    <p className="mt-0.5 truncate text-[0.82rem] text-muted-foreground">
                                      {item.description}
                                    </p>
                                  ) : null}
                                </div>
                                <ChevronRight
                                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                                  strokeWidth={2.25}
                                />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <SideMenu
            key="v8-side"
            firstLinkRef={firstLinkRef}
            onClose={() => setMobileOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

const SideMenu = ({
  firstLinkRef,
  onClose,
}: {
  firstLinkRef: React.RefObject<HTMLAnchorElement>;
  onClose: () => void;
}) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div
      id="v8-side-menu"
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
        className="absolute inset-y-0 right-0 flex h-[100dvh] w-[92%] max-w-[420px] flex-col bg-background shadow-[0_0_60px_-10px_rgba(0,0,0,0.35)]"
        initial={{ x: "100%" }}
        animate={{
          x: "0%",
          transition: { type: "spring", stiffness: 380, damping: 42, mass: 0.9 },
        }}
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
            className="v8-press inline-flex h-10 w-10 items-center justify-center text-foreground"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
        <nav
          aria-label="Mobile Navigation"
          className="flex flex-1 flex-col overflow-y-auto px-5 pb-[env(safe-area-inset-bottom,1rem)]"
        >
          <ul className="mt-2 flex flex-col divide-y divide-border/70">
            {megaMenus.map((menu, i) => {
              const isOpen = expanded === menu.key;
              return (
                <li key={menu.key} className="py-1">
                  <button
                    ref={i === 0 ? (firstLinkRef as any) : undefined}
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : menu.key)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-3 text-left text-[1.3rem] font-semibold tracking-[-0.005em] text-foreground"
                  >
                    {menu.label}
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: { duration: 0.22, ease: EASE_OUT },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: { duration: 0.18, ease: EASE_OUT },
                        }}
                        className="overflow-hidden"
                      >
                        <li>
                          <a
                            href={withBase(menu.href)}
                            onClick={onClose}
                            className="block py-2.5 text-[0.92rem] font-semibold text-primary"
                          >
                            → Übersicht
                          </a>
                        </li>
                        {menu.items.map((item) => (
                          <li key={item.href}>
                            <a
                              href={withBase(item.href)}
                              onClick={onClose}
                              className="flex items-center justify-between py-2.5 text-[1rem] font-medium text-foreground"
                            >
                              {item.label}
                              <ChevronRight
                                className="h-4 w-4 text-muted-foreground"
                                strokeWidth={2}
                              />
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
            {singleLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={withBase(link.href)}
                  onClick={onClose}
                  className="flex items-center justify-between py-4 text-[1.3rem] font-semibold tracking-[-0.005em] text-foreground"
                >
                  {link.label}
                  <ChevronRight
                    className="h-5 w-5 text-muted-foreground"
                    strokeWidth={2}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-8 pb-6">
            <a
              href={siteConfig.phoneHref}
              className="v8-press inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-[0.95rem] font-medium text-foreground"
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="v8-press inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-[0.95rem] font-medium text-foreground"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              WhatsApp
            </a>
            <a
              href={withBase("/#kontakt")}
              onClick={onClose}
              className="v8-press inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-[1rem] font-medium text-primary-foreground"
            >
              Kostenlose Beratung anfragen
            </a>
          </div>
        </nav>
      </motion.aside>
    </div>
  );
};

export default HeaderV8;
