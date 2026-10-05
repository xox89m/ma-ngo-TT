/**
 * Audio service for playing romantic ambient music and sound effects,
 * with Web Audio API synthesizer for Day One - PUN chords and melodies,
 * plus cute sound effects (pop, bell, heart celebration).
 */

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private volume = 0.6;
  private isMuted = false;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Melodic notes for PUN - Day One inspired chord progression & acoustic melody
  // Warm, nostalgic, emotional key
  public startMusic() {
    this.init();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;

    // Chord sequence: Dmaj7 -> F#m7 -> Gmaj7 -> A7
    const chords = [
      [293.66, 369.99, 440.0, 554.37], // Dmaj7
      [277.18, 369.99, 440.0, 554.37], // C#m7 / F#m
      [196.00, 293.66, 369.99, 440.0], // Gmaj7
      [220.00, 277.18, 329.63, 440.0], // A
    ];

    const melodyNotes = [
      440.0, 493.88, 554.37, 587.33, 554.37, 493.88, 440.0, 369.99,
      554.37, 587.33, 659.25, 587.33, 554.37, 440.0, 493.88, 369.99,
    ];

    let chordStep = 0;
    let melodyStep = 0;

    const playChord = () => {
      if (!this.isPlaying || !this.ctx || this.isMuted) return;
      const currentChord = chords[chordStep % chords.length];
      chordStep++;

      currentChord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        const noteGain = (this.volume * 0.12) / (idx + 1);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(noteGain, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 4.0);
      });
    };

    const playMelody = () => {
      if (!this.isPlaying || !this.ctx || this.isMuted) return;
      const freq = melodyNotes[melodyStep % melodyNotes.length];
      melodyStep++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      const noteGain = this.volume * 0.15;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(noteGain, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    };

    // Initial chord
    playChord();
    playMelody();

    let subStep = 0;
    this.timer = window.setInterval(() => {
      subStep++;
      if (subStep % 4 === 0) {
        playChord();
      }
      if (subStep % 2 === 0) {
        playMelody();
      }
    }, 700);
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Cute chime sound when placing sticker
  public playStickerPop() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.12);

    gain.gain.setValueAtTime(0.18 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Triumphant sweet harp chime for forgiveness
  public playForgivenessFanfare() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + i * 0.1;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2 * this.volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.9);
    });
  }
}

export const romanticAudio = new RomanticAudioManager();
