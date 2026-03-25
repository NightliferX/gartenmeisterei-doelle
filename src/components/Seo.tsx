import { useEffect } from "react";
import { siteConfig } from "@/lib/siteContent";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const setMetaTag = (
  selector: { name?: string; property?: string },
  content: string,
) => {
  const attribute = selector.name ? "name" : "property";
  const key = selector.name ?? selector.property ?? "";
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const Seo = ({ title, description, path = "/", image = siteConfig.ogImage, jsonLd }: SeoProps) => {
  useEffect(() => {
    const url = new URL(path, siteConfig.domain).toString();
    document.title = title;

    setMetaTag({ name: "description" }, description);
    setMetaTag({ property: "og:title" }, title);
    setMetaTag({ property: "og:description" }, description);
    setMetaTag({ property: "og:url" }, url);
    setMetaTag({ property: "og:image" }, image);
    setMetaTag({ property: "og:type" }, "website");
    setMetaTag({ name: "twitter:title" }, title);
    setMetaTag({ name: "twitter:description" }, description);
    setMetaTag({ name: "twitter:image" }, image);
    setMetaTag({ name: "twitter:card" }, "summary_large_image");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    const existingScripts = Array.from(
      document.head.querySelectorAll('script[data-seo-jsonld="true"]'),
    );
    existingScripts.forEach((script) => script.remove());

    if (jsonLd) {
      const payload = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      payload.forEach((entry) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.seoJsonld = "true";
        script.text = JSON.stringify(entry);
        document.head.appendChild(script);
      });
    }

    return () => {
      Array.from(document.head.querySelectorAll('script[data-seo-jsonld="true"]')).forEach(
        (script) => script.remove(),
      );
    };
  }, [description, image, jsonLd, path, title]);

  return null;
};

export default Seo;
