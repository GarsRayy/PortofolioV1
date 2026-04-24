import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Calendar, Briefcase, Cpu } from 'lucide-react';
import { PROJECT_DETAILS_DATA as projectDetailsData } from '../data/projectDetailsData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectDetail = () => {
  const { id, slug } = useParams();
  const projectId = id || slug;
  const project = projectDetailsData[projectId] || Object.values(projectDetailsData).find(p => p.slug === projectId);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!project) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center font-jakarta">
        <div className="text-center">
          <h1 className="text-4xl font-clash font-bold text-garnet mb-4">Project Not Found</h1>
          <Link to="/" className="text-charcoal hover:text-garnet transition-colors flex items-center justify-center gap-2">
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div ref={containerRef} className="bg-ivory text-charcoal min-h-screen font-jakarta overflow-x-hidden">
      <Navbar />

      {/* Full-bleed Hero Header */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal">
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={project.heroImage || project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/20 to-charcoal" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-2 bg-garnet text-ivory font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-8 rounded-full">
              Case Study — {project.year}
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-clash font-black text-ivory uppercase tracking-tighter leading-[0.85] mb-12 italic">
              {project.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? 'text-garnet' : ''}>{word} </span>
              ))}
            </h1>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-ivory/40">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-garnet to-transparent" />
        </motion.div>
      </section>

      {/* Sticky Stats Bar */}
      <div className="sticky top-0 z-40 bg-ivory/80 backdrop-blur-xl border-b border-charcoal/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Briefcase size={16} className="text-garnet" />
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40">Role</p>
              <p className="text-xs font-bold text-charcoal">{project.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Cpu size={16} className="text-garnet" />
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40">Tech Stack</p>
              <p className="text-xs font-bold text-charcoal">{project.techStack?.join(', ')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-garnet" />
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40">Timeline</p>
              <p className="text-xs font-bold text-charcoal">{project.year}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {project.links?.repo && (
              <a href={project.links.repo} target="_blank" rel="noreferrer" className="text-charcoal hover:text-garnet transition-colors">
                <Github size={20} />
              </a>
            )}
            <button className="bg-charcoal text-ivory px-6 py-2.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-garnet transition-all">
              Live Preview
            </button>
          </div>
        </div>
      </div>

      {/* Narrative Sections */}
      <main className="relative">
        
        {/* The Challenge - Garnet Accent */}
        <section className="py-24 md:py-40 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div {...fadeIn} className="lg:col-span-4">
              <h2 className="text-sm font-mono font-bold text-garnet uppercase tracking-[0.3em] mb-4">01. The Challenge</h2>
              <h3 className="text-4xl md:text-5xl font-clash font-bold text-charcoal leading-none uppercase italic">The Problem<br />Statement.</h3>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="lg:col-span-8">
              <p className="text-2xl md:text-3xl text-charcoal/80 leading-snug font-medium mb-8">
                {project.challenge}
              </p>
              <div className="w-24 h-1 bg-garnet" />
            </motion.div>
          </div>
        </section>

        {/* Big Narrative - Ivory Clean */}
        <section className="py-24 md:py-40 px-6 bg-white shadow-inner">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeIn} className="space-y-12">
              <div className="inline-block px-4 py-2 bg-charcoal/5 border border-charcoal/10 rounded-lg font-mono text-[10px] font-bold uppercase tracking-widest">
                Deep Dive Narrative
              </div>
              <p className="text-xl md:text-2xl text-charcoal/70 leading-relaxed font-serif italic">
                "{project.narrative}"
              </p>
            </motion.div>
          </div>
        </section>

        {/* The Solution & Outcome - Contrasting Blocks */}
        <section className="py-24 md:py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-charcoal/5 border border-charcoal/5 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Solution */}
              <motion.div 
                {...fadeIn}
                className="bg-white p-12 md:p-20"
              >
                <h2 className="text-sm font-mono font-bold text-garnet uppercase tracking-[0.3em] mb-8">02. The Solution</h2>
                <p className="text-xl md:text-2xl text-charcoal/80 leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>

              {/* Outcome */}
              <motion.div 
                {...fadeIn}
                transition={{ delay: 0.3 }}
                className="bg-garnet p-12 md:p-20 text-ivory"
              >
                <h2 className="text-sm font-mono font-bold text-ivory/60 uppercase tracking-[0.3em] mb-8">03. The Outcome</h2>
                <p className="text-xl md:text-2xl leading-relaxed font-bold">
                  {project.outcome}
                </p>
                <ArrowUpRight size={64} className="mt-12 opacity-20" />
              </motion.div>

            </div>
          </div>
        </section>

      </main>

      {/* Next Project Footer Hook */}
      <section className="py-32 bg-charcoal text-center px-6">
        <motion.div {...fadeIn}>
          <p className="font-mono text-xs text-ivory/40 uppercase tracking-[0.4em] mb-8">Ready for another story?</p>
          <Link to="/projects" className="group inline-block">
            <h2 className="text-5xl md:text-7xl font-clash font-black text-ivory uppercase tracking-tighter hover:text-garnet transition-colors duration-500">
              View All <span className="italic">Case Studies</span>
            </h2>
            <div className="w-0 group-hover:w-full h-2 bg-garnet mt-4 transition-all duration-700 mx-auto" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
