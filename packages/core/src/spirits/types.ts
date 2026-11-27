import type { PossessedHost } from '../host/possessed-host';
import type { MotionPolicy } from '../host/motion';
import type { SpeechPort } from '../host/speech-port';

export type SpiritId = 'fog' | 'drain' | 'tunnel' | 'scramble' | 'tremor' | 'void';

export interface SpiritContext {
  doc: Document;
  host: PossessedHost;
  motion: MotionPolicy;
  speech?: SpeechPort;
  signal: AbortSignal;
}

export interface Spirit {
  readonly id: SpiritId;
  readonly name: string;
  /** Short factual label, e.g. "Low vision" */
  readonly condition: string;
  /** Respectful simulation note shown on the spirit card. */
  readonly note: string;
  possess(ctx: SpiritContext, intensity: number): void;
  setIntensity(intensity: number): void;
  exorcise(): void;
  readonly active: boolean;
}
