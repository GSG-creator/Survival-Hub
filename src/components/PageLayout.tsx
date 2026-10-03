import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

/* 
 * ============================================================================
 * SHARED PAGE LAYOUT COMPONENT
 * 
 * Wraps every page with consistent Framer Motion entry/exit transitions:
 * - Enter: Soft fade in with a gentle upward slide from y: 22 to y: 0
 * - Exit: Soft fade out with a slight upward drift from y: 0 to y: -16
 * - Smooth cubic-bezier spring curve for an elevated, polished feel.
 * - Full accessibility support with prefers-reduced-motion fallback.
 * ============================================================================
 */

interface PageLayoutProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  maxWidth?: '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  className?: string;
}

const MAX_WIDTH_MAP = {
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  'full': 'max-w-full',
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  maxWidth = '3xl',
  className = '',
  ...motionProps
}) => {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationVariants = {
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 },
  };

  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier deceleration
      }}
      className={`w-full ${MAX_WIDTH_MAP[maxWidth]} mx-auto py-6 sm:py-10 px-4 flex flex-col relative z-10 ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
