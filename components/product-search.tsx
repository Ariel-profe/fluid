"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";
import { cn, normalizeSearchText } from "@/lib/utils";
import {
  getProductHref,
  getSubcategoryName,
  searchProducts,
} from "@/data/products";
import { CATALOG_CATEGORIES, getCategoryHref } from "@/data/catalog-categories";

const ease = [0.22, 1, 0.36, 1] as const;

type ProductSearchProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
  className?: string;
};

export function ProductSearch({
  variant = "desktop",
  onNavigate,
  className,
}: ProductSearchProps): ReactNode {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(variant === "mobile");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    const needle = normalizeSearchText(q);
    const categories = CATALOG_CATEGORIES.filter(
      (c) =>
        getCategoryHref(c.slug) &&
        normalizeSearchText(`${c.title} ${c.description} ${c.subcategories.join(" ")}`).includes(
          needle,
        ),
    ).map((c) => ({
      id: c.id,
      href: getCategoryHref(c.slug) as string,
      title: c.title,
      meta: "Categoría",
    }));
    const products = searchProducts(q)
      .slice(0, 8)
      .map((p) => ({
        id: p.id,
        href: getProductHref(p),
        title: p.name,
        meta: getSubcategoryName(p),
      }));
    return [...categories, ...products].slice(0, 8);
  }, [query]);
  const showPanel = query.trim().length > 0 && (variant === "mobile" || open);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open || variant === "mobile") return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(id);
  }, [open, variant]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        if (variant === "desktop") close();
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [close, variant]);

  function goTo(href: string) {
    onNavigate?.();
    close();
    router.push(href);
  }

  const field = (
    <div className="flex h-full min-w-0 items-center gap-2">
      <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      {variant === "desktop" && !open ? (
        <span className="hidden text-sm text-muted-foreground xl:inline">Buscar</span>
      ) : (
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined
          }
          enterKeyHint="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              close();
              return;
            }
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            }
            if (e.key === "Enter" && results[activeIndex]) {
              e.preventDefault();
              goTo(results[activeIndex].href);
            }
          }}
          placeholder="Buscar productos…"
          aria-label="Buscar productos"
          className="h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      )}
    </div>
  );

  if (variant === "mobile") {
    return (
      <div ref={rootRef} className={cn("relative", className)}>
        <div className="flex h-12 w-full items-center rounded-sm border border-border bg-background px-3">
          {field}
        </div>
        {showPanel ? <ResultsPanel listId={listId} results={results} activeIndex={activeIndex} setActiveIndex={setActiveIndex} onNavigate={onNavigate} close={close} query={query} /> : null}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <motion.div
        initial={false}
        animate={{ width: open ? 280 : 108 }}
        transition={{ duration: 0.35, ease }}
        className={cn(
          "flex h-9 overflow-hidden rounded-sm px-3",
          open ? "border border-border bg-background" : "border border-transparent hover:bg-hover",
        )}
      >
        {open ? (
          field
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Buscar productos"
            className="flex h-full w-full items-center gap-2 text-left"
          >
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <span className="hidden text-sm text-muted-foreground xl:inline">Buscar</span>
          </button>
        )}
      </motion.div>
      <AnimatePresence>
        {showPanel ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22, ease }}
            className="absolute left-0 z-50 mt-2 w-[min(20rem,70vw)]"
          >
            <ResultsPanel
              listId={listId}
              results={results}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              onNavigate={onNavigate}
              close={close}
              query={query}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ResultsPanel({
  listId,
  results,
  activeIndex,
  setActiveIndex,
  onNavigate,
  close,
  query,
}: {
  listId: string;
  results: { id: string; href: string; title: string; meta: string }[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  onNavigate?: () => void;
  close: () => void;
  query: string;
}): ReactNode {
  return (
    <div
      id={listId}
      role="listbox"
      aria-label="Resultados de búsqueda"
      className="rounded-sm border border-border bg-background p-1 shadow-md"
    >
      {results.length > 0 ? (
        <ul>
          {results.map((item, i) => (
            <li key={item.id} role="none">
              <Link
                id={`${listId}-${item.id}`}
                role="option"
                aria-selected={i === activeIndex}
                href={item.href}
                onClick={() => {
                  onNavigate?.();
                  close();
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  "flex flex-col rounded-sm px-3 py-2.5 transition-colors duration-200",
                  i === activeIndex ? "bg-hover" : "hover:bg-hover",
                )}
              >
                <span className="text-sm text-foreground">{item.title}</span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {item.meta}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-3 py-4 text-sm text-muted-foreground">
          Sin resultados para “{query.trim()}”.
        </p>
      )}
    </div>
  );
}
