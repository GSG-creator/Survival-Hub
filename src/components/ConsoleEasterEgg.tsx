import React, { useEffect, useState } from 'react';
import { X, Terminal, Check, Copy, Heart } from 'lucide-react';

interface ConsoleEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsoleEasterEgg: React.FC<ConsoleEasterEggProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const easterEggCode = 'console.log("I love you, idiot ❤️");';

  useEffect(() => {
    if (isOpen) {
      // Real developer console output
      console.log(
        '%c[Apology.exe Debugger]%c "I love you, idiot ❤️"',
        'background: #3b0764; color: #f472b6; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'color: #ec4899; font-weight: bold; font-size: 14px;'
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(easterEggCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Secret Developer Console Easter Egg"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl glass-panel-warm border border-pink-500/30 p-5 shadow-[0_0_35px_rgba(236,72,153,0.25)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-xs text-purple-300 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-pink-400" />
              devtools.debug.log
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close console"
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3 font-mono text-xs sm:text-sm">
          <div className="text-slate-400 text-[11px]">
            &gt; Inspecting runtime variables...
          </div>

          <div className="bg-[#0b0814] rounded-xl p-3 border border-pink-500/20 flex items-center justify-between gap-2 shadow-inner">
            <div className="text-pink-300 font-medium overflow-x-auto whitespace-nowrap">
              <span className="text-purple-400">console</span>.
              <span className="text-pink-400">log</span>(
              <span className="text-rose-200">"I love you, idiot ❤️"</span>);
            </div>
            <button
              type="button"
              onClick={handleCopy}
              title="Copy snippet"
              aria-label="Copy snippet"
              className="p-1.5 rounded-md text-slate-400 hover:text-pink-300 hover:bg-pink-500/10 transition-colors shrink-0"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <div className="text-purple-300/80 text-xs italic flex items-center gap-1.5 pt-1">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/30" />
            <span>(Check your browser DevTools console too — it's real.)</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-purple-500/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/20 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
