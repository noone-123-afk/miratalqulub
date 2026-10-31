import { Howl, Howler } from 'howler';

// Helper to generate a clean 16-bit mono 44.1kHz PCM WAV Data URI
function createWavDataUri(samples: Float32Array, sampleRate = 44100): string {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = samples.length * 2;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF header
  writeAscii(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeAscii(view, 8, 'WAVE');

  // fmt chunk
  writeAscii(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // Linear PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data chunk
  writeAscii(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // 16-bit PCM samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }

  // Base64 encoding
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:audio/wav;base64,' + btoa(binary);
}

function writeAscii(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

// 1. Soft, tranquil page transition chime (gentle harmonic sweep)
function generatePageTransitionAudio(): string {
  const sampleRate = 44100;
  const duration = 0.42; // seconds
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  // Harmonic chord: F5 (698.46 Hz) + A5 (880 Hz) + C6 (1046.5 Hz)
  const freqs = [698.46, 880.0, 1046.5];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    // Gentle envelope: soft 30ms swell, exponential tranquil decay
    const attack = Math.min(1, t / 0.035);
    const decay = Math.exp(-t * 6.5);
    const env = attack * decay;

    let sampleVal = 0;
    freqs.forEach((freq, idx) => {
      // Base frequency + subtle 2nd harmonic warmth
      const phase = 2 * Math.PI * freq * t;
      const fundamental = Math.sin(phase);
      const overtone = 0.25 * Math.sin(phase * 2);
      sampleVal += (fundamental + overtone) * (1 / (idx + 1.2));
    });

    samples[i] = sampleVal * env * 0.18;
  }

  return createWavDataUri(samples, sampleRate);
}

// 2. Heavenly, dreamy result reveal sound (celestial arpeggio harp/chime with lush decay)
function generateResultRevealAudio(): string {
  const sampleRate = 44100;
  const duration = 2.0; // seconds
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  // Ascending mystical pentatonic chord progression: E5, G#5, B5, E6, G#6
  const notes = [
    { freq: 659.25, time: 0.0, amp: 0.28 },
    { freq: 830.61, time: 0.12, amp: 0.32 },
    { freq: 987.77, time: 0.24, amp: 0.35 },
    { freq: 1318.51, time: 0.38, amp: 0.4 },
    { freq: 1661.22, time: 0.52, amp: 0.25 },
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let mixed = 0;

    for (const note of notes) {
      if (t >= note.time) {
        const dt = t - note.time;
        // Warm harp/celesta envelope
        const attack = Math.min(1, dt / 0.02);
        const decay = Math.exp(-dt * 2.6);
        const env = attack * decay;

        const phase = 2 * Math.PI * note.freq * dt;
        // Pure sine + crystal sparkle overtone
        const val = Math.sin(phase) + 0.3 * Math.sin(phase * 2) + 0.1 * Math.sin(phase * 3);
        mixed += val * env * note.amp;
      }
    }

    samples[i] = Math.max(-1, Math.min(1, mixed * 0.42));
  }

  return createWavDataUri(samples, sampleRate);
}

// 3. Delicate tactile droplet tap sound
function generateTapAudio(): string {
  const sampleRate = 44100;
  const duration = 0.07;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 45);
    // Subtle frequency pitch sweep
    const currentFreq = 540 - t * 1800;
    samples[i] = Math.sin(2 * Math.PI * currentFreq * t) * env * 0.15;
  }

  return createWavDataUri(samples, sampleRate);
}

// 4. Subtle tab switch sound
function generateTabAudio(): string {
  const sampleRate = 44100;
  const duration = 0.11;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 28);
    samples[i] = Math.sin(2 * Math.PI * 784 * t) * env * 0.12;
  }

  return createWavDataUri(samples, sampleRate);
}

// 5. Triumphant round pass chime (The Blind Date Show stage cleared)
function generateRoundPassAudio(): string {
  const sampleRate = 44100;
  const duration = 0.85;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  const notes = [
    { freq: 523.25, time: 0.0, amp: 0.3 },   // C5
    { freq: 659.25, time: 0.12, amp: 0.35 }, // E5
    { freq: 783.99, time: 0.24, amp: 0.4 },  // G5
    { freq: 1046.5, time: 0.38, amp: 0.48 }, // C6
  ];

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let mixed = 0;
    for (const note of notes) {
      if (t >= note.time) {
        const dt = t - note.time;
        const env = Math.min(1, dt / 0.02) * Math.exp(-dt * 4.5);
        mixed += Math.sin(2 * Math.PI * note.freq * dt) * env * note.amp;
      }
    }
    samples[i] = Math.max(-1, Math.min(1, mixed * 0.45));
  }
  return createWavDataUri(samples, sampleRate);
}

// 6. Studio applause shimmer for Blind Date reveal & passing stages
function generateApplauseAudio(): string {
  const sampleRate = 44100;
  const duration = 1.3;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const envelope = Math.sin((t / duration) * Math.PI);
    const noise = (Math.random() * 2 - 1) * 0.25;
    const clapCycle = Math.sin(t * 36 * Math.PI);
    const clapEmphasis = clapCycle > 0.75 ? 1.4 : 0.7;
    samples[i] = noise * envelope * clapEmphasis * 0.35;
  }
  return createWavDataUri(samples, sampleRate);
}

