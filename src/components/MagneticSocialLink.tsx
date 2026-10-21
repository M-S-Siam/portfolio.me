import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface MagneticSocialLinkProps {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export const MagneticSocialLink: React.FC<MagneticSocialLinkProps> = ({ name, href, icon }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  // Position motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Parallax motion for the inner label/icon
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);

  // Smooth springs for magnetic pull and elastic release
  const springConfig = { damping: 16, stiffness: 220, mass: 0.12 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothTextX = useSpring(textX, springConfig);
  const smoothTextY = useSpring(textY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull strength (container follows 38% of cursor delta)
    x.set(distanceX * 0.38);
    y.set(distanceY * 0.38);

    // Inner icon & text parallax (follows extra 18% for depth)
    textX.set(distanceX * 0.18);
    textY.set(distanceY * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    textX.set(0);
    textY.set(0);
  };

  const isMail = href.startsWith('mailto:');

  return (
    <motion.a
      ref={ref}
      href={href}
      target={isMail ? undefined : '_blank'}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-zinc-950 hover:bg-white hover:border-white shadow-2xs hover:shadow-[0_4px_18px_rgba(255,255,255,0.18)] transition-colors duration-300 ease-out cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      aria-label={`Visit ${name}`}
    >
      <motion.span
        style={{ x: smoothTextX, y: smoothTextY }}
        className="flex items-center gap-1.5 transition-transform"
      >
        <span className="shrink-0 text-zinc-500 group-hover:text-zinc-950 transition-colors duration-300">
          {icon}
        </span>
        <span className="tracking-tight transition-colors duration-300">
          {name}
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
      </motion.span>
    </motion.a>
  );
};
