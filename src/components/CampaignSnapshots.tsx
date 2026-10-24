import React, { useState, useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAssetUrl } from '../utils/assetUrl';

export interface SnapshotItem {
  id: string;
  image: string;
  title?: string;
  isCustom?: boolean;
}

const STORAGE_KEY = 'siam_user_work_gallery';

export const CampaignSnapshots: React.FC = () => {
  // Pure user-uploaded gallery: Starts completely empty until the user uploads their own pictures
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      } catch {
        // Fallback
      }
    }
    return [];
  });

  const [activeSnapshot, setActiveSnapshot] = useState<SnapshotItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveSnapshots = (items: SnapshotItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save snapshots to localStorage', e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    let loadedCount = 0;
    const newItems: SnapshotItem[] = [];

    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        if (result) {
          newItems.push({
            id: `snap-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
            image: result,
            title: file.name.replace(/\.[^/.]+$/, ''),
            isCustom: true,
          });
        }
        loadedCount += 1;
        if (loadedCount === fileList.length) {
          setSnapshots((prev) => {
            const updated = [...newItems, ...prev];
            saveSnapshots(updated);
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleDeleteSnapshot = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSnapshots((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveSnapshots(updated);
      return updated;
    });
    if (activeSnapshot?.id === id) {
      setActiveSnapshot(null);
    }
  };

  if (snapshots.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="w-full py-16 sm:py-24 scroll-mt-24 sm:scroll-mt-28 overflow-hidden" aria-label="Work Gallery">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
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
        </div>

        {/* Gallery Content: Pure Image Grid with user-uploaded captures only */}
        {snapshots.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {snapshots.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
                onClick={() => setActiveSnapshot(item)}
                className="group relative aspect-[16/11] bg-[#ECEDEF] border border-zinc-200/90 rounded-2xl overflow-hidden cursor-pointer shadow-2xs hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={getAssetUrl(item.image)}
                  alt={item.title || 'Work capture snapshot'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Minimal Hover Zoom Indicator */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/95 text-zinc-950 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-200">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal: Full-Resolution Image View */}
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
                alt={activeSnapshot.title || 'Work capture snapshot'}
                className="max-h-[84vh] max-w-full object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
