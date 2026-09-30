import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { CATALOG_CATEGORIES, getCategoryHref } from "@/data/catalog-categories";
import { COMPANY } from "@/data/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const linkClass = "transition-colors hover:text-foreground";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container mx-auto px-3 py-16 lg:py-20">
        <div className="grid min-w-0 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex min-w-0 flex-col gap-5 sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <img src="/logo.webp" alt="" className="size-11" />
              <span className="text-base font-medium tracking-tight text-foreground">
                {COMPANY.legalName}
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {COMPANY.description}
            </p>
            <Link href="/contact" className={cn(buttonVariants(), "w-fit")}>
              Pedir cotización
            </Link>
          </div>

          <nav className="min-w-0 lg:col-span-2" aria-label="Productos">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Productos
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {CATALOG_CATEGORIES.map((c) => {
                const href = getCategoryHref(c.slug);
                return (
                  <li key={c.id}>
                    {href ? (
                      <Link href={href} className={linkClass}>
                        {c.title}
                      </Link>
                    ) : (
                      <span className="flex flex-wrap items-baseline gap-2">
                        {c.title}
                        <span className="font-mono text-[10px] uppercase tracking-widest">Pronto</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav className="min-w-0 lg:col-span-2" aria-label="Empresa">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Empresa
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className={linkClass}>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/services" className={linkClass}>
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/partners" className={linkClass}>
                  Socios
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Contacto
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.6} aria-hidden />
                <a href={`mailto:${COMPANY.email}`} className={cn(linkClass, "break-all")}>
                  {COMPANY.email}
                </a>
              </li>
              {COMPANY.phones.map((phone) => (
                <li key={phone.href} className="flex gap-2.5">
                  <Phone className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.6} aria-hidden />
                  <a href={phone.href} className={linkClass}>
                    {phone.label}
                  </a>
                </li>
              ))}
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.6} aria-hidden />
                <a
                  href={COMPANY.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {COMPANY.address.line}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Instagram className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.6} aria-hidden />
                <a
                  href={COMPANY.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {COMPANY.instagram.handle}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              {COMPANY.warehouse.label}: {COMPANY.warehouse.line}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {year} {COMPANY.legalName}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em]">
            Pacheco · Córdoba
          </p>
          <p>
            Desarrollo{" "}
            <a
              href="https://amn.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-opacity hover:opacity-70"
            >
              AMN Consultora Informática
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
