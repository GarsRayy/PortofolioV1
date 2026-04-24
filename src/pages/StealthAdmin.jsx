import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';
import { 
  LogOut, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Plus, 
  Code2, 
  Terminal, 
  Cpu, 
  Database,
  LayoutGrid,
  FileText,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const StealthAdmin = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('project'); // 'project' or 'archive'
  const [toast, setToast] = useState(null);

  // Form States
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    mainCategory: 'UI/UX & Web',
    tagline: '',
    year: new Date().getFullYear().toString(),
    role: '',
    techStack: '',
    challenge: '',
    solution: '',
    outcome: '',
    narrative: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${activeTab}s/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('portfolio-assets')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!file) throw new Error('Please select an image');

      const imageUrl = await uploadImage(file);

      if (activeTab === 'project') {
        const { error } = await supabase
          .from('projects')
          .insert([{
            ...formData,
            techStack: formData.techStack.split(',').map(s => s.trim()),
            image: imageUrl,
            heroImage: imageUrl
          }]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('creative_works')
          .insert([{
            title: formData.title,
            category: formData.category,
            image: imageUrl
          }]);
        if (error) throw error;
      }

      showToast(`Successfully uploaded ${activeTab}`);
      // Reset form
      setFormData({
        title: '',
        slug: '',
        category: '',
        mainCategory: 'UI/UX & Web',
        tagline: '',
        year: new Date().getFullYear().toString(),
        role: '',
        techStack: '',
        challenge: '',
        solution: '',
        outcome: '',
        narrative: '',
      });
      setFile(null);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
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
          className="w-full max-w-md bg-white p-10 rounded-3xl border border-charcoal/5 shadow-2xl relative z-10"
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
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm ${
              toast.type === 'error' ? 'bg-garnet text-ivory' : 'bg-charcoal text-ivory'
            }`}
          >
            {toast.type === 'error' ? <XCircle size={20} /> : <CheckCircle2 size={20} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

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
          <LogOut size={14} /> Terminate
        </button>
      </header>

      <main className="max-w-4xl mx-auto py-16 px-6">
        <div className="flex gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('project')}
            className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-3 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'project' ? 'bg-garnet text-ivory shadow-lg' : 'bg-white text-charcoal/40 border border-charcoal/5 hover:bg-charcoal/5'
            }`}
          >
            <FileText size={16} /> New Case Study
          </button>
          <button 
            onClick={() => setActiveTab('archive')}
            className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-3 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'archive' ? 'bg-garnet text-ivory shadow-lg' : 'bg-white text-charcoal/40 border border-charcoal/5 hover:bg-charcoal/5'
            }`}
          >
            <LayoutGrid size={16} /> New Archive Work
          </button>
        </div>

        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl border border-charcoal/5 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Common Fields */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">Asset Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mountain Silence"
                  className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">Sub-Category</label>
                <input 
                  type="text" 
                  placeholder={activeTab === 'project' ? "e.g. Web Dev / UI/UX" : "e.g. Photography"}
                  className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
              </div>

              {activeTab === 'project' && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">Slug</label>
                    <input 
                      type="text" 
                      placeholder="pplk-itera-website"
                      className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm"
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">Main Category</label>
                    <select 
                      className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm"
                      value={formData.mainCategory}
                      onChange={(e) => setFormData({...formData, mainCategory: e.target.value})}
                    >
                      <option value="UI/UX & Web">UI/UX & Web</option>
                      <option value="Data & ML">Data & ML</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {activeTab === 'project' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">Tagline</label>
                  <textarea 
                    className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm min-h-[100px]"
                    placeholder="Short punchy description..."
                    value={formData.tagline}
                    onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">Your Role</label>
                    <input 
                      type="text" 
                      placeholder="Lead Designer"
                      className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">Tech Stack (comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="React, Tailwind, GSAP"
                      className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm"
                      value={formData.techStack}
                      onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">The Problem (Challenge)</label>
                    <textarea 
                      className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm min-h-[120px]"
                      value={formData.challenge}
                      onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">The Solution</label>
                    <textarea 
                      className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm min-h-[120px]"
                      value={formData.solution}
                      onChange={(e) => setFormData({...formData, solution: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">Narrative Deep Dive</label>
                    <textarea 
                      className="w-full px-5 py-4 bg-charcoal/5 border border-charcoal/10 rounded-xl focus:outline-none focus:border-garnet transition-colors font-mono text-sm min-h-[200px]"
                      value={formData.narrative}
                      onChange={(e) => setFormData({...formData, narrative: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40 ml-1">Cover Image Asset</label>
              <div className="relative group">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-charcoal/10 rounded-2xl p-12 flex flex-col items-center gap-4 group-hover:border-garnet/30 transition-all bg-charcoal/5 group-hover:bg-garnet/5">
                  {file ? (
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="text-garnet" size={40} />
                      <span className="font-mono text-sm text-charcoal font-bold">{file.name}</span>
                      <span className="text-[10px] text-charcoal/40 uppercase">Click to change</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="text-charcoal/20" size={40} />
                      <div className="text-center">
                        <p className="font-mono text-sm font-bold text-charcoal">Drop asset here or click</p>
                        <p className="text-[10px] text-charcoal/40 uppercase mt-1">High-res PNG, JPG or WEBP</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-6 bg-charcoal text-ivory rounded-2xl font-clash font-bold text-xl uppercase tracking-widest hover:bg-garnet transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Plus size={24} /> Commit to {activeTab === 'project' ? 'Case Studies' : 'Visual Archives'}
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default StealthAdmin;
