'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';
import { setLenis, getLenis } from './lenis-bridge';

/**
 * Todo o movimento da home num lugar só, ligado por atributos `data-*` no HTML.
 * Sem JS ou com prefers-reduced-motion, o conteúdo fica no estado final legível.
 */
export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
    CustomEase.create('brand', '0.85, 0, 0.15, 1');

    const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
      [...root.querySelectorAll<T>(sel)];

    /* ---------- links âncora suaves (funciona com e sem Lenis) ---------- */
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute('href')!.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      history.replaceState(null, '', `#${id}`);
      setTimeout(() => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(el, { force: true, duration: 1.4 });
        else el.scrollIntoView({ behavior: 'auto' });
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      }, 30);
    };
    document.addEventListener('click', onAnchor);

    const mm = gsap.matchMedia();

    /* =========================================================
       Movimento completo
       ========================================================= */
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      /* ---- Lenis sincronizado ao ScrollTrigger ---- */
      const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
      setLenis(lenis);
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      if (!window.__lzReady) lenis.stop();

      /* ---- Hero: entra depois do loader ---- */
      const heroIntro = () => {
        lenis.start();
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.fromTo('[data-hero-line] > span', { y: 0, yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
          .fromTo('.hero .giant .ch', { y: 0, yPercent: 105 }, { yPercent: 0, duration: 1.1, stagger: 0.045 }, 0.1)
          .to('.hero-fade', { autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, 0.5);
      };
      if (window.__lzReady) heroIntro();
      else window.addEventListener('lz:ready', heroIntro, { once: true });

      // o conteúdo do hero sobe devagar ao rolar
      gsap.to('.hero .giant', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-copy', {
        yPercent: -60,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: true },
      });

      /* ---- Manifesto: frases presas, letras acendendo no scroll ---- */
      const manifesto = document.querySelector<HTMLElement>('.manifesto');
      if (manifesto) {
        const stage = manifesto.querySelector<HTMLElement>('.manifesto-stage')!;
        const phrases = q('.manifesto-phrase', manifesto);
        const counter = manifesto.querySelector<HTMLElement>('[data-manifesto-count]');
        const splits = phrases.map((p) => SplitText.create(p, { type: 'words,chars', wordsClass: 'word' }));
        gsap.set(splits.flatMap((s) => s.chars), { autoAlpha: 0, yPercent: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: manifesto,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            onUpdate: (self) => {
              if (counter) {
                const i = Math.min(phrases.length - 1, Math.floor(self.progress * phrases.length));
                counter.textContent = `0${i + 1} / 0${phrases.length}`;
              }
            },
          },
        });
        splits.forEach((s, i) => {
          tl.to(s.chars, { autoAlpha: 1, yPercent: 0, stagger: 0.02, duration: 0.4, ease: 'power1.out' });
          tl.to({}, { duration: 0.6 });
          if (i < splits.length - 1) tl.to(s.chars, { autoAlpha: 0, yPercent: -20, stagger: 0.008, duration: 0.3 });
        });

        gsap.to(stage, {
          keyframes: { backgroundColor: ['#0E0D0B', '#2A1A10', '#2A1A10', '#0E0D0B'] },
          ease: 'none',
          scrollTrigger: { trigger: manifesto, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }

      /* ---- Serviços sobem por cima dos Projetos ----
         Projetos fica preso quando o fim dele chega ao pé da tela (pinSpacing: false, então
         não empurra o layout) e a seção creme de Serviços desliza para cima, cobrindo-o.
         Enquanto isso o conteúdo de Projetos recua e escurece, e os cantos da seção creme
         vão de arredondados a retos. Tudo em scrub, amarrado ao scroll. */
      const projectsSec = document.querySelector<HTMLElement>('#projetos');
      const servicesSec = document.querySelector<HTMLElement>('.services');
      if (projectsSec && servicesSec) {
        const projectsInner = projectsSec.querySelector<HTMLElement>('.wrap');
        const radius = 'clamp(28px, 5vw, 72px)';

        ScrollTrigger.create({
          trigger: projectsSec,
          start: 'bottom bottom',
          endTrigger: servicesSec,
          end: 'top top',
          pin: true,
          pinSpacing: false,
        });

        const rise = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: servicesSec,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.6,
          },
        });
        rise.fromTo(
          servicesSec,
          { borderTopLeftRadius: radius, borderTopRightRadius: radius },
          { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
          0,
        );
        if (projectsInner) {
          // anima o filho, não o elemento preso
          rise.fromTo(
            projectsInner,
            { scale: 1, autoAlpha: 1, transformOrigin: '50% 100%' },
            { scale: 0.92, autoAlpha: 0.35 },
            0,
          );
        }
      }

      /* ---- Processo: scroll horizontal fixo (celular e desktop) ----
         criado antes dos outros triggers da página porque o pin muda as posições abaixo dele */
      const desk = gsap.matchMedia();
      desk.add('all', () => {
        const section = document.querySelector<HTMLElement>('.process');
        if (!section) return;
        section.dataset.horizontal = 'true';
        const pin = section.querySelector<HTMLElement>('.process-pin')!;
        const track = section.querySelector<HTMLElement>('.process-track')!;
        const steps = q('.step', section);
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${dist() * 1.8}`,
            pin: true,
            anticipatePin: 1, // evita o "pulo" ao prender no scroll por toque
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
              steps.forEach((s, j) => (s.dataset.active = String(i === j)));
            },
          },
        });
        return () => {
          delete section.dataset.horizontal;
          steps.forEach((s) => delete s.dataset.active);
        };
      });

      /* ---- Títulos: linhas sobem com máscara ao entrar ---- */
      q('[data-split]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              stagger: 0.08,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 82%', once: true },
            }),
        });
      });

      /* ---- Fades simples ---- */
      q('[data-fade]').forEach((el) => {
        gsap.from(el, {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      /* ---- Divisórias desenhando da esquerda pra direita ---- */
      q('[data-draw]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });

      /* ---- Imagens dos projetos: capa já visível, só um parallax leve ---- */
      q('.proj-media').forEach((m) => {
        const px = m.querySelector('.px');
        gsap.fromTo(
          px,
          { yPercent: -3 },
          { yPercent: 3, ease: 'none', scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });

      /* ---- Parallax genérico ---- */
      q('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -7 },
          { yPercent: 7, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });

      /* ---- Sobre: texto acende palavra por palavra ---- */
      q('[data-scroll-reveal]').forEach((el) => {
        const split = SplitText.create(el, { type: 'words', wordsClass: 'w' });
        gsap.to(split.words, {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true },
        });
      });

      /* ---- Números contando ---- */
      q('[data-count-to]').forEach((el) => {
        const to = Number(el.dataset.countTo);
        const obj = { v: 0 };
        el.textContent = '0';
        gsap.to(obj, {
          v: to,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

      /* ---- Marquee: velocidade e direção reagem ao scroll ---- */
      const marquees = q('[data-marquee]').map((root) => {
        const track = root.querySelector<HTMLElement>('.marquee-track')!;
        const group = track.firstElementChild as HTMLElement;
        return { track, group, x: 0, dir: -1 };
      });
      const tickMarquee = (_t: number, dt: number) => {
        const v = lenis.velocity || 0;
        marquees.forEach((m) => {
          if (v !== 0) m.dir = v > 0 ? -1 : 1;
          const w = m.group.offsetWidth;
          if (!w) return;
          const speed = (60 + Math.min(Math.abs(v) * 45, 900)) * (dt / 1000);
          m.x += speed * m.dir;
          if (m.x <= -w) m.x += w;
          if (m.x > 0) m.x -= w;
          m.track.style.transform = `translate3d(${m.x}px,0,0)`;
        });
      };
      if (marquees.length) gsap.ticker.add(tickMarquee);

      /* ---- Rodapé: letras do wordmark sobem em cascata ---- */
      gsap.from('.footer .giant .ch', {
        yPercent: 100,
        ease: 'none',
        stagger: 0.06,
        scrollTrigger: { trigger: '.footer', start: 'top 85%', end: 'bottom bottom', scrub: 0.6 },
      });
      gsap.from('.footer-in', {
        yPercent: -15,
        autoAlpha: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'top 40%', scrub: true },
      });

      /* ---- Ímã nos botões grandes (só mouse) ---- */
      const magnets: Array<() => void> = [];
      if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
        q('[data-magnet]').forEach((el) => {
          const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
          const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * 0.3);
            yTo((e.clientY - r.top - r.height / 2) * 0.4);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener('pointermove', move);
          el.addEventListener('pointerleave', leave);
          magnets.push(() => {
            el.removeEventListener('pointermove', move);
            el.removeEventListener('pointerleave', leave);
          });
        });
      }

      // recalcula depois que as fontes carregam (mudam a altura dos títulos)
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener('lz:ready', heroIntro);
        gsap.ticker.remove(raf);
        gsap.ticker.remove(tickMarquee);
        magnets.forEach((off) => off());
        desk.revert();
        lenis.destroy();
        setLenis(null);
      };
    });

    /* =========================================================
       Movimento reduzido: sem Lenis, sem scrub, estado final
       ========================================================= */
    // (o CSS só esconde o hero quando há movimento, então nada a fazer no modo reduzido)

    return () => {
      document.removeEventListener('click', onAnchor);
      mm.revert();
    };
  }, []);

  return null;
}
