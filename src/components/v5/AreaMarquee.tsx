import { areaPages } from "@/lib/subpages";
import { withBase } from "@/lib/utils";

const names = [
  "Düsseldorf",
  ...areaPages.map((a) => a.name.replace("Düsseldorf-", "")),
];

const Leaf = () => (
  <svg
    viewBox="0 0 24 24"
    className="mx-6 h-7 w-7 shrink-0 text-accent lg:mx-10 lg:h-10 lg:w-10"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M5 19c0-8 5.5-13.5 15-14-.5 9.5-6 15-14 15H5v-1Zm2.2-.9c2.9-3.9 5.7-6.7 9.3-9.2-4.2 1.7-7.4 4.8-9.3 9.2Z"
    />
  </svg>
);

const Row = () => (
  <div className="flex shrink-0 items-center">
    {names.map((name) => (
      <span key={name} className="flex items-center">
        <span className="v5-display whitespace-nowrap text-[clamp(2.75rem,11vw,7rem)] leading-none text-background">
          {name}
        </span>
        <Leaf />
      </span>
    ))}
  </div>
);

const AreaMarquee = () => (
  <section
    id="einsatzgebiete"
    aria-labelledby="einsatzgebiete-titel"
    className="overflow-hidden bg-foreground py-20 lg:py-28"
  >
    <div className="mx-auto max-w-[1400px] px-4 lg:px-10">
      <h2
        id="einsatzgebiete-titel"
        className="text-[1.6rem] leading-tight text-background/70"
      >
        Unterwegs in
      </h2>
    </div>

    <div aria-hidden="true" className="mt-8 flex w-max v5-marquee">
      <Row />
      <Row />
    </div>

    <nav
      aria-label="Einsatzgebiete"
      className="mx-auto mt-10 max-w-[1400px] px-4 lg:px-10"
    >
      <ul className="flex flex-wrap gap-2">
        {areaPages.map((area) => (
          <li key={area.slug}>
            <a
              href={withBase(`/${area.slug}`)}
              className="v5-press inline-flex h-11 items-center rounded-full border border-background/20 px-4 text-sm text-background/80 transition-colors duration-200 hover:border-background/50 hover:text-background"
            >
              Gartenpflege {area.name.replace("Düsseldorf-", "")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </section>
);

export default AreaMarquee;
