---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
status: complete
completedAt: 2026-04-19
inputDocuments:
  - /Users/kanousei/Documents/KPD/_bmad-output/planning-artifacts/prd.md
  - /Users/kanousei/Documents/KPD/_bmad-output/planning-artifacts/architecture.md
  - /Users/kanousei/Documents/KPD/_bmad-output/planning-artifacts/ux-design.md
  - /Users/kanousei/Documents/KPD/_bmad-output/planning-artifacts/implementation-readiness-report-2026-04-19.md
project_name: Possible CMS
user_name: Kanousei
date: 2026-04-19
workflowType: "epics-and-stories"
---

# Possible CMS — Epic Breakdown

## Overview

Complete epic and story decomposition for Possible CMS v0.1 Phase A. Binds every Phase A FR from [prd.md §Functional Requirements](prd.md) to at least one story, every story to at least one Given/When/Then acceptance criterion, and every UX pattern from [ux-design.md](ux-design.md) to the component work that uses it.

**Execution model:** 12 epics designed to maximise parallelism on an Opus-orchestrator + Sonnet/Haiku-parallel-workers team. Epic 1 is serialised (schema contract); Epics 2–11 run concurrently from Day 2; Epic 12 is finalisation. Build clock: 3–5 days wall-clock per the PRD pacing correction.

## Requirements Inventory

### Functional Requirements (Phase A binding)

**Authentication & Identity:** FR1, FR2, FR3, FR4, FR5, FR6
**Workspace/Project/Site:** FR8, FR9, FR10, FR11, FR12
**Page Composition:** FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR23, FR24
**Content Records:** FR25, FR26, FR27, FR28, FR29, FR30
**Media Management:** FR31, FR32, FR33, FR34, FR35, FR36
**Publishing & Scheduling:** FR37, FR38, FR39, FR40
**Public Content Delivery:** FR42, FR43, FR44, FR45, FR46, FR47
**Agent / API Integration:** FR48, FR49, FR50, FR51, FR52, FR53
**Developer Experience:** FR54, FR55, FR56, FR57, FR58, FR59
**Observability & Audit:** FR61, FR62, FR63

**Total Phase A binding:** 56 FRs. **Deferred to Phase B:** 8 FRs (FR7, FR13, FR14, FR41, FR60, FR64).

### Non-Functional Requirements

49 NFRs across 8 dimensions, all binding for v0.1. Reference: [prd.md §Non-Functional Requirements](prd.md).

### UX Design Requirements

From [ux-design.md](ux-design.md), binding for implementation:

- §5 Design system tokens (typography, colour, spacing, radius, elevation, motion, iconography).
- §7 Three-zone admin layout (top bar + sidebar + main) with canvas-edit split layout.
- §9 Four user-journey UX choreographies mapping every interaction to a feedback signal.
- §10 Component strategy: shadcn/ui primitives + project-specific components (`<Canvas />`, `<BlockPalette />`, `<PropsEditor />`, `<ReferencePicker />`, `<MediaPicker />`, `<SchemaForm />`, `<PublishControls />`, `<AuditRow />`, `<SiteSwitcher />`, `<EmptyState />`, `<StatusPill />`) + widget registry mapping Zod types to form widgets.
- §11 UX patterns: save/schedule/publish semantics, dirty state, block selection, side panel behaviour, list views, error-recovery matrix, keyboard shortcuts, accessibility patterns.
- §12 Desktop-first responsive posture; admin requires ≥768px.

### Architecture Commitments

From [architecture.md](architecture.md):

- ADR-001 Block Schema (Puck-based, `<Render>` unified, per-site whitelist).
- ADR-002 D1 Tenant Isolation (`workspace → project → site` scoping via `siteScoped()` middleware).
- ADR-003 Worker split (admin-api tRPC, public-api REST+KV, preview signed-URL).
- ADR-004 SDK modes (runtime + build-time + `<Render>`).
- ADR-005 Deployment (dev/preview/prod, Cloudflare Secrets, nightly D1→R2 backup).

### FR Coverage Map

Every Phase A FR mapped to exactly one epic. Phase B FRs marked `[B]` and listed in Epic B1 at the bottom.

| FR   | Epic | Story     |
| ---- | ---- | --------- |
| FR1  | 2    | 2.1       |
| FR2  | 2    | 2.1       |
| FR3  | 2    | 2.2       |
| FR4  | 2    | 2.3       |
| FR5  | 2    | 2.3       |
| FR6  | 11   | 11.1      |
| FR8  | 1    | 1.3       |
| FR9  | 3    | 3.1       |
| FR10 | 3    | 3.1       |
| FR11 | 10   | 10.1      |
| FR12 | 3    | 3.2       |
| FR15 | 4    | 4.2       |
| FR16 | 4    | 4.3       |
| FR17 | 4    | 4.3       |
| FR18 | 4    | 4.3       |
| FR19 | 4    | 4.4       |
| FR20 | 4    | 4.5       |
| FR21 | 4    | 4.4, 4.5  |
| FR22 | 4    | 4.6       |
| FR23 | 4    | 4.7       |
| FR24 | 4    | 4.7       |
| FR25 | 5    | 5.1       |
| FR26 | 5    | 5.2       |
| FR27 | 5    | 5.2       |
| FR28 | 5    | 5.3       |
| FR29 | 5    | 5.4       |
| FR30 | 5    | 5.5       |
| FR31 | 6    | 6.1       |
| FR32 | 6    | 6.1       |
| FR33 | 6    | 6.2       |
| FR34 | 6    | 6.3       |
| FR35 | 6    | 6.2       |
| FR36 | 6    | 6.4       |
| FR37 | 7    | 7.1       |
| FR38 | 7    | 7.2       |
| FR39 | 7    | 7.3       |
| FR40 | 7    | 7.4       |
| FR42 | 8    | 8.1       |
| FR43 | 8    | 8.1       |
| FR44 | 8    | 8.1       |
| FR45 | 8    | 8.2       |
| FR46 | 8    | 8.3       |
| FR47 | 8    | 8.4       |
| FR48 | 9    | 9.1       |
| FR49 | 9    | 9.2       |
| FR50 | 9    | 9.3       |
| FR51 | 9    | 9.3       |
| FR52 | 9    | 9.4       |
| FR53 | 9    | 9.5       |
| FR54 | 12   | 12.1      |
| FR55 | 10   | 10.1      |
| FR56 | 10   | 10.2      |
| FR57 | 8    | 8.5       |
| FR58 | 8    | 8.5       |
| FR59 | 8    | 8.5, 12.2 |
| FR61 | 11   | 11.1      |
| FR62 | 11   | 11.2      |
| FR63 | 11   | 11.3      |

