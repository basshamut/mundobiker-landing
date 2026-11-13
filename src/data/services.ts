export type ServiceIconName =
  | 'polarizado'
  | 'seguridad'
  | 'wrap'
  | 'calcomania'
  | 'accesorios'
  | 'faros'
  | 'estetica'
  | 'sonido';

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: ServiceIconName;
  neon: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: 'polarizado',
    name: 'Polarizado',
    description: 'Controla el sol, la mirada y el calor. Vidrio oscuro con acabado limpio.',
    icon: 'polarizado',
    neon: 'var(--neon-cyan)',
  },
  {
    id: 'pelicula-seguridad',
    name: 'Película de seguridad',
    description: 'Refuerza tus cristales contra impactos y robos sin perder visibilidad.',
    icon: 'seguridad',
    neon: 'var(--neon-blue)',
  },
  {
    id: 'full-wrap',
    name: 'Full Wrap',
    description: 'Tu carrocería entera, otra piel. Vinilo de alto impacto, a tu medida.',
    icon: 'wrap',
    neon: 'var(--neon-magenta)',
    featured: true,
  },
  {
    id: 'calcomanias',
    name: 'Calcomanías personalizadas',
    description: 'Diseños, letras y tags que nadie más tiene. Corte y aplicación precisa.',
    icon: 'calcomania',
    neon: 'var(--neon-acid)',
  },
  {
    id: 'accesorios',
    name: 'Accesorios para moto y carro',
    description: 'Piezas, detalles y equipo para que tu máquina hable por ti.',
    icon: 'accesorios',
    neon: 'var(--neon-orange)',
  },
  {
    id: 'pulido-faros',
    name: 'Pulido de faros',
    description: 'Faros opacos a transparencia total. Más luz, mejor cara.',
    icon: 'faros',
    neon: 'var(--neon-green)',
  },
  {
    id: 'estetica-general',
    name: 'Estética general',
    description: 'Lavado, corrección y detallado para que tu unidad vuelva a verse nueva.',
    icon: 'estetica',
    neon: 'var(--neon-violet)',
  },
  {
    id: 'iluminacion-sonido',
    name: 'Iluminación y sonido',
    description: 'Luces, audio y ambiente. La calle te escucha antes de verte.',
    icon: 'sonido',
    neon: 'var(--neon-red)',
  },
];

export const featuredService = services.find((service) => service.featured) ?? services[0];
