# EDS conversion log — www.forrester.com

## Publish decision (2026-11-22)
- Decision: **publish** — made by the owner before the run (run brief). Every delivered page, the redirects sheet and the chrome documents (nav, footer) go live on main--94144fc1--aemcoder.aem.live (deploy-batch.mjs without --no-publish / POST admin.hlx.page/live).

## C-deliver unit archetype bold (2026-11-22)
- /bold delivered from stardust/migrated/bold/index.html → content/bold.html (PUT → preview → live via deploy-batch.mjs); redirects sheet `/redirects.json` live: `/` and `/index.html` → `/bold` (EDS 301; source 302).
- Blocks and decode tier: `hero` (template-slotted: breadcrumb / media / h1 / copy / CTA by role), `tc` (reconstructive: rows = grid rows, cells = columns classified image-only / quote / text; variants gray, light, eyebrow, tight, narrow, lead, divider, center, tp-double — covers modules two-column-intro, quote, three-col-features, ai-band, trusted-by, eyebrow-tab, three-card-grid), `event-list` (reconstructive, card-as-link EW6), `carousel` (reconstructive, slick model, clones stripped EW4), `newsletter` (template-slotted; placeholder / country list / submit text @ew-exempt; form posts nowhere until the owner wires Eloqua — dynamics row).
- Media: 16 editorial images rehosted to DA media/bold via da-media-upload.mjs (one renamed: `@` in the source filename rendered about:error).
- Content quirks: the source's empty spacer paragraphs are dropped by the pipeline; their spacing is reproduced in tc.css (divider / eyebrow columns).
- Lint: ESLint/Stylelint not runnable (no node_modules; npm install barred) — hand-checked (max-len, syntax, kebab-case classes, mobile-first media; breakpoint-lint clean). delivery-lint: 3× P1 one-cta-per-p are false positives (prose paragraphs "Technology: / B2B: / Consumer:" with a bold label and inline links — not CTAs). davids-model-lint PASS (0 🔴; D1/D3 🟡: tc rows mix 1-cell header rows with n-cell column rows by design).
- Header parity closed at the published round cap: 7 × owner (Qualified chat card over the source 390 crops, R-02), 3 × accept-residual (≤1px drawer row pitch) — stardust/chrome/header-classes.json. Foundation request: footer icons eager (stardust/rollout/foundation-requests.md).
- Rollout close (2026-11-22): foundation request applied at C-final (footer icons eager); nav/footer carry `Robots | noindex`; redirects sheet adds `/bold/` → `/bold`; the source JSON-LD carried as a `JSON-LD` metadata row; gate-all 1440/360 delivered with documented overrides (gates/all-<w>/overrides.json); done-check complete.
