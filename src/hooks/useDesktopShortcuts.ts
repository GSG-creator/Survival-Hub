import { useEffect } from 'react';
import { PageId, PAGES } from '../types';

interface DesktopShortcutsOptions {
  currentPageId: PageId;
  onNavigate: (pageId: PageId) => void;
  onToggleAudio: () => void;
  onToggleConsole: () => void;
  isConsoleOpen: boolean;
}

/**
 * Enhanced Desktop Keyboard & Mouse Shortcuts Hook
 * Provides authentic computer browser navigation experience:
 * - ArrowRight / Space / Enter / KeyD / KeyN -> Next Page
 * - ArrowLeft / Backspace / KeyA / KeyB -> Previous Page
 * - KeyM -> Toggle Audio
 * - KeyK / Cmd+K / Ctrl+K / ` -> Toggle Developer Console
 * - KeyF -> Toggle Browser Fullscreen
 * - Numbers 1-5 -> Instant Page Switch
 */
export function useDesktopShortcuts({
  currentPageId,
  onNavigate,
  onToggleAudio,
  onToggleConsole,
  isConsoleOpen,
}: DesktopShortcutsOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input, textarea, or contentEditable
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      const currentIndex = PAGES.findIndex((p) => p.id === currentPageId);

      // Toggle Console with Cmd+K, Ctrl+K, or Backquote `
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        onToggleConsole();
        return;
      }
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        onToggleConsole();
        return;
      }

      // If console is open, Escape closes it
      if (isConsoleOpen) {
        if (e.key === 'Escape') {
          onToggleConsole();
        }
        return;
      }

      // Next page shortcuts
      if (
        e.key === 'ArrowRight' ||
        e.key === ' ' ||
        (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey)
      ) {
        // Space should prevent page scroll
        if (e.key === ' ') e.preventDefault();
        if (currentIndex < PAGES.length - 1) {
          onNavigate(PAGES[currentIndex + 1].id);
        }
      }

      // Previous page shortcuts
      else if (
        e.key === 'ArrowLeft' ||
        (e.key.toLowerCase() === 'a' && !e.ctrlKey && !e.metaKey) ||
        (e.key === 'Backspace' && !e.ctrlKey && !e.metaKey)
      ) {
        if (currentIndex > 0) {
          e.preventDefault();
          onNavigate(PAGES[currentIndex - 1].id);
        }
      }

      // Audio mute toggle (M)
      else if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        onToggleAudio();
      }

      // Fullscreen toggle (F)
      else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
      }

      // Jump to page 1-5
      else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const pageIdx = parseInt(e.key, 10) - 1;
        if (pageIdx >= 0 && pageIdx < PAGES.length) {
          onNavigate(PAGES[pageIdx].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageId, onNavigate, onToggleAudio, onToggleConsole, isConsoleOpen]);
}
