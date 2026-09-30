import Image from "next/image";
import { CATALOG_CATEGORIES } from "@/data/catalog-categories";

export function PlantStrip() {
  return (
    <section
      aria-label="Operación en planta"
      className="overflow-hidden border-y border-border"
    >
      <div className="grid grid-cols-2 bg-border md:grid-cols-5 md:gap-px">
        {CATALOG_CATEGORIES.map((tile, i) => (
          <figure
            key={tile.id}
            className="group relative min-w-0 overflow-hidden bg-muted aspect-[5/4] last:col-span-2 md:aspect-[4/5] md:last:col-span-1"
          >
            <Image
              src={tile.galleryImage}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              quality={65}
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0 bg-foreground/25 transition-opacity duration-500 group-hover:opacity-10"
              aria-hidden
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-foreground/80 to-transparent px-3 pb-3 pt-12">
              <p className="font-mono text-[10px] tabular-nums tracking-[0.16em] text-primary-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-0.5 truncate text-xs font-light tracking-tight text-primary-foreground">
                {tile.title}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
