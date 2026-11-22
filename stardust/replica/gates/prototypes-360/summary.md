# Prototype gate — every crafted prototype, 360px

2026-11-22T09:50:46.877Z · **0 PASS / 1 FAIL / 0 error of 1**

Verdict: pixel criterion (aligned % ≤ 10 AND total offset ≤ the bound; alignment not used: unaligned % ≤ 10) AND |Δh| ≤ 5% of origin height AND clipped ≤ 0 (+ documented allowance)

Calibration — pixel-only verdict (criteria 1+2): **0 PASS**; full verdict (1–4): **0 PASS**. Failing by criterion: pixel 1 (1 on offsets alone), height 0, clip 0, content 0; content n/a (origin not probed) 0; pixel criterion met only thanks to alignment (unaligned % over the threshold): 0.
| page | template | tier | origin | browser | pixel % aligned (unaligned) [text] | offsets | Δh px | clipped | content | units | verdict | reasons |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/bold-proposed.html` | - | - | stitch-live | chrome | 4.33 (7.58) | 12+ step(s), 32px (bound 8) | -2 | 0 | n/a | off 0 hidden 0 missing 0 (5 families checked) | FAIL | offsets: 25 step(s), 32px total — +1px at y=115, +1px at y=2028, −2px at y=2720, −1px at y=5383, −1px at y=5418, −1px at y=5453, … 19 more (bound 8px) |
