# Local validation record

Date: September 17, 2026

The production build was tested locally at `http://127.0.0.1:3100`.

- `npm run build` and `npm run typecheck` passed.
- `npm test` passed all 15 Playwright checks across English and Spanish at 360, 390, 768, 1024, and 1440 px.
- The tests cover language parity, navigation, no horizontal overflow, gallery filter and lightbox keyboard/touch behavior, focus restoration, FAQ controls, external Airbnb links, 404 responses, metadata, crawl controls, JSON-LD, and automated WCAG rules.
- Lighthouse mobile scores: Performance 98, Accessibility 100, Best Practices 100, SEO 69.
- Measured LCP was 2.3 s, CLS 0, and Total Blocking Time 10 ms.

The SEO score is intentionally reduced in this local validation because `SITE_INDEXABLE=false` returns `noindex, nofollow` and `robots.txt` disallows crawling. Enable indexing only after the production domain and launch checklist in the root README are complete. The full Lighthouse JSON and HTML reports are retained beside this file.
