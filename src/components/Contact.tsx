import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: MapPin, label: "Adresse", value: "Am Hammerwerk 38, 41515 Grevenbroich" },
  { icon: Phone, label: "Telefon", value: "0 21 81 / 123 45 67" },
  { icon: Mail, label: "E-Mail", value: "info@hausgartenprofi.eu" },
  { icon: Clock, label: "Erreichbar", value: "Mo–Fr: 8:00 – 18:00 Uhr" },
];

const Contact = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Anfrage gesendet!",
        description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
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
            Beschreiben Sie uns Ihr Projekt – wir erstellen Ihnen ein unverbindliches Angebot.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 scroll-fade-in">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border p-6 md:p-8 shadow-sm space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name *</label>
                  <Input placeholder="Ihr Name" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">E-Mail *</label>
                  <Input type="email" placeholder="ihre@email.de" required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Telefon</label>
                  <Input type="tel" placeholder="Ihre Telefonnummer" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Leistung</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="haussanierung">Haussanierung</SelectItem>
                      <SelectItem value="gartengestaltung">Gartengestaltung</SelectItem>
                      <SelectItem value="innenausbau">Innenausbau</SelectItem>
                      <SelectItem value="gewerbesanierung">Gewerbesanierung</SelectItem>
                      <SelectItem value="sonstiges">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Nachricht *</label>
                <Textarea placeholder="Beschreiben Sie Ihr Projekt..." rows={5} required />
              </div>
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
                  <p className="font-medium">{item.value}</p>
                </div>
              </div>
            ))}

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
