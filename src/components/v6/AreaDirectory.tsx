import { ChevronRight } from "lucide-react";
import { areaPages, servicePages } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

const duesseldorf = servicePages.find((p) => p.serviceId === "gartenpflege");

const links = [
  ...(duesseldorf ? [{ label: "Düsseldorf", href: `/${duesseldorf.slug}` }] : []),
  ...areaPages.map((a) => ({ label: a.name.replace("Düsseldorf-", ""), href: `/${a.slug}` })),
];

const AreaDirectory = () => (
  <section
    id="einsatzgebiete"
    aria-labelledby="einsatzgebiete-titel"
    className="bg-secondary py-24 lg:py-32"
  >
    <div className="mx-auto max-w-[1024px] px-4 lg:px-6">
      <h2 id="einsatzgebiete-titel" className="v6-headline max-w-[20ch] text-foreground">
        Unterwegs in Düsseldorf und Umgebung.
      </h2>
      <nav aria-label="Einsatzgebiete" className="mt-10">
        <ul className="grid gap-x-8 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href} className="border-b border-border">
              <a
                href={withBase(link.href)}
                className="flex min-h-[3.25rem] items-center justify-between gap-2 text-[1.05rem] text-foreground transition-colors duration-150 hover:text-accent"
              >
                Gartenpflege {link.label}
                <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </section>
);

export default AreaDirectory;
