import { useState } from "react";
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
        description: "Vielen Dank. Wir melden uns in der Regel innerhalb von 24 Stunden.",
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] font-medium text-foreground">
            Name<span className="text-primary"> *</span>
          </span>
          <Input
            name="name"
            placeholder="Ihr Name"
            required
            autoComplete="name"
            className="h-12 text-base"
            value={formState.name}
            onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.85rem] font-medium text-foreground">
            E-Mail<span className="text-primary"> *</span>
          </span>
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
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 flex items-baseline justify-between text-[0.85rem] font-medium text-foreground">
            Telefon <span className="text-[0.75rem] font-normal text-muted-foreground">optional</span>
          </span>
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
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-baseline justify-between text-[0.85rem] font-medium text-foreground">
            Leistung <span className="text-[0.75rem] font-normal text-muted-foreground">optional</span>
          </span>
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
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-[0.85rem] font-medium text-foreground">
          Nachricht<span className="text-primary"> *</span>
        </span>
        <Textarea
          name="message"
          placeholder="Beschreiben Sie kurz Ihren Garten und Ihr Anliegen."
          rows={4}
          required
          className="min-h-[112px] text-base"
          value={formState.message}
          onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
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
                einen passenden Pflegeplan vor. Unverbindlich —{" "}
                {siteConfig.responsePromise.toLowerCase()}.
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
                Am schnellsten per WhatsApp oder Telefon. Alternativ das Formular —
                wir melden uns innerhalb von 24 Stunden.
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
                Wir melden uns in der Regel innerhalb von 24 Stunden.
              </DrawerDescription>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom,0px)+1.25rem)]">
              {form}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
          <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Kostenlose Beratung anfragen</DialogTitle>
              <DialogDescription>
                Wir melden uns in der Regel innerhalb von 24 Stunden.
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
