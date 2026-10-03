/**
 * Background Developer Console Logger for Apology.exe
 * 
 * Periodically streams whimsical, developer-themed messages to the browser's
 * real developer console (F12 / Inspect -> Console) every 30 seconds.
 */

const APOLOGY_CONSOLE_MESSAGES = [
  'Analyzing sincerity levels... Result: 100.0% genuine.',
  'Optimizing romantic parameters... Allocating maximum care buffers for Lithi.',
  'Scanning codebase for excuses... 0 excuses found. Pure accountability.',
  'Garbage collecting bad timing and unnecessary teasing.',
  'Thread #42: Checking if Lithi is still annoyed with Gagan... Status: Monitoring.',
  'Pinging emotional_telemetry server... Latency: 1ms (Heartbeat detected ❤️).',
  "Diagnostic: 'Why Gagan made a whole website instead of apologizing normally'... Result: Programmer brain.",
  'Hotfix applied: Situational awareness patch v1.0.1 successfully injected into Gagan.exe.',
  'Cache cleared: Deleted bad jokes. (Accountability permanently retained in cold storage).',
  'Compiling remorse_pipeline.ts: Build succeeded with 0 warnings and 0 excuses.',
  'Allocating shoe-dodging trajectory matrix... Warning: High probability of direct hit tomorrow.',
  "Kernel process: Lithi's peace of mind designated as non-preemptible system priority.",
  'Git diff inspection: -100 annoyance, +999 sincerity, +1 apology website.',
  'Memory leak detected in brain.exe: Thinking about how to make it up to Lithi all day.',
];

/**
 * Initializes the 30-second developer console message loop.
 * Returns a cleanup function to clear the interval.
 */
export function initBackgroundConsoleLogs(): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  let lastIndex = -1;

  const logMessage = () => {
    // Pick a random message ensuring no consecutive duplicate
    let nextIndex = Math.floor(Math.random() * APOLOGY_CONSOLE_MESSAGES.length);
    if (nextIndex === lastIndex) {
      nextIndex = (nextIndex + 1) % APOLOGY_CONSOLE_MESSAGES.length;
    }
    lastIndex = nextIndex;

    const message = APOLOGY_CONSOLE_MESSAGES[nextIndex];
    const timestamp = new Date().toLocaleTimeString();

    // Styled real browser developer console log
    console.log(
      `%c[Apology.exe]%c %c[${timestamp}]%c ${message}`,
      'background: #3b0764; color: #f472b6; font-weight: bold; padding: 2px 6px; border-radius: 4px; font-family: monospace;',
      '',
      'color: #a855f7; font-weight: 500; font-family: monospace;',
      'color: #e2e8f0; font-family: monospace; font-size: 11px;'
    );
  };

  // Initial greeting / launch message
  console.log(
    '%c[Apology.exe System Logger Active]%c Real-time diagnostic messages will stream every 30s.',
    'background: #1e1136; color: #ec4899; font-weight: bold; padding: 2px 6px; border-radius: 4px; border: 1px solid #a855f7;',
    'color: #94a3b8; font-family: monospace; font-size: 11px; margin-left: 6px;'
  );

  // Trigger one message shortly after startup
  const initialTimeout = setTimeout(logMessage, 4000);

  // Then trigger periodically every 30 seconds
  const intervalId = setInterval(logMessage, 30000);

  return () => {
    clearTimeout(initialTimeout);
    clearInterval(intervalId);
  };
}
