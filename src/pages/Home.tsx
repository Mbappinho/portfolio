import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Marquee from '@/components/Marquee';
import { IDENTITY, SOMMAIRE } from '@/lib/identity';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NBSP = ' ';

/** Découpage manuel en caractères (SplitText côté balisage, sûr avec React) */
function Chars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} role="text" aria-label={text}>
      {text.split('').map((c, i) => (
        <span key={i} aria-hidden="true" className="mast-char inline-block will-change-transform">
          {c === ' ' ? NBSP : c}
        </span>
      ))}
    </span>
  );
}

/** Découpage manuel en mots, chaque mot dans un masque overflow-hidden */
function Words({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} role="text" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className="quote-word inline-block will-change-transform">{w}</span>
          {NBSP}
        </span>
      ))}
    </span>
  );
}

const DATELINE = ['ÉDITION N°1', 'SEPTEMBRE 2026', 'PRIX LIBRE', `REVUE PERSONNELLE${NBSP}·${NBSP}TIRAGE UNIQUE`];

const ACCROCHES = [
  {
    titre: `TRADUIRE L'INTRADUISIBLE`,
    texte: `Comment j'ai francisé intégralement Welcome to the Game III, puis publié l'installeur en open source.`,
    folio: 'P. 04',
    route: '/projets/localisation-wttg3',
  },
  {
    titre: `L'ÉCONOMIE DU TROC`,
    texte: `Tarkov Barter Scanner${NBSP}: l'appli web qui calcule la rentabilité de chaque échange.`,
    folio: 'P. 05',
    route: '/projets/tarkov-barter-scanner',
  },
  {
    titre: 'HORS-CHAMP',
    texte: `Football, Tarkov et Le Capital${NBSP}: les passions d'un rédacteur.`,
    folio: 'P. 06',
    route: '/hors-champ',
  },
];

