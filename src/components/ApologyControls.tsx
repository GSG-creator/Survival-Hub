import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Sparkles, AlertCircle, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PulsingHeart } from './PulsingHeart';
import { sfx } from '../utils/soundEffects';

/* 
 * ============================================================================
 * APOLOGY CONTROLS (Accept vs. Evasive Reject Easter Egg)
 * 
 * Sincere Accept button triggers celebratory confetti & audio.
 * Playful Reject button evades the pointer/touch with spring animation
 * and stages through funny responses.
 * ============================================================================
 */

interface ApologyControlsProps {
  onBackToPrevious: () => void;
}

const REJECT_LABELS = [
  '❌ REJECT APOLOGY',
  '❌ YOU SURE?',
  '❌ REALLY?',
  '❌ GAGAN WILL REMEMBER THIS',
  '❌ NICE TRY 😂',
];

export const ApologyControls: React.FC<ApologyControlsProps> = ({
  onBackToPrevious,
}) => {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);

  // Offset & rotation for the evasive reject button
  const [pos, setPos] = useState<{ x: number; y: number; rotate: number }>({
    x: 0,
    y: 0,
    rotate: 0,
  });

  const rejectBtnRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastDodgeTime = useRef<number>(0);

  // Check user preference for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Dodge function
  const triggerDodge = useCallback(
    (pointerX?: number, pointerY?: number) => {
      if (prefersReducedMotion || isAccepted || isRejected) return;

      const now = Date.now();
      // Throttle dodges so it doesn't spasm uncontrollably
      if (now - lastDodgeTime.current < 160) return;
      lastDodgeTime.current = now;

      setAttemptCount((prev) => prev + 1);

      const btn = rejectBtnRef.current;
      if (!btn) return;

      const btnRect = btn.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      // Determine jump vector away from pointer if available
      let angle: number;
      if (pointerX !== undefined && pointerY !== undefined) {
        const dx = btnCenterX - pointerX;
        const dy = btnCenterY - pointerY;
        // Base angle away from pointer + slight random deviation
        angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.1;
      } else {
        angle = Math.random() * Math.PI * 2;
      }

      const distance = 90 + Math.random() * 60; // 90px - 150px jump
      let deltaX = Math.cos(angle) * distance;
      let deltaY = Math.sin(angle) * distance;

      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 640;

      // Safe boundaries for translation
      const maxX = isMobile ? Math.min(100, (screenWidth - 260) / 2) : 170;
      const minX = -maxX;
      const maxY = isMobile ? 65 : 75;
      const minY = -maxY;

      let newX = pos.x + deltaX;
      let newY = pos.y + deltaY;

      // Bounce back if going out of bounds
      if (newX > maxX || newX < minX) {
        newX = -pos.x * 0.75 + (Math.random() - 0.5) * 40;
      }
      if (newY > maxY || newY < minY) {
        newY = -pos.y * 0.75 + (Math.random() - 0.5) * 30;
      }

      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      const newRotate = (Math.random() - 0.5) * 24;

      setPos({ x: newX, y: newY, rotate: newRotate });
    },
    [pos, prefersReducedMotion, isAccepted, isRejected]
  );

  // Trigger celebration confetti
  const fireCelebrationConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#ec4899', '#f472b6', '#a855f7', '#fb7185', '#ffffff'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#f43f5e', '#ec4899', '#c084fc'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#f43f5e', '#ec4899', '#c084fc'],
        });
      }, 250);
    } catch {
      // Ignore if canvas unsupported
    }
  }, []);

  const handleAcceptApology = () => {
    setIsAccepted(true);
    sfx.playCelebrationSound();
    fireCelebrationConfetti();
  };

  // Pointer movement listener for hover proximity dodging on desktop
  useEffect(() => {
    if (prefersReducedMotion || isAccepted || isRejected) return;

    const handlePointerMove = (e: PointerEvent) => {
      const btn = rejectBtnRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      // If pointer comes closer than 80px, dodge away!
      if (dist < 80) {
        triggerDodge(e.clientX, e.clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [triggerDodge, prefersReducedMotion, isAccepted, isRejected]);

  // Current label for reject button
  const currentRejectLabel =
    REJECT_LABELS[Math.min(attemptCount, REJECT_LABELS.length - 1)];

  // Case 1: Successfully accepted (Heartwarming celebratory state)
  if (isAccepted) {
    return (
      <div className="w-full max-w-lg mx-auto pt-2 space-y-4 animate-fade-in">
        <div className="glass-panel-warm p-6 sm:p-8 rounded-3xl border border-pink-500/40 space-y-5 text-center shadow-[0_0_50px_rgba(236,72,153,0.3)] relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Badge & Title */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-xs font-mono text-pink-300">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>STATUS: APOLOGY ACCEPTED</span>
              <PulsingHeart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/60" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-white pt-2">
              Thank you, Lithi ❤️
            </h3>
            <p className="text-sm font-sans text-pink-200/90">
              Gagan.exe has been granted full forgiveness and survival rights.
            </p>
          </div>

          {/* Official Peace Treaty Terms */}
          <div className="p-4 rounded-2xl bg-[#140c1f]/80 border border-purple-500/20 text-left font-mono text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>OFFICIAL PEACE TREATY RATIFIED:</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 pl-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                <span>Zero random teasing when you're already irritated.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                <span>Active listening &amp; situational awareness before jokes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                <span>Tomorrow at school: Safe treaty in effect (no flying shoes).</span>
              </li>
            </ul>
          </div>

          {/* Interactive Extra Confetti / Reset Controls */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                sfx.playCelebrationSound();
                fireCelebrationConfetti();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 shadow-[0_0_18px_rgba(236,72,153,0.35)] transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              <span>Send Extra Love &amp; Confetti 💖</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsAccepted(false);
                setPos({ x: 0, y: 0, rotate: 0 });
                setAttemptCount(0);
              }}
              className="text-[11px] font-mono text-purple-400 hover:text-pink-300 transition-colors inline-flex items-center gap-1 cursor-pointer py-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Replay buttons</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Reject successfully clicked (Easter Egg Catch Case)
  if (isRejected) {
    return (
      <div className="w-full max-w-md mx-auto pt-4 space-y-4 animate-fade-in">
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 space-y-3 text-center bg-[#130b18] shadow-[0_0_35px_rgba(244,63,94,0.2)]">
          <div className="flex items-center justify-center gap-2 text-rose-400 font-mono text-sm uppercase tracking-wider font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>ERROR 404: REJECTION OVERRIDE</span>
          </div>

          <div className="text-base sm:text-lg font-mono text-white font-bold">
            You actually caught the button!
          </div>

          <div className="text-sm font-sans text-slate-300 italic pt-1">
            "Fair enough... Gagan deserved that click 😂 But he's still really sorry!"
          </div>

          <div className="pt-4 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsRejected(false);
                setPos({ x: 0, y: 0, rotate: 0 });
                setAttemptCount(0);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm text-slate-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 transition-colors cursor-pointer"
            >
              ← TRY AGAIN (BE NICE)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal state: Both buttons visible
  return (
    <div
      ref={containerRef}
      className="w-full max-w-xl mx-auto pt-4 relative select-none"
    >
      <div className="min-h-[140px] sm:min-h-[110px] flex flex-col sm:flex-row items-center justify-center gap-4 relative py-2">
        {/* Primary ACCEPT button (Stationary) */}
        <button
          type="button"
          onClick={handleAcceptApology}
          className="group relative z-20 inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-2xl text-sm sm:text-base font-sans font-medium text-pink-100 bg-pink-950/40 hover:bg-pink-900/60 border border-pink-500/40 hover:border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:shadow-[0_0_28px_rgba(236,72,153,0.35)] transition-all duration-200 cursor-pointer active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
        >
          <PulsingHeart className="w-4 h-4 text-pink-400 fill-pink-400/40 transition-transform group-hover:scale-110" />
          <span>🫶 ACCEPT APOLOGY</span>
        </button>

        {/* Secondary REJECT button (Playfully Evasive) */}
        <div className="relative z-10">
          <button
            ref={rejectBtnRef}
            type="button"
            onClick={() => setIsRejected(true)}
            onTouchStart={() => triggerDodge()}
            onPointerDown={() => {
              // If on touch or quick click, 85% chance it dodges away, but can be caught
              if (Math.random() > 0.15) {
                triggerDodge();
              }
            }}
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${pos.rotate}deg)`,
              transition: prefersReducedMotion
                ? 'none'
                : 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="inline-flex items-center justify-center px-5 py-3 min-h-[48px] rounded-2xl text-xs sm:text-sm font-mono text-slate-300 hover:text-white bg-[#181122]/90 hover:bg-[#201530] border border-purple-500/25 hover:border-rose-500/40 shadow-sm cursor-pointer whitespace-nowrap active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50"
            aria-label="Reject apology (Easter egg)"
          >
            {currentRejectLabel}
          </button>
        </div>
      </div>

      {attemptCount > 0 && (
        <div className="text-[11px] font-mono text-purple-400/70 text-center animate-fade-in pt-1">
          {attemptCount < 4
            ? `(Evasion attempts logged: ${attemptCount})`
            : "(Good luck catching that button 😂)"}
        </div>
      )}
    </div>
  );
};
