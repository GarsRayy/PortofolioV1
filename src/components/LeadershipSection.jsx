import { Gsap } from '../utils/gsapAnimate';
import { Users, Code, PenTool, Image as ImageIcon } from 'lucide-react';

const organizations = [
  {
    name: 'PPLK ITERA 2025',
    role: 'Head of UI/UX Website Subdivision',
    icon: Code,
    desc: 'Leading the design and development of the official orientation website for 5.000+ new students.'
  },
  {
    name: 'HUMAS IF ITERA',
    role: 'Website Team & Content Researcher',
    icon: Users,
    desc: 'Managing informatics department communications and researching engaging technical content.'
  },
  {
    name: 'UKM Lembaga Pers ITERA',
    role: 'Head of Design Division',
    icon: PenTool,
    desc: 'Directing the visual identity and editorial design for student press publications.'
  },
  {
    name: 'HMIF ITERA',
    role: 'Publication & Documentation Staff',
    icon: ImageIcon,
    desc: 'Documenting departmental activities and creating promotional materials.'
  }
];

const LeadershipSection = () => {
  return (
    <section id="leadership-section" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-14">
          <span className="w-2 h-2 rounded-full bg-garnet" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-charcoal/40">
            05 - Leadership
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {organizations.map((org, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl border border-charcoal/5 bg-white/50 hover:bg-white hover:shadow-xl hover:border-garnet/20 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-garnet/5 flex items-center justify-center text-garnet mb-6 group-hover:scale-110 group-hover:bg-garnet group-hover:text-ivory transition-all duration-500">
                <org.icon className="w-6 h-6" />
              </div>
              <h3 className="font-clash font-bold text-xl text-charcoal mb-2">{org.name}</h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-garnet mb-4">{org.role}</p>
              <p className="text-charcoal/60 text-sm leading-relaxed">{org.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
