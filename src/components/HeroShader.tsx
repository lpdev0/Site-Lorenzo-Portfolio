'use client';

import { useEffect, useRef } from 'react';

const vertex = /* glsl */ `
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

// "Brasa líquida": FBM com domain warping, dobras de seda carvão → ferrugem → brilho âmbar
const fragment = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uFade;

float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0., a = .5;
  mat2 R = mat2(.8, .6, -.6, .8);
  for (int i = 0; i < OCTAVES; i++) { v += a * n(p); p = R * p * 2.02; a *= .5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - .5 * uRes) / uRes.y;
  // em tela vertical, aproxima a textura para a seda não sumir
  float portrait = step(uRes.x, uRes.y);
  p *= mix(1., 1.9, portrait);
  float T = uTime * .06;
  vec2 q = vec2(fbm(p * 1.4 + T), fbm(p * 1.4 + vec2(5.2, 1.3) - T));
  vec2 mm = (uMouse - .5) * vec2(uRes.x / uRes.y, 1.) * mix(1., 1.9, portrait);
  float md = exp(-3. * length(p - mm));
  vec2 w = vec2(
    fbm(p * 1.6 + 3. * q + vec2(1.7, 9.2) + T * 1.3 + md * .6),
    fbm(p * 1.6 + 3. * q + vec2(8.3, 2.8) - T)
  );
  float f = fbm(p * 1.2 + 2.6 * w);
  float folds = smoothstep(0., .9, abs(sin(f * 9. + w.x * 4.)));
  float silk = pow(1. - folds, 3.) * smoothstep(.35, .85, f);
  vec3 ink = vec3(.055, .051, .043), rust = vec3(.165, .10, .063);
  vec3 ember = vec3(1., .478, .102), glow = vec3(1., .70, .48);
  vec3 col = mix(ink, rust, smoothstep(.2, .8, f));
  col += ember * silk * .55;
  col += glow * pow(silk, 3.) * .35;
  vec2 center = mix(vec2(.62, .55), vec2(.6, .5), portrait);
  col *= smoothstep(1.25, .25, length((uv - center) * mix(vec2(1.), vec2(.8, 1.1), portrait)) * 1.2);
  col = mix(col, ink, smoothstep(.55, 1., 1. - uv.y) * mix(.75, .5, portrait));
  col = mix(col, ink, uFade);
  col += (h(gl_FragCoord.xy + uTime) - .5) * .035;
  gl_FragColor = vec4(col, 1.);
}
`;

export default function HeroShader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    import('three').then((THREE) => {
      if (disposed) return;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coarse = matchMedia('(pointer: coarse)').matches;
      const small = window.innerWidth < 768;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' });
      } catch {
        return; // sem WebGL: fica o gradiente do CSS
      }
      const scale = small ? 0.55 : 0.75;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5) * scale);
      host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute('aria-hidden', 'true');

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const uniforms = {
        uRes: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 12 },
        uMouse: { value: new THREE.Vector2(0.6, 0.5) },
        uFade: { value: 0 },
      };
      const material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms,
        defines: { OCTAVES: small || coarse ? 4 : 5 },
        depthTest: false,
        depthWrite: false,
      });
      const geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));

      const size = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        renderer.setSize(w, h, false);
        renderer.getDrawingBufferSize(uniforms.uRes.value);
        if (reduce) renderer.render(scene, camera);
      };
      const ro = new ResizeObserver(size);
      ro.observe(host);
      size();

      // mouse com inércia
      const target = { x: 0.6, y: 0.5 };
      const onMove = (e: PointerEvent) => {
        target.x = e.clientX / window.innerWidth;
        target.y = 1 - e.clientY / window.innerHeight;
      };
      if (!coarse) window.addEventListener('pointermove', onMove, { passive: true });

      // escurece conforme o hero sai da tela
      const onScroll = () => {
        uniforms.uFade.value = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9))) * 0.7;
        if (reduce) renderer.render(scene, camera);
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(host);

      let raf = 0;
      const t0 = performance.now();
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) return;
        const secs = (now - t0) / 1000;
        uniforms.uTime.value = 12 + secs;
        if (coarse) {
          // sem mouse no toque: o brilho passeia sozinho
          target.x = 0.5 + Math.sin(secs * 0.23) * 0.3;
          target.y = 0.55 + Math.cos(secs * 0.17) * 0.25;
        }
        const m = uniforms.uMouse.value;
        m.x += (target.x - m.x) * 0.04;
        m.y += (target.y - m.y) * 0.04;
        renderer.render(scene, camera);
      };
      if (reduce) renderer.render(scene, camera);
      else raf = requestAnimationFrame(frame);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('scroll', onScroll);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div className="hero-canvas" ref={ref} />;
}
