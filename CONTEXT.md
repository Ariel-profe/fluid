# Fluid — glosario del dominio

Nombres que usa este codebase. Preferilos en código, docs y reviews.

## Sitio de marketing

Las páginas Astro bajo `src/pages/` (home, productos, servicios, clientes, nosotros, contacto) y sus vistas en `src/views/`. El contenido de dominio vive en `data/` (empresa, partners, catálogo, contacto).

## Marketing Locale

Hoy solo `es`. Lo define `src/utils/locale.ts` (`MARKETING_LOCALES`, `resolveLocale`, `localePath`). Por request: `Astro.locals.locale`. Las URLs no llevan prefijo de idioma.

## Copy Table

Tabla tipada de strings de UI en `src/copy/es.ts` (`Copy`). Se expone como `Astro.locals.copy`. La lógica usa ids estables (p. ej. `nav.labels.clients`), nunca el texto traducido.

## View

Implementación de una ruta (`src/views/*View.astro`). Recibe `locale` (o un entry de contenido). Los archivos en `src/pages/` son shells que montan la vista o hacen redirect.

## Catálogo

Modelo industrial en `data/` + `lib/` (categorías, subcategorías, productos). Las rutas públicas son españolas: `/productos/...` vía `lib/routes.ts` (`routes`, `categoryPath`, `subcategoryPath`, `productPath`).

## Page Metadata

Todo lo del `<head>` (title, description, Open Graph, canonical, hreflang, JSON-LD), armado por `src/utils/metadata.ts` desde locale, path, title, description y **Page Kind**. Lo renderiza `Meta.astro`.

## Demo Form

Formulario placeholder (`DemoForm.astro`) sin backend: intercepta submit, valida, muestra mensaje de éxito y resetea. Usado en contacto y demos similares.

## Icon

Glifo SVG nombrado en `src/components/ui/icons/icons.ts`. El call site define tamaño, color (`text-*`) y estado. Nombres tipados (`IconName`).

## Partners

Lista en `data/partners.ts` con logo en `public/partners/`. Home: marquee; `/clientes`: grilla solo-logo.
