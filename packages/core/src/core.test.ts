import { describe, it, expect } from 'vitest';
import { createPossession } from './index';

describe('core bootstrap', () => {
  it('exports createPossession', () => {
    expect(typeof createPossession).toBe('function');
  });

  it('throws until Stage 2 implementation', () => {
    expect(() => createPossession(document)).toThrow('not yet implemented');
  });
});
