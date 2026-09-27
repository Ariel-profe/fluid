"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, MoveRight, X, Search, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SearchBar } from "./search-bar";
import { getProductHref, getSubcategoryName, searchProducts } from "@/data/products";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

const navigationItems = [
  {
    title: "Productos",
    description: "Diseñados para mejorar el rendimiento.",
    items: [
      {
        title: "Válvulas",
        href: "/products/valves",
      },
      {
        title: "Actuadores",
        href: "/products/actuators",
      },
      {
        title: "Caños - Bridas",
        href: "/products/pipes-flanges",
      },
      {
        title: "Caudal - Presión",
        href: "/caudal-pressure",
      },
    ],
  },
  {
    title: "Empresa",
    description: "Quiénes somos | Socios.",
    items: [
      {
        title: "Nosotros",
        href: "/about",
      },
      {
        title: "Servicios",
        href: "/services",
      },
      {
        title: "Socios",
        href: "/partners",
      }
    ],
  },
];

const allLinks = navigationItems.flatMap(category =>
  category.items.map(item => item)
);

function MobileNavSearch({onNavigate}: {onNavigate: () => void;}): ReactNode {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(query).slice(0, 6), [query]);
  const show = query.trim().length > 0;

  return (
    <div className="relative w-full">
      <div className="flex h-13 items-center gap-3 rounded-sm border border-foreground/10 bg-foreground/[0.03] px-4 transition-colors focus-within:border-foreground/25">
        <Search size={18} className="shrink-0 text-foreground/40" aria-hidden />
        <input
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos…"
          aria-label="Buscar productos"
          className="h-full w-full bg-transparent text-base text-foreground outline-none placeholder:text-foreground/40"
        />
      </div>
      {show ? (
        <div className="absolute left-0 w-full mt-2 rounded-sm border border-foreground/10 bg-background p-2 shadow-xl">
          {results.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={getProductHref(product)}
                    onClick={onNavigate}
                    className="flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/5 active:bg-foreground/10"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {product.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                      {getSubcategoryName(product)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-4 text-sm text-foreground/50">
              Sin resultados para “{query.trim()}”.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}


export const Navigation = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 60)
      setLastScrollY(currentY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-3 ${scrolled ? "bg-zinc-100" : "bg-transparent"}`}>
      <div className="container relative mx-auto min-h-16 flex gap-4 items-center justify-between">
        <div className="flex lg:justify-center">
          <Link href="/" className="size-10 flex items-center gap-x-1 md:hover:opacity-80 transition-all">
            <img src="/logo.webp" alt="Fluid-logo" />
            <span className={`text-xl text-black font-bold`}>FLUID
            </span>
          </Link>
        </div>
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <SearchBar />
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <>
                    <NavigationMenuTrigger>
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-112.5! p-4">
                      <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                        <div className="flex flex-col h-full justify-between">
                          <div className="flex flex-col">
                            <p className="text-base">{item.title}</p>
                            <p className="text-muted-foreground text-sm">
                              {item.description}
                            </p>
                          </div>
                          <Button size="sm" className="mt-10">
                            Pedir cotización
                          </Button>
                        </div>
                        <div className="flex flex-col text-sm h-full justify-end">
                          {item.items?.map((subItem) => (
                            <NavigationMenuLink
                              href={subItem.href}
                              key={subItem.title}
                              className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                            >
                              <span>{subItem.title}</span>
                              <MoveRight className="w-4 h-4 text-muted-foreground" />
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>

            <Button variant="ghost">
              <Link href="/partners">Clientes</Link>
            </Button>
            <Button>
              <Link href="/contact">Contacto</Link>
            </Button>
          </NavigationMenu>
        </div>

        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="default" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                className="min-[850px]:hidden fixed inset-0 z-40 flex flex-col bg-background pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: easeOutExpo }}
              >
                <div className="flex items-center justify-between border-b border-foreground/8 px-6 py-4">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2.5 text-lg font-medium tracking-tight text-foreground"
                  >
                    <img src="/logo.webp" alt="" className="size-7" />
                    Fluid
                  </Link>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Close menu"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:bg-foreground/5"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
                  <div className="relative z-10">
                    <MobileNavSearch onNavigate={() => setIsOpen(false)} />
                  </div>

                  <motion.ul
                    className="mt-8 flex flex-col gap-y-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                    }}
                  >
                    {allLinks.map((l, i) => {
                      const isActive =
                        pathname === l.href || pathname.startsWith(`${l.href}/`);
                      return (
                        <motion.li
                          key={l.href}
                          variants={{
                            hidden: { opacity: 0, y: 12 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.4, ease: easeOutExpo }}
                        >
                          <Link
                            href={l.href}
                            onClick={() => setIsOpen(false)}
                            aria-current={isActive ? "page" : undefined}
                            className="group flex items-center justify-between gap-4 border-b border-foreground/8 py-4"
                          >
                            <span className="flex items-baseline gap-4">
                              <span
                                className={`font-mono text-xs tabular-nums ${isActive ? "text-accent" : "text-foreground/35"
                                  }`}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span
                                className={`text-2xl tracking-tight transition-colors group-active:text-accent ${isActive ? "text-accent" : "text-foreground"
                                  }`}
                              >
                                {l.title}
                              </span>
                            </span>
                            <ArrowUpRight
                              size={22}
                              className="text-foreground/25 transition-transform duration-300 group-active:translate-x-1 group-active:-translate-y-1 group-active:text-foreground"
                              aria-hidden
                            />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </motion.ul>

                  <motion.a
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.3 }}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-4 text-sm font-medium uppercase tracking-widest text-white"
                  >
                    Contacto
                    <ArrowUpRight size={16} aria-hidden />
                  </motion.a>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.4 }}
                    className="mt-auto pt-10"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                      Contacto directo
                    </p>
                    <a
                      href="mailto:cotizaciones@fluidsoluciones.com"
                      className="mt-3 block break-all text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      cotizaciones@fluidsoluciones.com
                    </a>
                    <a
                      href="tel:+5493515305318"
                      className="mt-1 block text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      +54 9 351 530-5318
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

