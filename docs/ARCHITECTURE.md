# Architecture

> Updated as each stage lands.

## Monorepo overview

```
possessed/
├── packages/core       Framework-agnostic engine (no React, no chrome.*)
├── apps/web            Vite + React web app (landing, Haunted Hollow, Séance)
├── apps/extension      Chrome MV3 extension
└── workers/exorcist-ai Cloudflare Worker (AI fallback)
```

## Data flow (Stage 0 placeholder — updated in Stage 2+)

```
page DOM
  └─► packages/core (spirits, audit, fixers, AI)
        ├─► apps/web shell (React components)
        └─► apps/extension shell (content script + side panel)
```
