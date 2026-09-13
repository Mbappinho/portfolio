import { useEffect } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { EDITION, IDENTITY, PAGES } from '@/lib/identity';

interface SommaireOverlayProps {
  open: boolean;
  onClose: () => void;
}

const EASE_INOUT: [number, number, number, number] = [0.83, 0, 0.17, 1];
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Sommaire plein écran (design §6.2) · page noire « verso » */
export default function SommaireOverlay({ open, onClose }: SommaireOverlayProps) {
  // Échap + verrouillage du scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Sommaire du numéro"
          className="fixed inset-0 z-[100] flex flex-col bg-ink text-paper"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease: EASE_INOUT }}
        >
          {/* Tête d'overlay */}
          <div className="flex items-center justify-between border-b border-paper/30 px-5 py-4 md:px-10">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper/70">
              {EDITION.dateline}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 font-grotesk text-xs font-extrabold uppercase tracking-[0.14em] transition-colors hover:text-red"
            >
              Fermer
              <span aria-hidden="true" className="text-lg leading-none">×</span>
            </button>
          </div>

          {/* Table des matières */}
          <nav className="flex-1 overflow-y-auto px-5 py-8 md:px-10" aria-label="Sommaire">
            <ul className="mx-auto max-w-5xl">
              {PAGES.map((page, i) => (
                <motion.li
                  key={page.route}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE_OUT }}
                  className="border-b border-paper/20"
                >
                  <Link
                    to={page.route}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 py-3 md:gap-6 md:py-4"
                  >
                    <span className="font-mono text-sm text-red md:text-base">{page.num}</span>
                    <span className="font-display text-[clamp(1.6rem,5vw,4rem)] font-black leading-none transition-all duration-300 group-hover:translate-x-3 group-hover:italic group-hover:text-red">
                      {page.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mx-2 flex-1 border-b border-dotted border-paper/40"
                    />
                    <span className="font-mono text-sm text-paper/70 md:text-base">{page.num}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Pied d'overlay */}
          <div className="border-t border-paper/30 px-5 py-4 md:px-10">
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper/70">
              <span>PRIX LIBRE · DÉPÔT LÉGAL {EDITION.date}</span>
              <span className="flex gap-5">
                <a
                  href={IDENTITY.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-red"
                >
                  GitHub
                </a>
                <a href={`mailto:${IDENTITY.email}`} className="transition-colors hover:text-red">
                  {IDENTITY.email}
                </a>
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
