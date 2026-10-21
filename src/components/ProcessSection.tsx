import React from 'react';
import { motion } from 'motion/react';
import { processSteps } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  return (
    <motion.section
      id="process"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-16 sm:py-24 bg-[#ECEDEF]/50 border-y border-zinc-200/80 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Header with Scroll Entry */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-12 sm:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 block mb-2">
            Methodology
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-zinc-950 tracking-tight mb-3">
            How We Work Together
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
            A structured growth framework combining precision paid ad testing with in-house creative production.
          </p>
        </motion.div>

        {/* 4 Process Steps Grid with Staggered Scroll Entrance and Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-xs hover:border-zinc-400 hover:shadow-md transition-all duration-300 group cursor-default"
            >
              <div>
                <span className="font-editorial text-4xl sm:text-5xl text-zinc-300 block mb-4 font-normal group-hover:text-zinc-900 transition-colors">
                  {step.number}
                </span>
                <h3 className="font-editorial text-2xl text-zinc-950 tracking-tight mb-1">
                  {step.title}
                </h3>
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-3">
                  {step.subtitle}
                </span>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
                  Outputs
                </span>
                <ul className="space-y-1 text-xs text-zinc-600">
                  {step.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-zinc-400 group-hover:bg-zinc-800 transition-colors" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
