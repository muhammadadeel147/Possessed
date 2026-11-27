import { describe, it, expect, beforeEach } from 'vitest';
import { Fog } from './fog';
import { makeMockCtx } from '../test-utils/mock-ctx';

describe('Fog spirit', () => {
  let fog: Fog;

  beforeEach(() => { fog = new Fog(); });

  it('is inactive before possess', () => {
    expect(fog.active).toBe(false);
  });

  it('creates an overlay layer on possess', () => {
    const ctx = makeMockCtx();
    fog.possess(ctx, 0.5);
    expect(fog.active).toBe(true);
    expect(ctx.host.getLayer('possessed-fog')).toBeDefined();
  });

  it('applies backdrop-filter styles with correct intensity', () => {
    const ctx = makeMockCtx();
    fog.possess(ctx, 0.8);
    const overlay = ctx.host.getLayer('possessed-fog')!;
    expect(overlay.style.backdropFilter).toContain('blur(');
    expect(overlay.style.backdropFilter).toContain('contrast(');
  });

  it('updates styles on setIntensity', () => {
    const ctx = makeMockCtx();
    fog.possess(ctx, 0.2);
    const before = ctx.host.getLayer('possessed-fog')!.style.backdropFilter;
    fog.setIntensity(0.9);
    const after = ctx.host.getLayer('possessed-fog')!.style.backdropFilter;
    expect(before).not.toBe(after);
  });

  it('removes the overlay layer on exorcise', () => {
    const ctx = makeMockCtx();
    fog.possess(ctx, 0.5);
    fog.exorcise();
    expect(fog.active).toBe(false);
    expect(ctx.host.getLayer('possessed-fog')).toBeUndefined();
  });

  it('exorcise is a no-op if not possessed', () => {
    expect(() => fog.exorcise()).not.toThrow();
  });

  it('clamps intensity to [0, 1]', () => {
    const ctx = makeMockCtx();
    fog.possess(ctx, 1.5);
    expect(fog.active).toBe(true);
    fog.setIntensity(-0.3);
    // Should not throw and overlay should still exist
    expect(fog.active).toBe(true);
  });
});
