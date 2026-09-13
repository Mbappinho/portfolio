import { cn } from '@/lib/utils';

export interface JaugeProps {
  label: string;
  /** Niveau sur 10 (carrés pleins) */
  level: number;
  /** Spécialité : le dernier carré plein est rouge */
  special?: boolean;
}

/**
 * Jauge typographique (competences.md §2) · label Space Mono + rangée de
 * 10 carrés 10×10px : pleins en encre, vides en filet fin, dernier plein
 * rouge si spécialité. Remplissage en cascade animé par la page (GSAP).
 */
export default function Jauge({ label, level, special = false }: JaugeProps) {
  return (
    <div className="jauge">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em]">{label}</span>
        <span className="font-mono text-[0.7rem] tracking-[0.14em] text-ink-soft">
          {level}/10
        </span>
      </div>
      <div className="mt-2 flex gap-[5px]" role="img" aria-label={`${label} : niveau ${level} sur 10`}>
        {Array.from({ length: 10 }, (_, i) => {
          const filled = i < level;
          const isLastFilled = filled && i === level - 1;
          return (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                'jauge-sq inline-block h-[10px] w-[10px]',
                filled ? (special && isLastFilled ? 'bg-red' : 'bg-ink') : 'border border-ink/40',
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
