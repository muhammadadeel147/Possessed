/**
 * SpeechPort — interface + BrowserSpeech implementation used by The Void.
 * Kept here (not in spirits/) so the host layer owns the dependency.
 */

export interface SpeechPort {
  speak(text: string): void;
  cancel(): void;
}

export class BrowserSpeech implements SpeechPort {
  private _voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof speechSynthesis === 'undefined') return;
    // Voices load asynchronously in some browsers.
    const load = () => { this._voices = speechSynthesis.getVoices(); };
    load();
    speechSynthesis.addEventListener('voiceschanged', load);
  }

  private _bestVoice(): SpeechSynthesisVoice | null {
    const preferred = this._voices.find(
      (v) => v.lang.startsWith('en') && v.localService,
    );
    return preferred ?? this._voices.find((v) => v.lang.startsWith('en')) ?? null;
  }

  speak(text: string): void {
    if (typeof speechSynthesis === 'undefined') return;
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 1.15;
    utt.pitch = 0.9;
    const voice = this._bestVoice();
    if (voice) utt.voice = voice;
    speechSynthesis.speak(utt);
  }

  cancel(): void {
    if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  }
}

/** No-op implementation for environments without speech synthesis. */
export class FakeSpeech implements SpeechPort {
  readonly utterances: string[] = [];
  speak(text: string): void { this.utterances.push(text); }
  cancel(): void {}
}
