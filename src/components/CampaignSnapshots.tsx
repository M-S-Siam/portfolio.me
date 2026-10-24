import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAssetUrl } from '../utils/assetUrl';

export interface SnapshotItem {
  id: string;
  image: string;
  title?: string;
  isCustom?: boolean;
}

const STORAGE_KEY = 'siam_campaign_snapshots_v2';

export const CampaignSnapshots: React.FC = () => {
  const [snapshots] = useState<SnapshotItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Keep only the user's uploaded snapshots
            const userUploaded = parsed.filter(
              (s: SnapshotItem) =>
                s.isCustom === true ||
                (typeof s.image === 'string' && s.image.startsWith('data:image/'))
            );
            if (userUploaded.length > 0) {
              return userUploaded;
            }
          }
        }
      } catch {
        // Fallback
      }
    }
    return [];
  });

  const [activeSnapshot, setActiveSnapshot] = useState<SnapshotItem | null>(null);

  // If no snapshots are uploaded, don't show an empty jarring block
  if (!snapshots || snapshots.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 sm:py-16 overflow-hidden" aria-label="Work Gallery">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Clean, Editorial Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 block mb-2">
            Visual Gallery
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-zinc-950 tracking-tight leading-[1.1] mb-3">
            Work Gallery
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed">
            A visual collection of snapshots, working moments, and random captures from day-to-day work.
          </p>
        </div>

        {/* Pure Image Grid: Just the pictures, with zero repetitive captions or filenames */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {snapshots.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              onClick={() => setActiveSnapshot(item)}
              className="group relative aspect-[16/11] bg-[#ECEDEF] border border-zinc-200/80 rounded-2xl overflow-hidden cursor-pointer shadow-2xs hover:shadow-lg transition-all duration-300"
            >
              {/* Picture only */}
              <img
                src={getAssetUrl(item.image)}
                alt="Campaign snapshot"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Minimal Hover Zoom Indicator */}
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/95 text-zinc-950 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-200">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal: Pure, Full-Resolution Image View */}
      <AnimatePresence>
        {activeSnapshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSnapshot(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
          >
            {/* Close Button at top right */}
            <button
              onClick={() => setActiveSnapshot(null)}
              className="absolute top-5 right-5 sm:top-7 sm:right-7 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[88vh] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center cursor-default bg-black/40 border border-white/10 p-2"
            >
              <img
                src={getAssetUrl(activeSnapshot.image)}
                alt="Campaign snapshot full view"
                className="max-h-[84vh] max-w-full object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
