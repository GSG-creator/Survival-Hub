import React, { useState, useEffect } from 'react';
import { PrimaryButton } from '../components/ActionButton';
import { PageLayout } from '../components/PageLayout';
import { Terminal, AlertTriangle, Cpu, CheckCircle2 } from 'lucide-react';
import { FloatingLoadingTerminal } from '../components/FloatingLoadingTerminal';

/* 
 * ============================================================================
 * PAGE 1 — BOOT
 * EDITABLE CONTENT:
 * You can adjust the boot terminal messages, user names, or status text below.
 * ============================================================================
 */

interface Page1BootProps {
  onNext: () => void;
}

const BOOT_LOGS = [
  'Initializing...',
  'Loading incident report...',
  'Detecting questionable decisions...',
  'Checking situational awareness...',
  'Reviewing recent events...',
  'Result: FAILED',
  'Regret module: ACTIVE',
];

export const Page1Boot: React.FC<Page1BootProps> = ({ onNext }) => {
  const [visibleLogCount, setVisibleLogCount] = useState<number>(0);
  const [isBootComplete, setIsBootComplete] = useState<boolean>(false);

  useEffect(() => {
    if (visibleLogCount < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setVisibleLogCount((prev) => prev + 1);
      }, 340);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        setIsBootComplete(true);
      }, 400);
      return () => clearTimeout(completeTimer);
    }
  }, [visibleLogCount]);

  const handleSkipAnimation = () => {
    setVisibleLogCount(BOOT_LOGS.length);
    setIsBootComplete(true);
  };

  return (
    <PageLayout maxWidth="3xl" className="items-center justify-center">
      {/* Top Header Card */}
      <div className="text-center mb-8 sm:mb-10 space-y-3">
        {/* Subtle pill-free status kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-pink-300/90 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
          <span>Personal Project · From Gagan to Lithi</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-rose-200 drop-shadow-[0_0_24px_rgba(244,114,182,0.3)]">
          APOLOGY.EXE
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base font-mono text-purple-200/70 max-w-xl mx-auto px-2 leading-relaxed">
          "An extremely unnecessary amount of code for a very necessary apology."
        </p>
      </div>

      {/* Developer Terminal Box */}
      <div className="w-full glass-panel rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-purple-500/20 overflow-hidden mb-8">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#110d1c]/90 border-b border-purple-500/15">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="font-mono text-xs text-purple-300/80 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-pink-400" />
              boot_sequence.sh
            </span>
          </div>

          {!isBootComplete && (
            <button
              type="button"
              onClick={handleSkipAnimation}
              className="text-[11px] font-mono text-slate-400 hover:text-pink-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Skip boot sequence
            </button>
          )}
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-2 min-h-[220px] bg-[#0c0916]/80">
          {BOOT_LOGS.slice(0, visibleLogCount).map((log, index) => {
            const isFailed = log.includes('FAILED');
            const isActive = log.includes('ACTIVE');

            return (
              <div
                key={`boot-log-${index}`}
                className="flex items-start gap-2 leading-relaxed transition-opacity duration-200"
              >
                <span className="text-purple-400 select-none">&gt;</span>
                <span
                  className={
                    isFailed
                      ? 'text-rose-400 font-semibold'
                      : isActive
                      ? 'text-amber-300 font-semibold'
                      : 'text-purple-100/90'
                  }
                >
                  {log}
                </span>
                {index === visibleLogCount - 1 && !isBootComplete && (
                  <span className="w-2 h-4 bg-pink-400 animate-pulse inline-block ml-1" />
                )}
              </div>
            );
          })}

          {/* System info block once sequence finishes */}
          {isBootComplete && (
            <div className="mt-5 pt-4 border-t border-purple-500/20 space-y-2.5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-300">
                <span className="text-purple-400 font-medium">User:</span>
                <span className="text-purple-100">Gagan</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-300">
                <span className="text-pink-400 font-medium">Target user:</span>
                <span className="text-pink-200 font-semibold">Lithi</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-300 pt-1">
                <span className="text-amber-400 font-medium flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  System status:
                </span>
                <span className="text-amber-200 font-medium">
                  Needs to apologize immediately
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Humorous Warning & Primary Action Button */}
      <div className="w-full flex flex-col items-center space-y-4">
        {/* Warning text */}
        <div className="flex items-center gap-2 text-xs font-mono text-amber-300/80 bg-amber-950/20 px-3 py-1.5 rounded-lg border border-amber-500/20 text-center">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Warning: excessive sincerity detected.</span>
        </div>

        {/* Button */}
        <div className="pt-2">
          <PrimaryButton onClick={onNext} className="w-full sm:w-auto px-8">
            START →
          </PrimaryButton>
        </div>
      </div>

      {/* Floating Resizable Component Initialization Terminal */}
      <FloatingLoadingTerminal />
    </PageLayout>
  );
};
