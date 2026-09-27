import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  Bug,
  CalendarDays,
  ChevronRight,
  Clock,
  Info,
  Leaf,
  Scissors,
  Sprout,
  TreePine,
} from "lucide-react";
import HeaderV8 from "@/components/v8/HeaderV8";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import BeratungCtaV8 from "@/components/v8/BeratungCtaV8";
import SkipToContent from "@/components/SkipToContent";
import { siteConfig } from "@/lib/siteContent";
import type { RatgeberPost } from "@/lib/ratgeber";
import { Link } from "react-router-dom";

// Ratgeber-Detail im Apple-Stil: Scroll-Spy-TOC (aktive Section wird
// live markiert), Kurzfassung als Material-Card mit backdrop-filter,
// Section-Nummerierung, saubere Typo-Farben (keine Opacity-Verdünnung),
// smooth-animierte FAQ, Hero mit Kategorie-Icon.

const kategorieIconFor: Record<string, typeof Leaf> = {
  Pflanzenschutz: Bug,
  Saison: Leaf,
  Baum: TreePine,
  Rasen: Sprout,
  Hecke: Scissors,
};

const RatgeberPage = ({ post }: { post: RatgeberPost }) => {
  const url = `${siteConfig.domain}/ratgeber/${post.slug}`;
  const updatedIso = post.updated;
  const KategorieIcon = kategorieIconFor[post.category] ?? Info;

  // Scroll-Spy: welche Section ist gerade im Viewport?
  const [activeSectionId, setActiveSectionId] = useState<string>(post.sections[0]?.id ?? "");
  useEffect(() => {
    const ids = [...post.sections.map((s) => s.id), "faq"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    // rootMargin verschiebt den Trigger-Bereich nach unten (Header-Höhe
    // + etwas Puffer), damit die als aktiv markierte Section die ist,
    // die gerade GELESEN wird, nicht die knapp unter dem Header.
    const observer = new IntersectionObserver(
      (entries) => {
        // Alle sichtbaren Kandidaten sammeln, den obersten wählen —
        // stabiler als naive first-match.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        if (visible[0]) {
          setActiveSectionId(visible[0].id);
        }
      },
      {
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [post.sections]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.h1,
      description: post.metaDescription,
      datePublished: post.updated,
      dateModified: post.updated,
      inLanguage: "de-DE",
      author: {
        "@type": "Person",
        "@id": `${siteConfig.domain}/#benedikt`,
        name: siteConfig.ownerName,
      },
      publisher: { "@id": `${siteConfig.domain}/#business` },
      mainEntityOfPage: url,
      articleSection: post.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: siteConfig.domain },
        {
          "@type": "ListItem",
          position: 2,
          name: "Ratgeber",
          item: `${siteConfig.domain}/ratgeber`,
        },
        { "@type": "ListItem", position: 3, name: post.h1, item: url },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={post.metaTitle}
        description={post.metaDescription}
        path={`/ratgeber/${post.slug}`}
        jsonLd={jsonLd}
      />
      <div className="ratgeber-v4 min-h-screen bg-background">
        <SkipToContent />
        <HeaderV8 />
        <main id="main">
          {/* Hero im V4-Look: Inter Tight, sehr grosse Headline, weicher
              cremiger Hintergrund, Eyebrow ohne Uppercase, Rise-Animation. */}
          <section className="rv4-section bg-secondary/40 pt-32 md:pt-40">
            <div className="mx-auto max-w-[900px] px-4 sm:px-6">
              <div className="rv4-rise flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                  <KategorieIcon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                </span>
                <p className="rv4-eyebrow text-primary">{post.category}</p>
              </div>
              <h1 className="rv4-rise-2 mt-8 text-[clamp(2.4rem,5.2vw,3.6rem)] leading-[1.02] text-foreground">
                {post.h1}
              </h1>
              <p className="rv4-rise-3 mt-7 max-w-[62ch] text-[1.15rem] leading-[1.55] text-muted-foreground md:text-[1.28rem] md:leading-[1.5]">
                {post.lead}
              </p>
              <div className="rv4-rise-3 mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9rem] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" strokeWidth={2} aria-hidden />
                  Zuletzt geprüft:{" "}
                  {new Date(updatedIso).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" strokeWidth={2} aria-hidden />
                  {post.readingMinutes} Minuten Lesezeit
                </span>
              </div>
            </div>
          </section>

          {/* Kurzfassung als V4-Card: transparente Border, weicher zweischichtiger
              Schatten, Radius 1.4rem, viel Innenluft. */}
          <section className="bg-background py-14 md:py-20">
            <div className="mx-auto max-w-[900px] px-4 sm:px-6">
              <div className="rv4-card p-7 md:p-10">
                <p className="rv4-eyebrow inline-flex items-center gap-2 text-primary">
                  <Info className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                  Die Kurzfassung
                </p>
                <ul className="mt-5 space-y-3 text-[1rem] leading-[1.6] text-foreground md:text-[1.05rem]">
                  {post.summary.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Sticky-TOC + Content mit Scroll-Spy */}
          <section className="bg-background pb-24 md:pb-32">
            <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
              <aside className="hidden lg:block">
                <nav aria-label="Inhaltsverzeichnis" className="sticky top-28">
                  <p className="rv4-eyebrow">Inhalt</p>
                  <ol className="mt-5 space-y-1.5 text-[0.9rem]">
                    {post.sections.map((s, i) => {
                      const isActive = activeSectionId === s.id;
                      return (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className={`group -ml-3 flex gap-3 rounded-lg border-l-2 py-1.5 pl-3 pr-2 transition-colors ${
                              isActive
                                ? "border-primary text-foreground"
                                : "border-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground"
                            }`}
                          >
                            <span
                              className={`tabular-nums text-[0.78rem] leading-relaxed ${
                                isActive ? "font-semibold text-primary" : "text-primary/60"
                              }`}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`leading-snug ${
                                isActive ? "font-semibold" : "font-medium"
                              }`}
                            >
                              {s.heading}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                    <li>
                      <a
                        href="#faq"
                        className={`group -ml-3 flex gap-3 rounded-lg border-l-2 py-1.5 pl-3 pr-2 transition-colors ${
                          activeSectionId === "faq"
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        <span
                          className={`tabular-nums text-[0.78rem] leading-relaxed ${
                            activeSectionId === "faq" ? "font-semibold text-primary" : "text-primary/60"
                          }`}
                        >
                          {String(post.sections.length + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`leading-snug ${
                            activeSectionId === "faq" ? "font-semibold" : "font-medium"
                          }`}
                        >
                          Häufige Fragen
                        </span>
                      </a>
                    </li>
                  </ol>
                </nav>
              </aside>

              <article className="mx-auto w-full max-w-[740px]">
                {post.sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="mt-20 first:mt-0 scroll-mt-28 md:mt-28"
                  >
                    <p className="rv4-eyebrow text-primary/80">
                      Kapitel {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.08] text-foreground">
                      {section.heading}
                    </h2>
                    <div className="mt-8 space-y-5 text-[1.1rem] leading-[1.7] text-muted-foreground md:text-[1.15rem]">
                      {section.paragraphs.map((p) => (
                        <p key={p.slice(0, 40)}>{p}</p>
                      ))}
                    </div>
                    {section.list ? (
                      <ul className="mt-8 space-y-4">
                        {section.list.map((item) => (
                          <li
                            key={item.title ?? item.text.slice(0, 24)}
                            className="rv4-card p-6 md:p-7"
                          >
                            {item.title ? (
                              <p className="text-[1.02rem] font-semibold text-foreground md:text-[1.08rem]">
                                {item.title}
                              </p>
                            ) : null}
                            <p
                              className={`text-[1rem] leading-[1.65] text-muted-foreground md:text-[1.02rem] ${
                                item.title ? "mt-2.5" : ""
                              }`}
                            >
                              {item.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}

                {/* FAQ mit smooth expand — V4-Card als Container */}
                <section id="faq" className="mt-24 scroll-mt-28 md:mt-28">
                  <p className="rv4-eyebrow text-primary/80">
                    Kapitel {String(post.sections.length + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.08] text-foreground">
                    Häufige Fragen
                  </h2>
                  <div className="rv4-card mt-8 divide-y divide-border/40 p-2 sm:p-4">
                    {post.faq.map((item) => (
                      <FaqRow
                        key={item.question}
                        question={item.question}
                        answer={item.answer}
                      />
                    ))}
                  </div>
                </section>

                {post.disclaimer ? (
                  <p className="mt-16 border-t border-border/40 pt-7 text-[0.9rem] leading-[1.65] text-muted-foreground">
                    <span className="font-semibold text-foreground">Hinweis: </span>
                    {post.disclaimer}
                  </p>
                ) : null}

                {post.relatedLinks?.length ? (
                  <aside className="mt-20">
                    <p className="rv4-eyebrow text-primary">Passend dazu</p>
                    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                      {post.relatedLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            to={link.href}
                            className="rv4-card v8-press group flex items-center justify-between p-6"
                          >
                            <span className="text-[1.02rem] font-semibold leading-tight text-foreground group-hover:text-primary">
                              {link.label}
                            </span>
                            <ArrowRight
                              className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                              strokeWidth={2.25}
                              aria-hidden
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </aside>
                ) : null}
              </article>
            </div>
          </section>

          <BeratungCtaV8 />
        </main>
        <Footer />
      </div>
    </>
  );
};

// FAQ-Row mit smooth height-Transition (grid-rows-Trick) statt <details>.
// So bekommen wir das Apple-typische „materialisiert sich aus"-Feel
// statt eines abrupten Sprungs.
const FaqRow = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="px-3 sm:px-4">
      <button
        id={buttonId}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="v8-press flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[1.02rem] font-semibold leading-snug tracking-[-0.005em] text-foreground md:text-[1.08rem]">
          {question}
        </span>
        <ChevronRight
          aria-hidden
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-90" : ""
          }`}
          strokeWidth={2.25}
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div ref={contentRef} className="overflow-hidden">
          <p className="text-[0.98rem] leading-[1.65] text-muted-foreground md:text-[1rem]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatgeberPage;
