export type Locale = 'pt' | 'en';

const pt = {
  locale: 'pt' as Locale,
  htmlLang: 'pt-BR',
  home: '/',
  alt: { label: 'EN', href: '/en/', name: 'English' },
  meta: {
    title: 'lorenzo. | Web designer & desenvolvedor',
    description:
      'Lorenzo, web designer e desenvolvedor. Criação de sites, landing pages, redesign, SEO e integrações para fortalecer a presença digital do seu negócio.',
  },
  skip: 'Pular para o conteúdo',
  nav: [
    { id: 'projetos', label: 'Projetos' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'contato', label: 'Contato' },
  ],
  cta: 'Vamos conversar',
  menu: { open: 'Menu', close: 'Fechar', label: 'Navegação' },
  loader: ['design', 'código'],
  hero: {
    lines: ['Sites que não passam despercebidos.', 'Design e código para marcas', 'que querem ser lembradas.'],
    role: 'Web designer & dev',
    place: 'Brasil',
    scroll: 'Role',
  },
  manifesto: {
    label: 'Manifesto',
    phrases: [
      'Seu site é a primeira conversa com o seu cliente.',
      'Se ele não prende em 3 segundos, a conversa acaba.',
      'Eu crio sites que fazem o cliente ficar.',
    ],
  },
  projects: {
    label: 'Projetos recentes',
    title: 'Trabalho selecionado',
    intro: 'Design, desenvolvimento e estratégia em três projetos. Explore os sites e conheça cada proposta.',
    visit: 'Ver site',
    code: 'Código',
    concept: 'Conceito',
    institutional: 'Site institucional',
    items: {
      'life-odontologia':
        'Site institucional para uma clínica odontológica, com apresentação de especialidades e corpo clínico, navegação entre páginas e contato direto pelo WhatsApp.',
      neuralkinetics:
        'Experiência conceitual para uma empresa de tecnologia, com identidade visual contemporânea, animações e conteúdo sobre inteligência artificial, produtos digitais e sistemas conectados.',
      dentora:
        'Site conceitual para uma clínica odontológica, com design editorial, galeria de imagens, apresentação de tratamentos e uma demonstração interativa de agendamento.',
    } as Record<string, string>,
  },
  services: {
    label: 'Serviços',
    title: 'O que eu posso fazer por você',
    hint: 'Passe o mouse ou toque em cada item',
    items: [
      { name: 'Criação de sites', text: 'Desenvolvimento de sites modernos, profissionais e responsivos, planejados para transmitir credibilidade, valorizar sua marca e transformar visitantes em potenciais clientes.' },
      { name: 'Landing pages', text: 'Páginas estratégicas para campanhas, apresentação de ofertas e geração de leads, com navegação objetiva e chamadas para ação eficientes.' },
      { name: 'Redesign de sites', text: 'Modernizo sua presença digital com um design atualizado, navegação intuitiva e uma experiência que representa a qualidade do seu negócio.' },
      { name: 'SEO & otimização', text: 'Boas práticas de SEO, organização de conteúdo, estrutura técnica e otimização de desempenho para melhorar a navegação e favorecer a visibilidade nas buscas.' },
      { name: 'Automações & integrações', text: 'Integração de ferramentas, WhatsApp, formulários e automações para facilitar o contato com clientes, otimizar processos e tornar seu site mais funcional.' },
    ],
    visuals: {
      labels: ['01 · criação de sites', '02 · landing pages', '03 · redesign de sites', '04 · SEO & desempenho', '05 · ferramentas conectadas'],
      codeComment: '// seu negócio, sua presença digital',
      strategy: ['quem é o cliente?', 'o que ele procura?', 'por que você?', 'qual o próximo passo?'],
      dev: ['responsivo', 'leve', 'acessível'],
      care: [
        ['01', 'formulários'],
        ['02', 'WhatsApp'],
        ['03', 'ferramentas'],
        ['04', 'automações'],
      ],
    },
  },
  process: {
    label: 'Processo',
    title: 'Do primeiro oi ao site no ar',
    steps: [
      { name: 'Descoberta', text: 'Tudo começa com uma conversa. Entendo seu negócio, público, objetivos e referências para definir a direção do projeto.' },
      { name: 'Planejamento & design', text: 'Estruturo as páginas, organizo o conteúdo e desenvolvo uma proposta visual que valoriza sua identidade e facilita a navegação.' },
      { name: 'Desenvolvimento', text: 'Transformo o planejamento em um site funcional, responsivo e otimizado, com atenção aos detalhes, desempenho e usabilidade.' },
      { name: 'Publicação & entrega', text: 'Após os testes e ajustes finais, publico o site e entrego orientações para você utilizar sua nova presença digital com autonomia.' },
    ],
  },
  about: {
    label: 'Sobre',
    title: 'Oi, eu sou o Lorenzo.',
    text: 'Web designer e desenvolvedor apaixonado por transformar ideias em experiências digitais marcantes. Uno design estratégico, tecnologia e experiência do usuário para criar sites com propósito, que ajudam cada negócio a crescer.',
    photoAlt: 'Retrato de Lorenzo',
    photoSoon: 'foto em breve',
    stats: [
      { value: 3, suffix: '', label: 'projetos no ar' },
      { value: 100, suffix: '%', label: 'responsivo, do celular ao desktop' },
      { value: 1, suffix: '', label: 'pessoa do briefing ao lançamento' },
    ],
  },
  stackLabel: 'Ferramentas que eu uso',
  faq: {
    label: 'Perguntas frequentes',
    title: 'Antes de você perguntar',
    items: [
      { q: 'Quanto custa um site?', a: 'Cada projeto tem necessidades, desafios e objetivos próprios. Trabalho com propostas personalizadas para oferecer uma solução adequada ao momento do seu negócio. Fale comigo pelo WhatsApp para conversarmos sobre o seu projeto.' },
      { q: 'Quanto tempo leva?', a: 'O prazo depende do escopo, das funcionalidades e do conteúdo de cada projeto. Depois de entender o que você precisa, definimos o planejamento e o prazo na proposta.' },
      { q: 'Preciso ter textos e fotos prontos?', a: 'Na etapa de descoberta, conversamos sobre os materiais que você já tem e o que o projeto precisa. No planejamento, organizo o conteúdo e a estrutura das páginas.' },
      { q: 'O site funciona bem no celular?', a: 'Sim. Todo site é pensado para celular desde o primeiro rascunho e testado em vários tamanhos de tela antes de ir ao ar.' },
      { q: 'Você também moderniza sites existentes?', a: 'Sim. O serviço de redesign atualiza o visual, a navegação e a experiência para que o site represente melhor a qualidade do seu negócio.' },
      { q: 'Posso integrar WhatsApp e formulários?', a: 'Sim. Trabalho com integrações de ferramentas, WhatsApp, formulários e soluções de automação para facilitar o contato com clientes e otimizar processos.' },
    ],
  },
  contact: {
    label: 'Contato',
    title: ['Tem um projeto em mente?', 'Bora conversar.'],
    button: 'Chamar no WhatsApp',
    note: 'Conte o que você precisa e vamos construir uma proposta para o seu negócio.',
  },
  footer: {
    navLabel: 'Navegação',
    socialLabel: 'Redes',
    contactLabel: 'Contato',
    timeLabel: 'Horário local',
    top: 'Voltar ao topo',
    rights: 'Todos os direitos reservados.',
    made: 'Desenhado e programado por mim.',
  },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  locale: 'en',
  htmlLang: 'en',
  home: '/en/',
  alt: { label: 'PT', href: '/', name: 'Português' },
  meta: {
    title: 'lorenzo. | Web designer & developer',
    description:
      'Lorenzo, web designer and developer. Custom websites, landing pages, redesign, SEO and integrations to strengthen your business online.',
  },
  skip: 'Skip to content',
  nav: [
    { id: 'projetos', label: 'Work' },
    { id: 'servicos', label: 'Services' },
    { id: 'sobre', label: 'About' },
    { id: 'contato', label: 'Contact' },
  ],
  cta: "Let's talk",
  menu: { open: 'Menu', close: 'Close', label: 'Navigation' },
  loader: ['design', 'code'],
  hero: {
    lines: ['Websites people remember.', 'Design and code for brands', 'that want to stand out.'],
    role: 'Web designer & dev',
    place: 'Brazil',
    scroll: 'Scroll',
  },
  manifesto: {
    label: 'Manifesto',
    phrases: [
      'Your website is the first conversation with your client.',
      "If it doesn't hook them in 3 seconds, it's over.",
      'I build websites that make people stay.',
    ],
  },
  projects: {
    label: 'Recent work',
    title: 'Selected work',
    intro: 'Design, development and strategy across three projects. Explore the websites and the thinking behind each one.',
    visit: 'Visit site',
    code: 'Code',
    concept: 'Concept',
    institutional: 'Business website',
    items: {
      'life-odontologia':
        'Business website for a dental clinic, presenting its specialties and clinical team, with navigation between pages and direct WhatsApp contact.',
      neuralkinetics:
        'Concept experience for a technology company, with a contemporary visual identity, animation and content about AI, digital products and connected systems.',
      dentora:
        'Concept website for a dental clinic, with editorial design, an image gallery, treatment presentations and an interactive booking demo.',
    },
  },
  services: {
    label: 'Services',
    title: 'What I can do for you',
    hint: 'Hover or tap each item',
    items: [
      { name: 'Custom websites', text: 'Modern, professional and responsive websites designed to build credibility, strengthen your brand and turn visitors into potential clients.' },
      { name: 'Landing pages', text: 'Strategic pages for campaigns, offers and lead generation, with focused navigation and effective calls to action.' },
      { name: 'Website redesign', text: 'I modernize your online presence with updated design, intuitive navigation and an experience that reflects the quality of your business.' },
      { name: 'SEO & optimization', text: 'SEO best practices, content structure, technical improvements and performance optimization to improve navigation and support search visibility.' },
      { name: 'Automation & integrations', text: 'Tools, WhatsApp, forms and automation connected to make client contact easier, improve processes and make your website more useful.' },
    ],
    visuals: {
      labels: ['01 · custom websites', '02 · landing pages', '03 · website redesign', '04 · SEO & performance', '05 · connected tools'],
      codeComment: '// your business, your online presence',
      strategy: ['who is the client?', 'what are they after?', 'why you?', "what's the next step?"],
      dev: ['responsive', 'fast', 'accessible'],
      care: [
        ['01', 'forms'],
        ['02', 'WhatsApp'],
        ['03', 'tools'],
        ['04', 'automation'],
      ],
    },
  },
  process: {
    label: 'Process',
    title: 'From hello to live',
    steps: [
      { name: 'Discovery', text: 'It starts with a conversation. I learn about your business, audience, goals and references to define the direction of the project.' },
      { name: 'Planning & design', text: 'I structure the pages, organize the content and develop a visual proposal that supports your identity and makes navigation easier.' },
      { name: 'Development', text: 'I turn the plan into a functional, responsive and optimized website, with attention to detail, performance and usability.' },
      { name: 'Launch & handover', text: 'After testing and final adjustments, I publish the site and provide guidance so you can use your new online presence independently.' },
    ],
  },
  about: {
    label: 'About',
    title: "Hi, I'm Lorenzo.",
    text: 'Web designer and developer passionate about turning ideas into memorable digital experiences. I combine strategic design, technology and user experience to build purposeful websites that help each business grow.',
    photoAlt: 'Portrait of Lorenzo',
    photoSoon: 'photo soon',
    stats: [
      { value: 3, suffix: '', label: 'live projects' },
      { value: 100, suffix: '%', label: 'responsive, phone to desktop' },
      { value: 1, suffix: '', label: 'person from brief to launch' },
    ],
  },
  stackLabel: 'Tools I use',
  faq: {
    label: 'FAQ',
    title: 'Before you ask',
    items: [
      { q: 'How much does a website cost?', a: 'Every project has its own needs, challenges and goals. I create tailored proposals to offer a solution that fits your business. Message me on WhatsApp to discuss your project.' },
      { q: 'How long does it take?', a: 'The timeline depends on the scope, features and content of each project. Once I understand what you need, we define the plan and timeline in the proposal.' },
      { q: 'Do I need copy and photos ready?', a: 'During discovery, we discuss the materials you already have and what the project needs. I organize the content and page structure during planning.' },
      { q: 'Will it work well on mobile?', a: 'Yes. Every site is designed mobile-first and tested on many screen sizes before going live.' },
      { q: 'Do you modernize existing websites?', a: 'Yes. Website redesign updates the look, navigation and experience so the website better reflects the quality of your business.' },
      { q: 'Can you integrate WhatsApp and forms?', a: 'Yes. I connect tools, WhatsApp, forms and automation to make client contact easier and improve business processes.' },
    ],
  },
  contact: {
    label: 'Contact',
    title: ['Got a project in mind?', "Let's talk."],
    button: 'Message me on WhatsApp',
    note: 'Tell me what you need and we can build a proposal for your business.',
  },
  footer: {
    navLabel: 'Navigation',
    socialLabel: 'Social',
    contactLabel: 'Contact',
    timeLabel: 'Local time',
    top: 'Back to top',
    rights: 'All rights reserved.',
    made: 'Designed and coded by me.',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { pt, en };
