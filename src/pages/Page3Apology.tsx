import React from 'react';
import { PrimaryButton, BackButton } from '../components/ActionButton';
import { PageLayout } from '../components/PageLayout';
import { Heart, Plus, Minus, Wrench, GitCommit, Check } from 'lucide-react';

/* 
 * ============================================================================
 * PAGE 3 — APOLOGY (The Emotional Centerpiece)
 * EDITABLE CONTENT:
 * The sincere apology text, patch changes, and git commit history.
 * Note: The apology text below is the exact wording requested.
 * ============================================================================
 */

interface Page3ApologyProps {
  onNext: () => void;
  onBack: () => void;
}

export const Page3Apology: React.FC<Page3ApologyProps> = ({ onNext, onBack }) => {
  return (
    <PageLayout maxWidth="5xl" className="space-y-8 sm:py-8">
      {/* Desktop 2-Column Split: Sincere Letter (Left) & Patch Notes / Git Log (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Sincere Header & Message Container (Span 7 on lg) */}
        <div className="lg:col-span-7 glass-panel-warm rounded-3xl p-6 sm:p-10 border border-pink-500/20 shadow-[0_12px_40px_rgba(236,72,153,0.12)] space-y-6 relative overflow-hidden">
          {/* Soft background glow spot inside card */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

          {/* Small warm badge */}
          <div className="flex items-center gap-2 text-xs font-mono text-pink-300">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400/20" />
            <span>A Personal Letter · Sincerity First</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-white font-normal">
            Lithi, I'm genuinely sorry.
          </h2>

          {/* Exact Apology Text Verbatim */}
          <div className="font-sans text-base sm:text-lg text-slate-200/95 leading-relaxed space-y-4">
            <p>
              I know you were already irritated, and I chose the worst possible moment to tease you and make a joke. I wasn't trying to make things worse, but I understand that I did.
            </p>
            <p>
              I should have noticed that you weren't in the mood and given you some space instead of trying to be funny.
            </p>
            <p className="font-medium text-pink-100">
              I'm not going to make excuses for it. I messed up, and I'm genuinely sorry.
            </p>
            <p>
              You didn't deserve to have me make things more annoying when you were already having a rough time.
            </p>
            <p>
              I care about you, and I don't want to be someone who adds to your bad moments. I'll try to be more aware of when you need support and when you just need me to not be an idiot.
            </p>
          </div>
        </div>

        {/* Right Column: Developer "Patch" Section (Span 5 on lg) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 sm:p-6 border border-purple-500/20 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/15 pb-4">
            <div>
              <div className="text-xs font-mono text-pink-300/80 uppercase tracking-wider">
                System Update v1.0.1
              </div>
              <h3 className="text-base sm:text-lg font-mono font-semibold text-white">
                Gagan Behavior Patch Notes
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-500/30">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>DEPLOYED</span>
            </div>
          </div>

          {/* Added / Removed / Fixed Grid */}
          <div className="grid grid-cols-1 gap-3.5 font-mono text-xs">
            {/* ADDED */}
            <div className="space-y-2 p-3.5 rounded-xl bg-purple-950/25 border border-purple-500/15">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wider">
                <Plus className="w-3.5 h-3.5" />
                <span>ADDED:</span>
              </div>
              <ul className="space-y-1 text-slate-300 pl-1">
                <li>• Situational awareness</li>
                <li>• Better mood detection</li>
                <li>• Common sense &amp; knowing when NOT to joke</li>
              </ul>
            </div>

            {/* REMOVED */}
            <div className="space-y-2 p-3.5 rounded-xl bg-purple-950/25 border border-purple-500/15">
              <div className="flex items-center gap-1.5 text-rose-400 font-semibold tracking-wider">
                <Minus className="w-3.5 h-3.5" />
                <span>REMOVED:</span>
              </div>
              <ul className="space-y-1 text-slate-300 pl-1">
                <li>• Random teasing during irritation</li>
                <li>• Terrible timing &amp; unhelpful comedy</li>
              </ul>
            </div>

            {/* FIXED */}
            <div className="space-y-2 p-3.5 rounded-xl bg-purple-950/25 border border-purple-500/15">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>FIXED:</span>
              </div>
              <ul className="space-y-1 text-slate-300 pl-1">
                <li>• Gagan.exe choosing comedy at the wrong moment</li>
              </ul>
            </div>
          </div>

          {/* Tiny Fake Git History */}
          <div className="pt-4 border-t border-purple-500/15 space-y-2">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <GitCommit className="w-3.5 h-3.5 text-purple-400" />
              <span>Git Commit Log (branch: main/remorse)</span>
            </div>

            <div className="font-mono text-xs space-y-1.5 pl-2 text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-semibold">commit 001</span>
                <span className="text-slate-600">—</span>
                <span className="text-rose-300/90">"Made the mistake"</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-semibold">commit 002</span>
                <span className="text-slate-600">—</span>
                <span className="text-amber-300/90">"Realized I made things worse"</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-semibold">commit 003</span>
                <span className="text-slate-600">—</span>
                <span className="text-purple-200">"Started writing apology"</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-semibold">commit 004</span>
                <span className="text-slate-600">—</span>
                <span className="text-pink-300 font-medium">"Hopefully gets forgiven"</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-purple-500/10">
        <BackButton onClick={onBack} label="BACK TO INCIDENT" />
        <PrimaryButton onClick={onNext} className="w-full sm:w-auto">
          CONTINUE →
        </PrimaryButton>
      </div>
    </PageLayout>
  );
};
