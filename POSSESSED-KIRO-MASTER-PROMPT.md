# POSSESSED: Complete Kiro Build Prompts (Kiroween 2026)

A stage-by-stage prompt pack for building **Possessed** with Kiro, from an empty folder to a submitted hackathon entry.

---

## HOW TO USE THIS PACK (read first)

1. **Create an empty folder** called `possessed` and open it in the Kiro IDE.
2. **Copy the `.kiro/` folder** from this pack into the project root. It contains 7 steering files and `settings/mcp.json`. Kiro reads them automatically, so every stage follows the same rules.
3. **Run the stages in order.** For each stage:
   - Open a new Kiro chat and switch to **Spec** mode (for Stage 0, use Vibe mode).
   - Paste the stage's prompt (the text inside the ``` block).
   - Review the generated `requirements.md` → approve → review `design.md` → approve → `tasks.md` → approve.
   - Run the tasks (click "Start task" on each, or ask Kiro to run all tasks).
   - Check the stage's **Definition of Done**. Don't move on until it passes.
   - Commit: `git add -A && git commit -m "stage N: ..."` and push.
4. **Set up the hooks** (Section H) right after Stage 0.
5. If Kiro goes off track, say: *"Stop. Re-read the steering files and the spec for this stage, then continue from task X."*
6. Keep a running log in `docs/KIRO_USAGE.md` of interesting Kiro moments (a spec that caught a bug, a hook that saved time, a property test that found an edge case). You need it for the write-up, which is judged.

### Suggested 9-day schedule
| Date (PKT) | Stages |
|---|---|
| Nov 26 | 0, H (hooks), 1 |
| Nov 27 | 2 |
| Nov 28 | 3 |
| Nov 29 | 4 |
| Nov 30 | 5, 6 |
| Dec 1 | 7 (**request your Kiro credits before Dec 2, 1:00 AM PKT**) |
| Dec 2 | 8, 9 |
| Dec 3 | 10, 11 |
| Dec 4 | 12: video, write-up, blog, submit. Deadline is **Dec 5, 3:00 AM PKT**, so submit on Dec 4 evening |

---

## STAGE 0: Project bootstrap (Vibe mode)

```
You are building "Possessed", a Kiroween 2026 hackathon project (Costume Contest category). Read ALL steering files in .kiro/steering/ before doing anything: product.md, tech.md, structure.md, accessibility-ethics.md, design-system.md, spirits.md, ai-layer.md. They are the source of truth.

Bootstrap the monorepo exactly as described in structure.md and tech.md:

1. Initialise git and a pnpm workspace (pnpm-workspace.yaml with packages/*, apps/*, workers/*).
2. Root package.json scripts: dev, dev:ext, build, test, test:e2e, lint, typecheck, format, worker:dev, worker:deploy (wire them to the right workspaces with pnpm --filter).
3. Shared tsconfig.base.json (strict, noUncheckedIndexedAccess, ES2022, moduleResolution bundler, DOM libs) and per-package tsconfig files extending it.
4. ESLint (flat config: typescript-eslint, eslint-plugin-jsx-a11y, react-hooks) and Prettier (single quotes, 100 cols, trailing commas).
5. Create the empty workspaces with a package.json and a src/index.ts placeholder each:
   - packages/core (library, Vite library mode, Vitest with happy-dom, fast-check installed)
   - apps/web (Vite + React 18 + TypeScript + Tailwind + Framer Motion + react-router)
   - apps/extension (Vite, Chrome MV3, React for the side panel)
   - workers/exorcist-ai (Cloudflare Worker with wrangler.toml, TypeScript, an [ai] binding named AI)
6. Install dependencies listed in tech.md: axe-core, dom-accessibility-api, culori, diff, @radix-ui/react-slider, @radix-ui/react-switch, @radix-ui/react-tabs, @radix-ui/react-dialog, framer-motion, vitest, fast-check, happy-dom, @playwright/test.
7. Tailwind config with the colour tokens, fonts and focus-ring style from design-system.md. Self-host the fonts IM Fell English SC, Inter and JetBrains Mono (download woff2 files into apps/web/src/assets/fonts and reference them with @font-face; reuse them in the extension).
8. Root files: MIT LICENSE (copyright "2026 <MY NAME>"), README.md stub with the tagline, .gitignore (node_modules, dist, .wrangler, playwright-report, test-results; do NOT ignore .kiro), .editorconfig, .nvmrc (20).
9. docs/ with empty KIRO_USAGE.md, ARCHITECTURE.md, VIDEO_SCRIPT.md.
10. A GitHub Actions workflow .github/workflows/ci.yml running install, lint, typecheck, test and build on push.
11. A Playwright config at the root with a "web" project pointing at the Vite dev server (http://localhost:5173).

Make sure `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm test` (with one trivial passing test in core) and `pnpm build` all succeed. Show me the final tree, then make the first commit: "chore: bootstrap possessed monorepo".
```

**Definition of Done:** all 5 commands pass; `.kiro/` is committed; the tree matches `structure.md`.

---

## STAGE 1: Haunted Hollow, the deliberately inaccessible demo store (Spec)

