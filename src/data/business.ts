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
  address: string;
  hours: string;
  instagram: string;
  tiktok: string;
  domain: string;
  email: string;
  pending: PendingFlags;
};

export const business: BusinessData = {
  name: 'Mundo Biker',
  city: 'CDMX',
  whatsapp: '[NÚMERO]',
  address: '[DIRECCIÓN]',
  hours: '[HORARIO]',
  instagram: '[@USUARIO]',
  tiktok: '[@USUARIO]',
  domain: '[DOMINIO]',
  email: '[CORREO]',
  pending: {
    whatsapp: true,
    address: true,
    hours: true,
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
  return business.pending.instagram ? undefined : `https://instagram.com/${business.instagram.replace('@', '')}`;
}

export function tiktokHref(): string | undefined {
  return business.pending.tiktok ? undefined : `https://tiktok.com/@${business.tiktok.replace('@', '')}`;
}
