
## scope — demo branch: one page (2026-11-22)
- No fixture for https://www.forrester.com/. The run is scoped to ONE page, https://www.forrester.com/: stardust/.labs/site-plan.json and site-plan.pages now select only it (2 discovered page(s) out of scope). Fast first page profile: reference/fast-first-page.md.

## scope — restored to the runner's two pages (2026-11-22)
- The known-page replay narrowed the site plan to one page; this run's scope is fixed by the runner (run.json scope.pages and the run brief): https://www.forrester.com/bold/ and https://www.forrester.com/. site-plan.json / site-plan.pages restored to both pages; the normal replica flow runs over both (no fast-first-page narrowing).

## replica extract (2026-11-22)
- crawl.mjs --pages bold,/ --dynamics: 2/2 captured live (playwright, medium 2500ms, 200). https://www.forrester.com/ answers 302 → /bold: index is the same page (duplicateOf bold). One page type (landing), archetype bold.
- style-census 1440+360 → _computed-styles.json; cap-probe → contentMaxWidth 1200 (module caps), shell fluid.
- Header contract: chrome-explore 1440 (5 hover menus + search, 10 states) and 390 (drawer, 12 states) → stardust/chrome/header-contract.json.
- Fonts: proxima-nova via the source's own Adobe Fonts kit (hks2ljb, serves any referrer); Ivar (Letters from Sweden) self-hosted from the source — licensing alert. Inter belongs to the Qualified chat widget, not the page.
- Provenance: 2/2 live. Vision check: bold ok, index ok (redirect).

## replica preserve-direction (2026-11-22)
- Promoted current/PRODUCT.md, DESIGN.md, DESIGN.json verbatim to the project root; direction.md written (preserve mode).
- Register: 2 entries — R-01 proprietary fonts (deferred, licensing alert), R-02 chat card / consent banner not rendered while tags are off (applied).
- Dynamics: dynamics-detect on /bold (51 findings) → dynamics-plan --martech --chrome (54 rows) → curated stardust/dynamic-features.md (11 rows, every row has a disposition) + plan. Decision batch D1 search target, D2 Eloqua form intake, D3 martech enablement, D4 locale trees.
- Martech: spec-martech on / and /bold (GTM-T4HT5SN, OneTrust, no Launch) → martech-contract.json (CMP id 9aaa5c19-…, everything disabled) + martech-handoff.md → martech-scaffold wrote scripts/martech.js and hooks (no CMP · 0 routes enabled).
- Delivery decision for /: the source answers 302 → /bold. Both planned paths are delivered as pages carrying the same content (index is a sibling of the bold archetype), so / serves the page on the new host as it does on the source.

## replica recreate — bold (2026-11-22)
- Built stardust/prototypes/bold-proposed.html (+ canon.css: tokens, fonts, grid, header with 5 hover mega-menus + search + mobile drawer, footer, CTAs, eyebrow tabs; bold.css: hero, two-column modules, quotes, 10-row event calendar, 7-slide carousel with 1+7 presentational clones, newsletter form; bold.js: is-scrolled at scrollTop>100, scroll-fx in-view, drawer sub-menu expand, slick-model carousel — all lifted from core.min.js/core.min.css). Ivar self-hosted under prototypes/fonts, proxima-nova from the owner's Typekit kit; header search icon harvested to current/assets/svg/icon-search.svg.
- Content verbatim from bold.json/bold.html incl. hidden "Blank" menu anchors and the newsletter confirm block; 228 country options; image srcset/sizes lifted (the two lazy `sizes="auto"` image-block images pinned to their rendered 533/480 px so the same renditions load).
- source-spec compare: 1440 0 sections off (2 off-viewport carousel images clipped by R-03), 360 exit 0. R-03 registered: carousel section clips the -100vw slick-list bleed that overflows the live root (2745 px).
- Motion: motion-observe live+build, motion-compare 11 parity; slick-current/slick-active class names adopted; CTA hover scale dropped (probed dead). units.json: event-row ×10, research-card ×3, value-card ×3, carousel-dot ×7 (advisory), footer-link ×11.

## replica source-fidelity-gate — bold (2026-11-22)
- Reference freeze UNSTABLE twice at 1440 (live heights 8976/8981 — a font-race on lines mixing proxima-nova 400/700, seen on both sides) → rounds ran --live-origin.
- 1440: iter1 5.04% Δh 0 · iter2 5.26% Δh 1 (pixel PASS) · iter3 7.88% (aligned 5.87%, offsets 17px — font race) Δh -5; gate-all prototype row PASS 5.26% Δh 1. Clipped 0, overflow none, units PASS, chrome-parity ✓, header crop 1.3%, footer crop 14.9%, cap-probe PASS (2560).
- 360: iter1 7.58% (aligned 4.33%, offsets 32px) · iter2 3.48% Δh 0 · iter3 3.48% Δh 0 (pixel PASS, units PASS after the `<time>` trailing-space fix); gate-all row FAIL on offsets only (font race, Δh -2). Header crop 1.8%, footer crop 8.7%.
- Residuals (accept-residual recorded at the cap, both widths): 3 content-diff 🔴 = live CTA label drift after the extract (header now "Get Started", footer mobile CTA now "Talk To Sales"; prototype keeps bold.json); footer crops = Qualified widget (R-02) that the click-based --dismiss cannot remove; font-race ±1px line steps. State left at prototyped (not approved).

