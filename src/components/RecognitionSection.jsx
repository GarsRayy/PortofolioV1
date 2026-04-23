import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

import { CERTIFICATES } from '../data/portfolioData';

const certificates = CERTIFICATES;

const RecognitionSection = () => {
  const [hoveredCert, setHoveredCert] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="py-24 bg-ivory overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-garnet" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-charcoal/40">
            06 - Recognition
          </span>
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative flex overflow-hidden border-y border-charcoal/10 py-10">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...certificates, ...certificates].map((cert, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredCert(cert)}
              onMouseLeave={() => setHoveredCert(null)}
              className="flex items-center gap-8 mx-12 cursor-none"
            >
              <Award className="w-6 h-6 text-garnet" />
              <span className="text-4xl md:text-6xl font-clash font-bold uppercase text-charcoal opacity-30 hover:opacity-100 transition-opacity duration-300">
                {cert.name}
              </span>
              <span className="font-mono text-sm uppercase tracking-widest text-garnet/50">
                [{cert.issuer}]
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Preview Card */}
      {hoveredCert && (
        <motion.div
          style={{
            left: springX,
            top: springY,
            x: "-50%",
            y: "-50%",
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed z-[100] w-64 h-48 rounded-lg overflow-hidden border-2 border-garnet shadow-2xl bg-white"
        >
          <img 
            src={hoveredCert.img} 
            alt={hoveredCert.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent flex items-end p-4">
             <div className="flex items-center gap-2 text-ivory">
               <ExternalLink className="w-3 h-3" />
               <span className="text-[10px] font-mono uppercase tracking-tighter">View Certificate</span>
             </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default RecognitionSection;
