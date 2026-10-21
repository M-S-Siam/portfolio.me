import React, { useState, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Project, ProjectCategory } from '../types/portfolio';
import { projects } from '../data/portfolioData';
import { getAssetUrl } from '../utils/assetUrl';

interface SelectedProjectsProps {
  onSelectProject: (project: Project) => void;
}

// Framer Motion staggered orchestration variants
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const SelectedProjects: React.FC<SelectedProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const categories: ProjectCategory[] = [
    'All',
    'Social Growth',
    'Performance Marketing',
    'Cinematography',
    'Web Apps & Tools',
  ];

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-16 sm:py-24"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 block mb-2">
              Portfolio &amp; Case Studies
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-zinc-950 tracking-tight leading-[1.08] mb-3">
              Selected Work
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg font-normal leading-relaxed">
              A curated collection of digital marketing campaigns, audience growth projects, and creative productions. Each project reflects my approach to combining strategic thinking, data-informed decisions, and visual storytelling to support brands across digital platforms.
            </p>
          </div>

          {/* Interactive Category Filter Tabs with Sliding Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#ECEDEF] rounded-2xl border border-zinc-200/80 self-start md:self-auto relative"
            role="tablist"
            aria-label="Filter campaigns by category"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative text-xs sm:text-[13px] font-medium px-3.5 py-1.5 rounded-xl transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 z-10 ${
                    isActive ? 'text-zinc-950' : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-white rounded-xl shadow-xs -z-1"
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Project Editorial Grid with Framer Motion Staggered Sequential Entrance */}
        <motion.div
          layout
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.id}
                variants={cardItemVariants}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                whileHover={{ y: -6 }}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-2xl"
                tabIndex={0}
                data-cursor="project"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
                aria-label={`View campaign: ${project.title}`}
              >
                {/* Image Container with Restrained Zoom */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#ECEEEF] border border-zinc-200/90 mb-5 shadow-2xs group-hover:shadow-md transition-shadow duration-300">
                  <motion.img
                    src={getAssetUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover contrast-[1.02] group-hover:scale-106 transition-transform duration-600 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Hover Overlay with Corner Icon */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-4">
                    <div className="w-10 h-10 rounded-full bg-white/95 text-zinc-950 flex items-center justify-center shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Editorial Typography & Metadata */}
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium mb-1.5">
                    <span>{project.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-editorial text-2xl sm:text-3xl text-zinc-950 tracking-tight group-hover:text-black transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>

                  <p className="text-zinc-600 text-sm leading-relaxed mt-2">
                    {project.summary}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};
