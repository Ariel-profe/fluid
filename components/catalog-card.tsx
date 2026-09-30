import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CatalogCardProps = {
  index?: string;
  title: string;
  image: string;
  description?: string;
  tags?: string[];
  meta?: string;
  href?: string;
  comingSoon?: boolean;
  className?: string;
  media?: "cover" | "product";
  titleAs?: "h2" | "h3";
};

const cardClass =
  "group relative flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-sm border border-border bg-card text-left transition-colors duration-200 hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function CardBody({
  index,
  title,
  image,
  description,
  tags,
  meta,
  comingSoon,
  titleAs: TitleTag = "h3",
}: Omit<CatalogCardProps, "href" | "className" | "media">): ReactNode {
  const visibleTags = tags?.slice(0, 5) ?? [];
  const extraTags = tags && tags.length > visibleTags.length ? tags.length - visibleTags.length : 0;

  return (
    <>
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        <div className="absolute inset-2 md:inset-2.5">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className={cn(
              "object-contain object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              !comingSoon && "group-hover:scale-[1.04]",
            )}
          />
        </div>
        {comingSoon ? (
          <span className="absolute right-1.5 top-1.5 rounded-sm bg-background/95 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-foreground md:right-2 md:top-2 md:px-2 md:py-1 md:text-[10px] md:tracking-[0.14em]">
            Pronto
          </span>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-2.5 md:gap-2 md:p-3">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <TitleTag className="line-clamp-2 min-w-0 text-sm font-light tracking-tight text-foreground md:text-base">
            {title}
          </TitleTag>
          {index ? (
            <span className="hidden shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground md:inline">
              {index}
            </span>
          ) : null}
        </div>

        {visibleTags.length > 0 ? (
          <ul className="hidden flex-wrap gap-1 md:flex" aria-label="Líneas">
            {visibleTags.map((tag) => (
              <li
                key={tag}
                className="rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] leading-tight tracking-wide text-foreground"
              >
                {tag}
              </li>
            ))}
            {extraTags > 0 ? (
              <li className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[10px] leading-tight text-muted-foreground">
                +{extraTags}
              </li>
            ) : null}
          </ul>
        ) : description ? (
          <p className="hidden line-clamp-2 text-xs leading-relaxed text-muted-foreground md:block">
            {description}
          </p>
        ) : null}

        {meta ? (
          <div className="mt-auto flex items-center justify-between gap-2 pt-0.5 md:pt-1">
            <p className="truncate font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground md:text-[10px] md:tracking-[0.12em]">
              {meta}
            </p>
            <ArrowUpRight
              className={cn(
                "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                comingSoon && "opacity-40",
              )}
              aria-hidden
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

export function CatalogCard({
  href,
  comingSoon,
  className,
  title,
  ...rest
}: CatalogCardProps): ReactNode {
  if (comingSoon || !href) {
    return (
      <article
        className={cn(cardClass, "cursor-default opacity-90", className)}
        aria-label={`${title} (próximamente)`}
      >
        <CardBody title={title} comingSoon {...rest} />
      </article>
    );
  }

  return (
    <Link href={href} className={cn(cardClass, className)} aria-label={title}>
      <CardBody title={title} comingSoon={false} {...rest} />
    </Link>
  );
}

export function CatalogGrid({ children }: { children: ReactNode }): ReactNode {
  return (
    <div className="grid min-w-0 grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-5">
      {children}
    </div>
  );
}
