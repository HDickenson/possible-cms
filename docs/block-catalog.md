# Block Catalog

Ten starter blocks ship in `@possible-cms/blocks` for v0.1. Each block is `{ type, propsSchema, defaultProps, render, fields, category }`.

| Block          | Category  | Phase A spec                                                  |
| -------------- | --------- | ------------------------------------------------------------- |
| `Hero`         | layout    | headline + subhead + background image/video + CTA button      |
| `RichText`     | content   | MDX body with sanitization whitelist                          |
| `Image`        | media     | asset picker + alt text + caption + aspect ratio              |
| `Pricing`      | marketing | heading + tiers (references `PricingTier` records)            |
| `FAQ`          | content   | heading + list of `{ question, answer }` items                |
| `CTA`          | marketing | heading + subhead + primary/secondary button                  |
| `Columns`      | layout    | N columns (2-4) containing nested blocks via Puck DropZone    |
| `Spacer`       | layout    | vertical spacing (sm/md/lg/xl)                                |
| `Embed`        | media     | URL (YouTube / Vimeo / iframe with allowlist)                 |
| `Testimonials` | marketing | heading + testimonial list (references `Testimonial` records) |

Block types are PascalCase and globally unique. Adding a block means: Zod propsSchema, default props, React render, Puck fields, optional icon, category assignment. Implementation per Epic 4.

Per-site block whitelist lives in `site.block_whitelist` (D1). Admin palette filters against registered + whitelisted.

Unknown block types (de-registered but still present in a saved page) render via `UnknownBlockPlaceholder` per FR24 / NFR30 — never crashes the page.
