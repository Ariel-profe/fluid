import { routes } from '@utils/routes';

export type NavLinkId = 'about' | 'products' | 'services' | 'clients' | 'contact';

/** Primary nav — Contacto se expone como CTA “Ventas”. */
export const navLinks: { id: Exclude<NavLinkId, 'contact'>; path: string }[] = [
  { id: 'products', path: routes.products },
  { id: 'about', path: routes.about },
  { id: 'services', path: routes.services },
  { id: 'clients', path: routes.clients },
];

export type FooterSectionId = 'explore' | 'company';
export type FooterLinkId =
  | 'products'
  | 'services'
  | 'about'
  | 'contact'
  | 'clients';

export const footerSections: {
  id: FooterSectionId;
  links: { id: FooterLinkId; path: string }[];
}[] = [
  {
    id: 'explore',
    links: [
      { id: 'products', path: routes.products },
      { id: 'services', path: routes.services },
    ],
  },
  {
    id: 'company',
    links: [
      { id: 'about', path: routes.about },
      { id: 'contact', path: routes.contact },
      { id: 'clients', path: routes.clients },
    ],
  },
];

export const socialLinks = {
  instagram: 'https://www.instagram.com/fluidsoluciones',
  whatsapp: 'https://wa.me/5491176094341',
  email: 'mailto:cotizaciones@fluidsoluciones.com',
};