// 7. Dramatic heartbeat sound for final decision moments
function generateHeartbeatAudio(): string {
  const sampleRate = 44100;
  const duration = 0.6;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let val = 0;
    if (t < 0.2) {
      const dt = t;
      const env = Math.exp(-dt * 20);
      val += Math.sin(2 * Math.PI * 65 * dt) * env * 0.5;
    }
    if (t >= 0.22 && t < 0.5) {
      const dt = t - 0.22;
      const env = Math.exp(-dt * 18);
      val += Math.sin(2 * Math.PI * 55 * dt) * env * 0.42;
    }
    samples[i] = Math.max(-1, Math.min(1, val));
  }
  return createWavDataUri(samples, sampleRate);
}

class SoundManager {
  private _enabled = true;
  private transitionHowl: Howl | null = null;
  private resultHowl: Howl | null = null;
  private tapHowl: Howl | null = null;
  private tabHowl: Howl | null = null;
  private roundPassHowl: Howl | null = null;
  private applauseHowl: Howl | null = null;
  private heartbeatHowl: Howl | null = null;
  private initialized = false;

  constructor() {
    // Lazy initialize sounds when in browser
    if (typeof window !== 'undefined') {
      this.initHowls();
    }
  }

  private initHowls() {
    if (this.initialized) return;
    try {
      this.transitionHowl = new Howl({
        src: [generatePageTransitionAudio()],
        format: ['wav'],
        volume: 0.35,
        html5: false,
      });

      this.resultHowl = new Howl({
        src: [generateResultRevealAudio()],
        format: ['wav'],
        volume: 0.48,
        html5: false,
      });

      this.tapHowl = new Howl({
        src: [generateTapAudio()],
        format: ['wav'],
        volume: 0.2,
        html5: false,
      });

      this.tabHowl = new Howl({
        src: [generateTabAudio()],
        format: ['wav'],
        volume: 0.18,
        html5: false,
      });

      this.roundPassHowl = new Howl({
        src: [generateRoundPassAudio()],
        format: ['wav'],
        volume: 0.4,
        html5: false,
      });

      this.applauseHowl = new Howl({
        src: [generateApplauseAudio()],
        format: ['wav'],
        volume: 0.35,
        html5: false,
      });

      this.heartbeatHowl = new Howl({
        src: [generateHeartbeatAudio()],
        format: ['wav'],
        volume: 0.4,
        html5: false,
      });

      this.initialized = true;
    } catch (e) {
      console.warn('Howler initialization notice:', e);
    }
  }

  public get enabled(): boolean {
    return this._enabled;
  }

  public set enabled(val: boolean) {
    this._enabled = val;
    Howler.mute(!val);
  }

  public toggle(): boolean {
    this.enabled = !this._enabled;
    return this._enabled;
  }

  // Play gentle page transition sound (between steps & questions)
  public playPageTransition() {
    if (!this._enabled) return;
    this.initHowls();
    try {
      if (this.transitionHowl) {
        this.transitionHowl.stop();
        this.transitionHowl.play();
      }
    } catch {
      // Quiet fallback
    }
  }

  // Backward compatibility alias
  public playNext() {
    this.playPageTransition();
  }

  // Play rich, celestial sound when partner results are revealed
  public playResultReveal() {
    if (!this._enabled) return;
    this.initHowls();
    try {
      if (this.resultHowl) {
        this.resultHowl.stop();
        this.resultHowl.play();
      }
    } catch {
      // Quiet fallback
    }
  }

  // Backward compatibility alias
  public playCelebration() {
    this.playResultReveal();
  }

  // Play light tactile tap on buttons or options
  public playTap() {
    if (!this._enabled) return;
    this.initHowls();
    try {
      if (this.tapHowl) {
        this.tapHowl.stop();
        this.tapHowl.play();
      }
    } catch {
      // Quiet fallback
    }
  }

  // Play delicate switch sound when toggling result tabs
  public playTab() {
    if (!this._enabled) return;
    this.initHowls();
    try {
      if (this.tabHowl) {
        this.tabHowl.stop();
        this.tabHowl.play();
      }
    } catch {
      // Quiet fallback
    }
  }

  // Play triumphant stage pass sound for The Blind Date Show
  public playRoundPass() {
    if (!this._enabled) return;
    this.initHowls();
    try {
      if (this.roundPassHowl) {
        this.roundPassHowl.stop();
        this.roundPassHowl.play();
      }
    } catch {
      // Quiet fallback
    }
  }

  // Play TV studio applause for round celebration & curtain drop
  public playApplause() {
    if (!this._enabled) return;
    this.initHowls();
    try {
      if (this.applauseHowl) {
        this.applauseHowl.stop();
        this.applauseHowl.play();
      }
    } catch {
      // Quiet fallback
    }
  }

  // Play tense heartbeat pulse for final decision
  public playHeartbeat() {
    if (!this._enabled) return;
    this.initHowls();
    try {
      if (this.heartbeatHowl) {
        this.heartbeatHowl.stop();
        this.heartbeatHowl.play();
      }
    } catch {
      // Quiet fallback
    }
  }
}

export const soundManager = new SoundManager();
