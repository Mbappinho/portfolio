import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { TROCS, formatMarge, formatRoubles } from '@/data/troc';
import { cn } from '@/lib/utils';

type Tri = 'asc' | 'desc';

const COLONNES = 'minmax(230px,2fr) minmax(100px,0.8fr) minmax(100px,0.9fr) minmax(100px,0.9fr) minmax(120px,1fr) minmax(120px,0.9fr)';

const margeDe = (t: (typeof TROCS)[number]) => t.revente - t.cout;

/** Pastille hachurée (DÉFICITAIRE) · hachures N&B façon presse */
const HACHURES = {
  backgroundImage:
    'repeating-linear-gradient(45deg, transparent 0 3px, rgba(23,20,14,0.28) 3px 4.5px)',
} as const;

/**
 * Mini-scanner fonctionnel (projet-scanner.md §4) · tableau factice de
 * 6 échanges : recherche instantanée, tri par marge (▲▼), pastilles
 * RENTABLE / DÉFICITAIRE. Style tableau de revue financière.
 * Interactions en Framer Motion (flip layout 0.35s, fondu 0.2s).
 */
export default function MiniScanner() {
  const [recherche, setRecherche] = useState('');
  const [tri, setTri] = useState<Tri>('desc');

  const lignes = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    const filtres = TROCS.filter(
      (t) =>
        !q ||
        t.demande.toLowerCase().includes(q) ||
        t.recu.toLowerCase().includes(q) ||
        t.marchand.toLowerCase().includes(q),
    );
    return [...filtres].sort((a, b) =>
      tri === 'desc' ? margeDe(b) - margeDe(a) : margeDe(a) - margeDe(b),
    );
  }, [recherche, tri]);

  return (
    <div className="border-[1.5px] border-ink bg-paper shadow-[8px_8px_0_0_rgba(23,20,14,0.15)]">
      {/* En-tête de l'encart démo */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-ink px-5 py-3">
        <p className="font-grotesk text-xs font-extrabold uppercase tracking-[0.22em]">
          Mini-scanner · démo interactive
        </p>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft">
          Données d'exemple · prix figés
        </p>
      </div>

      {/* Champ de recherche · filtre instantané */}
      <div className="flex items-center gap-3 border-b border-ink/40 px-5 py-3">
        <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-soft" strokeWidth={1.5} />
        <input
          type="search"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un objet, un marchand…"
          aria-label="Filtrer les échanges"
          className="w-full bg-transparent font-mono text-[0.8rem] tracking-[0.04em] placeholder:text-ink-soft/60 focus:outline-none"
        />
        <span className="hidden shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft sm:inline">
          {lignes.length} / {TROCS.length} échanges
        </span>
      </div>

      <div className="overflow-x-auto">
        <div role="table" aria-label="Échanges de troc, échantillon" className="min-w-[820px]">
          {/* En-têtes */}
          <div
            role="row"
            className="grid items-center gap-4 border-b border-ink px-5 py-2.5"
            style={{ gridTemplateColumns: COLONNES }}
          >
            <span role="columnheader" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft">
              Échange
            </span>
            <span role="columnheader" className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft">
              Marchand
            </span>
            <span role="columnheader" className="text-right font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft">
              Coût
            </span>
            <span role="columnheader" className="text-right font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft">
              Revente
            </span>
            <button
              type="button"
              role="columnheader"
              aria-sort={tri === 'desc' ? 'descending' : 'ascending'}
              onClick={() => setTri((t) => (t === 'desc' ? 'asc' : 'desc'))}
              className="text-right font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-colors hover:text-red"
            >
              Marge{' '}
              <span aria-hidden="true" className="text-red">
                {tri === 'desc' ? '▼' : '▲'}
              </span>
              <span aria-hidden="true" className="text-ink/30">
                {tri === 'desc' ? '▲' : '▼'}
              </span>
            </button>
            <span role="columnheader" className="text-right font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft">
              Statut
            </span>
          </div>

          {/* Lignes · construction stagger 0.07s à l'entrée, flip layout au tri */}
          <motion.div
            role="rowgroup"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {lignes.map((t) => {
                const marge = margeDe(t);
                const rentable = marge >= 0;
                return (
                  <motion.div
                    key={t.id}
                    role="row"
                    layout="position"
                    variants={{
                      hidden: { opacity: 0, x: -24 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                    className="grid items-center gap-4 border-b border-ink/25 px-5 py-3.5 last:border-b-0 hover:bg-paper-deep/60"
                    style={{ gridTemplateColumns: COLONNES }}
                  >
                    <span role="cell" className="min-w-0">
                      <span className="block truncate font-mono text-[0.7rem] uppercase tracking-[0.06em] text-ink-soft">
                        Donne : {t.demande}
                      </span>
                      <span className="mt-1 block truncate font-grotesk text-[0.85rem] font-bold uppercase tracking-[0.04em]">
                        <span aria-hidden="true" className="mr-1.5 text-red">→</span>
                        {t.recu}
                      </span>
                    </span>
                    <span role="cell" className="font-body text-[0.9rem] italic">
                      {t.marchand}
                    </span>
                    <span role="cell" className="text-right font-mono text-[0.8rem] tabular-nums">
                      {formatRoubles(t.cout)}
                    </span>
                    <span role="cell" className="text-right font-mono text-[0.8rem] tabular-nums">
                      {formatRoubles(t.revente)}
                    </span>
                    <span
                      role="cell"
                      className={cn(
                        'text-right font-mono text-[0.8rem] font-bold tabular-nums',
                        rentable ? 'text-ink' : 'text-red',
                      )}
                    >
                      {formatMarge(marge)}
                    </span>
                    <span role="cell" className="text-right">
                      <span
                        className={cn(
                          'inline-block px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em]',
                          rentable ? 'border-[1.5px] border-ink' : 'text-ink',
                        )}
                        style={rentable ? undefined : HACHURES}
                      >
                        {rentable ? 'Rentable' : 'Déficitaire'}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {lignes.length === 0 && (
              <p className="px-5 py-8 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
                Aucun échange ne correspond. Élargissez la recherche.
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <p className="border-t border-ink/40 px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft">
        Échantillon : l'application complète analyse des centaines d'échanges, prix actualisés.
      </p>
    </div>
  );
}
