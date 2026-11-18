import { routes } from '@utils/routes';

export type NavLinkId = 'about' | 'products' | 'services' | 'contact';

export const navLinks: { id: NavLinkId; path: string }[] = [
  { id: 'about', path: routes.about },
  { id: 'products', path: routes.products },
  { id: 'services', path: routes.services },
  { id: 'contact', path: routes.contact },
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
