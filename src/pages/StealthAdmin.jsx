import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';
import { LogOut, Upload, Image as ImageIcon, Trash2, Plus, Code2, Terminal, Cpu, Database } from 'lucide-react';

const StealthAdmin = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [works, setWorks] = useState([]);
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Photography');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) fetchWorks();
  }, [session]);

  const fetchWorks = async () => {
    const { data } = await supabase.from('creative_works').select('*').order('created_at', { ascending: false });
    setWorks(data || []);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleAddWork = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('creative_works').insert([{ title, category, image: imageUrl }]);
    if (error) alert(error.message);
    else {
      setTitle('');
      setImageUrl('');
      fetchWorks();
    }
    setLoading(false);
  };

  const handleDeleteWork = async (id) => {
    if (window.confirm('Are you sure?')) {
      const { error } = await supabase.from('creative_works').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchWorks();
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-6 font-jakarta relative overflow-hidden">
        
        {/* Hero-style Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, transparent 20%, black 80%)',
              WebkitMaskImage: 'radial-gradient(circle at center, transparent 20%, black 80%)',
            }}
          />
          <div className="absolute top-1/4 right-[10%] w-[400px] h-[400px] bg-garnet/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-[10%] w-[500px] h-[500px] bg-garnet/5 rounded-full blur-[120px]" />
        </div>

        {/* Floating Icons */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.5 }} className="absolute inset-0 z-0 pointer-events-none hidden md:block">
          <div className="absolute top-20 left-[15%] animate-bounce transition-all duration-[5000ms] ease-in-out infinite"><Code2 className="text-garnet/30" size={40} /></div>
          <div className="absolute top-1/2 right-[10%] animate-pulse transition-all duration-[4000ms] ease-in-out infinite"><Terminal className="text-garnet/30" size={32} /></div>
          <div className="absolute bottom-20 left-[20%] animate-pulse transition-all duration-[6000ms] ease-in-out infinite"><Cpu className="text-garnet/30" size={36} /></div>
          <div className="absolute bottom-1/2 right-[15%] animate-bounce transition-all duration-[7000ms] ease-in-out infinite"><Database className="text-garnet/30" size={30} /></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white p-10 rounded-3xl border border-charcoal/5 shadow-2xl"
        >
          <div className="mb-8 text-center">
            <div className="w-20 h-20 bg-charcoal/5 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden border border-charcoal/5">
              <img src="/adminlogo.png" alt="Admin Access" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-clash font-bold text-charcoal uppercase tracking-tight">Stealth Access</h1>
            <p className="text-charcoal/50 text-sm mt-2 font-mono">Restricted Personnel Only</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">Terminal ID</label>
              <input 
                type="email" 
                placeholder="email@domain.com"
                className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">Access Key</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              disabled={loading}
              className="w-full py-4 bg-charcoal text-ivory rounded-xl font-mono text-xs font-bold uppercase tracking-widest hover:bg-garnet transition-all shadow-lg active:scale-[0.98]"
            >
              {loading ? 'Decrypting...' : 'Initialize Access'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory font-jakarta">
      {/* Header */}
      <header className="bg-white border-b border-charcoal/5 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-charcoal/5">
            <img src="/adminlogo.png" alt="R" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-clash font-bold text-charcoal uppercase tracking-tight">Stealth Admin</h1>
            <p className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest">Active Session: {session.user.email}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-charcoal/10 rounded-lg text-xs font-mono font-bold uppercase tracking-widest hover:bg-charcoal/5 transition-colors"
        >
          <LogOut size={14} /> Exit System
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-charcoal/5 shadow-xl sticky top-28">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-garnet/10 rounded-lg flex items-center justify-center text-garnet">
                <Plus size={18} />
              </div>
              <h2 className="font-clash font-bold text-xl uppercase tracking-tight">Add New Work</h2>
            </div>

            <form onSubmit={handleAddWork} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40">Title</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40">Category</label>
                <select 
                  className="w-full px-4 py-3 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors text-sm appearance-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Photography">Photography</option>
                  <option value="Design">Editorial Design</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40">Image URL</label>
                <input 
                  type="url" 
                  className="w-full px-4 py-3 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors text-sm"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>
              <button 
                disabled={loading}
                className="w-full py-4 bg-garnet text-ivory rounded-xl font-mono text-xs font-bold uppercase tracking-widest shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
              >
                <Upload size={16} /> {loading ? 'Uploading...' : 'Deploy Content'}
              </button>
            </form>
          </div>
        </div>

        {/* List of Works */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-clash font-bold text-2xl uppercase tracking-tight">Active Archives</h2>
            <span className="px-3 py-1 bg-charcoal text-ivory text-[10px] font-mono font-bold uppercase tracking-widest rounded-full">{works.length} Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {works.map((work) => (
              <motion.div 
                layout
                key={work.id}
                className="bg-white border border-charcoal/5 p-4 rounded-2xl flex gap-4 group hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 bg-charcoal/5 rounded-xl overflow-hidden shrink-0 border border-charcoal/5">
                  <img src={work.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-charcoal text-sm leading-tight mb-1 truncate">{work.title}</h3>
                  <span className="text-[9px] font-mono text-garnet uppercase tracking-widest font-bold">{work.category}</span>
                </div>
                <button 
                  onClick={() => handleDeleteWork(work.id)}
                  className="w-10 h-10 flex items-center justify-center text-charcoal/20 hover:text-garnet transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StealthAdmin;
