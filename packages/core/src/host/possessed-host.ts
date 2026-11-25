/**
 * PossessedHost — placeholder for Stage 2.
 * Creates a single <possessed-root> shadow DOM host.
 */
export class PossessedHost {
  addLayer(_id: string, _element: HTMLElement): void {}
  removeLayer(_id: string): void {}
  getLayer(_id: string): HTMLElement | undefined { return undefined; }
  destroy(): void {}
}
