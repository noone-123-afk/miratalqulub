// Ultra-lightweight, zero-dependency Web Audio synthesizer.
// Performs zero work on initial page load; initializes AudioContext lazily only upon user interaction.

class SoundManager {
  private _enabled = true;
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (!this._enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      try {
        this.ctx = new AudioCtx();
      } catch {
        return null;
      }
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(freq: number, duration: number, volume = 0.12, startOffset = 0, type: OscillatorType = 'sine') {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime + startOffset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    } catch {
      // Ignore audio context restrictions
    }
  }

  public get enabled(): boolean {
    return this._enabled;
  }

  public set enabled(val: boolean) {
    this._enabled = val;
  }

  public toggle(): boolean {
    this._enabled = !this._enabled;
    return this._enabled;
  }

  public playPageTransition() {
    if (!this._enabled) return;
    this.playTone(698.46, 0.28, 0.08, 0);
    this.playTone(880.0, 0.32, 0.07, 0.04);
    this.playTone(1046.5, 0.36, 0.06, 0.08);
  }

  public playNext() {
    this.playPageTransition();
  }

  public playResultReveal() {
    if (!this._enabled) return;
    const notes = [659.25, 830.61, 987.77, 1318.51, 1661.22];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.55, 0.09, idx * 0.11);
    });
  }

  public playCelebration() {
    this.playResultReveal();
  }

  public playTap() {
    if (!this._enabled) return;
    this.playTone(520, 0.055, 0.07, 0);
  }

  public playTab() {
    if (!this._enabled) return;
    this.playTone(784, 0.08, 0.06, 0);
  }

  public playRoundPass() {
    if (!this._enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.35, 0.09, idx * 0.1);
    });
  }

  public playApplause() {
    this.playRoundPass();
  }

  public playHeartbeat() {
    if (!this._enabled) return;
    this.playTone(65, 0.18, 0.18, 0);
    this.playTone(55, 0.22, 0.14, 0.22);
  }
}

export const soundManager = new SoundManager();
