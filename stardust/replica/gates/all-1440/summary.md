# Published-origin gate — all deployed pages, 1440px

2026-11-22T11:01:12.931Z · **0 PASS / 2 FAIL / 0 error of 2** (+1 documented override → 1 delivered)

Verdict: pixel criterion (aligned % ≤ 10 AND total offset ≤ the bound; alignment not used: unaligned % ≤ 10) AND |Δh| ≤ 5% of origin height AND clipped ≤ 0 (+ documented allowance) AND content MISSING + HIDDEN links/headings = 0

Calibration — pixel-only verdict (criteria 1+2): **0 PASS**; full verdict (1–4): **0 PASS**. Failing by criterion: pixel 2 (2 on offsets alone), height 0, clip 0, content 0, units 2; content n/a (origin not probed) 0; pixel criterion met only thanks to alignment (unaligned % over the threshold): 0.
| page | template | tier | origin | browser | pixel % aligned (unaligned) [text] | offsets | Δh px | clipped | content | units | verdict | reasons |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/bold` | bold | - | stitch-live | chrome | 2.85 (9.24) [12.5] | 12+ step(s), 110px (bound 90) | -28 | 0 | MISSING 0 / HIDDEN 0 | off 16 hidden 0 missing 0 (5 families checked) | FAIL → pass-with-override: published 1440: aligned 2.85% (≤10%), Δh -28 (≤5%), clipped 0, content 0 missing/hidden; residual offsets 110px vs bound 90 = source empty spacer paragraphs dropped by the DA pipeline + eyebrow/h2 margin rounding (accept-residual at the 3-round cap, gates/bold-1440/rounds.json published); units: event-row date box = <time> text node vs <p> (paint identical), research-card image/heading = source floats the image INSIDE the h2 so the paired boxes differ by structure (eds.png vs origin.png crop 4200-5300: same order, image 19px higher) | offsets: 12 step(s), 110px total — −1px at y=114, +10px at y=1388, +4px at y=3293, +2px at y=3427, −34px at y=4459, +16px at y=4738, … 6 more (bound 90px); units off 16 hidden 0 missing 0 |
| `/` | landing | - | stitch-live | chrome | 2.29 (9.44) [11.55] | 6 step(s), 99px (bound 90) | -33 | 0 | MISSING 0 / HIDDEN 0 | off 16 hidden 0 missing 0 (5 families checked) | FAIL | offsets: 6 step(s), 99px total — +10px at y=1387, −1px at y=1641, −31px at y=4469, +16px at y=4741, −1px at y=4820, +40px at y=6742 (bound 90px); units off 16 hidden 0 missing 0 |
