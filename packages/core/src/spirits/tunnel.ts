import type { Spirit, SpiritContext, SpiritId } from './types';

const LAYER_ID = 'possessed-tunnel';

export class Tunnel implements Spirit {
  readonly id: SpiritId = 'tunnel';
  readonly name = 'The Tunnel';
  readonly condition = 'Tunnel vision / glaucoma';
  readonly note =
    'Simulates restricted peripheral vision. ' +
    'This is a rough simulation. It cannot replicate lived experience.';

  private _overlay: HTMLElement | null = null;
  private _intensity = 0;
  private _host: SpiritContext['host'] | null = null;
  private _doc: Document | null = null;
  private _rafId: number | null = null;
  private _x = 50; // viewport percentage
  private _y = 50;

  get active(): boolean { return this._overlay !== null; }

  possess(ctx: SpiritContext, intensity: number): void {
    this._host = ctx.host;
    this._doc = ctx.doc;
    this._intensity = Math.max(0, Math.min(1, intensity));

    if (!this._overlay) {
      this._overlay = ctx.doc.createElement('div');
      this._overlay.setAttribute('aria-hidden', 'true');
      ctx.host.addLayer(LAYER_ID, this._overlay);
    }

    this._applyStyles();
    this._startTracking(ctx.doc, ctx.signal);
  }

  setIntensity(intensity: number): void {
    this._intensity = Math.max(0, Math.min(1, intensity));
    this._applyStyles();
  }

  exorcise(): void {
    this._stopTracking();
    if (this._host) this._host.removeLayer(LAYER_ID);
    this._overlay = null;
    this._host = null;
    this._doc = null;
  }

  private _applyStyles(): void {
    if (!this._overlay) return;
    const i = this._intensity;
    // Radius: 45vmin at i=0.1 → 8vmin at i=1 (linear interpolation)
    const radius = 45 - (45 - 8) * i;
    const gradient = `radial-gradient(circle at ${this._x}% ${this._y}%, transparent ${radius.toFixed(1)}vmin, rgba(0,0,0,0.97) calc(${radius.toFixed(1)}vmin + 90px))`;

    this._overlay.style.position = 'fixed';
    this._overlay.style.inset = '0';
    this._overlay.style.pointerEvents = 'none';
    this._overlay.style.zIndex = '1';
    this._overlay.style.backgroundImage = gradient;
    this._overlay.style.backgroundSize = '100% 100%';
    this._overlay.style.setProperty('--i', String(i));
    this._overlay.style.setProperty('--tunnel-gradient', gradient);
  }

  private _startTracking(doc: Document, signal: AbortSignal): void {
    const onMove = (e: MouseEvent) => {
      this._x = (e.clientX / window.innerWidth) * 100;
      this._y = (e.clientY / window.innerHeight) * 100;
    };
    doc.addEventListener('mousemove', onMove, { passive: true, signal });

    const tick = () => {
      if (!this._overlay) return;
      this._applyStyles();
      this._rafId = requestAnimationFrame(tick);
    };
    this._rafId = requestAnimationFrame(tick);

    // Cancel rAF when the signal fires (exorcise)
    signal.addEventListener('abort', () => this._stopTracking(), { once: true });
  }

  private _stopTracking(): void {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }
}
