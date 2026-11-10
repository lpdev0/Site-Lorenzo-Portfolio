'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/content/dictionaries';

type S = Dictionary['services'];

/* ---------- cenas: cada serviço tem uma composição própria ---------- */

function SceneStrategy({ v }: { v: S['visuals'] }) {
  return (
    <div className="scene-strategy">
      <span className="label">{v.labels[1]}</span>
      {/* um rabisco embolado que vira uma linha reta até a brasa */}
      <svg viewBox="0 0 400 160" aria-hidden="true">
        <path
          d="M10 110 C 40 20, 70 150, 95 70 S 140 10, 150 95 S 190 140, 205 60 S 235 90, 250 80 L 372 80"
          fill="none"
          stroke="#B8AC9E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="380" cy="80" r="8" fill="#FF7A1A" />
      </svg>
      <ol>
        {v.strategy.map((q, i) => (
          <li key={q}>
            <span>0{i + 1}</span>
            {q}
          </li>
        ))}
      </ol>
    </div>
  );
}

function SceneDesign({ v }: { v: S['visuals'] }) {
  return (
    <div className="scene-design">
      <span className="label">{v.labels[2]}</span>
      <div className="aa" aria-hidden="true">
        Aa<em>.</em>
      </div>
      <div className="swatches" aria-hidden="true">
        <i style={{ background: '#201D19' }} />
        <i style={{ background: '#2A1A10' }} />
        <i style={{ background: '#F2EBE1' }} />
        <i style={{ background: '#FF7A1A' }} />
      </div>
    </div>
  );
}

function SceneDev({ v }: { v: S['visuals'] }) {
  return (
    <div className="scene-dev">
      <span className="label">{v.labels[0]}</span>
      <pre aria-hidden="true">
        <span className="c">{v.codeComment}</span>
        {'\n'}
        <span className="k">export default</span> <span className="t">function</span> Site() {'{'}
        {'\n  '}
        <span className="k">return</span> {'('}
        {'\n    '}&lt;<span className="t">Marca</span>
        {'\n      '}
        {v.dev.map((d) => (
          <span key={d}>
            <span className="s">{d}</span>{' '}
          </span>
        ))}
        {'\n    '}/&gt;
        {'\n  '}
        {');'}
        {'\n'}
        {'}'} <span className="caret" />
      </pre>
    </div>
  );
}

function SceneMotion({ v }: { v: S['visuals'] }) {
  return (
    <div className="scene-motion">
      <span className="label">{v.labels[3]}</span>
      <div className="orbit" aria-hidden="true">
        <i />
        <i />
        <i />
        <b />
      </div>
    </div>
  );
}

function SceneCare({ v }: { v: S['visuals'] }) {
  return (
    <div className="scene-care">
      <span className="label">{v.labels[4]}</span>
      <ul>
        {v.care.map(([ver, txt]) => (
          <li key={ver}>
            <b>{ver}</b>
            <span>{txt}</span>
            <i aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services({ s }: { s: S }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  // em telas de toque, o item ativo acompanha o scroll
  useEffect(() => {
    if (!matchMedia('(hover: none)').matches) return;
    const items = [...(listRef.current?.querySelectorAll<HTMLElement>('.svc-item') ?? [])];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const scenes = [
    <SceneDev key="a" v={s.visuals} />,
    <SceneStrategy key="b" v={s.visuals} />,
    <SceneDesign key="c" v={s.visuals} />,
    <SceneMotion key="d" v={s.visuals} />,
    <SceneCare key="e" v={s.visuals} />,
  ];

  return (
    <div className="svc">
      <div className="svc-visual" aria-hidden="true">
        {scenes.map((scene, i) => (
          <div key={i} className="svc-scene" data-on={active === i}>
            {scene}
          </div>
        ))}
      </div>
      <div className="svc-list-wrap">
        <ul className="svc-list" ref={listRef}>
          {s.items.map((item, i) => (
            <li key={item.name} className="svc-item" data-on={active === i} data-index={i}>
              <button
                type="button"
                aria-expanded={active === i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                {item.name}
              </button>
              <div className="svc-text">
                <p>
                  <span>{item.text}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="label svc-hint">{s.hint}</p>
      </div>
    </div>
  );
}
