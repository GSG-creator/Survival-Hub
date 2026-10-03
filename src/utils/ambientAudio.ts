/**
 * Procedural Midnight Ambient Soundscape Generator
 * 
 * Uses Web Audio API to create a gentle, warm, low-volume ambient pad
 * (Fmaj9 / Am9 / Cmaj7 / Dm9 progression) with a soft filtered midnight tape texture.
 * Completely self-contained with no external audio file dependencies.
 */

class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private currentChordIndex: number = 0;
  private activeVoices: { osc: OscillatorNode; gain: GainNode }[] = [];
  private targetVolume: number = 0.04; // Low-volume by default

  // Gentle, warm, soft romantic chord frequencies (Hz)
  // Chords: Fmaj9 -> Am9 -> Cmaj7 -> Dm9
  private readonly chords: number[][] = [
    [174.61, 261.63, 329.63, 392.0, 440.0],  // F3, C4, E4, G4, A4
    [220.0, 261.63, 329.63, 392.0, 493.88],  // A3, C4, E4, G4, B4
    [130.81, 196.0, 246.94, 329.63, 392.0],   // C3, G3, B3, E4, G4
    [146.83, 220.0, 261.63, 349.23, 440.0],  // D3, A3, C4, F4, A4
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public async start(): Promise<boolean> {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return true;

    // Master Gain (strictly low volume, gentle & non-intrusive)
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    // Smooth fade in to whisper-quiet target volume
    this.masterGain.gain.exponentialRampToValueAtTime(this.targetVolume, this.ctx.currentTime + 1.8);

    // Warm Low-pass Filter to cut harsh high frequencies
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(580, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    this.masterGain.connect(filter);
    filter.connect(this.ctx.destination);

    // Start playing evolving chord progression
    this.isPlaying = true;
    this.playNextChord();

    // Rotate chords every 7 seconds for a slow, calming atmospheric swell
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying) {
        this.playNextChord();
      }
    }, 7000);

    return true;
  }

  private playNextChord() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;
    const fadeDuration = 3.2;

    // Fade out previous voices
    this.activeVoices.forEach((voice) => {
      try {
        voice.gain.gain.cancelScheduledValues(now);
        voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
        voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + fadeDuration);
        voice.osc.stop(now + fadeDuration + 0.1);
      } catch {
        // Voice may have stopped
      }
    });

    this.activeVoices = [];

    // Spawn new sine & triangle pad voices for this chord
    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft sine waves with slight detuning for rich chorusing
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, now);

      gain.gain.setValueAtTime(0.0001, now);
      // Gentle swell in
      gain.gain.exponentialRampToValueAtTime(0.015 / (idx + 1), now + fadeDuration * 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      this.activeVoices.push({ osc, gain });
    });
  }

  public stop() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    // Smooth fade out
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      this.activeVoices.forEach((v) => {
        try {
          v.osc.stop();
          v.osc.disconnect();
        } catch {
          // Cleaned up
        }
      });
      this.activeVoices = [];
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.isPlaying = false;
    }, 1300);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public setVolume(volume: number) {
    this.targetVolume = Math.max(0.0001, Math.min(0.1, volume));
    if (this.ctx && this.masterGain && this.isPlaying) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, this.ctx.currentTime + 0.3);
    }
  }

  public getVolume(): number {
    return this.targetVolume;
  }
}

export const ambientPlayer = new AmbientSoundscape();