```
Create a spec named "haunted-hollow".

Build /haunted-hollow inside apps/web: a realistic, attractive-looking but DELIBERATELY INACCESSIBLE e-commerce store selling Halloween goods ("Haunted Hollow — Curiosities & Candles"). It is the test bed for everything else, so it must look professional to sighted mouse users while being full of real accessibility bugs.

Pages (client-side routes under /haunted-hollow): Home (hero, featured products grid, newsletter form), Product detail (/haunted-hollow/p/:slug), Cart drawer, Checkout form.

Plant AT LEAST 35 accessibility violations covering these axe rule ids, spread realistically across pages:
- image-alt (product photos with no alt; hero image whose filename is meaningless, e.g. "IMG_4821.jpg"), plus decorative divider images that SHOULD be alt=""
- button-name (icon-only buttons: cart, wishlist heart, close X, quantity +/-, search) using inline SVG icons without titles, plus classes like "icon-cart"
- link-name (social icon links, product image links with no text)
- color-contrast (light grey on white body copy, gold on cream prices, placeholder-only labels)
- label (newsletter email input and checkout fields with placeholder but no label)
- target-size (tiny 14px quantity buttons, cramped footer links)
- html-has-lang (missing lang on <html> for the haunted-hollow route: set it dynamically by removing it while mounted, and restore it on unmount)
- heading-order (h1 → h4 jumps), region/landmark issues (content outside landmarks), a div-based fake "button" with onclick and no role/tabindex
- autoplaying low-contrast carousel text, a select without a label, a "click here" link

Requirements:
- Every element carrying a planted bug gets a stable data-hh-id attribute (e.g. data-hh-id="hero-image").
- Create apps/web/src/haunted-hollow/planted-bugs.json listing every planted bug: { id, hhId, axeRule, page, description, expectedFix }.
- Use local product images (generate simple atmospheric SVG/PNG product illustrations: candles, potion bottles, skull planters, tarot decks, raven bookends; no copyrighted characters or brand logos). Give the files meaningless camera-style filenames.
- The store must look GOOD (moody, premium boutique style, using its own palette, distinct from Possessed's UI), so the contrast between how it looks and how it works is dramatic.
- Add a small fixed banner, which must itself be accessible: "Haunted Hollow is intentionally inaccessible. It's a demo for Possessed."
- Write a Playwright e2e test that loads each page, runs axe-core and asserts that at least 35 violations (counting nodes) exist and that every axeRule in planted-bugs.json appears. This test proves the haunting is real.

Do NOT fix any of the bugs. This stage is about breaking things on purpose, and this is the only place in the project where bad accessibility is allowed.
```

**Definition of Done:** the store looks polished; the e2e test passes, confirming every planted rule is detected.

---

## STAGE 2: Core host + spirit framework + Fog, Drain, Tunnel (Spec)

```
Create a spec named "spirit-framework". Follow .kiro/steering/spirits.md exactly.

In packages/core implement:

1. host/possessed-host.ts: PossessedHost, which creates a single <possessed-root> custom element appended to document.documentElement with an attached shadow root, CSS reset (:host { all: initial }), and z-index 2147483646. API: addLayer(id, element), removeLayer(id), getLayer(id), destroy(). The host is idempotent (a second create returns the same instance) and can be destroyed cleanly.
2. host/motion.ts: MotionPolicy, which reads prefers-reduced-motion (with a live listener) and a calmMode flag. Also flashGuard(fn, minIntervalMs = 400), a utility that guarantees an effect callback cannot fire more often than the interval (WCAG 2.3.1).
3. spirits/types.ts: the Spirit, SpiritContext and SpiritId types from the steering file.
4. spirits/registry.ts: SpiritRegistry, with register(spirit), get(id), possess(id, intensity), setIntensity(id, n), exorcise(id), exorciseAll(), and an onChange event emitter.
5. spirits/fog.ts: The Fog (backdrop-filter overlay).
6. spirits/drain.ts: The Drain with 4 modes (protanopia, deuteranopia, tritanopia, achromatopsia) and setMode(mode). The matrix is interpolated toward identity by intensity. It restores the previous inline filter on exorcise.
7. spirits/tunnel.ts: The Tunnel (radial-gradient overlay following the pointer with rAF; no listeners left behind after exorcise).
8. index.ts: export createPossession(doc, options), which returns { host, spirits: SpiritRegistry, destroy() } with all spirits registered.

Testing:
- Unit tests for each spirit: possess → overlay or filter present; setIntensity updates CSS variables; exorcise → no leftover nodes, listeners, styles or attributes.
- PROPERTY TEST (fast-check), reversibility.prop.test.ts: for a randomly generated DOM tree (arbitrary nested divs/spans/text/images with random inline styles) and any random sequence of possess/setIntensity/exorcise operations on fog/drain/tunnel, after exorciseAll() the serialised document (documentElement.outerHTML minus nothing) is identical to the original.
- PROPERTY TEST: drain matrix interpolation at intensity 0 equals the identity matrix and at 1 equals the mode matrix; every value stays within [0,1].

Also add a temporary dev page at apps/web/src/dev/spirits-playground.tsx (route /dev/spirits) that loads Haunted Hollow's home page and has simple buttons and sliders to toggle each spirit, so I can see them working.
```

**Definition of Done:** the three spirits are visibly working on `/dev/spirits`; the reversibility property test passes 100+ runs.

---

## STAGE 3: The Scramble + The Tremor + safety notice (Spec)

