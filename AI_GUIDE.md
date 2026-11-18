# Fluid — guía para asistentes de código

Para Cursor, Copilot, Claude y similares: estructura, convenciones y dónde tocar. Humanos: ver [`README.md`](README.md). Glosario: [`CONTEXT.md`](CONTEXT.md).

## Overview

Sitio de **Fluid Soluciones Dinámicas** (industria: válvulas, actuadores, cañerías, bridas, instrumentos). Stack: Astro 7, Tailwind v4 (`@tailwindcss/vite`), Preline, Lenis, GSAP. Locale de marketing: **solo `es`**.

Datos de negocio en `data/` y `lib/`. Copy en `src/copy/es.ts`. Rutas públicas en español (`lib/routes.ts`).

## Path aliases

| Alias | Resuelve a |
| --- | --- |
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@content/*` | `src/content/*` |
| `@data/*` | `src/data_files/*` |
| `@images/*` | `src/images/*` |
| `@scripts/*` | `src/assets/scripts/*` |
| `@styles/*` | `src/assets/styles/*` |
| `@utils/*` | `src/utils/*` |
| `@views/*` | `src/views/*` |
| `@company` | `data/` (Vite) |
| `@lib` | `lib/` (Vite) |

Definidos en `tsconfig.json` / `astro.config.mjs`.

## Carpetas clave

| Propósito | Path | Notas |
| --- | --- | --- |
| UI y secciones | `src/components/` | `sections/` (landing, navbar&footer, …), `ui/` (botones, cards, forms, icons) |
| Layout | `src/layouts/MainLayout.astro` | Navbar + slot + footer; `<head>` vía metadata |
| Vistas | `src/views/` | Una por página (`HomeView`, `ServicesView`, `ContactView`, …) |
| Pages | `src/pages/` | Routing; redirects EN→ES; shells de vistas |
| Copy | `src/copy/es.ts` | Única tabla; vía `Astro.locals.copy` o `getCopy(locale)` |
| Dominio Fluid | `data/`, `lib/` | Company, partners, products, contact, FAQ, routes |
| Config sitio | `src/data_files/` | `constants.ts` (SITE, OG), `navigation.ts` |
| Estilos / scripts | `src/assets/` | `global.css` (tokens brand + radius), Lenis, demo forms |
| Estáticos | `public/` | logo, partners, fotos |

## Convenciones

- **Locale:** `Astro.locals.locale` / `Astro.locals.copy`. Links con `localePath(locale, routes.…)`.
- **Copy:** no hardcodear strings de UI; agregar claves en `es.ts`.
- **Rutas:** usar `routes` / helpers de `lib/routes.ts`, no paths mágicos.
- **Estilos:** Tailwind v4; tokens Fluid en `@theme` (`fluid-navy`, `fluid-cyan`, radius industrial).
- **CTAs de ventas/contacto:** `PrimaryCTA` / `SecondaryCTA` con `icon="chatBubble"` cuando corresponda.
- **Formularios demo:** envolver con `<DemoForm successMessage={…}>`.

## Comandos

- `npm run dev` — desarrollo
- `npm run build` — `astro check` + build + `process-html.mjs`
- `npm run preview` — preview de `dist/`
- `npm run test:smoke` — rutas clave del sitio Fluid (`scripts/smoke.mjs`)

## Al editar

- Página: vista en `src/views/` + copy en `src/copy/es.ts`.
- Nav: `src/data_files/navigation.ts` + `copy.nav.labels` + iconos/hints en `Navbar.astro`.
- Partner nuevo: entrada en `data/partners.ts` + JPG en `public/partners/`.
- Producto nuevo: datos en `data/` según el modelo de catálogo existente.
- No reintroducir i18n EN/FR ni docs Starlight salvo pedido explícito.
