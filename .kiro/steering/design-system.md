---
inclusion: fileMatch
fileMatchPattern: ["apps/**/*.tsx", "apps/**/*.css", "packages/core/src/host/**", "packages/core/src/spirits/**", "**/tailwind.config.*"]
---

# Design system: "Séance"

Mood: a candle-lit Victorian séance room meets a modern dev tool. Elegant and eerie, never cheesy. Think occult manuscript + terminal. No cartoon pumpkins, no Comic-style fonts, no dripping-blood clichés.

## Colour tokens (CSS variables, also in Tailwind theme)
| Token | Hex | Use |
|---|---|---|
| `--void` | `#07060B` | App background |
| `--crypt` | `#121019` | Panels, cards |
| `--tomb` | `#1C1926` | Raised surfaces, inputs |
| `--bone` | `#ECE6D9` | Body text (≈ 16:1 on void) |
| `--fog` | `#A49FB0` | Secondary text (verify ≥ 7:1 on void; lighten if not) |
| `--ectoplasm` | `#7CFFB2` | Primary accent, focus rings, "cleansed" state |
| `--candle` | `#F5C66B` | Warnings, "needs review" |
| `--blood` | `#E0485F` | Critical violations, possession meter high |
| `--spectre` | `#9D8CFF` | Links, AI-generated badge |

Possession meter gradient: ectoplasm (0%) → candle (50%) → blood (100%).

## Typography
- Display / headings: **"IM Fell English SC"** (Google Fonts, OFL). Use only at ≥ 24px.
- Body / UI: **"Inter"**, 16px base, line-height 1.6.
- Code / diffs / grimoire: **"JetBrains Mono"**.
- Self-host fonts (no third-party requests from the extension).

## Components
- **Spirit card:** icon (custom SVG glyph, not emoji, in the UI), name, condition note, toggle switch, intensity slider (0–100), linked-violation count. Active cards glow softly (`box-shadow` with ectoplasm at 25% opacity).
- **Possession meter:** a vertical "candle" or a horizontal ritual gauge with tick marks every 10%. Percentage as text, plus an `aria-valuenow` meter role.
- **Exorcism button:** large, ectoplasm outline. While running, its label changes to "Exorcising… 7/23", with progress announced politely.
- **Fix row (Grimoire):** severity sigil, rule id, element selector, source badge (`rule` bone, `on-device` ectoplasm 🔒, `cloud` spectre ☁️, `heuristic` candle ⚠️, `prebaked` fog 📜), collapsible before/after diff.
- **Toasts:** bottom-left, ≤ 2 visible, auto-dismiss 5 s, pausable on hover/focus.

## Motion
- Durations: 150 ms (micro), 300 ms (panel), 900 ms (cleansing wisp).
- Easing: `cubic-bezier(.2,.8,.2,1)`.
- Cleansing effect: a soft ectoplasm wisp (canvas particles, ≤ 40 particles) rises from the fixed element's bounding box while the element briefly gets a 2px ectoplasm outline. Under reduced motion: the outline only.
- Ambient: a very subtle animated grain/noise on the landing hero at 3% opacity. Disabled under reduced motion.
- **Never flash.** Flicker effects are opacity drifts ≥ 400 ms, not on/off blinks.

## Sound (optional, off by default, toggle in settings)
A low drone during possession and a soft chime per fix. Never autoplay on the landing page.

## Voice and tone
Short, wry, gothic-literary. "The page is 73% possessed." / "14 spirits remain." / "Cleansed: 'Add to cart' now has a name."
