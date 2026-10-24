import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { capabilities, portfolioConfig } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleCapability = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="about" className="w-full py-16 sm:py-24 overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Section Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 sm:mb-20">
          {/* Left Column: Editorial Headline & Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 block mb-3">
              About & Core Mindset
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-zinc-950 tracking-tight leading-[1.08] mb-6">
              Marketing is the strategy. Creativity is how I bring it to life.
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              I'm Md. Shahariar Siam, a digital marketer working across performance marketing, social media, and visual content production. My experience with restaurant and lifestyle brands has taught me to look beyond individual campaigns and understand how the different parts of marketing work together.
            </p>
            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-6">
              I work across both sides of the process—from planning and managing ad campaigns to producing the photography and video content behind them. This allows me to connect creative decisions with marketing objectives, keep execution consistent, and take ownership from the initial idea through to delivery.
            </p>

            <div className="mt-8 pt-8 border-t border-zinc-200 flex items-center gap-6">
              <div>
                <span className="font-editorial text-2xl text-zinc-900 block">2+ Years</span>
                <span className="text-xs text-zinc-500">Hands-on Experience</span>
              </div>
              <div className="w-px h-8 bg-zinc-200" />
              <div>
                <span className="font-editorial text-2xl text-zinc-900 block">Global</span>
                <span className="text-xs text-zinc-500">Dhaka & Remote Roles</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Capabilities Accordion */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Core Competencies & Stack
              </span>
              <span className="text-xs text-zinc-400">06 Pillars</span>
            </div>

            <div className="divide-y divide-zinc-200/80">
              {capabilities.map((cap, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="py-5"
                  >
                    <button
                      onClick={() => toggleCapability(index)}
                      className="w-full flex items-center justify-between text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-lg py-1 transition-all"
                      aria-expanded={isExpanded}
                    >
                      <motion.div
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className="flex items-center gap-4"
                      >
                        <span className="text-xs font-mono text-zinc-400">
                          0{index + 1}
                        </span>
                        <h3 className="font-editorial text-2xl sm:text-3xl text-zinc-900 group-hover:text-black tracking-tight transition-colors">
                          {cap.title}
                        </h3>
                      </motion.div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-8 h-8 rounded-full bg-zinc-100 group-hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
                      >
                        <ChevronDown className="w-4 h-4 text-zinc-700" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pl-8 sm:pl-10 pr-2">
                            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-4">
                              {cap.description}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                              {cap.items.map((subItem, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.04 }}
                                  className="flex items-center gap-2 text-zinc-600"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                                  <span>{subItem}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
