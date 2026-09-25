import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { services, siteConfig } from "@/lib/siteContent";

// Vier Info-Kacheln fuer den oberen Block, alle klick- oder anrufbar.
const infoTiles = [
  {
    icon: Phone,
    label: "Telefon",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat starten",
    href: siteConfig.whatsappHref,
    external: true,
  },
  {
    icon: Mail,
    label: "E-Mail",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Clock,
    label: "Erreichbar",
    value: siteConfig.openingHoursDisplay,
  },
];

const contactEndpoint =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
  `https://formsubmit.co/ajax/${siteConfig.email}`;

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

const useIsMobile = () => {
  const [mobile, setMobile] = useState<boolean>(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const on = () => setMobile(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
};

const Contact = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [service, setService] = useState("");
  const [formState, setFormState] = useState<FormState>(emptyForm);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const isMobile = useIsMobile();

  const reset = () => {
    setFormState(emptyForm);
    setService("");
    setSuccess(false);
  };

  const close = () => {
    setOpen(false);
    // kleine Verzoegerung, damit man nicht das Zuruecksetzen sieht
    window.setTimeout(reset, 250);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    if (formState.website) {
      setSending(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formState.name);
      payload.append("email", formState.email);
      payload.append("phone", formState.phone);
      payload.append("service", formState.service || "Nicht angegeben");
      payload.append("message", formState.message);
      payload.append("_subject", `Neue Anfrage über die Website von ${siteConfig.brandName}`);
      payload.append("_template", "table");
      payload.append("_captcha", "false");
      payload.append("_honey", formState.website);

      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!response.ok) throw new Error("Kontaktformular konnte nicht gesendet werden.");

      setSuccess(true);
    } catch (error) {
      toast({
        title: "Senden fehlgeschlagen",
        description:
          "Bitte rufen Sie uns direkt an oder schreiben Sie per WhatsApp — wir melden uns umgehend.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const infoBlock = (
    <div className="scroll-fade-in mx-auto mt-10 max-w-2xl">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {infoTiles.map((tile) => {
          const inner = (
            <>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <tile.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {tile.label}
                </p>
                <p className="mt-0.5 truncate text-[0.95rem] font-medium text-foreground">
                  {tile.value}
                </p>
              </div>
            </>
          );
          const cls =
            "flex min-h-[76px] items-center gap-3 rounded-2xl border border-border/70 bg-card p-3.5 shadow-sm transition-colors active:scale-[0.98] sm:p-4 sm:hover:border-primary/40 sm:hover:bg-primary/[0.03]";
          if (tile.href) {
            return (
              <a
                key={tile.label}
                href={tile.href}
                target={tile.external ? "_blank" : undefined}
                rel={tile.external ? "noreferrer" : undefined}
                className={cls}
              >
                {inner}
              </a>
            );
          }
          return (
            <div key={tile.label} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-secondary/60 p-4 text-[0.9rem] leading-relaxed text-muted-foreground">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
        <span>
          {siteConfig.streetAddress}, {siteConfig.postalCode} {siteConfig.city} · Vor Ort in Düsseldorf und Umgebung
        </span>
      </div>
    </div>
  );

  const formBody = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <Input
            name="name"
            placeholder="Ihr Name"
            required
            autoComplete="name"
            className="h-12 text-base"
            value={formState.name}
            onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
          />
        </Field>
        <Field label="E-Mail" required>
          <Input
            name="email"
            type="email"
            inputMode="email"
            placeholder="ihre@email.de"
            required
            autoComplete="email"
            className="h-12 text-base"
            value={formState.email}
            onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Telefon" hint="optional">
          <Input
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="0211 …"
            autoComplete="tel"
            className="h-12 text-base"
            value={formState.phone}
            onChange={(e) => setFormState((p) => ({ ...p, phone: e.target.value }))}
          />
        </Field>
        <Field label="Leistung" hint="optional">
          <Select
            value={service}
            onValueChange={(v) => {
              setService(v);
              setFormState((p) => ({ ...p, service: v }));
            }}
          >
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              {services.map((item) => (
                <SelectItem key={item.id} value={item.title}>
                  {item.title}
                </SelectItem>
              ))}
              <SelectItem value="sonstiges">Sonstiges</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Nachricht" required>
        <Textarea
          name="message"
          placeholder="Beschreiben Sie kurz Ihren Garten und Ihr Anliegen."
          rows={4}
          required
          className="min-h-[112px] text-base"
          value={formState.message}
          onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
        />
      </Field>

      <div className="hidden">
        <label htmlFor="website">Website</label>
        <Input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formState.website}
          onChange={(e) => setFormState((p) => ({ ...p, website: e.target.value }))}
        />
      </div>

      <p className="text-[0.8rem] leading-relaxed text-muted-foreground">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur
        Bearbeitung Ihrer Anfrage zu. Alternativ direkt per Telefon oder WhatsApp.
      </p>

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full text-[1rem] font-semibold"
        disabled={sending}
      >
        {sending ? "Wird gesendet…" : "Anfrage senden"}
      </Button>
    </form>
  );

  const successBody = (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
        <CheckCircle2 className="h-7 w-7" strokeWidth={2} />
      </div>
      <h3 className="text-[1.25rem] font-semibold text-foreground">
        Anfrage angekommen.
      </h3>
      <p className="max-w-[38ch] text-[0.95rem] leading-relaxed text-muted-foreground">
        Vielen Dank. Wir melden uns in der Regel innerhalb von 24 Stunden mit
        einer ersten Einschätzung zurück.
      </p>
      <div className="mt-2 flex flex-col gap-2 self-stretch">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background text-[0.95rem] font-semibold text-foreground shadow-sm"
        >
          <Phone className="h-4 w-4 text-primary" strokeWidth={2} />
          {siteConfig.phoneDisplay}
        </a>
        <button
          type="button"
          onClick={close}
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary text-[0.95rem] font-semibold text-primary-foreground shadow-sm"
        >
          Schließen
        </button>
      </div>
    </div>
  );

  return (
    <section id="kontakt" className="bg-secondary/50 py-20 md:py-28">
      <div className="container px-4">
        <div className="scroll-fade-in mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Kontakt
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Kostenlose Beratung anfragen
          </h2>
          <p className="mt-4 text-muted-foreground">
            Beschreiben Sie uns Ihren Garten. Wir melden uns persönlich mit
            einer ersten Einschätzung und den nächsten Schritten.
          </p>
        </div>

        {infoBlock}

        <div className="scroll-fade-in mx-auto mt-6 max-w-2xl">
          {isMobile ? (
            <Drawer
              open={open}
              onOpenChange={(v) => {
                setOpen(v);
                if (!v) window.setTimeout(reset, 250);
              }}
            >
              <DrawerTrigger asChild>
                <Button size="lg" className="h-12 w-full text-[1rem] font-semibold">
                  Kostenlose Beratung anfragen
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[92dvh]">
                <DrawerHeader className="pb-3 text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <DrawerTitle className="text-[1.15rem]">
                        Kostenlose Beratung anfragen
                      </DrawerTitle>
                      <DrawerDescription className="text-[0.9rem]">
                        Wir melden uns in der Regel innerhalb von 24 Stunden.
                      </DrawerDescription>
                    </div>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Formular schließen"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </DrawerHeader>
                <div className="overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom,0px)+1.25rem)]">
                  {success ? successBody : formBody}
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Dialog
              open={open}
              onOpenChange={(v) => {
                setOpen(v);
                if (!v) window.setTimeout(reset, 250);
              }}
            >
              <DialogTrigger asChild>
                <Button size="lg" className="h-12 w-full text-[1rem] font-semibold">
                  Kostenlose Beratung anfragen
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Kostenlose Beratung anfragen</DialogTitle>
                  <DialogDescription>
                    Wir melden uns in der Regel innerhalb von 24 Stunden mit
                    einer ersten Einschätzung.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-2">{success ? successBody : formBody}</div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="mb-1.5 flex items-baseline justify-between text-[0.85rem] font-medium text-foreground">
      <span>
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      {hint ? (
        <span className="text-[0.75rem] font-normal text-muted-foreground">{hint}</span>
      ) : null}
    </span>
    {children}
  </label>
);

export default Contact;
