import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Normaliza texto para búsquedas insensibles a mayúsculas y tildes (válvulas ~ valvulas).
export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Une clases condicionales y resuelve conflictos de utilidades Tailwind.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
