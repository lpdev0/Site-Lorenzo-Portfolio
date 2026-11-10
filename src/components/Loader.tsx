'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import type { Dictionary } from '@/content/dictionaries';

declare global {
  interface Window {
    __lzReady?: boolean;
  }
}

function markReady() {
  if (window.__lzReady) return;
  window.__lzReady = true;
  window.dispatchEvent(new Event('lz:ready'));
}

/** Contador 000→100, wordmark revelado, palavras trocando e cortina subindo. Só na 1ª visita da sessão. */
export default function Loader({ words }: { words: Dictionary['loader'] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    window.scrollTo(0, 0);

    const finish = () => {
      try {
        sessionStorage.setItem('lz-seen', '1');
      } catch {}
      html.setAttribute('data-seen', '');
    };

    if (!el || html.hasAttribute('data-seen')) {
      markReady();
      return;
    }

    gsap.registerPlugin(CustomEase);
    const brand = CustomEase.create('brand', '0.85, 0, 0.15, 1');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      const t = gsap.to(el, { autoAlpha: 0, duration: 0.3, delay: 0.2, onStart: markReady, onComplete: finish });
      return () => {
        t.kill();
      };
    }

    const count = el.querySelector<HTMLElement>('[data-count]')!;
    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(counter, {
      v: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        count.textContent = String(Math.round(counter.v)).padStart(3, '0');
      },
    })
      .to(el.querySelector('.loader-bar'), { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
      .to(el.querySelector('.loader-mark'), { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: brand }, 0.15)
      .to(el.querySelectorAll('.loader-words span'), { yPercent: -100, duration: 0.6, ease: 'expo.out' }, 0.8)
      .to(el, { yPercent: -101, duration: 0.85, ease: brand }, 1.55)
      .add(markReady, 1.85);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-mark wordmark">
        lorenzo<span className="dot">.</span>
      </div>
      <div className="loader-count" data-count>
        000
      </div>
      <div className="loader-words label">
        <span>{words[0]}</span>
        <span>{words[1]}</span>
      </div>
      <div className="loader-bar" />
    </div>
  );
}
