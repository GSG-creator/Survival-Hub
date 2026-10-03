/**
 * Tactile Sound Effects Engine
 * 
 * Uses Web Audio API to create gentle, warm, pleasant tactile audio feedback
 * for clicks and hovers. 100% self-contained with no external audio dependencies.
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  private lastHoverTime: number = 0;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  /**
   * Main Click Sound: Crisp, warm, tactile ceramic/glass tap (540Hz -> 320Hz)
   */
  public playClickSound() {
    try {
      this.init();
      if (!this.ctx) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft, subtle, warm tactile click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.045);

      // Warm low-pass filter to prevent harsh highs
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      // Low volume, pleasant tactile feedback
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignored if browser blocks audio before interaction
    }
  }

  /**
   * Hover Sound: Very soft, low-frequency subtle 'blip' (210Hz -> 155Hz)
   * Calibrated for whisper-quiet micro-interaction feedback.
   */
  public playHoverSound() {
    const nowMs = performance.now();
    // Throttle to prevent acoustic stacking on fast pointer movement
    if (nowMs - this.lastHoverTime < 60) return;
    this.lastHoverTime = nowMs;

    try {
      this.init();
      if (!this.ctx) return;

      if (this.ctx.state === 'suspended') {
        return; // Don't force resume context on hover alone; only clicks resume
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Low-frequency gentle micro-blip (210Hz -> 155Hz)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(210, now);
      osc.frequency.exponentialRampToValueAtTime(155, now + 0.032);

      // Muted warmth filter to keep it deep and soft
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, now);

      // Whisper-quiet volume (0.016)
      gain.gain.setValueAtTime(0.016, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // AudioContext policy
    }
  }
}

export const sfx = new SoundEffects();