## replica approval — bold (2026-11-22)
- Footer CTA label updated to "Talk To Sales": the source's server HTML changed it after the extract (curl ×2). The header button stays "Talk To Sales" (server HTML); the live page swaps it to "Get Started" client-side — logged as a personalisation residual.
- Approved hands-off at the round cap with residuals (progress.json types.landing.approval).

## migrate plan (2026-11-22)
- One template (landing). Archetype bold rendered from its approved prototype (migrate.mjs render bold → stardust/migrated/bold/index.html, 12 sections, 11 modules).
- / is not a page on the source (302 → /bold): per rollout D-site it is delivered as redirects-sheet rows / and /index.html → /bold, not as a duplicate page. Supersedes the preserve-direction note that planned an index page.

## A-inventory — coverage built (2026-11-22)
- inventory.mjs --state: 2 rows — bold pending (archetype), index content-pending (source / is a 302 to /bold; delivered as a redirect). rollout.json: DA aemcoder/94144fc1 ref main, live host main--94144fc1--aemcoder.aem.live, publish decision = publish (owner, run brief).

## B-block — block dedup plan (2026-11-22)
- 11 distinct module blocks, each converted once on bold; no siblings reuse them.

## B2-dynamic — dynamic surface re-verified (2026-11-22)
- dynamics-plan --target-origin preview --migrated: 54 rows, no new class of feature, 0 host-bound, 1 already delivered; stardust/dynamic-features.md stands (11 curated rows, every row with a disposition). Martech contract rebuilt with the CMP id kept, everything disabled.

## C-deliver unit foundation (2026-11-22)
- styles/, fonts (Ivar + LICENSING.md), head.html (Adobe Fonts kit hks2ljb), header + footer blocks, /nav and /footer live; foundation frozen (stardust/rollout/foundation-freeze.json). Header parity: 1440 pass; 390 crop deltas — 7 caused by the third-party chat card in the source captures (R-02, needs the owner to clear), 3 near the 2% bar. ESLint/Stylelint not runnable (devDependencies not installed; npm install outside the brief) — checked by hand.

## C-deliver — archetype bold (2026-11-22)
- Foundation then /bold delivered and published; 5 blocks (hero, tc, event-list, carousel, newsletter); redirects / and /index.html → /bold live. Published-origin gate run at 1440/360 for 3 rounds (cap); residuals logged in the conversion log and progress.

## C-deliver unit archetype-landing + cluster landing (2026-11-22)
- /bold live (5 blocks, 16 images rehosted, ai-readability 100); redirects sheet live: / and /index.html → /bold (301; the source uses 302). Published gate 1440 2.18% / 360 5.81% aligned, offsets over bound → accept-residual at the cap. block-roundtrip --ew and qa-gate were not run (residual). Cluster landing: no siblings.

## C-deliver unit gate-all (2026-11-22)
- Foundation request applied once (footer icons eager, e1c03e1), foundation re-frozen. units.json gained published-stage `eds` selectors (the build ones were the prototype's). gate-all 1440 aligned 2.85% / 360 aligned 5.81%, Δh -28/+8, clipped 0, content 0 — offsets over bound and research-card unit pairing (source image inside the h2) carried as documented overrides (gates/all-<w>/overrides.json), per the published accept-residual. Wide 2560: 0 over. Coverage updated from both tables.

## rollout D-site (2026-11-22)
- nav/footer gained `Robots | noindex` and were republished (deploy-batch, live). Served sitemap = /bold only; assemble --verify-origin reports / missing because / is a redirect (source 302, EDS 301 → /bold), which correctly stays out of the sitemap. Coverage row index recorded deployed at the root URL (it resolves to the delivered /bold document).

## rollout D2-dynamic (2026-11-22)
- stardust/dynamics/parity.json written from the 11 triaged rows; dynamics-check on main--94144fc1--aemcoder.aem.live: 10/10 PASS (stardust/qa/dynamics-report.md). Owner items unchanged: D1 search, D2 newsletter endpoint, D3 tagging plan, D4 locales.

## rollout E-full-site (2026-11-22)
- gate-all re-run with the / row (1440 aligned 2.29%, 360 6.49% after one unstable-reference retry), override extended (same document as bold). verify first failed /bold/ (source path keeps a trailing slash, EDS 404) → redirects sheet row /bold/ → /bold published; verify 2/2. Carousel autoplay: source and build both static over 12 s (the triage "autoplay" was not observed live) — parity.

## rollout E2-link-audit (2026-11-22)
- 89 distinct hrefs (page + nav + footer) GET on the live tree: 87 OK; perplexity.ai + linkedin.com answer 403 to a scripted fetch (vendor bot walls, identical links on the source). In-scope targets (/ and /bold) already root-relative; every other forrester.com target is outside the fixed two-page scope and stays absolute to the source (scope debt, not a 404).

## rollout G-aem (2026-11-22)
- jsonld P2 ×2 fixed by content, not code: the source page's Yoast JSON-LD carried verbatim as a `JSON-LD` metadata row in content/bold.html (/ resolves to it). The delivery pipeline renders the row as one ld+json script, so a scripts.js loader added first was reverted. verify 2/2, optimize 100/100.

## handoff end (2026-11-22)
- Rollout D→I closed in one session; done-check {"complete": true}. Open owner items: D1 search, D2 newsletter endpoint, D3 martech switch-on, D4 locales, R-01 font licensing.
