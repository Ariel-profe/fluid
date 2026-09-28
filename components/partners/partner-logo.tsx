"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Partner } from "@/data/partners";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

function CornerBrackets(): ReactNode {
  const base =
    "absolute h-2.5 w-2.5 border-neutral-900/40 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover/logo:opacity-100";
  return (
    <>
      <span
        className={`${base} left-2 top-2 border-l border-t group-hover/logo:left-1.5 group-hover/logo:top-1.5`}
        aria-hidden
      />
      <span
        className={`${base} right-2 top-2 border-r border-t group-hover/logo:right-1.5 group-hover/logo:top-1.5`}
        aria-hidden
      />
      <span
        className={`${base} bottom-2 left-2 border-b border-l group-hover/logo:bottom-1.5 group-hover/logo:left-1.5`}
        aria-hidden
      />
      <span
        className={`${base} bottom-2 right-2 border-b border-r group-hover/logo:bottom-1.5 group-hover/logo:right-1.5`}
        aria-hidden
      />
    </>
  );
}

// Celda de logo: fondo blanco (los .jpg traen fondo blanco). En reposo se ve
// atenuada en monocromo; con `active` (spotlight) o en hover pasa a color.
export function PartnerLogoCell({
  partner,
  className = "",
  active = false,
  sizes = "(max-width: 560px) 30vw, (max-width: 850px) 22vw, (max-width: 1280px) 16vw, 11vw",
}: {
  partner: Partner;
  className?: string;
  active?: boolean;
  sizes?: string;
}): ReactNode {
  return (
    <div
      title={partner.legalName}
      className={`group/logo relative flex items-center justify-center overflow-hidden rounded-lg bg-white ring-1 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] hover:ring-black/15 hover:shadow-[0_14px_34px_-24px_rgba(0,0,0,0.5)] ${
        active ? "ring-black/10" : "ring-black/5"
      } ${className}`}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        fill
        sizes={sizes}
        draggable={false}
        className={`object-contain p-4 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover/logo:scale-[1.05] group-hover/logo:opacity-100 group-hover/logo:grayscale-0 max-[850px]:p-3 ${
          active ? "opacity-100 grayscale-0" : "opacity-100 grayscale-0"
        }`}
      />
      <CornerBrackets />
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover/logo:scale-x-100 ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </div>
  );
}

// Rota un subconjunto de índices en el tiempo para dar color y vida al muro
// de logos sin depender del hover (respeta prefers-reduced-motion).
function useSpotlight(count: number, enabled: boolean): Set<number> {
  const [active, setActive] = useState<Set<number>>(() => new Set());
  const activeRef = useRef(0);
  activeRef.current = Math.min(count, Math.max(3, Math.round(count * 0.16)));

  useEffect(() => {
    if (!enabled || count === 0) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const pick = (): void => {
      const next = new Set<number>();
      let guard = 0;
      while (next.size < activeRef.current && guard < count * 4) {
        next.add(Math.floor(Math.random() * count));
        guard++;
      }
      setActive(next);
    };

    pick();
    if (prefersReduced) return;
    const id = window.setInterval(pick, 2400);
    return () => window.clearInterval(id);
  }, [count, enabled]);

  return active;
}

export function PartnersLogoGrid({
  partners,
  inView,
  spotlight = true,
  className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7",
}: {
  partners: Partner[];
  inView: boolean;
  spotlight?: boolean;
  className?: string;
}): ReactNode {
  const active = useSpotlight(partners.length, spotlight && inView);

  return (
    <div className={className}>
      {partners.map((partner, i) => (
        <motion.div
          key={partner.id}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{
            duration: 0.45,
            ease: easeOutExpo,
            delay: 0.06 + Math.min(i, 28) * 0.02,
          }}
        >
          <PartnerLogoCell
            partner={partner}
            active={active.has(i)}
            className="aspect-[3/2] w-full"
          />
        </motion.div>
      ))}
    </div>
  );
}
