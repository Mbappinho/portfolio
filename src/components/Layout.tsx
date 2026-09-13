import { memo, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SommaireOverlay from '@/components/SommaireOverlay';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/** Rideau « page tournée » · overlay encre qui se lève à chaque navigation */
function Curtain() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.div
      key={pathname}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] border-b-4 border-red bg-ink"
      style={{ transformOrigin: 'top' }}
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
    />
  );
}

/** Point rouge suiveur (desktop) · devient « LIRE » / « OUVRIR » sur les [data-cursor] */
const CursorDot = memo(function CursorDot() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.('[data-cursor]');
      setLabel(t ? t.getAttribute('data-cursor') : null);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center rounded-full bg-red mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: label ? 64 : 12,
        height: label ? 64 : 12,
      }}
      transition={{ duration: 0.2 }}
    >
      {label && (
        <span className="font-grotesk text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-paper">
          {label}
        </span>
      )}
    </motion.div>
  );
});

/** Repères de coupe décoratifs (coins du viewport, desktop uniquement) */
const CropMarks = memo(function CropMarks() {
  const mark = 'pointer-events-none fixed z-[60] hidden font-mono text-sm text-ink/40 lg:block';
  return (
    <>
      <span aria-hidden="true" className={`${mark} left-2 top-16`}>+</span>
      <span aria-hidden="true" className={`${mark} right-2 top-16`}>+</span>
      <span aria-hidden="true" className={`${mark} bottom-2 left-2`}>+</span>
      <span aria-hidden="true" className={`${mark} bottom-2 right-2`}>+</span>
    </>
  );
});

/**
 * Layout global · pattern « nested routes » : App.tsx doit utiliser
 * <Route element={<Layout/>}> avec des routes enfants (jamais {children}).
 * La barre de une est fixed (56px) : le slot de contenu compense via pt-14.
 */
export default function Layout() {
  const [sommaireOpen, setSommaireOpen] = useState(false);
  const { pathname } = useLocation();

  // Le retour en haut de page est centralisé dans <ScrollToTop /> (App.tsx)
  useEffect(() => {
    setSommaireOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      <Navbar onOpenSommaire={() => setSommaireOpen(true)} />
      <SommaireOverlay open={sommaireOpen} onClose={() => setSommaireOpen(false)} />
      <Curtain />
      <CropMarks />
      {/* Offset de 56px (h-14) sous la barre de une fixe · les pages ne compensent rien */}
      <main className="pt-14">
        <Outlet />
      </main>
      {pathname !== '/contact' && <Footer />}
      <CursorDot />
    </div>
  );
}
