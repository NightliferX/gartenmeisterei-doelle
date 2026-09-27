import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ChevronDown, ChevronRight, Flower2, Leaf, Menu, MessageCircle, Phone, Snowflake, Sun, X } from "lucide-react";
import {
  currentMonatsEmpfehlung,
  currentMonthName,
  currentSaison,
  gartenjahr,
  monthRange,
  services,
  siteConfig,
} from "@/lib/siteContent";
import { areaPages, serviceSlugFor } from "@/lib/subpages";
import { oeffneBeratung } from "@/components/v8/BeratungCtaV8";

// Mega-Menü-Struktur: die drei Nav-Punkte mit Unterseiten bekommen
// jeweils ein Dropdown-Panel auf Desktop und ein Accordion-Panel auf
// Mobile.
const megaMenus = [
  {
    key: "leistungen",
    label: "Leistungen",
    href: "/leistungen",
    items: services.map((s) => ({
      label: s.title,
      href: `/${serviceSlugFor(s.id)}`,
      description: s.highlights?.[0],
    })),
  },
  {
    key: "gartenjahr",
    label: "Gartenjahr",
    href: "/gartenjahr",
    items: gartenjahr.map((s) => ({
      label: `Gartenpflege im ${s.season}`,
      href: `/gartenpflege-${s.slug}`,
      description: `${monthRange(s.months)} · ${s.work}`,
    })),
  },
  {
    key: "einsatzgebiete",
    label: "Einsatzgebiete",
    href: "/einsatzgebiete",
    twoColumns: true,
    items: areaPages.map((a) => ({
      label: a.name.replace("Düsseldorf-", ""),
      href: `/${a.slug}`,
      description: a.kind === "Stadtteil" ? "Düsseldorf" : "Umland",
    })),
  },
] as const;

// Zusatz-Nav-Punkte ohne Dropdown. Mischung aus Anker-Links (mit #, per
// handleAnchorClick smooth-scrollt) und echten Routen (per Link ohne
// Full-Page-Reload).
const singleLinks = [
  { label: "Meister", href: "/#warum-wir" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Kontakt", href: "/#kontakt" },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Saison-Icon je Slug fuer das „Jetzt aktuell"-Highlight im Mega-Menu.
const saisonIconFor = {
  fruehjahr: Flower2,
  sommer: Sun,
  herbst: Leaf,
  winter: Snowflake,
} as const;

// Anker-Klick (/#hash) auf der Startseite: fixed Header ueberlappt den
// Section-Anfang, dazu koennen Sections mit content-visibility auf dem
// Weg dahin die Zielhoehe verschieben. Loesung: nach dem naechsten
// Layout-Tick manuell smooth-scrollen. Ausserhalb der Startseite normal
// navigieren lassen, damit der Browser die Route wechselt.
const handleAnchorClick = (
  href: string,
  onClose?: () => void,
): React.MouseEventHandler<HTMLAnchorElement> => (e) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const cleanHref = href.startsWith(base) ? href.slice(base.length) : href;
  const match = cleanHref.match(/^\/?#(.+)$/);
  if (!match) {
    onClose?.();
    return;
  }
  const currentPath = window.location.pathname.replace(base, "") || "/";
  if (currentPath !== "/" && currentPath !== "") {
    onClose?.();
    return;
  }
  e.preventDefault();
  const targetId = match[1];
  onClose?.();
  // Zwei Frames Puffer: erst schliesst das Menue (Body-Overflow raus),
  // dann rechnet der Browser Layout und wir scrollen. Ohne den Puffer
  // landet der Anker bei Section mit spaeter Hoehen-Berechnung zu weit.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `${base || ""}/#${targetId}`);
      }
    });
  });
};

