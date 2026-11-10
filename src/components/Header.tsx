'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/content/dictionaries';
import { site } from '@/content/site';
import { getLenis } from './lenis-bridge';
import WhatsAppIcon from './WhatsAppIcon';

function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export default function Header({ t }: { t: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  // some ao rolar pra baixo, volta ao rolar pra cima; troca de tema sobre seções claras
  useEffect(() => {
    const hdr = ref.current!;
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const hide = !openRef.current && y > 160 && y > last + 2;
      const show = y < last - 2 || y <= 160;
      if (hide) hdr.dataset.hidden = 'true';
      else if (show) hdr.dataset.hidden = 'false';
      last = y;

      const probe = 32;
      let theme = '';
      document.querySelectorAll<HTMLElement>('[data-header-theme]').forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) theme = s.dataset.headerTheme || '';
      });
      if (theme) hdr.dataset.theme = theme;
      else delete hdr.dataset.theme;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // menu mobile: trava o scroll, foco no primeiro link, Esc fecha
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
      menuRef.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openRef.current) {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const mq = matchMedia('(min-width: 960px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const isPt = t.locale === 'pt';

  return (
    <>
      <header className="hdr" ref={ref} data-hidden="false">
        <div className="wrap hdr-in">
          <a href={t.home} className="wordmark" aria-label="lorenzo., home">
            lorenzo<span className="dot">.</span>
          </a>

          <nav className="hdr-nav" aria-label={t.menu.label}>
            {t.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                <Roll>{n.label}</Roll>
              </a>
            ))}
          </nav>

          <div className="hdr-right">
            <p className="lang">
              {isPt ? <b>PT</b> : <a href="/" hrefLang="pt-BR" lang="pt-BR" aria-label="Português">PT</a>}
              {' / '}
              {isPt ? <a href="/en/" hrefLang="en" lang="en" aria-label="English">EN</a> : <b>EN</b>}
            </p>
            <a className="btn btn-primary" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <Roll>{t.cta}</Roll>
            </a>
            <button
              ref={btnRef}
              className="menu-btn"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((v) => !v)}
            >
              <i aria-hidden="true" />
              {open ? t.menu.close : t.menu.open}
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu"
        className="menu"
        ref={menuRef}
        data-open={open}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label={t.menu.label}
        inert={!open}
      >
        <nav className="menu-links">
          {t.nav.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
              <small>0{i + 1}</small>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="menu-foot">
          <a className="btn btn-primary" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span>{t.cta}</span>
          </a>
          <a className="label ulink" href={t.alt.href} hrefLang={t.alt.label === 'EN' ? 'en' : 'pt-BR'}>
            {t.alt.name}
          </a>
        </div>
      </div>
    </>
  );
}
