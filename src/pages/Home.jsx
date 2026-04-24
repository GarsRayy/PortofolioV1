import { useEffect, useState, useRef, lazy, Suspense, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Preloader from '../components/Preloader';
import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ChatLauncher from '../components/ChatLauncher';
import useLenis from '../hooks/useLenis';
import useScrollToGallery from '../hooks/useScrollToGallery';

const AboutSection = lazy(() => import('../components/AboutSection'));
const Footer = lazy(() => import('../components/Footer'));
const ProjectGallery = lazy(() => import('../components/ProjectGallery'));
const ProfessionalExperience = lazy(() => import('../components/ProfessionalExperience'));
const VisualPlayground = lazy(() => import('../components/VisualPlayground'));
const LeadershipSection = lazy(() => import('../components/LeadershipSection'));
const NoiseOverlay = lazy(() => import('../components/NoiseOverlay'));

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const galleryRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [enableNoiseOverlay, setEnableNoiseOverlay] = useState(false);

  useLenis(isScrollLocked);
  useScrollToGallery(galleryRef, isLoading);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setEnableNoiseOverlay(isFinePointer && !reduceMotion);
    }
  }, []);

  // GSAP Stacking Animation
  useEffect(() => {
    if (isLoading || typeof window === 'undefined') return;

    let ctx;
    const initAnimation = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const isDesktop = window.innerWidth >= 1024;
        
        if (isDesktop) {
          // Pin Hero and animate scale/opacity
          gsap.to(heroRef.current, {
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
              scrub: true,
              invalidateOnRefresh: true
            },
            scale: 0.9,
            opacity: 0.4,
            ease: "none"
          });
          
          // Force a refresh once lazy-loaded components might have shifted layout
          setTimeout(() => ScrollTrigger.refresh(), 1000);
        }
      }, containerRef);
    };

    initAnimation();
    return () => ctx && ctx.revert();
  }, [isLoading]);

  useEffect(() => {
    const profileImg = new Image();
    profileImg.src = "/profile-hero.png";
  }, []);

  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
  }, [isScrollLocked]);

  const handleOpenProject = useCallback((project) => {
    if (!project?.slug) return;
    navigate(`/project/${project.slug}`);
  }, [navigate]);

  return (
    <div ref={containerRef} className="bg-ivory text-charcoal selection:bg-garnet selection:text-ivory relative font-jakarta">
      {isLoading && (
        <Preloader
          onComplete={() => {
            setIsLoading(false);
            setIsScrollLocked(false);
          }}
        />
      )}

      {enableNoiseOverlay && <Suspense fallback={null}><NoiseOverlay /></Suspense>}
      <ChatLauncher />

      <Cursor />
      <Navbar />
      
      <div ref={heroRef} className="z-0">
        <HeroSection isRevealed={!isLoading} />
      </div>
      
      <div className="relative z-10 bg-ivory shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        <Suspense fallback={null}><AboutSection /></Suspense>
        
        <Suspense fallback={null}><ProfessionalExperience /></Suspense>

        <div id="project-section" ref={galleryRef} className="bg-charcoal">
          <Suspense fallback={<div className="h-screen bg-charcoal" />}>
            <ProjectGallery onOpenProject={handleOpenProject} />
          </Suspense>
        </div>

        <Suspense fallback={null}><VisualPlayground /></Suspense>
        <Suspense fallback={null}><LeadershipSection /></Suspense>
        
        <Suspense fallback={null}><Footer /></Suspense>
      </div>
    </div>
  );
}
