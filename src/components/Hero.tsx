import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { heroStats, portfolioConfig } from '../data/portfolioData';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroProps {
  onSelectProjectClick: () => void;
}

const DEFAULT_PORTRAIT = '/github_portrait.jpg';
const STORAGE_KEY = 'siam_hero_portrait_v2';

export const Hero: React.FC<HeroProps> = ({ onSelectProjectClick }) => {
  const [portraitSrc, setPortraitSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('siam_hero_portrait');
      if (saved) return saved;
    }
    return DEFAULT_PORTRAIT;
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('siam_hero_portrait');
    if (saved) {
      setPortraitSrc(saved);
    }
  }, []);

  const handleImageError = () => {
    if (portraitSrc !== DEFAULT_PORTRAIT) {
      setPortraitSrc(DEFAULT_PORTRAIT);
    }
  };

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full pt-2 pb-12 sm:pb-16 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Rounded Hero Box matching reference design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative w-full rounded-[28px] sm:rounded-[36px] bg-[#ECEDEF] border border-[#E0E2E6] overflow-hidden shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[620px] items-stretch">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-14 z-10">
              <div className="pt-2 sm:pt-4">
                {/* Two-line Editorial Headline with Masked Reveal */}
                <h1 className="font-editorial text-[44px] sm:text-[60px] lg:text-[74px] leading-[1.04] tracking-tight mb-5">
                  <div className="overflow-hidden">
                    <motion.span
                      initial={{ y: '100%', opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                      className="text-[#151515] block font-normal"
                    >
                      Scale Brands
                    </motion.span>
                  </div>
                  <div className="overflow-hidden">
                    <motion.span
                      initial={{ y: '100%', opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
                      className="text-[#8E8E93] block font-normal"
                    >
                      Beyond Limits
                    </motion.span>
                  </div>
                </h1>

                {/* Subtitle / Intro based on CV */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
                  className="text-[#71717A] text-[16px] sm:text-[18px] leading-relaxed max-w-[480px] mb-8 font-normal"
                >
                  I work at the intersection of digital marketing and creative production, helping brands build a stronger online presence through strategic campaigns, social media, and visual storytelling. My approach combines creative thinking with a practical understanding of what works.
                </motion.p>

                {/* Action Buttons with Interactive Springs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
                  className="flex flex-wrap items-center gap-3.5 mb-10 sm:mb-14"
                >
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center bg-[#18181B] hover:bg-black text-white text-[15px] font-medium px-6 py-3 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-xl active:scale-98 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 cursor-pointer"
                  >
                    View campaigns
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center bg-[#F4F4F5] hover:bg-white text-zinc-900 text-[15px] font-medium px-6 py-3 rounded-full border border-zinc-300 hover:border-zinc-400 active:scale-98 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    Get in touch
                  </motion.a>
                </motion.div>
              </div>

              {/* Three Aligned Statistics with Animated Counters from CV */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
                className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-zinc-300/60 max-w-[500px]"
              >
                {heroStats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col group">
                    <span className="font-editorial text-3xl sm:text-4xl text-[#151515] leading-none mb-1.5 font-normal tracking-tight group-hover:text-black transition-colors">
                      <AnimatedCounter value={stat.value} duration={1400 + idx * 200} />
                    </span>
                    <span className="text-[12px] sm:text-[13px] text-[#71717A] leading-tight font-normal">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Editorial Portrait & Floating Availability Card */}
            <div className="lg:col-span-5 relative flex items-end justify-center overflow-hidden min-h-[440px] lg:min-h-[620px]">
              {/* Studio Backdrop subtle gradient blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#ECEDEF] via-transparent to-transparent lg:hidden z-1 pointer-events-none" />

              {/* Character Portrait */}
              <motion.div
                initial={{ scale: 1.08, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="w-full h-full flex items-end justify-center overflow-hidden"
              >
                <img
                  src={portraitSrc}
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                  alt={`${portfolioConfig.fullName} — Digital Marketing Specialist & Cinematographer`}
                  className="w-full h-full min-h-[440px] lg:min-h-[620px] object-cover object-top select-none pointer-events-none transition-all duration-700 ease-out hover:scale-[1.02] contrast-[1.03] brightness-[1.01]"
                  loading="eager"
                />
              </motion.div>

              {/* Floating Dark Charcoal Availability Card overlaid on lower right */}
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, scale: 1.015 }}
                className="absolute bottom-5 sm:bottom-7 right-4 sm:right-7 left-4 sm:left-auto z-20 max-w-[360px] bg-[#242426]/95 backdrop-blur-md text-white rounded-[22px] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)] border border-white/10 transition-all duration-300 hover:border-white/20 group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0 pr-1">
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium block">
                      SELECT PROJECT
                    </span>
                    <h2 className="text-[15px] sm:text-[16px] font-semibold text-white tracking-tight mt-0.5">
                      Available for projects
                    </h2>
                    <p className="text-[12px] text-zinc-300 mt-1 leading-relaxed">
                      Bringing an ownership mindset to global remote teams & high-growth brands.
                    </p>
                  </div>

                  {/* White Square Action Button with Arrow */}
                  <motion.button
                    onClick={onSelectProjectClick}
                    whileHover={{ scale: 1.12, rotate: 12 }}
                    whileTap={{ scale: 0.92 }}
                    className="shrink-0 w-11 h-11 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 flex items-center justify-center shadow-sm transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Inquire about project availability"
                  >
                    <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
