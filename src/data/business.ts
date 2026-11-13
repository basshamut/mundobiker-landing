export type PendingFlags = {
  whatsapp: boolean;
  address: boolean;
  hours: boolean;
  instagram: boolean;
  tiktok: boolean;
  domain: boolean;
  email: boolean;
};

export type BusinessData = {
  name: string;
  city: string;
  whatsapp: string;
  whatsappDisplay: string;
  address: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  hours: string;
  hoursSchema: string;
  socialName: string;
  instagram: string;
  tiktok: string;
  domain: string;
  email: string;
  pending: PendingFlags;
};

export const business: BusinessData = {
  name: 'Mundo Biker',
  city: 'CDMX',
  whatsapp: '525663697644',
  whatsappDisplay: '+52 56 6369 7644',
  address:
    'Norte 92, local #5430, Col. Gertrudis Sánchez, Gustavo A. Madero, CDMX',
  streetAddress: 'Norte 92, local #5430, Col. Gertrudis Sánchez',
  addressLocality: 'Gustavo A. Madero',
  addressRegion: 'CDMX',
  addressCountry: 'MX',
  hours: 'Lunes a domingo, 10:00 a 19:00',
  hoursSchema: 'Mo-Su 10:00-19:00',
  socialName: 'EL MUNDO DEL BIKER',
  instagram: '[@USUARIO]',
  tiktok: '[@USUARIO]',
  domain: '[DOMINIO]',
  email: '[CORREO]',
  pending: {
    whatsapp: false,
    address: false,
    hours: false,
    instagram: true,
    tiktok: true,
    domain: true,
    email: true,
  },
};

export const pendingBusinessFacts = Object.entries(business.pending)
  .filter(([, isPending]) => isPending)
  .map(([key]) => key);

export function whatsappHref(message: string): string {
  if (business.pending.whatsapp) {
    return '#contacto';
  }

  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function directionsHref(): string {
  const query = business.pending.address
    ? `${business.name} ${business.city}`
    : business.address;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function instagramHref(): string | undefined {
  return business.pending.instagram
    ? undefined
    : `https://instagram.com/${business.instagram.replace('@', '')}`;
}

export function tiktokHref(): string | undefined {
  return business.pending.tiktok
    ? undefined
    : `https://tiktok.com/@${business.tiktok.replace('@', '')}`;
}
