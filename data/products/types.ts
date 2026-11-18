// Modelo de datos del catálogo de productos.
// Las propiedades técnicas (specs) se completarán cuando la empresa envíe el modelo entidad-relación.

export interface ProductSpec {
  /** Nombre de la característica, p. ej. "Presión máxima". */
  label: string;
  /** Valor de la característica, p. ej. "150 PSI". */
  value: string;
}

export interface ProductDoc {
  /** Etiqueta del documento, p. ej. "Catálogo". */
  label: string;
  /** URL del PDF/recurso. */
  url: string;
}

export interface Product {
  /** Identificador único global, p. ej. "valvulas-mariposa-vxs". */
  id: string;
  /** Slug para la URL dentro de su subcategoría, p. ej. "vxs". */
  slug: string;
  /** Nombre para mostrar. */
  name: string;
  /** Ruta web de la imagen (servida desde /public), p. ej. "/products/valvulas/mariposa/vxs.jpg". */
  image: string;
  /** Categoría a la que pertenece (id). */
  categoryId: string;
  /** Subcategoría a la que pertenece (id). */
  subcategoryId: string;
  /** Descripción breve (se completará). */
  description?: string;
  /** Marca/fabricante (se completará). */
  brand?: string;
  /** Ficha técnica (se completará). */
  specs?: ProductSpec[];
  /** Documentos técnicos descargables (catálogos, manuales). */
  docs?: ProductDoc[];
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  products: Product[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  /** Descripción breve de la categoría (se completará). */
  description?: string;
  /** Imagen de portada de la categoría (servida desde /public). Si falta, la card usa el icono. */
  image?: string;
  subcategories: Subcategory[];
}
