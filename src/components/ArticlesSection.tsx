import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { articles } from '../data/portfolioData';
import { Article } from '../types/portfolio';
import { getAssetUrl } from '../utils/assetUrl';

export const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="articles" className="w-full py-16 sm:py-24 border-b border-zinc-200/60 overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 block mb-2">
              Writing & Perspective
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-zinc-950 tracking-tight leading-[1.08] mb-3">
              Notes & Insights
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
              Essays on craftsmanship, design restraint, typographic baseline systems, and digital product strategy.
            </p>
          </div>
        </motion.div>

        {/* Articles List / Grid with hover elevation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer flex flex-col justify-between p-6 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-300 shadow-2xs hover:shadow-md transition-all duration-300"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedArticle(article);
                }
              }}
            >
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 mb-5 border border-zinc-200/90 shadow-2xs">
                  <img
                    src={getAssetUrl(article.image)}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium mb-2">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-editorial text-2xl text-zinc-950 tracking-tight leading-snug group-hover:text-black mb-2 transition-colors">
                  {article.title}
                </h3>

                <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3 mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-medium text-zinc-900 group-hover:text-black">
                <span>Read essay</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedArticle(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative w-full max-w-2xl bg-[#F7F7F6] rounded-[24px] border border-zinc-200 p-6 sm:p-10 shadow-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>{selectedArticle.category}</span>
                  <span>·</span>
                  <span>{selectedArticle.date}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedArticle(null)}
                  className="w-8 h-8 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center text-zinc-700 transition-colors cursor-pointer"
                  aria-label="Close article reader"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-zinc-950 tracking-tight mb-6">
                {selectedArticle.title}
              </h2>

              {selectedArticle.image && (
                <div className="rounded-xl overflow-hidden mb-6 border border-zinc-200/90 bg-zinc-950 shadow-sm">
                  <img
                    src={getAssetUrl(selectedArticle.image)}
                    alt={selectedArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover max-h-[380px]"
                  />
                </div>
              )}

              <div className="space-y-4 text-zinc-700 leading-relaxed text-base sm:text-lg">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {selectedArticle.takeaway && (
                <div className="mt-6 pt-6 border-t border-zinc-200/80">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 block mb-2">
                    THE TAKEAWAY
                  </span>
                  <p className="text-zinc-800 leading-relaxed text-base sm:text-lg font-normal">
                    {selectedArticle.takeaway}
                  </p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-zinc-200 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedArticle(null)}
                  className="bg-[#18181B] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-black transition-colors cursor-pointer"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