/** Page 01 · Couverture : une du magazine (design home.md) */
export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return; // contenu visible tel quel, révélation simple

      // §1 · Dateline : mentions depuis le haut, puis filet
      gsap.from('.dl-item', { y: '-100%', opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out' });
      gsap.from('.dl-rule', { scaleX: 0, transformOrigin: 'left center', duration: 0.8, ease: 'power3.inOut', delay: 0.35 });

      // §2 · Masthead : caractères, sous-titre, carré rouge
      gsap.from('.mast-char', { yPercent: 110, rotate: 3, stagger: 0.035, duration: 1.1, ease: 'power4.out', delay: 0.2 });
      gsap.from('.mast-sub', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.9 });
      gsap.from('.mast-sq', { scale: 0, duration: 0.5, ease: 'back.out(3)', delay: 1.2 });
      gsap.from('.mast-rule', { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power3.inOut', delay: 1 });

      // §3a · Accroches : stagger à l'entrée dans le viewport
      gsap.utils.toArray<HTMLElement>('.hl-item').forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // §3b · Visuel de une : révélation « développement photo » + tampon + parallaxe
      const portraitTl = gsap.timeline({
        scrollTrigger: { trigger: '.portrait-wrap', start: 'top 80%' },
      });
      portraitTl
        .fromTo(
          '.portrait-clip',
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut' },
        )
        .from('.portrait-img', { scale: 1.08, duration: 1.2, ease: 'power3.inOut' }, 0)
        .from('.portrait-stamp', { scale: 0, rotate: -30, duration: 0.6, ease: 'back.out(2)' }, 0.7);
      gsap.to('.portrait-img', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: '.portrait-wrap', start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // §3c · Sommaire abrégé : lignes une à une
      gsap.from('.som-row', {
        x: -20,
        opacity: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.som-list', start: 'top 85%' },
      });

      // §4 · Bandeau télétype : coulisse depuis la droite au chargement
      gsap.fromTo(
        '.teletype',
        { clipPath: 'inset(0 0 0 100%)' },
        { clipPath: 'inset(0 0 0 0%)', duration: 0.8, ease: 'power3.inOut', delay: 1.4 },
      );

      // §5 · Exergue : mots + filet rouge
      gsap.from('.quote-word', {
        yPercent: 100,
        stagger: 0.05,
        duration: 0.7,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.quote', start: 'top 75%' },
      });
      gsap.from('.quote-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.6,
        scrollTrigger: { trigger: '.quote', start: 'top 75%' },
      });

      // §6 · Barre de bas de couverture : fondu
      gsap.from('.cover-bar', {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: '.cover-bar', start: 'top 90%' },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className="overflow-x-clip">
      <div className="mx-auto max-w-container px-5 md:px-8">
        {/* ── Section 1 · Bandeau supérieur (dateline) ─────────────────── */}
        <div className="pt-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
            {DATELINE.map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" className="h-1.5 w-1.5 bg-red" />}
                <span className="inline-block overflow-hidden">
                  <span className="dl-item inline-block">{item}</span>
                </span>
              </span>
            ))}
          </div>
          <div aria-hidden="true" className="dl-rule mt-3 border-t border-ink" />
        </div>

        {/* ── Section 2 · Masthead ─────────────────────────────────────── */}
        <section className="pt-10 md:pt-16" aria-label="Masthead">
          <h1 className="font-display font-black leading-[0.9] tracking-[-0.02em]">
            <span className="block overflow-hidden text-[clamp(3.5rem,11vw,10rem)]">
              <Chars text={IDENTITY.firstName} />
            </span>
            <span className="block overflow-hidden text-[clamp(3.5rem,11vw,10rem)] italic">
              <Chars text={IDENTITY.lastName} />
              <span
                aria-hidden="true"
                className="mast-sq ml-[0.12em] inline-block h-[0.18em] w-[0.18em] animate-pulse-soft bg-red align-baseline"
              />
            </span>
          </h1>
          <p className="mast-sub mt-6 max-w-[62ch] font-body text-[clamp(1.1rem,2vw,1.6rem)] italic leading-snug text-ink-soft">
            «{NBSP}Revue trimestrielle de communication, de code et d'idées, écrite, traduite et
            programmée par son propre rédacteur en chef.{NBSP}»
          </p>
          <div aria-hidden="true" className="mast-rule mt-8 border-t-[3px] border-double border-ink" />
        </section>

        {/* ── Section 3 · Corps de une ─────────────────────────────────── */}
        <section className="grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-6" aria-label="Corps de une">
          {/* Colonne gauche · accroches */}
          <div className="lg:col-span-3">
            <p className="kicker text-red">À la une</p>
            <ul className="mt-6">
              {ACCROCHES.map((a) => (
                <li key={a.route} className="hl-item border-t border-ink/30 py-5 first:mt-0">
                  <Link to={a.route} data-cursor="LIRE" className="group block">
                    <h2 className="font-grotesk text-base font-extrabold uppercase leading-tight tracking-[0.02em] transition-colors duration-300 group-hover:italic group-hover:text-red">
                      {a.titre}
                    </h2>
                    <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-ink-soft">{a.texte}</p>
                    <span className="relative mt-3 inline-block font-mono text-[0.7rem] uppercase tracking-[0.14em]">
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                        {a.folio}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne centrale · visuel de une */}
          <figure className="portrait-wrap lg:col-span-6">
            <div className="relative mx-auto max-w-[520px] -rotate-1">
              <div className="portrait-clip border-[1.5px] border-ink">
                <img
                  src={IDENTITY.couverture}
                  alt="Nature morte de rédaction : clavier, écran cathodique et carnet, en noir et blanc halftone"
                  width={1200}
                  height={1500}
                  className="portrait-img halftone block w-full will-change-transform"
                />
              </div>
              <img
                src="/assets/stamp-dispo.svg"
                alt=""
                aria-hidden="true"
                className="portrait-stamp absolute -right-[8%] -top-[6%] w-[28%] -rotate-12"
              />
            </div>
            <figcaption className="mt-5 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
              FIG. 01 · NATURE MORTE DE RÉDACTION : CLAVIER, ÉCRAN CATHODIQUE ET CARNET.
            </figcaption>
          </figure>

          {/* Colonne droite · sommaire abrégé */}
          <nav className="lg:col-span-3" aria-label="Sommaire abrégé">
            <h2 className="border-y border-ink py-2 text-center font-grotesk text-sm font-extrabold uppercase tracking-[0.22em]">
              Sommaire
            </h2>
            <ul className="som-list mt-2">
              {SOMMAIRE.map((p) => (
                <li key={p.route} className="som-row border-b border-ink/20">
                  <Link
                    to={p.route}
                    className="group flex items-baseline gap-2 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.1em]"
                  >
                    <span className="text-ink-soft transition-colors group-hover:text-red">{p.num}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      {p.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mx-1 flex-1 animate-dots-pulse border-b border-dotted border-ink/50"
                    />
                    <span>{p.num}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>

      {/* ── Section 4 · Bandeau télétype (pleine largeur) ──────────────── */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="teletype">
          <Marquee
            variant="ink"
            items={[
              `STAGE & ALTERNANCE RECHERCHÉS`,
              'NUMÉRIQUE',
              'COMMUNICATION',
              'TECHNOLOGIES',
              'RENTRÉE 2026',
            ]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-container px-5 md:px-8">
        {/* ── Section 5 · Exergue ──────────────────────────────────────── */}
        <section className="quote py-20 text-center md:py-28" aria-label="Exergue">
          <blockquote className="mx-auto max-w-4xl font-display text-[clamp(1.6rem,3.5vw,3rem)] font-black italic leading-tight">
            <Words text={`«${NBSP}Je ne collectionne pas les diplômes${NBSP}: je publie des preuves.${NBSP}»`} />
          </blockquote>
          <div aria-hidden="true" className="quote-rule mx-auto mt-8 h-[2px] w-40 bg-red" />
          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
            · LE RÉDACTEUR EN CHEF, ÉDITORIAL, P. 02
          </p>
          <p className="mt-10">
            <Link
              to="/profil"
              data-cursor="LIRE"
              className="group inline-flex items-center gap-3 border-[1.5px] border-ink bg-paper px-8 py-4 font-grotesk text-base font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-[250ms] hover:bg-ink hover:text-paper"
            >
              Lire le manifeste
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-[250ms] group-hover:translate-x-2"
              >
                →
              </span>
            </Link>
          </p>
        </section>

        {/* ── Section 6 · Barre de bas de couverture ───────────────────── */}
        <section className="cover-bar border-t-2 border-ink py-5" aria-label="Barre de bas de couverture">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <img src="/assets/barcode.svg" alt="Code-barres décoratif, ISSN 2026-0001" className="h-14 w-auto" />
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
              RÉDIGÉ, MAQUETTÉ ET CODÉ SANS AGENCE
            </p>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em]">
              P. 01 · SUIVEZ LE FIL{NBSP}
              <span aria-hidden="true" className="inline-block animate-arrow-bob text-red">↓</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
