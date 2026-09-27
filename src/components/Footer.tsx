import { Link } from "react-router-dom";
import { legalLinks, siteConfig } from "@/lib/siteContent";

const Footer = () => {
  const logoSrc = `${import.meta.env.BASE_URL}logo-weiss.svg`.replace(/\/+/g, "/");
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="mb-5 inline-flex">
              <img
                src={logoSrc}
                width={985}
                height={510}
                alt={`${siteConfig.brandName} Logo`}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Gartenpflege vom Gärtnermeister in Düsseldorf und Umgebung.
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="font-semibold mb-4">Leistungen</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/gartenpflege" className="hover:text-primary-foreground transition-colors">Gartenpflege</Link></li>
              <li><Link to="/heckenschnitt" className="hover:text-primary-foreground transition-colors">Heckenschnitt</Link></li>
              <li><Link to="/baumschnitt" className="hover:text-primary-foreground transition-colors">Baumschnitt</Link></li>
              <li><Link to="/rasenpflege" className="hover:text-primary-foreground transition-colors">Rasenpflege</Link></li>
              <li><Link to="/laubentsorgung" className="hover:text-primary-foreground transition-colors">Laubentsorgung</Link></li>
              <li><Link to="/winterservice" className="hover:text-primary-foreground transition-colors">Winterservice</Link></li>
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h4 className="font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/#warum-wir" className="hover:text-primary-foreground transition-colors">Über Uns</Link></li>
              <li><Link to="/#projekte" className="hover:text-primary-foreground transition-colors">Projekte</Link></li>
              <li><Link to="/#einsatzgebiete" className="hover:text-primary-foreground transition-colors">Einsatzgebiete</Link></li>
              <li><Link to="/ratgeber" className="hover:text-primary-foreground transition-colors">Ratgeber</Link></li>
              <li><Link to="/#kontakt" className="hover:text-primary-foreground transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>{siteConfig.streetAddress}</li>
              <li>{siteConfig.postalCode} {siteConfig.city}</li>
              <li className="pt-2">
                <a href={siteConfig.phoneHref} className="hover:text-primary-foreground transition-colors">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary-foreground transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link to={legalLinks.impressum} className="hover:text-primary-foreground transition-colors">Impressum</Link>
            <Link to={legalLinks.datenschutz} className="hover:text-primary-foreground transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
