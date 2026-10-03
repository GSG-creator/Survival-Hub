import React, { useState, useEffect } from 'react';
import { PageId, PAGES } from '../types';
import { 
  GitBranch, 
  CheckCircle, 
  Monitor, 
  Volume2, 
  VolumeX, 
  Terminal, 
  Heart,
  Cpu
} from 'lucide-react';

interface DesktopStatusBarProps {
  currentPageId: PageId;
  onNavigate: (pageId: PageId) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenConsole: () => void;
}

export const DesktopStatusBar: React.FC<DesktopStatusBarProps> = ({
  currentPageId,
  onNavigate,
  isAudioPlaying,
  onToggleAudio,
  onOpenConsole,
}) => {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeIndex = PAGES.findIndex((p) => p.id === currentPageId);
  const activePage = PAGES[activeIndex] || PAGES[0];

  return (
    <div className="hidden lg:flex sticky bottom-0 z-40 w-full h-7 bg-[#06040a] border-t border-purple-500/20 text-[11px] font-mono text-slate-400 select-none items-center justify-between px-3 shadow-lg">
      {/* Left: Git & Process Health */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-purple-300 font-medium">
          <GitBranch className="w-3 h-3 text-pink-400" />
          <span>main</span>
        </div>

        <span className="text-purple-500/30">|</span>

        <div className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle className="w-3 h-3" />
          <span>0 errors, 0 excuses</span>
        </div>

        <span className="text-purple-500/30">|</span>

        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
          <span>apology.exe: RUNNING</span>
        </div>
      </div>

      {/* Center: Stage Navigator & Sincerity Gauge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-pink-200">
          <Heart className="w-3 h-3 text-pink-400 fill-pink-400/40" />
          <span>Sincerity: 100.0%</span>
        </div>

        <span className="text-purple-500/30">·</span>

        <div className="flex items-center gap-1.5">
          <span className="text-purple-300">Stage {activeIndex + 1}/5:</span>
          <span className="text-slate-200 font-medium">{activePage.navLabel}</span>
        </div>

        {/* Quick jump dots */}
        <div className="flex items-center gap-1 ml-1">
          {PAGES.map((page, idx) => (
            <button
              key={page.id}
              type="button"
              onClick={() => onNavigate(page.id)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                page.id === currentPageId
                  ? 'bg-pink-400 scale-125 shadow-[0_0_6px_rgba(244,114,182,0.8)]'
                  : idx < activeIndex
                  ? 'bg-purple-500/50 hover:bg-purple-400'
                  : 'bg-purple-950 hover:bg-purple-700'
              }`}
              title={`Jump to Page ${idx + 1}: ${page.title}`}
            />
          ))}
        </div>
      </div>

      {/* Right: Viewport metrics, audio toggle & devtools button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleAudio}
          className="flex items-center gap-1 text-slate-400 hover:text-pink-300 transition-colors cursor-pointer"
          title="Toggle Ambient Audio (Press M)"
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-3 h-3 text-pink-400 animate-pulse" />
              <span className="text-pink-200">Audio: On (M)</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3 h-3 text-slate-500" />
              <span>Audio: Muted (M)</span>
            </>
          )}
        </button>

        <span className="text-purple-500/30">|</span>

        <button
          type="button"
          onClick={onOpenConsole}
          className="flex items-center gap-1 text-slate-400 hover:text-pink-300 transition-colors cursor-pointer"
          title="Open Developer Console (Press ~ or Cmd+K)"
        >
          <Terminal className="w-3 h-3 text-purple-400" />
          <span>Console (K)</span>
        </button>

        <span className="text-purple-500/30">|</span>

        <div className="flex items-center gap-1 text-slate-400" title="Current Browser Viewport Dimensions">
          <Monitor className="w-3 h-3 text-purple-400" />
          <span>{viewportSize.width}×{viewportSize.height}</span>
        </div>

        <span className="text-purple-500/30">|</span>

        <span className="text-slate-400">UTF-8</span>
      </div>
    </div>
  );
};
