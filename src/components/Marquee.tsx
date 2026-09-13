import { memo } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  /** Contenu répété en boucle (le séparateur ✦ rouge est inséré entre les items) */
  items: ReactNode[];
  /** Bandeau encre (une) ou papier */
  variant?: 'ink' | 'paper';
  slow?: boolean;
  className?: string;
}

/** Bandeau télétype défilant · pause au survol, figé si prefers-reduced-motion */
function MarqueeInner({ items, variant = 'ink', slow = false, className }: MarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-grotesk font-bold uppercase tracking-[0.14em]">
            {item}
          </span>
          <span className="text-red" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={cn(
        'group overflow-hidden border-y border-ink py-3 text-sm',
        variant === 'ink' ? 'bg-ink text-paper' : 'bg-paper text-ink',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max group-hover:[animation-play-state:paused]',
          slow ? 'animate-marquee-slow' : 'animate-marquee',
        )}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

const Marquee = memo(MarqueeInner);
export default Marquee;
