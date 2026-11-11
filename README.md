# lorenzo.

**Site no ar:** [site-lorenzo-portfolio.vercel.app](https://site-lorenzo-portfolio.vercel.app/)

Este é o meu site de portfólio. Sou o Lorenzo, web designer e desenvolvedor, e aqui mostro os projetos que fiz, os serviços que ofereço e como trabalho, do briefing ao lançamento.

O site é bilíngue: português em `/` e inglês em `/en/`.

## Como foi feito

O site foi desenhado e programado do zero: identidade visual, tipografia, animações e código.

**Identidade "Brasa".** A base é um carvão quente, quase preto. O texto é creme e há um único acento âmbar (`#FF7A1A`), usado só em pontos pequenos, como o ponto final do logo `lorenzo.`. No meio da página, uma seção clara quebra o ritmo, e o header troca de tema sozinho quando passa por ela.

**Stack**

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) com exportação estática |
| Linguagem | TypeScript + React 19 |
| Estilo | Tailwind CSS v4 com tokens de design próprios em CSS |
| Animação | [GSAP](https://gsap.com) (ScrollTrigger, SplitText, CustomEase) |
| Scroll suave | [Lenis](https://lenis.darkroom.engineering) |
| WebGL | [Three.js](https://threejs.org) com um shader GLSL escrito à mão |
| Fontes | Bricolage Grotesque, Geist e Geist Mono, via `next/font` |

**Destaques**

- **Shader do hero:** um fundo "brasa líquida" feito em GLSL, com ruído fractal (FBM) e *domain warping*, que reage ao mouse.
- **Loader:** um contador de 000 a 100 revela o wordmark e uma cortina sobe. Ele aparece só na primeira visita da sessão.
- **Animações guiadas pelo scroll:** os títulos sobem linha por linha atrás de uma máscara, o texto do "Sobre" acende palavra por palavra, as imagens dos projetos ganham um parallax leve, os números contam até o valor final e as divisórias se "desenham" da esquerda para a direita. O header some quando você rola para baixo e volta quando rola para cima.
- **Acessibilidade:** quem ativa "reduzir movimento" no sistema vê o conteúdo direto no estado final, sem animação. Sem JavaScript, o conteúdo também continua legível. O menu mobile trava o scroll, fecha com Esc e move o foco corretamente.
- **Desempenho:** o site é exportado como HTML estático (`output: 'export'`), sem servidor. As imagens dos projetos estão em WebP, com versões menores para celular.
- **Bilíngue de verdade:** cada idioma tem o próprio layout, `lang` e meta tags, além dos links `hreflang` entre as versões.

## Estrutura

```
src/
  app/          rotas: (pt)/ em "/", (en)/en/ em "/en/", 404 global
  components/   Home, Header, Loader, Services, HeroShader, Motion...
  content/
    site.ts           dados fixos: contatos e lista de projetos
    dictionaries.ts   todos os textos em PT e EN
    metadata.ts       título, descrição e Open Graph
public/
  projects/     prints dos projetos
  about/        foto
```

As animações ficam centralizadas em `src/components/Motion.tsx` e são ligadas ao HTML por atributos `data-*`. Os textos ficam separados do layout em `dictionaries.ts`.

## Rodar localmente

Requer Node.js 20 ou mais recente.

```bash
npm install
npm run dev     # http://localhost:3000 (PT) e http://localhost:3000/en/ (EN)
```

Versão de produção (gera a pasta `out/`):

```bash
npm run build
npm start       # serve a pasta out/
```

## Deploy

Como o site é estático, ele roda em qualquer hospedagem de arquivos. Na [Vercel](https://vercel.com), basta importar este repositório, sem configuração extra. O domínio usado nas meta tags é detectado automaticamente. Com domínio próprio, defina a variável de ambiente `NEXT_PUBLIC_SITE_URL` (ex.: `https://seudominio.com`).

## Contato

- GitHub: [@lpdev0](https://github.com/lpdev0)
- WhatsApp: [mande uma mensagem](https://wa.me/message/GB2WPJBIT5AZM1)

---

© Lorenzo. O código está aqui para consulta. Textos, imagens e a identidade visual não podem ser reutilizados sem autorização.
