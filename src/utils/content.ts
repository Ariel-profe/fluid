import { getCollection, type CollectionEntry } from 'astro:content';
import {
  DEFAULT_LOCALE,
  isMarketingLocale,
  localePath,
  type MarketingLocale,
} from '@utils/locale';

/**
 * Legacy MD product collection helpers.
 * The live catalog uses `data/products`; this remains for any leftover MD content.
 */

export type LocalisedCollection = 'products';
export type LocalisedEntry<
  C extends LocalisedCollection = LocalisedCollection,
> = CollectionEntry<C>;

const ROUTES: Record<LocalisedCollection, string> = {
  products: '/productos',
};

const SORTERS: {
  [C in LocalisedCollection]: (
    a: CollectionEntry<C>,
    b: CollectionEntry<C>
  ) => number;
} = {
  products: (a, b) => a.data.main.id - b.data.main.id,
};

export function localeOf(entry: LocalisedEntry): MarketingLocale {
  const prefix = entry.id.split('/')[0];
  return isMarketingLocale(prefix) ? prefix : DEFAULT_LOCALE;
}

export function slugOf(entry: LocalisedEntry): string {
  return entry.id.replace(/^[^/]+\//, '');
}

export function pathFor(entry: LocalisedEntry): string {
  return `${localePath(localeOf(entry), ROUTES[entry.collection])}/${slugOf(entry)}/`;
}

export async function entriesFor<C extends LocalisedCollection>(
  collection: C,
  locale: MarketingLocale
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection, ({ id }) =>
    id.startsWith(`${locale}/`)
  );
  return entries.sort(
    SORTERS[collection] as (
      a: CollectionEntry<C>,
      b: CollectionEntry<C>
    ) => number
  );
}

export async function siblingOf<C extends LocalisedCollection>(
  entry: CollectionEntry<C>,
  locale: MarketingLocale
): Promise<CollectionEntry<C> | undefined> {
  const siblings = await entriesFor(entry.collection as C, locale);
  return siblings.find((candidate) => slugOf(candidate) === slugOf(entry));
}

export function staticPathsFor<C extends LocalisedCollection>(collection: C) {
  return async () => {
    const entries = await getCollection(collection);
    return entries
      .filter((entry) => isMarketingLocale(entry.id.split('/')[0]))
      .map((entry) => ({
        params: { id: slugOf(entry as LocalisedEntry) },
        props: { entry },
      }));
  };
}
