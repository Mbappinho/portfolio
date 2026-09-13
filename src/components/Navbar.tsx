import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { EDITION, IDENTITY, PAGES } from '@/lib/identity';

interface NavbarProps {
  onOpenSommaire: () => void;
}

/**
 * Barre de une (design §6.1) · fixe, 56px, fond papier, filet bas.
 * Ne pas éditer depuis les pages : l'offset (pt-14) est géré par Layout.
 */
export default function Navbar({ onOpenSommaire }: NavbarProps) {
  const { pathname } = useLocation();
  const [showRubrique, setShowRubrique] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowRubrique(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const rubrique = PAGES.find((p) => p.route === pathname);

  return (
    <header className="fixed top-0 z-50 h-14 w-full border-b border-ink bg-paper">
      <div className="mx-auto flex h-full max-w-container items-center justify-between gap-4 px-5 md:px-8">
        {/* Logotype + rubrique courante au scroll */}
        <div className="flex min-w-0 items-baseline gap-4">
          <Link
            to="/"
            className="font-display text-2xl font-black leading-none tracking-tight"
            aria-label={`${IDENTITY.name}, retour à la couverture`}
          >
            {IDENTITY.logotype.slice(0, -1)}
            <span className="text-red">.</span>
          </Link>
          {showRubrique && rubrique && pathname !== '/' && (
            <span className="hidden truncate font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft sm:inline">
              · {rubrique.title}
            </span>
          )}
        </div>

        {/* Dateline centrale */}
        <p className="hidden font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft lg:block">
          {EDITION.dateline}
        </p>

        {/* Pastille dispo + bouton sommaire */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="group hidden items-center gap-2 font-grotesk text-[0.7rem] font-bold uppercase tracking-[0.14em] md:flex"
          >
            <span className="h-2.5 w-2.5 animate-pulse-soft bg-red" aria-hidden="true" />
            <span className="link-ink">Disponible : Stage / Alternance</span>
          </Link>
          <button
            type="button"
            onClick={onOpenSommaire}
            aria-label="Ouvrir le sommaire"
            className="flex items-center gap-2.5 border-[1.5px] border-ink bg-paper px-3 py-1.5 font-grotesk text-xs font-extrabold uppercase tracking-[0.14em] transition-colors duration-200 hover:bg-ink hover:text-paper"
          >
            <span aria-hidden="true" className="flex flex-col gap-[3px]">
              <span className="block h-[1.5px] w-4 bg-current" />
              <span className="block h-[1.5px] w-4 bg-current" />
              <span className="block h-[1.5px] w-4 bg-current" />
            </span>
            Sommaire
          </button>
        </div>
      </div>
    </header>
  );
}
