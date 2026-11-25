---
inclusion: fileMatch
fileMatchPattern: ["packages/core/src/spirits/**", "packages/core/src/host/**", "packages/core/src/audit/spirit-coupling.ts"]
---

# Spirit implementation contract

```ts
export type SpiritId = 'fog' | 'drain' | 'tunnel' | 'scramble' | 'tremor' | 'void';

export interface SpiritContext {
  doc: Document;
  host: PossessedHost;          // shadow-root overlay manager
  motion: MotionPolicy;         // reducedMotion, calmMode
  speech?: SpeechPort;          // only the Void uses it
  signal: AbortSignal;          // aborted on exorcise
}

export interface Spirit {
  readonly id: SpiritId;
  readonly name: string;        // "The Fog"
  readonly condition: string;   // "Low vision"
  readonly note: string;        // respectful factual note
  possess(ctx: SpiritContext, intensity: number): void;  // intensity 0..1
  setIntensity(intensity: number): void;
  exorcise(): void;             // MUST restore the DOM and styles exactly
  readonly active: boolean;
}
```

## Implementation notes per spirit
- **Fog:** a full-viewport overlay in the shadow host with `backdrop-filter: blur(calc(var(--i) * 6px)) contrast(calc(1 - var(--i) * .45)) brightness(calc(1 - var(--i) * .1))`, `pointer-events: none`. No changes to page styles.
- **Drain:** inject one hidden `<svg>` with `<filter>` elements using `feColorMatrix` for each mode, then set `filter: url(#possessed-drain-<mode>)` on `document.documentElement` (save and restore the previous inline `filter`). Interpolate the matrix toward identity by intensity. Matrices (rows, RGB):
  - protanopia: `.567 .433 0 / .558 .442 0 / 0 .242 .758`
  - deuteranopia: `.625 .375 0 / .7 .3 0 / 0 .3 .7`
  - tritanopia: `.95 .05 0 / 0 .433 .567 / 0 .475 .525`
  - achromatopsia: `.299 .587 .114` on all three rows
  Verify `position: fixed` elements still render correctly. If not, fall back to applying the filter to `body`.
- **Tunnel:** a fixed overlay with `background: radial-gradient(circle at var(--x) var(--y), transparent var(--r), rgba(0,0,0,.97) calc(var(--r) + 90px))`. Radius from 45vmin (i=0.1) down to 8vmin (i=1). Follows the pointer via rAF. Centre of viewport when the pointer is unknown.
- **Scramble:** TreeWalker over visible text nodes (skip `script, style, noscript, textarea, input, [contenteditable], code, pre`, and the possessed host). Store originals in a `Map<Text, string>`. Each tick (≥ 400 ms), pick a random subset of words (probability = intensity × 0.35) and either swap two *interior* letters or mirror-confuse one of `b↔d`, `p↔q`, `m↔w`, `n↔u`. Invariants: word count, word lengths, first and last letters, whitespace and punctuation are all unchanged. A `MutationObserver` registers new text nodes. Exorcise restores every original value.
- **Tremor:** add a style rule `* { cursor: none !important }` via an adoptable stylesheet (removable). Draw a fake cursor in the shadow host at `real + noise(t)`, where noise is the sum of 3 sines at 4–7 Hz plus a small random walk. Amplitude 2px (i=0.1) to 28px (i=1). In the capture phase on `window`, intercept `pointerdown/mousedown/click`: cancel the real event, then `elementFromPoint(fakeX, fakeY)` and dispatch `.click()` there (flag synthetic events to avoid recursion). When the actual target differs from the intended one, show a small "missed" puff. Keyboard input is never affected, which teaches that keyboard support matters.
- **Void:** see the Void section below.

## The Void
- Overlay: opaque `--void` black over everything (`pointer-events: auto` so the mouse cannot cheat), with centred captions in large bone text showing the current announcement (also helps deaf viewers and the video).
- Build a linear "virtual cursor" list from the DOM in reading order: landmarks, headings (with level), links, buttons, form controls (with state), images, lists (with item count), and text blocks. Use `dom-accessibility-api` for role and name.
- Announcement format, approximating common screen readers:
  - `"{name}, {role}"`, e.g. "Add to cart, button"
  - unnamed button → `"button"`; unnamed link → `"link"` or the `href` filename when that is what readers fall back to
  - image without alt → the filename: `"IMG_4821.jpg, image"`; `alt=""` → skipped
  - headings: `"Shipping, heading level 2"`
  - inputs: `"{label or 'edit text'}, edit text, {required?}"`
- Keys: ↓/↑ next/previous item, Tab/Shift+Tab next/previous focusable, H next heading, B next button, K next link, Enter activates, Space pauses speech, Esc exits the Void, A toggles autoplay (reads everything for the demo video).
- Speech: `SpeechPort` wraps `speechSynthesis` (rate 1.15, a slightly low pitch of 0.9; prefer a neutral English voice). Cancel the previous utterance before speaking.
- HUD (bottom): "Unnamed elements heard: N" counter.

## Coupling spirits to the audit (`spirit-coupling.ts`)
Default intensity per spirit when auto mode is on:
- Fog, Drain ← `color-contrast`, `color-contrast-enhanced`, `link-in-text-block`
- Tunnel ← `region`, `landmark-*`, `bypass`, `skip-link`
- Scramble ← `html-has-lang`, `valid-lang`, `meta-viewport` + overall score × 0.5
- Tremor ← `target-size`, `scrollable-region-focusable`
- Void ← `image-alt`, `button-name`, `link-name`, `label`, `input-button-name`, `aria-*-name`, `frame-title`
Intensity = clamp(0.15 + weighted violations / 20, 0, 1), and it is 0 when there are no related violations (the spirit is "banished").
