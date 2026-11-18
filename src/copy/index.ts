import type { MarketingLocale } from '@utils/locale';
import { es } from './es';

/**
 * Copy module: Spanish-only table of UI strings.
 */
export type Copy = typeof es;

const tables: Record<MarketingLocale, Copy> = { es };

export function getCopy(locale: MarketingLocale): Copy {
  return tables[locale];
}

export { es };
