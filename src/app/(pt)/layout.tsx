import type { ReactNode } from 'react';
import '../globals.css';
import Document from '@/components/Document';
import { buildMetadata } from '@/content/metadata';

export const metadata = buildMetadata('pt');
export { viewport } from '@/content/metadata';

export default function PtLayout({ children }: { children: ReactNode }) {
  return <Document lang="pt-BR">{children}</Document>;
}
