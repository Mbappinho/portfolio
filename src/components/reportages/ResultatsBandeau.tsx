import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface Resultat {
  /** Valeur affichée, ex. « 100 % », « 1-clic », « vX.Y », « < 1 s » */
  valeur: string;
  /** Étiquette Space Mono sous le chiffre */
  label: string;
}

interface ResultatsBandeauProps {
  items: Resultat[];
}

/**
 * Bandeau résultats (4 blocs filetés, chiffres Playfair 900) ·
 * compteurs animés 1.2s power2.out quand un nombre est détecté.
 */
export default function ResultatsBandeau({ items }: ResultatsBandeauProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from('.res-cell', {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      // Compteurs : décompte depuis 0 jusqu'à la valeur cible
      gsap.utils.toArray<HTMLElement>('.res-num').forEach((el) => {
        const cible = Number(el.dataset.target ?? '0');
        const compteur = { v: 0 };
        gsap.to(compteur, {
          v: cible,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
          onStart: () => {
            el.textContent = '0';
          },
          onUpdate: () => {
            el.textContent = String(Math.round(compteur.v));
          },
        });
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className="border-y-2 border-ink">
      <div className="grid grid-cols-2 gap-px bg-ink/40 lg:grid-cols-4">
        {items.map((it) => {
          const m = it.valeur.match(/^([^\d]*)(\d+)([\s\S]*)$/);
          return (
            <div key={it.label} className="res-cell bg-paper px-5 py-6 md:px-6">
              <p className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-black leading-none tracking-[-0.02em]">
                {m ? (
                  <>
                    {m[1]}
                    <span className="res-num" data-target={m[2]}>
                      {m[2]}
                    </span>
                    {m[3]}
                  </>
                ) : (
                  it.valeur
                )}
              </p>
              <p className="mt-3 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
                {it.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
