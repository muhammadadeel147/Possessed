---
inclusion: fileMatch
fileMatchPattern: ["packages/core/src/ai/**", "packages/core/src/fixers/image-alt.ts", "packages/core/src/fixers/accessible-name.ts", "apps/extension/src/offscreen/**", "workers/**"]
---

# AI layer: free, tiered, honest

The AI is used for exactly two tasks:
1. `describeImage(image, context)` → alt text (or `""` if decorative)
2. `nameElement(elementSnapshot, context)` → an accessible name for an unlabeled button/link/control

## Tier order (first success wins)
0. **Cache**: keyed by `sha256(imageBytes)` or `sha256(normalisedOuterHTML + context)`. The extension stores in `chrome.storage.local`, the web app in IndexedDB, with an in-memory fallback.
1. **Prebaked**: `apps/web/public/prebaked/haunted-hollow.json`, keyed by a stable `data-hh-id` attribute on Haunted Hollow elements. This guarantees the judges' demo works with zero AI.
2. **On-device**: Chrome built-in Prompt API (`LanguageModel`, Gemini Nano).
   - Check `await LanguageModel.availability()` → `'available' | 'downloadable' | 'downloading' | 'unavailable'`. Only use it when `'available'`. Offer a "Download on-device AI" button for `'downloadable'` and show progress via the `monitor` option.
   - Create: `LanguageModel.create({ expectedInputs: [{ type: 'image' }], expectedOutputs: [{ type: 'text', languages: ['en'] }] })`.
   - In the extension, run it in an extension page (offscreen document or side panel), NOT the content script. First verify which contexts expose `LanguageModel` and write the finding into `docs/ARCHITECTURE.md`.
   - Reuse one session per task type. Use `session.clone()` per request to avoid context build-up. Destroy it on idle.
3. **Cloud**: `workers/exorcist-ai` Cloudflare Worker (free tier, 10,000 neurons/day).
   - `POST /describe-image` `{ imageBase64: string (JPEG ≤ 512px longest side), context: string ≤ 600 chars }` → `{ text, decorative: boolean }`
   - `POST /name-element` `{ html: string ≤ 1500 chars, context: string ≤ 600 chars }` → `{ name }`
   - Vision model: `@cf/meta/llama-3.2-11b-vision-instruct`. If Workers AI returns a licence-acceptance error, follow Cloudflare's model page instructions (a one-time `"agree"` prompt) and document it in the README.
   - Text model: a small instruct model (≤ 8B) from the Workers AI catalogue. Pick one available on the free plan.
   - CORS: allow the web app origin and `chrome-extension://*`. Body size limit 1 MB. Global daily cap (e.g. 800 calls) using a KV counter or Durable Object. Beyond the cap, return 429 so the client falls to the heuristic tier.
   - Cloud is opt-in in the extension (setting), on by default in the web demo.
4. **Heuristic**: no AI.
   - Image: filename/`title`/`figcaption`/nearby heading → "Red running shoes". Tracking pixels and images ≤ 16px → decorative.
   - Element: `title`, `aria-describedby` text, `data-*` hints, icon class names (`icon-cart`, `fa-trash`, `material-icons` text, SVG `<title>`, `use[href*=cart]`), `href` path segments.
   - Always `needsReview: true`.

## Prompts (keep in `prompts.ts`, shared by on-device and cloud)
Alt text:
```
You write alt text for web accessibility.
Rules: one sentence, under 125 characters, no "image of"/"picture of", describe purpose and essential content.
If the image is purely decorative, answer exactly: DECORATIVE
If the image is inside a link or button, describe the destination or action instead.
Page context: {context}
```
Element name:
```
You name unlabeled interactive web elements for screen reader users.
Return ONLY the name, max 40 characters, no quotes.
Buttons: start with a verb ("Add to cart", "Open menu"). Links: name the destination.
Element HTML: {html}
Nearby text: {context}
```

## Post-processing (always, any tier)
- Trim, strip quotes, remove leading "image of"/"picture of"/"an image showing".
- Enforce length limits (truncate at a word boundary).
- Reject empty or generic outputs ("button", "image", "link", "click here") → fall through to the next tier.
- Attach `source` and `needsReview` (`true` for heuristic and cloud, `false` only for rule fixes). On-device output is also `needsReview: true`, because AI output always needs human review.

## Image preparation
Fetch the image (extension service worker has host permissions; the web app uses same-origin), draw to `OffscreenCanvas`, downscale to ≤ 512px, export JPEG quality 0.8. Skip SVG data URIs > 200 KB and anything that fails CORS. Those go straight to the heuristic tier.
