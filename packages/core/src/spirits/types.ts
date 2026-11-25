/**
 * Core spirit types — the contract every spirit must satisfy.
 * See .kiro/steering/spirits.md for the full specification.
 */

export type SpiritId = 'fog' | 'drain' | 'tunnel' | 'scramble' | 'tremor' | 'void';

import type { PossessedHost } from '../host/possessed-host';
import type { MotionPolicy } from '../host/motion';
import type { SpeechPort } from '../host/speech-port';

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
  readonly condition: string;
  readonly note: string;
  possess(ctx: SpiritContext, intensity: number): void;
  setIntensity(intensity: number): void;
  exorcise(): void;
  readonly active: boolean;
}
