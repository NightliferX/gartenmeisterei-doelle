import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { services, siteConfig } from "@/lib/siteContent";

const contactInfo = [
  {
    icon: MapPin,
    label: "Adresse",
    value: `${siteConfig.streetAddress}, ${siteConfig.postalCode} ${siteConfig.city}`,
  },
  { icon: Phone, label: "Telefon", value: siteConfig.phoneDisplay },
  { icon: Mail, label: "E-Mail", value: siteConfig.email },
  { icon: Clock, label: "Erreichbar", value: siteConfig.openingHoursDisplay },
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

const Contact = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [service, setService] = useState("");
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    website: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
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
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error("Kontaktformular konnte nicht gesendet werden.");
      }

      toast({
        title: "Anfrage gesendet",
        description:
          "Vielen Dank. Wir melden uns in der Regel innerhalb von 24 Stunden zurück.",
      });
      setFormState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        website: "",
      });
      setService("");
      form.reset();
    } catch (error) {
      toast({
        title: "Senden fehlgeschlagen",
        description:
          "Die Anfrage konnte gerade nicht übermittelt werden. Bitte rufen Sie uns an oder schreiben Sie per WhatsApp.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="kontakt" className="py-20 md:py-28 bg-secondary/50">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto scroll-fade-in">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Kontakt
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Kostenlose Beratung anfragen
          </h2>
          <p className="mt-4 text-muted-foreground">
            Beschreiben Sie uns Ihr Projekt. Wir melden uns persönlich mit einer
            ersten Einschatzung und den nachsten Schritten.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 scroll-fade-in">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border p-6 md:p-8 shadow-sm space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name *</label>
                  <Input
                    name="name"
                    placeholder="Ihr Name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">E-Mail *</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="ihre@email.de"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Telefon</label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Ihre Telefonnummer"
                    value={formState.phone}
                    onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Leistung</label>
                  <Select
                    value={service}
                    onValueChange={(value) => {
                      setService(value);
                      setFormState((prev) => ({ ...prev, service: value }));
                    }}
                  >
                    <SelectTrigger>
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
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Nachricht *</label>
                <Textarea
                  name="message"
                  placeholder="Beschreiben Sie Ihr Projekt..."
                  rows={5}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                />
              </div>
              <div className="hidden">
                <label htmlFor="website">Website</label>
                <Input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formState.website}
                  onChange={(e) => setFormState((prev) => ({ ...prev, website: e.target.value }))}
                />
              </div>
              <p className="rounded-xl bg-secondary/80 px-4 py-3 text-sm text-muted-foreground">
                Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur
                Bearbeitung Ihrer Anfrage zu. Alternativ erreichen Sie uns direkt
                per Telefon oder WhatsApp.
              </p>
              <Button type="submit" size="lg" className="w-full" disabled={sending}>
                {sending ? "Wird gesendet..." : "Anfrage senden"}
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 scroll-fade-in space-y-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  {item.label === "Telefon" ? (
                    <a className="font-medium hover:text-primary" href={siteConfig.phoneHref}>
                      {item.value}
                    </a>
                  ) : item.label === "E-Mail" ? (
                    <a
                      className="font-medium hover:text-primary"
                      href={`mailto:${siteConfig.email}`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Direkt erreichbar
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold shadow-sm transition-colors hover:bg-muted"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  Telefon
                </a>
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border h-56 mt-6">
              <iframe
                title="Standort Haus&Garten Profi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40419.4!2d6.58!3d51.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf4542b2a2f5e3%3A0x42760fc4a2a7f30!2sGrevenbroich!5e0!3m2!1sde!2sde!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
