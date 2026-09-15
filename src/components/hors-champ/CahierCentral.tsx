import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Stamp from '@/components/Stamp';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { asset } from '@/lib/identity';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NBSP = ' ';

/**
 * Découpage manuel en mots pour la citation en exergue.
 * L'espace entre les mots est un vrai NBSP placé hors du masque
 * overflow-hidden : une espace ordinaire serait fusionnée en fin
 * d'inline-block et les mots se colleraient.
 */
function Mots({ text }: { text: string }) {
  return (
    <span role="text" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="cahier-mot inline-block will-change-transform">{w}</span>
          </span>
          {NBSP}
        </span>
      ))}
    </span>
  );
}

/**
 * Cahier central (design hors-champ §4) · page noire de la revue :
 * fond encre, texte papier, accents rouges, tampon « PROLÉTARIAT CRÉATIF ».
 * Entrée : le fond noir monte (clip-path inset), contenu en stagger.
 */
export default function CahierCentral() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        '.cahier-fond',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.8,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
        },
      );
      gsap.from('.cahier-bloc', {
        y: 24,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 60%', once: true },
      });
      gsap.fromTo(
        '.cahier-clip',
        { clipPath: 'inset(0 0 0 100%)' },
        {
          clipPath: 'inset(0 0 0 0%)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: root.current, start: 'top 60%', once: true },
        },
      );
      gsap.from('.cahier-stamp', {
        scale: 0,
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: root.current, start: 'top 50%', once: true },
      });
      gsap.from('.cahier-mot', {
        yPercent: 110,
        stagger: 0.05,
        duration: 0.7,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.cahier-citation', start: 'top 80%', once: true },
      });
      gsap.from('.cahier-rule', {
        scaleX: 0,
        transformOrigin: 'center center',
        duration: 0.8,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.cahier-citation', start: 'top 80%', once: true },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} aria-label="Cahier central : lecture marxiste" className="relative">
      <div className="cahier-fond relative bg-ink text-paper">
        {/* Grain inversé */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
          style={{ backgroundImage: `url('${asset('grain.svg')}')`, backgroundSize: '400px 400px' }}
        />
        <div className="relative mx-auto max-w-container px-5 py-16 md:px-8 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
            {/* Texte · col. 1–6 */}
            <div className="lg:col-span-6">
              <p className="cahier-bloc kicker text-red">CAHIER CENTRAL · ESSAI</p>
              <h2 className="cahier-bloc mt-4 font-display text-[clamp(2rem,4.5vw,3.8rem)] font-black italic leading-[1.02] tracking-[-0.01em]">
                Lire <span className="text-red">Le Capital</span> entre deux builds
              </h2>
              <p className="cahier-bloc mt-6 max-w-[58ch] font-body text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65] text-paper/85">
                La lecture marxiste n'est pas un poster au mur{NBSP}: c'est une méthode. Qui produit
                quoi, pour qui, avec quels outils{NBSP}? Appliquée au numérique (aux plateformes,
                au travail gratuit des mods, à l'open source), elle pose les bonnes questions. Ce
                portfolio publie ses outils en open source aussi pour ça{NBSP}: le savoir partagé
                vaut mieux que le savoir gardé.
              </p>
              <div aria-hidden="true" className="cahier-bloc mt-8 h-[2px] w-24 bg-red" />
            </div>

            {/* Image · col. 7–12, filet papier, tampon en chevauchement */}
            <figure className="relative lg:col-span-6">
              <div className="cahier-clip overflow-hidden border-[1.5px] border-paper">
                <img
                  src={asset('marx-books.jpg')}
                  alt="Pile de livres de philosophie en noir et blanc halftone, avec un crayon et un carnet, lumière latérale dramatique"
                  width={1200}
                  height={900}
                  className="halftone block w-full"
                />
              </div>
              <Stamp
                text="PROLÉTARIAT CRÉATIF"
                subtext="ÉDITION N°1"
                size={150}
                tilt={-10}
                className="cahier-stamp absolute -left-8 -top-8 hidden w-[130px] md:block lg:-left-12 lg:w-[150px]"
              />
              <figcaption className="mt-4 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper/60">
                FIG. 03 · LA BIBLIOTHÈQUE QUI DÉRANGE, LUMIÈRE DE BUREAU.
              </figcaption>
            </figure>
          </div>

          {/* Citation en exergue */}
          <blockquote className="cahier-citation mx-auto mt-16 max-w-4xl text-center md:mt-24">
            <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-black italic leading-tight">
              <Mots
                text={`«${NBSP}Les philosophes n'ont fait qu'interpréter le monde${NBSP}; ce qui importe, c'est de le transformer.${NBSP}»`}
              />
            </p>
            <div aria-hidden="true" className="cahier-rule mx-auto mt-8 h-[2px] w-40 bg-red" />
            <footer className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper/60">
              · D'APRÈS K. M., ADAPTÉ PAR LA RÉDACTION
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
