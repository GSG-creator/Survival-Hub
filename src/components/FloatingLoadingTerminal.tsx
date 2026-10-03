import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Minus, Square, RefreshCw, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

/* 
 * ============================================================================
 * FLOATING LOADING TERMINAL (BOOT PAGE)
 * 
 * A resizable, floating terminal window displaying real-time loading logs of
 * components as the site initializes, giving an authentic developer aesthetic.
 * ============================================================================
 */

interface LogEntry {
  id: string;
  timestamp: string;
  tag: 'INIT' | 'MODULE' | 'AUDIO' | 'MEM' | 'OK' | 'SYSTEM';
  message: string;
  status: 'ready' | 'pending' | 'success';
}

const INITIAL_LOG_SEQUENCE: Omit<LogEntry, 'id' | 'timestamp'>[] = [
  { tag: 'INIT', message: 'Bootstrap runtime starting: apology.exe (production)', status: 'ready' },
  { tag: 'MODULE', message: 'Mounting <StarFieldAtmosphere /> star canvas', status: 'success' },
  { tag: 'AUDIO', message: 'Synthesizing WebAudio ambient chord bank (Fmaj9/Am9)', status: 'success' },
  { tag: 'MODULE', message: 'Pre-warming Framer Motion compositor pipeline', status: 'success' },
  { tag: 'MEM', message: 'Allocating Shoe3D.mesh buffer (6,420 vertices)', status: 'success' },
  { tag: 'MODULE', message: 'Parsing telemetry: /logs/the_incident_report.json', status: 'success' },
  { tag: 'SYSTEM', message: 'Verifying situational awareness... FAILED (as expected)', status: 'ready' },
  { tag: 'MODULE', message: 'Mounting <Page3Apology /> interactive remorse slider', status: 'success' },
  { tag: 'MEM', message: 'Generating canvas texture: "Forgive Gagan" monogram', status: 'success' },
  { tag: 'AUDIO', message: 'Binding global acoustic button feedback switch', status: 'success' },
  { tag: 'SYSTEM', message: 'Target verified: Lithi (highest priority)', status: 'success' },
  { tag: 'INIT', message: 'Initialization complete. Sincerity level: 100.0%', status: 'success' },
];

export const FloatingLoadingTerminal: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 380,
    height: 240,
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef<boolean>(false);
  const startPosRef = useRef<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runCountRef = useRef<number>(0);

  // Starts or restarts streaming logs safely with unique IDs and clean interval lifecycle
  const startStreaming = (delayMs: number = 260) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    runCountRef.current += 1;
    const currentRun = runCountRef.current;

    setLogs([]);
    setIsStreaming(true);

    let currentIndex = 0;
    const startTime = performance.now();

    intervalRef.current = setInterval(() => {
      if (currentIndex < INITIAL_LOG_SEQUENCE.length) {
        const item = INITIAL_LOG_SEQUENCE[currentIndex];
        const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
        const uniqueId = `term-run-${currentRun}-idx-${currentIndex}-${item.tag}`;

        setLogs((prev) => [
          ...prev,
          {
            id: uniqueId,
            timestamp: `+${elapsed}s`,
            ...item,
          },
        ]);
        currentIndex++;
      } else {
        setIsStreaming(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, delayMs);
  };

  // Stream logs one by one on mount
  useEffect(() => {
    startStreaming(280);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Auto-scroll terminal log body to bottom
  useEffect(() => {
    if (scrollRef.current && !isMinimized) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isMinimized]);

  // Restart sequence safely
  const handleRestart = () => {
    startStreaming(200);
  };

  // Resize handler via bottom-right grip
  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      w: dimensions.width,
      h: dimensions.height,
    };

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isResizingRef.current) return;
      const dx = ev.clientX - startPosRef.current.x;
      const dy = ev.clientY - startPosRef.current.y;
      setDimensions({
        width: Math.max(280, Math.min(window.innerWidth - 32, startPosRef.current.w + dx)),
        height: Math.max(160, Math.min(500, startPosRef.current.h + dy)),
      });
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Component Initialization Inspector"
      className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-30 select-none shadow-[0_12px_40px_rgba(0,0,0,0.65)] rounded-xl border border-purple-500/25 bg-[#090611]/90 backdrop-blur-md overflow-hidden flex flex-col transition-[height] duration-200"
      style={{
        width: typeof window !== 'undefined' && window.innerWidth < 640 ? 'calc(100vw - 32px)' : `${dimensions.width}px`,
        height: isMinimized ? '38px' : `${dimensions.height}px`,
      }}
    >
      {/* Terminal Title Bar */}
      <div className="h-[38px] bg-[#120d20] border-b border-purple-500/20 px-3 flex items-center justify-between cursor-move shrink-0">
        <div className="flex items-center gap-2">
          {/* Mac/Terminal Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="flex items-center gap-1.5 ml-1.5 font-mono text-[11px] text-purple-200 font-medium">
            <Terminal className="w-3.5 h-3.5 text-pink-400" />
            <span>init_components.log</span>
            {isStreaming && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-1" />
            )}
          </div>
        </div>

        {/* Window Action Controls */}
        <div className="flex items-center gap-1 text-slate-400">
          <button
            type="button"
            onClick={handleRestart}
            title="Re-run component initialization log"
            className="p-1 hover:text-pink-300 hover:bg-white/5 rounded transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isStreaming ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setIsMinimized((prev) => !prev)}
            title={isMinimized ? 'Expand inspector' : 'Minimize inspector'}
            className="p-1 hover:text-purple-200 hover:bg-white/5 rounded transition-colors"
          >
            {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Log Stream Body (hidden when minimized) */}
      {!isMinimized && (
        <div className="flex-1 flex flex-col min-h-0 relative">
          <div
            ref={scrollRef}
            className="flex-1 p-3 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1.5 scrollbar-thin scrollbar-thumb-purple-900/50"
          >
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-1.5 text-slate-300">
                <span className="text-purple-400/60 select-none text-[10px] shrink-0 font-light">
                  {log.timestamp}
                </span>

                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-semibold shrink-0 select-none ${
                    log.tag === 'OK' || log.status === 'success'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                      : log.tag === 'SYSTEM'
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-500/20'
                      : 'bg-purple-950/60 text-pink-300 border border-pink-500/20'
                  }`}
                >
                  {log.tag}
                </span>

                <span className="text-purple-100/90 break-words flex-1">
                  {log.message}
                </span>
              </div>
            ))}

            {isStreaming && (
              <div className="flex items-center gap-1 text-pink-400 text-xs pt-1">
                <span className="select-none text-purple-400">&gt;</span>
                <span className="w-2 h-3.5 bg-pink-400 animate-pulse" />
              </div>
            )}

            {!isStreaming && (
              <div className="pt-2 text-[10px] text-emerald-400/80 flex items-center gap-1 select-none font-medium">
                <span>✔ 12/12 components initialized smoothly</span>
              </div>
            )}
          </div>

          {/* Bottom Toolbar & Resizing Corner Handle */}
          <div className="h-6 bg-[#0d0918] border-t border-purple-500/10 px-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500 shrink-0">
            <span className="truncate">
              {isStreaming ? 'Streaming initialization...' : 'Status: Ready'}
            </span>

            {/* Resize Grip (draggable) */}
            <div
              onMouseDown={handleMouseDownResize}
              title="Click and drag to resize terminal"
              className="cursor-nwse-resize p-1 -mr-1 hover:text-pink-300 transition-colors flex items-center justify-center select-none"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-60 hover:opacity-100">
                <path d="M7 1L1 7M7 4L4 7M7 7H7.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
