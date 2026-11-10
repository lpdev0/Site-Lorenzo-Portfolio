/**
 * Dados fixos do site. Tudo que é "seu" fica aqui para editar num lugar só.
 * Campos com `null` não aparecem no site até serem preenchidos.
 */
export const site = {
  name: 'Lorenzo',
  // Domínio usado nas meta tags. Ordem: NEXT_PUBLIC_SITE_URL (defina quando tiver domínio próprio)
  // → domínio de produção da Vercel (automático no build da Vercel) → localhost.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
  whatsapp: 'https://wa.me/message/GB2WPJBIT5AZM1',
  github: 'https://github.com/lpdev0',
  email: null as string | null, // ex.: 'contato@seudominio.com'
  instagram: null as string | null, // ex.: 'https://instagram.com/...'
  linkedin: null as string | null, // ex.: 'https://linkedin.com/in/...'
  photo: '/about/lorenzo.jpeg',
  timeZone: 'America/Sao_Paulo',
};

export type Project = {
  slug: string;
  name: string;
  url: string;
  repo: string;
  image: string;
  imageSm: string;
  tags: string[];
  year: string;
  kind: 'institutional' | 'concept';
};

export const projects: Project[] = [
  {
    slug: 'life-odontologia',
    name: 'Life Odontologia',
    url: 'https://life-odontologia.vercel.app/',
    repo: 'https://github.com/lpdev0/Life-Odontologia',
    image: '/projects/life-odontologia.webp',
    imageSm: '/projects/life-odontologia-sm.webp',
    tags: ['HTML', 'CSS', 'JavaScript'],
    year: '2026',
    kind: 'institutional',
  },
  {
    slug: 'neuralkinetics',
    name: 'NeuralKinetics',
    url: 'https://tecnologia-neuralkinetics.vercel.app/',
    repo: 'https://github.com/lpdev0/Tecnologia-Neuralkinetics',
    image: '/projects/neuralkinetics.webp',
    imageSm: '/projects/neuralkinetics-sm.webp',
    tags: ['HTML', 'CSS', 'JavaScript', 'Vídeo'],
    year: '2026',
    kind: 'concept',
  },
  {
    slug: 'dentora',
    name: 'Dentora',
    url: 'https://dentora-seven.vercel.app/',
    repo: 'https://github.com/lpdev0/Dentora',
    image: '/projects/dentora.webp',
    imageSm: '/projects/dentora-sm.webp',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    year: '2026',
    kind: 'concept',
  },
];

export const stack = [
  'Next.js',
  'React',
  'TypeScript',
  'GSAP',
  'Three.js',
  'WebGL',
  'Tailwind',
  'Vite',
  'Figma',
  'HTML',
  'CSS',
];
