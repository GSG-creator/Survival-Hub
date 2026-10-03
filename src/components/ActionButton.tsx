import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon = <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />,
  shortcut = 'Space',
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      className={`group relative inline-flex items-center justify-center px-6 py-3 min-h-[44px] text-sm sm:text-base font-mono font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 shadow-[0_0_20px_rgba(236,72,153,0.25)] hover:shadow-[0_0_28px_rgba(236,72,153,0.45)] border border-pink-400/30 transition-all duration-200 active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08060d] ${className}`}
      title={shortcut ? `Keyboard Shortcut: ${shortcut}` : undefined}
      {...props}
    >
      <span>{children}</span>
      {shortcut && (
        <span className="hidden lg:inline-flex items-center ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/30 border border-white/20 text-pink-100 group-hover:border-white/40 transition-colors">
          {shortcut}
        </span>
      )}
      {icon}
    </button>
  );
};

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  shortcut?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label = 'BACK',
  shortcut = '←',
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      className={`group inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-mono text-slate-400 hover:text-purple-200 rounded-xl bg-purple-950/20 hover:bg-purple-900/30 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${className}`}
      title={shortcut ? `Keyboard Shortcut: ${shortcut}` : undefined}
      {...props}
    >
      <ArrowLeft className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover:-translate-x-1" />
      <span>{label}</span>
      {shortcut && (
        <span className="hidden lg:inline-flex items-center ml-2 px-1 py-0.2 rounded text-[10px] font-mono bg-purple-950 border border-purple-500/30 text-purple-300">
          {shortcut}
        </span>
      )}
    </button>
  );
};
