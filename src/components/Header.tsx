import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Projekte", href: "#projekte" },
  { label: "Über Uns", href: "#ueber-uns" },
  { label: "Bewertungen", href: "#bewertungen" },
  { label: "Kontakt", href: "#kontakt" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span className="text-2xl">🌿</span>
          <span>Haus&Garten Profi</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+4921812345678" className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            Anrufen
          </a>
          <Button asChild>
            <a href="#kontakt">Kostenlose Beratung</a>
          </Button>
        </div>

        {/* Mobile buttons */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="tel:+4921812345678"
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
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 px-4 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="mt-2">
              <a href="#kontakt" onClick={() => setOpen(false)}>Kostenlose Beratung</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
