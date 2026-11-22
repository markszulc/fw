<!-- stardust provenance: skill=stardust:dynamics · phase=plan draft · 2026-11-22T09:52:16.027Z · input stardust/current/_dynamics.json (1 pages, 54 findings) · target probe https://main--94144fc1--aemcoder.aem.page · reconciled against stardust/migrated -->
# Dynamic features — draft inventory (curate into `stardust/dynamic-features.md`)

One row per detected finding. Merge duplicates, drop noise, keep every axis honest. Columns: disposition = what we do · target = the delivery form (widget where no authored rows remain) · reproducibility = what it needs · status = where it stands (reference/triage.md).

| # | id | class | feature | pages | disposition | target | reproducibility | status | pattern | decision needed | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | a-unknown-third-party-host-www-google-com | A | unknown third-party host www.google.com | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 2 | a-unknown-third-party-host-pixel-config-reddit-com | A | unknown third-party host pixel-config.reddit.com | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 3 | a-unknown-third-party-host-app-qualified-com | A | unknown third-party host app.qualified.com | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 4 | a-unknown-third-party-host-alb-reddit-com | A | unknown third-party host alb.reddit.com | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 5 | a-unknown-third-party-host-px-ads-linkedin-com | A | unknown third-party host px.ads.linkedin.com | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 6 | a-unknown-third-party-host-people-api-zetaglobal-net | A | unknown third-party host people.api.zetaglobal.net | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 7 | a-unknown-third-party-host-events-api-boomtrain-com | A | unknown third-party host events.api.boomtrain.com | 1/1 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 8 | a-cms-app-settings-object-datalayer | A | CMS / app settings object dataLayer | 1/1 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 9 | cr-client-rendered-slot-eloqua-form-form-col-md-6-js-eloqua- | CR | client-rendered slot eloqua-form__form col-md-6 js-eloqua-form | 1/1 | static-snapshot | content | self | pending | settled-dom-snapshot | inspect the consumer |  |
| 10 | cr-client-rendered-slot-eloqua-form-confirm-col-md-6-js-eloq | CR | client-rendered slot eloqua-form__confirm col-md-6 js-eloqua-confirm | 1/1 | static-snapshot | content | self | pending | settled-dom-snapshot | inspect the consumer |  |
| 11 | f-form-lead3-0wordpress-no-action-js-wired-3-fields | F | form "LEAD3.0Wordpress" → no action (JS-wired) (3 fields) | 1/1 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 12 | i18n-locale-variants-ai-ai | I18N | locale variants ai,ai | 1/1 | rebuild-native | runtime | needs-business-decision | pending | locale-tree | scope of the locale trees |  |
| 13 | m-modal-trigger-aria-haspopup-chrome-only-button-content | M | modal trigger aria-haspopup (chrome only) → button:content | 1/1 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) |  |
| 14 | s-site-search-form-allsearch | S | site search form → /allSearch | 1/1 (reach 2/2) | index-backed | widget | self | pending | search-index-backed | none (corpus = the migrated pages; second corpora stay out) |  |
| 15 | t-unknown-third-party-host-cdn-0-d41-co | T | unknown third-party host cdn-0.d41.co | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 16 | t-tag-manager-google-tag-manager | T | tag manager: Google Tag Manager | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 17 | t-unknown-third-party-host-img-en25-com | T | unknown third-party host img.en25.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 18 | t-consent-onetrust | T | consent: OneTrust | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | CMP domain script reuse on the new host |  |
| 19 | t-unknown-third-party-host-www-redditstatic-com | T | unknown third-party host www.redditstatic.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 20 | t-analytics-session-replay | T | analytics: session replay | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 21 | t-unknown-third-party-host-live-rezync-com | T | unknown third-party host live.rezync.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 22 | t-unknown-third-party-host-js-qualified-com | T | unknown third-party host js.qualified.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 23 | t-marketing-ad-retargeting-pixel | T | marketing: ad / retargeting pixel | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 24 | t-unknown-third-party-host-ws-zoominfo-com | T | unknown third-party host ws.zoominfo.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 25 | t-unknown-third-party-host-c1-rfihub-net | T | unknown third-party host c1.rfihub.net | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 26 | t-unknown-third-party-host-cdn-boomtrain-com | T | unknown third-party host cdn.boomtrain.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 27 | t-unknown-third-party-host-20877077p-rfihub-com | T | unknown third-party host 20877077p.rfihub.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 28 | t-analytics-google-analytics-ads | T | analytics: Google Analytics / Ads | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 29 | t-unknown-third-party-host-assets-qualified-com | T | unknown third-party host assets.qualified.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 30 | t-unknown-third-party-host-www-linkedin-com | T | unknown third-party host www.linkedin.com | 1/1 | embed-passthrough | embed | needs-business-decision | delivered-by-capture | consent-gated-tags | which tags run on the new host; property ids | output already carries "www.linkedin.com" |
| 31 | t-unknown-third-party-host-image2-pubmatic-com | T | unknown third-party host image2.pubmatic.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 32 | t-unknown-third-party-host-p-rfihub-com | T | unknown third-party host p.rfihub.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 33 | t-unknown-third-party-host-us-u-openx-net | T | unknown third-party host us-u.openx.net | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 34 | t-analytics-adobe-analytics-experience-cloud-id | T | analytics: Adobe Analytics / Experience Cloud ID | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 35 | t-unknown-third-party-host-static-cloudflareinsights-com | T | unknown third-party host static.cloudflareinsights.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 36 | t-unknown-third-party-host-wt-rqtrk-eu | T | unknown third-party host wt.rqtrk.eu | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 37 | t-unknown-third-party-host-dsum-sec-casalemedia-com | T | unknown third-party host dsum-sec.casalemedia.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 38 | t-unknown-third-party-host-contextual-media-net | T | unknown third-party host contextual.media.net | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 39 | t-unknown-third-party-host-px4-ads-linkedin-com | T | unknown third-party host px4.ads.linkedin.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 40 | t-unknown-third-party-host-i-liadm-com | T | unknown third-party host i.liadm.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 41 | t-unknown-third-party-host-aa-agkn-com | T | unknown third-party host aa.agkn.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 42 | t-unknown-third-party-host-idsync-rlcdn-com | T | unknown third-party host idsync.rlcdn.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 43 | t-unknown-third-party-host-a-rfihub-com | T | unknown third-party host a.rfihub.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 44 | t-unknown-third-party-host-ps-eyeota-net | T | unknown third-party host ps.eyeota.net | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 45 | t-unknown-third-party-host-partners-tremorhub-com | T | unknown third-party host partners.tremorhub.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 46 | t-unknown-third-party-host-x-bidswitch-net | T | unknown third-party host x.bidswitch.net | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 47 | t-unknown-third-party-host-pippio-com | T | unknown third-party host pippio.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 48 | t-rum-error-monitoring | T | RUM: error monitoring | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 49 | t-unknown-third-party-host-messenger-assets-qualified-com | T | unknown third-party host messenger-assets.qualified.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 50 | v-iframe-without-src-runtime-injected-embed | V | iframe without src (runtime-injected embed) | 1/1 | embed-passthrough | embed | needs-human-capture | pending | embed-passthrough | resolve the runtime src from a rendered capture |  |
| 51 | x-sign-in-account-links | X | sign-in / account links | 1/1 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 52 | chrome-drawer | M | header drawer: Show Menu (chrome only) | 1/1 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) |  |
| 53 | chrome-menu | M | header menu: Who We Serve, What We Offer, How We Think, Who We Are, Events (chrome only) | 1/1 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) |  |
| 54 | chrome-search | S | header search: search (chrome only) | 1/1 | index-backed | widget | self | pending | search-index-backed | none (results from the query index; overlay and typeahead per the contract) |  |

## Triage

- **Ships autonomously (reproducibility `self`):** 8 row(s) — read-settings, settled-dom-snapshot, chrome-interaction, search-index-backed.
- **One owner decision batch:** 44 row(s) — inspect the XHR, add a vendor row · production endpoint; interim capture ships now · scope of the locale trees · which tags run on the new host; property ids · CMP domain script reuse on the new host · resolve the runtime src from a rendered capture.
- **Already delivered by the capture pipeline:** 1 row(s) — no work.
- **Host-bound on the target:** 0 of 0 probed API paths — the off-origin data work.
- **Martech:** OneTrust · 0/1 route(s) enabled by the owner — `stardust/martech-handoff.md`.

## Phases

- **tags** — 35
- **detect** — 8
- **interactive** — 4
- **capture** — 2
- **forms** — 1
- **locale wave** — 1
- **search** — 1
- **embeds** — 1
- **register** — 1
