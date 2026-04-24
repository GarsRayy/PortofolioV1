import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell
} from 'recharts';
import { TrendingUp, Code2, Database, Layout } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TECH_DATA = [
  { name: 'Python', value: 85, color: '#8C1007' },
  { name: 'React', value: 90, color: '#8C1007' },
  { name: 'SQL', value: 80, color: '#8C1007' },
  { name: 'Java', value: 75, color: '#8C1007' },
  { name: 'Design', value: 95, color: '#8C1007' },
  { name: 'GIS', value: 70, color: '#8C1007' },
];

const ACTIVITY_DATA = [
  { date: 'Jan', commits: 45, velocity: 30 },
  { date: 'Feb', commits: 52, velocity: 45 },
  { date: 'Mar', commits: 48, velocity: 50 },
  { date: 'Apr', commits: 70, velocity: 65 },
  { date: 'May', commits: 65, velocity: 80 },
  { date: 'Jun', commits: 90, velocity: 95 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-charcoal border border-white/10 p-4 shadow-2xl rounded-lg backdrop-blur-md">
        <p className="text-ivory/60 font-mono text-[10px] uppercase tracking-widest mb-1">{label}</p>
        <p className="text-ivory font-clash font-bold text-lg">
          {payload[0].value} <span className="text-garnet text-xs ml-1 font-mono uppercase tracking-tighter">{payload[0].name}</span>
        </p>
      </div>
    );
  }
  return null;
};

const Insights = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-ivory text-charcoal font-jakarta"
    >
      <Navbar />
      <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-garnet" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-garnet">
              Analytics Dashboard
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-clash font-black uppercase leading-[0.9] tracking-tighter mb-8">
            Data & Code <br />
            <span className="text-garnet italic">Insights</span>
          </h1>
          <p className="text-charcoal/60 text-lg max-w-2xl leading-relaxed font-medium">
            A quantitative overview of my technical journey, visualized through real-time development metrics and skill distribution analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart 1: Tech Stack Distribution */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/40 border border-charcoal/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-clash font-bold uppercase tracking-tight mb-1">Tech Stack Distribution</h3>
                <p className="text-charcoal/40 text-xs font-mono uppercase">Proficiency Level (%)</p>
              </div>
              <Code2 className="text-garnet/20 w-8 h-8" />
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TECH_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000008" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#8C1007', fontSize: 10, fontWeight: 700, fontFamily: 'monospace' }}
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#00000033', fontSize: 10, fontFamily: 'monospace' }} 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#8C100705' }} />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={2000}
                  >
                    {TECH_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Chart 2: Activity Heatmap */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-charcoal border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-garnet/10 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div>
                <h3 className="text-xl font-clash font-bold uppercase tracking-tight text-ivory mb-1">Solving Velocity</h3>
                <p className="text-ivory/30 text-xs font-mono uppercase text-white/40">Growth over time</p>
              </div>
              <TrendingUp className="text-garnet w-8 h-8" />
            </div>

            <div className="h-[350px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ACTIVITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8C1007" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8C1007" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#ffffff44', fontSize: 10, fontFamily: 'monospace' }}
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#ffffff22', fontSize: 10, fontFamily: 'monospace' }} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="velocity" 
                    stroke="#8C1007" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorVelocity)" 
                    animationDuration={2500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Database, label: "Total Datasets Analyzed", value: "12" },
            { icon: Layout, label: "UI Prototypes Built", value: "48" },
            { icon: Code2, label: "Prod Commits (2026)", value: "342" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="bg-white/60 border border-charcoal/5 p-6 rounded-2xl flex items-center gap-6"
            >
              <div className="w-12 h-12 bg-garnet/5 rounded-xl flex items-center justify-center text-garnet">
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-charcoal/40 text-[10px] font-mono uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-clash font-bold">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </motion.div>
  );
};

export default Insights;
