import { describe, it, expect } from 'vitest';
import { createPossession } from './index';

describe('core bootstrap', () => {
  it('exports createPossession', () => {
    expect(typeof createPossession).toBe('function');
  });

  it('createPossession returns a Possession with spirits registered', () => {
    const possession = createPossession(document);
    expect(possession.spirits.get('fog')).toBeDefined();
    expect(possession.spirits.get('drain')).toBeDefined();
    expect(possession.spirits.get('tunnel')).toBeDefined();
    possession.destroy();
  });
});
