import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface Chapitre {
  /** id d'ancre de la section (sans #) */
  id: string;
  /** libellé Space Mono, ex. « 01 LE CONSTAT » */
  label: string;
}

interface ChapitresNavProps {
  chapitres: Chapitre[];
}

/**
 * Sommaire du reportage (projet-localisation.md §2) · bandeau fileté d'ancres.
 * Clic = scroll doux vers la section ; chapitre actif surligné rouge (ScrollTrigger).
 */
export default function ChapitresNav({ chapitres }: ChapitresNavProps) {
  const root = useRef<HTMLElement>(null);
  const [actif, setActif] = useState<string | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      // Apparition y:16 stagger 0.06s, trigger 90 %
      gsap.from('.chap-item', {
        y: 16,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 90%' },
      });
      // État actif pendant le défilement
      chapitres.forEach((c) => {
        const cible = document.getElementById(c.id);
        if (!cible) return;
        ScrollTrigger.create({
          trigger: cible,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActif(c.id);
          },
        });
      });
    },
    { scope: root, dependencies: [reduced, chapitres] },
  );

  const allerA = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <nav
      ref={root}
      aria-label="Chapitres du reportage"
      className="mt-16 border-y border-ink py-4"
    >
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
        <span className="chap-item font-grotesk text-xs font-extrabold uppercase tracking-[0.22em]">
          Chapitres
        </span>
        {chapitres.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            onClick={(e) => {
              e.preventDefault();
              allerA(c.id);
            }}
            className={cn(
              'chap-item inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-colors duration-200',
              actif === c.id ? 'text-red' : 'text-ink-soft hover:text-ink',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'h-1.5 w-1.5 transition-colors duration-200',
                actif === c.id ? 'bg-red' : 'bg-ink/30',
              )}
            />
            {c.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
