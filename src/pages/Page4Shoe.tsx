import React, { useState, useEffect } from 'react';
import { PrimaryButton, BackButton } from '../components/ActionButton';
import { PageLayout } from '../components/PageLayout';
import { AlertOctagon, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

/* 
 * ============================================================================
 * PAGE 4 — SHOE.EXE (Tomorrow's Scheduled Incident)
 * EDITABLE CONTENT:
 * Shoe warning details, auto-defensive protocol logs, and advice.
 * Note: Playful inside joke. Absolutely no pressure, no mercy buttons.
 * ============================================================================
 */

interface Page4ShoeProps {
  onNext: () => void;
  onBack: () => void;
}

const DEFENSE_STEPS = [
  '👟 Threat acknowledged.',
  'Defensive protocol activated.',
  'Step 1: Apologize sincerely.',
  "Step 2: Don't be annoying tomorrow.",
  'Step 3: Accept consequences.',
];

export const Page4Shoe: React.FC<Page4ShoeProps> = ({ onNext, onBack }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isProtocolComplete, setIsProtocolComplete] = useState<boolean>(false);
  const [shoeWobble, setShoeWobble] = useState<boolean>(false);

  // Automatically run defensive protocol sequence without requiring clicks
  useEffect(() => {
    if (currentStepIndex < DEFENSE_STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 550);
      return () => clearTimeout(timer);
    } else {
      const doneTimer = setTimeout(() => {
        setIsProtocolComplete(true);
      }, 400);
      return () => clearTimeout(doneTimer);
    }
  }, [currentStepIndex]);

  const triggerShoeAnimation = () => {
    sfx.playWhooshSound();
    setShoeWobble(true);
    setTimeout(() => setShoeWobble(false), 800);
  };

  return (
    <PageLayout maxWidth="5xl" className="space-y-8">
      {/* Page Title & Warning Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
          <AlertOctagon className="w-4 h-4 text-amber-400" />
          <span>RADAR DETECTION · PHYSICAL CONSEQUENCE SUBSYSTEM</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-mono tracking-tight text-white flex items-center gap-2.5">
          <span>⚠️ TOMORROW'S SCHEDULED INCIDENT</span>
        </h2>
        <p className="text-sm font-mono text-slate-400">
          Disciplinary projectile forecast based on recent verbal miscalculations.
        </p>
      </div>

      {/* Desktop 2-Column Split: Radar Threat Grid (Left 7) & Defense Protocol Terminal (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Playful Warning Grid Container */}
        <div className="lg:col-span-7 glass-panel rounded-2xl border border-amber-500/25 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Threat Header */}
          <div className="px-5 py-3.5 bg-amber-950/30 border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-200">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span className="font-semibold tracking-wide">TARGETING SENSOR ACTIVE</span>
            </div>

            <span className="text-[11px] font-mono text-amber-300/80 bg-amber-900/40 px-2 py-0.5 rounded border border-amber-500/30">
              Priority: School Hours
            </span>
          </div>

          {/* Threat Parameters */}
          <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
            {/* Incoming object with interactive shoe hover/click */}
            <div
              onClick={triggerShoeAnimation}
              className="p-4 rounded-xl bg-[#140e21] border border-purple-500/20 flex items-center justify-between cursor-pointer group hover:border-pink-500/40 transition-all select-none"
              title="Click or hover to inspect incoming shoe"
            >
              <div>
                <div className="text-slate-400 text-xs">Incoming object:</div>
                <div className="text-lg font-bold text-white mt-0.5">
                  👟 Shoe
                </div>
              </div>
              <div
                className={`text-3xl transition-transform duration-300 ${
                  shoeWobble ? 'animate-bounce rotate-12 scale-125' : 'group-hover:-rotate-12 group-hover:scale-110'
                }`}
              >
                👟
              </div>
            </div>

            {/* Target */}
            <div className="p-4 rounded-xl bg-[#140e21] border border-purple-500/20 flex flex-col justify-center">
              <div className="text-slate-400 text-xs">Target:</div>
              <div className="text-lg font-bold text-pink-300 mt-0.5">
                Face.exe
              </div>
            </div>

            {/* Scheduled Time */}
            <div className="p-4 rounded-xl bg-[#140e21] border border-purple-500/20 flex flex-col justify-center">
              <div className="text-slate-400 text-xs">Scheduled:</div>
              <div className="text-base font-bold text-purple-200 mt-0.5">
                Tomorrow at school
              </div>
            </div>

            {/* Threat Level */}
            <div className="p-4 rounded-xl bg-[#140e21] border border-purple-500/20 flex flex-col justify-center">
              <div className="text-slate-400 text-xs">Threat level:</div>
              <div className="text-base font-bold text-amber-300 mt-0.5">
                Concerningly playful
              </div>
            </div>
          </div>

          {/* Recommended Response */}
          <div className="px-5 sm:px-6 pb-6 pt-2 font-mono">
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
              <div className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
                Recommended response:
              </div>
              <div className="text-xs sm:text-sm text-slate-200 space-y-1 pl-1">
                <div>• Apologize sincerely.</div>
                <div>• Don't be annoying tomorrow.</div>
                <div>• Accept consequences.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Automatic Defensive Protocol Terminal Sequence (Span 5 on lg) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-purple-500/20 space-y-3 font-mono text-xs sm:text-sm bg-[#0d0918]">
          <div className="flex items-center gap-2 text-xs text-purple-300 border-b border-purple-500/15 pb-2.5">
            <Terminal className="w-3.5 h-3.5 text-pink-400" />
            <span>auto_defensive_mitigation.sh</span>
          </div>

          <div className="space-y-1.5 min-h-[140px]">
            {DEFENSE_STEPS.slice(0, currentStepIndex).map((step, idx) => (
              <div key={`defense-step-${idx}`} className="flex items-start gap-2 text-purple-200 animate-fade-in">
                <span className="text-pink-400">&gt;</span>
                <span>{step}</span>
              </div>
            ))}

            {isProtocolComplete && (
              <div className="pt-3 mt-2 border-t border-purple-500/20 flex items-center gap-2 text-emerald-300 font-semibold animate-fade-in">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Survival chances improved slightly.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-purple-500/10">
        <BackButton onClick={onBack} label="BACK TO APOLOGY" />
        <PrimaryButton onClick={onNext} className="w-full sm:w-auto">
          NEXT →
        </PrimaryButton>
      </div>
    </PageLayout>
  );
};
