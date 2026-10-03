import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

/* 
 * ============================================================================
 * HEART PARTICLES COMPONENT (Background for Page5Final)
 * 
 * Hardware-accelerated, slow-moving, fading heart particles using Framer Motion.
 * Uses GPU transform properties (translateY, translateX, opacity, scale, rotate)
 * to ensure 60fps performance without layout thrashing.
 * 
 * Tuned with soft translucency (0.12 - 0.24) and pointer-events-none so it enhances
 * the romantic atmosphere without cluttering or distracting from Gagan's letter.
 * ============================================================================
 */

interface ParticleConfig {
  id: number;
  xPercent: number;    // horizontal anchor percentage across viewport
  startOffsetVh: number; // initial vertical staggered offset (-20vh to 90vh)
  size: number;        // 10px to 20px
  duration: number;    // 16s to 26s slow ascent
  driftPx: number;     // gentle horizontal sway
  maxOpacity: number;  // 0.12 to 0.24 delicate opacity
  colorClass: string;
  glowColor: string;
}

const PALETTE = [
  {
    color: 'text-pink-400/40 fill-pink-400/20',
    glow: 'rgba(244, 114, 182, 0.3)',
  },
  {
    color: 'text-rose-300/35 fill-rose-300/18',
    glow: 'rgba(253, 164, 175, 0.25)',
  },
  {
    color: 'text-purple-300/30 fill-purple-300/15',
    glow: 'rgba(216, 180, 254, 0.25)',
  },
  {
    color: 'text-pink-300/40 fill-pink-300/20',
    glow: 'rgba(249, 168, 212, 0.3)',
  },
];

export const HeartParticles: React.FC = () => {
  // Check user preference for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pre-calculate 14 lightweight particles with deterministic spacing
  const particles: ParticleConfig[] = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const palette = PALETTE[i % PALETTE.length];
      return {
        id: i,
        // Distribute nicely from 5% to 95% width, avoiding center clustering
        xPercent: 5 + (i * 90) / 14 + (Math.sin(i * 3) * 3),
        // Staggered vertical start points so particles are visible on first load
        startOffsetVh: -15 + (i * 8.5) % 110,
        size: 10 + (i % 4) * 3, // 10px, 13px, 16px, 19px
        duration: 18 + (i % 5) * 2.2, // 18s - 27s slow soothing drift
        driftPx: (i % 2 === 0 ? 1 : -1) * (12 + (i % 3) * 6),
        maxOpacity: 0.14 + (i % 3) * 0.05, // 0.14 to 0.24 delicate translucency
        colorClass: palette.color,
        glowColor: palette.glow,
      };
    });
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={`heart-p-${p.id}`}
          initial={{
            y: `${p.startOffsetVh}vh`,
            x: 0,
            opacity: 0,
            scale: 0.85,
            rotate: (p.id % 2 === 0 ? 1 : -1) * 6,
          }}
          animate={{
            y: ['105vh', '-12vh'],
            x: [0, p.driftPx, -p.driftPx * 0.7, 0],
            opacity: [0, p.maxOpacity, p.maxOpacity * 0.85, 0],
            scale: [0.85, 1.05, 0.95],
            rotate: [
              (p.id % 2 === 0 ? 1 : -1) * 6,
              (p.id % 2 === 0 ? -1 : 1) * 12,
              (p.id % 2 === 0 ? 1 : -1) * 6,
            ],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
            },
            x: {
              duration: p.duration * 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
            opacity: {
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.2, 0.8, 1], // Fades in smoothly, sustains, then fades out softly
            },
            scale: {
              duration: 4.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
            rotate: {
              duration: 7,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
          className={`absolute ${p.colorClass}`}
          style={{
            left: `${p.xPercent}vw`,
            willChange: 'transform, opacity',
            filter: `drop-shadow(0 0 6px ${p.glowColor})`,
          }}
        >
          <Heart style={{ width: `${p.size}px`, height: `${p.size}px` }} />
        </motion.div>
      ))}
    </div>
  );
};
