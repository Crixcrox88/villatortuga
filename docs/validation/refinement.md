# Editorial refinement — September 17, 2026

## Changes

- Self-hosted Cormorant Garamond headings and variable DM Sans body text, with larger reading sizes and clearer spacing.
- Staggered bedroom photography, an inset pool photograph, a featured gallery tile, and quieter review styling that does not imply verbatim quotations.
- Active-section navigation, responsive menu focus restoration, hover feedback, and subtle entrance animations. Reduced-motion preferences disable motion; core content and native FAQ remain usable without JavaScript.
- A portrait crop derived from source photograph 78 preserves the mobile composition while avoiding the desktop image download.
- Existing property facts, Airbnb booking flow, bilingual routes, and launch restrictions remain in place.

## Validation

- Production build: passed.
- Playwright: 17/17 passed. EN and ES checked at 360, 390, 768, 1024 and 1440 pixels, including automated accessibility checks, language navigation, gallery keyboard/swipe/focus behavior, FAQ, links, metadata and 404s.
- Added checks for loaded local fonts, active navigation, Escape focus restoration, reduced motion, and image/FAQ behavior without JavaScript.
- Manual visual review: desktop and mobile hero, introduction, bedroom layout, and photo composition. Final screenshots accompany this report.
- Lighthouse mobile against the production build: performance **94**, accessibility **100**, best practices **100**, SEO **69**. LCP **3.1 s**, CLS **0**, total blocking time **10 ms**.

SEO remains below the intended production target because previews deliberately prohibit indexing. Do not enable indexing until the owner confirmations and domain setup in the README are complete. Lighthouse is a local lab measurement; these results are not field Core Web Vitals or a complete WCAG certification.

## Typography and controls follow-up

- Desktop hero composition at 1100 pixels now holds to two intentional lines with a compact editorial line-height.
- Primary navigation is 15 px, FAQ questions and answers are 16 px, and supporting property text was raised where it previously read below the body scale.
- Text arrows were replaced with purpose-specific SVG icons: external links, gallery viewing, adding more photos, scroll direction, and return to top.
- Final browser check confirmed a two-line desktop hero, 15 px navigation, 16 px FAQ text, and no remaining `↗` glyphs in page text.
