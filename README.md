# Villa Tortuga

An editorial, bilingual property website for Villa Tortuga in Culebra, Puerto Rico. English is served at `/`; Spanish is served at `/es`.

## Run locally

```bash
npm install
npm run dev
```

For a production check:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
npm test
```

`SITE_URL` controls canonical URLs, social sharing URLs, and the sitemap. `SITE_INDEXABLE` must remain `false` until the launch checklist is complete. Copy `.env.example` to `.env.local` and set both values before deployment.

## Content and photographs

- Bilingual copy and property facts live in `src/content/site.ts`.
- Gallery metadata and reviewed bilingual alt text live in `src/content/photos.json`.
- The source image archive remains in `assets/property`; optimized local WebP files are in `public/photos`.
- Run `node scripts/prepare-images.mjs` after replacing source photos. It refreshes optimized assets and `public/social.jpg`.
- Run `node scripts/prepare-mobile-hero.mjs` to regenerate the portrait crop from the original pool photograph after changing that source.
- Cormorant Garamond and DM Sans are self-hosted through `next/font/local`; font definitions live in `src/lib/fonts.ts`.
- The displayed review metrics are a documented Airbnb snapshot from September 17, 2026. Update the copy and date together after every approved manual review; do not scrape or imply live ratings.

## Deployment

This is a standard Next.js App Router application and can be deployed to Vercel or Netlify. Configure `SITE_URL` to the approved `https` production origin and set `SITE_INDEXABLE=true` only when every launch item below is complete. No server action, payment flow, availability calendar, form, analytics provider, or direct-contact channel is included.

## Launch checklist

- Confirm that the supplied photography may be used on the independent website.
- Confirm the final child/age policy and revise the FAQ if needed.
- Confirm exterior camera count, placement, and coverage; publish a precise disclosure.
- Confirm smoke and carbon monoxide detector status.
- Confirm grill fuel, optional dock terms, and active concierge services.
- Approve the host names and any direct-contact information before adding it.
- Add approved legal pages before collecting personal data or enabling non-essential analytics.
- Configure the public domain, then enable indexing and validate the generated canonical URLs, sitemap, social preview, and Airbnb CTA in production.

## Validation

`npm test` verifies both locales at 360, 390, 768, 1024, and 1440 px; the lightbox keyboard and touch flow; FAQ; external links; 404s; metadata; crawl controls; and automated WCAG checks. Lighthouse reports are written to `docs/validation/` when run locally.

The local and preview environment intentionally returns `noindex, nofollow`, making its Lighthouse SEO score lower than an approved indexed production release.

The September 17 editorial refinement and its production validation are documented in [docs/validation/refinement.md](docs/validation/refinement.md).
