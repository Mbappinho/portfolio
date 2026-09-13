import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface LectureRef {
  titre: string;
  route: string;
  /** Étiquette d'accompagnement (ex. « Reportage suivant ») · remplace le libellé par défaut */
  etiquette?: string;
}

interface PoursuivreLectureProps {
  prev: LectureRef;
  next: LectureRef;
}

/**
 * « Poursuivre la lecture » (projet-localisation.md §8) · filet double +
 * deux cartes de navigation, Playfair 900 italique, hover rouge + translateX.
 */
export default function PoursuivreLecture({ prev, next }: PoursuivreLectureProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from('.suite-card', {
        y: 24,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  const carte = (sens: 'prec' | 'suiv', cible: LectureRef) => (
    <Link
      to={cible.route}
      data-cursor="LIRE"
      className={cn(
        'suite-card group block border-ink/40 py-8 md:py-10',
        sens === 'prec'
          ? 'border-b md:border-b-0 md:border-r md:pr-10'
          : 'md:pl-10 md:text-right',
      )}
    >
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
        {cible.etiquette ?? (sens === 'prec' ? '← Reportage précédent' : 'Reportage suivant →')}
      </p>
      <p
        className={cn(
          'mt-3 inline-block font-display text-[clamp(1.5rem,2.8vw,2.4rem)] font-black italic leading-tight transition-all duration-300 group-hover:text-red',
          sens === 'prec' ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2',
        )}
      >
        {cible.titre}
        <span
          aria-hidden="true"
          className="mt-1 block h-[2px] w-full origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100"
        />
      </p>
    </Link>
  );

  return (
    <section ref={root} aria-label="Poursuivre la lecture" className="mt-20 md:mt-28">
      <div aria-hidden="true" className="border-t-[3px] border-double border-ink" />
      <div className="grid md:grid-cols-2">
        {carte('prec', prev)}
        {carte('suiv', next)}
      </div>
    </section>
  );
}
