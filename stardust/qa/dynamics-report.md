# Dynamics parity check — https://main--94144fc1--aemcoder.aem.live — 2026-11-22T10:57:06.905Z

Replayed 10 checks over 12 features · pass 10 · fail 0. Flows, not presence.

| feature | class | status | check | result | detail | third-party requests |
|---|---|---|---|---|---|---|
| header mega menus (5 hover panels) | M | done | dom-count | PASS | 5 × header .site-nav-menu .mega (min 4) | use.typekit.net:200×6 p.typekit.net:200×1 |
| mobile drawer, nested levels | M | done | dom-count | PASS | 1 × header input#mobile-menu (min 1) | use.typekit.net:200×6 p.typekit.net:200×1 |
| header search box (GET /allSearch?q) | S | interim | dom-count | PASS | 2 × form.header-search[action*="allSearch"] (min 2) | use.typekit.net:200×6 p.typekit.net:200×1 |
| newsletter form (email, country, opt-in) | F | interim | dom-count | PASS | 1 × .newsletter form input[name=email] (min 1) | use.typekit.net:200×6 p.typekit.net:200×1 |
| newsletter form (email, country, opt-in) | F | interim | dom-count | PASS | 228 × .newsletter form select[name=country] option (min 100) | use.typekit.net:200×6 p.typekit.net:200×1 |
| form confirmation copy | CR | done | dom-count | PASS | 1 × .newsletter .newsletter-confirm (min 1) | use.typekit.net:200×6 p.typekit.net:200×1 |
| events photo carousel (dots, autoplay) | M | done | dom-count | PASS | 7 × .carousel .carousel-dots li (min 7) | use.typekit.net:200×6 p.typekit.net:200×1 |
| sign-in / account links | X | done | dom-count | PASS | 2 × header a[href*="forrester.com/login"] (min 1) | use.typekit.net:200×6 p.typekit.net:200×1 |
| no uncaught errors | — | done | no-page-errors | PASS | none on 2 page(s) |  |
| martech: consent + tag routing | T | scaffolded-off | martech | PASS | no tag host requested (2 gated · 1 cross-site host(s) blocked) |  |

## Features without checks

- "Filter Icon" popup in the search panel (M) — interim · owner: follows D1 (native search)
- /ai/ locale variants (I18N) — interim · owner: D4: locale trees outside scope
- dataLayer object from the CMS (A) — scaffolded-awaiting-owner · owner: D3: tagging plan / data-layer pushes
