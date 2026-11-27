import type { Spirit, SpiritContext, SpiritId } from './types';

export type DrainMode = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

/** Full-strength CVD matrices — rows are [R, G, B, 0, 0] coefficients. */
const MATRICES: Record<DrainMode, readonly [number, number, number][]> = {
  protanopia:    [[0.567, 0.433, 0], [0.558, 0.442, 0], [0, 0.242, 0.758]],
  deuteranopia:  [[0.625, 0.375, 0], [0.700, 0.300, 0], [0, 0.300, 0.700]],
  tritanopia:    [[0.950, 0.050, 0], [0, 0.433, 0.567], [0, 0.475, 0.525]],
  achromatopsia: [[0.299, 0.587, 0.114], [0.299, 0.587, 0.114], [0.299, 0.587, 0.114]],
};

/** Identity matrix rows. */
const IDENTITY: readonly [number, number, number][] = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_ID = 'possessed-drain-svg';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Interpolate from identity (t=0) to mode matrix (t=1). */
function interpolateMatrix(
  mode: DrainMode,
  t: number,
): readonly [number, number, number][] {
  const target = MATRICES[mode];
  return IDENTITY.map((iRow, r) =>
    iRow.map((_, c) => lerp(iRow[c]!, target[r]![c]!, t)),
  ) as unknown as readonly [number, number, number][];
}

/** Build a feColorMatrix values string from 3×3 RGB rows. */
function matrixValues(rows: readonly (readonly number[])[]): string {
  // feColorMatrix type="matrix" needs a 4×5 matrix (RGBA + offset columns)
  return rows
    .map((row) => `${row[0]!} ${row[1]!} ${row[2]!} 0 0`)
    .concat(['0 0 0 1 0'])
    .join(' ');
}

export class Drain implements Spirit {
  readonly id: SpiritId = 'drain';
  readonly name = 'The Drain';
  readonly condition = 'Colour vision deficiency';
  readonly note =
    'Simulates protanopia, deuteranopia, tritanopia and achromatopsia. ' +
    'This is a rough simulation. It cannot replicate lived experience.';

  private _mode: DrainMode = 'protanopia';
  private _intensity = 0;
  private _active = false;
  private _prevFilter: string | null = null;
  private _svgEl: SVGSVGElement | null = null;
  private _doc: Document | null = null;

  get active(): boolean { return this._active; }

  setMode(mode: DrainMode): void {
    this._mode = mode;
    if (this._active) this._applyFilter();
  }

  possess(ctx: SpiritContext, intensity: number): void {
    this._doc = ctx.doc;
    this._intensity = Math.max(0, Math.min(1, intensity));

    // Save the previous filter only on first possession (avoid overwriting with our own value)
    if (!this._active) {
      this._prevFilter = ctx.doc.documentElement.style.filter || null;
    }
    this._active = true;

    this._injectSvg(ctx.doc);
    this._applyFilter();
  }

  setIntensity(intensity: number): void {
    this._intensity = Math.max(0, Math.min(1, intensity));
    if (this._active) this._applyFilter();
  }

  exorcise(): void {
    if (this._doc) {
      // Restore previous filter
      if (this._prevFilter !== null) {
        this._doc.documentElement.style.filter = this._prevFilter;
      } else {
        this._doc.documentElement.style.removeProperty('filter');
      }
      // Remove the hidden SVG
      this._doc.getElementById(SVG_ID)?.remove();
    }
    this._svgEl = null;
    this._active = false;
    this._prevFilter = null;
    this._doc = null;
  }

  private _injectSvg(doc: Document): void {
    // Remove any stale one first
    doc.getElementById(SVG_ID)?.remove();

    const svg = doc.createElementNS(SVG_NS, 'svg') as SVGSVGElement;
    svg.setAttribute('id', SVG_ID);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    Object.assign(svg.style, {
      position: 'absolute',
      width: '0',
      height: '0',
      overflow: 'hidden',
    });

    // Create one filter per mode so we can switch without re-injecting
    for (const mode of Object.keys(MATRICES) as DrainMode[]) {
      const defs = doc.createElementNS(SVG_NS, 'defs');
      const filter = doc.createElementNS(SVG_NS, 'filter');
      filter.setAttribute('id', `possessed-drain-${mode}`);
      const cm = doc.createElementNS(SVG_NS, 'feColorMatrix');
      cm.setAttribute('type', 'matrix');
      cm.setAttribute('values', matrixValues(MATRICES[mode]));
      filter.appendChild(cm);
      defs.appendChild(filter);
      svg.appendChild(defs);
    }

    doc.body.appendChild(svg);
    this._svgEl = svg;
  }

  private _applyFilter(): void {
    if (!this._doc || !this._svgEl) return;
    const rows = interpolateMatrix(this._mode, this._intensity);

    // Update the active filter's feColorMatrix values live
    const cm = this._svgEl.querySelector<SVGElement>(
      `#possessed-drain-${this._mode} feColorMatrix`,
    );
    if (cm) cm.setAttribute('values', matrixValues(rows));

    this._doc.documentElement.style.filter =
      `url(#possessed-drain-${this._mode})`;
  }
}

// Re-export helpers for tests
export { interpolateMatrix, matrixValues, MATRICES, IDENTITY };
