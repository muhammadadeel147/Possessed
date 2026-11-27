import type { Spirit, SpiritId, SpiritContext } from './types';

type ChangeListener = (id: SpiritId, intensity: number, active: boolean) => void;

export class SpiritRegistry {
  private readonly _spirits = new Map<SpiritId, Spirit>();
  private readonly _listeners = new Set<ChangeListener>();

  register(spirit: Spirit): void {
    this._spirits.set(spirit.id, spirit);
  }

  get(id: SpiritId): Spirit | undefined {
    return this._spirits.get(id);
  }

  possess(id: SpiritId, ctx: SpiritContext, intensity: number): void {
    const spirit = this._spirits.get(id);
    if (!spirit) throw new Error(`Spirit "${id}" not registered`);
    spirit.possess(ctx, intensity);
    this._emit(id, intensity, spirit.active);
  }

  setIntensity(id: SpiritId, intensity: number): void {
    const spirit = this._spirits.get(id);
    if (!spirit) throw new Error(`Spirit "${id}" not registered`);
    spirit.setIntensity(intensity);
    this._emit(id, intensity, spirit.active);
  }

  exorcise(id: SpiritId): void {
    const spirit = this._spirits.get(id);
    if (!spirit) return;
    spirit.exorcise();
    this._emit(id, 0, false);
  }

  exorciseAll(): void {
    for (const id of this._spirits.keys()) {
      this.exorcise(id);
    }
  }

  onChange(listener: ChangeListener): () => void {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  private _emit(id: SpiritId, intensity: number, active: boolean): void {
    for (const l of this._listeners) l(id, intensity, active);
  }

  get ids(): SpiritId[] {
    return [...this._spirits.keys()];
  }
}
