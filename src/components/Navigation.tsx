import React, { useState } from 'react';
import { PAGES, PageId } from '../types';
import { Terminal, Volume2, VolumeX, Check, ChevronRight } from 'lucide-react';
import { ambientPlayer } from '../utils/ambientAudio';

/* 
 * ============================================================================
 * NAVIGATION & ANIMATED PIPELINE STEPPER
 * 
 * Midnight Terminal × Soft Romantic Stepper:
 * - Desktop: Connected animated node pipeline with state halos and labels.
 * - Mobile: Ultra-sleek responsive micro-stepper with touch affordance & active tag.
 * - Audio toggle & devtools console easter egg.
 * ============================================================================
 */

interface NavigationProps {
  currentPageId: PageId;
  onNavigate: (pageId: PageId) => void;
  onOpenEasterEgg: () => void;
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPageId,
  onNavigate,
  onOpenEasterEgg,
  isAudioPlaying = false,
  onToggleAudio,
}) => {
  const currentIndex = PAGES.findIndex((p) => p.id === currentPageId);
  const currentPage = PAGES[currentIndex] || PAGES[0];

  const handleToggleAudio = async () => {
    if (onToggleAudio) {
      onToggleAudio();
    } else {
      if (isAudioPlaying) {
        ambientPlayer.stop();
      } else {
        await ambientPlayer.start();
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-500/15 bg-[#08060d]/85 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: App Logo & System Tag */}
        <button
          type="button"
          onClick={() => onNavigate('boot')}
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-1 focus-visible:ring-pink-400 rounded-lg p-1 text-left cursor-pointer"
          title="Return to Boot Screen"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-500/30 group-hover:border-pink-500/50 transition-colors shadow-sm">
            <span className="w-2 h-2 rounded-full bg-pink-400 group-hover:scale-125 transition-transform" />
            <span className="absolute -inset-0.5 rounded-lg bg-pink-500/20 blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-purple-100 group-hover:text-pink-200 transition-colors">
              apology<span className="text-pink-400">.exe</span>
            </span>
            <span className="text-[10px] font-mono text-purple-400/70 hidden sm:inline -mt-0.5">
              Gagan → Lithi
            </span>
          </div>
        </button>

        {/* Center: Sophisticated Desktop Animated Stepper (md & up) */}
        <nav
          aria-label="Apology stage pipeline"
          className="hidden md:flex items-center relative py-1 px-3 rounded-full bg-[#110c1f]/80 border border-purple-500/20 shadow-inner"
        >
          {/* Background Track Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-purple-950/80 z-0 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-400 to-rose-400 transition-all duration-500 ease-out"
              style={{
                width: `${(currentIndex / (PAGES.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Stepper Nodes */}
          <div className="relative z-10 flex items-center gap-1 lg:gap-2">
            {PAGES.map((page, idx) => {
              const isActive = page.id === currentPageId;
              const isCompleted = idx < currentIndex;

              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => onNavigate(page.id)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`group relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-pink-400 ${
                    isActive
                      ? 'bg-pink-500/20 text-pink-200 border border-pink-400/40 shadow-[0_0_16px_rgba(244,114,182,0.3)]'
                      : isCompleted
                      ? 'bg-[#181128] text-purple-300 hover:text-purple-100 border border-purple-500/30 hover:border-purple-400/50'
                      : 'bg-[#0f0b18] text-slate-500 hover:text-slate-300 border border-purple-950 hover:border-purple-800'
                  }`}
                >
                  {/* Node Icon / Indicator */}
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-pink-500 text-white shadow-[0_0_8px_rgba(236,72,153,0.8)] ring-2 ring-pink-400/30'
                        : isCompleted
                        ? 'bg-purple-900/60 text-emerald-400 border border-emerald-500/30'
                        : 'bg-purple-950/40 text-slate-600'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    ) : (
                      idx + 1
                    )}
                  </span>

                  {/* Label */}
                  <span
                    className={`transition-colors whitespace-nowrap ${
                      isActive
                        ? 'font-semibold text-pink-100'
                        : isCompleted
                        ? 'text-purple-300/80'
                        : 'text-slate-500'
                    }`}
                  >
                    {page.navLabel}
                  </span>

                  {/* Active Indicator Pulse Ring */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping absolute -top-0.5 -right-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Center-Right: Mobile Compact Animated Stepper (< md) */}
        <div className="md:hidden flex items-center gap-1.5 bg-[#120d20] px-2.5 py-1.5 rounded-xl border border-purple-500/20">
          <div className="flex items-center gap-1">
            {PAGES.map((page, idx) => {
              const isActive = page.id === currentPageId;
              const isCompleted = idx < currentIndex;

              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => onNavigate(page.id)}
                  aria-label={`Jump to ${page.navLabel}`}
                  className="p-1 focus:outline-none cursor-pointer"
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-5 bg-gradient-to-r from-pink-500 to-rose-400 shadow-[0_0_8px_rgba(244,114,182,0.6)]'
                        : isCompleted
                        ? 'w-2 bg-purple-500/60'
                        : 'w-2 bg-purple-950'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <span className="text-[10px] font-mono text-purple-300/60 px-1">|</span>
          <span className="text-xs font-mono font-medium text-pink-300 whitespace-nowrap">
            {currentPage.navLabel}
          </span>
        </div>

        {/* Right: Audio Toggle & Devtools Console Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Discreet Audio Toggle Button */}
          <button
            type="button"
            onClick={handleToggleAudio}
            aria-pressed={isAudioPlaying}
            aria-label={
              isAudioPlaying
                ? 'Mute ambient sound'
                : 'Enable soft ambient atmosphere'
            }
            title={
              isAudioPlaying
                ? 'Ambient sound: ON (Click to mute)'
                : 'Ambient sound: OFF (Click to play)'
            }
            className={`p-1.5 sm:px-2 sm:py-1 rounded-lg border transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-pink-400 flex items-center gap-1.5 text-xs font-mono cursor-pointer ${
              isAudioPlaying
                ? 'text-pink-300 bg-pink-500/15 border-pink-500/35 shadow-[0_0_12px_rgba(236,72,153,0.25)]'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border-transparent'
            }`}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400 animate-pulse" />
                <span className="hidden sm:inline text-[11px] text-pink-300/90 font-medium">
                  audio on
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-75" />
                <span className="hidden sm:inline text-[11px] opacity-60">
                  sound
                </span>
              </>
            )}
          </button>

          {/* Secret Easter Egg Trigger */}
          <button
            type="button"
            onClick={onOpenEasterEgg}
            title="Inspect developer debug console"
            aria-label="Developer Console easter egg"
            className="p-1.5 rounded-lg text-slate-500 hover:text-pink-300 hover:bg-pink-500/10 border border-transparent hover:border-pink-500/20 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-pink-400 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-75" />
          </button>
        </div>
      </div>

      {/* Ambient bottom progress beam */}
      <div className="w-full bg-purple-950/20 h-[1.5px] overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-400 to-rose-400 transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / PAGES.length) * 100}%` }}
        />
      </div>
    </header>
  );
};
