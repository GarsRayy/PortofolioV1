import { memo, useRef, useEffect, useState } from 'react';
import { Gsap, useGsapReducedMotion, useGsapScroll, useGsapTransform } from '../utils/gsapAnimate';
import { Terminal, Code2, Database, Cpu, Download, ArrowUpRight } from 'lucide-react';

// Shared Intl formatter
const jakartaFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Jakarta',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});

// === LOCATION & TIME BADGE ===
const LocationTimeBadge = () => {
  const timeRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (timeRef.current) {
        timeRef.current.textContent = jakartaFormatter.format(new Date());
      }
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-5 font-mono text-xs uppercase tracking-[0.2em] text-charcoal/50">
      <div className="flex items-center gap-2">
        <span className="font-extrabold text-charcoal">Based in Indonesia</span>
      </div>
      <div className="w-[1px] h-3 bg-charcoal/20" />
      <div className="flex items-center gap-1.5 tabular-nums">
        <span ref={timeRef} className="font-extrabold text-charcoal" />
      </div>
    </div>
  );
};

// === DECORATIVE ORBITING ELEMENTS ===
const OrbitingDecoration = ({ icon: Icon, delay, className, isRevealed, enableAmbientMotion }) => (
  <Gsap.div
    initial={false}
    animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.8, delay }}
    className={`absolute flex items-center justify-center w-12 h-12 rounded-full border border-garnet/20 bg-ivory/60 backdrop-blur-lg shadow-[0_10px_30px_rgba(140,16,7,0.1)] z-20 ${className}`}
    style={enableAmbientMotion && isRevealed ? {
      animation: `hero-float 5s ${delay}s ease-in-out infinite`,
    } : undefined}
  >
    <Icon size={18} className="text-garnet" />
  </Gsap.div>
);

