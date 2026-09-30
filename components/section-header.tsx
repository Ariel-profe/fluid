import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  kicker,
  title,
  aside,
  as: Heading = "h2",
  className,
}: {
  kicker?: string;
  title: ReactNode;
  aside?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}): ReactNode {
  return (
    <header
      className={cn(
        "mb-12 flex flex-col justify-between gap-4 border-b border-border pb-6 md:mb-16 md:flex-row md:items-end",
        className,
      )}
    >
      <div className="max-w-3xl">
        {kicker ? (
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {kicker}
          </p>
        ) : null}
        <Heading className="text-3xl font-extralight tracking-tight text-foreground md:text-[2.75rem]">
          {title}
        </Heading>
      </div>
      {aside ? (
        <div className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {aside}
        </div>
      ) : null}
    </header>
  );
}
