import type { Spirit, SpiritContext, SpiritId } from './types';

const LAYER_ID = 'possessed-fog';

export class Fog implements Spirit {
  readonly id: SpiritId = 'fog';
  readonly name = 'The Fog';
  readonly condition = 'Low vision';
  readonly note =
    'Simulates reduced visual acuity and contrast sensitivity. ' +
    'This is a rough simulation. It cannot replicate lived experience.';

  private _overlay: HTMLElement | null = null;
  private _intensity = 0;
  private _host: SpiritContext['host'] | null = null;
  private _doc: Document | null = null;

  get active(): boolean {
    return this._overlay !== null;
  }

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
  }

  setIntensity(intensity: number): void {
    this._intensity = Math.max(0, Math.min(1, intensity));
    this._applyStyles();
  }

  exorcise(): void {
    if (this._host) {
      this._host.removeLayer(LAYER_ID);
    }
    this._overlay = null;
    this._host = null;
    this._doc = null;
  }

  private _applyStyles(): void {
    if (!this._overlay) return;
    const i = this._intensity;
    Object.assign(this._overlay.style, {
      position: 'fixed',
      inset: '0',
      pointerEvents: 'none',
      zIndex: '1',
      backdropFilter: [
        `blur(${(i * 6).toFixed(2)}px)`,
        `contrast(${(1 - i * 0.45).toFixed(3)})`,
        `brightness(${(1 - i * 0.1).toFixed(3)})`,
      ].join(' '),
      // webkit prefix for broader support
      WebkitBackdropFilter: [
        `blur(${(i * 6).toFixed(2)}px)`,
        `contrast(${(1 - i * 0.45).toFixed(3)})`,
        `brightness(${(1 - i * 0.1).toFixed(3)})`,
      ].join(' '),
    });
    // Store intensity as CSS variable for external inspection
    this._overlay.style.setProperty('--i', String(i));
  }
}