// === MAIN COMPONENT ===
const HeroSection = memo(function HeroSection({ isRevealed = true }) {
  const containerRef = useRef(null);
  const reduceMotion = useGsapReducedMotion();
  const [enableAmbientMotion, setEnableAmbientMotion] = useState(false);

  const { scrollYProgress } = useGsapScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Subtle scroll parallax for layers
  const textY = useGsapTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const imgScale = useGsapTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !reduceMotion) {
      setEnableAmbientMotion(window.innerWidth >= 1024);
    }
  }, [reduceMotion]);

  return (
    <header
      ref={containerRef}
      id="hero-section"
      className="relative h-[100svh] w-full bg-ivory overflow-hidden flex flex-col items-center"
    >
      {/* ── BACKGROUND ENGINEERING Grid & Dynamic Glow ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating Circles & Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] rounded-full border border-garnet/5 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full border border-garnet/5 z-0" />
        
        {/* Glow Orbs */}
        <div className="absolute top-1/4 right-[15%] w-[400px] h-[400px] bg-garnet/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-[15%] w-[500px] h-[500px] bg-garnet/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center">
        
        {/* ── Top Header ── */}
        <Gsap.div
          initial={false}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-24 md:pt-32 z-30"
        >
          <LocationTimeBadge />
        </Gsap.div>

        {/* ── Layered Portrait Composition ── */}
        <div className="relative flex-1 w-full flex items-end justify-center">
          
          {/* Layer 1: Background Typography (Adjusted for mobile) */}
          <Gsap.div
            style={{ y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none z-0 select-none pt-28 sm:pt-32 md:pt-42"
          >
            <Gsap.h1
              initial={false}
              animate={isRevealed ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 1.1, y: 50 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-clash font-black uppercase tracking-tighter text-[clamp(4rem,16vw,14rem)] md:text-[clamp(5rem,18vw,14rem)] leading-[0.75] text-center italic"
            >
              <span className="text-charcoal/80">GARIS</span><br />
              <span className="text-garnet ml-[0.05em] opacity-90">RAYYA</span>
            </Gsap.h1>
          </Gsap.div>

          {/* Floating Icons (Responsive) */}
          <OrbitingDecoration icon={Code2} delay={0.6} className="top-[22%] left-[10%] lg:left-[15%] scale-75 lg:scale-100" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />
          <OrbitingDecoration icon={Database} delay={0.8} className="top-[30%] right-[8%] lg:right-[18%] scale-75 lg:scale-100" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />
          <OrbitingDecoration icon={Terminal} delay={1.0} className="bottom-[40%] left-[8%] lg:left-[20%] scale-75 lg:scale-100" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />
          <OrbitingDecoration icon={Cpu} delay={1.2} className="bottom-[45%] right-[10%] lg:right-[25%] scale-75 lg:scale-100" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />

          {/* Layer 2: Foreground Portrait (Adjusted Bottom to avoid overlap) */}
          <Gsap.div
            initial={false}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }}
            style={{ scale: imgScale }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-auto h-[50vh] sm:h-[65vh] md:h-[90vh] flex items-end justify-center mb-40 sm:mb-48 md:mb-0"
          >
            <img
              src="/profile-hero.png"
              alt="Garis Rayya"
              className="h-full w-auto object-contain object-bottom grayscale brightness-110 hover:grayscale-0 transition-all duration-1000 ease-in-out select-none"
            />
          </Gsap.div>

          {/* Metadata & Actions Group (Optimized Bottom-Fixed Style for Mobile) */}
          <div className="absolute inset-x-0 bottom-0 md:bottom-24 px-6 pb-8 md:pb-0 md:px-12 z-40 flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-8 pointer-events-none">
            
            {/* Background blur for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/80 to-transparent md:hidden pointer-events-none -z-10 h-[150%]" />

            {/* Left Side: Explore Button */}
            <Gsap.div
              initial={false}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="pointer-events-auto w-full md:w-auto order-2 md:order-1"
            >
              <button
                onClick={() => document.getElementById('project-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full md:w-auto group flex items-center justify-center gap-3 bg-charcoal text-ivory px-8 py-4 border-2 border-charcoal font-mono text-xs font-bold uppercase tracking-widest hover:bg-garnet hover:border-garnet transition-all duration-500 rounded-sm shadow-2xl"
              >
                Explore <ArrowUpRight size={16} />
              </button>
            </Gsap.div>

            {/* Middle Side: Role (Mobile Positioned Clearly Below Portrait) */}
            <Gsap.div
              initial={false}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="flex md:hidden flex-col items-center text-center py-2 order-1"
            >
              <h2 className="text-sm font-clash font-bold text-charcoal uppercase italic tracking-tight leading-tight">
                UI/UX Designer<br />& Data Specialist
              </h2>
              <div className="w-10 h-[1.5px] bg-garnet mt-2"></div>
            </Gsap.div>

            {/* Right Side Stack: CV + Roles (Desktop) */}
            <Gsap.div
              initial={false}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col items-center md:items-end text-center md:text-right gap-4 md:gap-6 pointer-events-auto w-full md:w-auto order-3"
            >
              <a
                href="/cv.pdf"
                download
                className="w-full md:w-auto group flex items-center justify-center gap-3 border-2 border-charcoal text-charcoal px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-charcoal hover:text-ivory transition-all duration-500 rounded-sm bg-white/90 backdrop-blur-md"
              >
                Download CV <Download size={16} />
              </a>
              <div className="hidden md:flex flex-col items-end">
                <h2 className="text-xl md:text-2xl font-clash font-bold text-charcoal uppercase italic tracking-tight leading-tight">
                  UI/UX Designer<br />& Data Specialist
                </h2>
                <div className="w-16 h-[2px] bg-garnet mt-4"></div>
              </div>
            </Gsap.div>
          </div>

        </div>

      </div>

      {/* ── Fixed Corner Info ── */}
      <div className="absolute top-10 right-10 flex flex-col items-end opacity-20 hidden lg:flex z-40">
        <span className="font-mono text-[10px] uppercase tracking-[0.5em]">Garis Rayya © 2026</span>
      </div>
    </header>
  );
});

export default HeroSection;
