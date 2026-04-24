import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { PROJECT_DETAILS_DATA } from '../data/projectDetailsData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CATEGORIES = ["All", "Data & ML", "UI/UX & Web", "Engineering"];

const AllProjects = () => {
  const [filter, setFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const cursorImageRef = useRef(null);
  const navigate = useNavigate();

  const projects = Object.values(PROJECT_DETAILS_DATA);
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.mainCategory === filter);

  // GSAP Image Follow Mouse Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorImageRef.current) {
        gsap.to(cursorImageRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power3.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-ivory min-h-screen text-charcoal font-jakarta overflow-x-hidden">
      <Navbar />

      {/* Floating Thumbnail following cursor */}
      <div 
        ref={cursorImageRef}
        className="fixed top-0 left-0 w-[300px] aspect-video pointer-events-none z-[100] overflow-hidden rounded-lg opacity-0"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <AnimatePresence>
          {hoveredProject && (
            <motion.img
              key={hoveredProject.image}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              src={hoveredProject.image}
              alt=""
              className="w-full h-full object-cover shadow-2xl"
            />
          )}
        </AnimatePresence>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <span className="w-12 h-[1px] bg-garnet" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-garnet">Archive Index</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-clash font-black uppercase tracking-tighter leading-none">
              All <br /> <span className="text-garnet italic">Works.</span>
            </h1>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                  filter === cat 
                    ? 'bg-charcoal text-ivory border-charcoal' 
                    : 'bg-transparent text-charcoal/40 border-charcoal/10 hover:border-charcoal hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial List */}
        <div className="relative border-t border-charcoal/10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative border-b border-charcoal/10"
                onMouseEnter={() => {
                  setHoveredProject(project);
                  gsap.to(cursorImageRef.current, { opacity: 1, duration: 0.3 });
                }}
                onMouseLeave={() => {
                  setHoveredProject(null);
                  gsap.to(cursorImageRef.current, { opacity: 0, duration: 0.3 });
                }}
                onClick={() => navigate(`/project/${project.slug}`)}
              >
                <div className="flex items-center justify-between py-10 md:py-16 cursor-pointer group-hover:px-4 transition-all duration-500">
                  <div className="flex items-center gap-8 md:gap-16">
                    <span className="font-mono text-xs text-charcoal/20 group-hover:text-garnet transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-clash font-bold uppercase tracking-tighter group-hover:italic group-hover:text-garnet transition-all duration-500">
                      {project.title}
                    </h2>
                  </div>
                  
                  <div className="hidden md:flex flex-col items-end">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/40 group-hover:text-charcoal transition-colors">
                      {project.mainCategory}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/20">
                      {project.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllProjects;
