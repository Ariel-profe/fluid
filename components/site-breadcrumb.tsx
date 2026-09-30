import Link from "next/link";
import type { ReactNode } from "react";

export type Crumb = {
  label: string;
  href?: string;
};

export function SiteBreadcrumb({ items }: { items: Crumb[] }): ReactNode {
  return (
    <nav
      aria-label="Ruta"
      className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {item.href && !last ? (
              <Link href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className={last ? "text-foreground" : undefined}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
