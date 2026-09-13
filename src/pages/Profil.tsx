import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Folio from '@/components/Folio';
import Stamp from '@/components/Stamp';
import NoteDeLaRedaction from '@/components/NoteDeLaRedaction';
import { EDITION } from '@/lib/identity';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NBSP = ' ';

/** Découpage manuel en mots, chaque mot dans un masque overflow-hidden (SplitText balisage) */
function Words({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} role="text" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className="split-word inline-block will-change-transform">{w}</span>
          {NBSP}
        </span>
      ))}
    </span>
  );
}

const META = [`MOT-COMPTE${NBSP}: 648`, `TEMPS DE LECTURE${NBSP}: 3 MIN`, 'RÉDIGÉ À PARIS, FRANCE'];

interface ParcoursEntry {
  date: string;
  texte: string;
  route?: string;
  ici?: boolean;
}

const PARCOURS: ParcoursEntry[] = [
  {
    date: '2023',
    texte: `Premiers mods et scripts${NBSP}: extraire, comprendre, modifier des fichiers de jeu.`,
  },
  {
    date: '2024',
    texte: `Premiers serveurs auto-hébergés${NBSP}: le salon devient une salle des machines.`,
  },
  {
    date: '2025',
    texte: `Entrée en licence Information-Communication.`,
  },
  {
    date: '2025',
    texte: 'Tarkov Barter Scanner mis en ligne via GitHub Pages.',
    route: '/projets/tarkov-barter-scanner',
  },
  {
    date: '2026',
    texte: `Localisation intégrale de Welcome to the Game III publiée en open source.`,
    route: '/projets/localisation-wttg3',
  },
  {
    date: '2026',
    texte: `Édition N°1${NBSP}: ce portfolio. Objectif${NBSP}: stage ou alternance.`,
    ici: true,
  },
];

const CHIFFRES = [
  { value: 2, suffix: '', label: 'Projets publiés et documentés' },
  { value: 4, suffix: '', label: 'Langages & environnements pratiqués (HTML, JS, Python, shell)' },
  { value: 100, suffix: `${NBSP}%`, label: 'Autodidacte sur la partie technique' },
  { value: 1, suffix: '', label: 'Stage ou alternance recherché(e)', red: true },
];

