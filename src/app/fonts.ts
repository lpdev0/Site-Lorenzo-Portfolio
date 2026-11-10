import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  axes: ['opsz'],
  variable: '--font-bricolage',
  display: 'swap',
});

export const geist = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist',
  display: 'swap',
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const fontVars = `${bricolage.variable} ${geist.variable} ${geistMono.variable}`;
