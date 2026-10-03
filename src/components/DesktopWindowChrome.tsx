import React, { useState, useEffect } from 'react';
import { PageId, PAGES } from '../types';
import { 
  Lock, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Terminal, 
  Keyboard, 
  Sparkles,
  Command
} from 'lucide-react';

interface DesktopWindowChromeProps {
  currentPageId: PageId;
  onNavigate: (pageId: PageId) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenConsole: () => void;
}

export const DesktopWindowChrome: React.FC<DesktopWindowChromeProps> = ({
  currentPageId,
  onNavigate,
  isAudioPlaying,
  onToggleAudio,
  onOpenConsole,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHotkeyTooltip, setShowHotkeyTooltip] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const activeIndex = PAGES.findIndex((p) => p.id === currentPageId);

  return (
    <div className="hidden lg:block w-full bg-[#0a0712] border-b border-purple-500/20 text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Left: Window Traffic Lights & App ID */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => alert("Closing is disabled: Gagan's apology requires complete review! ❤️")}
              className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400 hover:scale-110 transition-all cursor-pointer shadow-sm"
              title="Close (Disabled: Apology required)"
              aria-label="Close window"
            />
            <button
              type="button"
              onClick={() => alert("Apology cannot be minimized. Full focus required.")}
              className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 hover:scale-110 transition-all cursor-pointer shadow-sm"
              title="Minimize"
              aria-label="Minimize window"
            />
            <button
              type="button"
              onClick={toggleFullscreen}
              className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 hover:scale-110 transition-all cursor-pointer shadow-sm"
              title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
              aria-label="Toggle fullscreen"
            />
          </div>

          <div className="h-3 w-px bg-purple-500/20" />

          <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">apology.exe</span>
            <span className="text-purple-400/60 font-normal">· x86_64 Desktop Workstation</span>
          </span>
        </div>

        {/* Center: Desktop URL & Sincere Protocol Address Bar */}
        <div className="flex-1 max-w-lg mx-auto">
          <div className="flex items-center justify-between px-3 py-1 rounded-lg bg-[#120c1f]/90 border border-purple-500/25 shadow-inner text-[11px] text-slate-300">
            <div className="flex items-center gap-2 truncate">
              <Lock className="w-3 h-3 text-pink-400 shrink-0" />
              <span className="text-purple-400/70 select-none">https://</span>
              <span className="text-pink-200 font-medium truncate">
                apology.gagan.dev/to/lithi#{currentPageId}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyUrl}
              className="ml-2 px-1.5 py-0.5 rounded text-[10px] text-slate-400 hover:text-pink-300 hover:bg-purple-950/40 transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy session URL"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-2.5 h-2.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Computer Browser Hotkey Navigation Cheatsheet */}
        <div className="flex items-center gap-2">
          {/* Quick Hotkey Indicator Badges */}
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-purple-950/30 border border-purple-500/20 rounded-md px-2 py-0.5">
            <Keyboard className="w-3 h-3 text-purple-400" />
            <span className="text-slate-300 font-medium">Desktop Hotkeys:</span>
            <span className="px-1 py-0.2 rounded bg-purple-900/60 text-pink-200 border border-purple-500/30">
              [←/→]
            </span>
            <span className="px-1 py-0.2 rounded bg-purple-900/60 text-pink-200 border border-purple-500/30">
              [Space]
            </span>
            <span className="px-1 py-0.2 rounded bg-purple-900/60 text-purple-300 border border-purple-500/30">
              [1-5]
            </span>
            <span className="px-1 py-0.2 rounded bg-purple-900/60 text-purple-300 border border-purple-500/30">
              [M]
            </span>
          </div>

          {/* Fullscreen Quick Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1 rounded hover:bg-purple-900/40 text-slate-400 hover:text-purple-200 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
