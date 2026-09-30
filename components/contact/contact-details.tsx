import { Mail, MapPin, Phone, Instagram, ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/data/site";

const CHANNELS = [
  {
    id: "email",
    label: "Correo",
    icon: Mail,
    items: [{ text: COMPANY.email, href: `mailto:${COMPANY.email}` }],
  },
  {
    id: "phone",
    label: "Teléfono",
    icon: Phone,
    items: COMPANY.phones.map((p) => ({ text: p.label, href: p.href })),
  },
  {
    id: "address",
    label: "Centro de operaciones",
    icon: MapPin,
    items: [{ text: COMPANY.address.line, href: COMPANY.address.mapsUrl, external: true }],
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    items: [{ text: COMPANY.instagram.handle, href: COMPANY.instagram.href, external: true }],
  },
] as const;

export function ContactDetails() {
  return (
    <section
      className="border-y border-border bg-background"
      aria-labelledby="contact-details-heading"
    >
      <div className="container mx-auto grid gap-10 px-3 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Canales
          </p>
          <h2
            id="contact-details-heading"
            className="mt-3 text-2xl font-extralight tracking-tight text-foreground md:text-3xl"
          >
            Centro de Operaciones, General Pacheco
          </h2>
          <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
            Escribinos para una cotización o una consulta técnica. También operamos desde el
            warehouse de Córdoba.
          </p>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            {CHANNELS.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.id} className="flex gap-4 py-5">
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {channel.label}
                    </p>
                    <div className="mt-1.5 space-y-1">
                      {channel.items.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          {...("external" in item && item.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="flex items-start gap-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
                        >
                          <span>{item.text}</span>
                          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            {COMPANY.warehouse.label}: {COMPANY.warehouse.line}
          </p>
        </div>

        <div className="min-h-[280px] overflow-hidden rounded-sm border border-border bg-muted lg:min-h-[420px]">
          <iframe
            title="Ubicación de Fluid en General Pacheco"
            src={COMPANY.address.embedUrl}
            className="h-full min-h-[280px] w-full border-0 lg:min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
