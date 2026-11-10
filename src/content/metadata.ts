import type { Metadata, Viewport } from 'next';
import { dictionaries, type Locale } from './dictionaries';
import { site } from './site';

export function buildMetadata(locale: Locale): Metadata {
  const t = dictionaries[locale];
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: t.home,
      languages: { 'pt-BR': '/', en: '/en/' },
    },
    openGraph: {
      type: 'website',
      title: t.meta.title,
      description: t.meta.description,
      url: t.home,
      siteName: 'lorenzo.',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
    icons: { icon: '/favicon.svg' },
  };
}

export const viewport: Viewport = {
  themeColor: '#0E0D0B',
  colorScheme: 'dark',
};
