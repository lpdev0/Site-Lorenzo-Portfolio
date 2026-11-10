import type { ReactNode } from 'react';
import '../globals.css';
import Document from '@/components/Document';
import { buildMetadata } from '@/content/metadata';

export const metadata = buildMetadata('en');
export { viewport } from '@/content/metadata';

export default function EnLayout({ children }: { children: ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
