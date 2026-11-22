---
name: Forrester
description: Forrester corporate home — research, consulting, events.
colors:
  ink: "#1f2733"
  black: "#000000"
  signal-yellow: "#ffde00"
  forrester-green: "#00563f"
  green-deep: "#003d2d"
  green-darkest: "#002e29"
  lime: "#a6e483"
  paper: "#ffffff"
  mist: "#f2f2f2"
  rule: "#d8d8d8"
typography:
  display:
    fontFamily: "proxima-nova, Arial, sans-serif"
    fontSize: "62px"
    fontWeight: 700
  h2:
    fontFamily: "proxima-nova, Arial, sans-serif"
    fontSize: "46px"
    fontWeight: 700
  h3:
    fontFamily: "proxima-nova, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 700
  body:
    fontFamily: "proxima-nova, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
  quote:
    fontFamily: "\"Ivar Display\", Ivar, Georgia, serif"
    fontWeight: 400
rounded:
  none: "0px"
components:
  button-primary:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.black}"
    rounded: "{rounded.none}"
    padding: "20px"
    height: "60px"
  button-secondary:
    textColor: "{colors.black}"
    rounded: "{rounded.none}"
    padding: "20px"
    height: "58px"
---

<!-- stardust:provenance writtenBy=stardust:extract source=_computed-styles.json + core.min.css mode=descriptive -->

## Overview
Corporate marketing landing page: green hero band, white and light-grey content sections, a purple "Forrester AI" band, section eyebrows as lime tabs (RESEARCH, CONSULTING, EVENTS), a green newsletter band and a dark footer.

## Colors
Ink #1f2733 carries text and headings; Forrester green #00563f (and deeper #003d2d / #002e29) carries hero, newsletter and footer surfaces; signal yellow #ffde00 is the primary CTA fill; lime #a6e483 marks section eyebrow tabs.

## Typography
proxima-nova (Adobe Fonts kit hks2ljb) for everything; h1 62px/700, h2 46px/700, h3 24px/700, body 16px/400. Ivar Display serif for pull quotes.

## Shapes
Square corners throughout (no non-zero radius measured).

## Components
- Primary CTA: yellow fill, uppercase 16px/700 label, min 188×60, scales 1.05 on hover.
- Secondary CTA: 3px black border, min height 58px.
