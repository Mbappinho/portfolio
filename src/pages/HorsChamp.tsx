import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Folio from '@/components/Folio';
import CahierCentral from '@/components/hors-champ/CahierCentral';
import EntretienImaginaire from '@/components/hors-champ/EntretienImaginaire';
import { LIENS_CROISES } from '@/data/hors-champ';
import { EDITION } from '@/lib/identity';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NBSP = ' ';

/** Découpage manuel en mots (SplitText côté balisage, sûr avec React) */
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

/**
 * Page 06 · Hors-champ (design hors-champ.md) : les passions.
 * Trois articles de fond, un cahier central, un entretien imaginaire.
 */
export default function HorsChamp() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      // §1 · En-tête : kicker scaleX, titre mots, chapo fondu retard 0.4s
      gsap.from('.hc-kicker', { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'power3.inOut' });
      gsap.from('.hc-titre .split-word', { yPercent: 110, rotate: 2, stagger: 0.04, duration: 1, ease: 'power4.out', delay: 0.15 });
      gsap.from('.hc-chapo', { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out', delay: 0.4 });
      gsap.from('.hc-rule', { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power3.inOut', delay: 0.6 });

      // §2 · Article 1 (football) : image depuis la gauche + parallaxe, texte x:30 stagger
      gsap.fromTo(
        '.foot-clip',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.art-foot', start: 'top 75%', once: true },
        },
      );
      gsap.from('.foot-img', {
        scale: 1.08,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.art-foot', start: 'top 75%', once: true },
      });
      gsap.to('.foot-img', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: '.art-foot', start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.from('.foot-kicker-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.art-foot', start: 'top 75%', once: true },
      });
      gsap.from('.foot-txt', {
        x: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.art-foot', start: 'top 75%', once: true },
      });

      // §3 · Article 2 (Tarkov) : symétrique, image depuis la droite
      gsap.fromTo(
        '.tarkov-clip',
        { clipPath: 'inset(0 0 0 100%)' },
        {
          clipPath: 'inset(0 0 0 0%)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.art-tarkov', start: 'top 75%', once: true },
        },
      );
      gsap.from('.tarkov-img', {
        scale: 1.08,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.art-tarkov', start: 'top 75%', once: true },
      });
      gsap.to('.tarkov-img', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: '.art-tarkov', start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.from('.tarkov-kicker-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.art-tarkov', start: 'top 75%', once: true },
      });
      gsap.from('.tarkov-txt', {
        x: -30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.art-tarkov', start: 'top 75%', once: true },
      });

      // §6 · Poursuivre la lecture
      gsap.from('.hc-next', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.hc-next', start: 'top 90%', once: true },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className="overflow-x-clip">
      <div className="mx-auto max-w-container px-5 md:px-8">
        {/* Bandeau d'édition */}
        <p className="pt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
          {EDITION.dateline} · PAGE 06 / 07
        </p>
        <div aria-hidden="true" className="mt-3 border-t border-ink" />

        {/* ── Section 1 · En-tête ───────────────────────────────────────── */}
        <section className="pt-10 md:pt-14" aria-label="En-tête Hors-champ">
          <p className="hc-kicker kicker text-red">HORS-CHAMP · PAGE 06</p>
          <h1 className="hc-titre mt-4 font-display text-[clamp(2.6rem,6.5vw,6rem)] font-black leading-[0.95] tracking-[-0.02em]">
            <Words text="Ce qui se passe hors du cadre" />
          </h1>
          <p className="hc-chapo mt-6 max-w-[62ch] font-body text-[clamp(1.05rem,1.6vw,1.35rem)] italic leading-snug text-ink-soft">
            Un rédacteur en chef ne vit pas que de dépôts et de filets. Trois passions, trois
            articles de fond{NBSP}: le football, les raids de Tarkov, et quelques livres qui
            dérangent.
          </p>
          <div aria-hidden="true" className="hc-rule mt-8 border-t-[3px] border-double border-ink" />
        </section>

        {/* ── Section 2 · Article 1 : Le football ───────────────────────── */}
        <section className="art-foot grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-6" aria-label="Article : le football">
          <figure className="lg:col-span-6">
            <div className="relative -rotate-1">
              <div className="foot-clip overflow-hidden border-[1.5px] border-ink">
                <img
                  src="/assets/football.jpg"
                  alt="Ballon de football sur un terrain urbain en noir et blanc halftone, filet de but flou, lumière de fin de journée"
                  width={1200}
                  height={900}
                  className="foot-img halftone block w-full will-change-transform"
                />
              </div>
            </div>
            <figcaption className="mt-5 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
              FIG. 01 · DIMANCHE, 15 H. QUELQUE PART EN BANLIEUE.
            </figcaption>
          </figure>
          <div className="lg:col-span-6">
            <p className="foot-txt kicker text-red">TERRAINS VAGUES · CHRONIQUE</p>
            <div aria-hidden="true" className="foot-kicker-rule mt-3 h-[1.5px] w-24 bg-red" />
            <h2 className="foot-txt mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02] tracking-[-0.01em]">
              Le ballon avant le bitmap
            </h2>
            <p className="foot-txt mt-6 max-w-[58ch] font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
              Avant les écrans, il y avait le terrain. Le football apprend ce qu'aucun tutoriel
              n'enseigne{NBSP}: jouer collectif, perdre et recommencer le dimanche suivant, lire un
              espace en mouvement. Le jeu et la culture (les tribunes, les chants, les feuilles de
              match griffonnées) comptent autant que le score.
            </p>
          </div>
        </section>

        {/* ── Section 3 · Article 2 : Les jeux vidéo (Tarkov) ───────────── */}
        <section className="art-tarkov grid items-center gap-12 border-t border-ink/30 py-16 md:py-24 lg:grid-cols-12 lg:gap-6" aria-label="Article : les jeux vidéo">
          <div className="lg:col-span-6">
            <p className="tarkov-txt kicker text-red">RAIDS NOCTURNES · CHRONIQUE</p>
            <div aria-hidden="true" className="tarkov-kicker-rule mt-3 h-[1.5px] w-24 bg-red" />
            <h2 className="tarkov-txt mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02] tracking-[-0.01em]">
              Tarkov, ou l'école de la tension
            </h2>
            <p className="tarkov-txt mt-6 max-w-[58ch] font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
              En ce moment, <em>Escape from Tarkov</em>. Un jeu qui ne pardonne rien{NBSP}: chaque
              raid est une prise de risque documentée{NBSP}: ce qu'on emporte, ce qu'on accepte de
              perdre. C'est aussi lui qui a inspiré le reportage de la page 05 de ce numéro{NBSP}:
              quand un jeu devient un terrain d'étude, la passion paie le loyer intellectuel.
            </p>
            <ul className="tarkov-txt mt-6 space-y-2">
              {LIENS_CROISES.map((lien) => (
                <li key={lien.route}>
                  <Link
                    to={lien.route}
                    data-cursor="LIRE"
                    className="inline-block font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-all duration-300 hover:translate-x-2 hover:italic hover:text-red"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <figure className="lg:col-span-6">
            <div className="relative rotate-1">
              <div className="tarkov-clip overflow-hidden border-[1.5px] border-ink">
                <img
                  src="/assets/tarkov-passion.jpg"
                  alt="Casque audio et souris sur un bureau dans le noir, écran qui lueut, ambiance de raid nocturne en noir et blanc"
                  width={1200}
                  height={900}
                  className="tarkov-img halftone block w-full will-change-transform"
                />
              </div>
            </div>
            <figcaption className="mt-5 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
              FIG. 02 · POSTE DE RAID, 2 H 14 DU MATIN.
            </figcaption>
          </figure>
        </section>
      </div>

      {/* ── Section 4 · Article 3 : Cahier central (page noire pleine largeur) ── */}
      <CahierCentral />

      <div className="mx-auto max-w-container px-5 md:px-8">
        {/* ── Section 5 · L'entretien imaginaire ────────────────────────── */}
        <div className="py-16 md:py-24">
          <EntretienImaginaire />
        </div>

        {/* ── Section 6 · Poursuivre la lecture ─────────────────────────── */}
        <nav aria-label="Poursuivre la lecture" className="hc-next">
          <div aria-hidden="true" className="border-t-[3px] border-double border-ink" />
          <Link
            to="/contact"
            data-cursor="LIRE"
            className="group flex items-baseline justify-between gap-4 py-8 font-display text-[clamp(1.6rem,4vw,3rem)] font-black italic leading-tight transition-colors hover:text-red md:py-10"
          >
            <span>Dernière page{NBSP}: le colophon</span>
            <span aria-hidden="true" className="inline-block text-red transition-transform duration-300 group-hover:translate-x-3">→</span>
          </Link>
        </nav>

        <Folio page="06" />
      </div>
    </div>
  );
}
