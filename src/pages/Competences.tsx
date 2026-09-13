import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Folio from '@/components/Folio';
import Jauge from '@/components/competences/Jauge';
import type { JaugeProps } from '@/components/competences/Jauge';
import ArticleAccordions from '@/components/competences/ArticleAccordions';
import type { Article } from '@/components/competences/ArticleAccordions';
import { EDITION, IDENTITY } from '@/lib/identity';
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

interface Rubrique {
  num: string;
  name: string;
  descriptif: string;
  jauges: JaugeProps[];
  articles: Article[];
}

const RUBRIQUES: Rubrique[] = [
  {
    num: '01',
    name: 'Développement & Scripting',
    descriptif: `Le code comme atelier${NBSP}: des interfaces web aux scripts d'automatisation, en passant par la gestion de versions rigoureuse.`,
    jauges: [
      { label: 'HTML / CSS', level: 8 },
      { label: 'JavaScript', level: 7 },
      { label: 'Python', level: 8, special: true },
      { label: 'Shell / Bash', level: 6 },
      { label: 'Git / GitHub', level: 8, special: true },
    ],
    articles: [
      {
        title: 'Python · automatisation & temps réel',
        tag: 'LANGAGE',
        body: `Scripts d'automatisation, traitement de données, clients WebSockets, télémétrie. C'est aussi le langage du pipeline de traduction du Reportage N°1.`,
        link: { label: 'Voir le reportage, p. 04', to: '/projets/localisation-wttg3' },
      },
      {
        title: 'JavaScript · interfaces utiles',
        tag: 'LANGAGE',
        body: `Applications web monopage, calculs côté client, rendu de tableaux de données. Langage du Tarkov Barter Scanner.`,
        link: { label: 'Voir le reportage, p. 05', to: '/projets/tarkov-barter-scanner' },
      },
      {
        title: 'HTML / CSS · la page comme matière',
        tag: 'LANGAGE',
        body: `Intégration soignée, responsive, sémantique. Ce site est ma dernière maquette en date.`,
      },
      {
        title: 'Shell scripting · la colle des systèmes',
        tag: 'OUTIL',
        body: `Scripts de déploiement, sauvegardes, tâches planifiées sur serveurs Linux et Windows.`,
      },
      {
        title: 'Git & GitHub · publier comme une rédaction',
        tag: 'PRATIQUE',
        body: `Historiques propres, README soignés, releases versionnées, documentation${NBSP}: le dépôt comme publication.`,
        link: { label: 'Voir le dépôt GitHub', to: IDENTITY.githubUrl, external: true },
      },
    ],
  },
  {
    num: '02',
    name: 'Communication & Éditorial',
    descriptif: `Formé en Info-Com, déformé par passion${NBSP}: traduire, rédiger, vulgariser, rendre lisible ce qui ne l'est pas.`,
    jauges: [
      { label: 'Localisation / traduction', level: 9, special: true },
      { label: 'Documentation technique', level: 8, special: true },
      { label: 'Rédaction web', level: 8 },
      { label: 'Vulgarisation', level: 7 },
    ],
    articles: [
      {
        title: 'Localisation de jeux vidéo',
        tag: 'PRATIQUE',
        body: `Traduction intégrale d'interface${NBSP}: ton, contraintes de longueur, cohérence terminologique, tests en contexte.`,
        link: { label: 'Voir le reportage N°1, p. 04', to: '/projets/localisation-wttg3' },
      },
      {
        title: 'Documentation technique',
        tag: 'PRATIQUE',
        body: `README, guides d'installation, FAQ${NBSP}: écrire pour que l'utilisateur n'ouvre jamais de ticket.`,
      },
      {
        title: 'Guides utilisateurs',
        tag: 'PRATIQUE',
        body: `Pas-à-pas illustrés, captures annotées, arbres de décision.`,
      },
      {
        title: 'Vulgarisation',
        tag: 'PRATIQUE',
        body: `Expliquer WebSockets ou l'injection d'assets à un lecteur non technique${NBSP}: l'exercice préféré de la rédaction.`,
      },
    ],
  },
  {
    num: '03',
    name: 'Systèmes & Serveurs',
    descriptif: `L'autohébergement comme école${NBSP}: quand on administre ses propres machines, on apprend vite, ou on réinstalle.`,
    jauges: [
      { label: 'Linux (Debian / Ubuntu)', level: 7 },
      { label: 'Windows Server / postes', level: 6 },
      { label: 'Déploiement & maintenance', level: 7 },
      { label: 'Modding / reverse-engineering léger', level: 8, special: true },
    ],
    articles: [
      {
        title: 'Administration Linux',
        tag: 'PRATIQUE',
        body: `Services systemd, pare-feu, reverse proxy, sauvegardes automatisées, durcissement de base.`,
      },
      {
        title: 'Environnements Windows',
        tag: 'PRATIQUE',
        body: `Déploiement, gestion de parc, scripts PowerShell, compatibilité des outils de modding.`,
      },
      {
        title: 'Serveurs dédiés & auto-hébergement',
        tag: 'PRATIQUE',
        body: `Location, configuration et supervision de serveurs dédiés pour jeux et services personnels.`,
      },
      {
        title: 'Modding & reverse-engineering léger',
        tag: 'PRATIQUE',
        body: `Extraction et réinjection d'assets, formats de fichiers propriétaires, patchs binaires documentés.`,
      },
    ],
  },
  {
    num: '04',
    name: 'Création multimédia & Communauté',
    descriptif: `L'image et le direct${NBSP}: habiller un stream, animer une communauté, tenir une régie.`,
    jauges: [
      { label: 'Identités graphiques / overlays', level: 7 },
      { label: 'Régie streaming (OBS)', level: 8 },
      { label: 'Gestion de communauté', level: 7 },
    ],
    articles: [
      {
        title: 'Identités graphiques & overlays',
        tag: 'PRATIQUE',
        body: `Habillages de stream cohérents${NBSP}: bannières, scènes, alertes, chartes minimales.`,
      },
      {
        title: 'Régie OBS',
        tag: 'OUTIL',
        body: `Scènes, sources, transitions, encodage${NBSP}: le direct comme édition spéciale.`,
      },
      {
        title: 'Animation de communauté',
        tag: 'PRATIQUE',
        body: `Modération, événements, communication autour des projets open source (releases, patch notes).`,
      },
    ],
  },
];

