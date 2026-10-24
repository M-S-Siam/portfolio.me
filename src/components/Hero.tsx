import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Camera, Check, Upload } from 'lucide-react';
import { motion } from 'motion/react';
import { heroStats, portfolioConfig } from '../data/portfolioData';
import { AnimatedCounter } from './AnimatedCounter';
import { getAssetUrl } from '../utils/assetUrl';

interface HeroProps {
  onSelectProjectClick: () => void;
}

// Automatically detect if AI Studio synced file_00000000f58c8208810a0e1f538275d9 into public/assets/aistudio/
const syncedSuitAssets = import.meta.glob(
  '/public/assets/aistudio/file_00000000f58c8208810a0e1f538275d9*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const syncedSuitAssetUrl = Object.values(syncedSuitAssets)[0]
  ? Object.values(syncedSuitAssets)[0].replace(/^\/public/, '')
  : null;

const DEFAULT_PORTRAIT = syncedSuitAssetUrl || '/suit_portrait.jpg';
const STORAGE_KEY = 'siam_suit_portrait_v3';
const LEGACY_KEYS = ['siam_hero_portrait_v2', 'siam_hero_portrait'];

function getInitialSuitPortrait(): string {
  if (typeof window !== 'undefined') {
    // Purge any stale reference to the removed github_portrait.jpg
    for (const key of [STORAGE_KEY, ...LEGACY_KEYS]) {
      const val = localStorage.getItem(key);
      if (val && val.includes('github_portrait')) {
        localStorage.removeItem(key);
      }
    }

    // Check if the user's suit image is already saved in localStorage from earlier
    for (const key of [STORAGE_KEY, ...LEGACY_KEYS]) {
      const saved = localStorage.getItem(key);
      if (saved && saved.startsWith('data:image/')) {
        return saved;
      }
    }
  }
  return getAssetUrl(DEFAULT_PORTRAIT);
}

async function persistPortraitToServer(dataUrl: string): Promise<boolean> {
  if (!dataUrl.startsWith('data:image/')) return false;
  try {
    const res = await fetch('/api/save-portrait', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const Hero: React.FC<HeroProps> = ({ onSelectProjectClick }) => {
  const [portraitSrc, setPortraitSrc] = useState<string>(getInitialSuitPortrait);
  const [imageMissingOnDisk, setImageMissingOnDisk] = useState<boolean>(false);
  const [syncedToRepo, setSyncedToRepo] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = getInitialSuitPortrait();
    if (saved.startsWith('data:image/')) {
      setPortraitSrc(saved);
      localStorage.setItem(STORAGE_KEY, saved);
      // Automatically write the suit image from browser storage to public/suit_portrait.jpg
      // so it is permanently committed to GitHub!
      persistPortraitToServer(saved).then((ok) => {
        if (ok) {
          setSyncedToRepo(true);
          setImageMissingOnDisk(false);
        }
      });
    } else {
      // Check if public/suit_portrait.jpg exists on server disk
      fetch('/api/portrait-status')
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data && data.exists === false && !syncedSuitAssetUrl) {
            setImageMissingOnDisk(true);
          }
        })
        .catch(() => {
          // Static hosting (e.g., GitHub Pages) won't have /api/portrait-status; rely on onError
        });
    }
  }, []);

  const handleImageError = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.startsWith('data:image/') && portraitSrc !== saved) {
      setPortraitSrc(saved);
      return;
    }

    const altSuitUrl = getAssetUrl('/siam_suit_portrait.jpg');
    if (portraitSrc !== altSuitUrl) {
      setPortraitSrc(altSuitUrl);
      return;
    }

    setImageMissingOnDisk(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = async () => {
        // Compress & normalize to high-quality JPEG so it loads fast and commits cleanly to GitHub
        const canvas = document.createElement('canvas');
        const maxDim = 1600;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          setPortraitSrc(dataUrl);
          setImageMissingOnDisk(false);
          try {
            localStorage.setItem(STORAGE_KEY, dataUrl);
            for (const legacyKey of LEGACY_KEYS) {
              localStorage.setItem(legacyKey, dataUrl);
            }
          } catch {
            // Ignore localStorage quota errors
          }
          const savedToDisk = await persistPortraitToServer(dataUrl);
          if (savedToDisk) {
            setSyncedToRepo(true);
          }
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full pt-2 pb-12 sm:pb-16 overflow-hidden scroll-mt-24 sm:scroll-mt-32"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Rounded Hero Box matching reference design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
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
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                      className="text-[#151515] block font-normal"
                    >
                      Scale Brands
                    </motion.span>
                  </div>
                  <div className="overflow-hidden">
                    <motion.span
                      initial={{ y: '100%', opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      className="text-[#8E8E93] block font-normal"
                    >
                      Beyond Limits
                    </motion.span>
                  </div>
                </h1>

                {/* Subtitle / Intro based on CV */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.25, ease: 'easeOut' }}
                  className="text-[#71717A] text-[16px] sm:text-[18px] leading-relaxed max-w-[480px] mb-8 font-normal"
                >
                  I work at the intersection of digital marketing and creative production, helping brands build a stronger online presence through strategic campaigns, social media, and visual storytelling. My approach combines creative thinking with a practical understanding of what works.
                </motion.p>

                {/* Action Buttons with Interactive Springs */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.32, ease: 'easeOut' }}
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
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.38, ease: 'easeOut' }}
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
            <div className="lg:col-span-5 relative flex items-end justify-center overflow-hidden min-h-[440px] lg:min-h-[620px] group/portrait">
              {/* Hidden File Input to save suit portrait directly to public/suit_portrait.jpg */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Subtle top-right button to update/sync suit portrait to GitHub repo */}
              {typeof window !== 'undefined' &&
                (window.location.hostname === 'localhost' ||
                  window.location.hostname.includes('run.app') ||
                  window.location.hostname.includes('aistudio')) && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Select your suit portrait to save permanently to public/suit_portrait.jpg for GitHub"
                    className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/75 hover:bg-zinc-900 text-white text-xs font-medium backdrop-blur-md border border-white/15 shadow-sm opacity-0 group-hover/portrait:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
                  >
                    {syncedToRepo ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Saved for GitHub</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-3.5 h-3.5" />
                        <span>Change Portrait</span>
                      </>
                    )}
                  </button>
                )}

              {/* Studio Backdrop subtle gradient blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#ECEDEF] via-transparent to-transparent lg:hidden z-1 pointer-events-none" />

              {/* Character Portrait */}
              <motion.div
                initial={{ scale: 1.05, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="w-full h-full flex items-end justify-center overflow-hidden transform-gpu will-change-transform"
              >
                {imageMissingOnDisk ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full min-h-[440px] lg:min-h-[620px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#E4E5E9] to-[#D8DADF] cursor-pointer hover:from-[#DFE0E5] transition-colors"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-md mb-4">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-zinc-900 font-semibold text-base mb-1">
                      Click to set your Suit Portrait
                    </p>
                    <p className="text-zinc-600 text-xs max-w-[260px] leading-relaxed">
                      Select your navy suit photo once — it will automatically save to{' '}
                      <code className="text-zinc-800 font-mono">public/suit_portrait.jpg</code> for both AI Studio and GitHub.
                    </p>
                  </div>
                ) : (
                  <img
                    src={portraitSrc}
                    onError={handleImageError}
                    referrerPolicy="no-referrer"
                    alt={`${portfolioConfig.fullName} — Digital Marketer • Founder & Creator`}
                    className="w-full h-full min-h-[440px] lg:min-h-[620px] object-cover object-top select-none pointer-events-none transition-transform duration-700 ease-out hover:scale-[1.02] contrast-[1.03] brightness-[1.01]"
                    loading="eager"
                  />
                )}
              </motion.div>

              {/* Floating Dark Charcoal Availability Card overlaid on lower right */}
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                    transition: {
                      duration: 0.35,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
                className="absolute bottom-5 sm:bottom-7 right-4 sm:right-7 left-4 sm:left-auto z-20 max-w-[360px] bg-[#242426]/95 backdrop-blur-md text-white rounded-[22px] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)] border border-white/10 hover:border-white/20 transition-colors duration-200 transform-gpu will-change-transform group"
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
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.94 }}
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


