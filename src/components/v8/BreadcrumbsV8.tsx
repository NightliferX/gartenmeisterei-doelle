import { ChevronRight, Home } from "lucide-react";
import { withBase } from "@/lib/utils";

// Breadcrumbs im V8-Stil: dezente Zeile direkt unter dem Header-Bereich,
// klare Trenner, Home-Icon als erste Ebene. JSON-LD BreadcrumbList
// gleich mit ausliefern für SEO.
export type BreadcrumbItem = {
  label: string;
  href?: string; // letzter Eintrag hat kein href (aktuelle Seite)
};

const BreadcrumbsV8 = ({ items }: { items: BreadcrumbItem[] }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.href
        ? { item: `https://www.gartenmeisterei-doelle.de${item.href}` }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Sie sind hier"
        className="border-b border-black/[0.06] bg-background"
      >
        <ol className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-1.5 gap-y-1 px-4 py-3 text-[0.85rem] text-muted-foreground sm:px-6">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li
                key={item.label + idx}
                className="flex items-center gap-1.5"
              >
                {idx === 0 ? (
                  <Home
                    className="h-3.5 w-3.5 text-muted-foreground/70"
                    strokeWidth={2}
                    aria-hidden
                  />
                ) : null}
                {item.href && !isLast ? (
                  <a
                    href={withBase(item.href)}
                    className="rounded transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={
                      isLast
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast ? (
                  <ChevronRight
                    className="h-3.5 w-3.5 text-muted-foreground/40"
                    strokeWidth={2}
                    aria-hidden
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default BreadcrumbsV8;
