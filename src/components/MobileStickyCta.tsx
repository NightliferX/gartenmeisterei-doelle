import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteContent";

const MobileStickyCta = () => {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={siteConfig.phoneHref}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <Phone className="h-4 w-4 text-primary" />
          Anrufen
        </a>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default MobileStickyCta;
