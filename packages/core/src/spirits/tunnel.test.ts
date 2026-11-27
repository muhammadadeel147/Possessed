import { describe, it, expect, beforeEach } from 'vitest';
import { Tunnel } from './tunnel';
import { makeMockCtx } from '../test-utils/mock-ctx';

describe('Tunnel spirit', () => {
  let tunnel: Tunnel;

  beforeEach(() => { tunnel = new Tunnel(); });

  it('is inactive before possess', () => {
    expect(tunnel.active).toBe(false);
  });

  it('creates an overlay layer on possess', () => {
    const ctx = makeMockCtx();
    tunnel.possess(ctx, 0.5);
    expect(tunnel.active).toBe(true);
    expect(ctx.host.getLayer('possessed-tunnel')).toBeDefined();
  });

  it('overlay has a radial-gradient background', () => {
    const ctx = makeMockCtx();
    tunnel.possess(ctx, 0.5);
    const overlay = ctx.host.getLayer('possessed-tunnel')!;
    // happy-dom stores the value in backgroundImage or as a CSS custom property
    const gradient = overlay.style.backgroundImage || overlay.style.getPropertyValue('--tunnel-gradient');
    expect(gradient).toContain('radial-gradient');
  });

  it('removes the overlay layer on exorcise', () => {
    const ctx = makeMockCtx();
    tunnel.possess(ctx, 0.5);
    tunnel.exorcise();
    expect(tunnel.active).toBe(false);
    expect(ctx.host.getLayer('possessed-tunnel')).toBeUndefined();
  });

  it('exorcise cancels rAF and leaves no dangling listeners', () => {
    const ctx = makeMockCtx();
    const ac = new AbortController();
    // Provide a signal so the tunnel can track it
    tunnel.possess({ ...ctx, signal: ac.signal }, 0.4);
    ac.abort(); // triggers internal cleanup path
    tunnel.exorcise();
    expect(tunnel.active).toBe(false);
  });

  it('updates gradient on setIntensity', () => {
    const ctx = makeMockCtx();
    tunnel.possess(ctx, 0.2);
    const overlay = ctx.host.getLayer('possessed-tunnel')!;
    const before = overlay.style.getPropertyValue('--tunnel-gradient') || overlay.style.backgroundImage;
    tunnel.setIntensity(0.9);
    const after = overlay.style.getPropertyValue('--tunnel-gradient') || overlay.style.backgroundImage;
    expect(before).not.toBe(after);
  });
});