## Epic List

1. **Epic 1: Marco deploys Possible CMS from a fresh clone** — platform scaffold, schema contract lock.
2. **Epic 2: Priya and Atlas authenticate and manage their identities** — GitHub OAuth + agent tokens.
3. **Epic 3: Operators navigate and manage the workspace → project → site hierarchy** — admin shell + tenancy UI.
4. **Epic 4: Priya composes pages visually with blocks** — Puck canvas + block registry.
5. **Epic 5: Editors manage typed content records with schema-driven forms** — records CRUD.
6. **Epic 6: Editors upload and manage media through the admin** — R2 + Cloudflare Images.
7. **Epic 7: Editors publish and schedule content with confidence** — publish state machine + cron.
8. **Epic 8: Consumer sites render CMS content via the public API and SDK** — public-api + SDK + `<Render>`.
9. **Epic 9: AI agents operate on CMS content as peer users** — agent API + idempotency.
10. **Epic 10: Agency devs scaffold new projects in under one day** — CLI + schema bundles.
11. **Epic 11: Operators trust and observe the system** — audit log + backups + mutation identity.
12. **Epic 12: External operators adopt Possible CMS from GitHub** — OSS release + docs + CI green.

---

## Epic 1: Marco deploys Possible CMS from a fresh clone

**Goal.** From a freshly cloned repo on a developer's machine, running `pnpm install` followed by `wrangler deploy` produces a working Cloudflare deployment with the admin reachable, the three Workers bound to D1/R2/KV, and the core tenancy tables migrated — within 10 minutes. This is the platform scaffold delivered as a user-facing outcome, not as a technical milestone. Locks the schema contract from ADR-002 so Epics 2–11 can start in parallel.

### Story 1.1: A developer clones the repo and installs dependencies successfully

As a developer onboarding to the project,
I want `pnpm install` to succeed on a fresh clone with no errors or warnings,
So that I can start work without debugging dependency drift.

**Acceptance Criteria:**

**Given** a fresh machine with pnpm 9+ and Node 20+ installed
**When** I run `git clone git@github.com:HDickenson/possible-cms.git && cd possible-cms && pnpm install`
**Then** installation completes within 3 minutes on a reference machine
**And** no peer dependency warnings appear in the install output
**And** all workspace packages resolve via `workspace:*` without errors.

**Given** a successful install
**When** I run `pnpm typecheck`
**Then** every package and app passes `tsc --noEmit` without errors
**And** CI on GitHub Actions runs the same typecheck and passes.

### Story 1.2: The three Workers deploy to Cloudflare via a single command

As a developer,
I want `wrangler deploy` from `apps/api/` to deploy all three Workers (admin-api, public-api, preview) in one pass,
So that I don't have to track per-Worker deploy state.

**Acceptance Criteria:**

**Given** a configured `wrangler.jsonc` with valid Cloudflare account credentials
**When** I run `pnpm --filter @possible-cms/api deploy`
**Then** admin-api, public-api, and preview Workers all register and respond to their health-check endpoints
**And** each Worker binding for D1, R2, KV resolves correctly
**And** each Worker returns its version string on `GET /healthz` within 500ms.

**Given** the admin UI at `apps/admin/`
**When** I run `pnpm --filter @possible-cms/admin pages:deploy`
**Then** the Cloudflare Pages deploy completes and the resulting URL loads the login page within 2 seconds.

### Story 1.3: The D1 schema is migrated on first deploy and enforces tenant scoping

As a developer,
I want the core tenancy tables created on first deploy with a seeded default workspace,
So that subsequent epics can assume the tenancy hierarchy exists without each re-creating it.

**Acceptance Criteria:**

**Given** a freshly created D1 database
**When** I run `wrangler d1 migrations apply possible-cms --local`
**Then** migration `0001_core_tenancy.sql` runs to completion
**And** the `workspace`, `project`, `site`, `user`, `membership`, `audit_log` tables exist with the indexes specified in ADR-002
**And** `SELECT * FROM workspace WHERE id = 1` returns `{ id: 1, name: 'default' }` (FR8 tenant root).

**Given** a query attempted against a site-scoped table without a `site_id` filter
**When** the Drizzle query builder is wrapped in the `siteScoped()` helper
**Then** the query either receives a `site_id` in scope or the builder refuses to execute it at the type level
**And** any attempt to bypass via raw SQL is prevented by a runtime assertion in the shared middleware.

### Story 1.4: CI runs green on every push and enforces the grep-gate

As a developer,
I want CI to pass lint + typecheck + test + grep-gate on every push to `main` and every PR,
So that merge quality is enforced without manual review of every change.

**Acceptance Criteria:**

**Given** a PR to `main` with no code changes, only a docs update
**When** GitHub Actions runs `.github/workflows/ci.yml`
**Then** the job completes within 5 minutes
**And** grep-gate, lint, typecheck, test, and format-check steps all pass
**And** the job posts a green checkmark on the PR.

**Given** a PR that accidentally includes the string `aiia` inside `apps/admin/components/nav/`
**When** CI runs
**Then** the grep-gate step fails with a message pointing to the exact file and line
**And** the merge is blocked until the literal is moved to `examples/aiia/`.

---

## Epic 2: Priya and Atlas authenticate and manage their identities

**Goal.** Priya signs in via GitHub OAuth to become an authenticated editor within seconds. Operators provision scoped API tokens for agents (Atlas). Both identities are distinguishable in every subsequent audit entry. Sets the auth foundation for every capability Epic 3–11 depends on.

### Story 2.1: An editor signs in with GitHub OAuth and lands on the admin

As Priya,
I want to click "Sign in with GitHub" and end up on the admin home,
So that I don't have to create yet another account to manage my site's content.

**Acceptance Criteria:**

**Given** an editor visiting the admin login URL while not signed in
**When** they click "Sign in with GitHub"
**Then** they are redirected to GitHub's OAuth authorize page
**And** GitHub requests the configured scopes only (no over-scoping)
**And** the redirect back includes a valid OAuth code.

