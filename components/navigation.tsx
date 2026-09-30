"use client";

import { useEffect, useState, type ComponentType } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Menu,
  X,
  ArrowUpRight,
  CircleDot,
  Cog,
  Cylinder,
  Gauge,
  ShieldCheck,
  Building2,
  Wrench,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ProductSearch } from "@/components/product-search";
import { CATALOG_CATEGORIES, getCategoryHref } from "@/data/catalog-categories";
import { COMPANY } from "@/data/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const categoryIcons: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  valvulas: CircleDot,
  actuadores: Cog,
  "canos-bridas": Cylinder,
  "caudal-presion": Gauge,
  "areas-clasificadas": ShieldCheck,
};

const companyLinks = [
  {
    title: "Nosotros",
    href: "/about",
    hint: "Equipo, operación y cobertura",
    icon: Building2,
  },
  {
    title: "Servicios",
    href: "/services",
    hint: "Asesoramiento, stock y abastecimiento",
    icon: Wrench,
  },
];

const mobileLinks = [
  { title: "Productos", href: "/products" },
  { title: "Nosotros", href: "/about" },
  { title: "Servicios", href: "/services" },
  { title: "Socios", href: "/partners" },
  { title: "Contacto", href: "/contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setIsOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <>
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-[70]",
        scrolled || isOpen
          ? "border-b border-border bg-background"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container mx-auto flex min-h-16 items-center justify-between gap-3 px-3">
        <Link href="/" className="flex min-w-0 shrink-0 items-center transition-opacity duration-200 hover:opacity-80">
          <img src="/logo.webp" alt="Fluid Soluciones Dinámicas" className="h-8 w-auto md:h-9" />
        </Link>

        <nav className="hidden flex-1 items-center justify-end gap-1 lg:flex" aria-label="Principal">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
                <NavigationMenuContent className="w-72 p-1.5">
                  {CATALOG_CATEGORIES.map((tile, i) => {
                    const Icon = categoryIcons[tile.id] ?? CircleDot;
                    const href = getCategoryHref(tile.slug) ?? "/products";
                    return (
                      <NavigationMenuLink
                        href={href}
                        key={tile.id}
                        className="items-start gap-3 rounded-sm px-2.5 py-2.5"
                      >
                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border border-border bg-muted">
                          <Icon className="size-3.5 text-foreground" strokeWidth={1.6} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-3">
                            <span className="text-sm text-foreground">{tile.title}</span>
                            <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] leading-snug text-muted-foreground">
                            {tile.subcategories.slice(0, 4).join(" · ")}
                          </span>
                        </span>
                      </NavigationMenuLink>
                    );
                  })}
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Empresa</NavigationMenuTrigger>
                <NavigationMenuContent className="w-64 p-1.5">
                  {companyLinks.map((subItem) => (
                    <NavigationMenuLink
                      href={subItem.href}
                      key={subItem.title}
                      className="items-start gap-3 rounded-sm px-2.5 py-2.5"
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border border-border bg-muted">
                        <subItem.icon className="size-3.5 text-foreground" strokeWidth={1.6} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-foreground">{subItem.title}</span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                          {subItem.hint}
                        </span>
                      </span>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/partners"
            className="inline-flex h-8 items-center rounded-sm px-2.5 text-sm transition-colors duration-200 hover:bg-hover"
          >
            Socios
          </Link>
          <div className="mx-2 h-4 w-px bg-border" aria-hidden />
          <ProductSearch variant="desktop" />
          <Link href="/contact" className={cn(buttonVariants(), "ml-1")}>
            Contacto
          </Link>
        </nav>

        <button
          type="button"
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden")}
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  id="mobile-menu"
                  className="fixed inset-0 z-[60] flex h-dvh w-full flex-col bg-background pt-16 lg:hidden"
                  style={{ backgroundColor: "var(--background)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease }}
                >
                  <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain bg-background px-4 py-6">
                    <ProductSearch variant="mobile" onNavigate={() => setIsOpen(false)} />
                    <ul className="mt-8 flex flex-col">
                      {mobileLinks.map((l, i) => {
                        const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`);
                        return (
                          <li key={l.href} className="min-w-0">
                            <Link
                              href={l.href}
                              onClick={() => setIsOpen(false)}
                              aria-current={isActive ? "page" : undefined}
                              className="flex min-w-0 items-center justify-between gap-4 border-b border-border py-4 transition-colors duration-200 hover:bg-hover"
                            >
                              <span className="flex min-w-0 items-baseline gap-3">
                                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="truncate text-xl tracking-tight text-foreground">{l.title}</span>
                              </span>
                              <ArrowUpRight size={18} className="shrink-0 text-muted-foreground" aria-hidden />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="mt-auto pt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Contacto directo
                    </p>
                    <a href={`mailto:${COMPANY.email}`} className="mt-3 block break-all text-sm text-foreground">
                      {COMPANY.email}
                    </a>
                    <a href={COMPANY.phones[0].href} className="mt-1 block text-sm text-foreground">
                      {COMPANY.phones[0].label}
                    </a>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
};
