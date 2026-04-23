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
const RecognitionSection = lazy(() => import('../components/RecognitionSection'));
const NoiseOverlay = lazy(() => import('../components/NoiseOverlay'));

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    const profileImg = new Image();
    profileImg.src = "/profile.webp";
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
    navigate(`/projects/${project.slug}`, {
      state: { backgroundLocation: location },
    });
  }, [navigate, location]);

  return (
    <div className="bg-ivory text-charcoal selection:bg-garnet selection:text-ivory relative font-jakarta">
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
      <HeroSection isRevealed={true} />
      
      <Suspense fallback={null}><AboutSection /></Suspense>
      
      <Suspense fallback={null}><ProfessionalExperience /></Suspense>

      <div id="project-section" ref={galleryRef} className="bg-charcoal">
        <Suspense fallback={<div className="h-screen bg-charcoal" />}>
          <ProjectGallery onOpenProject={handleOpenProject} />
        </Suspense>
      </div>

      <Suspense fallback={null}><VisualPlayground /></Suspense>
      <Suspense fallback={null}><LeadershipSection /></Suspense>
      <Suspense fallback={null}><RecognitionSection /></Suspense>
      
      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
}
