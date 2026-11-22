# Inconsistency register — www.forrester.com replica

Everything not listed here is frozen; any design delta found by the gate is a defect, not an improvement.

## R-01 — Proprietary typefaces: licensing alert

- **Evidence:** core.min.css @font-face Ivar / "Ivar Display" (ivartext-regular, ivardisplay-regular/italic/medium .woff2 from go.forrester.com/wp-content/themes/forrester/assets/static/font); proxima-nova from the Adobe Fonts kit https://use.typekit.net/hks2ljb.css (@import in core.min.css).
- **Finding:** both families are commercial. Ivar files are self-hosted as captured; proxima-nova keeps loading from the owner's own Adobe Fonts kit (no font file copied). No visual change.
- **Minimal change:** none to the design — the owner confirms the Ivar web licence covers the new host and adds the new domains to the Adobe Fonts kit's allowed domains before go-live.
- **Status:** deferred
- **Where:** all pages (typography)

## R-02 — Third-party chat card and consent banner not rendered until the owner enables tags

- **Evidence:** live screenshot stardust/current/assets/screenshots/bold.png — the Qualified chat card ("Learn more about Forrester…") over the hero's top-right and the OneTrust banner are injected by GTM/OneTrust (dynamic-features.md rows 8, 11).
- **Finding:** these surfaces belong to the tag stack, which this run carries over switched off (stardust/martech-contract.json); they are not page content.
- **Minimal change:** none rendered on the new pages until the owner enables the martech contract; gate captures dismiss them on the live side.
- **Status:** applied
- **Where:** all pages (hero top-right overlay, bottom consent bar)

## R-03 — Root horizontal overflow from the events carousel bleed

- **Evidence:** live `document.documentElement.scrollWidth` 2745 at a 1440 viewport (source spec bold-1440.json; measure.mjs root line) — `.fbs-img-carousel .slick-list { margin-right: -100vw }` (core.min.css, min-width 1440px) with `body { overflow-x: clip }`.
- **Finding:** the page is visually clipped at the viewport edge but the root still reports overflow; the gate's overflow assert holds on the build regardless (source-fidelity-gate.md § Iteration discipline).
- **Minimal change:** the carousel section clips its own horizontal overflow (`overflow-x: clip` on the section); the bleed to the viewport edge renders identically.
- **Status:** applied
- **Where:** bold — image carousel section (1440 and wider)
