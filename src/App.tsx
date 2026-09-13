import { createContext, useContext, useEffect, type MutableRefObject } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Layout from '@/components/Layout';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import Home from '@/pages/Home';
import Profil from '@/pages/Profil';
import Competences from '@/pages/Competences';
import ProjetLocalisation from '@/pages/ProjetLocalisation';
import ProjetScanner from '@/pages/ProjetScanner';
import HorsChamp from '@/pages/HorsChamp';
import Contact from '@/pages/Contact';

gsap.registerPlugin(ScrollTrigger);

/** Réf mutable partagée vers l'instance Lenis active (null si reduced-motion) */
type LenisRef = MutableRefObject<Lenis | null>;
const LenisContext = createContext<LenisRef>({ current: null });

/** Lenis global (lerp 0.09) synchronisé avec ScrollTrigger · désactivé si prefers-reduced-motion */
function useLenis() {
  const reduced = useReducedMotion();
  const lenisRef = useContext(LenisContext);
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced, lenisRef]);
}

/**
 * Remonte instantanément en haut de page à chaque changement de route.
 * Lenis intercepte le scroll natif : on passe par son instance (immediate + force)
 * avec repli window.scrollTo, puis on recalcule les ScrollTrigger à la frame suivante.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const lenisRef = useContext(LenisContext);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname, lenisRef]);

  return null;
}

export default function App() {
  useLenis();
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profil" element={<Profil />} />
        <Route path="competences" element={<Competences />} />
        <Route path="projets/localisation-wttg3" element={<ProjetLocalisation />} />
        <Route path="projets/tarkov-barter-scanner" element={<ProjetScanner />} />
        <Route path="hors-champ" element={<HorsChamp />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
      </Routes>
    </>
  );
}
