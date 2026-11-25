---
inclusion: always
---

# Tech stack and engineering rules

## Stack
- **Language:** TypeScript 5.x, `strict: true`, `noUncheckedIndexedAccess: true`. No `any` without a comment explaining why.
- **Monorepo:** pnpm workspaces. Node 20+.
- **Build:** Vite for apps and the library. The extension is built with Vite (multi-entry) or `@crxjs/vite-plugin` if it works cleanly with MV3.
- **UI:** React 18 + Tailwind CSS + Framer Motion. Radix UI primitives for accessible controls (slider, switch, tabs, dialog).
- **Accessibility engine:** `axe-core` (runs in page context).
- **Accessible names/roles:** `dom-accessibility-api` (`computeAccessibleName`, `getRole`).
- **Diffs:** `diff` (jsdiff) for the Grimoire.
- **Colour math:** `culori` (OKLCH conversion, WCAG contrast).
- **Testing:** Vitest + jsdom/happy-dom for unit tests. **fast-check** for property-based tests. Playwright for e2e (web app and the extension loaded via a persistent context).
- **Cloud AI fallback:** Cloudflare Worker (`wrangler`) with the Workers AI binding, model `@cf/meta/llama-3.2-11b-vision-instruct` for images and a small text model for labels. Free tier only.
- **On-device AI:** Chrome built-in Prompt API (`LanguageModel`, Gemini Nano) with image input.
- **Hosting:** Web app on Cloudflare Pages / Vercel / Netlify free tier.
- **Lint/format:** ESLint (typescript-eslint, jsx-a11y, react-hooks) + Prettier.

## Engineering rules
1. **Core is framework-agnostic.** `packages/core` has no React and no `chrome.*` APIs. It works on any `Document`. Extension and web app are thin shells.
2. **Never pollute the host page.** All Possessed UI injected into pages lives inside a single Shadow DOM host `<possessed-root>` (closed styles, `all: initial`). Exclude this host from axe runs, text walkers and accessibility trees.
3. **Everything reversible.** Every spirit and fixer records what it changed and can restore it exactly. Use `WeakMap`/`Map` registries, not DOM attributes on host elements, unless the fix itself is an attribute.
4. **Ports, not hardcoding.** AI providers, speech and storage go behind interfaces so tests can inject fakes.
5. **Performance budgets:** possession start < 300 ms on a typical page. Overlays use `requestAnimationFrame`, never `setInterval` faster than 60 fps. Text walkers cap at 20,000 text nodes and process in idle chunks (`requestIdleCallback` with a fallback).
6. **Safety:** No visual effect may flash more than 3 times per second (WCAG 2.3.1). All motion honours `prefers-reduced-motion` and a global "calm mode" toggle. Show a one-time photosensitivity/motion notice before the first possession.
7. **Privacy:** Never send page content to the cloud without the user opting in (setting: "Allow cloud AI fallback", default ON for the web demo and OFF→prompt in the extension). On-device AI is always preferred.
8. **Tests are part of done.** Every task adds or updates tests. Property-based tests for every pure algorithm (contrast fixer, scoring, scramble invariants, reversibility, message splitting).
9. **Small commits.** One logical change per commit, conventional commit messages (`feat(core): add the drain spirit`).
10. **Secrets:** No API keys in the repo or the extension bundle. The Cloudflare Worker uses its own binding and needs no key.

## Commands (keep these working)
- `pnpm install`
- `pnpm dev`: runs the web app (landing + Haunted Hollow + Séance)
- `pnpm dev:ext`: builds the extension in watch mode to `apps/extension/dist`
- `pnpm test`: all unit and property tests
- `pnpm test:e2e`: Playwright
- `pnpm lint` / `pnpm typecheck`
- `pnpm build`: builds everything
- `pnpm worker:dev` / `pnpm worker:deploy`: Cloudflare Worker
