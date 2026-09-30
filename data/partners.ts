export type WordmarkStyle =
  | "serif"
  | "mono"
  | "sans"
  | "sansBold"
  | "sansLight"
  | "italic";

export interface Partner {
  id: string;
  /** Nombre para mostrar (marca), sin sufijos societarios. */
  name: string;
  /** Razón social completa, tal como figura en el manual. */
  legalName: string;
  /** Estilo tipográfico del wordmark en la grilla. */
  type: WordmarkStyle;
  /** Ruta del logotipo en /public/partners (coincide con el id). */
  logo: string;
  /** Se muestra en la selección destacada de la home. */
  featured?: boolean;
}

export const PARTNERS: Partner[] = [
  { id: "aceitera-general-deheza", name: "Aceitera General Deheza", legalName: "Aceitera General Deheza S.A.", type: "serif", logo: "/partners/aceitera-general-deheza.jpg" },
  { id: "acerbrag", name: "Acerbrag", legalName: "Acerbrag S.A.", type: "sansBold", logo: "/partners/acerbrag.jpg" },
  { id: "air-liquide-argentina", name: "Air Liquide Argentina", legalName: "Air Liquide Argentina S.A.", type: "sansLight", logo: "/partners/air-liquide-argentina.jpg", featured: true },
  { id: "akzo-nobel-argentina", name: "Akzo Nobel Argentina", legalName: "Akzo Nobel Argentina S.A.", type: "sans", logo: "/partners/akzo-nobel-argentina.jpg" },
  { id: "alpek-polyester-argentina", name: "Alpek Polyester Argentina", legalName: "Alpek Polyester Argentina S.A.", type: "mono", logo: "/partners/alpek-polyester-argentina.jpg" },
  { id: "asociacion-cooperativas-argentinas", name: "Asociación de Cooperativas Argentinas", legalName: "Asociación de Cooperativas Argentinas Coop. Ltda.", type: "serif", logo: "/partners/asociacion-cooperativas-argentinas.jpg" },
  { id: "bioetanol-rio-cuarto", name: "Bioetanol Río Cuarto", legalName: "Bioetanol Río Cuarto S.A.", type: "italic", logo: "/partners/bioetanol-rio-cuarto.jpg" },
  { id: "bonafide", name: "Bonafide", legalName: "Bonafide S.A.I.C.", type: "serif", logo: "/partners/bonafide.jpg", featured: true },
  { id: "bunge-argentina", name: "Bunge Argentina", legalName: "Bunge Argentina S.A.", type: "sansBold", logo: "/partners/bunge-argentina.jpg", featured: true },
  { id: "celulosa-argentina", name: "Celulosa Argentina", legalName: "Celulosa Argentina S.A.", type: "sansLight", logo: "/partners/celulosa-argentina.jpg" },
  { id: "celulosa-campana", name: "Celulosa Campana", legalName: "Celulosa Campana S.A.", type: "sans", logo: "/partners/celulosa-campana.jpg" },
  { id: "cerveceria-malteria-quilmes", name: "Cervecería y Maltería Quilmes", legalName: "Cervecería y Maltería Quilmes S.A.I.C.A. y G.", type: "italic", logo: "/partners/cerveceria-malteria-quilmes.jpg", featured: true },
  { id: "coto", name: "Coto", legalName: "Coto C.I.C.S.A.", type: "serif", logo: "/partners/coto.jpg", featured: true },
  { id: "diaser", name: "Diaser", legalName: "Diaser S.A.", type: "mono", logo: "/partners/diaser.jpg" },
  { id: "disal", name: "Disal", legalName: "Disal S.A.", type: "sansBold", logo: "/partners/disal.jpg" },
  { id: "dreamco", name: "Dreamco", legalName: "Dreamco S.A.", type: "sansLight", logo: "/partners/dreamco.jpg" },
  { id: "ecopek", name: "Ecopek", legalName: "Ecopek S.A.", type: "sans", logo: "/partners/ecopek.jpg" },
  { id: "eling-energia", name: "Eling Energía", legalName: "Eling Energía S.A.", type: "italic", logo: "/partners/eling-energia.jpg" },
  { id: "embotelladora-del-atlantico", name: "Embotelladora del Atlántico", legalName: "Embotelladora del Atlántico S.A.", type: "serif", logo: "/partners/embotelladora-del-atlantico.jpg" },
  { id: "generacion-mediterranea", name: "Generación Mediterránea", legalName: "Generación Mediterránea S.A.", type: "sansBold", logo: "/partners/generacion-mediterranea.jpg" },
  { id: "general-motors-argentina", name: "General Motors de Argentina", legalName: "General Motors de Argentina S.R.L.", type: "sansLight", logo: "/partners/general-motors-argentina.jpg", featured: true },
  { id: "gulf-oil-argentina", name: "Gulf Oil Argentina", legalName: "Gulf Oil Argentina S.A.", type: "sans", logo: "/partners/gulf-oil-argentina.jpg" },
  { id: "intelmec-ingenieria", name: "Intelmec Ingeniería", legalName: "Intelmec Ingeniería S.A.", type: "mono", logo: "/partners/intelmec-ingenieria.jpg" },
  { id: "jcr", name: "JCR", legalName: "JCR S.A.", type: "sansBold", logo: "/partners/jcr.jpg" },
  { id: "lestar-quimica", name: "Lestar Química", legalName: "Lestar Química S.A.", type: "italic", logo: "/partners/lestar-quimica.jpg" },
  { id: "litio-minera-argentina", name: "Litio Minera Argentina", legalName: "Litio Minera Argentina S.A.", type: "sansLight", logo: "/partners/litio-minera-argentina.jpg" },
  { id: "maprimed", name: "Maprimed", legalName: "Maprimed S.A.", type: "serif", logo: "/partners/maprimed.jpg" },
  { id: "massalin-particulares", name: "Massalin Particulares", legalName: "Massalin Particulares S.R.L.", type: "sans", logo: "/partners/massalin-particulares.jpg" },
  { id: "minas-argentinas", name: "Minas Argentinas", legalName: "Minas Argentinas S.A.", type: "sansBold", logo: "/partners/minas-argentinas.jpg" },
  { id: "niza", name: "Niza", legalName: "Niza S.A.", type: "mono", logo: "/partners/niza.jpg" },
  { id: "papel-prensa", name: "Papel Prensa", legalName: "Papel Prensa S.A.", type: "serif", logo: "/partners/papel-prensa.jpg" },
  { id: "pilkington-automotive-argentina", name: "Pilkington Automotive Argentina", legalName: "Pilkington Automotive Argentina S.A.", type: "sansLight", logo: "/partners/pilkington-automotive-argentina.jpg" },
  { id: "pirelli-neumaticos", name: "Pirelli Neumáticos", legalName: "Pirelli Neumáticos S.A.I.C.", type: "italic", logo: "/partners/pirelli-neumaticos.jpg", featured: true },
  { id: "porta-hnos", name: "Porta Hnos.", legalName: "Porta Hnos. S.A.", type: "serif", logo: "/partners/porta-hnos.jpg" },
  { id: "praxair-argentina", name: "Praxair Argentina", legalName: "Praxair Argentina S.R.L.", type: "sans", logo: "/partners/praxair-argentina.jpg", featured: true },
  { id: "promaiz", name: "Promaíz", legalName: "Promaíz S.A.", type: "sansBold", logo: "/partners/promaiz.jpg", featured: true },
  { id: "rdc-industrial", name: "RDC Industrial", legalName: "RDC Industrial", type: "mono", logo: "/partners/rdc-industrial.jpg" },
  { id: "ruhrpumpen-argentina", name: "Ruhrpumpen Argentina", legalName: "Ruhrpumpen Argentina S.A.", type: "sansLight", logo: "/partners/ruhrpumpen-argentina.jpg" },
  { id: "saf-argentina-lesaffre", name: "SAF Argentina (Lesaffre)", legalName: "SAF Argentina S.A. (Lesaffre)", type: "italic", logo: "/partners/saf-argentina-lesaffre.jpg" },
  { id: "saint-gobain-argentina", name: "Saint Gobain Argentina", legalName: "Saint Gobain Argentina S.A.", type: "serif", logo: "/partners/saint-gobain-argentina.jpg", featured: true },
  { id: "sanovo-greenpack-argentina", name: "Sanovo Greenpack Argentina", legalName: "Sanovo Greenpack Argentina", type: "sans", logo: "/partners/sanovo-greenpack-argentina.jpg" },
  { id: "sherwin-williams", name: "Sherwin Williams", legalName: "Sherwin Williams", type: "sansBold", logo: "/partners/sherwin-williams.jpg", featured: true },
  { id: "siderca", name: "Siderca", legalName: "Siderca S.A.I.C.", type: "mono", logo: "/partners/siderca.jpg" },
  { id: "tecnored-energia", name: "Tecnored Energía", legalName: "Tecnored Energía S.A.", type: "sansLight", logo: "/partners/tecnored-energia.jpg" },
  { id: "ternium-argentina", name: "Ternium Argentina", legalName: "Ternium Argentina S.A.", type: "italic", logo: "/partners/ternium-argentina.jpg", featured: true },
  { id: "tigonbu-energia", name: "Tigonbu Energía", legalName: "Tigonbu Energía S.A.", type: "serif", logo: "/partners/tigonbu-energia.jpg" },
  { id: "total-especialidades-argentina", name: "Total Especialidades Argentina", legalName: "Total Especialidades Argentina S.A.", type: "sans", logo: "/partners/total-especialidades-argentina.jpg" },
  { id: "toyota-argentina", name: "Toyota Argentina", legalName: "Toyota Argentina S.A.", type: "sansBold", logo: "/partners/toyota-argentina.jpg", featured: true },
  { id: "transclor", name: "Transclor", legalName: "Transclor S.A.", type: "mono", logo: "/partners/transclor.jpg" },
  { id: "unilever-argentina", name: "Unilever de Argentina", legalName: "Unilever de Argentina S.A.", type: "sansLight", logo: "/partners/unilever-argentina.jpg", featured: true },
  { id: "unionpel", name: "Unionpel", legalName: "Unionpel S.A.", type: "italic", logo: "/partners/unionpel.jpg" },
  { id: "xstorage", name: "Xstorage", legalName: "Xstorage S.A.", type: "serif", logo: "/partners/xstorage.jpg" },
];

export const FEATURED_PARTNERS: Partner[] = PARTNERS.filter((p) => p.featured);