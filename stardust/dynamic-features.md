# Dynamic features — www.forrester.com (/bold, / → /bold)

Draft: stardust/dynamics/dynamic-features.generated-plan.{md,json} (54 rows, curated here). Run is hands-off: every non-self row ships its interim tier and its decision is named below.

## Listings contract
none — the planned pages carry no listing blocks (the event list is authored content).

## Features
| # | id | feature | class | reach | disposition | target | reproducibility | status | pattern | decision / owner | evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | chrome-menu | header mega menus (5 hover panels) | M | all | rebuild-native | runtime | self | planned | chrome | — | header-contract.json 1440 |
| 2 | chrome-drawer | mobile drawer, nested levels | M | all | rebuild-native | runtime | self | planned | chrome | — | header-contract.json 390 |
| 3 | chrome-search | header search box (GET /allSearch?q) | S | all | embed-passthrough | widget | needs-business-decision | interim | search-index-backed | D1: results page is outside this run's fixed two-page scope; interim submits to the source search https://www.forrester.com/allSearch | form.header-search |
| 4 | m-filter-icon | "Filter Icon" popup button in the search panel | M | all | rebuild-native | runtime | self | planned | modal | — | aria-haspopup button |
| 5 | f-newsletter | newsletter form LEAD3.0Wordpress (email, country, opt-in) | F | bold | rebuild-native | block | needs-backend | interim | form-intake | D2: Eloqua submission endpoint/credentials belong to the owner; interim UI rebuilt, submission shows the captured confirmation text without sending | form#form2069, CR eloqua confirm slot |
| 6 | cr-eloqua-confirm | form confirmation copy "Thanks for signing up…" | CR | bold | static-snapshot | content | self | planned | client-rendered | — | eloqua-form-confirm slot |
| 7 | fbs-img-carousel | events photo carousel (slick, dots, autoplay) | M | bold | client-only | block | self | planned | carousel | — | .fbs-img-carousel__slick |
| 8 | martech | GTM-T4HT5SN, OneTrust CMP, GA/Ads, LinkedIn, Reddit, Quantum Metric, Dynatrace, Qualified chat, ZoomInfo, ad-tech pixels | T | all | embed-passthrough | runtime | needs-business-decision | scaffolded-awaiting-owner | martech | D3: every part ships disabled in stardust/martech-contract.json; owner enables (martech-handoff.md) | 45 third-party host rows |
| 9 | x-sign-in | sign-in / account links | X | all | static-snapshot | content | self | planned | link | links keep pointing at https://www.forrester.com/login (session-bound app stays on the source) | header links |
| 10 | i18n-ai | /ai/ locale variants linked from the page | I18N | bold | static-snapshot | content | needs-business-decision | interim | locale-tree | D4: locale trees outside scope; links stay absolute to the source | i18n-locale-variants-ai-ai |
| 11 | a-datalayer | dataLayer object from the CMS | A | all | embed-passthrough | runtime | needs-business-decision | scaffolded-awaiting-owner | martech | covered by D3 (data-layer pushes are an owner tagging-plan item) | a-cms-app-settings-object-datalayer |

## Decision batch
- D1 search: provide a results surface on the new host (query index over migrated pages) or keep the source search. Interim: source search URL.
- D2 newsletter form: connect the Eloqua form (site id, form name LEAD3.0Wordpress) or another intake. Interim: UI only, nothing sent.
- D3 martech: enable OneTrust (domain script 9aaa5c19-25f5-4113-a95b-17bcd8c33295) and GTM-T4HT5SN routes in stardust/martech-contract.json; all other tags load through GTM.
- D4 locale trees (/ai/ and other locales): out of this run's scope; links stay on the source.

## Register (decided-out)
| feature | reason | production statement |
|---|---|---|
| (none) | | |
