/**
 * Marketing-site locale module (Spanish-only).
 * Kept as a thin layer so existing views/components that pass `locale` keep working.
 */

export const MARKETING_LOCALES = ['es'] as const;
export type MarketingLocale = (typeof MARKETING_LOCALES)[number];

export const DEFAULT_LOCALE: MarketingLocale = 'es';

export const LOCALE_INFO: Record<
  MarketingLocale,
  {
    label: string;
    lang: string;
    ogLocale: string;
    inLanguage: string;
    intl: string;
  }
> = {
  es: {
    label: 'Español',
    lang: 'es',
    ogLocale: 'es_AR',
    inLanguage: 'es-AR',
    intl: 'es-AR',
  },
};

export function isMarketingLocale(value: unknown): value is MarketingLocale {
  return (
    typeof value === 'string' &&
    (MARKETING_LOCALES as readonly string[]).includes(value)
  );
}

export function splitLocale(pathname: string): {
  locale: MarketingLocale;
  path: string;
} {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  // Legacy /es prefix still resolves to Spanish content at the same path.
  if (normalized === '/es' || normalized.startsWith('/es/')) {
    const rest = normalized === '/es' ? '/' : normalized.slice(3) || '/';
    return { locale: DEFAULT_LOCALE, path: rest };
  }
  return { locale: DEFAULT_LOCALE, path: normalized };
}

export function resolveLocale(
  pathname: string,
  _currentLocale?: string | undefined
): MarketingLocale {
  void pathname;
  void _currentLocale;
  return DEFAULT_LOCALE;
}

/** Paths are unprefixed — Spanish is the only locale. */
export function localePath(_locale: MarketingLocale, path = '/'): string {
  if (path.startsWith('#') || /^[a-z]+:/i.test(path)) return path;
  return path.startsWith('/') ? path : `/${path}`;
}

export function alternatePaths(
  pathname: string
): Record<MarketingLocale, string> {
  const { path } = splitLocale(pathname);
  return { es: localePath(DEFAULT_LOCALE, path) };
}
