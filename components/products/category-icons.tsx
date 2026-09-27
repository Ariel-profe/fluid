import type { ReactNode } from "react";

// Iconos line-art basados en simbología P&ID/ISA de control de fluidos.
// Semánticamente representan cada categoría del catálogo.

type IconProps = { className?: string };

const svgBase = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/** Válvula (cuerpo tipo "moño" P&ID con vástago y volante). */
export function ValveIcon({ className }: IconProps): ReactNode {
  return (
    <svg className={className} {...svgBase}>
      <path d="M4 10 4 18 12 14Z" />
      <path d="M20 10 20 18 12 14Z" />
      <path d="M12 14 12 7" />
      <path d="M8.5 6.5C9.5 4.5 14.5 4.5 15.5 6.5" />
    </svg>
  );
}

/** Actuador y accesorios (actuador sobre cuerpo de válvula). */
export function ActuatorIcon({ className }: IconProps): ReactNode {
  return (
    <svg className={className} {...svgBase}>
      <path d="M7 4 17 4C18.1 4 19 4.9 19 6L19 9C19 10.1 18.1 11 17 11L7 11C5.9 11 5 10.1 5 9L5 6C5 4.9 5.9 4 7 4Z" />
      <path d="M5 8 19 8" />
      <path d="M12 11 12 16" />
      <path d="M6 13 6 20 12 16Z" />
      <path d="M18 13 18 20 12 16Z" />
    </svg>
  );
}

/** Caños, bridas y accesorios (carrete de caño con bridas en los extremos). */
export function PipeFlangeIcon({ className }: IconProps): ReactNode {
  return (
    <svg className={className} {...svgBase}>
      <path d="M5 5 7 5 7 19 5 19Z" />
      <path d="M17 5 19 5 19 19 17 19Z" />
      <path d="M7 9 17 9" />
      <path d="M7 15 17 15" />
    </svg>
  );
}

/** Caudal, presión y temperatura (manómetro / instrumento de medición). */
export function GaugeIcon({ className }: IconProps): ReactNode {
  return (
    <svg className={className} {...svgBase}>
      <circle cx="12" cy="10" r="6" />
      <path d="M12 10 15.5 6.5" />
      <path d="M12 16 12 20" />
      <path d="M9.5 20 14.5 20" />
      <circle cx="12" cy="10" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Áreas clasificadas (marcado hexagonal "Ex" ATEX/IECEx). */
export function ExAreaIcon({ className }: IconProps): ReactNode {
  return (
    <svg className={className} {...svgBase}>
      <path d="M12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5Z" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fontSize="8"
        fontStyle="italic"
        fontWeight="600"
        fill="currentColor"
        stroke="none"
      >
        Ex
      </text>
    </svg>
  );
}
