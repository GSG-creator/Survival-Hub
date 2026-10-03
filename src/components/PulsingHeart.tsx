import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

/* 
 * ============================================================================
 * PULSING HEART COMPONENT
 * 
 * Gentle, organic double-beat breathing Framer Motion animation.
 * Periodically pulses and glows softly to bring romantic elements to life.
 * ============================================================================
 */

interface PulsingHeartProps {
  className?: string;
  size?: number;
  delay?: number;
}

export const PulsingHeart: React.FC<PulsingHeartProps> = ({
  className = 'w-3.5 h-3.5 text-pink-400 fill-pink-400/40',
  size,
  delay = 0,
}) => {
  // Check user preference for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return <Heart className={className} size={size} />;
  }

  return (
    <motion.span
      className="inline-flex items-center justify-center align-middle"
      animate={{
        scale: [1, 1.15, 1, 1.22, 1],
        filter: [
          'drop-shadow(0 0 0px rgba(244,114,182,0))',
          'drop-shadow(0 0 5px rgba(244,114,182,0.5))',
          'drop-shadow(0 0 1px rgba(244,114,182,0.2))',
          'drop-shadow(0 0 8px rgba(244,114,182,0.65))',
          'drop-shadow(0 0 0px rgba(244,114,182,0))',
        ],
      }}
      transition={{
        duration: 3.2,
        repeat: Infinity,
        repeatDelay: 0.6,
        ease: 'easeInOut',
        times: [0, 0.12, 0.24, 0.36, 1],
        delay,
      }}
    >
      <Heart className={className} size={size} />
    </motion.span>
  );
};
