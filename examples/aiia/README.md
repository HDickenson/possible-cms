# AIIA example

Reference implementation: AIIA's marketing site schemas + seed importer.

Defines:

- Page (home blocks)
- BlogPost (MDX body + hero image + author reference)
- DocPage
- PricingPhase, PricingTier, Integration (the pricing display entities from AIIA's existing `src/content/pricing/schema.json`)
- Author
- Testimonial
- FAQ
- Legal

Seed importer: reads `/Users/kanousei/Dropbox/Production/website/src/content/**` (developer-local path; CI uses a fixture) → produces D1 rows via admin-api.

Implementation: Epic 10.

**Reminder:** nothing AIIA-specific belongs in `apps/` or `packages/`. It lives here.
