import { useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NBSP = ' ';

/** Découpage manuel en mots, chaque mot dans un masque overflow-hidden (SplitText balisage) */
function Words({ text }: { text: string }) {
  return (
    <span role="text" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <span className="hero-word inline-block will-change-transform">{w}</span>
          {NBSP}
        </span>
      ))}
    </span>
  );
}

interface ReportageHeroProps {
  /** Kicker, ex. « REPORTAGE N°1 · PAGE 04 » */
  kicker: string;
  /** Titre H1 du reportage */
  title: string;
  /** Sous-titre Archivo 500 (italique de titre d'œuvre possible) */
  subtitle: ReactNode;
  image: string;
  imageAlt: string;
  /** Légende « FIG. 01 · … » */
  caption: string;
  /** Pastille rouge sur l'image, ex. « OPEN SOURCE » */
  pastille: string;
  /** Lignes de métadonnées Space Mono (RÔLE / STACK / STATUT) */
  metas: string[];
}

/**
 * Hero de reportage (projet-localisation.md §1) : kicker, H1 géant, sous-titre,
 * image 21:9 avec pastille rouge, métadonnées en filets.
 * Animations : SplitText mots, clip-path + scale sur l'image, parallaxe -8 %.
 */
export default function ReportageHero({
  kicker,
  title,
  subtitle,
  image,
  imageAlt,
  caption,
  pastille,
  metas,
}: ReportageHeroProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return; // contenu visible tel quel

      // Titre : mots masqués, stagger 0.05s, 1.1s
      gsap.from('.hero-word', {
        yPercent: 110,
        rotate: 2,
        stagger: 0.05,
        duration: 1.1,
        ease: 'power4.out',
        delay: 0.1,
      });
      gsap.from('.hero-kicker, .hero-sub', {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        delay: 0.6,
      });

      // Image : révélation « développement photo » + pastille
      const tl = gsap.timeline({ delay: 0.35 });
      tl.fromTo(
        '.hero-clip',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut' },
      )
        .from('.hero-img', { scale: 1.08, duration: 1.2, ease: 'power3.inOut' }, 0)
        .from(
          '.hero-pastille',
          { scale: 0, rotate: -18, duration: 0.55, ease: 'back.out(2)' },
          0.45, // retard absolu ≈ 0.8s
        );

      // Parallaxe image -8 % sur toute la hauteur du hero
      gsap.to('.hero-img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-fig', start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // Métadonnées : lignes en stagger depuis la gauche
      gsap.from('.hero-meta', {
        x: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        delay: 1,
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} aria-label={title} className="pt-10 md:pt-14">
      <p className="hero-kicker kicker text-red">{kicker}</p>
      <h1 className="mt-5 font-display text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[0.95] tracking-[-0.02em]">
        <Words text={title} />
      </h1>
      <p className="hero-sub mt-6 max-w-[62ch] font-grotesk text-[clamp(1rem,1.6vw,1.3rem)] font-medium leading-snug text-ink-soft">
        {subtitle}
      </p>

      <figure className="hero-fig mt-10">
        <div className="relative">
          <div className="hero-clip border-[1.5px] border-ink">
            <div className="aspect-[21/9] overflow-hidden">
              <img
                src={image}
                alt={imageAlt}
                width={1920}
                height={1080}
                className="hero-img halftone block h-full w-full object-cover will-change-transform"
              />
            </div>
          </div>
          <span className="hero-pastille absolute -top-3 right-4 -rotate-3 bg-red px-3 py-1.5 font-grotesk text-xs font-bold uppercase tracking-[0.14em] text-paper shadow-[4px_4px_0_0_rgba(23,20,14,0.25)] md:right-8">
            {pastille}
          </span>
        </div>
        <figcaption className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
          {caption}
        </figcaption>
      </figure>

      <div className="mt-8 grid gap-3 border-y border-ink py-4 md:grid-cols-3 md:gap-0 md:divide-x md:divide-ink/40">
        {metas.map((m) => (
          <p
            key={m}
            className="hero-meta font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] md:px-4 md:first:pl-0 md:last:pr-0"
          >
            {m}
          </p>
        ))}
      </div>
    </section>
  );
}
