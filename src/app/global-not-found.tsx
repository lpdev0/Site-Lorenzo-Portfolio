import type { Metadata } from 'next';
import './globals.css';
import Document from '@/components/Document';

export const metadata: Metadata = {
  title: '404 | lorenzo.',
  description: 'Página não encontrada.',
  icons: { icon: '/favicon.svg' },
};

export default function GlobalNotFound() {
  return (
    <Document lang="pt-BR">
      <main className="nf">
        <p className="label">Erro 404 · Page not found</p>
        <h1 className="glitch" data-text="404">
          404
        </h1>
        <p className="body-lg" style={{ maxWidth: '34ch', marginInline: 'auto' }}>
          Essa página apagou. A brasa continua acesa na home.
        </p>
        <p style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="btn btn-primary" href="/">
            <span>Voltar para a home</span>
            <span className="ember" aria-hidden="true" />
          </a>
          <a className="btn" href="/en/" style={{ boxShadow: 'inset 0 0 0 1px var(--color-ink-700)' }}>
            English
          </a>
        </p>
      </main>
    </Document>
  );
}
