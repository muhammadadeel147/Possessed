/**
 * PROPERTY TEST: reversibility
 *
 * For any random sequence of possess / setIntensity / exorcise operations
 * on Fog, Drain and Tunnel, after exorciseAll() the document state must be
 * identical to what it was before any possession started.
 *
 * Checks:
 * 1. documentElement.style.filter is restored exactly.
 * 2. The <possessed-root> element is gone after destroy().
 * 3. No injected SVG elements remain.
 */

import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { Window } from 'happy-dom';
import { Fog } from './fog';
import { Drain } from './drain';
import { Tunnel } from './tunnel';
import { SpiritRegistry } from './registry';
import { PossessedHost } from '../host/possessed-host';
import { createMotionPolicy } from '../host/motion';
import type { SpiritContext } from './types';

type Op =
  | { type: 'possess'; id: 'fog' | 'drain' | 'tunnel'; intensity: number }
  | { type: 'setIntensity'; id: 'fog' | 'drain' | 'tunnel'; intensity: number }
  | { type: 'exorcise'; id: 'fog' | 'drain' | 'tunnel' };

const spiritId = fc.constantFrom('fog' as const, 'drain' as const, 'tunnel' as const);
const intensity = fc.float({ min: 0, max: 1, noNaN: true });

const opArb: fc.Arbitrary<Op> = fc.oneof(
  fc.record({ type: fc.constant('possess' as const), id: spiritId, intensity }),
  fc.record({ type: fc.constant('setIntensity' as const), id: spiritId, intensity }),
  fc
    .record({ type: fc.constant('exorcise' as const), id: spiritId, intensity: fc.constant(0) })
    .map(({ type, id }) => ({ type, id })),
);

function freshDoc(): Document {
  const win = new Window();
  // happy-dom Window exposes document
  return win.document as unknown as Document;
}

function snapshot(doc: Document) {
  return {
    filter: doc.documentElement.style.filter,
    svgCount: doc.querySelectorAll('#possessed-drain-svg').length,
    hostPresent: !!doc.querySelector('possessed-root'),
  };
}

describe('Reversibility property test: Fog + Drain + Tunnel', () => {
  it('exorciseAll restores document state for any operation sequence', () => {
    fc.assert(
      fc.property(
        fc.array(opArb, { minLength: 1, maxLength: 20 }),
        (ops) => {
          // Each run gets its own isolated document
          const doc = freshDoc();
          const host = new PossessedHost(doc);
          const motion = createMotionPolicy(false);
          const ac = new AbortController();

          const ctx: SpiritContext = { doc, host, motion, signal: ac.signal };

          const before = snapshot(doc);

          const registry = new SpiritRegistry();
          registry.register(new Fog());
          registry.register(new Drain());
          registry.register(new Tunnel());

          for (const op of ops) {
            try {
              if (op.type === 'possess') {
                registry.possess(op.id, ctx, op.intensity);
              } else if (op.type === 'setIntensity') {
                const spirit = registry.get(op.id);
                if (spirit?.active) registry.setIntensity(op.id, op.intensity);
              } else {
                registry.exorcise(op.id);
              }
            } catch {
              // absorb invalid sequences
            }
          }

          registry.exorciseAll();
          host.destroy();
          ac.abort();

          const after = snapshot(doc);

          if (before.filter !== after.filter) return false;
          if (after.svgCount !== 0) return false;
          if (after.hostPresent) return false;

          return true;
        },
      ),
      { numRuns: 150, seed: 42 },
    );
  });
});
