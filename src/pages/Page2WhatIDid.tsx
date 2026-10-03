import React from 'react';
import { PrimaryButton, BackButton } from '../components/ActionButton';
import { PageLayout } from '../components/PageLayout';
import { Bug, AlertCircle, Compass, PauseCircle, TrendingUp, CheckCircle } from 'lucide-react';

/* 
 * ============================================================================
 * PAGE 2 — WHAT I DID (Incident Report)
 * EDITABLE CONTENT:
 * Bug details, sincere explanation, and takeaway cards.
 * ============================================================================
 */

interface Page2WhatIDidProps {
  onNext: () => void;
  onBack: () => void;
}

export const Page2WhatIDid: React.FC<Page2WhatIDidProps> = ({ onNext, onBack }) => {
  return (
    <PageLayout maxWidth="5xl" className="space-y-8">
      {/* Page Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
          <Bug className="w-4 h-4 text-pink-400" />
          <span>DEBUGGING GAGAN'S COGNITIVE DECISIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
          Incident Report
        </h2>
        <p className="text-sm font-mono text-slate-400">
          Post-incident analysis of an avoidable failure in situational awareness.
        </p>
      </div>

      {/* Main Bug Report Container */}
      <div className="glass-panel rounded-2xl border border-purple-500/20 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {/* Ticket Header */}
        <div className="px-5 py-4 bg-[#120d1f] border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-pink-300">
              BUG #001
            </span>
            <span className="text-slate-600 font-mono text-xs">|</span>
            <span className="font-mono text-xs text-purple-200">
              Bug Name: <span className="text-white font-semibold">Terrible Timing</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            {/* Severity */}
            <div className="flex items-center gap-1.5 text-rose-300">
              <span className="text-slate-400">Severity:</span>
              <span className="px-2 py-0.5 rounded bg-rose-950/50 border border-rose-500/30 font-semibold tracking-wide">
                EMOTIONALLY STUPID
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-1.5 text-amber-300">
              <span className="text-slate-400">Status:</span>
              <span className="px-2 py-0.5 rounded bg-amber-950/50 border border-amber-500/30 font-semibold tracking-wide">
                REGRET CONFIRMED
              </span>
            </div>
          </div>
        </div>

        {/* Bug Details: Expected vs Actual */}
        <div className="p-5 sm:p-6 space-y-5 bg-[#0b0814]/90 font-mono text-xs sm:text-sm">
          {/* Expected Behaviour */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1.5">
            <div className="text-purple-300 font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Expected Behaviour:</span>
            </div>
            <div className="text-slate-300 pl-6 leading-relaxed">
              "Notice that Lithi is already irritated → be supportive → don't tease her"
            </div>
          </div>

          {/* Actual Behaviour */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
            <div className="text-rose-300 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Actual Behaviour:</span>
            </div>
            <div className="text-rose-100/90 pl-6 leading-relaxed">
              "Notice that Lithi is irritated → make a joke anyway → immediately regret every decision"
            </div>
          </div>

          {/* Sincere Narrative Explanation */}
          <div className="pt-3 border-t border-purple-500/15">
            <div className="text-purple-300 text-xs font-semibold mb-2">
              SITUATION SUMMARY:
            </div>
            <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed bg-[#130e21] p-4 rounded-xl border border-purple-500/15">
              Lithi was already irritated because of things going on before she came online. Instead of recognizing that and giving her the right kind of support, I chose that exact moment to tease her.
              <br /><br />
              That was bad timing on my part, and I understand why it annoyed her.
            </p>
          </div>
        </div>
      </div>

      {/* Developer-Style "What Went Wrong" 3-Card Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-300/80">
          Root Cause Analysis & Takeaways
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Card 1 */}
          <div className="glass-panel p-4 rounded-xl border border-purple-500/20 space-y-2 hover:border-pink-500/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-pink-400 mb-1">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-sm font-bold text-white">
              Read the room.
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              I should have noticed that you were already irritated.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-4 rounded-xl border border-purple-500/20 space-y-2 hover:border-pink-500/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-amber-400 mb-1">
              <PauseCircle className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-sm font-bold text-white">
              Know when to stop.
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Not every moment needs a joke.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-4 rounded-xl border border-purple-500/20 space-y-2 hover:border-pink-500/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-emerald-400 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="font-mono text-sm font-bold text-white">
              Do better next time.
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              I can't undo the moment, but I can learn from it.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-purple-500/10">
        <BackButton onClick={onBack} label="BACK TO BOOT" />
        <PrimaryButton onClick={onNext} className="w-full sm:w-auto">
          READ MY APOLOGY →
        </PrimaryButton>
      </div>
    </PageLayout>
  );
};
