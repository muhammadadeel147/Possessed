---
inclusion: always
---

# Accessibility standards and ethical framing

## Framing rules (apply to ALL copy: UI, README, video, comments)
- The **barrier** is the curse. Spirits are personifications of *inaccessible design decisions*: missing alt text, low contrast, tiny targets, unlabeled buttons.
- Never write "suffer from", "victim of", "confined to", "the blind" or "the disabled". Use "blind people", "people with low vision", "screen reader users", "people with motor disabilities".
- Never describe a disability itself as scary, cursed, broken or monstrous. Spooky language applies only to the barriers and the haunted website.
- Each spirit card shows a short, factual, respectful note on the real-world condition it simulates and states plainly: *"This is a rough simulation. It cannot replicate lived experience."*
- The Void's onboarding note: "Screen reader users navigate by listening. When a page has no labels, this is all they get."
- Point to further reading (W3C WAI) in the About panel.

Approved copy example:
> "The Tremor doesn't live in the hand. It lives in the 12-pixel button you shipped."

Rejected copy example:
> "Feel the horror of being blind!" ❌

## Standards Possessed checks and fixes
- Audit: axe-core with tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, plus `best-practice` shown separately as "lesser hauntings".
- Contrast: 4.5:1 normal text, 3:1 large text (≥ 24px, or ≥ 18.66px and bold ≥ 700), 3:1 UI components.
- Target size: WCAG 2.5.8 minimum 24×24 CSS px.
- Alt text: concise (≤ 125 chars), describes purpose not appearance when the image is a link or button. Decorative images get `alt=""`. Never start with "image of" or "picture of".
- Accessible names for buttons/links: ≤ 40 chars, verb-first for actions ("Add to cart", "Open menu"), destination for links ("Shipping policy").

## Possessed's own UI
- WCAG 2.2 AA minimum, AAA (7:1) for body text.
- Every control is keyboard operable, with a visible focus ring (2px ectoplasm outline + offset).
- Live regions announce possession level changes and each fix (`aria-live="polite"`).
- `prefers-reduced-motion: reduce` disables wisps, flicker, particle effects and shaking. Simulations still work, but with no decorative motion.
- No content flashes more than 3 times per second. The Scramble updates at most every 400 ms per word (≤ 2.5 Hz).
- Self-test: Possessed must pass its own audit with 0 serious/critical violations ("self-exorcism" e2e test).
