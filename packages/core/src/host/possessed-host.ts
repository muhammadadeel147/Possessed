/**
 * PossessedHost — single <possessed-root> shadow DOM host.
 *
 * Rules (tech.md §2):
 * - All Possessed UI lives inside this element's closed shadow root.
 * - Never pollute the host page's styles.
 * - Idempotent: calling create() twice returns the same instance.
 */

const TAG = 'possessed-root';

export class PossessedHost {
  private readonly _shadow: ShadowRoot;
  private readonly _root: HTMLElement;
  private readonly _layers = new Map<string, HTMLElement>();

  constructor(doc: Document) {
    // Reuse an existing host if present (idempotency).
    let root = doc.querySelector<HTMLElement>(TAG);
    if (!root) {
      root = doc.createElement(TAG);
      doc.documentElement.appendChild(root);
    }
    this._root = root;

    // Attach a closed shadow root if one isn't there yet.
    // (In practice we always create a fresh PossessedHost per possession.)
    let shadow: ShadowRoot;
    try {
      shadow = root.attachShadow({ mode: 'closed' });
    } catch {
      // Already has a shadow root — retrieve via a workaround:
      // We store the reference on the element itself.
      shadow = (root as unknown as { __shadow: ShadowRoot }).__shadow;
    }
    (root as unknown as { __shadow: ShadowRoot }).__shadow = shadow;
    this._shadow = shadow;

    // CSS reset so host styles never bleed into the page.
    const style = doc.createElement('style');
    style.textContent = `
      :host {
        all: initial;
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 2147483646;
      }
    `;
    this._shadow.appendChild(style);
  }

  get shadow(): ShadowRoot {
    return this._shadow;
  }

  addLayer(id: string, element: HTMLElement): void {
    if (this._layers.has(id)) this.removeLayer(id);
    this._layers.set(id, element);
    this._shadow.appendChild(element);
  }

  removeLayer(id: string): void {
    const el = this._layers.get(id);
    if (el) {
      el.remove();
      this._layers.delete(id);
    }
  }

  getLayer(id: string): HTMLElement | undefined {
    return this._layers.get(id);
  }

  destroy(): void {
    this._root.remove();
    this._layers.clear();
  }
}

/** Singleton factory — returns the same host for a given document. */
const _instances = new WeakMap<Document, PossessedHost>();

export function getPossessedHost(doc: Document): PossessedHost {
  let host = _instances.get(doc);
  if (!host) {
    host = new PossessedHost(doc);
    _instances.set(doc, host);
  }
  return host;
}

export function destroyPossessedHost(doc: Document): void {
  const host = _instances.get(doc);
  if (host) {
    host.destroy();
    _instances.delete(doc);
  }
}
