---
inclusion: always
---

# Repository structure

```
possessed/
├── .kiro/
│   ├── steering/            product, tech, structure, accessibility-ethics, design-system, spirits, ai-layer
│   ├── specs/               one folder per stage/feature (requirements.md, design.md, tasks.md)
│   ├── hooks/               agent hooks (JSON)
│   └── settings/mcp.json    MCP servers (Playwright)
├── packages/
│   └── core/                framework-agnostic engine (no React, no chrome.*)
│       └── src/
│           ├── host/        shadow-root host + overlay manager + motion/safety guard
│           ├── spirits/     types.ts, registry.ts, fog.ts, drain.ts, tunnel.ts, scramble.ts, tremor.ts, void/
│           │   └── void/    a11y-tree.ts, announcer.ts, navigator.ts, speech.ts
│           ├── audit/       axe.ts, score.ts, spirit-coupling.ts
│           ├── fixers/      types.ts, registry.ts, contrast.ts, image-alt.ts, accessible-name.ts,
│           │                form-label.ts, html-lang.ts, target-size.ts, report-only.ts
│           ├── ai/          types.ts, describe.ts (tiered), providers/{on-device,cloud,heuristic,prebaked}.ts,
│           │                cache.ts, prompts.ts, image-prep.ts
│           ├── exorcism/    orchestrator.ts, events.ts
│           ├── grimoire/    report.ts, export-markdown.ts, export-json.ts
│           ├── color/       contrast-math.ts, adjust.ts
│           └── index.ts     public API: createPossession(document, options)
├── apps/
│   ├── extension/           Chrome MV3: manifest.json, service-worker.ts, content.ts,
│   │                        offscreen/ (on-device AI host), sidepanel/ (React Séance Console)
│   └── web/                 Vite + React: / (landing), /haunted-hollow (broken demo store),
│                            /seance (in-browser demo), /grimoire/:id (shared report view),
│                            public/prebaked/haunted-hollow.json, public/bookmarklet.js
├── workers/
│   └── exorcist-ai/         Cloudflare Worker: POST /describe-image, POST /name-element, GET /health
├── tests/
│   └── e2e/                 Playwright specs for web and extension
├── docs/                    KIRO_USAGE.md (write-up), ARCHITECTURE.md, VIDEO_SCRIPT.md, screenshots/
├── LICENSE                  MIT
└── README.md
```

## Conventions
- File names: kebab-case. React components: PascalCase files in `components/`.
- Each package exports through a single `index.ts`.
- Tests live next to source as `*.test.ts`. Property tests are `*.prop.test.ts`.
- Spirit IDs: `fog | drain | tunnel | scramble | tremor | void`.
- Fix sources: `rule | on-device | cloud | heuristic | prebaked`.
- Never add `.kiro/` to `.gitignore`.
