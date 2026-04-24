import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gsap } from '../utils/gsapAnimate';
import { Sparkles, Camera, PenTool, Layout, ArrowRight } from 'lucide-react';

const BentoCard = ({ children, className, title, icon: Icon }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-xl border border-charcoal/10 bg-ivory/30 overflow-hidden group ${className}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="flex items-center gap-2 text-ivory">
          {Icon && <Icon className="w-4 h-4" />}
          <span className="font-clash font-medium text-sm uppercase tracking-wider">{title}</span>
        </div>
      </div>
      {children}
    </motion.div>
  );
};

const VisualPlayground = () => {
  const navigate = useNavigate();
  return (
    <section id="playground" className="py-24 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-garnet" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-charcoal/40">
                04 - Visual Playground
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-clash font-bold uppercase text-charcoal leading-[0.9] tracking-tight">
              Hobby & <br />
              <span className="text-garnet">Creative Lab</span>
            </h2>
            <p className="mt-6 text-charcoal/60 text-lg max-w-lg leading-relaxed">
              Explore my creative side through graphic design for student organizations and personal photography experiments.
            </p>
          </div>
          <div className="hidden md:block">
            <Sparkles className="w-16 h-16 text-garnet/20" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[1000px] md:h-[600px]">
          {/* Design 1 */}
          <BentoCard 
            className="md:col-span-2 md:row-span-2" 
            title="UKM Lembaga Pers Design"
            icon={PenTool}
          >
            <img 
              src="/images/lempers_design_1_1776967540337.png" 
              alt="Lempers Design" 
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
            />
          </BentoCard>

          {/* Photography 1 */}
          <BentoCard 
            className="md:col-span-2 md:row-span-1" 
            title="Campus Photography"
            icon={Camera}
          >
            <img 
              src="/images/photography_gallery_1_1776967555021.png" 
              alt="Photography" 
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
            />
          </BentoCard>

          {/* Design 2 */}
          <BentoCard 
            className="md:col-span-1 md:row-span-1" 
            title="Magazine Layout"
            icon={Layout}
          >
            <img 
              src="/images/lempers_magazine_1776967571830.png" 
              alt="Magazine Design" 
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
            />
          </BentoCard>

          {/* Creative Stat */}
          <div className="md:col-span-1 md:row-span-1 rounded-xl border border-charcoal/10 bg-garnet p-8 flex flex-col justify-center items-center text-center text-ivory">
            <span className="text-5xl font-clash font-bold mb-2">50+</span>
            <span className="font-mono text-xs uppercase tracking-widest opacity-80">Designs Created</span>
          </div>
        </div>

        {/* View More CTA */}
        <div className="mt-16 flex justify-center">
          <button 
            onClick={() => navigate('/archives')}
            className="group flex items-center gap-6 bg-charcoal text-ivory px-10 py-5 rounded-full font-mono text-sm font-bold uppercase tracking-[0.2em] hover:bg-garnet transition-all duration-500 shadow-2xl"
          >
            Explore Creative Archives
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform">
              <ArrowRight size={18} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default VisualPlayground;
