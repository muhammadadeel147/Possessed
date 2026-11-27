/**
 * Creates a lightweight SpiritContext for unit tests.
 * Uses happy-dom's document (provided by the vitest environment).
 */
import type { SpiritContext } from '../spirits/types';
import { PossessedHost } from '../host/possessed-host';
import { createMotionPolicy } from '../host/motion';

export function makeMockCtx(
  overrides: Partial<SpiritContext> = {},
): SpiritContext & { host: PossessedHost } {
  const doc = overrides.doc ?? document;
  const host = new PossessedHost(doc);
  const motion = createMotionPolicy(false);
  const ac = new AbortController();

  const base: SpiritContext & { host: PossessedHost } = {
    doc,
    host,
    motion,
    signal: ac.signal,
  };

  // Apply overrides individually so there are no duplicate keys
  if (overrides.doc) base.doc = overrides.doc;
  if (overrides.motion) base.motion = overrides.motion;
  if (overrides.signal) base.signal = overrides.signal;
  if (overrides.speech !== undefined) base.speech = overrides.speech;
  if (overrides.host instanceof PossessedHost) base.host = overrides.host;

  return base;
}
