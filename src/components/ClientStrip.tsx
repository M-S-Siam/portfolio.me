import React from 'react';

export const ClientStrip: React.FC = () => {
  return (
    <section className="w-full py-8 sm:py-10 border-b border-zinc-200/50 overflow-hidden" aria-label="Brands and Platforms">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Clarifying Section Micro-Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-zinc-400 shrink-0">
            Selected Brands, Client Campaigns &amp; Platforms
          </span>
          <div className="h-px bg-zinc-200/80 flex-1" />
        </div>

        {/* Clean, Static Brand Strip with No Distracting Animations */}
        <div className="flex flex-wrap items-center justify-between gap-y-6 gap-x-8 lg:gap-x-10 text-zinc-700">
          {/* 1. Brand You */}
          <div className="flex items-center gap-2 group cursor-default transition-colors">
            <svg className="w-5 h-5 text-zinc-800 group-hover:text-black transition-colors fill-none stroke-current" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" strokeWidth="2.4" />
              <path d="M12 7v10M8 12h8" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <span className="text-[17px] font-semibold text-zinc-800 tracking-tight leading-none group-hover:text-black transition-colors">
              Brand You
            </span>
          </div>

          {/* 2. RITMO - Perfectly leveled icon and wordmark */}
          <div className="flex items-center gap-2 group cursor-default transition-colors">
            <svg
              className="h-[13px] w-[10.5px] text-zinc-800 group-hover:text-black transition-colors fill-current -translate-y-[0.5px] shrink-0"
              viewBox="4 4 13 16"
              aria-hidden="true"
            >
              <path d="M4 4h7a5 5 0 0 1 5 5c0 2-1.2 3.8-3 4.6l4 6.4h-4l-3.3-5.5H7v5.5H4V4zm3 3v4.5h4a2.2 2.2 0 0 0 2.2-2.2A2.2 2.2 0 0 0 11 7H7z" />
            </svg>
            <span className="text-[17px] font-semibold text-zinc-800 tracking-tight leading-none group-hover:text-black transition-colors">
              RITMO
            </span>
          </div>

          {/* 3. Roselle */}
          <div className="flex items-center gap-2 group cursor-default transition-colors">
            <svg className="w-5 h-5 text-zinc-800 group-hover:text-black transition-colors stroke-current fill-none" viewBox="0 0 24 24">
              <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" strokeWidth="2.4" />
            </svg>
            <span className="text-[17px] font-semibold text-zinc-800 tracking-tight leading-none group-hover:text-black transition-colors">
              Roselle
            </span>
          </div>

          {/* 4. MidTown */}
          <div className="flex items-center gap-2 group cursor-default transition-colors">
            <svg className="w-5 h-5 text-zinc-800 group-hover:text-black transition-colors fill-current" viewBox="0 0 24 24">
              <path d="M3 21h18v-2H3v2zm3-4h3V5H6v12zm6 0h3V9h-3v8zm6 0h3v-6h-3v6z" />
            </svg>
            <span className="text-[17px] font-semibold text-zinc-800 tracking-tight leading-none group-hover:text-black transition-colors">
              MidTown
            </span>
          </div>

          {/* 5. Meta Ads */}
          <div className="flex items-center gap-2 group cursor-default transition-colors">
            <svg className="w-5 h-5 text-zinc-800 group-hover:text-black transition-colors fill-current" viewBox="0 0 24 24">
              <path d="M12 10.2c-1.3-2-2.6-3.2-4.5-3.2C4.5 7 2 9.5 2 13s2.5 6 5.5 6c2.4 0 4-1.6 4.5-2.5.5.9 2.1 2.5 4.5 2.5 3 0 5.5-2.5 5.5-6s-2.5-6-5.5-6c-1.9 0-3.2 1.2-4.5 3.2zm-4.5 6c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2c1.4 0 2.5 1.1 3.5 2.6-.9 1.9-2.1 3.8-3.5 3.8zm9 0c-1.4 0-2.6-1.9-3.5-3.8 1-1.5 2.1-2.6 3.5-2.6 1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2z" />
            </svg>
            <span className="text-[17px] font-semibold text-zinc-800 tracking-tight leading-none group-hover:text-black transition-colors">
              Meta Ads
            </span>
          </div>

          {/* 6. Google Ads */}
          <div className="flex items-center gap-2 group cursor-default transition-colors">
            <svg className="w-5 h-5 text-zinc-800 group-hover:text-black transition-colors fill-none stroke-current" viewBox="0 0 24 24">
              <path d="M3.5 17.5L8.5 7.5c.8-1.5 2.7-2.1 4.2-1.3l.5.3c1.5.8 2.1 2.7 1.3 4.2L9.5 20.7" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="5" cy="18" r="2.5" fill="currentColor" stroke="none" />
              <path d="M14 6l5 10c.8 1.5.2 3.4-1.3 4.2l-.5.3c-1.5.8-3.4.2-4.2-1.3L8 9" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <span className="text-[17px] font-semibold text-zinc-800 tracking-tight leading-none group-hover:text-black transition-colors">
              Google Ads
            </span>
          </div>

          {/* 7. Quantrex */}
          <div className="flex items-center gap-2 group cursor-default transition-colors">
            <svg className="w-5 h-5 text-zinc-800 group-hover:text-black transition-colors fill-none stroke-current" viewBox="0 0 24 24">
              <path d="M4 4v16h16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 14l3-3 3 3 5-6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[17px] font-semibold text-zinc-800 tracking-tight leading-none group-hover:text-black transition-colors">
              Quantrex
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
