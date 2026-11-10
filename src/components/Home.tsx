import type { Dictionary } from '@/content/dictionaries';
import { projects, site, stack } from '@/content/site';
import Header from './Header';
import Loader from './Loader';
import HeroShader from './HeroShader';
import Clock from './Clock';
import Services from './Services';
import Motion from './Motion';
import WhatsAppIcon from './WhatsAppIcon';

const intl = (t: Dictionary) => (t.locale === 'pt' ? 'pt-BR' : 'en-GB');

function Giant() {
  return (
    <span className="giant" aria-hidden="true">
      {'lorenzo'.split('').map((c, i) => (
        <span className="ch" key={i}>
          {c}
        </span>
      ))}
      <span className="ch dot">.</span>
    </span>
  );
}

function SecHead({ idx, label, title, intro }: { idx: string; label: string; title: string; intro?: string }) {
  return (
    <div className="sec-head">
      <p className="label">
        <span className="label-idx">{idx}</span>
        {label}
      </p>
      <div className="sec-title">
        <h2 className="h2" data-split>
          {title}
        </h2>
        {intro && (
          <p className="body-lg" data-fade>
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ t }: { t: Dictionary }) {
  return (
    <section className="hero" id="top" aria-label="lorenzo.">
      <HeroShader />
      <div className="hero-copy">
        <h1>
          {t.hero.lines.map((line, i) => (
            <span className="line-mask" data-hero-line key={line}>
              <span className={i > 0 ? 'muted' : undefined}>{line}</span>
            </span>
          ))}
        </h1>
        <div className="hero-meta hero-fade">
          <span className="label">{t.hero.role}</span>
          <span className="label">
            <Clock prefix={t.hero.place} locale={intl(t)} />
          </span>
        </div>
      </div>
      <div className="scroll-ind hero-fade" aria-hidden="true">
        <span className="track" />
        <span className="label">{t.hero.scroll}</span>
      </div>
      <Giant />
    </section>
  );
}

function Manifesto({ t }: { t: Dictionary }) {
  return (
    <section className="manifesto" aria-label={t.manifesto.label}>
      <div className="manifesto-stage">
        <p className="label">
          <span className="label-idx">00</span>
          {t.manifesto.label}
        </p>
        {t.manifesto.phrases.map((p) => (
          <p className="manifesto-phrase" key={p}>
            {p}
          </p>
        ))}
        <span className="manifesto-count" data-manifesto-count aria-hidden="true">
          01 / 0{t.manifesto.phrases.length}
        </span>
      </div>
    </section>
  );
}

function Projects({ t }: { t: Dictionary }) {
  return (
    <section className="section" id="projetos">
      <div className="wrap">
        <SecHead idx="01" label={t.projects.label} title={t.projects.title} intro={t.projects.intro} />
        <div className="projects-list">
          {projects.map((p, i) => (
            <article className="proj" key={p.slug}>
              <div className="divider" data-draw />
              <div className="proj-idx">
                <span>0{i + 1}</span>
                <span>{p.year}</span>
              </div>
              <div className="proj-media">
                <div className="clip">
                  <div className="px">
                    <img
                      src={p.image}
                      srcSet={`${p.imageSm} 800w, ${p.image} 1440w`}
                      sizes="(min-width: 900px) 50vw, 100vw"
                      width={1440}
                      height={900}
                      alt={`${p.name}: ${t.locale === 'pt' ? 'página inicial' : 'home page'}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
              <div className="proj-body">
                <h3 className="h3">
                  <a className="proj-hit" href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.name}
                  </a>
                </h3>
                <p>{t.projects.items[p.slug]}</p>
                <div className="tags">
                  {p.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag === 'Vídeo' && t.locale === 'en' ? 'Video' : tag}
                    </span>
                  ))}
                </div>
                <div className="proj-links">
                  <span className="ulink visit" aria-hidden="true">
                    {t.projects.visit}
                  </span>
                  <a className="secondary ulink" href={p.repo} target="_blank" rel="noopener noreferrer">
                    {t.projects.code}
                    <span className="sr-only"> {p.name} (GitHub)</span>
                  </a>
                </div>
                <p className="label proj-concept">{t.projects[p.kind]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ t }: { t: Dictionary }) {
  return (
    <section className="section services" id="servicos" data-theme="light" data-header-theme="light">
      <div className="wrap">
        <SecHead idx="02" label={t.services.label} title={t.services.title} />
        <Services s={t.services} />
      </div>
    </section>
  );
}

function Process({ t }: { t: Dictionary }) {
  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="process-pin">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">
              <span className="label-idx">03</span>
              {t.process.label}
            </p>
            <div className="sec-title">
              <h2 className="h2" id="process-title" data-split>
                {t.process.title}
              </h2>
            </div>
          </div>
        </div>
        <ol className="process-track">
          {t.process.steps.map((s, i) => (
            <li className="step" key={s.name}>
              <span className="step-num" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3 className="h3" style={{ marginBottom: 12 }}>
                  {s.name}
                </h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About({ t }: { t: Dictionary }) {
  return (
    <section className="section" id="sobre">
      <div className="wrap">
        <SecHead idx="04" label={t.about.label} title={t.about.title} />
        <div className="about-grid">
          <figure className="about-photo">
            {site.photo ? (
              <img src={site.photo} alt={t.about.photoAlt} width={1086} height={1448} loading="lazy" decoding="async" data-parallax />
            ) : (
              <>
                <div className="placeholder" data-parallax aria-hidden="true">
                  <span className="wordmark">
                    l<span className="dot">.</span>
                  </span>
                </div>
                <figcaption className="label">{t.about.photoSoon}</figcaption>
              </>
            )}
          </figure>
          <div className="about-body">
            <p className="about-text" data-scroll-reveal>
              {t.about.text}
            </p>
            <dl className="stats">
              {t.about.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="stat-value">
                    <span data-count-to={s.value}>{s.value}</span>
                    {s.suffix && <sup>{s.suffix}</sup>}
                  </dd>
                  <dd>
                    <p aria-hidden="true">{s.label}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee({ t }: { t: Dictionary }) {
  const group = (hidden: boolean) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {stack.map((s) => (
        <span key={s} style={{ display: 'contents' }}>
          <span>{s}</span>
          <i />
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label={t.stackLabel}>
      <p className="wrap label marquee-label">{t.stackLabel}</p>
      <div className="marquee" data-marquee>
        <div className="marquee-track">
          {group(false)}
          {group(true)}
          {group(true)}
        </div>
      </div>
    </section>
  );
}

function Faq({ t }: { t: Dictionary }) {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="label">
            <span className="label-idx">05</span>
            {t.faq.label}
          </p>
          <div className="sec-title">
            <h2 className="h2" id="faq-title" data-split>
              {t.faq.title}
            </h2>
          </div>
        </div>
        <div className="faq-wrap">
          <div className="faq-list">
            {t.faq.items.map((f) => (
              <details className="faq-item" name="faq" key={f.q}>
                <summary>
                  {f.q}
                  <i aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ t }: { t: Dictionary }) {
  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="label" style={{ marginBottom: 28 }}>
          <span className="label-idx">06</span>
          {t.contact.label}
        </p>
        <h2 className="h2" id="contact-title" data-split>
          <span className="muted">{t.contact.title[0]}</span>
          <br />
          {t.contact.title[1]}
        </h2>
        <div className="btn-wrap" data-magnet>
          <a className="btn btn-primary btn-lg" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span className="roll">
              <span>{t.contact.button}</span>
              <span aria-hidden="true">{t.contact.button}</span>
            </span>
          </a>
        </div>
        <p className="label contact-note">{t.contact.note}</p>
      </div>
    </section>
  );
}

function Footer({ t }: { t: Dictionary }) {
  const social = [
    { label: 'GitHub', href: site.github },
    site.instagram && { label: 'Instagram', href: site.instagram },
    site.linkedin && { label: 'LinkedIn', href: site.linkedin },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div className="footer-grid">
          <div>
            <h2 className="label">{t.footer.navLabel}</h2>
            <ul>
              {t.nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label">{t.footer.socialLabel}</h2>
            <ul>
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label">{t.footer.contactLabel}</h2>
            <ul>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`}>E-mail</a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="label">{t.footer.timeLabel}</h2>
            <p className="clock">
              <Clock prefix={t.hero.place} locale={intl(t)} />
            </p>
          </div>
        </div>
        <div className="footer-bar label">
          <span>
            © {new Date().getFullYear()} lorenzo. {t.footer.rights}
          </span>
          <span>{t.footer.made}</span>
          <a className="ulink" href="#top">
            {t.footer.top}
          </a>
        </div>
      </div>
      <Giant />
    </footer>
  );
}

/* ------------------------------------------------------------------ */

export default function Home({ t }: { t: Dictionary }) {
  return (
    <>
      <a className="skip" href="#conteudo">
        {t.skip}
      </a>
      <Loader words={t.loader} />
      <Header t={t} />
      <main id="conteudo">
        <Hero t={t} />
        <Manifesto t={t} />
        <Projects t={t} />
        <ServicesSection t={t} />
        <Process t={t} />
        <About t={t} />
        <Marquee t={t} />
        <Faq t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <Motion />
    </>
  );
}
