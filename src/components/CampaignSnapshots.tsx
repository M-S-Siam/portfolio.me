import React, { useState, useEffect } from 'react';
import { X, ZoomIn, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAssetUrl } from '../utils/assetUrl';

export interface SnapshotItem {
  id: string;
  image: string;
  title?: string;
  isCustom?: boolean;
}

const STORAGE_KEY = 'siam_work_gallery_snapshots_v3';

// Curated default authentic captures from Siam's projects so it's always populated for visitors & on GitHub
const DEFAULT_SNAPSHOTS: SnapshotItem[] = [
  {
    id: 'snap-timeline',
    image: '/brand_you_video_timeline.jpg',
    title: 'Timeline & Video Editing Session',
  },
  {
    id: 'snap-roselle-camp',
    image: '/roselle_jewelry_campaign.jpg',
    title: 'Jewelry Campaign Editorial',
  },
  {
    id: 'snap-streetwear-disp',
    image: '/ritmo_streetwear_display.jpg',
    title: 'Streetwear Retail Display',
  },
  {
    id: 'snap-cinema-opt',
    image: '/cinematography_shot_1_opt.jpg',
    title: 'Cinematic Grade Frame',
  },
  {
    id: 'snap-midtown-dine',
    image: '/midtown_restaurant_dining.jpg',
    title: 'Restaurant Space & Dining',
  },
  {
    id: 'snap-studio-growth',
    image: '/brand_you_growth_studio.jpg',
    title: 'Studio Recording Production',
  },
  {
    id: 'snap-roselle-ring',
    image: '/roselle_jewelry_ring.jpg',
    title: 'Macro Product Detail',
  },
  {
    id: 'snap-gimbal-1',
    image: '/cinematography_gimbal_shot1.jpg',
    title: 'On-set Gimbal Rig & Camera Operation',
  },
];

export const CampaignSnapshots: React.FC = () => {
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Keep user custom uploads at the beginning, followed by default snapshots
            const custom = parsed.filter((s: SnapshotItem) => s.isCustom);
            if (custom.length > 0) {
              return [...custom, ...DEFAULT_SNAPSHOTS];
            }
          }
        }
      } catch {
        // Fallback to defaults
      }
    }
    return DEFAULT_SNAPSHOTS;
  });

  const [activeSnapshot, setActiveSnapshot] = useState<SnapshotItem | null>(null);

  // Sync custom uploads to localStorage
  const saveCustomSnapshots = (items: SnapshotItem[]) => {
    try {
      const customOnly = items.filter((item) => item.isCustom);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        if (result) {
          const newItem: SnapshotItem = {
            id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            image: result,
            title: file.name.replace(/\.[^/.]+$/, ''),
            isCustom: true,
          };
          setSnapshots((prev) => {
            const next = [newItem, ...prev];
            saveCustomSnapshots(next);
            return next;
          });
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  const handleDeleteSnapshot = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSnapshots((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveCustomSnapshots(next);
      return next;
    });
    if (activeSnapshot?.id === id) {
      setActiveSnapshot(null);
    }
  };

  return (
    <section id="gallery" className="w-full py-16 sm:py-24 scroll-mt-24 sm:scroll-mt-28 overflow-hidden" aria-label="Work Gallery">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Editorial Section Header */}
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

          {/* Upload / Add Action */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-zinc-50 border border-zinc-300 hover:border-zinc-400 text-zinc-900 rounded-full text-xs sm:text-[13px] font-medium cursor-pointer shadow-2xs hover:shadow-xs transition-all active:scale-97">
              <Plus className="w-4 h-4 text-zinc-700" />
              <span>Add photo</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        {/* Pure Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {snapshots.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: (index % 8) * 0.05 }}
              onClick={() => setActiveSnapshot(item)}
              className="group relative aspect-[16/11] bg-[#ECEDEF] border border-zinc-200/90 rounded-2xl overflow-hidden cursor-pointer shadow-2xs hover:shadow-lg transition-all duration-300"
            >
              {/* Picture only */}
              <img
                src={getAssetUrl(item.image)}
                alt={item.title || 'Work capture snapshot'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Delete Button for User Uploaded Snapshots */}
              {item.isCustom && (
                <button
                  onClick={(e) => handleDeleteSnapshot(item.id, e)}
                  title="Remove uploaded image"
                  className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-black/60 hover:bg-red-600 text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
                  aria-label="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Minimal Hover Zoom Indicator */}
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
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
