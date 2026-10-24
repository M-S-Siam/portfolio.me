import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericPart = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  // For low numbers (like 2), use a snappy duration (250ms) so it never lingers on '1'
  const targetDuration = duration ?? (numericPart <= 3 ? 250 : 750);
  
  // Initialize with target value if 2 or less so it's instantly correct on load
  const [count, setCount] = useState(() => (numericPart <= 2 ? numericPart : 0));

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / targetDuration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      // Using Math.round prevents low numbers like 2 from being stuck on Math.floor(1.99) = 1
      const nextCount = Math.min(Math.round(easeProgress * numericPart), numericPart);
      setCount(nextCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(numericPart);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, numericPart, targetDuration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};