/** Page 03 · Rubriques : quatre départements de la rédaction (design competences.md) */
export default function Competences() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return; // contenu visible tel quel

      // §1 · En-tête : kicker scaleX, titre par mots, chapo fondu
      gsap.from('.comp-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power3.inOut',
        stagger: 0.12,
      });
      gsap.from('.comp-kicker', { y: 16, opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 });
      gsap.from('.comp-title .split-word', {
        yPercent: 110,
        rotate: 2,
        stagger: 0.04,
        duration: 1,
        ease: 'power4.out',
        delay: 0.25,
      });
      gsap.from('.comp-chapo', { y: 24, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 });

      // §2–5 · Rubriques : filigrane en parallaxe, en-tête de rubrique, jauges, accordéons
      gsap.utils.toArray<HTMLElement>('.rubrique').forEach((section) => {
        // Chiffre filigrane : parallaxe -15% sur toute la section
        gsap.to(section.querySelector('.filigrane'), {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        });
        // En-tête de rubrique : filet fort + titre
        gsap.from(section.querySelector('.rubrique-rule'), {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        });
        gsap.from(section.querySelector('.rubrique-head'), {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        });
        // Jauges : carrés en cascade, jauge par jauge
        const jauges = section.querySelectorAll('.jauge');
        if (jauges.length) {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: section.querySelector('.jauges'), start: 'top 85%' },
          });
          jauges.forEach((jauge, i) => {
            tl.from(
              jauge.querySelectorAll('.jauge-sq'),
              { scale: 0, stagger: 0.05, duration: 0.25, ease: 'back.out(2)' },
              i * 0.15,
            );
          });
        }
        // Accordéons : entrée de la liste en stagger
        gsap.from(section.querySelectorAll('.acc-item'), {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: section.querySelector('.acc-list'), start: 'top 85%' },
        });
      });

      // §6 · Sommaire des rubriques : révélation stagger
      gsap.from('.som-col', {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.rubriques-sommaire', start: 'top 85%' },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className="overflow-x-clip">
      <div className="mx-auto max-w-container px-5 py-12 md:px-8 md:py-16">
        {/* ── Section 1 · En-tête ──────────────────────────────────────── */}
        <header>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
            {EDITION.dateline} · PAGE 03 / 07
          </p>
          <div aria-hidden="true" className="comp-rule mt-3 border-t border-ink" />
          <p className="comp-kicker kicker mt-10 text-red">RUBRIQUES · PAGE 03</p>
          <h1 className="comp-title mt-4 font-display text-[clamp(2.6rem,6.5vw,6rem)] font-black leading-[0.95] tracking-[-0.02em]">
            <Words text="Quatre départements, une rédaction" />
          </h1>
          <p className="comp-chapo mt-8 max-w-[62ch] border-l-[3px] border-red pl-6 font-body text-[clamp(1.15rem,1.8vw,1.5rem)] font-medium leading-snug">
            «{NBSP}Chaque compétence est rangée là où elle vivrait dans un magazine{NBSP}: au
            développement, à l'éditorial, aux systèmes, à l'image. Ouvrez les articles pour lire le
            détail, et la preuve associée.{NBSP}»
          </p>
          <div aria-hidden="true" className="comp-rule mt-8 border-t-[3px] border-double border-ink" />
        </header>

        {/* ── Sections 2–5 · Les quatre rubriques ──────────────────────── */}
        {RUBRIQUES.map((rubrique) => (
          <section
            key={rubrique.num}
            id={`rubrique-${rubrique.num}`}
            className="rubrique relative mt-24 scroll-mt-24"
            aria-label={`Rubrique ${rubrique.num} : ${rubrique.name}`}
          >
            {/* Chiffre filigrane (encre 8%, parallaxe) */}
            <span
              aria-hidden="true"
              className="filigrane pointer-events-none absolute -top-10 right-0 select-none font-display text-[clamp(5rem,14vw,13rem)] font-black leading-none text-ink/[0.08]"
            >
              {rubrique.num}
            </span>

            {/* Titre de rubrique */}
            <div aria-hidden="true" className="rubrique-rule border-t-2 border-ink" />
            <div className="rubrique-head mt-6">
              <p className="font-mono text-[0.75rem] font-bold uppercase tracking-[0.14em] text-red">
                RUBRIQUE {rubrique.num}
              </p>
              <h2 className="mt-2 font-grotesk text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold uppercase leading-tight tracking-[0.02em]">
                {rubrique.name}
              </h2>
            </div>

            {/* Grille : descriptif + jauges (1–4) / accordéons (5–12) */}
            <div className="mt-10 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-body text-[clamp(1rem,1.15vw,1.125rem)] italic leading-[1.65] text-ink-soft">
                  {rubrique.descriptif}
                </p>
                <div className="jauges mt-8 flex flex-col gap-6">
                  {rubrique.jauges.map((jauge) => (
                    <Jauge key={jauge.label} {...jauge} />
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8">
                <ArticleAccordions articles={rubrique.articles} idPrefix={`rub-${rubrique.num}`} />
              </div>
            </div>
          </section>
        ))}

        {/* ── Section 6 · Sommaire des rubriques ───────────────────────── */}
        <section className="rubriques-sommaire mt-24" aria-label="Sommaire des rubriques">
          <div aria-hidden="true" className="border-t-[3px] border-double border-ink" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {RUBRIQUES.map((rubrique) => (
              <a
                key={rubrique.num}
                href={`#rubrique-${rubrique.num}`}
                className="som-col group block border-t border-ink/40 pt-4"
              >
                <p className="font-mono text-sm text-red">{rubrique.num}</p>
                <p className="mt-2 font-grotesk text-lg font-extrabold uppercase leading-snug tracking-[0.02em] transition-colors duration-200 group-hover:italic group-hover:text-red">
                  {rubrique.name}
                </p>
                <p className="mt-3 flex items-baseline gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
                  <span aria-hidden="true" className="flex-1 border-b border-dotted border-ink/40" />
                  P. 03
                </p>
              </a>
            ))}
          </div>
          <Link
            to="/projets/localisation-wttg3"
            className="group mt-16 block"
            data-cursor="LIRE"
          >
            <span className="font-display text-[clamp(2rem,5.5vw,4.5rem)] font-black italic leading-[1.05] tracking-[-0.02em]">
              Le premier reportage
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

        <Folio page="03" />
      </div>
    </div>
  );
}
