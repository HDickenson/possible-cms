---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain-skipped
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
completedAt: 2026-04-19
repo: kanousei/possible-cms
productName: Possible CMS
vision:
  statement: Cloudflare-native, open-source CMS designed for the post-handover phase of AI-delivered websites. Agents build structure and register blocks; non-technical owners maintain content through an Elementor-style visual canvas without tickets or devs.
  heroUser: post-handover admin (non-technical marketer/ops who took the keys)
  userCeiling: compose existing blocks on existing pages (agents/devs author new blocks)
  differentiator:
    - Cloudflare-first foundation (D1/R2/KV/Workers/Images/Pages as platform, not deploy targets)
    - Post-handover admin UX (tuned for the marketer, not the dev)
    - Compose-don't-author ceiling (scope discipline making v1 shippable)
    - AI-native lifecycle (same API for editor + agent)
  coreInsight: Cloudflare primitives + Puck maturity + AI-accelerated delivery cycles converge to make a Cloudflare-first CMS economical right now — traditional CMS vendors are structurally too slow to ship this.
inputDocuments:
  - /Users/kanousei/Documents/KPD/infrastructure/cloudflareCMS/prd-cms.md
  - /Users/kanousei/Documents/KPD/docs/plans/2026-04-18-cms-dev-plan.md
  - /Users/kanousei/.claude/plans/i-want-you-to-fizzy-dove.md
documentCounts:
  briefCount: 0
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 3
classification:
  projectType: saas_b2b
  projectTypeSecondary: developer_tool
  domain: general
  complexity: medium
  projectContext: brownfield
  distributionPosture: oss-first-self-host
workflowType: "prd"
project_name: Possible CMS
user_name: Kanousei
date: 2026-04-19
---

# Product Requirements Document - Possible CMS

**Author:** Kanousei
**Date:** 2026-04-19

## Reading Map

1. **Executive Summary** — vision, differentiator, scope boundary
2. **Project Classification** — type, domain, complexity, distribution posture
3. **Success Criteria** — user, business, technical; measurable outcomes
4. **Product Scope** — MVP (Phase A), Growth, Vision feature lists
5. **User Journeys** — Priya (hero), Marco (developer), Atlas (agent)
6. **Innovation & Novel Patterns** — competitive whitespace, validation tests
7. **SaaS B2B + Developer Tool Specific Requirements** — tenancy, RBAC, integrations, API surface, code examples, migration paths
8. **Project Scoping & Phased Development** — execution model (Opus orchestrator + Sonnet/Haiku workers), must-haves, phased rationale
9. **Functional Requirements** — 64 FRs across 10 capability areas (binding capability contract for v0.1)
10. **Non-Functional Requirements** — 49 NFRs across 8 quality dimensions (measurable SLOs)
11. **Scope Boundaries** — what the CMS does _not_ own (AIIA admin, consumer product admins, runtime business logic)

## Executive Summary

