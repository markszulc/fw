# Font licensing — REQUIRED BEFORE GOING LIVE (register R-01)

| File | Family | Foundry | Status |
|---|---|---|---|
| ivartext-regular-webfont.woff2 | Ivar (400 normal) | Letters from Sweden | unconfirmed — owner must confirm the web licence covers *.aem.page / *.aem.live and the production host |
| ivardisplay-italic-webfont.woff2 | Ivar (400 italic) | Letters from Sweden | unconfirmed |
| ivardisplay-medium-webfont.woff2 | Ivar (700 normal) | Letters from Sweden | unconfirmed |
| ivardisplay-regular-webfont.woff2 | Ivar Display (400 normal) | Letters from Sweden | unconfirmed |
| (none — kit CSS) | proxima-nova | Adobe Fonts (Mark Simonson) | loaded from the owner's kit `https://use.typekit.net/hks2ljb.css` (head.html); the owner must add the new domains to the kit's allowed domains |

Files were captured from the source site (go.forrester.com theme fonts); none were downloaded from Adobe Fonts.

## Remove path

If the Ivar licence cannot be confirmed: delete the four `.woff2` files and their `@font-face` rules in
`styles/fonts.css`; `--font-quote` falls back to Georgia/serif. If the kit domains cannot be added, remove the
typekit `<link>` from `head.html`; `--font-sans` falls back to Arial.
