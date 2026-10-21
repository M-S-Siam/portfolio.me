import React from 'react';
import { testimonials } from '../data/portfolioData';
import { getAssetUrl } from '../utils/assetUrl';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 border-b border-zinc-200/60">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="max-w-xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 block mb-2">
            Feedback
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-zinc-950 tracking-tight mb-3">
            What Collaborators Say
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Demonstration reflections from founding partners and product executives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-xs"
            >
              <div className="mb-6">
                <span className="font-editorial text-5xl text-zinc-300 leading-none block mb-2 select-none">
                  “
                </span>
                <p className="text-zinc-700 text-sm sm:text-base leading-relaxed italic">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-100">
                <img
                  src={getAssetUrl(item.avatar)}
                  alt={item.author}
                  className="w-10 h-10 rounded-full object-cover grayscale contrast-125 border border-zinc-200"
                />
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 leading-tight">
                    {item.author}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-tight mt-0.5">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
