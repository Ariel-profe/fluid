# Fluid Soluciones Dinámicas

Sitio web institucional y comercial de **Fluid Soluciones Dinámicas S.A.**: catálogo industrial, servicios, clientes, nosotros y contacto.

- **Sitio:** [fluidsoluciones.com](https://fluidsoluciones.com)
- **Stack:** Astro 7, Tailwind CSS 4, Preline UI, GSAP, Lenis, TypeScript
- **Idioma:** español (única locale de marketing)
- **Desarrollo:** AMN Consultora Informática

## Requisitos

- Node.js 22+
- npm (o pnpm/yarn compatible)

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + build + minify HTML
npm run preview
npm run test:smoke
```

## Rutas públicas

| Ruta | Descripción |
| --- | --- |
| `/` | Home |
| `/productos` | Catálogo (categorías → subcategorías → producto) |
| `/servicios` | Servicios |
| `/clientes` | Grilla de partners / clientes |
| `/nosotros` | Empresa, timeline, organigrama, logística |
| `/contacto` | Canales y formulario de cotización |
| `/partners`, `/about`, `/products`, … | Redirects 301 a las rutas en español |

## Estructura del proyecto

```
data/                 # Dominio Fluid: company, partners, products, contact
lib/                  # Rutas, FAQ, helpers de catálogo
src/
  copy/es.ts          # Copy UI (única tabla)
  data_files/         # SITE, nav/footer, mega menu ids
  components/         # Secciones + UI
  views/              # Vistas por página
  pages/              # Routing Astro (shells + redirects)
  layouts/            # MainLayout
  assets/             # CSS global, scripts (Lenis, formularios demo)
  utils/              # locale, metadata, content helpers
public/               # Logos, partners, fotos, estáticos
```

## Dónde editar qué

| Cambio | Archivo / carpeta |
| --- | --- |
| Textos de UI | `src/copy/es.ts` |
| Nav / footer | `src/data_files/navigation.ts` + labels en copy |
| Datos empresa | `data/company.ts`, `data/company-manual.md` |
| Partners | `data/partners.ts` + `public/partners/` |
| Catálogo | `data/products*` + assets en `public/` |
| Contacto | `data/contact-details.ts` |
| SEO / marca | `src/data_files/constants.ts` |
| Estilos / tokens | `src/assets/styles/global.css` (`@theme`) |
| Favicon | `src/images/icon.png`, `icon.svg`, `icon-maskable.png` |

## Documentación adicional

- [`CONTEXT.md`](CONTEXT.md) — glosario del dominio del código
- [`AI_GUIDE.md`](AI_GUIDE.md) — guía para asistentes de código
- [`data/company-manual.md`](data/company-manual.md) — memoria institucional

## Deploy

Configurado para Vercel (`vercel.json` con headers de seguridad). El `site` en `astro.config.mjs` es `https://fluidsoluciones.com`.

## Licencia

El código base se distribuye bajo MIT (ver [`LICENSE`](LICENSE)).
