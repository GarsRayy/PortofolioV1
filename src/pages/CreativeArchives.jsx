import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../utils/supabaseClient';

const dummyArchives = [
  { id: 1, title: 'Mountain Silence', category: 'Photography', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80' },
  { id: 2, title: 'Editorial Design v1', category: 'Editorial Design', image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80' },
  { id: 3, title: 'Urban Texture', category: 'Photography', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80' },
  { id: 4, title: 'Minimalist Spread', category: 'Editorial Design', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80' },
  { id: 5, title: 'Concrete Jungle', category: 'Photography', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80' },
  { id: 6, title: 'Typography Study', category: 'Editorial Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80' },
];

const ARCHIVE_CATEGORIES = ["All", "Editorial Design", "Photography"];

const CreativeArchives = () => {
  const [works, setWorks] = useState(dummyArchives);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const { data, error } = await supabase
          .from('creative_works')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) setWorks(data);
      } catch (err) {
        console.warn('Using dummy data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  const filteredWorks = filter === "All" 
    ? works 
    : works.filter(w => w.category === filter);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-ivory text-charcoal min-h-screen font-jakarta"
    >
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="w-3 h-3 bg-garnet rounded-full" />
              <span className="font-mono text-sm font-bold uppercase tracking-widest text-garnet">Creative Archives</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-clash font-black uppercase tracking-tighter text-charcoal leading-none"
            >
              Visual <br /> Fragments.
            </motion.h1>
          </div>

          {/* Sticky Tabs */}
          <div className="flex gap-1 border-b border-charcoal/10 pb-2 overflow-x-auto no-scrollbar">
            {ARCHIVE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  filter === cat ? 'text-garnet border-b-2 border-garnet' : 'text-charcoal/40 hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid with Reflow Animation */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, idx) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                className="relative group overflow-hidden rounded-2xl break-inside-avoid bg-white border border-charcoal/5 shadow-lg"
              >
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-left">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-garnet font-bold mb-2">{work.category}</span>
                  <h3 className="text-ivory font-clash font-bold text-2xl uppercase tracking-tight">{work.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default CreativeArchives;