```
Create a spec named "scramble-and-tremor". Follow .kiro/steering/spirits.md and accessibility-ethics.md.

Implement in packages/core:

1. spirits/scramble.ts: The Scramble.
   - TreeWalker over visible text nodes with the skip-list from the steering file; never touch the possessed host.
   - Chunked processing with requestIdleCallback (setTimeout fallback); cap at 20,000 nodes.
   - A pure function scrambleWord(word, rng, intensity) in spirits/scramble-core.ts that swaps two interior letters OR applies a mirror confusion (b↔d, p↔q, m↔w, n↔u) while preserving the first and last letters, the length and the case pattern. Words shorter than 4 letters are untouched.
   - A tick loop with a minimum 400 ms interval per word (use flashGuard). Each tick re-scrambles a random subset from the ORIGINAL text, not from already-scrambled text.
   - A MutationObserver registers new text nodes (and ignores its own writes).
   - Under reduced motion or calm mode: scramble once, statically, with no ticking.
   - Exorcise restores every original text exactly and disconnects the observer.
2. spirits/tremor.ts: The Tremor.
   - A removable adopted stylesheet hiding the cursor (document.adoptedStyleSheets, with a <style> fallback).
   - A fake cursor element (an SVG arrow in bone colour with a subtle ectoplasm glow) in the shadow host.
   - A pure noise function tremorOffset(t, intensity, seed): the sum of 3 sines at 4–7 Hz plus a bounded random walk. Amplitude ranges from 2px (i=0.1) to 28px (i=1).
   - Capture-phase interception of pointerdown/mousedown/mouseup/click on window: stop the real event, compute the shaken point, elementFromPoint (ignoring the possessed host), and dispatch a synthetic click there with a WeakSet flag to prevent recursion.
   - When the intended target (under the real pointer) differs from the hit target, show a small "missed" puff animation at the hit point (a static marker under reduced motion) and emit a 'miss' event with both elements. Count misses.
   - Keyboard events are never touched.
   - Exorcise removes everything and restores normal clicking.
3. host/safety-notice.ts: a one-time accessible dialog shown before the first possession: "Possessed simulates visual and motor effects including blur, motion and shaking. Nothing flashes, but you can turn on Calm Mode to remove motion." Buttons: "Begin the séance", "Begin in Calm Mode". The choice is remembered via an injected StoragePort (in-memory default). Focus is trapped while open, and Escape cancels.

Tests:
- PROPERTY TEST scramble.prop.test.ts: for any string of words with punctuation and whitespace, scrambleText(text) preserves word count, each word's length, first and last letters, all whitespace and all punctuation, and is a permutation of the original letters per word (except mirror swaps, which are limited to the defined pairs).
- PROPERTY TEST tremor.prop.test.ts: |tremorOffset| ≤ maxAmplitude(intensity) for all t, intensity and seed; the amplitude is monotonic in intensity.
- Unit test: the tremor redirects a click to a neighbouring tiny button when the offset is forced; a keyboard Enter on a focused button still works.
- Extend the reversibility property test to include scramble and tremor.

Add both spirits to the /dev/spirits playground.
```

**Definition of Done:** text visibly scrambles without flashing; tiny Haunted Hollow buttons become hard to click under the Tremor; all property tests pass.

---

## STAGE 4: The Void, the screen-reader experience (Spec)

```
Create a spec named "the-void". Follow the "The Void" section of .kiro/steering/spirits.md precisely. This is the emotional centrepiece of the demo, so it must feel real and polished.

Implement in packages/core/src/spirits/void/:

1. a11y-tree.ts: buildReadingOrder(doc): VirtualNode[]
   - Walks the DOM in document order, skipping hidden content (display:none, visibility:hidden, aria-hidden=true, hidden attribute, the possessed host), and emits VirtualNodes: { el, role, name, kind: 'landmark'|'heading'|'link'|'button'|'control'|'image'|'list'|'text', level?, state?, focusable }.
   - Uses dom-accessibility-api's computeAccessibleName and getRole.
   - Images with no alt attribute fall back to the src filename (decoded, query string stripped), which is what many screen readers announce. alt="" images are skipped.
   - Merges adjacent inline text into readable text blocks (max 300 chars per block, split at sentence boundaries).
2. announcer.ts: announce(node): string, implementing the exact formats from the steering file ("Add to cart, button", "button", "IMG_4821.jpg, image", "Shipping, heading level 2", "Email, edit text, required", "list, 4 items", "navigation landmark"). It also flags `unnamed: boolean` for interactive nodes or images without a real name.
3. speech.ts: SpeechPort interface + BrowserSpeech implementation (speechSynthesis, cancel-before-speak, rate 1.15, pitch 0.9, prefer a local en-US/en-GB voice, handle voices loading asynchronously) + FakeSpeech for tests (records utterances).
4. navigator.ts: the virtual cursor with the key bindings from the steering file (↓ ↑ Tab Shift+Tab H B K Enter Space Esc A). Enter on a link or button activates the real element. Esc exits the Void (emits an 'exit' event; the registry exorcises the Void).
5. void.ts: The Void spirit.
   - An opaque overlay in the shadow host covering the viewport and capturing pointer events.
   - Centred caption area (large bone text, max-width 40ch) showing the current announcement with a slow 600 ms fade between items (no fade under reduced motion). The caption container is aria-hidden, because the real screen reader user, if any, should not get double speech; also provide an option to disable our speech when a real screen reader is detected via user setting.
   - Bottom HUD: "Unnamed elements heard: N", a key-hint row, and "Press Esc to leave the Void".
   - Autoplay mode (A): reads through the whole page with a 250 ms gap. This is used in the demo video.
   - Intensity: at < 0.5, show a dim, extremely blurred silhouette of the page behind the black (5% opacity); at ≥ 0.5, total black.
   - Onboarding line on first entry, spoken and shown: "Screen reader users navigate by listening. When a page has no labels, this is all they get."

Tests:
- Unit tests on fixture HTML: correct announcements for each kind, filename fallback for images, unnamed flags, hidden content skipped.
- Navigator test with FakeSpeech: ↓ sequence, H jumps to headings, Enter activates a link.
- Run buildReadingOrder on Haunted Hollow home in Playwright and assert that ≥ 10 unnamed interactive elements are reported.
- Extend the reversibility property test to include the Void.

Add the Void to /dev/spirits with an "Autoplay" button.
```

**Definition of Done:** entering the Void on Haunted Hollow produces the eerie "button… button… IMG_4821.jpg, image" experience with captions; Esc exits cleanly.

---

## STAGE 5: Audit, Possession Level and spirit coupling (Spec)

