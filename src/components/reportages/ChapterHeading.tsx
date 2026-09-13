import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ChapterHeadingProps {
  /** Numéro du chapitre, ex. « 02 » */
  num: string;
  /** Intertitre, ex. « SORTIR LE TEXTE DE LA MACHINE » */
  title: string;
}

/** Intertitre de chapitre · filet fort 2px + H2 Archivo 800 uppercase, révélé au scroll */
export default function ChapterHeading({ num, title }: ChapterHeadingProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from('.ch-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      });
      gsap.from('.ch-title', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root}>
      <div aria-hidden="true" className="ch-rule border-t-2 border-ink" />
      <h2 className="ch-title mt-6 font-grotesk text-[clamp(1.4rem,2.6vw,2.2rem)] font-extrabold uppercase leading-tight tracking-[0.02em]">
        <span className="mr-3 font-mono font-bold text-red">{num}</span> · {title}
      </h2>
    </div>
  );
}
