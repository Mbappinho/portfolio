import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface FigureRevealProps {
  src: string;
  alt: string;
  /** Légende « FIG. 0X · … » */
  caption: string;
  className?: string;
}

/** Figure d'article · révélation « développement photo » (clip-path 1.2s + scale 1.08→1) */
export default function FigureReveal({ src, alt, caption, className }: FigureRevealProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      tl.fromTo(
        '.fig-clip',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut' },
      ).from('.fig-img', { scale: 1.08, duration: 1.2, ease: 'power3.inOut' }, 0);
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <figure ref={root} className={className}>
      <div className={cn('fig-clip border-[1.5px] border-ink')}>
        <img src={src} alt={alt} width={1400} height={900} className="fig-img halftone block w-full" />
      </div>
      <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}
