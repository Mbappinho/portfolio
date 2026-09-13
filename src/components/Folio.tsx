import { EDITION, IDENTITY } from '@/lib/identity';
import { cn } from '@/lib/utils';

interface FolioProps {
  /** Numéro de page courante, ex. « 03 » */
  page: string;
  className?: string;
}

/** Folio de bas de page (design §6.3) · filet haut + ligne Space Mono */
export default function Folio({ page, className }: FolioProps) {
  return (
    <div className={cn('mt-16 border-t border-ink pt-3', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
        <span>{IDENTITY.name.toUpperCase()} · REVUE PERSONNELLE</span>
        <span aria-label={`Page ${page} sur 07`}>PAGE {page} / 07</span>
        <span>{EDITION.date}</span>
      </div>
    </div>
  );
}
