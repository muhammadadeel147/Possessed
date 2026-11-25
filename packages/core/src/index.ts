/**
 * Possessed Core — public API
 * Framework-agnostic accessibility possession engine.
 */

export type { SpiritId, Spirit, SpiritContext } from './spirits/types';

// createPossession will be implemented in Stage 2
export function createPossession(_doc: Document, _options?: Record<string, unknown>) {
  // placeholder — full implementation in Stage 2
  throw new Error('createPossession: not yet implemented');
}
