import React, { useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-4xl bg-[#F7F7F6] rounded-[28px] border border-zinc-200/80 shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-zinc-200/80 bg-white/70">
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                <span>{project.client}</span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 cursor-pointer"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto">
              {/* Title & Role */}
              <div className="mb-6">
                <h2 id="modal-title" className="font-editorial text-3xl sm:text-5xl text-zinc-950 tracking-tight mb-2">
                  {project.title}
                </h2>
                <p className="text-zinc-600 text-base sm:text-lg max-w-2xl leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Featured Hero Media */}
              <div className="rounded-2xl overflow-hidden border border-zinc-200/80 mb-8 bg-zinc-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[320px] sm:h-[420px] object-cover contrast-[1.02]"
                />
              </div>

              {/* Deep Case Study Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    The Challenge
                  </h3>
                  <p className="text-zinc-700 leading-relaxed text-sm sm:text-base">
                    {project.challenge}
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Design Solution
                  </h3>
                  <p className="text-zinc-700 leading-relaxed text-sm sm:text-base">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Impact Banner */}
              <div className="p-6 rounded-2xl bg-[#ECEDEF] border border-zinc-300/70 mb-8 flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                    Measured Impact
                  </h4>
                  <p className="text-zinc-900 font-medium text-sm sm:text-base">
                    {project.impact}
                  </p>
                </div>
              </div>

              {/* Deliverables */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                  Key Deliverables
                </h3>
                <div className="flex flex-wrap gap-2 text-xs text-zinc-700">
                  {project.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-zinc-200/70 px-3 py-1.5 rounded-md font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery Previews */}
              {project.gallery && project.gallery.length > 1 && (
                <div className="space-y-3 mb-8">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Visual Artifacts
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.slice(1).map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-zinc-200">
                        <img
                          src={img}
                          alt={`${project.title} detail ${idx + 1}`}
                          className="w-full h-52 object-cover contrast-[1.02] hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-6 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-zinc-500">
                  Role: <strong className="text-zinc-800">{project.role}</strong>
                </div>

                <div className="flex items-center gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 text-sm font-medium px-4 py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
                    >
                      <span>Live link</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      onClose();
                      onInquire();
                    }}
                    className="bg-[#18181B] hover:bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Inquire about this</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