```
Create a spec named "audit-and-score".

Implement in packages/core/src/audit/:

1. axe.ts: runAudit(doc, options): Promise<AuditResult>
   - Runs axe-core in the page with runOnly tags [wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa], plus a separate best-practice pass reported as "lesser hauntings".
   - Excludes the possessed-root host.
   - Normalises results into Violation { id (rule), impact, description, helpUrl, wcag: string[], nodes: { selector, html, target: Element | null }[] }.
   - Supports scoping (re-audit only specific elements after a fix, for speed) and an AbortSignal.
2. score.ts: a pure function possessionLevel(violations): number (0..100)
   - Weights: critical 10, serious 6, moderate 3, minor 1. Each rule's node count is capped at 15 to avoid one rule dominating.
   - W = Σ weight × min(nodes, 15); level = round(100 × (1 − e^(−W/60))).
   - Also export breakdown() by impact and by spirit.
3. spirit-coupling.ts: intensitiesFromAudit(violations): Record<SpiritId, number>, using the mapping table in spirits.md. Any spirit with no related violations gets 0 ("banished").
4. An "auto mode" in createPossession: audit → set every spirit's default intensity from the audit → the user can override per spirit. Re-audits update the intensities with a smooth 600 ms transition (instant under reduced motion).
5. An event bus (exorcism/events.ts): typed events audit:start, audit:done, level:change, spirit:intensity, spirit:banished.

Tests:
- PROPERTY TESTS score.prop.test.ts: the level is always in [0,100]; an empty input gives 0; adding any violation never decreases the level (monotonic); removing a violation never increases it; the level is invariant to the order of violations.
- PROPERTY TEST: intensitiesFromAudit always returns values in [0,1] for all six spirits.
- Playwright: Haunted Hollow home scores ≥ 70% possessed; a clean fixture page scores 0–5%.

Add the possession meter and audit summary to the /dev/spirits playground.
```

**Definition of Done:** Haunted Hollow shows a high Possession Level; spirit intensities auto-set from real violations.

---

## STAGE 6: Rule-based fixers + the contrast algorithm (Spec)

```
Create a spec named "rule-fixers".

Implement in packages/core/src/fixers/ and packages/core/src/color/:

1. fixers/types.ts:
   Fixer { id, handles: string[] (axe rule ids), canFix(node): boolean, fix(node, ctx): Promise<FixResult> }
   FixResult { ruleId, selector, hhId?, before: string (outerHTML snapshot, truncated to 2,000 chars), after: string, source: 'rule'|'on-device'|'cloud'|'heuristic'|'prebaked', needsReview: boolean, note?: string, undo: () => void }
2. fixers/registry.ts: FixerRegistry, which maps rule ids to fixers. Unknown rules go to the report-only fixer.
3. color/contrast-math.ts: relative luminance and contrast ratio per WCAG 2.x (sRGB linearisation with the 0.04045 threshold); parse any CSS colour via culori, including alpha. Effective background resolution walks ancestors, alpha-compositing semi-transparent backgrounds over white as the final fallback. Background images and gradients → unresolvable.
4. color/adjust.ts: fixContrast(fg, bg, target): Colour
   - Convert fg to OKLCH. Binary-search lightness (toward black if bg is light, toward white if bg is dark) until the ratio ≥ target + 0.05 margin, keeping hue and reducing chroma only if needed to stay in gamut.
   - If unreachable, return pure black or white, whichever gives a higher ratio.
5. fixers/contrast.ts: handles color-contrast. Target 4.5, or 3.0 for large text (≥ 24px, or ≥ 18.66px with weight ≥ 700). Sets an inline color with !important via style.setProperty(..., 'important'), remembering the previous value for undo. An unresolvable background gives needsReview with a note.
6. fixers/form-label.ts: handles label and select-name. Derives a name from placeholder → name/id attribute (humanised: "first_name" → "First name") → nearby text. Prefers adding aria-label. needsReview is true when derived only from name/id.
7. fixers/html-lang.ts: handles html-has-lang and valid-lang. Uses Chrome's LanguageDetector API if present on the page's main text, else 'en'. needsReview: true.
8. fixers/target-size.ts: handles target-size. Sets min-width/min-height 24px, inline-flex centring, and padding, without breaking layout where possible. Records originals for undo.
9. fixers/report-only.ts: for heading-order, region, landmark-*, and any rule we do not auto-fix. No DOM change; FixResult with source 'rule', needsReview: true and a helpful note with the WCAG link. These are "spirits that need a human exorcist".
10. Fake-button fix: a div with onclick and no role gets role="button", tabindex="0" and an Enter/Space key handler that forwards to click; needsReview: true.

Tests:
- PROPERTY TEST contrast.prop.test.ts (the key one for judges): for ANY random fg/bg pair (random sRGB colours, random alpha for bg ≥ 0.5 composited on white) and target ∈ {3, 4.5, 7}, contrast(fixContrast(fg,bg,target), bg) ≥ target. If the fg chroma > 0.02 and the result is not pure black/white, the hue difference is < 10°.
- PROPERTY TEST: applying then undoing any fixer restores the element's outerHTML exactly.
- Unit tests for each fixer on fixtures.
- Playwright: run all rule fixers on Haunted Hollow; color-contrast, label, target-size and html-has-lang violations drop to 0 on the home page.
```

**Definition of Done:** the contrast property test passes thousands of runs; rule fixers visibly repair Haunted Hollow.

---

## STAGE 7: The free AI layer + Cloudflare Worker + AI fixers (Spec)

