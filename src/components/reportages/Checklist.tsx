import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ChecklistProps {
  items: string[];
  /** Titre de l'encadré */
  title: string;
  className?: string;
}

/**
 * Encadré checklist (projet-localisation.md §6) · cases carrées cochées d'un
 * « ✕ » rouge Space Mono, cochées une à une au scroll (back.out(3), stagger 0.2s).
 */
export default function Checklist({ items, title, className }: ChecklistProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from('.check-row', {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('.check-mark', {
        scale: 0,
        rotate: -20,
        stagger: 0.2,
        duration: 0.4,
        ease: 'back.out(3)',
        delay: 0.3,
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <aside ref={root} className={cn('border-[1.5px] border-ink bg-paper-deep', className)}>
      <p className="border-b-[1.5px] border-ink px-5 py-3 font-grotesk text-xs font-extrabold uppercase tracking-[0.22em]">
        {title}
      </p>
      <ul>
        {items.map((item) => (
          <li
            key={item}
            className="check-row flex items-center gap-4 border-b border-ink/25 px-5 py-3.5 last:border-b-0"
          >
            <span
              aria-hidden="true"
              className="flex h-5 w-5 shrink-0 items-center justify-center border-[1.5px] border-ink bg-paper"
            >
              <span className="check-mark inline-block font-mono text-sm font-bold leading-none text-red">
                ✕
              </span>
            </span>
            <span className="font-body text-[0.95rem] leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
