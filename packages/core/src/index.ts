/**
 * Possessed Core — public API
 * Framework-agnostic accessibility possession engine.
 */

export type { SpiritId, Spirit, SpiritContext } from './spirits/types';
export type { MotionPolicy } from './host/motion';
export type { SpeechPort } from './host/speech-port';
export type { DrainMode } from './spirits/drain';

export { SpiritRegistry } from './spirits/registry';
export { Fog } from './spirits/fog';
export { Drain } from './spirits/drain';
export { Tunnel } from './spirits/tunnel';
export { createMotionPolicy, flashGuard } from './host/motion';
export { getPossessedHost, destroyPossessedHost, PossessedHost } from './host/possessed-host';
export { BrowserSpeech, FakeSpeech } from './host/speech-port';

import type { SpiritContext } from './spirits/types';
import { getPossessedHost, destroyPossessedHost } from './host/possessed-host';
import { createMotionPolicy } from './host/motion';
import type { MotionPolicy } from './host/motion';
import type { SpeechPort } from './host/speech-port';
import { SpiritRegistry } from './spirits/registry';
import { Fog } from './spirits/fog';
import { Drain } from './spirits/drain';
import { Tunnel } from './spirits/tunnel';
import type { PossessedHost } from './host/possessed-host';

export interface PossessionOptions {
  calmMode?: boolean;
  speech?: SpeechPort;
}

export interface Possession {
  host: PossessedHost;
  spirits: SpiritRegistry;
  motion: MotionPolicy;
  context: (signal: AbortSignal) => SpiritContext;
  destroy(): void;
}

/**
 * createPossession — wires up the host, motion policy and all spirits.
 * Returns a Possession handle with destroy() for full teardown.
 */
export function createPossession(
  doc: Document,
  options: PossessionOptions = {},
): Possession {
  const host = getPossessedHost(doc);
  const motion = createMotionPolicy(options.calmMode ?? false);
  const registry = new SpiritRegistry();

  registry.register(new Fog());
  registry.register(new Drain());
  registry.register(new Tunnel());

  const context = (signal: AbortSignal): SpiritContext => ({
    doc,
    host,
    motion,
    signal,
    ...(options.speech !== undefined ? { speech: options.speech } : {}),
  });

  return {
    host,
    spirits: registry,
    motion,
    context,
    destroy() {
      registry.exorciseAll();
      motion.destroy();
      destroyPossessedHost(doc);
    },
  };
}
