import { useLayoutEffect } from "react";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
import ProjectDetail from "./pages/ProjectDetail";
import CreativeArchives from "./pages/CreativeArchives";
import StealthAdmin from "./pages/StealthAdmin";
import Insights from "./pages/Insights";
import ProjectDetailModal from "./components/projects/ProjectDetailModal";
import useEasterEgg from "./hooks/useEasterEgg";
import { motion, AnimatePresence } from "framer-motion";

// Component untuk scroll ke atas setiap kali route berubah
function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType();
  const { pathname, search } = location;
  const isProjectModal =
    pathname.startsWith('/projects/') &&
    location.state?.backgroundLocation;

  useLayoutEffect(() => {
    let cancelled = false;
    if (navType === "POP") return undefined;
    const params = new URLSearchParams(search);
    const hasScrollTo = params.get('scrollTo');

    if (isProjectModal) return;

    if (pathname !== '/') {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        if (cancelled) return;
        if (document.documentElement) document.documentElement.style.scrollBehavior = 'auto';
        if (document.body) document.body.style.scrollBehavior = 'auto';

        if (window.lenisInstance) {
          try { window.lenisInstance.destroy(); } catch (e) {}
          window.lenisInstance = null;
        }

        ScrollTrigger.getAll().forEach(st => { try { st.kill(); } catch (e) {} });
        ScrollTrigger.scrollerProxy(document.documentElement, null);
        ScrollTrigger.defaults({ scroller: window });
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.refresh(true);
        window.scrollTo(0, 0);
      });
    } else {
      if (document.documentElement) document.documentElement.style.scrollBehavior = '';
      if (document.body) document.body.style.scrollBehavior = '';
      if (!hasScrollTo) window.scrollTo(0, 0);
    }
    return () => { cancelled = true; };
  }, [pathname, search, isProjectModal, navType]);

  return null;
}

export default function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const isEasterEggActive = useEasterEgg("garis");

  return (
    <div className={isEasterEggActive ? "easter-egg-glitch" : ""}>
      <ScrollToTop />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/archives" element={<CreativeArchives />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/secret-garis-admin" element={<StealthAdmin />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/projects/:slug" element={<ProjectDetailModal />} />
        </Routes>
      )}

      {/* Easter Egg Overlay */}
      <AnimatePresence>
        {isEasterEggActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-none overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                 style={{ 
                   backgroundImage: 'radial-gradient(circle at center, #8C1007 0%, transparent 70%)',
                   backgroundSize: '100% 100%' 
                 }} />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center relative z-10"
            >
              <h2 className="text-ivory font-mono text-sm uppercase tracking-[1em] mb-4">Identity Verified</h2>
              <h1 className="text-garnet font-clash font-black text-6xl md:text-8xl uppercase tracking-tighter italic">
                WELCOME <br /> RECRUITER
              </h1>
              <div className="mt-8 flex justify-center gap-4">
                <div className="w-2 h-2 bg-garnet animate-pulse" />
                <div className="w-2 h-2 bg-garnet animate-pulse delay-75" />
                <div className="w-2 h-2 bg-garnet animate-pulse delay-150" />
              </div>
            </motion.div>

            {/* Glitch lines */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[1px] bg-garnet/30"
                style={{ top: `${Math.random() * 100}%` }}
                animate={{ 
                  x: ["-100%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .easter-egg-glitch {
          filter: invert(0.05) contrast(1.1) brightness(0.9);
          transition: filter 0.5s ease;
        }
        @keyframes glitch-anim {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
}
