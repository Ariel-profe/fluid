import type { IconName } from '../src/components/ui/icons/icons';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Santiago de Chile 2555, General Pacheco, Buenos Aires');

export interface ContactAction {
  text: string;
  href: string;
  external?: boolean;
}

export interface ContactChannel {
  id: string;
  label: string;
  icon: IconName;
  actions: ContactAction[];
}

export const CONTACT = {
  email: 'cotizaciones@fluidsoluciones.com',
  phone: '+5493515305318',
  phoneDisplay: '+54 9 351 530-5318',
  whatsapp: '+5491176094341',
  whatsappDisplay: '+54 9 11 7609-4341',
  address: 'Santiago de Chile 2555, General Pacheco, Buenos Aires',
  instagramHandle: '@fluidsoluciones',
  instagramUrl: 'https://www.instagram.com/fluidsoluciones',
  mapsUrl: MAPS_URL,
  warehouseNote:
    'Warehouse estratégico en la provincia de Córdoba. Expansión proyectada en Salta y Bahía Blanca.',
} as const;

export const CHANNELS: ContactChannel[] = [
  {
    id: 'email',
    label: 'Correo',
    icon: 'envelopeOpen',
    actions: [
      {
        text: CONTACT.email,
        href: `mailto:${CONTACT.email}`,
      },
    ],
  },
  {
    id: 'phone',
    label: 'Teléfono',
    icon: 'phone',
    actions: [
      {
        text: CONTACT.phoneDisplay,
        href: `tel:${CONTACT.phone}`,
      },
    ],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: 'whatsapp',
    actions: [
      {
        text: CONTACT.whatsappDisplay,
        href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`,
        external: true,
      },
    ],
  },
  {
    id: 'address',
    label: 'Centro de Operaciones',
    icon: 'mapPin',
    actions: [
      {
        text: CONTACT.address,
        href: CONTACT.mapsUrl,
        external: true,
      },
    ],
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: 'instagram',
    actions: [
      {
        text: CONTACT.instagramHandle,
        href: CONTACT.instagramUrl,
        external: true,
      },
    ],
  },
];
