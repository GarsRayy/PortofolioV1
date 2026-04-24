import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { PROJECT_DETAILS_DATA as projectDetailsData } from '../data/projectDetailsData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectDetail = () => {
  const { id, slug } = useParams();
  const projectId = id || slug;
  const project = projectDetailsData[projectId] || Object.values(projectDetailsData).find(p => p.slug === projectId);

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-ivory text-charcoal min-h-screen font-jakarta"
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={project.heroImage || project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent opacity-60" />
      </section>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 pb-24">
        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-16 rounded-3xl border border-charcoal/5 shadow-2xl">
          
          {/* Title & Description */}
          <div className="mb-16">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-clash font-black text-garnet uppercase tracking-tighter leading-none mb-8"
            >
              {project.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-charcoal/70 leading-relaxed max-w-4xl"
            >
              {project.subtitle || project.description}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column: Sticky Metadata */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-12">
                <div className="space-y-2">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-garnet font-bold">Role</h3>
                  <p className="text-lg font-bold text-charcoal">{project.role}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-garnet font-bold">Timeline</h3>
                  <p className="text-lg font-bold text-charcoal">{project.year || '2025'}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-garnet font-bold">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-charcoal/5 rounded-full text-xs font-bold text-charcoal/70 border border-charcoal/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-8 flex flex-col gap-4">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-charcoal hover:text-garnet transition-colors group">
                      <ExternalLink size={18} /> <span className="font-bold">Live Preview</span> <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-charcoal hover:text-garnet transition-colors group">
                      <Github size={18} /> <span className="font-bold">Source Code</span> <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-2 space-y-24">
              {project.sections?.map((section, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl font-clash font-bold text-charcoal uppercase tracking-tight">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg text-charcoal/70 font-jakarta leading-relaxed max-w-none">
                    {section.content}
                  </div>
                  {section.image && (
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-charcoal/5 mt-8">
                      <img src={section.image} alt={section.title} className="w-full h-auto" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default ProjectDetail;