> **Scope Boundary — Possible CMS vs AIIA Admin.**
> Possible CMS manages the **marketing content and page structure** of sites (including AIIA's marketing site). It does **not** manage AIIA product-admin concerns: end-user accounts, licence keys, Intent API configuration, model routing, usage metering, billing, or any other runtime-product data. AIIA's product admin is a separate application with a separate data model, deployment, and lifecycle. The only AIIA entities the CMS is aware of are marketing artefacts — pages, blog posts, pricing _display_ tiles, FAQs, testimonials, integration logos, authors, legal pages, doc pages. The CMS never reads from, writes to, or depends on AIIA's product database. Other AIIA product surfaces (customer dashboards, integration consoles, admin panels) are out of scope for Possible CMS. The same boundary applies to every other consumer project.

Possible CMS is a Cloudflare-native, open-source content management system purpose-built for the **post-handover** phase of AI-delivered websites. Agents and developers assemble the site structure and register block types; non-technical owners then maintain content indefinitely through an Elementor-style visual canvas — no tickets, no devs, no CMS training. The product resolves every architectural and UX decision toward a single outcome: making ongoing content maintenance the cheap, low-friction phase of a website's lifecycle instead of the expensive bottleneck it is today.

The primary user is the marketer, ops lead, or founder who inherits a finished site. The secondary user is the AI agent or agency developer who authors the site's structure, schemas, and block registry during build. Both interact with the same API surface — the admin UI is the hero experience, the tRPC/REST API is the shared substrate. Content lives in Cloudflare D1 (structured data), R2 (media), and KV (public read cache); all runtime logic executes on Cloudflare Workers and Pages. The CMS is multi-project from day 1 (`workspace → project → site → page/record`), shipping as an MIT-licensed, self-hostable monorepo with AIIA and Barbuda Leisure as reference example projects.

### What Makes This Special

**Cloudflare-first foundation, not a deploy target.** Competitors bolt Cloudflare on as an output; Possible CMS _starts_ there. D1 is the database, R2 is media storage, KV is public-read cache, Workers are runtime, Cloudflare Images is the transform layer, Pages hosts the admin. No adapters, no rewrites to get edge economics — this is the only CMS where every primitive maps directly to a Cloudflare product.

**Post-handover hero user.** The admin UX is tuned for the non-technical owner editing content after the agency leaves, not for the developer building the site. This is enforced by a compose-don't-author ceiling: editors drag pre-registered blocks onto pages and fill in props; they never see a block-authoring surface. That single scope constraint eliminates the UX complexity that bloats competing visual builders (GrapesJS, WordPress page-builders) and keeps v1 shippable in six weeks.

**AI-native lifecycle by design.** The same REST/tRPC API the editor uses through the admin is the API the AI agent uses for structural updates — new block types, new schemas, new sites. One interface serves two user classes. When the client needs a layout change beyond block composition, the agent edits through the CMS, not around it.

**Core insight — why now:** Three forces converge. Cloudflare primitives matured (D1 GA, Workers AI, Images all production-ready). Open-source block editors hit usable maturity (Puck is MIT, JSON-serializable, Cloudflare-friendly). AI-accelerated dev cycles make building and maintaining a focused CMS economical for an agency, where five years ago it would have been a distraction. Traditional CMS vendors are structurally too slow to pivot to an edge-native, AI-lifecycle-first design — the window opens once and closes when a larger incumbent ships something similar.

## Project Classification

| Dimension                | Value                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project Type (primary)   | `saas_b2b` — multi-tenant platform shape (`workspace → project → site`), admin dashboard, RBAC roadmap, subscription-ready architecture                                                                                                                                                                                                                                                                               |
| Project Type (secondary) | `developer_tool` — `@possible-cms/sdk` runtime + build-time client, `possible-cms init\|export` CLI, `packages/blocks` registry, npm distribution                                                                                                                                                                                                                                                                     |
| Domain                   | `general` — no regulated industry; standard concerns (security, UX, performance, accessibility) apply                                                                                                                                                                                                                                                                                                                 |
| Complexity               | medium — CMS domain is well-trodden, but Cloudflare-edge multi-tenancy + Puck canvas + multi-project + OSS surface push above low; absence of regulatory load keeps it below high                                                                                                                                                                                                                                     |
| Project Context          | brownfield — existing PRD ([infrastructure/cloudflareCMS/prd-cms.md](/Users/kanousei/Documents/KPD/infrastructure/cloudflareCMS/prd-cms.md)), prior AIIA-scoped dev plan ([docs/plans/2026-04-18-cms-dev-plan.md](/Users/kanousei/Documents/KPD/docs/plans/2026-04-18-cms-dev-plan.md)), and approved universal + Elementor-style plan (`~/.claude/plans/i-want-you-to-fizzy-dove.md`) all loaded and being refreshed |
| Distribution Posture     | OSS-first, self-host is the product (MIT license); hosted/managed variant deferred to Phase D                                                                                                                                                                                                                                                                                                                         |
| Repo name (locked)       | `kanousei/possible-cms` on GitHub — supersedes earlier `aiia-caixo/caixo-cms` from the approved plan                                                                                                                                                                                                                                                                                                                  |

## Success Criteria

### User Success

**Post-handover admin (hero user):**

- Edits a page block (copy + image swap) in **under 2 minutes** without dev assistance, measured from landing on admin to published-live.
- **Zero support tickets** opened to the agency during normal content ops (copy, images, block reorder, new blog post) in the first 30 days post-handover. Target: 90% of client projects hit zero.
- First-session activation: on first login, publishes a meaningful content change (not a test) within **15 minutes**, without reading docs.

**Developer / AI agent (secondary):**

- Scaffolds a new `examples/<project>/` schema bundle and gets a working admin for it in **under 1 day** of work.
- Registers a new block type (Zod schema + React render + Puck fields) in **under 1 hour**.

### Business Success

**Internal adoption (3-month):**

- AIIA marketing site consumes Possible CMS (build-time mode) in production within **8 weeks** of repo creation.
- Barbuda Leisure Tours (project #2) migrated onto Possible CMS within **12 weeks**.
- Sunstone Phase 2 onboarded by **week 16** (replaces the TinaCMS plan in the Sunstone memory).

**OSS traction (12-month):**

- **100 GitHub stars** on `kanousei/possible-cms` by month 6.
- **5 external self-hosted deployments** confirmed (GitHub discussions or Cloudflare Workers analytics) by month 12.
- **1 external contributor PR merged** by month 9.

**Cost / lifecycle (ongoing):**

- Content maintenance hours per client-month drops to **<2 hours/client** (baseline: 6–8 hours/client/month today on direct agent editing).
- Marginal infrastructure cost per site: **<$1/month** on Cloudflare free/paid tiers at <100k monthly page views.

### Technical Success

- **Admin P95 page load: <2s** globally (Cloudflare Pages edge).
- **Public read API P95: <100ms** globally (KV cache hit).
- **Edit → publish → live: <30s** end-to-end (Puck save → D1 write → KV invalidate → edge serve).
- **Zero data-loss incidents** in first 12 months (D1 + nightly R2 backup, documented restore).
- **WCAG 2.1 AA** admin UI for the editor surface (keyboard, screen-reader, contrast).
- **Deploy-from-fresh-clone: <10 minutes** (measured in CI on a clean machine).
- **Test coverage: >80%** on `packages/sdk`, `packages/schema-kit`, `packages/blocks` (core surfaces). Admin UI covered by Playwright E2E, not unit-coverage.

### Measurable Outcomes

| Metric                                  | Target                                 | Measured by                    |
| --------------------------------------- | -------------------------------------- | ------------------------------ |
| Time to first content edit (new editor) | <15 min                                | Admin audit log timestamps     |
| Edit → live latency P95                 | <30 s                                  | Worker analytics               |
| Public API P95                          | <100 ms                                | Cloudflare Web Analytics       |
| Tickets/client/month (content ops)      | 0                                      | Manual log for first 5 clients |
| Projects onboarded                      | 3 (AIIA, Barbuda, Sunstone) by month 4 | Repo + production deploys      |
| GitHub stars                            | 100 by month 6                         | GitHub API                     |
| External deploys                        | 5 by month 12                          | Analytics + GitHub issues      |
| Cost per site                           | <$1/mo at 100k PV                      | Cloudflare billing             |
| D1 data-loss incidents                  | 0                                      | Incident log                   |

## Product Scope

### MVP — Phase A (6 weeks, must work to prove the concept)

- Single workspace (one `workspace_id`, no RBAC inside it yet; multi-`project` + multi-`site` work as designed).
- GitHub OAuth → JWT auth.
- 10 starter blocks (Hero, RichText MDX, Image, Pricing, FAQ, CTA, Columns, Spacer, Embed, Testimonials) with Zod schemas, React render, Puck fields.
- Puck canvas with save/load/publish, right-panel props editor, live preview.
- Records CRUD (schema-driven forms) for typed entities.
- Media upload to R2 with Cloudflare Images transforms, media library modal.
- Reference picker for linking records into blocks.
- Publish workflow: `draft → scheduled → live → archived` (cron Worker for scheduled).
- Public REST API on `public-api` Worker, KV-cached (5-min TTL, invalidate on publish).
- `@possible-cms/sdk` build-time + runtime client with `<Render />`.
- `possible-cms init <project>` + `possible-cms export --site X` CLI.
- AIIA + Barbuda seed importers in `examples/`.
- Nightly D1 backup to R2; documented restore.
- Audit log for mutations.
- `README.md`, `CONTRIBUTING.md`, MIT license, GitHub Actions CI, issue templates.
- E2E test matrix (Playwright) for auth, block canvas, record CRUD, publish, export, multi-site.
- Deploy in <10 min from fresh clone.

### Growth Features — Phase B/C (months 2–6, makes it competitive)

- Multi-workspace + multi-tenant RBAC (roles: owner, editor, developer, viewer).
- Versioning + revert on Pages and Records.
- Cloudflare Access as alternative auth.
- Durable Object preview sessions with short-lived signed tokens.
- Webhooks on publish/archive (outbound + inbound).
- Locale field with cross-locale ref integrity (true i18n).
- Plugin API — external packages extending block registry, field types, hooks.
- Multi-entity bulk actions (bulk publish, bulk delete, bulk tag).
- FTS5 search over records + blocks; optional Vectorize semantic search.
- 3rd + 4th OSS example projects generalized (Sunstone, LRG).
- Managed-cloud SaaS alpha behind an email waitlist.

### Vision (Future) — Phase D+ (post-launch, the dream)

- Plugin marketplace (Cloudflare-hosted).
- Managed SaaS with per-workspace Cloudflare account federation.
- AI-agent SDK: `PossibleAgent.createPage()`, `agent.addBlock()`, `agent.publish()` — dedicated agent-side API that respects RBAC.
- Multi-region D1 replication / read replicas.
- Real-time collaborative editing (Y.js or CRDT) on Puck canvas.
- Visual diff UI for versions (Git-for-content).
- CLI one-shot deploys: `possible-cms deploy --account <cf-account>` for agencies running 20+ client sites.
- Headless content syndication: single CMS fans out to multiple consumer sites (Next.js, Astro, Hugo, Svelte).

## User Journeys

### Journey 1 — Priya, post-handover marketing lead (hero user, happy path)

**Persona.** Priya runs marketing at a mid-sized tour operator in the Caribbean. 15 years in travel, fluent in WordPress circa 2016, deeply allergic to "please file a ticket." Her team just took delivery of a redesigned Barbuda Leisure Tours site from an agency. It's prettier and faster than what she had, but she's braced for the usual outcome: three months of emails trying to update tour pricing.

**Opening scene.** It's Tuesday. Hurricane season pricing shifts have been announced and she has to update five tour packages by Friday. She opens her laptop with the knot she always gets before editing a site. She logs into `admin.barbudaleisure.com` with her GitHub account. The admin loads in under 2 seconds.

**Rising action.** The admin shows her three tiles: Pages, Content, Media. She clicks Pages → "Tours Landing". The page opens in a Puck canvas — she can see the actual tours page, not a screen of field labels. She clicks the Pricing block on the canvas. The right panel lights up with the three tier cards. She changes the price for "Sunset Reef Tour" from $180 to $165, types a new copy line, and drags the "Reef Conservation" FAQ block up one position because it's the most common question this week.

**Climax.** She hits "Save Draft" and sees a preview on the right. She clicks "Schedule" and picks Friday 6am. Green toast: "Scheduled for Apr 24, 06:00 ADT". She didn't email the agency once.

**Resolution.** Friday 6:02am she opens the public site on her phone. Pricing is live, FAQ order changed, everything else untouched. She posts in the team Slack: "We're doing these ourselves now." Three months of tickets evaporate.

**Requirements revealed.** Puck canvas with live preview; right-panel props editor with price/text/image fields; block reordering by drag; schedule-to-publish with timezone-aware picker; role-less auth acceptable in MVP (single admin team); visual confirmation (toasts) on save/schedule/publish; sub-2s admin load; stable edit URLs for returning users.

### Journey 2 — Priya, edge case (image upload fails)

**Scene.** Two weeks later. Priya has a new photo of the sunset reef from a recent trip. She drags the JPEG into the Image block's picker. Uploader spins. Fails.

**What the admin does.** Toast: "Upload failed — file over 10 MB. [Auto-resize and retry]". She clicks retry. The image uploads, Cloudflare Images transforms it for web, placeholder shows while processing, block renders the new image within 3 seconds. A small info line reads: "Resized from 14.2 MB to 680 KB."

**What the admin doesn't do.** It doesn't dump a stack trace. It doesn't silently fail. It doesn't make her email the agency to resize a photo.

**Requirements revealed.** R2 signed PUT URL flow with client-side size validation; automatic image resize via Cloudflare Images on upload; human-readable error toasts with recovery actions; placeholder/skeleton states during async work; image metadata visible in media library (dimensions, size, format).

### Journey 3 — Marco, agency dev onboarding a new client

**Persona.** Marco is a freelance dev working with a Kanousei agency pod. He's been given a new client: SunStone Hotels. The site spec lives in a Notion doc and a Figma file. The agency's new rule is: "every new client site ships on Possible CMS."

**Opening scene.** 9am Monday. He `git clone git@github.com:kanousei/possible-cms.git`, runs `pnpm install` and `wrangler deploy` against a fresh Cloudflare account. The admin boots. He logs in. Empty workspace.

**Rising action.** He runs `pnpm possible-cms init sunstone`. CLI asks: workspace name, site domain, starter bundle. He picks "hospitality" bundle (inherits base + adds Room, Amenity, Booking Inquiry, TestimonialCarousel). Files scaffold into `examples/sunstone/`. He opens `schema.ts` and edits two fields to match the Figma. Commits. CI runs.

**Climax.** On refresh, admin shows SunStone's new content types. He uses Puck to assemble the homepage from the Figma: Hero + Image Gallery + Room Cards + Booking Inquiry CTA + FAQ. He saves, publishes. The public site — not yet themed — renders correctly with default styling. Total elapsed: **under 4 hours** from clone to deployed admin with real schema.

**Resolution.** He hands the admin URL to SunStone's ops manager Wednesday afternoon, with a 10-minute walkthrough loom. By Friday, SunStone has edited room descriptions and added two testimonials themselves. Marco moves to the next client.

**Requirements revealed.** One-command install path (`pnpm install` + `wrangler deploy` under 10 minutes); `possible-cms init <project>` CLI with bundled starter kits; scaffolded `examples/<project>/` with Zod schemas + seed data; hot reload of schema into admin; block registry extensible per-site; default styling that looks acceptable before theming; deploy-from-commit CI pipeline.

### Journey 4 — Atlas, the AI agent doing structural updates

**Persona.** Atlas is the Kanousei Web Studio dev-agent (Sonnet, running inside PaperclipAI). Six weeks after SunStone went live, the client asks for a "Meet the Team" page type with staff bios. This is outside the originally registered blocks.

**Opening scene.** The CEO-agent triages the request, assigns Atlas. Atlas reads the ticket, pulls the current schema via the same `GET /v1/admin/collections` endpoint Marco's tooling used, and decides: new `TeamMember` record type + new `TeamGrid` block.

**Rising action.** Atlas writes a PR against `examples/sunstone/`: adds `TeamMember` Zod schema, adds `TeamGrid` block in `packages/blocks/` (opt-in via the site's `block-whitelist.ts`), wires up `TeamGrid.render` to query `TeamMember` records by `site_id`. Runs `pnpm typecheck` and `pnpm test`. Opens PR.

**Climax.** PR gets auto-reviewed by the QA agent. On merge, CI deploys. The admin now exposes `TeamMember` as a content type and `TeamGrid` in the Puck block picker. Atlas then uses the CMS REST API (the same API Priya's admin uses under the hood) to POST 8 `TeamMember` records seeded from the Figma bios, then creates a `/team` page, drops a Hero + TeamGrid block onto it, schedules publish for tomorrow.

**Resolution.** SunStone's ops manager wakes up to a new `/team` page. She edits one bio herself — Atlas seeded the bios but got one job title wrong. She fixes it in the admin, no dev involvement. Atlas closes the ticket.

**Requirements revealed.** tRPC/REST admin API surfaced externally with auth (API tokens for agents, distinct from user sessions); block registry keyed per-site so new blocks don't leak across projects; idempotent POST for records (agents may retry); machine-readable schema introspection endpoint; audit log distinguishes `user_id` vs `agent_id`; API tokens scoped to project/site with create/publish/delete bits.

### Journey Requirements Summary

The four journeys reveal these capability clusters, each backed by at least one journey:

| Capability                                                | Revealed by      |
| --------------------------------------------------------- | ---------------- |
| Puck canvas: drag, reorder, props-edit, live preview      | Priya happy path |
| Schedule-to-publish with timezone awareness               | Priya happy path |
| GitHub OAuth auth (users) + API tokens (agents)           | Priya, Atlas     |
| R2 upload with size validation + Cloudflare Images resize | Priya edge case  |
| Human-readable error toasts + recovery actions            | Priya edge case  |
| Media library with metadata                               | Priya edge case  |
| `possible-cms init <project>` CLI with starter bundles    | Marco            |
| One-command `wrangler deploy` from fresh clone (<10 min)  | Marco            |
| Hot-reload of schema changes into admin                   | Marco            |
| Extensible block registry scoped per-site                 | Marco, Atlas     |
| Default styling before theming                            | Marco            |
| Introspection API for schemas + collections               | Atlas            |
| Idempotent record writes with agent-scoped audit log      | Atlas            |
| Site-scoped API tokens with fine-grained scopes           | Atlas            |
| CI-on-merge deploy pipeline                               | Marco, Atlas     |

Deliberately **not** included (OSS consumer journey): installing externally for a personal project. That journey is covered by the Marco journey's first 30 minutes — if Marco's flow works, the OSS hobbyist's flow works. Adding it would duplicate.

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. AI agents as first-class users, not afterthought integrations.**
Every existing CMS (Sanity, Payload, Strapi, Directus, WordPress) models humans as primary users and exposes a "headless API" as a secondary surface for machines. Possible CMS inverts the default: the same tRPC/REST API is the _shared substrate_ for humans-via-admin and agents-via-SDK. Agents get distinct auth (scoped API tokens), distinct identity in the audit log (`agent_id` vs `user_id`), and an introspection endpoint that exposes schema, block registry, and collection structure machine-readably. The Atlas journey isn't a novelty path — it's the same path Priya uses, with a different credential. This matters because the actual lifecycle of a client site increasingly involves both: humans edit copy, agents change structure. Treating them as peer users eliminates the "we need a different tool for AI updates" category of problem.

**2. Post-handover workflow as the product's measurable promise.**
Competing CMSs sell themselves on authoring ergonomics or developer experience. Possible CMS sells _what happens after launch_: zero tickets in the first 30 days of normal content ops, <2 minutes to edit-and-publish, <30s edit-to-live propagation. These are workflow SLOs, not feature claims. Nothing structurally prevents a competitor from claiming this, but none does — because their UX is built for the build phase, not the post-build phase, and retrofitting that emphasis is hard. The compose-don't-author ceiling is the scope discipline that makes the promise achievable.

**3. Cloudflare primitive mapping as the architectural commitment.**
Existing "Cloudflare-compatible" CMSs treat Cloudflare as a deploy target — you get Workers hosting, but the DB is Postgres (external), media is S3 (external), cache is Redis (external). Possible CMS maps directly: D1 _is_ the DB, R2 _is_ the media store, KV _is_ the public read cache, Workers AI _is_ available in the runtime for future semantic/agent features, Cloudflare Images _is_ the transform. Cost drops roughly an order of magnitude (single-digit dollars per site per month at 100k PV) because there are no external dependencies. This is an economically novel position even if each individual primitive is mundane.

### Market Context & Competitive Landscape

| Incumbent                              | Strength                                        | Why they can't easily copy                                            |
| -------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| **WordPress / Elementor**              | Massive ecosystem, plugin market, editor UX     | Architected for PHP+MySQL; Cloudflare play means rewrite, not adapter |
| **Webflow**                            | Best-in-class visual builder, designer-friendly | Proprietary hosting, no self-host, no OSS, no AI-native API           |
| **Sanity**                             | Headless quality, Portable Text                 | No Cloudflare-native path, no visual canvas for editors, SaaS-first   |
| **Payload CMS**                        | TS-first, OSS, rich block support               | MongoDB/Postgres dependency, no Cloudflare-native primitives          |
| **Directus / Strapi**                  | Generalist OSS headless                         | Same DB dependency; not block-canvas-first                            |
| **Sanity + Vercel / Payload + Vercel** | Modern stacks                                   | Vercel economics ≠ Cloudflare economics; not agent-first              |

Possible CMS sits in a white-space: **Cloudflare-native + visual-canvas + agent-as-peer + post-handover-focused + OSS**. Each of those is available individually somewhere; the combination isn't.

### Validation Approach

Each claim has a concrete, early test built into the Phase A milestones:

- **AI-agents-as-peers.** Validated by the Atlas journey running end-to-end in Week 5: same API tokens, same idempotent record writes, same audit log schema. If the journey requires a separate agent-only endpoint, the claim fails and we degrade to "good headless API" positioning.
- **Post-handover workflow SLOs.** Validated against live usage: AIIA cutover Week 8 with logged metrics; ticket count to agency tracked monthly. If month-3 ticket count from the first 5 clients exceeds 1/client/month on content ops, the claim fails and we either tighten UX or soften the promise.
- **Cloudflare primitive economics.** Validated by Week 6 cost model: measured D1 reads, R2 GB-months, KV reads, Workers invocations on AIIA + Barbuda during normal ops. If per-site cost exceeds $1/mo at <100k PV, the claim is nuanced (e.g. "cheap up to 100k, scales linearly after").

### Risk Mitigation

| Innovation risk                                                                           | Fallback                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Agents-as-peers API surface proves unsafe (agent credentials leak, blast radius too wide) | Fine-grained token scopes per operation class (`read:*`, `write:content`, `write:schema`, `publish`); fall back to human approval gate for schema writes in v1 if needed |
| Post-handover SLO unmeetable because editors still confuse on edge cases                  | Ship with a Loom-based quickstart per project; add contextual help in the admin; don't make the 30-day-zero-tickets claim public until 5 clients validate it             |
| D1 hits scale limits earlier than expected (10 GB, 1 billion reads/day)                   | Partition strategy: one D1 per workspace at scale; document cutover path; add Turso or Postgres adapter as escape hatch in Phase C                                       |
| Puck becomes abandoned or pivots away from OSS                                            | Fork in `packages/blocks/puck-fork/`; JSON schema stays stable so swap cost is bounded to the editor shell                                                               |
| Cloudflare primitive drift (D1 API breaks, R2 pricing changes)                            | Adapter layer in `packages/storage/` isolates Cloudflare specifics; contingency port to Hetzner/Oracle in infra already exists                                           |
| Novelty claims attract scrutiny and disappointment if imperfect                           | Position the claims as SLOs we're tracking publicly on the README, not as marketing absolutes; update numbers monthly                                                    |

## SaaS B2B + Developer Tool Specific Requirements

### Project-Type Overview

Possible CMS is a multi-tenant SaaS-shaped platform distributed primarily as open-source self-host, with a developer-tool surface (SDK + CLI + block registry) wrapped around the same core. Every `saas_b2b` pattern applies to the _hosted/self-hosted deployment model_ — tenancy, permissions, integrations — while every `developer_tool` pattern applies to _how external developers extend it_ — npm packages, type surfaces, install flow, examples.

### Technical Architecture Considerations

**Stack.** TypeScript end-to-end. Next.js 15 App Router (admin, Cloudflare Pages). Three Cloudflare Workers (`admin-api` tRPC, `public-api` REST+KV, `preview`). D1 (structured data). R2 (media). KV (public read cache). Cloudflare Images (transforms). Drizzle ORM + `drizzle-kit` for migrations. Puck for block canvas. Zod for all schemas (storage, API, form generation, block props). shadcn/ui + Tailwind for admin UI. Playwright for E2E. Auth via GitHub OAuth (MVP) + API tokens for agents, Cloudflare Access optional in Phase B.

### Tenant Model (multi-tenancy)

Hierarchy: `workspace → project → site → { page, record, asset }`.

- **Workspace** is the billing/ownership boundary (relevant post Phase-D managed variant).
- **Project** groups related sites under a single client/product (e.g. SunStone has one project with marketing + booking subdomains as separate sites).
- **Site** is a single origin — one admin surface per site, one set of pages, one API subdomain.

**Phase A implementation:** tables exist and are populated; FK enforcement in place; but single `workspace_id = 1` is seeded automatically — no workspace-switcher UI yet. Migration to multi-workspace in Phase B is a UI-only change; the schema is already shaped for it.

**Isolation guarantees (Phase A):** all queries scope by `site_id`. Cross-site joins require explicit `project_id` context. R2 object keys prefixed `{workspace_id}/{project_id}/{site_id}/`. KV keys prefixed `page:{site_id}:{slug}`. Audit log records tenant triple on every mutation.

### RBAC Matrix

**Phase A (single workspace, no RBAC):**

| Role                      | Capability                                        |
| ------------------------- | ------------------------------------------------- |
| Admin user (GitHub OAuth) | Full read/write on all sites within the workspace |
| Agent (API token)         | Per-token scoped; see scopes below                |

**Phase B (multi-tenant RBAC):**

| Role        | Pages | Records | Media | Schema | Publish | Workspace admin |
| ----------- | ----- | ------- | ----- | ------ | ------- | --------------- |
| `owner`     | RW    | RW      | RW    | RW     | ✓       | ✓               |
| `editor`    | RW    | RW      | RW    | —      | ✓       | —               |
| `developer` | RW    | RW      | RW    | RW     | —       | —               |
| `viewer`    | R     | R       | R     | R      | —       | —               |

**Agent API token scopes** (Phase A + onwards, orthogonal to user roles):
`read:content`, `read:schema`, `write:content`, `write:schema`, `publish`, `delete`. Tokens scoped to `site_id` (optional) or `project_id`. Default scope set for Kanousei Web Studio agents: `read:*`, `write:content`, `publish` — **not** `write:schema` or `delete` without explicit grant.

### Subscription Tiers

**v1 posture:** none. Distribution is OSS self-host (MIT). No licence keys, no paywall, no SaaS tier selection UI. Consumers deploy into their own Cloudflare account.

**v2+ (Phase D managed):** deferred. When it ships, tiers will key off workspace quota (sites per workspace, D1 reads/month, R2 GB-months, KV reads/day). No hard commitment here — flagged so tenant schema doesn't paint into a corner (workspace.plan is already a nullable column in the design).

### Integration List

**Platform integrations (not optional — these ARE the platform):**

- Cloudflare D1 · R2 · KV · Workers · Pages · Cloudflare Images · Workers Analytics · Cloudflare Access (Phase B auth alt)

**Build / ecosystem integrations (tightly coupled):**

- GitHub OAuth (user auth, MVP)
- Puck (visual block canvas)
- Drizzle ORM + drizzle-kit (D1 migrations)
- shadcn/ui + Tailwind (admin UI primitives)
- Zod (schema contract across form-gen, API, block props, D1 types)
- MDX / `@mdx-js/mdx` (RichText block body)

**Consumer integrations (via SDK):**

- Astro content collections (build-time export target)
- Next.js App Router (runtime SDK with `<Render />`)
- Svelte / SvelteKit (runtime SDK, same JSON output)
- Hugo / Jekyll via `possible-cms export` JSON (Phase B nice-to-have)

**Out of scope for v1 (explicitly):** Zapier, Make, Salesforce/HubSpot CRM, Slack/Discord notifications, Figma, Google Drive, Dropbox, S3/Postgres adapters. These get Phase B webhook + plugin-API treatment, not bespoke integrations.

### Compliance Requirements

No regulated compliance load (domain=general). Universal hygiene items:

- **OWASP Top 10** — injection (Zod-validated at every boundary), broken access control (tenant scoping in every query), secrets (Cloudflare secrets binding, no env files), XSS (React default-escapes + MDX sanitization).
- **GDPR data-portability & erasure** — `possible-cms export --site X` dumps all tenant data; `DELETE /v1/admin/workspaces/{id}` (Phase B) cascades D1 + R2 removal; audit log retention documented.
- **WCAG 2.1 AA on admin UI** — keyboard navigation on canvas, ARIA for Puck drop zones, color contrast in shadcn/ui default theme, screen-reader labels on block prop inputs.
- **SOC2 / ISO 27001** — out of scope for v1 self-host; tenant retains responsibility. If Phase D managed ships, apply there.

### Language Matrix

| Surface                                  | Language             | Notes                                                         |
| ---------------------------------------- | -------------------- | ------------------------------------------------------------- |
| Admin app                                | TypeScript (React)   | strict mode, no `any` except in 3rd-party interop             |
| Workers (admin-api, public-api, preview) | TypeScript           | compiled via wrangler, `@cloudflare/workers-types`            |
| SDK (`@possible-cms/sdk`)                | TypeScript           | ships with `.d.ts` + CJS + ESM builds                         |
| Schema kit (`@possible-cms/schema-kit`)  | TypeScript           | Zod helpers, typed by `z.infer` throughout                    |
| Blocks (`@possible-cms/blocks`)          | TypeScript + React   | each block is `{ zodProps, render: FC, fields: PuckField[] }` |
| CLI (`@possible-cms/cli`)                | TypeScript (tsx-run) | distributed as bin in npm package                             |
| Migrations                               | SQL                  | Drizzle-generated, plain SQL reviewed on PR                   |
| Consumer site integrations               | TS or JS             | consumers may use either; types always available              |

No polyglot runtime. If a Phase C plugin needs native code, it must compile to WASM — Workers constraint.

### Installation Methods

**1. Self-host (primary):**

```bash
git clone git@github.com:kanousei/possible-cms.git
cd possible-cms
pnpm install
cp .dev.vars.example .dev.vars   # fill Cloudflare account + GitHub OAuth creds
wrangler d1 create possible-cms && wrangler d1 migrations apply
wrangler deploy
# open the deployed admin, log in
```

Target: <10 minutes from clone to working admin on a fresh machine.

**2. Template fork (secondary, Phase C):**
GitHub "Use this template" on `kanousei/possible-cms` — fork, customize, deploy. Lets downstream users iterate without tracking upstream's `main`.

**3. SDK-only (for consumers who already have a CMS):**
`pnpm add @possible-cms/sdk` — use `createClient()` + `<Render />` to render another Possible CMS deployment's content inside your own app. No self-hosting required.

**4. CLI-as-agent-operator (Phase B):**
`npx @possible-cms/cli login --token=... && npx @possible-cms/cli publish page.json` — use the CLI as an interface to a deployed CMS from CI or an agent pipeline. Same auth model as the SDK.

### API Surface

**Admin API (tRPC over HTTPS, Worker `admin-api`):**

- `auth.login`, `auth.session`, `auth.logout`
- `workspace.{list, get, update}`, `project.{list, create, update}`, `site.{list, create, update}`
- `page.{list, get, save, publish, schedule, archive}`
- `record.{list, get, create, update, delete, publish}`
- `collection.{list, introspect}` — returns Zod schema JSON
- `block.{listRegistered}` — returns available block types + Zod props + default fields
- `asset.{list, uploadUrl, delete}` — returns signed R2 PUT URLs
- `audit.{list, tail}`
- `agent.{issueToken, revokeToken, listTokens}`

**Public API (REST over HTTPS, Worker `public-api`, KV-cached):**

- `GET /v1/{site}/pages/{slug}` → `{ blocks, meta, renderedHtml? }` (rendered HTML optional query param for static consumers)
- `GET /v1/{site}/{collection}/{slug}` → single record
- `GET /v1/{site}/{collection}?limit&offset&filter` → record list
- `GET /v1/{site}/schema` → Zod schema JSON (agent introspection)
- `POST /v1/{site}/preview` → bypass cache, signed preview token

All responses are JSON. All public responses are edge-cached. All admin mutations invalidate relevant KV keys on success.

### Code Examples

**Register a block:**

```ts
// packages/blocks/src/pricing.tsx
import { z } from 'zod'
import { block } from '@possible-cms/schema-kit'

export const Pricing = block({
  type: 'Pricing',
  propsSchema: z.object({
    heading: z.string(),
    tiers: z.array(z.object({
      name: z.string(),
      price: z.number(),
      features: z.array(z.string())
    })).min(1).max(4)
  }),
  render: ({ heading, tiers }) => (
    <section>
      <h2>{heading}</h2>
      <div className="grid">
        {tiers.map(t => <TierCard key={t.name} {...t} />)}
      </div>
    </section>
  ),
  fields: {
    heading: { type: 'text', label: 'Section heading' },
    tiers: { type: 'array', label: 'Pricing tiers', itemFields: { /* ... */ } }
  }
})
```

**Use the SDK to render a page (Next.js):**

```ts
// app/[slug]/page.tsx
import { createClient, Render } from '@possible-cms/sdk'

const cms = createClient({ endpoint: process.env.CMS_URL!, site: 'aiia' })

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await cms.getPage(params.slug)
  if (!page) notFound()
  return <Render data={page.blocks} />
}
```

**Agent operation (pseudo-code):**

```ts
// PaperclipAI Web Studio agent
const cms = createClient({
  endpoint: CMS_URL,
  site: "sunstone",
  token: AGENT_TOKEN,
});
const members = await Promise.all(
  figmaBios.map((bio) =>
    cms.records.create("TeamMember", bio, { idempotencyKey: bio.id }),
  ),
);
const page = await cms.pages.create({
  slug: "team",
  blocks: {
    root: { props: {} },
    content: [
      { type: "Hero", props: { heading: "Meet the team" } },
      { type: "TeamGrid", props: { memberIds: members.map((m) => m.id) } },
    ],
  },
});
await cms.pages.schedule(page.id, { at: tomorrow6AM });
```

### Migration Guide

Two migration paths documented at v0.1:

**1. Existing Astro/Next.js static-content → Possible CMS.**
Relevant to AIIA's cutover. Use `examples/aiia/import.ts` as the template: reads `src/content/**.mdx` + frontmatter + `schema.json`, writes into D1 via admin tRPC endpoints. Dry-run mode diffs output against current content collections before commit. Round-trip: `possible-cms export --site aiia --out ./src/content/` produces byte-identical output to the original static files for verification.

**2. Upstream Possible CMS schema changes → existing deployment.**
Every release ships `migrations/NNNN_*.sql` + a `MIGRATION-NOTES.md` entry. Consumers run `wrangler d1 migrations apply possible-cms --remote`. Breaking schema changes gated by major version bumps (semver). `possible-cms doctor` command (Phase B) reports pending migrations and schema drift.

### Implementation Considerations

- **Tenant-scoping middleware** must run before every query; a missing `site_id` in a query throws at the ORM layer (Drizzle query builder wrapped in a `siteScoped()` helper).
- **Block registry** is per-site via `site.block_whitelist: string[]`. Admin picker filters by the whitelist. Loading an unknown block type in a saved page renders a placeholder + logs an audit warning — never a crash.
- **Idempotency**: all `record.create` and `page.create` accept an `idempotencyKey`. Duplicate keys within a 24h window return the existing record ID. Relevant for agent retries.
- **Edit-to-live propagation**: `page.publish` writes D1 → writes KV → returns. Target <30s P95 under normal load; monitored via Worker analytics.
- **No server-side rendering of Puck canvas**: admin-side preview uses client components; public-side rendering uses the same `<Render />` as a server component. Single source of truth for block render logic.
- **Skipped (per CSV guidance):** mobile-first admin UI (editors use desktop or tablet — mobile admin is Phase C nice-to-have); app-store compliance (N/A); visual-design sections beyond admin UX (consumer sites ship their own design system); user-journey sections specific to mobile/native (N/A).

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP approach: platform + experience hybrid.** Not a pure problem-solving MVP (the market has plenty of working CMSs), not a revenue MVP (OSS self-host, no monetization in v1). Possible CMS is a **platform MVP** because it has to work as the foundation for every Kanousei/AIIA/client web project going forward — getting the hierarchy (`workspace → project → site`) and extensibility (block registry, schema bundles) wrong is expensive to unwind. It is also an **experience MVP** because Priya's journey has to feel good on day 1 or the entire post-handover thesis collapses: a CMS that nobody uses is not a CMS.

**What this means concretely:**

- Shippable MVP = Priya's happy path works end-to-end for AIIA content on production, and Marco's 4-hour flow works from a fresh clone. Everything else is gravy.
- We resist the SaaS-MVP instinct to ship a narrow vertical (e.g. "only blog posts") because narrow isn't platform. Width of the 10-block set + records CRUD + multi-site is non-negotiable.
- We resist the platform-MVP instinct to generalize every surface (e.g. plugin API in Phase A) because generalization before validation is expensive. Plugin API waits until 2+ real projects have shipped on Phase A.

**Fastest path to validated learning:** AIIA cutover by week 8 (build-time export mode, byte-identical to current static output). The learning is not "does it work" — it's "does Priya stop filing tickets." Measured in week 9-12 via ticket-count-per-client-month on AIIA + Barbuda.

### Resource Requirements — Execution Model

Opus orchestrates; Sonnet/Haiku personas with practical skills execute in parallel workflows.

| Role                                                        | Who                                                   | Model             | Scope                                                                                                    |
| ----------------------------------------------------------- | ----------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------- |
| Orchestrator / strategy / PRD / ADRs / integration / review | This session (Opus)                                   | `claude-opus-4-7` | Routes work, holds schema contract, reviews PRs, wires integration seams, final gate on each week's demo |
| CEO / triage / prioritisation                               | Web Studio CEO-agent                                  | Sonnet            | Epic assignment                                                                                          |
| PM / story breakdown                                        | Web Studio PM-agent                                   | Sonnet            | Stories + acceptance criteria                                                                            |
| Backend worker A (Workers + D1 + tRPC)                      | Web Studio Backend-dev OR parallel Claude-Code Sonnet | Sonnet            | Schema, migrations, admin-api                                                                            |
| Backend worker B (public-api + KV + SDK)                    | Parallel Claude-Code Sonnet                           | Sonnet            | Public REST + caching + `@possible-cms/sdk`                                                              |
| Frontend worker A (admin shell + auth)                      | Web Studio Frontend-dev                               | Sonnet            | Next.js shell, OAuth flow, list views                                                                    |
| Frontend worker B (Puck canvas + 10 blocks)                 | Parallel Claude-Code Sonnet                           | Sonnet            | Block registry, canvas, per-block props editors                                                          |
| CLI + examples (AIIA + Barbuda seed)                        | Haiku worker                                          | Haiku             | `init`/`export` CLI, seed importers                                                                      |
| QA / E2E                                                    | Web Studio QA-agent                                   | Sonnet            | Playwright suite                                                                                         |
| Design (admin UX, block defaults)                           | Web Studio Designer-agent                             | Sonnet            | Week 2 + week 4 touchpoints                                                                              |

**Skills attached to workers** (per Kanousei skill registry): `bmad-dev` + `bmad-dev-story` for implementation; `bmad-code-review` + `review` on every PR; `bmad-qa-generate-e2e-tests` + `qa` for QA worker; `frontend-design` + `app-design` for frontend workers; `claude-api` where Workers AI primitives come into play; `accessibility-compliance-checker` for admin UI; `webapp-testing` for Playwright authoring.

**Parallelism window:** weeks 2-5 are the 5-7 concurrent-worker parallel phase, all operating against a locked schema contract issued by the orchestrator at end of week 1. Week 1 (scaffold + schema contract) and week 6 (hardening + OSS polish) are serialized under the orchestrator.

**Minimum viable team if advisor-mode bottlenecks:** Harold + Opus orchestrator + 2 parallel Sonnet workers direct from Claude-Code, no PaperclipAI. Slows weeks 2-5 by ~30%; still lands v0.1 inside week 8.

### Must-Have Analysis (Phase A)

Applied the "without this, does the product fail?" test against every journey + success criterion. The MVP feature list in Product Scope passed this filter because each item maps directly to a journey step. Items specifically tested and **retained** because cutting them breaks a journey:

- **Puck canvas with live preview** — cuts Priya's happy path.
- **R2 upload with Cloudflare Images resize** — cuts Priya's edge case; without auto-resize, marketers bounce on the first large photo.
- **Schedule-to-publish** — cuts Priya's happy path (hurricane-pricing scenario).
- **`possible-cms init` CLI** — cuts Marco's onboarding to "manually copy a folder and edit imports." Kills the 4-hour claim.
- **Site-scoped block whitelist** — cuts Marco + Atlas cleanly; without it, every new block leaks into every project.
- **Agent API tokens + audit log with `agent_id`** — cuts Atlas journey entirely. Core innovation claim dies.
- **Records CRUD with reference picker** — without references, Pricing block can't link to PricingTier records. Most real content is relational.

Items specifically tested and **cut from MVP** because a journey still works without them:

- **RBAC roles** — Phase A single workspace means "the admin team shares one role." Priya doesn't need viewer-vs-editor distinction yet. Ship flat-auth, add roles Phase B.
- **Versioning + revert** — Priya might make a mistake; audit log + manual D1 restore is acceptable for v1. Cheap to add in Phase B once D1 versioning tooling matures.
- **Localisation** — AIIA launch is en-only. Barbuda is en-only. A locale _field_ exists in the schema (future-proof) but cross-locale integrity is Phase B.
- **Preview Durable Objects** — replaced with signed-URL preview (5-min TTL token) for v1. Durable Objects come back in Phase B when multi-user preview sessions matter.
- **Webhooks** — consumers can poll or use `possible-cms export` on a cron in v1. Webhooks are Phase B.
- **FTS5 / Vectorize search** — admin search over records is a convenience for large catalogs. AIIA has <50 records at launch; scan-and-filter is fine. Phase B.
- **Plugin API** — defer until 2+ projects on Phase A generate concrete extension pressure.

### Phased Roadmap — Strategic View

(Feature lists live in Product Scope; below is the _why_ for each phase boundary.)

**Phase A — MVP (weeks 1-6).** Platform + experience foundation. Single-workspace, 10 blocks, multi-project, multi-site, OSS release at v0.1.0. Gate: AIIA consumes it in production via build-time export by week 8. Learning: does Priya stop filing tickets?

**Phase B — Growth (months 2-4).** Unlocks multi-workspace (real tenancy), versioning (real operator confidence), webhooks + Durable Object preview (real agent workflows), i18n (AIIA Arabic + Barbuda Spanish). Gate: 3+ internal projects live + first external self-host deployment. Learning: does the API surface survive extension pressure without a major redesign?

**Phase C — Expansion (months 5-8).** Plugin API, 3rd/4th example projects (Sunstone, LRG), docs site dogfooded on Possible CMS itself. Gate: 5+ external deploys, 100+ GitHub stars, 1+ external contributor PR merged. Learning: does the OSS flywheel start turning or does it stall?

**Phase D — Managed / marketplace (months 9+).** Optional managed SaaS alpha, Cloudflare Marketplace presence, AI-agent SDK as a first-class DX product. Gate: enough external demand to justify the ops overhead of running a managed variant.

### Risk Mitigation Strategy

**Technical risks.** Enumerated in the earlier plan and innovation risk section; Phase A-specific mitigations:

- **Puck fit risk.** Day-1 spike in week 2: build a nested-drop-zone test case before committing the rest of the admin shell to Puck. If it fails, fork-or-replace decision made while schema contract is still soft.
- **D1 scale risk.** Benchmark at week 5 against AIIA's realistic record volume (~200 records, ~30 pages). If D1 read budget projects to >50% of paid-tier allowance at 100k PV, add R2 object-cache-fallback layer to public-api before v0.1.
- **Schema drift across phases.** Every mutation to `packages/schema-kit` or core D1 tables requires a migration file + `MIGRATION-NOTES.md` entry in the same PR. CI gates on this (grep for `migrations/` changes when `schema-kit` changes).

**Market risks.** Primary risk: "built-for-Harold" — Possible CMS ships perfectly for AIIA + Barbuda and doesn't fit anyone else. Mitigations:

- Barbuda-as-second-example is a non-negotiable gate. If Barbuda's schema bundle reveals AIIA-specific assumptions baked into `packages/*`, we refactor before v0.1.
- No `aiia`, `barbuda`, `kanousei`, `sunstone` string literals in `apps/` or `packages/`. CI grep-gate.
- OSS release before Phase C — get external deployers in the loop before we've over-fit to internal projects.

**Resource risks.** Primary: advisor-mode throughput bottlenecking on PaperclipAI Web Studio agent availability.

- 20% slack per milestone (6-week plan has 7 weeks of calendar).
- Hybrid fallback: Opus orchestrator + 2 parallel Claude-Code Sonnet workers direct, no PaperclipAI. Still lands v0.1 in week 8.
- If week slips >2 days on load-bearing path (week 2 Puck integration, week 4 publish workflow), we descope a growth feature _from Phase B_ to keep Phase A on track. Phase A scope itself doesn't flex.

## Functional Requirements

### 1. Authentication & Identity

- **FR1:** Editor can authenticate to the admin via GitHub OAuth.
- **FR2:** System establishes a session-bound identity after successful authentication and issues a JWT valid for configurable TTL.
- **FR3:** Editor can terminate their session (logout).
- **FR4:** Operator can generate API tokens for agents, scoped to one or more sites or projects.
- **FR5:** Operator can revoke API tokens at any time; revocation takes effect within 60 seconds on the edge.
- **FR6:** System distinguishes user-session identity from agent-token identity in every audit log entry.
- **FR7 [B]:** Editor can authenticate via Cloudflare Access as an alternative to GitHub OAuth.

### 2. Workspace / Project / Site Management

- **FR8:** System stores content within a `workspace → project → site` hierarchy with enforced tenant scoping on every read and write.
- **FR9:** Operator can list all projects within the active workspace.
- **FR10:** Operator can list all sites within a given project.
- **FR11:** Operator can create a new project via the CLI, specifying a starter schema bundle.
- **FR12:** Operator can create a new site under a project via the CLI or admin.
- **FR13 [B]:** Workspace owner can invite additional users and assign roles (owner, editor, developer, viewer).
- **FR14 [B]:** Operator can switch between workspaces in the admin UI.

### 3. Page Composition (Visual Block Canvas)

- **FR15:** Editor can open an existing page in a visual canvas that renders the page as it will appear live.
- **FR16:** Editor can drag a block from a block palette onto the canvas.
- **FR17:** Editor can reorder blocks on the canvas by drag.
- **FR18:** Editor can remove a block from the canvas.
- **FR19:** Editor can select a block on the canvas and edit its properties in a side panel, where the panel fields are generated from the block's registered schema.
- **FR20:** Editor can save the current canvas state as a draft without publishing it.
- **FR21:** System validates block properties against the block's registered schema on every save; invalid saves are rejected with a human-readable message.
- **FR22:** System restricts the block palette on a given site to the blocks explicitly whitelisted for that site.
- **FR23:** System renders a page using the exact same block render components in the admin preview and on the public site (single source of truth).
- **FR24:** System renders an unknown (de-registered) block type as a placeholder rather than crashing the page.

### 4. Content Records

- **FR25:** Editor can list all records of a given collection (e.g. BlogPost, PricingTier), filterable and sortable.
- **FR26:** Editor can create a new record via a form whose fields are generated from the collection's registered schema.
- **FR27:** Editor can update, delete, and duplicate records.
- **FR28:** Editor can link one record to another via a reference picker (e.g. link a Pricing block to a PricingTier record).
- **FR29:** System enforces referential integrity: a record cannot be deleted while another record or page block references it (soft-block with an explanatory error).
- **FR30:** Operator can define a collection by registering its Zod schema; the admin surfaces the collection automatically.

### 5. Media Management

- **FR31:** Editor can upload an image or other asset through the admin; assets are stored in R2 under a tenant-scoped prefix.
- **FR32:** System automatically transforms uploaded images for web delivery (resize, format conversion) via the configured image transform pipeline.
- **FR33:** Editor can browse all assets belonging to the current site in a media library.
- **FR34:** Editor can pick an asset from the media library when editing a block or record field.
- **FR35:** System surfaces asset metadata (dimensions, size, format, upload date) in the media library.
- **FR36:** Editor receives a human-readable error with a recovery action (e.g. retry with auto-resize) when an upload fails.

### 6. Publishing & Scheduling

- **FR37:** Editor can publish a page or record, transitioning it from `draft` to `live`.
- **FR38:** Editor can schedule a page or record to publish at a specific future datetime in a selected timezone.
- **FR39:** System automatically transitions scheduled items to `live` at or after their scheduled time without editor intervention.
- **FR40:** Editor can unpublish (archive) a previously live page or record.
- **FR41 [B]:** Editor can view a previous version of a page or record and revert to it.

### 7. Public Content Delivery

- **FR42:** Consumer can fetch a live page by site + slug via the public read API.
- **FR43:** Consumer can fetch a single record by site + collection + slug via the public read API.
- **FR44:** Consumer can list records of a given collection with pagination.
- **FR45:** System serves public read responses from an edge cache; cache entries are invalidated when the underlying content publishes or unpublishes.
- **FR46:** Consumer can request a preview of an unpublished draft using a signed, short-lived token.
- **FR47:** Operator can export all content for a given site as a JSON snapshot via the CLI, suitable for static-site build pipelines.

### 8. Agent / API Integration

- **FR48:** Agent can authenticate to the admin API using a scoped API token.
- **FR49:** Agent can introspect the available collections, their schemas, and the registered block types for a given site.
- **FR50:** Agent can create, update, and delete records scoped to the token's permitted sites.
- **FR51:** Agent can create, update, publish, and schedule pages scoped to the token's permitted sites.
- **FR52:** System treats agent create operations as idempotent when an `idempotencyKey` is provided: a duplicate call within 24 hours returns the original record ID rather than creating a new record.
- **FR53:** System enforces that token scopes cannot exceed the permissions granted at issuance (e.g. a `write:content`-only token cannot write schema).

### 9. Developer Experience (SDK, CLI, Schema Extension)

- **FR54:** Operator can install the CMS via a single documented command sequence in under 10 minutes on a fresh machine.
- **FR55:** Operator can initialize a new project's schema bundle via a CLI prompt.
- **FR56:** Operator can register new block types and collections by editing TypeScript files in a schema bundle; the admin reflects the changes after redeploy.
- **FR57:** Consumer can fetch and render content in a Next.js, Astro, or Svelte application using the published SDK.
- **FR58:** Consumer can use the SDK to export content at build time for static site generation.
- **FR59:** System publishes typed npm packages (`@possible-cms/sdk`, `@possible-cms/schema-kit`, `@possible-cms/blocks`, `@possible-cms/cli`) with complete TypeScript definitions.
- **FR60 [B]:** Third-party developer can extend the block registry and collection set via a plugin package without forking the core repo.

### 10. Observability & Audit

- **FR61:** System records every mutation (create, update, delete, publish, archive) in an audit log, including actor identity (user or agent), action, target entity, timestamp, and tenant scope.
- **FR62:** Editor or Operator can view the audit log filtered by actor, entity, or time range.
- **FR63:** System performs a nightly backup of the database to blob storage and documents a restore procedure.
- **FR64 [B]:** Operator can configure outbound webhooks triggered by publish, schedule, or archive events.

### Deferred Capability Coverage (non-exhaustive, for contract completeness)

These capabilities are explicitly deferred to later phases and are **not binding for v0.1**. Listed so the v0.1 API surface does not paint us into a corner:

- **Phase B:** multi-workspace RBAC (FR13, FR14, FR7), versioning/revert (FR41), webhooks (FR64), plugin API (FR60), Durable Object preview, localisation with cross-locale ref integrity, multi-entity bulk actions.
- **Phase C:** search (FTS5 over records, Vectorize semantic over blocks), plugin marketplace, additional reference projects (Sunstone, LRG), docs site dogfooded on Possible CMS.
- **Phase D:** managed SaaS variant, per-workspace Cloudflare account federation, dedicated agent-side SDK (`PossibleAgent`), real-time collaborative editing on canvas, Git-for-content visual diff.

## Non-Functional Requirements

### Performance

- **NFR1 — Admin page load (P95):** ≤2 seconds globally, measured from navigation start to largest-contentful-paint on any admin route served via Cloudflare Pages.
- **NFR2 — Admin interaction latency:** every tRPC mutation initiated from the admin completes within 500 ms at P95 for payloads under 50 KB.
- **NFR3 — Public read API latency (cache hit):** ≤100 ms at P95 globally for `GET /v1/{site}/…` endpoints when the KV cache is warm.
- **NFR4 — Public read API latency (cache miss):** ≤500 ms at P95 globally; cold-path must never timeout before edge response.
- **NFR5 — Edit-to-live propagation:** ≤30 seconds at P95 from Editor clicking publish to content being served from the edge cache to the first downstream consumer request.
- **NFR6 — Puck canvas interaction:** block drag, reorder, and props-panel updates render within 100 ms on a reference device (2021-era mid-range laptop, Chromium). No perceptible jank during drag.
- **NFR7 — CLI install to running admin:** ≤10 minutes on a fresh machine with pnpm pre-installed, measured in CI on each release.

### Security

- **NFR8 — Authentication:** user sessions require GitHub OAuth; JWT TTL ≤24 hours; refresh requires re-auth.
- **NFR9 — API tokens:** agent tokens are issued with site-scoped or project-scoped permissions and a fixed capability set; tokens are stored as hashes (never in plaintext); revocation propagates to the edge within 60 seconds.
- **NFR10 — Transport security:** all traffic (admin, public API, preview) is HTTPS-only; HTTP redirects to HTTPS; HSTS header set with 1-year max-age.
- **NFR11 — Data at rest:** D1 and R2 inherit Cloudflare's encryption at rest. Secrets (API keys, OAuth client secrets) are stored in Cloudflare Secrets, never in env files.
- **NFR12 — Tenant isolation:** no cross-site data leakage under any API surface. Every query path includes a tenant scope; queries without a `site_id` or `project_id` context are rejected at the ORM layer before reaching D1.
- **NFR13 — Input validation:** every tRPC and REST input is Zod-parsed at the handler boundary; invalid payloads rejected with 400 before any downstream logic runs.
- **NFR14 — Output escaping:** user-generated content rendered in the admin and public site goes through React's default escaping; MDX is sanitized against a whitelist of HTML elements.
- **NFR15 — OWASP Top 10:** no high-severity findings on automated scan (Dependabot + Semgrep) against `main`; CI gates merge on scan completion.
- **NFR16 — Audit retention:** audit log retained ≥90 days; export-before-purge available via CLI.
- **NFR17 — Dependency supply chain:** all direct dependencies pinned to exact versions; `pnpm audit` passes on CI with no high-severity vulnerabilities; Renovate configured for weekly dependency PRs.

### Scalability

- **NFR18 — Sites per deployment:** a single CMS deployment supports ≥50 concurrent sites within one workspace without performance degradation against NFR1–NFR5.
- **NFR19 — Records per site:** a site supports ≥10 000 records per collection with admin list/search responsive within NFR2.
- **NFR20 — Traffic per site:** the public read API sustains ≥1000 requests per second per site at NFR3 latencies (Cloudflare KV + Worker capacity).
- **NFR21 — Media storage:** R2 storage per site is unbounded from the CMS side; practical limit governed by Cloudflare account quota.
- **NFR22 — Graceful degradation:** at or above 80% of Cloudflare paid-tier D1 read budget, the system logs a warning to the audit log and emits a dashboard alert; admin remains functional.
- **NFR23 — Workspace scale (Phase B):** the tenant schema supports ≥100 workspaces per deployment; Phase A does not have to test this but must not preclude it.

### Reliability & Availability

- **NFR24 — Public API availability:** target 99.9% monthly (inherits Cloudflare Workers SLO); measured via synthetic monitoring on one canary site.
- **NFR25 — Admin availability:** target 99.5% monthly (admin downtime is tolerable where public site must not be); measured similarly.
- **NFR26 — Zero data-loss incidents:** target zero D1 data-loss incidents per 12-month window. Nightly backup to R2 with retention ≥30 days; documented restore procedure tested quarterly.
- **NFR27 — Recovery point objective (RPO):** ≤24 hours (nightly backup cadence).
- **NFR28 — Recovery time objective (RTO):** ≤4 hours for a complete D1 restore from the most recent backup.
- **NFR29 — Graceful cache invalidation:** a KV cache-invalidation failure on publish must not block the D1 write; the system retries invalidation for up to 5 minutes and surfaces a warning if unsuccessful.
- **NFR30 — Block render safety:** a malformed or unknown block type renders a placeholder (FR24) and logs an audit warning; it never crashes the public page render.

### Accessibility

- **NFR31 — WCAG conformance:** admin UI conforms to WCAG 2.1 Level AA. Automated audit via `@axe-core/playwright` on every release; manual audit quarterly.
- **NFR32 — Keyboard navigation:** every admin action (including Puck canvas operations — add block, reorder, remove, edit props) is reachable and operable via keyboard alone.
- **NFR33 — Screen-reader support:** block drop-zones, props fields, media library, and publish controls expose ARIA roles and labels sufficient for NVDA and VoiceOver usage.
- **NFR34 — Contrast:** text in the admin meets 4.5:1 contrast (normal text) and 3:1 (large text) across the default theme.
- **NFR35 — Motion preferences:** canvas drag animations respect `prefers-reduced-motion`.
- **NFR36 — Consumer-site accessibility:** the block render output is accessibility-neutral — each block exposes semantic HTML and default ARIA; consumer sites may override but never have to work around broken defaults.

### Integration & Interoperability

- **NFR37 — SDK compatibility:** `@possible-cms/sdk` supports Node 20+ and modern Edge runtimes (Cloudflare Workers, Vercel Edge, Deno). Builds ship as dual CJS + ESM with typed exports map.
- **NFR38 — Consumer framework compatibility:** SDK consumption verified via E2E tests on Next.js 15 App Router, Astro 4+, and SvelteKit 2+ reference apps.
- **NFR39 — Export stability:** `possible-cms export` output is deterministic — identical content produces byte-identical JSON files across runs. Enables diffable, commit-friendly static pipelines.
- **NFR40 — Semver contract:** `@possible-cms/*` packages follow semver strictly. Breaking changes to the public API, block prop schemas, or CLI flags require a major version bump; each breaking change is documented in `CHANGELOG.md` and `MIGRATION-NOTES.md`.
- **NFR41 — Backwards compatibility:** a D1 migration never drops data without explicit operator confirmation. Schema changes ship with forward-only migrations; rollback is documented but not automatic.

### Cost Efficiency

- **NFR42 — Per-site infrastructure cost:** ≤$1/month on Cloudflare tiers at ≤100 000 monthly public page views per site, covering D1, R2, KV, Workers, and Cloudflare Images transforms. Monitored via per-site analytics and cost-attribution dashboard (Phase B).
- **NFR43 — Cost scaling:** beyond 100 000 PV/site, cost scales approximately linearly with traffic; no step functions from premium tier upgrades in the Phase A data-access patterns.
- **NFR44 — Admin cost envelope:** admin app costs (Cloudflare Pages + admin-api Worker invocations) remain ≤$5/month per deployment at normal editor usage (≤10 editors, ≤1000 edits/month).

### Observability

- **NFR45 — Mutation audit log:** every mutation is logged within 100 ms of the write completing (FR61). Admin audit view exposes logs with ≤5 minute staleness.
- **NFR46 — Error telemetry:** unhandled exceptions in Workers and the admin app report to a structured error sink (Cloudflare Workers Analytics, Sentry-compatible adapter in Phase B). Logs include trace ID, tenant scope, actor identity.
- **NFR47 — Synthetic monitoring:** one canary flow per release runs hourly against a reference deployment: login → create page → publish → read via public API. Failures page the on-call.
- **NFR48 — Performance monitoring:** NFR1, NFR3, NFR5 are measured continuously in production via Cloudflare Web Analytics and Worker analytics; dashboards expose P50/P95/P99.
- **NFR49 — No silent failures:** every failed publish, failed upload, failed schedule transition emits a structured log and a visible admin notification.

### Deferred Quality Attributes

Not included in v0.1 — relevant later:

- **i18n / l10n of the admin UI itself** (editor-facing translations). Phase B.
- **SOC2 / ISO 27001 formal compliance.** Phase D managed variant only.
- **Real-time collaboration latency SLOs** (Y.js/CRDT canvas). Phase D.
- **Multi-region read replicas for D1.** Phase D / depends on Cloudflare roadmap.
- **SLA contracts for self-hosted deployers.** Never binding — OSS with no SLA; SLAs apply only to Phase D managed variant.

## Scope Boundaries

Possible CMS is a **marketing-content CMS**. The following areas are categorically **out of scope**, both for v0.1 and for the product's long-term identity:

### Not in scope — product admin surfaces (belong to consumer applications, not the CMS)

- **AIIA product admin.** End-user accounts, API keys, licence records, Intent API configuration, model routing rules, usage metering, billing, customer-facing integration consoles, partner portals. These live in AIIA's own admin application against AIIA's own data store.
- **Other consumer-project admins.** If Barbuda Leisure has a booking-management back office, if Sunstone has a loyalty program dashboard, if LRG has a player-profile console — those are _not_ Possible CMS features. Those consumer apps may _link to_ or _embed_ CMS content, but the CMS does not own their data model.
- **Customer-facing dashboards.** Any surface where an end-user of a consumer product logs in and manages their own account/data is not the CMS.

### Not in scope — operational concerns of the consumer site

- **Runtime business logic.** Shopping carts, booking engines, authentication of end-users of consumer sites, payment processing, email sends, CRM syncs.
- **Analytics ingestion.** The CMS logs its own audit and performance metrics; it does not collect product analytics on behalf of consumer sites.
- **Customer support / ticketing.** If a consumer site needs a helpdesk, that ships separately.

### Not in scope — alternative content modalities

- **Static site generation itself.** The CMS _exports_ content for SSG builds and _serves_ content at runtime via the public API; it does not itself become a site generator. Consumer sites (Next.js, Astro, SvelteKit, Hugo, etc.) remain responsible for layout, theming, routing, and final rendering beyond block output.
- **Binary asset pipelines beyond images.** Video transcoding, PDF generation, audio processing are out of scope. R2 stores these as binaries; the CMS does not transform them.
- **Rich-text editing beyond MDX.** No WYSIWYG-HTML editor; MDX is the single expressive body format.

### What the CMS owns and nothing else

The CMS owns — fully and only — the **marketing content layer**: pages built from composable blocks, typed content records (collections), media assets for those pages and records, publishing state, and the public API that serves them. Every consumer product has its own admin for its own data. Possible CMS is never a catch-all operator console.
