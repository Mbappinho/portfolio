import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ENTRETIEN } from '@/data/hors-champ';
import { IDENTITY } from '@/lib/identity';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * L'entretien imaginaire (design hors-champ §5) · Q/R façon interview :
 * questions Archivo 800 précédées d'un carré rouge + « LA RÉDACTION. »,
 * réponses Newsreader précédées de « TB. » en Space Mono rouge.
 * Chaque paire apparaît au scroll, un filet fin se dessine entre les paires.
 */
export default function EntretienImaginaire() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>('.qr-paire').forEach((el) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('.qr-filet').forEach((el, i) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.9,
          ease: 'power3.inOut',
          delay: i * 0.2,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} aria-label="L'entretien imaginaire">
      <p className="kicker text-red">L'ENTRETIEN · LA RÉDACTION SE QUESTIONNE ELLE-MÊME</p>
      <div className="mt-10">
        {ENTRETIEN.map((qr, i) => (
          <div key={qr.question}>
            {i > 0 && <div aria-hidden="true" className="qr-filet my-10 border-t border-ink/30" />}
            <div className="qr-paire grid gap-8 md:grid-cols-2 md:gap-10">
              {/* Question */}
              <div>
                <p className="flex items-center gap-3 font-grotesk text-[0.7rem] font-bold uppercase tracking-[0.22em]">
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-red" />
                  LA RÉDACTION.
                </p>
                <h3 className="mt-3 font-grotesk text-[clamp(1.1rem,1.8vw,1.5rem)] font-extrabold uppercase leading-snug tracking-[0.02em]">
                  {qr.question}
                </h3>
              </div>
              {/* Réponse */}
              <div className="md:border-l md:border-ink/30 md:pl-10">
                <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-red">
                  {IDENTITY.logotype}
                </p>
                <p className="mt-3 max-w-[58ch] font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65]">
                  {qr.reponse}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