// smartAnchorClick als eigenstaendige Funktion, damit sowohl HeaderV8 als
// auch SideMenu sie benutzen koennen. Vorher war sie lokal in HeaderV8 und
// SideMenu warf ReferenceError beim Rendern -> React unmountete die ganze
// Seite -> weisse Seite auf Mobile beim Oeffnen des Hamburger-Menues.
const buildSmartAnchorClick = (
  navigate: (path: string) => void,
): ((href: string, onClose?: () => void) => React.MouseEventHandler<HTMLAnchorElement>) =>
  (href, onClose) => (e) => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const cleanHref = href.startsWith(base) ? href.slice(base.length) : href;
    const match = cleanHref.match(/^\/?#(.+)$/);
    if (!match) {
      onClose?.();
      return;
    }
    const currentPath = window.location.pathname.replace(base, "") || "/";
    if (currentPath === "/" || currentPath === "") {
      handleAnchorClick(href, onClose)(e);
      return;
    }
    e.preventDefault();
    onClose?.();
    navigate(`/#${match[1]}`);
  };

const HeaderV8 = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);
  const navigate = useNavigate();

  // Anker-Klick auf Sub-Pages: statt Full-Page-Reload per SPA-Navigation
  // zur Homepage mit Hash. Der ScrollToTop-Handler scrollt danach zum
  // Ziel-Element. Auf der Homepage macht handleAnchorClick weiter
  // seinen smooth-scroll direkt.
  const smartAnchorClick = buildSmartAnchorClick(navigate);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 8;
      setScrolled((prev) => (prev !== next ? next : prev));
    };
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
        onMouseLeave={scheduleClose}
        style={{
          top: scrolled ? "0.5rem" : "1rem",
        }}
        className="fixed inset-x-0 z-50 px-3 transition-[top] duration-300 sm:px-6"
      >
        <div
          className={`v8-material relative mx-auto flex h-16 max-w-[1240px] items-center rounded-full px-3 shadow-[0_6px_28px_-8px_rgba(0,0,0,0.2)] transition-colors duration-200 sm:px-5 ${
            hoveredNav || activeMenu ? "v8-material-solid" : ""
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center pl-1">
            <img
              src={`${import.meta.env.BASE_URL}logo.svg`.replace(/\/+/g, "/")}
              width={985}
              height={510}
              alt={siteConfig.brandName}
              className="h-11 w-auto md:h-12"
            />
          </Link>

          {/* Desktop-Nav mit Mega-Menü-Dropdowns + fließender Hover-Pille */}
          <LayoutGroup id="v8-nav-hover">
            <nav
              aria-label="Hauptnavigation"
              onMouseLeave={() => setHoveredNav(null)}
              className="mx-auto hidden items-center gap-1 lg:flex"
            >
              {megaMenus.map((menu) => {
                const isHovered = hoveredNav === menu.key;
                const isActive = activeMenu === menu.key;
                return (
                  <button
                    key={menu.key}
                    type="button"
                    aria-expanded={isActive}
                    aria-haspopup="true"
                    onMouseEnter={() => {
                      cancelClose();
                      setActiveMenu(menu.key);
                      setHoveredNav(menu.key);
                    }}
                    onFocus={() => {
                      setActiveMenu(menu.key);
                      setHoveredNav(menu.key);
                    }}
                    onBlur={() => setHoveredNav(null)}
                    onClick={() => {
                      // Touch/Tablet-Fix: iPad im Landscape zeigt die
                      // Desktop-Nav, hat aber keinen Hover. Klick togglet
                      // das Menü, damit es überhaupt aufgeht.
                      cancelClose();
                      if (isActive) {
                        setActiveMenu(null);
                        setHoveredNav(null);
                      } else {
                        setActiveMenu(menu.key);
                        setHoveredNav(menu.key);
                      }
                    }}
                    className={`relative isolate inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[1rem] font-medium transition-colors duration-200 ${
                      isHovered ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {isHovered ? (
                      <motion.span
                        layoutId="v8-nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.6 }}
                        className="absolute inset-0 -z-10 rounded-full bg-primary"
                      />
                    ) : null}
                    <span className="relative">{menu.label}</span>
                    <ChevronDown
                      className={`relative h-4 w-4 transition-transform ${
                        isActive ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.25}
                    />
                  </button>
                );
              })}
              {singleLinks.map((link) => {
                const isHovered = hoveredNav === link.href;
                const isAnchor = link.href.includes("#");
                const commonHandlers = {
                  onMouseEnter: () => {
                    setActiveMenu(null);
                    setHoveredNav(link.href);
                  },
                  onFocus: () => {
                    setActiveMenu(null);
                    setHoveredNav(link.href);
                  },
                  onBlur: () => setHoveredNav(null),
                };
                const commonClass = `relative isolate rounded-full px-4 py-2.5 text-[1rem] font-medium transition-colors duration-200 ${
                  isHovered ? "text-primary-foreground" : "text-foreground"
                }`;
                const pill = isHovered ? (
                  <motion.span
                    layoutId="v8-nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.6 }}
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                  />
                ) : null;
                if (isAnchor) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={smartAnchorClick(link.href)}
                      className={commonClass}
                      {...commonHandlers}
                    >
                      {pill}
                      <span className="relative">{link.label}</span>
                    </a>
                  );
                }
                return (
                  <Link key={link.href} to={link.href} className={commonClass} {...commonHandlers}>
                    {pill}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>

          {/* CTA rechts (Desktop) + Hamburger (Mobile) */}
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={oeffneBeratung}
              className="v8-press hidden h-11 items-center rounded-full bg-primary px-5 text-[0.95rem] font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 lg:inline-flex"
            >
              Beratung anfragen
            </button>
            <button
              type="button"
              onClick={oeffneBeratung}
              className="v8-press inline-flex h-10 items-center rounded-full bg-primary px-4 text-[0.85rem] font-semibold text-primary-foreground lg:hidden"
            >
              Beratung
            </button>
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
        </div>

        {/* Apple-Style-Mega-Menü, sibling der Header-Pill, mittig zum
            Viewport auf max-w-[1240px]. Full-width Panel mit ruhigem Grid,
            großem Whitespace und Preview-Spalte rechts. */}
        <AnimatePresence>
          {activeMenu ? (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.22, ease: EASE_OUT },
              }}
              exit={{
                opacity: 0,
                y: 6,
                transition: { duration: 0.16, ease: EASE_OUT },
              }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="pointer-events-none absolute inset-x-0 top-full z-40 mt-3 hidden lg:block"
            >
              <div className="pointer-events-auto mx-auto max-w-[1240px] px-3 sm:px-6">
                <div className="v8-material v8-material-solid rounded-[1.75rem] p-8 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.28)]">
                  {megaMenus.map((menu) => {
                    if (menu.key !== activeMenu) return null;
                    return (
                      <div
                        key={menu.key}
                        className={`grid gap-10 ${
                          menu.twoColumns
                            ? "md:grid-cols-[2.2fr_1fr]"
                            : "md:grid-cols-[1.6fr_1fr]"
                        }`}
                      >
                        {/* Item-Grid, linke, breite Spalte */}
                        <div>
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {menu.label}
                          </p>
                          <ul
                            className={`mt-5 grid gap-1 ${
                              menu.twoColumns
                                ? "sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-5"
                                : "sm:grid-cols-2 sm:gap-x-8"
                            }`}
                          >
                            {menu.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  to={item.href}
                                  onClick={() => {
                                    setActiveMenu(null);
                                    setHoveredNav(null);
                                  }}
                                  className="group -mx-3 flex items-start justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-primary/[0.06]"
                                >
                                  <div className="min-w-0">
                                    <p className="text-[1rem] font-semibold leading-tight text-foreground group-hover:text-primary">
                                      {item.label}
                                    </p>
                                    {item.description ? (
                                      <p className="mt-1 truncate text-[0.85rem] leading-snug text-muted-foreground">
                                        {item.description}
                                      </p>
                                    ) : null}
                                  </div>
                                  <ChevronRight
                                    className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/60 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                                    strokeWidth={2.25}
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Preview / Übersicht, rechte, schmale Spalte */}
                        <div className="hidden flex-col justify-between rounded-2xl bg-primary/[0.06] p-6 md:flex">
                          <div>
                            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">
                              Übersicht
                            </p>
                            <p className="mt-3 text-[1.05rem] font-semibold leading-tight tracking-[-0.005em] text-foreground">
                              {menu.key === "leistungen" &&
                                "Alle Leistungen im Überblick."}
                              {menu.key === "gartenjahr" &&
                                "Was in welcher Saison ansteht."}
                              {menu.key === "einsatzgebiete" &&
                                "Wo wir für Sie arbeiten."}
                            </p>
                            <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">
                              {menu.key === "leistungen" &&
                                "Vom regelmäßigen Rasenschnitt bis zum kompletten Pflegevertrag, alles aus einer Hand."}
                              {menu.key === "gartenjahr" &&
                                "Der richtige Schnitt zur richtigen Zeit. Wir kennen den Takt."}
                              {menu.key === "einsatzgebiete" &&
                                "Düsseldorf komplett und das nahe Umland: 4 Stadtteile und 13 Umlandorte im festen Einsatzradius. Kurze Anfahrt macht regelmäßige Pflege wirtschaftlich, auch außerhalb der Stadtgrenze."}
                            </p>

                            {/* „Jetzt aktuell"-Highlight-Card mit Saison-Icon,
                                pulsierendem Live-Indikator und Farbakzent.
                                Nur für leistungen und gartenjahr, weil dort
                                der saisonale Deep-Link Sinn ergibt. */}
                            {menu.key === "leistungen" ? (() => {
                              const empf = currentMonatsEmpfehlung();
                              const saison = currentSaison();
                              const SaisonIcon = saison ? saisonIconFor[saison.slug as keyof typeof saisonIconFor] : Leaf;
                              return (
                                <div className="mt-6 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.12] via-primary/[0.05] to-transparent shadow-[0_2px_12px_-4px_rgba(47,96,48,0.15)]">
                                  <Link
                                    to={`/${empf.service.slug}`}
                                    onClick={() => {
                                      setActiveMenu(null);
                                      setHoveredNav(null);
                                    }}
                                    className="v8-press group flex items-start gap-3 p-4 transition-colors hover:bg-primary/[0.08]"
                                  >
                                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                                      <SaisonIcon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <span className="v8-jetzt-chip inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-primary-foreground">
                                        <span className="relative flex h-1.5 w-1.5">
                                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground/70 opacity-75" aria-hidden />
                                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-foreground" aria-hidden />
                                        </span>
                                        Jetzt aktuell
                                      </span>
                                      <p className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                                        Im {currentMonthName()}
                                      </p>
                                      <p className="mt-1 text-[0.98rem] font-semibold leading-snug text-foreground group-hover:text-primary">
                                        {empf.service.label}
                                      </p>
                                    </div>
                                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
                                  </Link>
                                </div>
                              );
                            })() : null}
                            {menu.key === "gartenjahr" ? (() => {
                              const saison = currentSaison();
                              const empf = currentMonatsEmpfehlung();
                              const SaisonIcon = saison ? saisonIconFor[saison.slug as keyof typeof saisonIconFor] : Leaf;
                              return (
                                <div className="mt-6 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.12] via-primary/[0.05] to-transparent shadow-[0_2px_12px_-4px_rgba(47,96,48,0.15)]">
                                  {saison ? (
                                    <Link
                                      to={`/gartenpflege-${saison.slug}`}
                                      onClick={() => {
                                        setActiveMenu(null);
                                        setHoveredNav(null);
                                      }}
                                      className="v8-press group flex items-start gap-3 p-4 transition-colors hover:bg-primary/[0.08]"
                                    >
                                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                                        <SaisonIcon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                                      </span>
                                      <div className="min-w-0 flex-1">
                                        <span className="v8-jetzt-chip inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-primary-foreground">
                                          <span className="relative flex h-1.5 w-1.5">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground/70 opacity-75" aria-hidden />
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-foreground" aria-hidden />
                                          </span>
                                          Jetzt gefragt
                                        </span>
                                        <p className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                                          Im {currentMonthName()}
                                        </p>
                                        <p className="mt-1 text-[0.98rem] font-semibold leading-snug text-foreground group-hover:text-primary">
                                          Gartenpflege im {saison.season}
                                        </p>
                                      </div>
                                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
                                    </Link>
                                  ) : null}
                                  {empf.ratgeber ? (
                                    <Link
                                      to={`/ratgeber/${empf.ratgeber.slug}`}
                                      onClick={() => {
                                        setActiveMenu(null);
                                        setHoveredNav(null);
                                      }}
                                      className="v8-press group flex items-center gap-2 border-t border-primary/15 px-4 py-3 text-[0.85rem] text-muted-foreground transition-colors hover:bg-primary/[0.08] hover:text-primary"
                                    >
                                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary">
                                        Ratgeber
                                      </span>
                                      <span className="truncate">{empf.ratgeber.label}</span>
                                      <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
                                    </Link>
                                  ) : null}
                                </div>
                              );
                            })() : null}
                          </div>
                          <Link
                            to={menu.href}
                            onClick={() => {
                              setActiveMenu(null);
                              setHoveredNav(null);
                            }}
                            className="mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-primary hover:underline"
                          >
                            Zur Übersicht
                            <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Barmer-Style-Backdrop: wenn irgendein Nav-Item gehovert wird
          oder ein Mega-Menü offen ist, wird der Rest der Seite gedimmt.
          Klick darauf schließt Menü + Hover-State. */}
      <AnimatePresence>
        {hoveredNav || activeMenu ? (
          <motion.button
            key="v8-nav-backdrop"
            type="button"
            aria-label="Menü schließen"
            onClick={() => {
              setActiveMenu(null);
              setHoveredNav(null);
            }}
            onMouseEnter={() => {
              scheduleClose();
              setHoveredNav(null);
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.22, ease: EASE_OUT },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.18, ease: EASE_OUT },
            }}
            className="fixed inset-0 z-30 hidden h-full w-full cursor-default bg-black/40 backdrop-blur-[3px] lg:block"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen ? (
          <SideMenu
            key="v8-side"
            firstLinkRef={firstLinkRef}
            onClose={() => setMobileOpen(false)}
            smartAnchorClick={smartAnchorClick}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

const SideMenu = ({
  firstLinkRef,
  onClose,
  smartAnchorClick,
}: {
  firstLinkRef: React.RefObject<HTMLElement>;
  onClose: () => void;
  smartAnchorClick: (href: string, onClose?: () => void) => React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus-Trap: Tab an letztem fokussierbarem Element springt zum ersten,
  // Shift+Tab am ersten Element springt zum letzten. Ohne Trap wandert
  // die Tastatur sonst hinter das Modal in die Seitenelemente.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={dialogRef}
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
                    ref={i === 0 ? (firstLinkRef as React.RefObject<HTMLButtonElement>) : undefined}
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
                          <Link
                            to={menu.href}
                            onClick={onClose}
                            className="block py-2.5 text-[0.92rem] font-semibold text-primary"
                          >
                            → Übersicht
                          </Link>
                        </li>
                        {menu.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              to={item.href}
                              onClick={onClose}
                              className="flex items-center justify-between py-2.5 text-[1rem] font-medium text-foreground"
                            >
                              {item.label}
                              <ChevronRight
                                className="h-4 w-4 text-muted-foreground"
                                strokeWidth={2}
                              />
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
            {singleLinks.map((link) => {
              const isAnchor = link.href.includes("#");
              const className =
                "flex items-center justify-between py-4 text-[1.3rem] font-semibold tracking-[-0.005em] text-foreground";
              const inner = (
                <>
                  {link.label}
                  <ChevronRight className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
                </>
              );
              return (
                <li key={link.href}>
                  {isAnchor ? (
                    <a
                      href={link.href}
                      onClick={smartAnchorClick(link.href, onClose)}
                      className={className}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link to={link.href} onClick={onClose} className={className}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
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
            <button
              type="button"
              onClick={() => {
                onClose();
                oeffneBeratung();
              }}
              className="v8-press inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-[1rem] font-medium text-primary-foreground"
            >
              Beratung anfragen
            </button>
          </div>
        </nav>
      </motion.aside>
    </div>
  );
};

export default HeaderV8;