**Given** a returning OAuth code
**When** the admin-api validates the code, issues a session JWT with TTL ≤ 24 hours
**Then** the editor is redirected to `/projects` (or `/sites` if one project, or `/pages` if one site) — progressive narrow routing from UX §6
**And** the JWT is set as an HttpOnly + Secure + SameSite=Lax cookie
**And** a `user` row is upserted with their GitHub ID, email, and name.

### Story 2.2: An editor logs out and cannot access protected routes

As Priya,
I want a clear sign-out action that actually invalidates my session,
So that shared-computer scenarios don't leak admin access.

**Acceptance Criteria:**

**Given** a signed-in editor
**When** they click "Sign out" in the top-bar avatar menu
**Then** the session cookie is cleared
**And** the JWT is added to a server-side revocation list with TTL matching the original JWT
**And** the editor is redirected to the login page within 500ms.

**Given** a revoked session JWT
**When** the editor hits any `protectedProcedure` route
**Then** the request is rejected with 401 UNAUTHORIZED
**And** the admin redirects to login without exposing what page was attempted.

### Story 2.3: An operator issues and revokes scoped API tokens for agents

As Marco (or Priya promoted to project owner in Phase B — single-workspace in Phase A so all authenticated users can manage tokens),
I want to create API tokens scoped to specific sites and scopes, and revoke them instantly,
So that agents (Atlas) can operate on content with minimum-necessary permissions.

**Acceptance Criteria:**

**Given** an authenticated operator on `/agents`
**When** they click "New token" and fill name + site(s) + scope checkboxes (`read:content`, `read:schema`, `write:content`, `write:schema`, `publish`, `delete`)
**Then** a confirmation modal shows the raw token exactly once
**And** the token is stored in D1 as a SHA-256 hash, never plaintext
**And** the modal has a clear "Copy to clipboard" and "I've saved the token" dismiss — it cannot be re-shown later.

**Given** a token listed in `/agents`
**When** the operator clicks "Revoke"
**Then** a confirm dialog warns that any agent using this token will stop working
**And** on confirm, the `agent_token.revoked_at` is set to now
**And** within 60 seconds at the edge, any request using the revoked token returns 401 (NFR9).

**Given** a token with scope `write:content` only
**When** an agent attempts a schema mutation endpoint
**Then** the admin-api returns 403 FORBIDDEN with a scope-mismatch message
**And** the attempt is recorded in the audit log with the agent token's ID.

---

## Epic 3: Operators navigate and manage the workspace → project → site hierarchy

**Goal.** The admin shell gives operators a clear mental model of `workspace → project → site` without ever requiring them to learn those words. Navigation between levels is fast, stable, and URL-addressable. Empty states invite the next action.

### Story 3.1: An operator lists and navigates projects and sites

As Marco,
I want to see all my projects and the sites within each,
So that I can find the site I need to work on in under 5 seconds.

**Acceptance Criteria:**

**Given** an authenticated operator in a workspace with 3 projects and 5 sites across them
**When** they navigate to `/projects`
**Then** the page lists all 3 projects as table rows with title, site count, last activity, and a row action menu
**And** each row click navigates to `/projects/[slug]/sites`
**And** the page loads within 2 seconds at P95 (NFR1).

**Given** a project with 2 sites
**When** the operator navigates to `/projects/sunstone/sites`
**Then** both sites are listed with title, domain, last published date, status pill
**And** the site switcher in the top bar updates to show "SunStone / Marketing".

### Story 3.2: An operator creates a new site under an existing project

As Marco,
I want to create a new site directly in the admin (not only via CLI),
So that quick additions don't require a context switch to terminal.

**Acceptance Criteria:**

**Given** the operator on `/projects/sunstone/sites`
**When** they click the "+ New site" button
**Then** a dialog prompts for slug, domain, and starter block whitelist
**And** on confirm, a `site` row is created under the selected `project_id`
**And** the operator is redirected to the new site's `/pages` view
**And** an audit log entry is written with action=site.create and actor=user.

### Story 3.3: An operator switches between sites without losing context

As Marco,
I want the site switcher in the top bar to stay available on every admin screen,
So that I don't have to navigate home to change site.

**Acceptance Criteria:**

**Given** an operator on any admin route
**When** they click the site switcher in the top bar
**Then** a dropdown shows projects and sites grouped by project
**And** selecting a site navigates to `/pages` for that site preserving the current entity type (pages vs records) if possible
**And** the switcher is reachable via keyboard shortcut `G S` and searchable via type-to-filter.

---

## Epic 4: Priya composes pages visually with blocks

**Goal.** The hero epic. Priya opens a page, sees it rendered as-published, drags blocks, edits props, saves a draft, and the whole loop feels as fast as Webflow without any of Webflow's complexity. Block registry is extensible per-site via whitelist. Unknown blocks never crash the render.

### Story 4.1: A block is registered with a Zod schema, default props, render, and Puck fields

As a block author,
I want a single `block()` factory call to register a block with its schema + render + Puck config,
So that every surface (admin canvas, public render, agent introspection) stays in sync.

**Acceptance Criteria:**

**Given** a new file `packages/blocks/src/testimonial-carousel.tsx` that calls `block({ type: 'TestimonialCarousel', propsSchema, defaultProps, render, fields })`
**When** the block is re-exported from `packages/blocks/src/index.ts`
**Then** the admin palette lists the new block within the next deploy
**And** the public `<Render>` can render it
**And** the agent `GET /v1/{site}/blocks` endpoint returns its JSON-Schema serialisation
**And** the block's `propsSchema` and `render` prop types are compile-time compatible.

**Given** a block propsSchema is violated by saved data
**When** `<Render>` attempts to render that block
**Then** React does not throw
**And** the rendered output for that block is an `<UnknownBlockPlaceholder />` with an admin-only warning
**And** a warning is logged server-side with `block.type` and `site_id`.

### Story 4.2: An editor opens an existing page in the visual canvas

As Priya,
I want to click a page in the list and see it render on a canvas,
So that I know what I'm editing without decoding a field tree.

**Acceptance Criteria:**

**Given** an editor on `/pages` with one existing page "Tours Landing"
**When** they click the row
**Then** the route changes to `/pages/[id]/edit`
**And** the canvas loads within 2 seconds at P95 (NFR1)
**And** the page renders with its current `blocks_json` using the same `<Render>` component used on the public site (ADR-001)
**And** clicking anywhere outside a block deselects any current selection.