```
Create a spec named "free-ai-layer". Follow .kiro/steering/ai-layer.md exactly. The total running cost must be $0.

1. packages/core/src/ai/types.ts: AiProvider { id; available(): Promise<boolean>; describeImage(img: PreparedImage, context: string): Promise<AiAnswer | null>; nameElement(html: string, context: string): Promise<AiAnswer | null> }. AiAnswer { text: string; decorative?: boolean; source }.
2. ai/prompts.ts: the two prompts from the steering file, plus a postProcess() function implementing every post-processing rule.
3. ai/image-prep.ts: fetches an image (with an injected fetch port), downscales to ≤ 512px on OffscreenCanvas, outputs a JPEG Blob and base64, and computes a sha256 hash. Returns null on CORS/size failures.
4. ai/cache.ts: CachePort with MemoryCache, IndexedDbCache (web) and an adapter interface for chrome.storage.local (implemented in the extension).
5. ai/providers/prebaked.ts: loads a JSON map by data-hh-id.
6. ai/providers/on-device.ts: Chrome Prompt API (LanguageModel) provider:
   - availability() handling for all 4 states; a downloadModel(onProgress) helper using the monitor option.
   - One base session per task type with the system prompt; clone() per request; a 20 s timeout via AbortSignal; destroy on idle (60 s).
   - Feature-detects at runtime and never throws when LanguageModel is undefined.
7. ai/providers/cloud.ts: calls the Worker endpoints with a 15 s timeout. A 429 marks the provider as exhausted for 10 minutes.
8. ai/providers/heuristic.ts: all the heuristics in the steering file, including an icon-name dictionary (cart, bag, heart/wishlist, close/x, search/magnifier, menu/hamburger, plus/minus, trash, user/account, share, twitter/x, instagram, facebook, youtube, chevron-left/right → Previous/Next) and filename humanisation ("red_running-shoes_02.jpg" → "Red running shoes").
9. ai/describe.ts: TieredAi, which runs cache → prebaked → on-device → cloud → heuristic, rejects generic answers and falls through, stores successful answers in the cache, and reports which tier answered. It's configurable: tiers can be disabled (e.g. cloud opt-out).
10. fixers/image-alt.ts (image-alt, role-img-alt, input-image-alt) and fixers/accessible-name.ts (button-name, link-name, input-button-name, aria-command-name, aria-input-field-name): build the context (nearest heading, figcaption, parent link text, page title, surrounding text up to 600 chars), call TieredAi, apply alt / aria-label, and return a FixResult with the source and needsReview: true.
11. workers/exorcist-ai: the Cloudflare Worker with POST /describe-image, POST /name-element and GET /health, exactly as specified in the steering file. Includes request validation, body size limit, CORS, a daily cap via a KV namespace counter (keyed by UTC date) with graceful 429, and the postProcess logic (import shared prompts from core via a relative path, or duplicate a tiny copy with a test ensuring they stay identical). Write a README section on deploying with `wrangler deploy`, including any one-time model licence acceptance step if Workers AI requires it.
12. Generate apps/web/public/prebaked/haunted-hollow.json: write a script scripts/generate-prebaked.ts that runs the tiered AI (cloud enabled) over every Haunted Hollow image and unnamed control and saves the answers keyed by data-hh-id. Then MANUALLY review the outputs (show them to me in a table) so the demo shows high-quality fixes.

Tests:
- Unit tests for each provider with fakes (no network in unit tests).
- PROPERTY TEST: postProcess output is always ≤ the length limit, never empty, never starts with "image of"/"picture of" (case-insensitive), and never equals a generic word.
- PROPERTY TEST: TieredAi always returns an answer (the heuristic is total) when all other tiers fail randomly.
- Worker tests with vitest-environment miniflare or unstable_dev, using a mocked AI binding.
```

**Definition of Done:** with Wi-Fi off, Haunted Hollow still gets good alt text (prebaked); on a capable machine, the on-device tier answers; the Worker is deployed and answers `/health`.

---

## STAGE 8: The Exorcism ritual + cleansing animation + Grimoire (Spec)

```
Create a spec named "exorcism-and-grimoire". This is the climax of the demo, so it must look stunning and feel satisfying.

1. packages/core/src/exorcism/orchestrator.ts: Exorcism
   - Takes the latest AuditResult, groups violations, orders them for drama and value: critical → serious → moderate → minor; within the same impact, Void-related first, because the payoff is audible.
   - Runs fixes sequentially with a configurable pacing delay (default 350 ms; 0 under "fast mode"; tests use 0), emitting events: exorcism:start {total}, fix:start {node}, fix:done {FixResult}, fix:failed {error}, exorcism:progress {done,total,level}, exorcism:done {summary}.
   - After each batch of 5 fixes, re-audits the affected scope and updates the Possession Level and spirit intensities live, so the spirits weaken as you watch.
   - Supports pause, resume, cancel (AbortSignal) and undoAll(), which reverts every fix in reverse order.
   - When the Void is active during an exorcism, it re-reads the fixed element after each fix (e.g. "Add to cart, button" where it used to just say "button"). Make this an option on by default.
2. host/cleansing.ts: the cleansing effect from design-system.md. A canvas layer in the shadow host spawns ≤ 40 ectoplasm particles rising from the fixed element's bounding rect over 900 ms, plus a 2px ectoplasm outline pulse on the element (drawn as an overlay rect, NOT by changing the element's styles). Under reduced motion: a static outline for 600 ms. Scroll the element into view smoothly before each fix (instantly under reduced motion) when "follow the ritual" is on.
3. Banished-spirit moment: when a spirit's intensity reaches 0, show a short, elegant toast "The Tremor has been banished" and fade its overlay out.
4. packages/core/src/grimoire/:
   - report.ts: build a Grimoire { url, title, startedAt, finishedAt, levelBefore, levelAfter, fixes: FixResult[], unresolved: Violation[], stats by source and impact }.
   - export-markdown.ts: a readable Markdown report with a summary table, then per fix: rule, WCAG criteria, selector, source badge, a ```diff block with the before/after HTML (jsdiff createTwoFilesPatch, trimmed to the changed attributes when possible) and the review flag. It ends with an honest disclaimer: "Automated testing finds only some accessibility issues. Test with real assistive technology and disabled users."
   - export-json.ts: a machine-readable export.
