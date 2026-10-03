import React, { useState, useEffect, useCallback } from 'react';
import { PageId, PAGES } from './types';
import { Navigation } from './components/Navigation';
import { StarField } from './components/StarField';
import { AudioPlayer } from './components/AudioPlayer';
import { ConsoleEasterEgg } from './components/ConsoleEasterEgg';
import { DesktopWindowChrome } from './components/DesktopWindowChrome';
import { DesktopStatusBar } from './components/DesktopStatusBar';
import { useDesktopShortcuts } from './hooks/useDesktopShortcuts';
import { Page1Boot } from './pages/Page1Boot';
import { Page2WhatIDid } from './pages/Page2WhatIDid';
import { Page3Apology } from './pages/Page3Apology';
import { Page4Shoe } from './pages/Page4Shoe';
import { Page5Final } from './pages/Page5Final';
import { Code2 } from 'lucide-react';
import { PulsingHeart } from './components/PulsingHeart';
import { ambientPlayer } from './utils/ambientAudio';
import { sfx } from './utils/soundEffects';
import { initBackgroundConsoleLogs } from './utils/backgroundConsoleLogs';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  // Sync page state with browser URL hash for friendly reloading & history navigation
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const exists = PAGES.some((p) => p.id === hash);
    return exists ? hash : 'boot';
  };

  const [currentPageId, setCurrentPageId] = useState<PageId>(getInitialPage);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const toggleAudio = useCallback(async () => {
    if (isAudioPlaying) {
      ambientPlayer.stop();
      setIsAudioPlaying(false);
    } else {
      const started = await ambientPlayer.start();
      if (started) {
        setIsAudioPlaying(true);
      }
    }
  }, [isAudioPlaying]);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (PAGES.some((p) => p.id === hash)) {
        setCurrentPageId(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = useCallback((targetPageId: PageId) => {
    setCurrentPageId(targetPageId);
    window.location.hash = targetPageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentIndex = PAGES.findIndex((p) => p.id === currentPageId);

  const goNext = useCallback(() => {
    if (currentIndex < PAGES.length - 1) {
      navigateToPage(PAGES[currentIndex + 1].id);
    }
  }, [currentIndex, navigateToPage]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      navigateToPage(PAGES[currentIndex - 1].id);
    }
  }, [currentIndex, navigateToPage]);

  // Computer Browser Keyboard & Hotkey Navigation
  useDesktopShortcuts({
    currentPageId,
    onNavigate: navigateToPage,
    onToggleAudio: toggleAudio,
    onToggleConsole: () => setIsEasterEggOpen((prev) => !prev),
    isConsoleOpen: isEasterEggOpen,
  });

  // Pleasant click sound whenever any button is clicked across the website
  useEffect(() => {
    const handleGlobalButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('button, [role="button"], a[href]')) {
        sfx.playClickSound();
      }
    };

    window.addEventListener('click', handleGlobalButtonClick, { capture: true, passive: true });
    return () => window.removeEventListener('click', handleGlobalButtonClick, { capture: true });
  }, []);

  // Subtle, very soft low-frequency 'blip' on button hover interactions
  useEffect(() => {
    let lastHoveredButton: Element | null = null;

    const handleGlobalButtonHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('button, [role="button"]');
      if (target) {
        if (target !== lastHoveredButton) {
          lastHoveredButton = target;
          sfx.playHoverSound();
        }
      } else {
        lastHoveredButton = null;
      }
    };

    window.addEventListener('mouseover', handleGlobalButtonHover, { passive: true });
    return () => window.removeEventListener('mouseover', handleGlobalButtonHover);
  }, []);

  // Hidden array of Apology.exe themed console messages triggering every 30 seconds
  useEffect(() => {
    const cleanup = initBackgroundConsoleLogs();
    return () => cleanup();
  }, []);

  return (
    <div className="min-h-screen bg-[#08060d] text-slate-100 flex flex-col relative selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background Atmosphere */}
      <StarField />

      {/* Desktop Browser Workstation Window Bar (Specialized for Computer Browser View) */}
      <DesktopWindowChrome
        currentPageId={currentPageId}
        onNavigate={navigateToPage}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
        onOpenConsole={() => setIsEasterEggOpen(true)}
      />

      {/* Top Header Navigation */}
      <Navigation
        currentPageId={currentPageId}
        onNavigate={navigateToPage}
        onOpenEasterEgg={() => setIsEasterEggOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
      />

      {/* Main Content Area with Animated Page Transition & Midnight Terminal Framing */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-5 relative z-10 flex flex-col justify-between items-center min-h-[calc(100vh-8.5rem)] lg:min-h-[calc(100vh-7rem)]">
        {/* Subtle Ambient Midnight Terminal Header Guideline for Desktop */}
        <div className="hidden xl:flex items-center justify-between w-full text-[10px] font-mono text-purple-400/20 pointer-events-none select-none px-2 mb-1">
          <span className="flex items-center gap-1.5">
            <span className="text-purple-400/40">┌</span>
            <span>SYS:APOLOGY_WORKSPACE</span>
          </span>
          <span className="h-px bg-purple-500/10 flex-1 mx-4" />
          <span className="flex items-center gap-1.5">
            <span>TERMINAL_VIEWPORT</span>
            <span className="text-purple-400/40">┐</span>
          </span>
        </div>

        {/* Dynamic Animated Content Container */}
        <div className="w-full flex-1 flex flex-col justify-center items-center my-auto">
          <AnimatePresence mode="wait">
            {currentPageId === 'boot' && <Page1Boot key="boot" onNext={goNext} />}
            {currentPageId === 'incident' && (
              <Page2WhatIDid key="incident" onNext={goNext} onBack={goBack} />
            )}
            {currentPageId === 'apology' && (
              <Page3Apology key="apology" onNext={goNext} onBack={goBack} />
            )}
            {currentPageId === 'shoe' && (
              <Page4Shoe key="shoe" onNext={goNext} onBack={goBack} />
            )}
            {currentPageId === 'final' && (
              <Page5Final key="final" onBack={goBack} />
            )}
          </AnimatePresence>
        </div>

        {/* Subtle Ambient Midnight Terminal Footer Guideline for Desktop */}
        <div className="hidden xl:flex items-center justify-between w-full text-[10px] font-mono text-purple-400/20 pointer-events-none select-none px-2 mt-1">
          <span className="flex items-center gap-1.5">
            <span className="text-purple-400/40">└</span>
            <span>BUFFER:GAGAN_TO_LITHI</span>
          </span>
          <span className="h-px bg-purple-500/10 flex-1 mx-4" />
          <span className="flex items-center gap-1.5">
            <span>SINCERITY:MAX</span>
            <span className="text-purple-400/40">┘</span>
          </span>
        </div>
      </main>

      {/* Discreet Persistent AudioPlayer */}
      <AudioPlayer
        isPlaying={isAudioPlaying}
        onTogglePlay={toggleAudio}
        onAutoPlayStarted={() => setIsAudioPlaying(true)}
      />

      {/* Desktop Status Bar (VS Code / Unix Workstation footer for Computer Browsers) */}
      <DesktopStatusBar
        currentPageId={currentPageId}
        onNavigate={navigateToPage}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
        onOpenConsole={() => setIsEasterEggOpen(true)}
      />

      {/* Compact Mobile Footer (hidden on desktop computer browsers) */}
      <footer className="lg:hidden relative z-10 border-t border-purple-500/10 py-3 px-4 text-center font-mono text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <span>Gagan for Lithi with</span>
            <PulsingHeart className="w-3 h-3 text-pink-400 fill-pink-400/40" />
          </div>
          <button
            type="button"
            onClick={() => setIsEasterEggOpen(true)}
            className="text-[11px] text-slate-500 hover:text-pink-300 transition-colors flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer"
          >
            <Code2 className="w-3 h-3 text-pink-400/80" />
            <span>console.log</span>
          </button>
        </div>
      </footer>

      {/* Secret Developer Console Easter Egg Modal */}
      <ConsoleEasterEgg
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />
    </div>
  );
}
