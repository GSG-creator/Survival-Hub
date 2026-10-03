import React, { useState, useEffect } from 'react';
import { BackButton } from '../components/ActionButton';
import { PageLayout } from '../components/PageLayout';
import { ApologyControls } from '../components/ApologyControls';
import { HeartParticles } from '../components/HeartParticles';
import { PulsingHeart } from '../components/PulsingHeart';
import { CheckCircle2 } from 'lucide-react';

/* 
 * ============================================================================
 * PAGE 5 — FINAL MESSAGE
 * EDITABLE CONTENT:
 * Final sincere words from Gagan to Lithi.
 * Note: Wording below is the exact text requested.
 * Followed by the playful Accept vs. Evasive Reject Easter Egg buttons.
 * Enhanced with subtle, slow-moving floating heart particles in the background.
 * ============================================================================
 */

interface Page5FinalProps {
  onBack: () => void;
}

const BUILD_STEPS = [
  'Checking sincerity...',
  'Removing excuses...',
  'Installing better judgement...',
  'Compiling...',
  'Build successful ✅',
];

export const Page5Final: React.FC<Page5FinalProps> = ({ onBack }) => {
  const [buildStepIndex, setBuildStepIndex] = useState<number>(0);
  const [isBuildFinished, setIsBuildFinished] = useState<boolean>(false);

  // Play automatic compilation sequence immediately upon loading page 5
  useEffect(() => {
    if (buildStepIndex < BUILD_STEPS.length) {
      const timer = setTimeout(() => {
        setBuildStepIndex((prev) => prev + 1);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        setIsBuildFinished(true);
      }, 300);
      return () => clearTimeout(finishTimer);
    }
  }, [buildStepIndex]);

  return (
    <PageLayout maxWidth="2xl" className="items-center text-center space-y-10 sm:py-14">
      {/* Subtle Slow-Moving Romantic Heart Particles */}
      <HeartParticles />

      {/* Soft central ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

      {/* Automatic Compilation Sequence Banner (Quiet & Subtle) */}
      <div className="w-full max-w-lg glass-panel p-3.5 sm:p-4 rounded-xl border border-purple-500/20 font-mono text-xs text-left relative z-10">
        <div className="flex items-center justify-between text-purple-300 text-[11px] border-b border-purple-500/15 pb-2 mb-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            compiler.final_pass.sh
          </span>
          <span className="text-slate-500">v1.0.0-final</span>
        </div>

        <div className="space-y-1">
          {BUILD_STEPS.slice(0, buildStepIndex).map((step, idx) => (
            <div
              key={`final-build-step-${idx}`}
              className={`flex items-center gap-2 ${
                step.includes('✅')
                  ? 'text-emerald-300 font-semibold'
                  : 'text-purple-200/80'
              }`}
            >
              <span className="text-pink-400">&gt;</span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        {isBuildFinished && (
          <div className="pt-2.5 mt-2 border-t border-purple-500/15 flex items-center justify-between text-pink-300 font-semibold animate-fade-in">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
              Apology compiled with 0 excuses.
            </span>
            <span className="text-purple-300/70 font-normal">— Gagan</span>
          </div>
        )}
      </div>

      {/* Sincere Centerpiece Letter */}
      <div className="space-y-6 max-w-xl relative z-10">
        <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-white font-normal">
          One last thing.
        </h2>

        {/* Exact message text verbatim */}
        <div className="font-sans text-base sm:text-lg text-slate-200/90 leading-relaxed space-y-4">
          <p>
            I know making a website doesn't magically fix being annoying.
          </p>
          <p>
            I made this because I'm a programmer, and apparently when I don't know how to apologize normally, I turn my feelings into a software project.
          </p>
          <p className="font-medium text-pink-100">
            But behind all the code and jokes, I really am sorry, Lithi.
          </p>
          <p>
            I'll try to do better.
          </p>
        </div>

        <div className="pt-2 font-mono text-sm sm:text-base text-pink-300 font-semibold inline-flex items-center justify-center gap-2">
          <span>— Gagan</span>
          <PulsingHeart className="w-4 h-4 text-pink-400 fill-pink-400/50" />
        </div>
      </div>

      {/* Final Apology Controls: Stationary Accept vs. Evasive Reject Easter Egg */}
      <div className="w-full relative z-10">
        <ApologyControls onBackToPrevious={onBack} />
      </div>

      {/* Navigation Controls: Back button to Page 4 */}
      <div className="w-full pt-8 flex items-center justify-center border-t border-purple-500/10 relative z-10">
        <BackButton onClick={onBack} label="BACK TO SHOE.EXE" />
      </div>
    </PageLayout>
  );
};
