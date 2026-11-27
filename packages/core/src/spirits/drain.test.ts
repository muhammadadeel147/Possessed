import { describe, it, expect, beforeEach } from 'vitest';
import { Drain, interpolateMatrix, MATRICES, IDENTITY } from './drain';
import { makeMockCtx } from '../test-utils/mock-ctx';

describe('Drain spirit', () => {
  let drain: Drain;

  beforeEach(() => { drain = new Drain(); });

  it('is inactive before possess', () => {
    expect(drain.active).toBe(false);
  });

  it('sets filter on documentElement on possess', () => {
    const ctx = makeMockCtx();
    drain.possess(ctx, 0.8);
    expect(drain.active).toBe(true);
    expect(ctx.doc.documentElement.style.filter).toContain('url(#possessed-drain-');
  });

  it('injects a hidden SVG with filter elements', () => {
    const ctx = makeMockCtx();
    drain.possess(ctx, 0.5);
    const svg = ctx.doc.getElementById('possessed-drain-svg');
    expect(svg).toBeTruthy();
  });

  it('restores the previous filter on exorcise', () => {
    const ctx = makeMockCtx();
    ctx.doc.documentElement.style.filter = 'brightness(1.1)';
    drain.possess(ctx, 0.5);
    drain.exorcise();
    expect(ctx.doc.documentElement.style.filter).toBe('brightness(1.1)');
    expect(drain.active).toBe(false);
  });

  it('removes the injected SVG on exorcise', () => {
    const ctx = makeMockCtx();
    drain.possess(ctx, 0.5);
    drain.exorcise();
    expect(ctx.doc.getElementById('possessed-drain-svg')).toBeNull();
  });

  it('restores a null filter when there was none before', () => {
    const ctx = makeMockCtx();
    // Ensure no prior filter
    ctx.doc.documentElement.style.removeProperty('filter');
    drain.possess(ctx, 0.5);
    drain.exorcise();
    expect(ctx.doc.documentElement.style.filter).toBeFalsy();
  });

  it('switches mode without re-possessing', () => {
    const ctx = makeMockCtx();
    drain.possess(ctx, 0.8);
    drain.setMode('achromatopsia');
    expect(ctx.doc.documentElement.style.filter).toContain('achromatopsia');
  });
});

describe('Drain matrix interpolation', () => {
  it('at intensity 0 equals the identity matrix', () => {
    for (const mode of ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'] as const) {
      const result = interpolateMatrix(mode, 0);
      result.forEach((row, r) => {
        row.forEach((val, c) => {
          expect(val).toBeCloseTo(IDENTITY[r]![c]!, 5);
        });
      });
    }
  });

  it('at intensity 1 equals the mode matrix', () => {
    for (const mode of ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'] as const) {
      const result = interpolateMatrix(mode, 1);
      result.forEach((row, r) => {
        row.forEach((val, c) => {
          expect(val).toBeCloseTo(MATRICES[mode][r]![c]!, 5);
        });
      });
    }
  });

  it('every interpolated value stays within [0, 1]', () => {
    const steps = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1];
    for (const mode of ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'] as const) {
      for (const t of steps) {
        const rows = interpolateMatrix(mode, t);
        rows.forEach((row) => {
          row.forEach((val) => {
            expect(val).toBeGreaterThanOrEqual(-0.001);
            expect(val).toBeLessThanOrEqual(1.001);
          });
        });
      }
    }
  });
});
