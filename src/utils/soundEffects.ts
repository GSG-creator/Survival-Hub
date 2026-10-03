/**
 * Tactile Sound Effects Engine
 * 
 * Uses Web Audio API to create gentle, warm, pleasant tactile audio feedback
 * for clicks, hovers, celebratory acceptance, and playful interactions.
 * 100% self-contained with no external audio dependencies.
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

  /**
   * Celebratory Chime Sound: Soft, heavenly sparkling arpeggio for when Lithi accepts the apology
   */
  public playCelebrationSound() {
    try {
      this.init();
      if (!this.ctx) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        const startTime = now + i * 0.09;
        const duration = 1.1;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2400, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.05, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
      });
    } catch {
      // AudioContext policy
    }
  }

  /**
   * Playful Whoosh: Springy whoosh for the shoe wobble interaction
   */
  public playWhooshSound() {
    try {
      this.init();
      if (!this.ctx) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.09);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.22);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);
    } catch {
      // AudioContext policy
    }
  }
}

export const sfx = new SoundEffects();
