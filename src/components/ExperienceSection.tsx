import React from 'react';
import { motion } from 'motion/react';
import { experiences, educationList, certificationsList, languages } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="w-full py-16 sm:py-24 border-b border-zinc-200/60 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Title & Education / Certifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 block mb-2">
              Career & Background
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-zinc-950 tracking-tight mb-4">
              Professional Experience
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-8">
              Hands-on track record spanning lead marketing roles, freelance creative production for lifestyle brands, and software tool building.
            </p>

            {/* Education Sub-card */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-xs mb-6">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-3">
                Education
              </span>
              <div className="space-y-4">
                {educationList.map((edu, idx) => (
                  <div key={idx} className="border-b border-zinc-100 last:border-b-0 pb-3 last:pb-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <h3 className="text-sm font-semibold text-zinc-900">{edu.degree}</h3>
                      <span className="text-xs font-mono text-zinc-400">{edu.year}</span>
                    </div>
                    <p className="text-xs text-zinc-600 mt-0.5">{edu.institution}</p>
                    {edu.score && <p className="text-[11px] text-zinc-400 mt-0.5">{edu.score}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Sub-card */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-xs mb-6">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-3">
                Professional Certifications
              </span>
              <ul className="space-y-3">
                {certificationsList.map((cert, idx) => (
                  <li key={idx} className="text-xs text-zinc-700">
                    <strong className="font-medium text-zinc-900 block">{cert.title}</strong>
                    <span className="text-zinc-500">{cert.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages Sub-card */}
            <div className="p-5 rounded-2xl bg-[#ECEDEF]/60 border border-zinc-200/80">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
                Languages
              </span>
              <div className="flex flex-wrap gap-4 text-xs text-zinc-700">
                {languages.map((lang, idx) => (
                  <div key={idx}>
                    <strong className="text-zinc-900">{lang.name}:</strong>{' '}
                    <span className="text-zinc-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Timeline List */}
          <div className="lg:col-span-8 divide-y divide-zinc-200">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="py-7 first:pt-0 last:pb-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h3 className="font-editorial text-2xl sm:text-3xl text-zinc-950 tracking-tight">
                    {exp.position}
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-zinc-500">
                    {exp.period}
                  </span>
                </div>

                <div className="text-sm font-semibold text-zinc-800 mb-3">
                  {exp.organization}
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 mb-4 max-w-2xl">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-zinc-400 mt-1">―</span>
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>

                {exp.achievement && (
                  <div className="p-3.5 rounded-xl bg-[#ECEDEF]/70 border border-zinc-200/80 text-xs text-zinc-800 font-medium">
                    Key Result: <span className="text-zinc-900">{exp.achievement}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