5. Possessed's own UI never claims "100% accessible". At 0% it says: "No spirits detected by automated checks. Now invite a human exorcist: test with a real screen reader."

Tests:
- Orchestrator unit tests with fake fixers: event order, pause/resume, cancel mid-run, undoAll restores the DOM exactly (PROPERTY TEST with random fix sequences).
- Playwright on Haunted Hollow with the prebaked tier only: the full exorcism reduces axe serious+critical node count by ≥ 85%, the possession level drops below 25%, and the Grimoire Markdown contains an entry for every planted bug that has an expectedFix.
```

**Definition of Done:** clicking "Exorcise" on Haunted Hollow plays a satisfying ritual, the meter falls, spirits get banished, and the Grimoire exports correctly.

---

## STAGE 9: The Chrome extension, Séance Console (Spec)

```
Create a spec named "chrome-extension". Build apps/extension as a polished Chrome MV3 extension using packages/core.

1. manifest.json (MV3):
   - name "Possessed — Accessibility Séance", short description, self-made icons (16/32/48/128): an original abstract glyph, an eye inside a candle flame, in ectoplasm on void.
   - permissions: activeTab, scripting, storage, sidePanel, offscreen. host_permissions: none by default; optional_host_permissions: ["<all_urls>"], requested at runtime only when the user enables "Fetch images for AI descriptions".
   - side_panel default_path; action opens the side panel; commands: Alt+Shift+P toggles possession, Alt+Shift+V enters the Void, Alt+Shift+E starts an exorcism.
   - A strict CSP for extension pages. No remote code.
2. service-worker.ts: message router between the side panel, content script and offscreen document; injects the content script into the active tab with chrome.scripting on demand; manages the offscreen document lifecycle; implements the chrome.storage.local CachePort; performs image fetches for image-prep when permission is granted.
3. content.ts: bundles packages/core, creates the possession in the page, and bridges events to the side panel over a long-lived port. Cleans up completely when the tab navigates or the panel closes ("exorcise all on disconnect" is a setting, default on).
4. offscreen/: hosts the on-device AI provider. FIRST, verify whether LanguageModel is exposed in the offscreen document, side panel and service worker contexts on current Chrome Stable. Choose the best context, document the finding in docs/ARCHITECTURE.md and implement there. If it is not available in any context, use the side panel page.
5. sidepanel/ (React): the Séance Console, styled per design-system.md:
   - Header: Possessed wordmark (IM Fell English SC), the current site's hostname, a settings gear.
   - The Possession Meter (big, animated, accessible meter role) + "Last audit: N violations across M rules" + "Summon audit" button.
   - Six Spirit Cards (glyph, name, condition note, switch, intensity slider, linked-violation count, "Auto" badge when intensity comes from the audit). Drain has a mode selector.
   - A large "Begin Exorcism" button → progress UI with Pause, Cancel and Undo all, plus a live feed of fixes (each row: sigil, rule, source badge, text like "Named: 'Add to cart'").
   - Grimoire tab: the fix list with expandable diffs, filters (source, needs review, impact), and Copy Markdown / Download .md / Download .json buttons.
   - Settings: Calm Mode, sound on/off, AI tiers (on-device: status + "Download model" button with progress; cloud fallback toggle with a privacy explanation; heuristic always on), the Void voice selection and rate, exorcism pacing (cinematic / normal / fast).
   - About: the ethics statement, W3C WAI links, "This is a simulation, not lived experience", credits, version.
   - Fully keyboard accessible, live-region announcements, and it passes its own audit.
