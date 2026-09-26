import { useEffect, useState } from "react";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
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
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { services, siteConfig } from "@/lib/siteContent";

const contactEndpoint =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
  `https://formsubmit.co/ajax/${siteConfig.email}`;

const emptyForm = { name: "", email: "", phone: "", service: "", message: "", website: "" };

// Andere Bereiche der Seite (z. B. die Hero-Buttons der Orts- und
// Leistungsseiten) oeffnen das Anfrageformular ueber dieses Ereignis,
// statt zum Kontaktabschnitt zu springen.
export const BERATUNG_OEFFNEN = "beratung:oeffnen";
export const oeffneBeratung = () => {
  window.dispatchEvent(new CustomEvent(BERATUNG_OEFFNEN));
};

const useIsMobile = () => {
  const [m, setM] = useState<boolean>(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false,
  );
  if (typeof window !== "undefined") {
    const mq = window.matchMedia("(max-width: 768px)");
    mq.onchange = () => setM(mq.matches);
  }
  return m;
};

const BeratungCtaV8 = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [service, setService] = useState("");
  const [formState, setFormState] = useState(emptyForm);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const oeffnen = () => setOpen(true);
    window.addEventListener(BERATUNG_OEFFNEN, oeffnen);
    return () => window.removeEventListener(BERATUNG_OEFFNEN, oeffnen);
  }, []);
  const isMobile = useIsMobile();

  const reset = () => {
    setFormState(emptyForm);
    setService("");
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
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      if (!res.ok) throw new Error();
      toast({
        title: "Anfrage gesendet",
        description: "Vielen Dank. Benedikt Dölle meldet sich in kürzester Zeit persönlich bei Ihnen.",
      });
      reset();
      setOpen(false);
    } catch (err) {
      toast({
        title: "Senden fehlgeschlagen",
        description: "Bitte rufen Sie uns direkt an oder schreiben Sie per WhatsApp.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const form = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[0.95rem] font-medium text-foreground">
            Name<span className="text-primary"> *</span>
          </span>
          <Input
            name="name"
            placeholder="Ihr Name"
            required
            autoComplete="name"
            className="h-14 text-[1.05rem]"
            value={formState.name}
            onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[0.95rem] font-medium text-foreground">
            E-Mail<span className="text-primary"> *</span>
          </span>
          <Input
            name="email"
            type="email"
            inputMode="email"
            placeholder="ihre@email.de"
            required
            autoComplete="email"
            className="h-14 text-[1.05rem]"
            value={formState.email}
            onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 flex items-baseline justify-between text-[0.95rem] font-medium text-foreground">
            Telefon <span className="text-[0.78rem] font-normal text-muted-foreground">optional</span>
          </span>
          <Input
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="0211 …"
            autoComplete="tel"
            className="h-14 text-[1.05rem]"
            value={formState.phone}
            onChange={(e) => setFormState((p) => ({ ...p, phone: e.target.value }))}
          />
        </label>
        <label className="block">
          <span className="mb-2 flex items-baseline justify-between text-[0.95rem] font-medium text-foreground">
            Leistung <span className="text-[0.78rem] font-normal text-muted-foreground">optional</span>
          </span>
          <Select
            value={service}
            onValueChange={(v) => {
              setService(v);
              setFormState((p) => ({ ...p, service: v }));
            }}
          >
            <SelectTrigger className="h-14 text-[1.05rem]">
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
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-[0.95rem] font-medium text-foreground">
          Nachricht<span className="text-primary"> *</span>
        </span>
        <Textarea
          name="message"
          placeholder="Beschreiben Sie kurz Ihren Garten und Ihr Anliegen."
          rows={5}
          required
          className="min-h-[144px] resize-none overflow-hidden text-[1.05rem] leading-relaxed transition-[height] duration-150"
          value={formState.message}
          onChange={(e) => {
            const el = e.target as HTMLTextAreaElement;
            el.style.height = "auto";
            el.style.height = `${Math.min(el.scrollHeight, 400)}px`;
            setFormState((p) => ({ ...p, message: el.value }));
          }}
          onFocus={(e) => {
            const el = e.target as HTMLTextAreaElement;
            el.style.height = "auto";
            el.style.height = `${Math.min(Math.max(el.scrollHeight, 220), 400)}px`;
          }}
        />
      </label>
      <div className="hidden">
        <Input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formState.website}
          onChange={(e) => setFormState((p) => ({ ...p, website: e.target.value }))}
        />
      </div>
      <Button type="submit" size="lg" className="h-12 w-full rounded-full text-[1rem] font-semibold" disabled={sending}>
        {sending ? "Wird gesendet…" : "Anfrage senden"}
      </Button>
      <p className="text-[0.78rem] leading-relaxed text-muted-foreground">
        Mit dem Absenden akzeptieren Sie unsere{" "}
        <a href="/datenschutz" className="underline decoration-muted-foreground/40 underline-offset-2 hover:text-foreground">
          Datenschutzerklärung
        </a>
        . Ihre Angaben werden ausschließlich zur Beantwortung Ihrer Anfrage
        genutzt und nicht an Dritte weitergegeben.
      </p>
    </form>
  );

  return (
    <section id="kontakt" aria-labelledby="beratung-v8" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="overflow-hidden rounded-[1.75rem] bg-primary text-primary-foreground shadow-xl shadow-primary/25">
          <div className="grid gap-8 p-6 md:grid-cols-[1.15fr_1fr] md:gap-10 md:p-10 lg:p-12">
            <div>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
                Kontakt · Beratung
              </p>
              <h2 id="beratung-v8" className="mt-2 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-primary-foreground">
                Kostenlose Erstberatung in Ihrem Garten.
              </h2>
              <p className="mt-4 max-w-[46ch] text-[1rem] leading-relaxed text-primary-foreground/85">
                Wir schauen uns Ihren Garten vor Ort an, hören zu und schlagen
                einen passenden Pflegeplan vor. Unverbindlich — Benedikt Dölle
                meldet sich in kürzester Zeit persönlich bei Ihnen.
              </p>

              <ul className="mt-6 grid gap-2 text-[0.95rem] text-primary-foreground/90 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-primary-foreground/70" strokeWidth={2} />
                  {siteConfig.openingHoursDisplay}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-primary-foreground/70" strokeWidth={2} />
                  {siteConfig.city} und Umgebung
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-primary-foreground/70" strokeWidth={2} />
                  <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary-foreground/70" strokeWidth={2} />
                  <a href={siteConfig.phoneHref} className="hover:underline">
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 md:justify-center">
              <Button
                size="lg"
                onClick={() => setOpen(true)}
                className="h-12 w-full gap-2 rounded-full bg-white text-[1rem] font-semibold text-primary shadow-sm hover:bg-white/95"
              >
                Beratung anfragen
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </Button>
              <div className="grid gap-2 sm:grid-cols-2">
                <a
                  href={siteConfig.phoneHref}
                  className="v8-press inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-[0.9rem] font-medium text-primary-foreground hover:bg-white/15"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  Anrufen
                </a>
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="v8-press inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-[0.9rem] font-medium text-primary-foreground hover:bg-white/15"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2} />
                  WhatsApp
                </a>
              </div>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-primary-foreground/75">
                Am schnellsten per WhatsApp oder Telefon. Alternativ das
                Formular — Benedikt Dölle meldet sich in kürzester Zeit
                persönlich bei Ihnen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isMobile ? (
        <Drawer open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
          <DrawerContent className="max-h-[92dvh]">
            <DrawerHeader className="text-left">
              <DrawerTitle>Kostenlose Beratung anfragen</DrawerTitle>
              <DrawerDescription>
                Benedikt Dölle meldet sich in kürzester Zeit persönlich bei Ihnen.
              </DrawerDescription>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom,0px)+1.25rem)]">
              {form}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
          <DialogContent className="max-h-[90dvh] max-w-xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Kostenlose Beratung anfragen</DialogTitle>
              <DialogDescription>
                Benedikt Dölle meldet sich in kürzester Zeit persönlich bei Ihnen.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2">{form}</div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default BeratungCtaV8;
