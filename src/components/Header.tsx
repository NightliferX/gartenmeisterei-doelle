import { useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";
import HeaderV6 from "@/components/v6/HeaderV6";

const HeaderDefault = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href={withBase("/")} className="flex items-center gap-2 font-bold text-xl text-primary">
          <img
            src={withBase("/logo-gartenmeisterei.svg")}
            alt={`${siteConfig.brandName} Logo`}
            className="h-12 w-auto md:h-14"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={withBase(link.href)}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            Anrufen
          </a>
          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-primary transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <Button asChild className="shadow-sm">
            <a href={withBase("/#kontakt")}>Kostenlose Beratung</a>
          </Button>
        </div>

        {/* Mobile buttons */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={withBase(link.href)}
                onClick={() => setOpen(false)}
                className="py-3 px-4 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="mt-2">
              <a href={withBase("/#kontakt")} onClick={() => setOpen(false)}>
                Kostenlose Beratung
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

// Variante 6 bekommt die Apple-Produktnavigation — auf Start- und Unterseiten.
const Header = import.meta.env.VITE_THEME === "v6" ? HeaderV6 : HeaderDefault;

export default Header;
