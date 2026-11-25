---
inclusion: always
---

# Product: POSSESSED

**Tagline:** "Your website is haunted by the barriers you built. Feel them. Then exorcise them."

**Hackathon:** Kiroween 2026 (Devpost), category **Costume Contest**: a polished, haunting, unforgettable UI. Deadline: Dec 4, 2026, 2:00 PM PT. Judged equally on Potential Impact, Technological Implementation, Design, Innovation/Idea and Presentation.

## What it does
Possessed is an accessibility tool that lets developers *experience* the accessibility barriers on any web page, then fixes them.

1. **Possess:** Point Possessed at a page. Six "spirits" overlay simulations of how people with disabilities experience that page:
   - 🌫️ **The Fog**: low vision (blur and contrast loss)
   - 🩸 **The Drain**: colour vision deficiency (protanopia, deuteranopia, tritanopia, achromatopsia)
   - 👁️ **The Tunnel**: tunnel vision / glaucoma
   - 🔀 **The Scramble**: dyslexia-like letter instability
   - 🤚 **The Tremor**: motor tremor (the cursor shakes; small targets get missed)
   - 🕳️ **The Void**: blindness / screen reader. The screen goes black and the browser speaks what a screen reader would announce ("Button. Button. Image, IMG_4821.jpg. Link.").
2. **Measure:** `axe-core` audits the page against WCAG 2.2 A/AA. A **Possession Level** (0–100%) and per-spirit intensities are derived from the violations.
3. **Exorcise:** Fixers repair violations live (rule-based where possible, AI for alt text and accessible names). Each fix plays a "cleansing" animation, the meter falls, and the spirits weaken. The Void now speaks meaningful labels.
4. **Grimoire:** A report of every fix with before/after HTML, its source (rule / on-device AI / cloud AI / heuristic / prebaked), and "needs human review" flags. Exportable as Markdown and JSON.

## Delivery surfaces
- **Chrome extension (MV3)**, the main product. Side-panel "Séance Console" plus content-script overlays. Works on any site, including localhost.
- **Web app**: landing page, the **Haunted Hollow** deliberately inaccessible demo store, and an in-browser **Séance** demo that possesses Haunted Hollow with no install (for judges).
- **Bookmarklet**: a lightweight possession-only mode.

## Non-negotiable principles
- **The barrier is the monster, never the person.** Copy never portrays disabled people as ghosts, monsters or curses. Spirits personify *inaccessible design*. See `accessibility-ethics.md`.
- **Possessed itself must be exemplary:** WCAG 2.2 AA minimum for its own UI, AAA contrast for body text, fully keyboard operable, respects `prefers-reduced-motion`, no flashing above 3 Hz.
- **$0 to run:** AI uses Chrome built-in Gemini Nano first, then a free Cloudflare Workers AI fallback, then heuristics. The Haunted Hollow demo works with AI fully offline via prebaked results.
- **Honest output:** AI-generated fixes are labelled and flagged for human review. Never claim a page is "fully accessible"; automated tools catch only part of WCAG issues.
- **Reversible:** Every possession and every fix can be undone. Exorcising a spirit restores the DOM exactly.

## Target users
Front-end developers, designers, QA engineers, accessibility advocates, and teams that want empathy-building demos.
