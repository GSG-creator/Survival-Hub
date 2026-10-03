import React from 'react';

/**
 * StarField & Ambient Glow
 * Provides the "Midnight Terminal × Soft Romantic" backdrop.
 * Restrained, elegant, non-distracting background atmosphere.
 */
export const StarField: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Subtle star particle pattern */}
      <div className="absolute inset-0 stars-bg opacity-75" />

      {/* Ambient soft glow orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full ambient-glow-purple blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full ambient-glow-rose blur-3xl opacity-60" />
      <div className="absolute -bottom-32 left-1/3 w-[34rem] h-[34rem] rounded-full ambient-glow-purple blur-3xl opacity-50" />

      {/* Subtle top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08060d]/60 via-transparent to-[#08060d]/80" />
    </div>
  );
};
