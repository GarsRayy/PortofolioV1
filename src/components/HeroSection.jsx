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
          className="pt-32 z-30"
        >
          <LocationTimeBadge />
        </Gsap.div>

        {/* ── Layered Portrait Composition ── */}
        <div className="relative flex-1 w-full flex items-end justify-center">
          
          {/* Layer 1: Background Typography (Moved Up & Scaled Down) */}
          <Gsap.div
            style={{ y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none z-0 select-none pt-42"
          >
            <Gsap.h1
              initial={false}
              animate={isRevealed ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 1.1, y: 50 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-clash font-black uppercase tracking-tighter text-[clamp(5rem,18vw,14rem)] leading-[0.75] text-center italic"
            >
              <span className="text-charcoal">GARIS</span><br />
              <span className="text-garnet ml-[0.05em]">RAYYA</span>
            </Gsap.h1>
          </Gsap.div>

          {/* Floating Icons (Restored) */}
          <OrbitingDecoration icon={Code2} delay={0.6} className="top-1/4 left-[15%] hidden lg:flex" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />
          <OrbitingDecoration icon={Database} delay={0.8} className="top-1/3 right-[18%] hidden lg:flex" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />
          <OrbitingDecoration icon={Terminal} delay={1.0} className="bottom-1/3 left-[20%] hidden lg:flex" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />
          <OrbitingDecoration icon={Cpu} delay={1.2} className="bottom-1/4 right-[25%] hidden lg:flex" isRevealed={isRevealed} enableAmbientMotion={enableAmbientMotion} />

          {/* Layer 2: Foreground Portrait (Scaled Up) */}
          <Gsap.div
            initial={false}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }}
            style={{ scale: imgScale }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-auto h-[90vh] flex items-end justify-center"
          >
            <img
              src="/profile-hero.png"
              alt="Garis Rayya"
              className="h-full w-auto object-contain object-bottom grayscale brightness-110 hover:grayscale-0 transition-all duration-1000 ease-in-out select-none"
            />
          </Gsap.div>

          {/* Metadata & Actions Group (Bottom) */}
          
          {/* Right Side Stack: Download CV + Roles */}
          <Gsap.div
            initial={false}
            animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-32 right-8 md:right-16 z-30 flex flex-col items-end text-right hidden sm:flex gap-6"
          >
            <a
              href="/cv.pdf"
              download
              className="group flex items-center gap-4 border-2 border-charcoal text-charcoal px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-charcoal hover:text-ivory transition-all duration-500 rounded-sm bg-ivory/50 backdrop-blur-sm"
            >
              Download CV <Download size={18} />
            </a>
            <div className="flex flex-col items-end">
              <h2 className="text-xl md:text-2xl font-clash font-bold text-charcoal uppercase italic tracking-tight">
                UI/UX Designer<br />& Data Specialist
              </h2>
              <div className="w-16 h-[2px] bg-garnet mt-4"></div>
            </div>
          </Gsap.div>
          
          {/* Left Side: Explore Projects (Synced with Right Stack) */}
          <Gsap.div
            initial={false}
            animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-32 left-12 md:left-24 lg:left-32 z-30 hidden sm:flex"
          >
            <button
              onClick={() => document.getElementById('project-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-4 bg-charcoal text-ivory px-8 py-4 border-2 border-charcoal font-mono text-sm font-bold uppercase tracking-widest hover:bg-garnet hover:border-garnet transition-all duration-500 rounded-sm shadow-xl"
            >
              Explore <ArrowUpRight size={18} />
            </button>
          </Gsap.div>

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
