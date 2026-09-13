import { useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface EncartChiffreProps {
  /** Kicker rouge, ex. « LE CHIFFRE », « LE CONSTAT » */
  kicker: string;
  children: ReactNode;
  className?: string;
}

/** Encart rouge (filet 2px, fond paper-deep) · le filet se dessine puis le contenu fond (0.6s) */
export default function EncartChiffre({ kicker, children, className }: EncartChiffreProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      });
      tl.from('.encart-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.6,
        ease: 'power3.inOut',
      }).from(
        '.encart-body',
        { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' },
        '-=0.15',
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <aside ref={root} className={cn('border-2 border-ink bg-paper-deep p-6', className)}>
      <div aria-hidden="true" className="encart-rule h-[2px] w-16 bg-red" />
      <div className="encart-body mt-4">
        <p className="kicker text-red">{kicker}</p>
        <p className="mt-3 font-body text-[1.05rem] leading-relaxed">{children}</p>
      </div>
    </aside>
  );
}
