import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface FiligraneProps {
  /** Chiffre géant affiché en filigrane, ex. « 01 » */
  children: string;
}

/** Chiffre de rubrique filigrane (encre à 8 %) avec parallaxe y: -15 % sur la section */
export default function Filigrane({ children }: FiligraneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const section = ref.current.closest('section') ?? ref.current;
      gsap.to(ref.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    },
    { dependencies: [reduced] },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="select-none text-right font-display text-[clamp(5rem,14vw,13rem)] font-black leading-[0.8] text-ink/[0.08] will-change-transform"
    >
      {children}
    </div>
  );
}
