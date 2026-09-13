import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CodeBlockProps {
  /** Lignes de code (commentaires = lignes débutant par # ou //) */
  lines: string[];
  /** Nom de fichier affiché dans la barre de titre */
  file: string;
  className?: string;
}

/**
 * Bloc code encadré (fond encre, Space Mono 0.8rem) · les lignes se « tapent »
 * une à une au scroll (clip-path, stagger 0.2s, trigger 80 %), curseur bloc clignotant.
 */
export default function CodeBlock({ lines, file, className }: CodeBlockProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        '.code-line',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          stagger: 0.2,
          duration: 0.45,
          ease: 'power1.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <figure
      ref={root}
      className={cn('border-[1.5px] border-ink bg-ink text-paper shadow-[8px_8px_0_0_rgba(23,20,14,0.15)]', className)}
    >
      {/* Barre de titre façon terminal */}
      <div className="flex items-center justify-between border-b border-paper/25 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 border border-paper/60" />
          <span className="h-2.5 w-2.5 border border-paper/60" />
          <span className="h-2.5 w-2.5 bg-red" />
        </span>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper/60">{file}</span>
      </div>
      <pre aria-label={`Extrait de code, fichier ${file}`} className="overflow-x-auto p-5 font-mono text-[0.8rem] leading-[1.7]">
        {lines.map((ligne, i) => {
          const commentaire = ligne.trimStart().startsWith('#') || ligne.trimStart().startsWith('//');
          const derniere = i === lines.length - 1;
          return (
            <div key={i} className="code-line whitespace-pre">
              <span className={commentaire ? 'text-paper/50' : 'text-paper'}>
                {ligne}
                {derniere && (
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block h-[1em] w-[0.62em] translate-y-[0.15em] animate-caret-blink bg-paper"
                  />
                )}
              </span>
            </div>
          );
        })}
      </pre>
    </figure>
  );
}
