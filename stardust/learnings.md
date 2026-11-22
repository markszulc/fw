
## 2026-11-22 rollout (forrester, two-page scope)
- units.json needs an `eds` selector per family for the published stage — the `build` selector is the prototype's and the published gate falls back to `origin` without it (4 selector errors until added).
- A source path with a trailing slash (`/bold/`) 404s on EDS: verify.mjs fetches the folder-index form, so add the slash variant to the redirects sheet at D-site, not at E.
- A `JSON-LD` metadata row is rendered by the delivery pipeline as one ld+json script — no scripts.js loader is needed.
- A root that only redirects belongs in coverage as delivered-at-root and gated as the same document; assemble --verify-origin will always report it missing from the sitemap (correctly).