/** Page 02 · Le Manifeste : éditorial en colonnes, parcours, chiffres (design profil.md) */
export default function Profil() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return; // contenu visible tel quel

      // §1 · En-tête : kicker + filets en scaleX, titre par mots, chapo fondu
      gsap.from('.prof-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power3.inOut',
        stagger: 0.12,
      });
      gsap.from('.prof-kicker', { y: 16, opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 });
      gsap.from('.prof-title .split-word', {
        yPercent: 110,
        rotate: 2,
        stagger: 0.04,
        duration: 1,
        ease: 'power4.out',
        delay: 0.25,
      });
      gsap.from('.prof-chapo', { y: 24, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 });
      gsap.from('.prof-meta', { y: 12, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.7 });

      // §2 · Corps : révélation paragraphe par paragraphe + lettrine
      gsap.from('.prof-par', {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.prof-body', start: 'top 85%' },
      });
      gsap.from('.prof-lettrine', {
        scale: 0.5,
        opacity: 0,
        duration: 0.7,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.prof-body', start: 'top 85%' },
      });

      // §2 · Marginalia : stagger latéral, tampons séquentiels
      gsap.from('.marg-item', {
        x: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.prof-marginalia', start: 'top 80%' },
      });
      gsap.from('.marg-stamp', {
        scale: 0,
        stagger: 0.18,
        duration: 0.55,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.prof-marginalia', start: 'top 80%' },
      });

      // §3 · Parcours : chaque ligne se dessine (filet puis texte)
      gsap.from('.tl-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.tl-list', start: 'top 80%' },
      });
      gsap.from('.tl-row', {
        x: -16,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.15,
        scrollTrigger: { trigger: '.tl-list', start: 'top 80%' },
      });

      // §4 · Chiffres de la rédaction : compteurs animés
      gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
        const target = Number(el.dataset.value ?? '0');
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v));
          },
        });
      });
      gsap.from('.stat-label', {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        delay: 0.3,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.stats-band', start: 'top 80%' },
      });

      // §5 · Appel à la lecture : mots + filet rouge
      gsap.from('.next-page .split-word', {
        yPercent: 110,
        stagger: 0.05,
        duration: 0.7,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.next-page', start: 'top 80%' },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className="overflow-x-clip">
      <div className="mx-auto max-w-container px-5 py-12 md:px-8 md:py-16">
        {/* ── Section 1 · En-tête d'article ────────────────────────────── */}
        <header>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
            {EDITION.dateline} · PAGE 02 / 07
          </p>
          <div aria-hidden="true" className="prof-rule mt-3 border-t border-ink" />
          <p className="prof-kicker kicker mt-10 text-red">ÉDITORIAL · PAGE 02</p>
          <h1 className="prof-title mt-4 font-display text-[clamp(2.6rem,6.5vw,6rem)] font-black leading-[0.95] tracking-[-0.02em]">
            <Words text="Le manifeste d'un profil hybride" />
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <p className="prof-chapo border-l-[3px] border-red pl-6 font-body text-[clamp(1.15rem,1.8vw,1.5rem)] font-medium leading-snug lg:col-span-9">
              «{NBSP}Étudiant en Information et Communication, j'ai appris le code comme on apprend
              une langue étrangère{NBSP}: en la parlant. Communication numérique le jour, serveurs
              et scripts la nuit{NBSP}: ce numéro fait la synthèse des deux.{NBSP}»
            </p>
          </div>
          <div className="prof-meta mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
            {META.map((item, i) => (
              <span key={item} className="flex items-center gap-5">
                {i > 0 && <span aria-hidden="true" className="h-1.5 w-1.5 bg-red" />}
                {item}
              </span>
            ))}
          </div>
          <div aria-hidden="true" className="prof-rule mt-8 border-t-[3px] border-double border-ink" />
        </header>

        {/* ── Section 2 · Corps en deux colonnes + marginalia ──────────── */}
        <section className="mt-12 grid gap-12 lg:grid-cols-12" aria-label="Corps de l'éditorial">
          {/* Colonne texte (col. 1–8) */}
          <div className="prof-body lg:col-span-8 lg:columns-2 lg:gap-10 [&>p+p]:mt-6">
            <p className="prof-par font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
              <span
                aria-hidden="true"
                className="prof-lettrine float-left mr-3 mt-[0.1em] pb-[0.22em] font-display text-[clamp(3.8rem,6.5vw,5.5rem)] font-black leading-[0.8] text-red"
              >
                J
              </span>
              <span className="sr-only">J</span>e suis étudiant en Information et Communication. Ma
              formation m'a appris à raconter, structurer, documenter. Le reste (le développement,
              l'administration système, le modding), je l'ai appris seul, par projets, parce que
              chaque idée méritait un outil pour exister.
            </p>
            <p className="prof-par font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
              <span className="font-grotesk text-[0.8rem] font-bold uppercase tracking-[0.14em]">
                La méthode.{NBSP}
              </span>
              Mon approche tient en trois verbes{NBSP}: comprendre, construire, transmettre.
              Comprendre un système (un jeu, un marché, un serveur), construire l'outil qui me
              manque (un patch, une appli, un script), puis transmettre le résultat (documentation,
              guide, dépôt open source). La communication n'est pas un vernis posé sur la
              technique{NBSP}: c'est ce qui la rend utile.
            </p>
            <p className="prof-par font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
              <span className="font-grotesk text-[0.8rem] font-bold uppercase tracking-[0.14em]">
                La preuve par le dépôt.{NBSP}
              </span>
              Ce portfolio ne liste pas des intentions. Chaque compétence revendiquée page 03
              renvoie à un projet publié, documenté, utilisé par d'autres. Un installeur
              téléchargé, une appli consultée.
            </p>
            <p className="prof-par font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
              <span className="font-grotesk text-[0.8rem] font-bold uppercase tracking-[0.14em]">
                L'objectif.{NBSP}
              </span>
              Je cherche un stage ou une alternance dans le numérique, la communication ou les
              technologies{NBSP}: un endroit où écrire et coder le même jour ne surprend personne.
            </p>
          </div>

          {/* Marginalia sticky (col. 9–12) */}
          <aside
            className="prof-marginalia flex flex-col gap-10 self-start lg:sticky lg:top-[100px] lg:col-span-4"
            aria-label="Notes de marge"
          >
            <NoteDeLaRedaction className="marg-item">
              «{NBSP}Ce numéro est auto-édité{NBSP}: la maquette, le code, les textes et les projets
              décrits sont l'œuvre d'une seule personne. C'est aussi une compétence.{NBSP}»
            </NoteDeLaRedaction>

            <div className="marg-item flex flex-col items-center gap-1" aria-label="Tampons">
              <Stamp text="AUTODIDACTE" size={120} tilt={-6} className="marg-stamp" />
              <Stamp text="OPEN SOURCE" size={112} tilt={-3} className="marg-stamp -mt-4" />
              <Stamp text="PROLÉTARIAT CRÉATIF" size={128} tilt={4} className="marg-stamp -mt-4" />
            </div>

            <blockquote className="marg-item border-y border-ink py-5">
              <p className="font-body text-[0.95rem] italic leading-relaxed text-ink-soft">
                «{NBSP}Le code est un texte que deux lecteurs comprennent{NBSP}: la machine et le
                collègue. Je soigne les deux.{NBSP}»
              </p>
            </blockquote>
          </aside>
        </section>

        {/* ── Section 3 · Parcours « lignes du journal » ───────────────── */}
        <section className="mt-24" aria-label="Parcours">
          <div aria-hidden="true" className="border-t-2 border-ink" />
          <h2 className="mt-6 font-grotesk text-[clamp(1.4rem,2.6vw,2.2rem)] font-extrabold uppercase tracking-[0.02em]">
            Le parcours{NBSP}: ligne par ligne
          </h2>
          <ul className="tl-list mt-8">
            {PARCOURS.map((entry, i) => {
              const row = (
                <>
                  <span className="tl-date w-14 shrink-0 font-mono text-sm font-bold text-red transition-transform duration-300 group-hover:scale-125 group-hover:origin-left">
                    {entry.date}
                  </span>
                  <span className="font-grotesk font-medium leading-snug">
                    {entry.ici ? <strong className="font-extrabold">{entry.texte}</strong> : entry.texte}
                  </span>
                  {entry.ici && (
                    <span className="ml-2 inline-block -rotate-[1.5deg] bg-red px-2 py-0.5 font-grotesk text-[0.65rem] font-bold uppercase tracking-[0.14em] text-paper">
                      Vous êtes ici
                    </span>
                  )}
                  {entry.route && (
                    <span
                      aria-hidden="true"
                      className="ml-auto shrink-0 pl-4 text-red opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      →
                    </span>
                  )}
                </>
              );
              const rowClass =
                'tl-row group flex flex-wrap items-baseline gap-x-5 gap-y-1 px-2 py-4 transition-colors duration-200 hover:bg-paper-deep';
              return (
                <li key={`${entry.date}-${i}`} className="tl-item">
                  <div aria-hidden="true" className="tl-rule border-t border-ink/40" />
                  {entry.route ? (
                    <Link to={entry.route} className={rowClass} data-cursor="LIRE">
                      {row}
                    </Link>
                  ) : (
                    <div className={rowClass}>{row}</div>
                  )}
                  {i === PARCOURS.length - 1 && (
                    <div aria-hidden="true" className="tl-rule border-t border-ink/40" />
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* ── Section 4 · Chiffres de la rédaction ─────────────────────── */}
        <section className="mt-24" aria-label="Chiffres de la rédaction">
          <p className="kicker text-red">Chiffres de la rédaction</p>
          <div className="stats-band mt-6 grid grid-cols-2 gap-px border border-ink/30 bg-ink/30 lg:grid-cols-4">
            {CHIFFRES.map((c) => (
              <div key={c.label} className="bg-paper-deep p-6 md:p-8">
                <p
                  className={`font-display text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-none ${
                    c.red ? 'text-red' : ''
                  }`}
                >
                  <span className="stat-num" data-value={c.value}>
                    0
                  </span>
                  {c.suffix}
                </p>
                <p className="stat-label mt-4 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5 · Appel à la lecture ───────────────────────────── */}
        <section className="mt-24" aria-label="Appel à la lecture">
          <div aria-hidden="true" className="border-t-[3px] border-double border-ink" />
          <Link to="/competences" className="next-page group mt-12 block" data-cursor="LIRE">
            <span className="font-display text-[clamp(2rem,5.5vw,4.5rem)] font-black italic leading-[1.05] tracking-[-0.02em]">
              <Words text={`Tournez la page${NBSP}: les rubriques`} />
              <span
                aria-hidden="true"
                className="ml-3 inline-block text-red transition-transform duration-300 group-hover:translate-x-2"
              >
                →
              </span>
            </span>
            <span
              aria-hidden="true"
              className="mt-4 block h-[2px] w-full origin-left scale-x-0 bg-red transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
          </Link>
        </section>

        <Folio page="02" />
      </div>
    </div>
  );
}