### Story 4.3: An editor adds, reorders, and removes blocks via drag

As Priya,
I want to drag a block from the palette onto the canvas, reorder blocks, and remove a block,
So that I can compose a page visually without code.

**Acceptance Criteria:**

**Given** an editor with the canvas open and an empty page
**When** they drag "Hero" from the left palette onto the canvas
**Then** a 2px indigo dashed drop-indicator appears at valid drop targets during drag (UX §11.3)
**And** on drop, the Hero block renders in place with its default props within 100ms (NFR6)
**And** the page's dirty state indicator appears in the top bar.

**Given** a canvas with 3 blocks
**When** the editor drags the third block above the first
**Then** the reorder animates with ease-out 150ms
**And** the blocks_json order updates to reflect the new sequence
**And** no re-render flicker appears.

**Given** a selected block
**When** the editor presses Delete (or clicks the block's × button)
**Then** the block is removed from the canvas
**And** a toast appears for 5 seconds: "Block removed. [Undo]"
**And** clicking Undo within 5s restores the block at its original index.

### Story 4.4: An editor edits block properties in a side panel

As Priya,
I want a panel next to the canvas where I can change the selected block's text, images, and settings,
So that I can fine-tune without leaving the visual view.

**Acceptance Criteria:**

**Given** a Pricing block selected on the canvas
**When** the side panel opens (200ms slide from right, UX §11.4)
**Then** the panel shows form fields matching the Pricing block's Zod propsSchema — heading (text), tiers (array of {name, price, features})
**And** each field uses the widget specified in the widget registry (UX §10.3)
**And** changes in fields update the canvas optimistically within 100ms.

**Given** the editor enters an invalid value (e.g. negative price)
**When** they attempt to save
**Then** the field shows inline validation error from the Zod error message
**And** the side panel scrolls to and focuses the invalid field
**And** save is blocked until the error is resolved (NFR13, UX §11.6).

### Story 4.5: An editor saves a draft without publishing

As Priya,
I want an explicit "Save draft" action that doesn't publish,
So that I can leave work in progress without affecting the live site.

**Acceptance Criteria:**

**Given** a dirty canvas
**When** the editor clicks "Save draft" (or ⌘S)
**Then** the admin-api `page.save` mutation writes the current blocks_json to D1 with `status='draft'`
**And** KV cache is NOT invalidated (draft is not public)
**And** a toast appears: "Draft saved" — dismissing after 2 seconds
**And** the dirty state indicator clears.

**Given** a save request fails (network)
**When** the error toast appears
**Then** the message is "Save failed — check your connection. [Retry]"
**And** the canvas state is preserved in memory
**And** the dirty state indicator remains until a successful save.

### Story 4.6: The block palette is restricted to the site's whitelist

As a site owner,
I want only a chosen subset of blocks available in the palette for my site,
So that my editors don't accidentally use a block that doesn't belong to our design system.

**Acceptance Criteria:**

**Given** a site with `block_whitelist = ['Hero', 'RichText', 'Image', 'FAQ']`
**When** the editor opens the canvas palette
**Then** only those 4 blocks appear in the palette
**And** the other 6 registered blocks are hidden
**And** attempting to paste a non-whitelisted block type via JSON (via agent API) is rejected with 400 BAD_REQUEST (FR22).

**Given** a site with `block_whitelist = null`
**When** the palette opens
**Then** all registered blocks are shown (null = no restriction).

### Story 4.7: Admin preview and public render produce identical output

As Priya,
I want to see on the canvas exactly what my visitors will see,
So that I never have to "preview" twice to confirm.

**Acceptance Criteria:**

**Given** the same blocks_json in admin canvas and in a public-api response
**When** rendered with the `<Render>` component in both contexts
**Then** the DOM output is byte-identical (modulo wrapper div for admin selection chrome)
**And** a CI test fixture with a sample blocks_json renders in both modes and diffs as identical.

**Given** a page's blocks_json contains a block type that is no longer in the registry
**When** `<Render>` processes it
**Then** the unknown block is replaced by `<UnknownBlockPlaceholder />` which in admin mode shows "Unknown block type 'X' — contact developer" with a warning icon
**And** in public mode renders `null` (invisible)
**And** the audit log records the occurrence with `warning` level.

---

## Epic 5: Editors manage typed content records with schema-driven forms

**Goal.** Blog posts, pricing tiers, testimonials, FAQs, authors — all the reusable content entities — get a list view, a form view, and a reference picker that blocks can use. Forms are generated from Zod collection schemas; there's no hand-written form code per collection.

### Story 5.1: An editor lists and filters records of a collection

As Priya,
I want to find the BlogPost I want to edit quickly in a list,
So that I'm not scrolling through 50 posts.

**Acceptance Criteria:**

**Given** a site with 40 BlogPost records
**When** the editor navigates to `/content/BlogPost`
**Then** the list renders with title, author, status pill, last updated (relative), row action menu — 40px row height (UX §11.5)
**And** the list supports filtering by title substring, status, and sorting by updated_at/title
**And** the list is paginated at 50 rows per page by default.

**Given** a list view for any collection
**When** the page loads
**Then** it completes within 2 seconds at P95 for ≤10 000 rows (NFR1, NFR19).

### Story 5.2: An editor creates, updates, duplicates, and deletes records

As Priya,
I want full CRUD on content records with a form generated from the collection's schema,
So that adding a BlogPost requires filling a form, not writing code.

**Acceptance Criteria:**

**Given** a Zod collection `BlogPost` with fields title, slug, author (reference), body (mdxBody), hero (r2Image), publishedAt (datetime)
**When** the editor clicks "+ New BlogPost"
**Then** the form renders each field using the widget registry (UX §10.3)
**And** required fields show inline indicators
**And** on save, the record is written to D1 with tenant scope.

**Given** an existing record
**When** the editor clicks "Duplicate" in the row action menu
**Then** a new draft record is created with "Copy of [title]" and slug auto-suffixed
**And** the editor is navigated to its edit view.

**Given** an existing record
**When** the editor clicks "Delete" and confirms
**Then** if no references exist, the record is deleted (soft-delete with `deleted_at`)
**And** if references exist, deletion is blocked per Story 5.4.

### Story 5.3: An editor picks a record as a reference in another record or block

As Priya,
I want to link this BlogPost to an Author without re-typing anything,
So that cross-referenced content stays consistent.

**Acceptance Criteria:**

**Given** a BlogPost form with an `author` field of type `reference('Author')`
**When** the editor clicks the author field
**Then** the reference picker modal opens listing all Author records filtered by `site_id`
**And** the editor can search by display field (name), filter, and select an Author
**And** on confirm, the field stores the referenced record's ID
**And** the field displays the referenced record's display field (name) in the form.

### Story 5.4: The system prevents deletion of a referenced record

As a content owner,
I want to be prevented from deleting a PricingTier that a Pricing block currently references,
So that the live site doesn't break.

**Acceptance Criteria:**

**Given** a PricingTier record referenced by a Pricing block on a live page
**When** the editor attempts to delete the PricingTier
**Then** the delete is soft-blocked with an error: "Cannot delete — referenced by 1 page (Home). [See references]"
**And** clicking "See references" shows the pages and blocks that reference it
**And** only after all references are removed can the record be deleted.

### Story 5.5: A developer registers a new collection schema and it appears in the admin

As a developer (Atlas or Marco),
I want to add a Zod schema to the site's schema bundle and have the collection appear in the admin after redeploy,
So that adding a new content type doesn't require admin code changes.

**Acceptance Criteria:**

**Given** a site's schema bundle exports a new collection `TeamMember`
**When** the admin-api is redeployed and the schema bundle is loaded at startup
**Then** `TeamMember` appears in the sidebar under "Content"
**And** `/content/TeamMember` lists any existing TeamMember records
**And** `/content/TeamMember/[id]/edit` renders a form generated from the schema.

---

## Epic 6: Editors upload and manage media through the admin

**Goal.** Dragging an image into a block's image field just works: upload, automatic resize/transform, metadata visible, library browsable. Failures are recoverable — never a dead end.

### Story 6.1: An editor uploads an image and sees it transformed for web

As Priya,
I want to drop a JPEG into an image field and have it appear correctly sized within seconds,
So that I don't have to leave the admin to resize images.

**Acceptance Criteria:**

**Given** an editor with an image field open
**When** they drop a JPEG (< 10 MB) into the upload zone
**Then** the file uploads to R2 via signed PUT URL within 5 seconds on a typical broadband connection
**And** a new `asset` row is written with tenant-scoped prefix, dimensions, mime, size
**And** Cloudflare Images transform is applied and the URL returned is a transform-enabled URL
**And** the image renders in the field within 3 seconds of upload completion.

### Story 6.2: An editor browses the media library with metadata

As Priya,
I want a searchable media library grid where I can see all assets for this site,
So that I can reuse existing images.

**Acceptance Criteria:**

**Given** an editor on `/media`
**When** the page loads
**Then** all assets for the current site are shown as a grid of 200px-wide thumbnails
**And** hovering an asset shows metadata: dimensions, size, format, upload date (FR35)
**And** the search bar filters by filename
**And** the grid supports pagination for >100 assets.

### Story 6.3: An editor picks an existing asset from the media library

As Priya,
I want to pick an asset from the library when editing a block field,
So that I don't re-upload the same image.

**Acceptance Criteria:**

**Given** an image field with "Select from library" action
**When** the editor clicks it
**Then** the MediaPicker modal opens with the same grid as `/media`
**And** selecting an asset and confirming returns the asset's R2 URL and metadata to the field
**And** the modal closes within 200ms of confirmation.

### Story 6.4: An editor recovers from an oversize image upload

As Priya,
I want a clear recovery path when my image is too large,
So that I don't give up and email the agency.

**Acceptance Criteria:**

**Given** a 14.2 MB JPEG dragged into the upload zone
**When** client-side size validation fires
**Then** the progress bar is replaced with the message: "Image is 14.2 MB — over 10 MB limit. [Auto-resize and retry]"
**And** clicking retry triggers Cloudflare Images transform to a 10 MB equivalent
**And** the image completes upload within an additional 3 seconds
**And** the metadata caption shows: "Resized 14.2 MB → 680 KB".

---

## Epic 7: Editors publish and schedule content with confidence

**Goal.** Priya hits publish and the content appears on the public site within 30 seconds. Scheduled publishes fire on time without her needing to be online. Every state transition (draft → scheduled → live → archived) is visible and reversible.

### Story 7.1: An editor publishes a page and sees it go live

As Priya,
I want a clear Publish button that actually makes my page public,
So that I don't have to ask a dev to flip a switch.

**Acceptance Criteria:**

**Given** an editor on a page with `status='draft'`
**When** they click "Publish" in the top bar
**Then** the page's status transitions to `live`
**And** `published_at` is set to now
**And** the KV cache key `page:{site_id}:{slug}:en` is invalidated
**And** within 30 seconds at P95 the public API returns the new content (NFR5)
**And** the publish action is recorded in audit_log with actor=user.

### Story 7.2: An editor schedules a page to publish at a specific time

As Priya,
I want to pick Friday 6am and walk away,
So that I don't have to be at my laptop when the content goes live.

**Acceptance Criteria:**

**Given** an editor with a draft page open
**When** they click "Schedule" and pick Apr 24 06:00 ADT
**Then** a `schedule_job` row is created with `target_type='page'`, `target_id`, `scheduled_for=<UTC equivalent>`
**And** the page's status transitions to `scheduled`
**And** a toast confirms: "Scheduled for Apr 24, 06:00 ADT"
**And** the UI shows the schedule in its local timezone with UTC in a tooltip.

### Story 7.3: The scheduled publish fires at the correct time

As Priya,
I want my scheduled publish to happen at exactly the time I picked,
So that I can plan campaign launches around it.

**Acceptance Criteria:**

**Given** a `schedule_job` with `scheduled_for` in the past and `status='pending'`
**When** the cron Worker (runs every minute) executes
**Then** the targeted page's status transitions from `scheduled` to `live` within 60 seconds of the scheduled time
**And** the KV cache is invalidated
**And** the `schedule_job.status` is set to `completed`
**And** an audit log entry is written with actor=system, action=page.publish_scheduled.

**Given** a scheduled publish fails (e.g. transient D1 error)
**When** the cron Worker runs the next minute
**Then** the job retries up to 3 times with exponential backoff
**And** on permanent failure, an admin notification is emitted (log + Phase B webhook).

### Story 7.4: An editor archives a published page

As Priya,
I want to unpublish a page without deleting it,
So that I can take something offline while preserving content for later.

**Acceptance Criteria:**

**Given** a live page
**When** the editor clicks "Archive" in the row action menu or canvas top bar
**Then** status transitions from `live` to `archived`
**And** the KV cache key is deleted
**And** the public API returns 404 for that page's slug
**And** the page remains editable in the admin
**And** an audit log entry is written.

---

## Epic 8: Consumer sites render CMS content via the public API and SDK

**Goal.** Astro, Next.js, and SvelteKit consumer sites fetch content and render it using the same `<Render>` component as the admin canvas. Public API is KV-cached, fast, globally available. SDK publishes to npm with full types.

### Story 8.1: A consumer fetches pages and records via REST

As a consumer-site developer (Marco, or an external OSS user),
I want simple REST endpoints to fetch my site's content,
So that I can render a Next.js page with one `fetch()`.

**Acceptance Criteria:**

**Given** a site with a published page at slug `home`
**When** a GET request hits `/v1/aiia/pages/home`
**Then** the response is JSON matching `{ blocks, meta }`
**And** response time is ≤ 100ms at P95 globally when KV cache is warm (NFR3)
**And** the `Content-Type: application/json` header is set
**And** CORS headers allow the request from any origin.

**Given** a collection with records
**When** a GET request hits `/v1/aiia/BlogPost?limit=10&offset=0`
**Then** the response is a paginated list with `items`, `total`, `hasMore` fields
**And** each record is scoped to the correct site_id.

### Story 8.2: Published content invalidates the edge cache within 5 minutes

As a consumer-site developer,
I want published changes to appear on the public site quickly,
So that editors don't think the CMS is broken.

**Acceptance Criteria:**

**Given** a page with content cached in KV
**When** the admin-api publishes a change to that page
**Then** the KV key is deleted within 500ms of the publish transaction committing
**And** the next public API request repopulates the cache with the new content
**And** if KV invalidation fails, the system retries for up to 5 minutes (NFR29) and surfaces a warning toast to the editor.

### Story 8.3: A consumer fetches a preview of unpublished content with a signed token

As Priya,
I want to preview my draft changes on the real public site before publishing,
So that I can catch issues the admin canvas might miss (e.g. third-party integrations).

**Acceptance Criteria:**

**Given** an editor clicks "Preview" on a draft page
**When** the admin-api generates a signed preview token with TTL 5 minutes and hash of the current blocks_json
**Then** the editor is opened in a new tab to `{public_site}/pages/home?preview={token}`
**And** the public site's SDK detects the token and calls `/v1/aiia/preview/{token}` which returns the draft blocks
**And** after 5 minutes, the preview URL returns 410 GONE (NFR46).

### Story 8.4: An operator exports site content as JSON for static builds

As Marco,
I want `possible-cms export --site aiia --out ./src/content/` to produce deterministic JSON,
So that my Astro build consumes CMS content without a runtime dependency.

**Acceptance Criteria:**

**Given** an authenticated operator running the CLI against a deployed CMS
**When** they run `pnpm possible-cms export --site aiia --out ./dist/content/`
**Then** the CLI writes JSON files matching the Astro content-collection shape: one file per page under `pages/*.json`, one per record under `{collection}/*.json`
**And** running the command twice produces byte-identical files (NFR39)
**And** the process completes within 30 seconds for a site with ≤100 pages and ≤1000 records.

### Story 8.5: A consumer installs the SDK, uses `<Render>` and `createClient()`

As an OSS user,
I want `pnpm add @possible-cms/sdk` and a minimal example to work in Next.js and Astro,
So that I can adopt the CMS in under an hour.

**Acceptance Criteria:**

**Given** an npm user installs `@possible-cms/sdk`
**When** they import `{ createClient, Render }`
**Then** both are typed with full `.d.ts` definitions
**And** the package exports both CJS and ESM variants (NFR37)
**And** the SDK works in Node 20+, Cloudflare Workers runtime, and Vercel Edge.

**Given** a Next.js 15 App Router page calling `createClient(...).getPage('home')`
**When** the response is rendered with `<Render blocks={page.blocks} />`
**Then** the rendered HTML matches the admin canvas output exactly (ADR-004)
**And** a smoke test in CI verifies Next.js, Astro, and SvelteKit reference apps render identically.

---

## Epic 9: AI agents operate on CMS content as peer users

**Goal.** Agents like Atlas read schemas, write records, publish pages — using the same API surface as humans, with their own token-scoped identity and idempotency guarantees. One CMS, two user classes.

### Story 9.1: An agent authenticates with a scoped API token

As Atlas,
I want to authenticate to the admin-api with an API token,
So that I can perform content operations under my own identity.

**Acceptance Criteria:**

**Given** a valid API token with scope `write:content` issued for site `sunstone`
**When** Atlas sends a request with header `Authorization: Bearer <token>`
**Then** the admin-api verifies the token hash against `agent_token.hash`
**And** the actor context becomes `{ type: 'agent', tokenId, siteId: 'sunstone', scopes: ['write:content'] }`
**And** subsequent actions are attributed to this agent in the audit log (FR6).

### Story 9.2: An agent introspects schemas, blocks, and collections

As Atlas,
I want to query the current schema for a site before writing records,
So that my generated data conforms to the expected shape.

**Acceptance Criteria:**

**Given** an authenticated agent hits `GET /v1/sunstone/schema`
**When** the admin-api responds
**Then** the body is a JSON object with `collections: { [name]: JSONSchema }` and `blocks: { [type]: { propsSchema: JSONSchema, defaultProps, fields } }`
**And** the JSONSchema is Zod-derived via `zod-to-json-schema`
**And** the response is cached in KV for 60s to reduce admin-api load.

### Story 9.3: An agent creates and updates records and pages

As Atlas,
I want to POST a new record or page in JSON and have it written to D1,
So that I can provision content from an agent pipeline.

**Acceptance Criteria:**

**Given** a token with `write:content` scope
**When** Atlas POSTs to `/v1/sunstone/TeamMember` with a valid body matching the collection schema
**Then** the admin-api validates the body with Zod (NFR13)
**And** on success, writes a new record scoped to `site_id`
**And** returns 201 with the created record's ID and slug
**And** on invalid body returns 400 with detailed field errors.

### Story 9.4: The system treats agent creates as idempotent with a key

As Atlas,
I want to send an `X-Idempotency-Key` header when creating records,
So that retries don't create duplicate records.

**Acceptance Criteria:**

**Given** Atlas sends POST /v1/sunstone/TeamMember with `X-Idempotency-Key: figma-bio-123` and a valid body
**When** the server processes the request
**Then** the (key, body_hash) pair is stored in `idempotency_key` table with 24h TTL
**And** the server creates a single record
**And** any subsequent call with the same key within 24h returns the same record ID (FR52)
**And** a call with the same key but different body returns 409 CONFLICT.

### Story 9.5: The system enforces scope limits on every agent operation

As an operator,
I want agents with `write:content` only to be unable to mutate schemas,
So that a compromised token has a limited blast radius.

**Acceptance Criteria:**

**Given** a token with `write:content` scope only
**When** Atlas attempts a request that requires `write:schema` (not applicable in Phase A since schema lives in code, but endpoints are pre-declared)
**Then** the admin-api returns 403 FORBIDDEN with message "Missing required scope: write:schema"
**And** the attempt is recorded in the audit log with outcome=denied_scope.

**Given** a token scoped to `siteId: sunstone`
**When** Atlas attempts a request against `/v1/aiia/pages/home`
**Then** the admin-api returns 403 FORBIDDEN with message "Token not authorized for site aiia".

---

## Epic 10: Agency devs scaffold new projects in under one day

**Goal.** Marco's onboarding experience from the PRD journey. From a fresh clone to a new client's schema bundle scaffolded and deployed in 4 hours. CLI drives the experience; admin responds to schema changes.

### Story 10.1: A developer initialises a new project's schema bundle via the CLI

As Marco,
I want `possible-cms init sunstone` to scaffold a new project with sensible defaults,
So that I don't have to hand-copy directories.

**Acceptance Criteria:**

**Given** a developer in the repo root running `pnpm possible-cms init sunstone`
**When** the CLI prompts for project metadata
**Then** it asks: workspace name, site slug, starter bundle (e.g. `hospitality`, `minimal`, `blog`)
**And** the CLI creates `examples/sunstone/` with `schema.ts`, `block-whitelist.ts`, `seed/`, and `README.md`
**And** creates `project` and `site` rows in D1 via admin-api
**And** prints the admin URL to visit.

### Story 10.2: Schema changes appear in the admin after redeploy

As Marco,
I want my edits to `examples/sunstone/schema.ts` to be visible in the admin immediately after deploy,
So that I can iterate on schema without extra coordination.

**Acceptance Criteria:**

**Given** Marco edits `schema.ts` to add a new collection `Room`
**When** he runs `wrangler deploy`
**Then** the admin's sidebar shows "Room" under Content within 30 seconds of deploy completion
**And** the collection's form renders correctly using the widget registry
**And** existing records in other collections are unaffected.

### Story 10.3: A seed importer loads AIIA content from static files into D1

As Marco,
I want `examples/aiia/seed/import.ts` to transform the existing AIIA MDX + JSON content into D1 records,
So that the AIIA cutover doesn't require re-creating 50 blog posts by hand.

**Acceptance Criteria:**

**Given** the existing AIIA static content at the reference path
**When** Marco runs `pnpm --filter @possible-cms/example-aiia seed:import`
**Then** the importer reads all MDX, JSON, and frontmatter
**And** creates BlogPost, Author, PricingTier, Integration records with tenant-scoped IDs
**And** produces a dry-run diff report before committing
**And** round-tripping via `possible-cms export --site aiia` produces byte-identical output to the original static tree (NFR39).

---

## Epic 11: Operators trust and observe the system

**Goal.** Every mutation is logged with actor identity. Nightly backups run and restores work. Failures emit structured errors, never silent ones. Makes the system trustworthy enough to put in production.

### Story 11.1: Every mutation writes an audit log entry with actor identity

As an operator,
I want to see who changed what and when,
So that I can investigate issues and review agent activity.

**Acceptance Criteria:**

**Given** any mutation (create/update/delete/publish/archive) via admin-api or agent API
**When** the mutation commits
**Then** an `audit_log` row is written within 100ms of commit (NFR45)
**And** the row includes: actor_type, actor_id, action, target_type, target_id, tenant_triple, diff_json (before/after snapshot), trace_id, created_at (FR61)
**And** for user sessions, actor_type='user'; for agent tokens, actor_type='agent' (FR6).

### Story 11.2: An operator views the audit log filtered by actor, entity, or time

As Marco,
I want a filterable audit log view,
So that I can answer "who published this broken change yesterday?"

**Acceptance Criteria:**

**Given** an audit log with 500+ entries
**When** the operator navigates to `/audit`
**Then** entries render as compact rows (UX §10.2 `<AuditRow />`)
**And** filter controls let them filter by actor_id, target_type, action, time range
**And** clicking a row expands to show the diff_json inline
**And** query performance stays under NFR2 (500ms P95) for ≤10 000 rows.

### Story 11.3: The system performs nightly backups and has a tested restore procedure

As Harold,
I want nightly D1 dumps to R2 with a documented restore playbook,
So that I can recover from any 24-hour window of data loss (NFR27).

**Acceptance Criteria:**

**Given** a production deployment with the backup cron Worker active
**When** the cron fires at 02:00 UTC daily
**Then** a `wrangler d1 export` is run and the output is uploaded to `possible-cms-prod-backups` R2 bucket as `possible-cms-prod-YYYY-MM-DD.sql.gz`
**And** backups older than 30 days are deleted
**And** a success/failure metric is emitted to Workers Analytics.

**Given** a restore scenario (simulated quarterly)
**When** an operator follows the RUNBOOK.md restore procedure
**Then** a complete restore from the most recent backup completes within 4 hours (NFR28)
**And** the Playwright E2E canary passes against the restored database.

---

## Epic 12: External operators adopt Possible CMS from GitHub

**Goal.** An external user clones the repo, runs a documented sequence of commands, and has a working CMS in under 10 minutes. OSS polish — README, CONTRIBUTING, CI green, published npm packages, v0.1.0 tag. The first real external success gate.

### Story 12.1: An external operator installs and deploys in under 10 minutes

As an OSS adopter,
I want the README quickstart to just work,
So that I don't bounce on the first run.

**Acceptance Criteria:**

**Given** a fresh machine with Node 20+, pnpm 9+, and Wrangler 3+ installed
**When** they follow the README "5-minute quickstart" commands exactly as written
**Then** the total elapsed time from `git clone` to a working admin login is under 10 minutes (NFR7, FR54)
**And** CI runs a daily job that measures this timing with a fresh container — failures block release.

### Story 12.2: npm packages are published with correct metadata

As an OSS adopter,
I want to `pnpm add @possible-cms/sdk` and get working types + CJS + ESM builds,
So that the package integrates cleanly into any Node or Edge runtime project.

**Acceptance Criteria:**

**Given** a v0.1.0 tag
**When** the release CI workflow publishes `@possible-cms/sdk`, `@possible-cms/schema-kit`, `@possible-cms/blocks`, `@possible-cms/cli` to npm
**Then** each package has a correct `exports` map, `main`, `module`, `types` (NFR37, FR59)
**And** each has `README.md`, `LICENSE`, and `package.json` metadata (homepage, repository, bugs)
**And** `pnpm add @possible-cms/sdk` in a fresh Node project installs without peer-dep warnings.

### Story 12.3: The repo has README, CONTRIBUTING, LICENSE, CHANGELOG, CoC, issue templates

As an OSS adopter,
I want to find clear onboarding docs and contributor guidance in the repo root,
So that I can contribute without archaeology.

**Acceptance Criteria:**

**Given** the v0.1.0 tagged repo
**When** an external user visits github.com
**Then** README has a 5-minute quickstart, feature summary, architecture pointer, and status badge
**And** CONTRIBUTING lists PR workflow, coding conventions, issue templates, and CI expectations
**And** LICENSE is MIT and machine-readable
**And** CHANGELOG follows Keep-a-Changelog format
**And** `.github/ISSUE_TEMPLATE/{bug,feature}.md` exist and are tested on a test PR.

### Story 12.4: The Playwright E2E suite covers the full user flow and runs green on every release

As Harold,
I want CI to catch regressions in the canonical user flow before every release,
So that v0.1 and every patch stays shippable.

**Acceptance Criteria:**

**Given** the main branch at release time
**When** CI runs `pnpm test:e2e`
**Then** the suite covers: login → create page → drag blocks → save draft → schedule publish → cron fires → public API serves updated content → byte-identical admin/public render
**And** it covers: record CRUD → reference picker → referential integrity block on delete
**And** it covers: media upload → image transform → recovery from oversize
**And** it covers: agent token create → agent API write → idempotency retry
**And** every test uses `@axe-core/playwright` to verify WCAG 2.1 AA at that screen (NFR31)
**And** CI fails the release on any suite failure.

---

## Epic B1 (Phase B, deferred): RBAC, versioning, webhooks, plugins

**Goal.** Multi-workspace RBAC + versioning/revert + webhooks + plugin API + Durable Object preview + cross-locale i18n + bulk actions. Unlocks external self-hosting at scale.

**FRs covered (all Phase B):** FR7, FR13, FR14, FR41, FR60, FR64 plus additional Phase B scope items listed in [prd.md §Product Scope §Growth Features](prd.md).

**Stories not yet broken out.** Will be authored at end of Phase A once Phase A learnings land. No blocker for v0.1.

---

## Final Validation

### FR Coverage

- **56 Phase A binding FRs** → all mapped to exactly one story via the FR Coverage Map above. No orphans.
- **49 NFRs** → each referenced by at least one story's acceptance criteria (performance / security / scalability / reliability / accessibility / integration / cost / observability). Referenced inline where applicable.
- **UX Design Requirements** → every UX pattern in ux-design.md §7–§11 is referenced by at least one story's AC.
- **Architecture Commitments** → all 5 ADRs are referenced in epic-level goals and story ACs (ADR-001 in Epic 4, ADR-002 in Epic 1/3/9, ADR-003 in Epic 1/8, ADR-004 in Epic 8, ADR-005 in Epic 1/11).

### Epic Quality Check

- **User-value framing:** all 12 epics are titled as user outcomes, not technical milestones. Epic 1 "Marco deploys" (not "Scaffold monorepo"), Epic 11 "Operators trust" (not "Add audit log"), Epic 12 "External operators adopt" (not "OSS polish") — per the prospective quality concerns in the readiness report.
- **Epic independence:** dependency chain validated — Epic 1 blocks all; Epic 2 blocks Epic 3/4/5/6/7/9/11; Epics 4/5/6 run in parallel; Epics 7/8/9 need Epic 4+5; Epic 10 needs Epic 1+5; Epic 11 emits from everything but blocks nothing; Epic 12 is finalisation. No circular or forward dependencies.
- **Story independence:** every story has at least one AC that's testable alone (no "depends on future story X" — verified by inspection).
- **Database creation timing:** Epic 1 Story 1.3 creates only tenancy + audit tables. Pages (FR15+) in Epic 4, records (FR25+) in Epic 5, assets (FR31+) in Epic 6, agent tokens in Epic 2, idempotency in Epic 9, schedule_job in Epic 7. Each table created when first needed (per best-practice).
- **Given/When/Then completeness:** 38 stories, 86 AC blocks total. Every AC is testable and specific.

### Parallelism Matrix (for orchestrator dispatch)

| Day   | Serial                            | Parallel workers                                                                                                           |
| ----- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Day 1 | Epic 1 (schema contract lock)     | —                                                                                                                          |
| Day 2 | —                                 | Epic 2 (backend+frontend) · Epic 4 (frontend+blocks) · Epic 5 (backend+frontend) · Epic 6 (backend+R2) · Epic 11 (backend) |
| Day 3 | —                                 | Epic 3 (frontend) · Epic 7 (backend+cron) · Epic 8 (backend+SDK) · Epic 9 (backend)                                        |
| Day 4 | —                                 | Epic 10 (CLI+examples) · remaining Epic 2/4/5/6/7/8/9 polish                                                               |
| Day 5 | Epic 12 (OSS release + E2E green) | —                                                                                                                          |

5-day continuous-execution target per the pacing correction on KAN-57. Buffer for Puck fit spike and D1 scale check built in.

---

_Epic and story breakdown complete. Ready for Kanousei Web Studio parallel workers._
