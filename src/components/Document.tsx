import type { ReactNode } from 'react';
import { fontVars } from '@/app/fonts';

/**
 * Roda antes da pintura: marca `js`, e pula o loader se ele já rodou nesta sessão
 * (evita o loader piscar em quem volta para a página).
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('lz-seen'))d.setAttribute('data-seen','')}catch(e){}if('scrollRestoration' in history)history.scrollRestoration='manual'})();`;

export default function Document({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html lang={lang} className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