6. Empty and error states with personality ("This page resists the séance. Chrome pages can't be possessed." for chrome:// URLs and the Web Store).

Tests:
- Playwright with a persistent context loading the unpacked extension (headless=new or headed in CI as needed): open Haunted Hollow, trigger possession via the service worker message, assert the overlay exists, run an exorcism with the prebaked tier, and assert the level drops.
- Unit tests for the message router.
- docs/INSTALL_EXTENSION.md: how judges load the unpacked extension from the GitHub Release zip (chrome://extensions → Developer mode → Load unpacked). Add a `pnpm package:ext` script producing possessed-extension.zip.
```

**Definition of Done:** the extension installs unpacked, possesses any normal site, the Void works, and the exorcism + Grimoire work end to end.

---

## STAGE 10: Web app (landing + in-browser Séance + bookmarklet) + deploy (Spec)

```
Create a spec named "web-app-and-launch". Build the public face of Possessed in apps/web. It's what judges open first, so it must be gorgeous, fast and accessible.

1. Landing page "/":
   - Hero: a dark, atmospheric opener. The first thing visible is a black panel with a single line of caption text, and a "▶ Hear what a screen reader hears" button. Pressing it plays the Void autoplay over a mini Haunted Hollow product card ("Button. Button. IMG_4821.jpg, image."), then the tagline fades in: "Your website is haunted by the barriers you built." Never autoplay sound.
   - CTA buttons: "Possess the demo store" → /seance, "Get the extension" → the GitHub Release, "View on GitHub".
   - "Meet the spirits": 6 cards with the original glyphs, each showing a tiny live preview of its effect on a sample snippet on hover/focus (respecting reduced motion), plus the respectful condition note.
   - "The Exorcism": a short scroll-driven explanation of audit → fix → Grimoire, with a real exported Grimoire snippet.
   - "AI that costs nothing and stays on your machine": explains the 3 tiers (on-device first, free cloud fallback, honest heuristics) with source badges.
   - "Built with Kiro": specs, steering, hooks, property-based tests and MCP, with links to the .kiro folder on GitHub.
   - Ethics statement section + footer (MIT license, credits, WAI resources).
   - Lighthouse accessibility 100, performance ≥ 90.
2. "/seance": the no-install judge experience.
   - Split layout: Haunted Hollow in a same-origin iframe (/haunted-hollow) on the left (or top on mobile) and the same Séance Console components as the extension on the right (extract the shared React components into packages/ui OR apps/web/src/console reused by the extension via a path alias; choose the cleaner option and document it).
   - createPossession runs against the iframe's document. Cloud AI is enabled by default here, prebaked is always first, and on-device is used when available.
   - A guided "Ritual tour" mode with 5 steps (Fog → Drain → Tremor → Void → Exorcise) and coach marks, for judges who just click Next.
3. "/grimoire/demo": a beautiful read-only rendering of a sample Grimoire.
4. Bookmarklet: public/bookmarklet.js, a self-contained possession-only bundle (no AI, no exorcism: spirits + audit + meter in a floating shadow-DOM mini panel). A landing section lets users drag "🕯️ Possess" to the bookmarks bar. Note that sites with a strict CSP may block it, and point to the extension instead.
5. SEO and share: title, description, and an Open Graph image (designed SVG → PNG at build time).
6. Deploy to Cloudflare Pages (or Vercel). Add the deployed URL to README and wrangler/CORS allow-lists. Make sure client routes work on refresh (SPA fallback).

Tests:
- Playwright: landing loads, the hero Void demo plays captions; /seance tour completes and the exorcism reduces the level; the bookmarklet bundle loads on a test page.
- "Self-exorcism" e2e test: run Possessed's own audit on "/", "/seance" (console side only) and "/grimoire/demo" → 0 serious/critical violations.
```

**Definition of Done:** the public URL works in a fresh incognito window; the judge tour works in under 2 minutes; self-exorcism passes.

---

## STAGE 11: Hardening on real sites + polish (Spec)

```
Create a spec named "hardening-and-polish".

1. Real-world test pass: using the Playwright MCP server, open 10 diverse public sites (a news site, a government site, a docs site, an e-commerce site, a SPA, a site with heavy iframes, a site with a strict CSP, a very long page, a site in a right-to-left language, and a site with shadow DOM components). For each, possess with all spirits, run the audit and an exorcism with heuristics only. Record crashes, layout breakage, performance (time to possess, audit duration) and leftovers after exorcise in docs/REAL_WORLD_TESTS.md. Fix every crash and leftover.
2. Performance: possession start < 300 ms on the Haunted Hollow home page; audit < 3 s on a 2,000-element page; no long tasks > 200 ms during the Scramble (use chunking). Add a small perf benchmark script.
3. Edge cases: iframes (audit the top document; note that cross-origin frames are skipped), shadow DOM in host pages (traverse open shadow roots in the a11y tree and the scramble walker), RTL text in the Scramble (operate on grapheme clusters via Intl.Segmenter), pages that replace <body>, SPA navigations (the content script detects URL changes and offers to re-audit).
4. Visual polish pass across extension and web: consistent spacing scale, focus rings, empty states, loading skeletons with a subtle candle shimmer (static under reduced motion), microcopy per design-system.md voice. Take screenshots of every screen into docs/screenshots/.
5. Accessibility of Possessed itself: keyboard-only walkthrough of every screen; test with a real screen reader (NVDA on Windows or VoiceOver on Mac) and log the findings; fix all issues.
6. Error handling: every async path has a timeout and a friendly message; no unhandled promise rejections (add a global handler in dev that fails tests).
7. Run the full test suite and CI; make everything green.
```

**Definition of Done:** CI is green, there are 10 documented real-site tests, there are no leftovers after exorcise, and screenshots are captured.

---

## STAGE 12: Submission package (Vibe mode)

```
Prepare the Kiroween 2026 submission. Read product.md again.

1. README.md (excellent, judge-facing):
   - Hero banner image + tagline + badges (license MIT, CI).
   - "Try it in 60 seconds": the live URL (/seance tour) and the extension install steps from the Release zip.
   - A GIF/screenshot of each spirit, the Void captions and an exorcism.
   - How it works (architecture diagram as a Mermaid flowchart: page → core (spirits, audit, fixers, tiered AI) → extension/web shells → Worker).
   - The free AI tiers and privacy.
   - Ethics statement.
   - Built with Kiro (a short summary linking to docs/KIRO_USAGE.md).
   - Local development commands, tests, project structure, license, credits.
   - An honest limitations section.
2. docs/KIRO_USAGE.md: the "How we used Kiro" write-up, which is judged. Structure it as:
   - Spec-driven development: list every spec in .kiro/specs, with one concrete example where the requirements/design phase changed the implementation (pick real examples from my log).
   - Steering: each of the 7 steering files, its inclusion mode (always vs fileMatch) and why; an example of steering keeping the ethics/design consistent.
   - Agent hooks: each hook, its trigger and a moment it caught a problem.
   - Property-based testing: list all property tests and the invariant each protects; highlight any bug fast-check found (with the shrunk counterexample).
   - MCP: how the Playwright MCP server was used for the visual verification and the real-world test pass.
   - Vibe vs Spec: when we used each and why.
   - Any use of other Kiro surfaces (CLI, Web, Kiro Crew, custom agents, powers): describe honestly only what we actually used.
   - Metrics: number of specs, tasks completed, tests, property-test runs, lines of code.
3. docs/VIDEO_SCRIPT.md: a 2:50 script with timestamps, voiceover lines and shot list:
   0:00–0:15 black screen, Void autoplay audio "Button. Button. IMG_4821.jpg, image. Link." Caption: "This is how a screen reader user can experience a page with no labels."
   0:15–0:30 reveal Haunted Hollow looking beautiful; title card "POSSESSED".
   0:30–1:20 summon the spirits: Fog, Drain (switch modes), Tunnel, Scramble, Tremor (show misses on tiny buttons), with the meter at ~80%.
   1:20–2:10 the Exorcism: the ritual plays, wisps, spirits banished, the Void now reads "Add to cart, button." The meter drops to ~15%.
   2:10–2:30 the Grimoire diffs + source badges (on-device 🔒).
   2:30–2:45 built with Kiro: a quick montage of .kiro specs, a hook firing, a property test run.
   2:45–2:50 tagline + URL.
   Note: use only royalty-free or self-made audio; no trademarks or third-party music.
4. docs/DEVPOST_SUBMISSION.md: ready-to-paste text for the Devpost fields: Inspiration, What it does, How we built it, Challenges, Accomplishments, What we learned, What's next; category = Costume Contest; the list of bonus prizes to enter (Blog, Social Blitz, plus Student/Startup if eligible).
5. docs/BLOG_POST.md: a ~1,000-word blog post draft for dev.to or Medium titled "I built a ghost that haunts inaccessible websites (with Kiro)". It must mention it was written for the Kiroween Hackathon 2026.
6. A social post draft starting with #KiroweenHackathon26 that shares my favourite thing about Kiro.
7. Create a GitHub Release v1.0.0 with possessed-extension.zip attached (give me the exact gh CLI commands).
8. Final checklist: verify the LICENSE shows in the GitHub About section (set the repo's license detection and About description/website/topics with gh commands), .kiro is committed and not ignored, the live URL works in incognito, the extension zip installs, and judges can test for free.
```

**Definition of Done:** everything submitted on Devpost before **Dec 4, 2:00 PM PT (Dec 5, 3:00 AM PKT)**. Aim for Dec 4 evening PKT.

---

## SECTION H: Agent hooks (set up right after Stage 0)

In the Kiro panel → **Agent Hooks** → **+** → ask Kiro to create each hook by pasting the description. Kiro saves them as JSON in `.kiro/hooks/`, which judges will see.

**H1: Test on save (core)**
```
Create a hook named "test-core-on-save". Trigger: after a file is saved under packages/core/src/ (exclude *.test.ts files). Action: run the Vitest tests related to the changed file (vitest related <file> --run). If any fail, tell the agent to fix them before continuing.
```

**H2: Property tests guard (algorithms)**
```
Create a hook named "property-guard". Trigger: after saving any file in packages/core/src/color/, packages/core/src/audit/score.ts, packages/core/src/spirits/scramble-core.ts or packages/core/src/ai/prompts.ts. Action: run the matching *.prop.test.ts files with fast-check numRuns=1000 and report any counterexample to the agent with the shrunk input.
```

**H3: Ethics and copy review**
```
Create a hook named "ethics-copy-review". Trigger: after saving any .tsx file in apps/ or any .md file in docs/ or README.md. Action (agent prompt): "Review user-facing text in the changed file against .kiro/steering/accessibility-ethics.md. Flag and fix any language that portrays disabled people as monsters, victims or scary, or uses banned phrases. Keep spooky language aimed at barriers only."
```

**H4: Self-exorcism (our own a11y)**
```
Create a hook named "self-exorcism". Trigger: after saving a component file in apps/web/src/ or apps/extension/src/sidepanel/. Action: run the Playwright self-exorcism test (axe on Possessed's own UI) and ask the agent to fix any serious or critical violations it introduces.
```

**H5: New spirit or fixer scaffolder**
```
Create a hook named "scaffold-new-fixer". Trigger: when a new file is created in packages/core/src/fixers/ or packages/core/src/spirits/. Action (agent prompt): "Scaffold the file to match the contract in .kiro/steering/spirits.md or fixers/types.ts, register it in the matching registry, and create a test file plus an undo/reversibility property test for it."
```

**H6: Kiro usage logger**
```
Create a hook named "kiro-usage-log". Trigger: when the agent finishes a task (Stop). Action (agent prompt): "Append one dated bullet to docs/KIRO_USAGE.md describing what was just built and which Kiro feature (spec, steering, hook, MCP, property test) helped most and how. Keep it under 40 words."
```

---

## RESCUE PROMPTS (when things go wrong)

**Behind schedule: cut scope safely**
```
We are behind schedule. Re-read product.md. Cut scope in this order until we fit: (1) bookmarklet, (2) sound, (3) the Drain's tritanopia/achromatopsia modes, (4) the ritual tour coach marks, (5) target-size fixer. NEVER cut: the Void, the exorcism, the Grimoire, Haunted Hollow, /seance, prebaked AI, property tests, the ethics framing. Update the specs' tasks.md to mark cut items as "deferred" and continue.
```

**Kiro produced broken or tangled code**
```
Stop. Run pnpm typecheck, pnpm lint and pnpm test and show me all errors. Re-read .kiro/steering/tech.md rules 1–4. Fix errors one at a time, smallest change first, re-running tests after each. Do not rewrite working modules.
```

**On-device AI not available on my machine**
```
LanguageModel is unavailable on this machine. Make sure TieredAi skips it gracefully, the UI shows "On-device AI unavailable on this device (needs more GPU/RAM). Using free cloud fallback.", and that the prebaked and cloud tiers keep the demo fully working. Add a test for this path.
```

**Before recording the video**
```
Prepare demo mode: add a ?demo=1 URL flag on /seance that uses only the prebaked AI tier, sets exorcism pacing to "cinematic", enlarges captions by 25%, hides dev UI, and seeds a fixed random seed for the Scramble and Tremor so takes are repeatable.
```
