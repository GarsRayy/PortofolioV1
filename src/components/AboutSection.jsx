import { memo, useState, lazy, Suspense } from 'react';
import { Gsap } from '../utils/gsapAnimate';
import { ArrowUpRight, MapPin } from 'lucide-react';


/* ─────────────────────────────────────────
   Static data
   ───────────────────────────────────────── */

const STATS = [
  { value: 'UI/UX', label: 'Design\nExpertise' },
  { value: 'DATA', label: 'Analytical\nSkills' },
  { value: 'WEB', label: 'Modern\nStack' },
];

const CAPABILITIES = [
  'UI/UX Design (Figma)',
  'Data Analysis (SQL/Python)',
  'Web Development (React)',
  'Graphic Design',
];

/* ─────────────────────────────────────────
   Achievement Card
   ───────────────────────────────────────── */

/* ─────────────────────────────────────────
   Main Component
   ───────────────────────────────────────── */
const AboutSection = memo(function AboutSection() {

  return (
    <section id="about-section" className="py-20 md:py-28 w-full relative bg-[#FAF9F6] overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute right-0 top-1/4 w-[520px] h-[520px] bg-garnet/[0.07] rounded-full blur-[110px]" />
        <div className="absolute -left-24 bottom-0 w-[380px] h-[380px] bg-black/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1380px] mx-auto px-6 md:px-12 relative z-10">

        {/* ── Section Label ── */}
        <Gsap.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16 md:mb-20"
        >
          <span className="w-[6px] h-[6px] rounded-full bg-garnet shrink-0" />
          <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.24em] text-black/32">
            01 — About
          </span>
          <div className="flex-1 h-px bg-black/[0.07]" />
        </Gsap.div>

        <div className="grid lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-14 lg:gap-20 xl:gap-28 items-start">

          {/* ══════════════════════════════
              LEFT COLUMN — Image & Meta
              ══════════════════════════════ */}
          <Gsap.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-28"
          >
            {/* Profile image with decorative offset border */}
            <div className="relative">
              <div className="absolute -top-2.5 -left-2.5 w-full h-full border border-garnet/25 rounded-[4px] pointer-events-none" />

              <div className="relative aspect-[4/5] w-full rounded-[4px] overflow-hidden border border-black/[0.07] bg-black/[0.04] group">
                {/* Hover desaturation overlay */}
                <div className="absolute inset-0 bg-black/[0.12] group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-multiply pointer-events-none" />

                <picture>
                  <source srcSet="/profilee.webp" type="image/webp" />
                  <img
                    src="/profilee.webp"
                    alt="Garis Rayya Rabbani"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top grayscale-[25%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </picture>

                {/* Name plate at bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pt-10 pb-4 bg-gradient-to-t from-charcoal/65 via-charcoal/30 to-transparent z-20">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/50 mb-0.5">Name</p>
                  <p className="text-ivory font-clash font-bold text-[15px] tracking-wide leading-snug">Garis Rayya Rabbani</p>
                </div>

                {/* Corner brackets */}
                <span className="absolute top-3.5 left-3.5 w-5 h-px bg-white/65 z-20" />
                <span className="absolute top-3.5 left-3.5 w-px h-5 bg-white/65 z-20" />
                <span className="absolute bottom-3.5 right-3.5 w-5 h-px bg-white/65 z-20" />
                <span className="absolute bottom-3.5 right-3.5 w-px h-5 bg-white/65 z-20" />
              </div>
            </div>

            {/* Status + Location */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="bg-white border border-black/[0.08] rounded-[3px] py-3.5 px-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/32 mb-1.5">Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-[6px] h-[6px] rounded-full bg-garnet shrink-0" />
                  <span className="text-[13px] font-bold text-black">Available</span>
                </div>
              </div>
              <div className="bg-white border border-black/[0.08] rounded-[3px] py-3.5 px-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/32 mb-1.5">Location</p>
                <div className="flex items-center gap-1.5">
                  <MapPin size={11} className="text-black/38 shrink-0" />
                  <span className="text-[13px] font-bold text-black">Indonesia</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-2.5 grid grid-cols-3 gap-2.5">
              {STATS.map((stat, i) => (
                <div key={i} className="bg-white border border-black/[0.08] rounded-[3px] py-4 px-3 text-center">
                  <p className="font-black text-[22px] text-black leading-none tabular-nums">{stat.value}</p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-black/32 mt-1.5 leading-tight whitespace-pre-line">{stat.label}</p>
                </div>
              ))}
            </div>
          </Gsap.div>

          {/* ══════════════════════════════
              RIGHT COLUMN — Content
              ══════════════════════════════ */}
          <div className="flex flex-col">

            {/* Headline */}
            <Gsap.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 md:mb-10"
            >
              {/* Eyebrow */}
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/30 mb-5">
                Based in Indonesia — Open to Work
              </p>

              {/* Main title */}
              <h2 className="font-clash font-bold tracking-[-0.025em] leading-[1.08] text-charcoal">
                <span className="block text-[44px] sm:text-[56px] lg:text-[64px] xl:text-[72px] uppercase">
                  UI/UX Designer
                </span>

                <span className="block text-[22px] sm:text-[26px] lg:text-[30px] xl:text-[34px] font-medium tracking-[-0.01em] text-charcoal/55 mt-2">
                  & Data Analysis Enthusiast
                </span>
              </h2>
            </Gsap.div>

            {/* Role subtitle */}
            <Gsap.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.65 }}
              className="flex items-center gap-3 mb-8 md:mb-9"
            >

              <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-[0.2em] text-black/35">
                UI/UX Design · Data Analysis · Web Development
              </span>
            </Gsap.div>

            {/* Bio */}
            <Gsap.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14, duration: 0.75, ease: 'easeOut' }}
              className="space-y-4 text-[15px] md:text-[15.5px] font-jakarta font-light text-charcoal/60 leading-[1.88] max-w-[580px]"
            >
              <p>
                I'm <strong className="text-charcoal font-semibold">Garis Rayya Rabbani</strong>, a 6th-semester Informatics student at ITERA. I bridge the gap between user needs and technical implementation through intuitive design and data-driven insights.
              </p>
              <p>
                My passion lies in creating seamless digital experiences. Whether it's through crafting detailed UI components or engineering robust data pipelines, I strive for excellence in every project.
              </p>
            </Gsap.div>

            {/* Divider */}
            <div className="mt-10 md:mt-12 mb-10 md:mb-12 h-px bg-black/[0.07] max-w-[580px]" />

            {/* Core Capabilities */}
            <Gsap.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.75 }}
            >
              <p className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-[0.22em] text-black/32 mb-4">
                Core Focus & Supporting Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {CAPABILITIES.map((cap, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-[0.12em] font-bold text-black/75 border border-black/[0.11] px-3.5 py-[9px] rounded-[3px] hover:border-black hover:text-black hover:bg-black hover:text-white transition-all duration-200 cursor-default"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </Gsap.div>


          </div>
        </div>
      </div>


    </section>
  );
});

export default AboutSection;
