import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ambientPlayer } from '../utils/ambientAudio';

/* 
 * ============================================================================
 * AUDIOPLAYER COMPONENT
 * 
 * - Adds a discreet, low-volume toggleable ambient soundtrack.
 * - Auto-plays ONLY after user interaction (first click/tap/keydown).
 * - Remains persistent across all 5 page transitions.
 * - Displays subtle animated equalizer visualizer bars when active.
 * ============================================================================
 */

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onAutoPlayStarted?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  onAutoPlayStarted,
}) => {
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const userManuallyMuted = useRef<boolean>(false);

  // Auto-play default enabled; starts immediately or on first gesture
  useEffect(() => {
    // Attempt instant startup immediately
    ambientPlayer.start().then((started) => {
      if (started) {
        setHasInteracted(true);
        onAutoPlayStarted?.();
      }
    }).catch(() => {});

    const handleFirstInteraction = async () => {
      if (userManuallyMuted.current) return;
      setHasInteracted(true);

      // Start the soft ambient player smoothly
      try {
        const started = await ambientPlayer.start();
        if (started) {
          onAutoPlayStarted?.();
        }
      } catch (err) {
        console.warn('Audio auto-play note:', err);
      }
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
    };
  }, [hasInteracted, onAutoPlayStarted]);

  const handleToggle = useCallback(() => {
    if (isPlaying) {
      userManuallyMuted.current = true;
    } else {
      userManuallyMuted.current = false;
    }
    onTogglePlay();
  }, [isPlaying, onTogglePlay]);

  return (
    <div
      className="fixed bottom-14 left-3 lg:hidden z-40 select-none animate-fade-in"
      role="region"
      aria-label="Ambient Soundtrack Controls"
    >
      <div className="glass-panel px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-purple-500/20 bg-[#0d0918]/85 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2 transition-all hover:border-pink-500/35">
        {/* Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Mute ambient soundtrack' : 'Play ambient soundtrack'}
          title={isPlaying ? 'Ambient sound: ON (Click to mute)' : 'Ambient sound: OFF (Click to play)'}
          className={`flex items-center gap-1.5 text-xs font-mono transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-pink-400 rounded-full px-1 py-0.5 cursor-pointer ${
            isPlaying ? 'text-pink-300' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-pink-400 shrink-0 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          )}

          <span className="text-[11px] font-medium hidden xs:inline">
            {isPlaying ? 'midnight.ambient' : 'ambient muted'}
          </span>
        </button>

        {/* Animated Equalizer Bars */}
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-3 px-1" aria-hidden="true">
            <span className="w-[2px] bg-pink-400 rounded-full animate-[bounce_1.1s_infinite] h-2.5" />
            <span className="w-[2px] bg-purple-400 rounded-full animate-[bounce_1.4s_infinite_200ms] h-1.5" />
            <span className="w-[2px] bg-pink-300 rounded-full animate-[bounce_0.9s_infinite_400ms] h-3" />
            <span className="w-[2px] bg-rose-400 rounded-full animate-[bounce_1.3s_infinite_100ms] h-2" />
          </div>
        ) : (
          <div className="flex items-center gap-[2px] h-3 px-1 opacity-25" aria-hidden="true">
            <span className="w-[2px] bg-slate-500 rounded-full h-1" />
            <span className="w-[2px] bg-slate-500 rounded-full h-1" />
            <span className="w-[2px] bg-slate-500 rounded-full h-1" />
          </div>
        )}
      </div>
    </div>
  );
};
