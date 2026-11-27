/**
 * MotionPolicy — reads prefers-reduced-motion with a live listener
 * and exposes a calmMode flag settable by the user.
 *
 * flashGuard wraps any effect callback so it fires at most once per
 * minIntervalMs (WCAG 2.3.1 — no more than 3 flashes/sec → 333 ms minimum,
 * we default to 400 ms for safety).
 */

export interface MotionPolicy {
  readonly reducedMotion: boolean;
  calmMode: boolean;
  /** True when either reducedMotion or calmMode is set. */
  readonly reduced: boolean;
  destroy(): void;
}

export function createMotionPolicy(initialCalmMode = false): MotionPolicy {
  const mq = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

  let _reducedMotion = mq?.matches ?? false;
  let _calmMode = initialCalmMode;

  const listener = (e: MediaQueryListEvent) => { _reducedMotion = e.matches; };
  mq?.addEventListener('change', listener);

  const policy: MotionPolicy = {
    get reducedMotion() { return _reducedMotion; },
    get calmMode() { return _calmMode; },
    set calmMode(v: boolean) { _calmMode = v; },
    get reduced() { return _reducedMotion || _calmMode; },
    destroy() { mq?.removeEventListener('change', listener); },
  };

  return policy;
}

/**
 * flashGuard — wraps a callback so it cannot fire more often than
 * minIntervalMs. Returns a cancel function.
 */
export function flashGuard(
  fn: () => void,
  minIntervalMs = 400,
): { fire: () => void; cancel: () => void } {
  let lastFired = 0;
  let pending: ReturnType<typeof setTimeout> | null = null;

  function fire() {
    const now = Date.now();
    const elapsed = now - lastFired;
    if (elapsed >= minIntervalMs) {
      lastFired = now;
      fn();
    } else {
      if (pending !== null) clearTimeout(pending);
      pending = setTimeout(() => {
        pending = null;
        lastFired = Date.now();
        fn();
      }, minIntervalMs - elapsed);
    }
  }

  function cancel() {
    if (pending !== null) {
      clearTimeout(pending);
      pending = null;
    }
  }

  return { fire, cancel };
}
