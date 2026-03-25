import { legalLinks, siteConfig } from "@/lib/siteContent";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="mb-5 inline-flex">
              <img
                src="/logo-haus-garten-profi-white.svg"
                alt={`${siteConfig.brandName} Logo`}
                className="h-14 w-auto"
              />
            </a>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Professionelle Haus- und Gartensanierung in Grevenbroich und Umgebung.
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="font-semibold mb-4">Leistungen</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="/#leistungen" className="hover:text-primary-foreground transition-colors">Haussanierung</a></li>
              <li><a href="/#leistungen" className="hover:text-primary-foreground transition-colors">Gartengestaltung</a></li>
              <li><a href="/#leistungen" className="hover:text-primary-foreground transition-colors">Innenausbau</a></li>
              <li><a href="/#leistungen" className="hover:text-primary-foreground transition-colors">Pflaster & Terrassen</a></li>
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h4 className="font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="/#ueber-uns" className="hover:text-primary-foreground transition-colors">Über Uns</a></li>
              <li><a href="/#projekte" className="hover:text-primary-foreground transition-colors">Referenzen</a></li>
              <li><a href="/#einsatzgebiete" className="hover:text-primary-foreground transition-colors">Einsatzgebiete</a></li>
              <li><a href="/#kontakt" className="hover:text-primary-foreground transition-colors">Kontakt</a></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
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

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/40">
          <p>© {new Date().getFullYear()} Haus&Garten Profi. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a href={legalLinks.impressum} className="hover:text-primary-foreground transition-colors">Impressum</a>
            <a href={legalLinks.datenschutz} className="hover:text-primary-foreground transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
