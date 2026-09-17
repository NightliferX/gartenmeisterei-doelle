import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";
import { withBase } from "@/lib/utils";

const MeisterSection = () => (
  <section id="ueber-uns" aria-labelledby="meister-titel" className="py-24 lg:py-36">
    <div className="mx-auto max-w-[1024px] px-4 text-center lg:px-6">
      <p className="v6-eyebrow text-muted-foreground">{siteConfig.ownerName}, Gärtnermeister</p>
      <h2 id="meister-titel" className="v6-headline mx-auto mt-2 max-w-[16ch] text-foreground">
        Ein Gärtnermeister. Kein Callcenter.
      </h2>
      <p className="v6-lead mx-auto mt-5 max-w-[40ch] text-muted-foreground">
        Ich betreue Gärten in Düsseldorf und Umgebung persönlich — vom ersten
        Rückschnitt bis zur Pflege über das ganze Jahr.
      </p>
      <a href={withBase("/#kontakt")} className="v6-link mt-6 text-[1.05rem]">
        Garten ansehen lassen
        <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
      </a>
    </div>

    <div className="mx-auto mt-12 max-w-[1180px] px-4 lg:mt-16 lg:px-6">
      <img
        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80"
        alt="Zwei Hände halten Gartenerde mit einem jungen Trieb"
        loading="lazy"
        className="aspect-[4/5] w-full rounded-[28px] object-cover sm:aspect-[21/10]"
      />
    </div>
  </section>
);

export default MeisterSection;
