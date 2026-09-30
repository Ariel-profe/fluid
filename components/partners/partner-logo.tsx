"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Partner } from "@/data/partners";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

export function PartnerLogoCell({
  partner,
  className = "",
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
        className={`group/logo relative flex min-w-0 items-center justify-center overflow-hidden rounded-sm border border-border bg-card ${className}`}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        fill
        sizes={sizes}
        draggable={false}
        className="object-contain p-4 max-[850px]:p-3"
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
  className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4",
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
          className="min-w-0"
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
