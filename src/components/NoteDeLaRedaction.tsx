import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NoteDeLaRedactionProps {
  kicker?: string;
  children: ReactNode;
  className?: string;
}

/** Encart « Note de la rédaction » (design §6.5) · apartés en italique */
export default function NoteDeLaRedaction({
  kicker = 'NOTE DE LA RÉDACTION',
  children,
  className,
}: NoteDeLaRedactionProps) {
  return (
    <aside
      className={cn(
        'border-2 border-ink bg-paper-deep p-6 shadow-[6px_6px_0_0_rgba(23,20,14,0.15)]',
        className,
      )}
    >
      <div className="border-t border-ink/40 pt-3">
        <p className="kicker text-red">{kicker}</p>
      </div>
      <div className="mt-4 font-body italic leading-relaxed text-ink-soft">{children}</div>
      <div className="mt-4 border-t border-ink/40" aria-hidden="true" />
    </aside>
  );
}
