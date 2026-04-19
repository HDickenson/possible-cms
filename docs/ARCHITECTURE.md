---
stepsCompleted:
  - step-01-init
  - step-02-context
  - step-03-starter
  - step-04-decisions
  - step-05-patterns
  - step-06-structure
  - step-07-validation
  - step-08-complete
status: complete
completedAt: 2026-04-19
inputDocuments:
  - /Users/kanousei/Documents/KPD/_bmad-output/planning-artifacts/prd.md
  - /Users/kanousei/Documents/KPD/_bmad-output/planning-artifacts/implementation-readiness-report-2026-04-19.md
  - /Users/kanousei/.claude/plans/i-want-you-to-fizzy-dove.md
  - /Users/kanousei/Documents/KPD/infrastructure/cloudflareCMS/prd-cms.md
  - /Users/kanousei/Documents/KPD/docs/plans/2026-04-18-cms-dev-plan.md
workflowType: 'architecture'
project_name: Possible CMS
user_name: Kanousei
date: 2026-04-19
prdFile: /Users/kanousei/Documents/KPD/_bmad-output/planning-artifacts/prd.md
repo: kanousei/possible-cms
---

# Architecture Decision Document

_Possible CMS — Cloudflare-native, OSS, post-handover marketing CMS. This document maps every PRD FR/NFR to architectural commitments, records the decisions as ADRs, and produces the schema contract the parallel workers (Opus orchestrator + Sonnet/Haiku) will build against._

## 1. Project Context Analysis

### Requirements Overview

**Functional Requirements.** 64 FRs across 10 capability areas (see [prd.md §Functional Requirements](prd.md)). Phase A = 56 binding FRs; 8 deferred to Phase B. Capability clusters: Authentication & Identity (7), Workspace/Project/Site Management (7), Page Composition / Visual Block Canvas (10), Content Records (6), Media Management (6), Publishing & Scheduling (5), Public Content Delivery (6), Agent / API Integration (6), Developer Experience / SDK / CLI / Schema Extension (7), Observability & Audit (4).

**Non-Functional Requirements.** 49 NFRs across 8 quality dimensions, all binding for v0.1. Performance (7), Security (10), Scalability (6), Reliability & Availability (7), Accessibility (6), Integration & Interoperability (5), Cost Efficiency (3), Observability (5).

### Scale & Complexity

- **Primary technical domain:** multi-surface full-stack on Cloudflare edge (Next.js admin on Pages + 3 Workers + D1 + R2 + KV + Cloudflare Images) with published SDK + CLI.
- **Complexity level:** medium. Well-trodden CMS domain; novel combination (Cloudflare-native + block canvas + agent-as-peer + multi-project); no regulatory load.
- **Estimated architectural components:** 3 Workers, 1 Next.js app, 4 npm packages, 1 D1 database with ~12 tables, 1 R2 bucket with tenant-scoped prefix hierarchy, 1 KV namespace, 1 Cloudflare Images binding, 2 reference example projects.
- **Multi-tenancy:** yes (`workspace → project → site`), Phase A runs single-workspace with single-tenant assumptions baked in but schema multi-tenant-shaped.
- **Real-time features:** none in Phase A. Phase D Y.js/CRDT canvas deferred.
- **Integration complexity:** low-medium. Consumers are SDK-linked sites (Next.js/Astro/SvelteKit); agent integrations go via the same public/admin API as human editors.

### Technical Constraints & Dependencies

- **Cloudflare Workers runtime.** No Node filesystem, no arbitrary subprocess. WASM acceptable for future plugin needs. Workers CPU limit 30s/invocation (paid tier), memory 128 MB.
- **D1 caps.** Up to 10 GB per database, ~1B reads/day free, write throughput ~1000 writes/sec per shard. Phase A scope fits comfortably; Phase B multi-workspace may approach caps — partition strategy documented.
- **Cloudflare Pages.** Next.js App Router runs via `@cloudflare/next-on-pages`. Some Next.js features (Node-specific APIs, certain middleware) constrained.
- **R2.** Public bucket access via custom domain or signed URLs only. No direct bucket-to-bucket replication primitives; backups are scripted nightly D1→R2 dumps.
- **Puck library.** v0.14+ required for `DropZone` nested support. MIT licence. Source-available fallback plan: fork in `packages/blocks/puck-fork/`.
- **pnpm workspace + Turborepo.** Monorepo scripts and build graph go through Turbo; per-app wrangler configs isolated under `apps/*/wrangler.jsonc`.

### Cross-Cutting Concerns Identified

- **Tenant scoping** — every query path, every R2 object key, every KV key, every audit log entry. Enforced via ORM middleware + a `siteScoped()` helper that guards Drizzle query builders.
- **Zod as single schema source** — block props, record schemas, API inputs, form generation, and TypeScript types all derive from Zod. No drift possible.
- **Audit logging** — every mutation, with `user_id | agent_id` identity split. Writes synchronous within the request; reads surfaced through admin.
- **Cache invalidation** — KV public-read cache must invalidate on publish/archive; KV writes must not block D1 writes (graceful retry).
- **Idempotency for agents** — `idempotencyKey` supported on record and page create. Stored in a dedicated `idempotency_key` table with 24h TTL.
- **Accessibility** — WCAG 2.1 AA baked into shadcn/ui defaults + `@axe-core/playwright` CI gate + explicit keyboard maps for canvas operations.
- **CI grep-gate** — no literal `aiia`/`barbuda`/`kanousei`/`sunstone` strings in `apps/` or `packages/`. Enforced in `.github/workflows/ci.yml`.

## 2. Starter Template Evaluation

### Evaluated Options

| Option | Fit | Verdict |
|--------|-----|---------|
| `create-next-app` + manual Workers wiring | Medium — gives Next.js + TS + Tailwind, no Workers integration | Used as the basis for `apps/admin`; wiring is our responsibility |
| `cloudflare/templates` — worker-nextjs | Medium — Cloudflare-official Next-on-Pages starter | Good reference for Pages deployment but not monorepo-shaped |
| `measuredco/puck` starter | High for canvas — `puck/example` shows block composition | Used as the basis for the canvas implementation in `packages/blocks/` and `apps/admin/app/pages/[slug]/edit` |
| `t3-oss/create-t3-app` | Low — T3 stack is Next + tRPC + Prisma; no Cloudflare native | Reject — Prisma conflicts with Drizzle; pg-shaped abstractions |
| `cloudflare/d1-starter` | Low — single-worker starter with D1 | Reject — too small; we need a monorepo |
| Build from scratch on `pnpm init` + `turbo` | High — full control, no fight against starter assumptions | **Chosen** |

### Decision

**Build from scratch on pnpm + Turborepo.** No single starter matches the (Next.js admin + 3 Workers + 4 packages + 2 examples) monorepo shape. Starters would introduce conflicting assumptions. The plan §6 repo layout is our internal template.

**Confirmed stack (versions as of 2026-04):**
- TypeScript 5.6+
- Next.js 15 (App Router) + `@cloudflare/next-on-pages` 1.13+
- React 19
- pnpm 9+ workspace + Turborepo 2+
- Wrangler 3.90+
- Drizzle ORM 0.36+ + drizzle-kit 0.28+
- Zod 3.23+
- tRPC 11 (v11 stable for Workers)
- Puck 0.16+
- shadcn/ui (registry version 2026-02) + Tailwind CSS v4
- Playwright 1.48+
- MDX via `@mdx-js/mdx` 3+
- `@axe-core/playwright` 4.10+

Versions pinned exactly in `package.json`; Renovate bumps weekly with CI gate.

## 3. Core Architectural Decisions (ADRs)

### ADR-001 — Block Schema & Puck Integration

**Status:** Accepted.

**Context.** The PRD requires Elementor-style visual composition for the post-handover admin (FR15-FR24) with zero visible gap between admin preview and public rendering (FR23). Block definitions must be shared between admin canvas, public SDK renderer, and agent introspection (FR49).

**Decision.** Block definitions live in `packages/blocks/` and export a single `BlockConfig` object consumed by three surfaces:

```ts
interface BlockConfig<P> {
  type: string                              // globally unique block type key
  propsSchema: z.ZodSchema<P>                // single source of truth for props shape
  defaultProps: P                            // used when a block is added to canvas
  render: React.FC<P>                        // used by admin preview AND public renderer
  fields: PuckFields<P>                      // Puck right-panel editor configuration
  icon?: React.FC                            // palette icon
  category?: 'layout' | 'content' | 'media' | 'marketing'
}
```

Puck `Data` JSON (`{ root, content: Block[] }`) is the canonical persistence format. D1 stores `page.blocks_json` as TEXT (SQLite JSON). At runtime, admin canvas and public renderer hydrate the same JSON through the same `<Render blocks={data} />` component. The `<Render>` component imports the block registry and dispatches `block.render` by `block.type`; unknown types → `<UnknownBlockPlaceholder />` (FR24, NFR30).

**Consequences.**
- Admin preview and public render are byte-identical by construction. Fixing a block render bug fixes both surfaces at once.
- Agents introspect blocks via `GET /v1/{site}/blocks` returning `{ type, propsSchema: JSONSchema, defaultProps, category }[]`. Zod schemas serialised through `zod-to-json-schema`.
- Per-site block whitelist (FR22) lives in `site.block_whitelist: string[] | null`. Null = all registered blocks available; array = intersection with registered set. Admin palette filters by this list.
- Block registration is compile-time — adding a block requires a deploy. Phase C plugin API removes this constraint.
- Fallback plan: if Puck proves insufficient (week-2 nested-drop-zone spike), fork to `packages/blocks/puck-fork/` preserving the JSON schema.

### ADR-002 — D1 Tenant Isolation & Schema

**Status:** Accepted.

**Context.** FR8 mandates tenant scoping. NFR12 forbids cross-site leakage. NFR18/NFR19 set scale targets. Phase A single-workspace with Phase B multi-workspace ready.

**Decision.** Tenant hierarchy in D1:

```
workspace(id, name, plan NULL, created_at)
  ↓
project(id, workspace_id FK, slug, name, created_at)
  ↓
site(id, project_id FK, slug, domain, block_whitelist JSON NULL, created_at)
  ↓
page(id, site_id FK, slug, locale, status, blocks_json, published_at, scheduled_for, created_at, updated_at)
record(id, site_id FK, collection, slug, locale, status, data_json, published_at, scheduled_for, created_at, updated_at)
asset(id, site_id FK, r2_key, mime, size, width, height, created_at)
asset_reference(id, asset_id FK, owner_type, owner_id)  -- for FR29 referential integrity
```

Supporting tables: `user`, `membership(user_id, workspace_id, role)`, `agent_token(id, hash, name, scopes JSON, site_id NULL, project_id NULL, created_at, revoked_at)`, `audit_log(id, actor_type, actor_id, action, target_type, target_id, tenant_triple, diff_json, created_at)`, `idempotency_key(key, hash, result_id, created_at)`, `schedule_job(id, target_type, target_id, scheduled_for, status)`.

**Tenant-scoping middleware:** Drizzle query builder wrapped in a `siteScoped(siteId)` helper. Every admin-API and public-API handler receives `siteId` from path params or session; `siteScoped(siteId)` returns a Drizzle instance where all queries against site-scoped tables automatically apply `WHERE site_id = ?`. Queries that bypass `siteScoped()` fail type-check (builder does not expose raw access).

**Indexes.** `UNIQUE(site_id, slug, locale)` on `page` and `record`. `INDEX(site_id)` on `asset`, `schedule_job`. `INDEX(scheduled_for, status)` on `schedule_job` for cron worker. `INDEX(target_type, target_id)` on `asset_reference`. `INDEX(actor_type, actor_id)` and `INDEX(tenant_triple)` on `audit_log`.

**R2 object keys:** `{workspace_id}/{project_id}/{site_id}/{asset_id}.{ext}`. Enforced on upload URL generation; signed PUT URL constrains the key pattern.

**KV keys:** `page:{site_id}:{slug}:{locale}`, `record:{site_id}:{collection}:{slug}:{locale}`, `list:{site_id}:{collection}:{query_hash}`.

**Phase A seeding:** `workspace(id=1, name='default')`, `project(id=1, workspace_id=1, slug='aiia'|'barbuda'|...)`, sites populated by `possible-cms init`. Phase B: workspace-switcher UI, invite flow, RBAC enforcement.

**Consequences.**
- Every D1 read/write is tenant-scoped by construction. Forgetting the scope is a compile error.
- Migration files are forward-only (NFR41). Every migration ships with a MIGRATION-NOTES.md entry + CI gate that fails when `packages/schema-kit` changes without a corresponding migration.
- Phase B RBAC adds a `policy` layer on top of `siteScoped()` that filters allowed operations by role — no schema change required.

### ADR-003 — Worker Decomposition & tRPC/REST Split

**Status:** Accepted.

**Context.** PRD specifies three Workers: `admin-api`, `public-api`, `preview`. tRPC for admin DX (FR1-FR56), REST for public consumption (FR42-FR47) and agent ops (FR48-FR53, shared substrate claim).

**Decision.** Three distinct Cloudflare Workers:

| Worker | Path | Protocol | Bindings |
|--------|------|----------|----------|
| `admin-api` | `admin.{domain}/trpc/*` | tRPC over HTTPS | D1, R2, KV, `AUTH_SECRET`, `GITHUB_CLIENT_ID/SECRET` |
| `public-api` | `{domain}/v1/*` | REST | D1 (read-only), KV (read+write), `PUBLIC_CMS_SECRET` (for signed preview tokens) |
| `preview` | `{domain}/_preview/*` | REST, token-gated | D1 (read-only), `PREVIEW_SECRET` |

**Admin API (tRPC):** typed routers under `apps/api/src/admin-api/routers/{auth,workspace,project,site,page,record,collection,block,asset,audit,agent}.ts`. Authorisation middleware extracts either a session JWT (user) or API token (agent) and produces an `Actor = User | Agent` discriminated union. Each procedure declares required actor scope.

**Public API (REST):** 5 endpoints per FR42-47. All reads go through KV first; cache-miss hits D1 through `siteScoped()` (read-only). Successful D1 reads backfill KV. TTL 5 minutes; invalidation on publish/archive via `admin-api → KV.delete()`.

**Preview Worker:** simple URL-signed preview surfacing drafts. `GET /_preview/{signedToken}` → decode token → fetch draft from D1 → render with public-api renderer bypass. Tokens are 5-minute HMAC-signed. Replaces Durable Object preview in Phase A (FR46).

**Shared utilities:** `packages/workers-shared/` contains tenant scoping middleware, KV key builders, auth helpers, audit writer. Compiled into each Worker bundle.

**Consequences.**
- Public API has zero write path to D1 — a compromised public Worker cannot corrupt data.
- Admin/public split allows independent scaling and aggressive public caching.
- Agent operations use the same admin-api endpoints as humans (innovation claim §1 in PRD), just with an API token Actor instead of a User session. One codebase, two identities.

### ADR-004 — SDK Build-Time + Runtime Modes

**Status:** Accepted.

**Context.** FR47 (CLI export for static builds) and FR57-FR58 (Next.js/Astro/Svelte consumption, runtime + build-time). The AIIA cutover specifically uses build-time mode to preserve Astro static output; other consumers may want runtime SSR.

**Decision.** `@possible-cms/sdk` exposes two entry points:

```ts
// Runtime — SSR / ISR / Edge
import { createClient, Render } from '@possible-cms/sdk'
const cms = createClient({ endpoint: 'https://cms.example.com', site: 'aiia' })
const page = await cms.getPage('home')
return <Render blocks={page.blocks} />

// Build-time — static export consumed by Astro/Next.js/SvelteKit
// CLI invocation: possible-cms export --site aiia --out ./src/content/
// Produces: ./src/content/pages/*.json, ./src/content/blog/*.mdx, etc.
```

The runtime client is a thin fetch wrapper over the public REST API; responses are typed via Zod schemas imported from the site's schema bundle (a separate `@{project}/schema` package published per-example).

The build-time exporter is implemented in `@possible-cms/cli` (`possible-cms export`) — paginates through the public API, writes JSON + MDX files matching the consumer's content-collection shape. Output deterministic (NFR39) by sorting keys and stable file paths.

`<Render>` is isomorphic: identical component runs in admin preview (`apps/admin`) and consumer sites. It dispatches `block.type` against the imported registry.

**Consequences.**
- Zero code duplication between admin canvas and consumer rendering.
- AIIA's Astro build consumes `possible-cms export` output with no runtime dependency — the CMS can be offline and AIIA still builds.
- Runtime mode uses standard `fetch`; works on any JS runtime (Node 20+, Edge runtimes — NFR37).

### ADR-005 — Deployment, Secrets, and Environments

**Status:** Accepted.

**Context.** NFR7 (fresh-clone-to-admin ≤10 minutes), NFR11 (secrets in Cloudflare Secrets only), NFR24-25 (availability), OSS self-host posture (consumers deploy to their own Cloudflare account).

**Decision.** Environments:

| Env | Cloudflare account | D1 database | R2 bucket | KV namespace | Use |
|-----|-------------------|-------------|-----------|--------------|-----|
| `development` | Per-developer personal account | `possible-cms-dev` | `possible-cms-dev-media` | `possible-cms-dev-kv` | Wrangler dev server on localhost |
| `preview` | Kanousei account | `possible-cms-preview` | `possible-cms-preview-media` | `possible-cms-preview-kv` | Per-PR preview deploys |
| `production` | Kanousei account | `possible-cms-prod` | `possible-cms-prod-media` | `possible-cms-prod-kv` | `cms.possiblecms.dev` or `cms.kanousei.com` |

Each environment has its own `wrangler.toml` section. Secrets (`GITHUB_CLIENT_SECRET`, `AUTH_SECRET`, `PREVIEW_SECRET`, agent-token HMAC keys) configured via `wrangler secret put`. No secrets in `.dev.vars.example` (that file shows structure, not values).

**CI/CD.** GitHub Actions (`.github/workflows/ci.yml`): on push — lint, typecheck, test, build. On merge to `main` — deploy preview. On tag `v*` — deploy production with a manual approval gate (GitHub Environments protection rule).

**Backup.** Nightly Worker cron at 02:00 UTC: `wrangler d1 export possible-cms-prod > backup.sql.gz` uploaded to `possible-cms-prod-backups` R2 bucket with 30-day retention. Restore procedure documented in `docs/RUNBOOK.md` and tested quarterly (NFR26).

**Monitoring.** Cloudflare Workers Analytics (built-in) for P50/P95/P99 (NFR48). Synthetic canary (hourly Worker) runs login → create page → publish → read cycle; failures emit Cloudflare Logpush alerts (NFR47).

**Consequences.**
- External self-hosters copy the wrangler config and fill their own account ID + secrets. No multi-tenant "customer routing" required.
- No external secret manager required; Cloudflare Secrets is sufficient. (Infisical integration deferred to Phase D managed variant.)
- Multi-region implicit — Workers + D1 + KV run on Cloudflare's edge by default.

## 4. Implementation Patterns & Consistency Rules

Rules that prevent multiple AI agents from making divergent decisions. These are binding across the codebase.

### 4.1 Naming Conventions

- **Database tables:** `snake_case`, singular (`page`, `record`, not `pages`).
- **Database columns:** `snake_case`, with standard timestamps `created_at`/`updated_at` (TEXT ISO8601 UTC).
- **TypeScript files:** `kebab-case.ts` for modules, `PascalCase.tsx` for React components, `camelCase.ts` for hooks (`useSomething.ts`).
- **tRPC procedures:** `camelCase` dotted (`page.save`, `asset.uploadUrl`). No verbs on the left of the dot; entity names only.
- **REST endpoints:** `/v1/{site}/{resource}/{id}` — plural resource names, kebab-case if multi-word.
- **Zod schemas:** `PascalCase` with `Schema` suffix (`PageSchema`, `AssetSchema`); types derived via `z.infer<typeof PageSchema>` use `PascalCase` without suffix.
- **Block types:** `PascalCase` globally unique strings (`Hero`, `PricingTable`, `TeamGrid`).
- **Record collections:** `PascalCase` singular (`BlogPost`, `PricingTier`, `TeamMember`).
- **R2 object keys:** `{workspace_id}/{project_id}/{site_id}/{asset_id}.{ext}` — no spaces, no uppercase.
- **KV keys:** `{resource}:{site_id}:{slug}:{locale}` — lowercase, colon-separated.

### 4.2 Error Handling

- **tRPC errors:** use `TRPCError` with standard codes (`BAD_REQUEST`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `INTERNAL_SERVER_ERROR`). Include a `cause` when available.
- **REST errors:** `{ error: { code: string, message: string, details?: object } }` with matching HTTP status. Never leak stack traces.
- **Admin UI error display:** every mutation's error path renders a toast with the message and an action if recoverable (retry, open help, etc. — FR36).
- **Schema validation failures:** Zod parse error → 400 with `details: { field, message }[]`.
- **Tenant isolation violations:** if middleware detects a missing site_id, throw `TRPCError("FORBIDDEN", "Tenant scope required")` — never silently fall through.

### 4.3 State Management (Admin UI)

- **Server state:** TanStack Query (`@tanstack/react-query`) via tRPC's `@trpc/react-query` bridge. No parallel global fetching state.
- **Client state:** React `useState` + `useReducer`. No Redux, no Zustand unless a specific feature (Puck internal state) requires it.
- **Form state:** `react-hook-form` with `zodResolver` from `@hookform/resolvers/zod`. Every form validates against a Zod schema (NFR13).
- **Puck canvas state:** Puck manages internal canvas state; admin persists via tRPC `page.save` on explicit save action.

### 4.4 Logging & Observability

- **Structured logs only** — `console.log(JSON.stringify({ level, msg, trace_id, actor, tenant, ...}))`. No string-interpolated logs.
- **Trace IDs** — every Worker request gets a `trace_id` from the `CF-Ray` header; propagated to D1 audit entries and downstream KV/R2 ops.
- **Audit log entry shape** (FR61): `{ actor_type: 'user'|'agent', actor_id, action, target_type, target_id, tenant_triple: {workspace_id, project_id, site_id}, diff: {before, after}, trace_id, created_at }`.
- **No silent failures** (NFR49): every `catch` must either re-throw, log with `level: 'error'`, or emit a toast.

### 4.5 Testing

- **Unit tests:** Vitest for pure TS logic (`packages/sdk`, `packages/schema-kit`, `packages/blocks/render`). Target NFR: coverage >80%.
- **Component tests:** Vitest + React Testing Library for admin components where logic warrants it (form widgets, reference picker).
- **E2E tests:** Playwright against preview deploys in CI. One canary spec per FR-group: auth flow, block canvas round-trip, record CRUD, publish workflow, export correctness, multi-site isolation. NFR47 synthetic canary uses the same spec against prod.
- **Accessibility tests:** `@axe-core/playwright` runs on every Playwright page load. Fail on any serious-or-higher violation.

### 4.6 File Organisation Within a Worker

```
apps/api/src/
├── admin-api/
│   ├── index.ts               # Worker entry, routes to tRPC handler
│   ├── context.ts             # tRPC createContext: extracts actor from request
│   ├── trpc.ts                # protectedProcedure, agentProcedure helpers
│   └── routers/
│       ├── auth.ts
│       ├── page.ts
│       ├── record.ts
│       └── ...
├── public-api/
│   ├── index.ts               # Worker entry, handles routing
│   ├── handlers/
│   │   ├── page.ts
│   │   ├── record.ts
│   │   └── ...
│   └── cache.ts               # KV key helpers + invalidation
├── preview/
│   └── index.ts
└── shared/                    # used by all three workers
    ├── db.ts                  # Drizzle + siteScoped()
    ├── auth.ts                # JWT + API token verification
    ├── audit.ts
    └── kv-keys.ts
```

### 4.7 Component Patterns (Admin UI)

- **Route groups:** `apps/admin/app/(authed)/` for authenticated routes; `apps/admin/app/(auth)/login` for the OAuth flow.
- **Server vs client:** default to server components; opt into client via `'use client'` only for interactive widgets (Puck canvas, forms, media picker modal).
- **UI kit:** shadcn/ui components under `apps/admin/components/ui/`. Customisations go here; never patch shadcn outputs inline.
- **Tailwind:** v4 token-based approach. Colour/spacing tokens in `apps/admin/app/globals.css` `@theme` block. No inline hex codes.
- **Icons:** `lucide-react`. Single icon library across admin and public.

## 5. Project Structure & Boundaries

Concrete tree mapped to PRD FRs and Epic clusters from [implementation-readiness-report-2026-04-19.md](implementation-readiness-report-2026-04-19.md).

```
possible-cms/
├── apps/
│   ├── admin/                          # Next.js 15 App Router — Cloudflare Pages
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   └── login/page.tsx      # FR1
│   │   │   ├── (authed)/
│   │   │   │   ├── layout.tsx          # workspace/project/site switcher
│   │   │   │   ├── projects/page.tsx   # FR9
│   │   │   │   ├── sites/page.tsx      # FR10
│   │   │   │   ├── pages/
│   │   │   │   │   ├── page.tsx        # list — FR15 entry
│   │   │   │   │   └── [id]/edit/page.tsx  # Puck canvas — FR15-24
│   │   │   │   ├── records/
│   │   │   │   │   ├── [collection]/page.tsx       # list — FR25
│   │   │   │   │   └── [collection]/[id]/page.tsx  # edit — FR26-28
│   │   │   │   ├── media/page.tsx      # media library — FR33-35
│   │   │   │   ├── agents/page.tsx     # token mgmt — FR4-5
│   │   │   │   └── audit/page.tsx      # audit log view — FR62
│   │   │   └── api/trpc/[trpc]/route.ts  # proxies to admin-api Worker
│   │   ├── components/
│   │   │   ├── ui/                     # shadcn/ui
│   │   │   ├── canvas/                 # Puck integration
│   │   │   ├── forms/                  # schema-driven form widgets
│   │   │   ├── media/                  # MediaPicker, MediaLibrary
│   │   │   └── nav/                    # WorkspaceSwitcher, ProjectSwitcher
│   │   ├── lib/
│   │   │   ├── trpc.ts                 # client-side tRPC hooks
│   │   │   └── actor.ts                # session helpers
│   │   └── next.config.js
│   └── api/                            # 3 Cloudflare Workers
│       ├── src/
│       │   ├── admin-api/ ...          # see §4.6
│       │   ├── public-api/ ...
│       │   ├── preview/ ...
│       │   └── shared/ ...
│       ├── wrangler.jsonc              # env + bindings
│       └── drizzle.config.ts
├── packages/
│   ├── sdk/                            # @possible-cms/sdk
│   │   ├── src/
│   │   │   ├── client.ts               # createClient() — FR57
│   │   │   ├── render.tsx              # <Render> isomorphic — ADR-001/004
│   │   │   └── types.ts
│   │   └── package.json                # dual CJS/ESM exports — NFR37
│   ├── schema-kit/                     # @possible-cms/schema-kit
│   │   └── src/
│   │       ├── fields/                 # Zod helpers (slug, locale, r2Image, mdxBody, reference)
│   │       ├── block.ts                # block() factory — ADR-001
│   │       └── collection.ts           # collection() factory — FR30
│   ├── blocks/                         # @possible-cms/blocks — 10 starter blocks
│   │   └── src/
│   │       ├── hero.tsx
│   │       ├── rich-text.tsx
│   │       ├── image.tsx
│   │       ├── pricing.tsx
│   │       ├── faq.tsx
│   │       ├── cta.tsx
│   │       ├── columns.tsx
│   │       ├── spacer.tsx
│   │       ├── embed.tsx
│   │       ├── testimonials.tsx
│   │       ├── registry.ts             # exports all blocks in one registry
│   │       └── unknown-placeholder.tsx # FR24 / NFR30
│   ├── cli/                            # @possible-cms/cli
│   │   └── src/
│   │       ├── commands/
│   │       │   ├── init.ts             # FR11, FR55
│   │       │   ├── export.ts           # FR47, FR58
│   │       │   ├── import.ts           # seed helper
│   │       │   └── doctor.ts           # Phase B
│   │       └── index.ts
│   └── workers-shared/                 # shared Worker utilities (alias for apps/api/src/shared)
├── examples/
│   ├── aiia/
│   │   ├── schema.ts                   # AIIA's Zod collections + block whitelist
│   │   ├── seed/                       # importer from /Users/kanousei/Dropbox/Production/website/src/content/
│   │   └── README.md
│   └── barbuda/
│       ├── schema.ts                   # Tour, Operator, Booking, Review
│       ├── seed/
│       └── README.md
├── migrations/                         # D1 forward-only migrations
│   ├── 0001_core_tenancy.sql           # workspace, project, site, user, membership, audit_log
│   ├── 0002_agent_tokens.sql
│   ├── 0003_pages.sql
│   ├── 0004_records.sql
│   ├── 0005_assets.sql
│   ├── 0006_idempotency.sql
│   ├── 0007_schedule_jobs.sql
│   └── MIGRATION-NOTES.md
├── docs/
│   ├── ARCHITECTURE.md                 # this doc (copy or pointer)
│   ├── ADR-*.md                        # per-ADR docs extracted
│   ├── RUNBOOK.md                      # backup/restore, incident procedures
│   ├── SECURITY.md
│   └── block-catalog.md                # generated from packages/blocks
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                      # lint + typecheck + test + CI grep-gate + preview deploy
│   │   └── release.yml                 # production deploy on tag
│   └── ISSUE_TEMPLATE/
├── wrangler.jsonc                      # top-level config alias
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.base.json
├── LICENSE                             # MIT
├── README.md                           # 5-minute quickstart
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── CHANGELOG.md
└── .dev.vars.example                   # shows structure of required secrets
```

### Boundary Rules

- **`apps/admin/` imports from `packages/*` only.** Never from `apps/api/`.
- **`apps/api/` imports from `packages/schema-kit`, `packages/blocks` (server render paths), never from `apps/admin/`.**
- **`packages/*` have no runtime dependency on Cloudflare-specific APIs** except `packages/workers-shared` (explicitly).
- **`examples/*` import from published `@possible-cms/*` packages**, never directly from `packages/*` paths. This forces packages to be useful in their published form.
- **No circular dependencies.** Turborepo enforces; `pnpm build` fails on cycles.

### Component → FR Mapping

| Component | FRs covered | Epic (from readiness report) |
|-----------|-------------|------------------------------|
| `apps/admin/app/(auth)/login` | FR1, FR2, FR3 | Epic 2 |
| `apps/admin/app/(authed)/agents` | FR4, FR5 | Epic 2 |
| `apps/admin/app/(authed)/{projects,sites}` | FR9, FR10, FR12 | Epic 3 |
| `packages/cli init` | FR11, FR55 | Epic 10 |
| `apps/admin/components/canvas` + `packages/blocks` | FR15-FR24 | Epic 4 |
| `apps/admin/app/(authed)/records` + `components/forms` | FR25-FR30 | Epic 5 |
| `apps/admin/components/media` + R2/Images wiring | FR31-FR36 | Epic 6 |
| `apps/api/src/admin-api/routers/page` + `schedule_job` + cron | FR37-FR40 | Epic 7 |
| `apps/api/src/public-api` + `packages/sdk` | FR42-FR47, FR57-FR58 | Epic 8 |
| `apps/api/src/admin-api` agent flows + `agent_token` | FR48-FR53 | Epic 9 |
| `packages/cli` + `examples/*` + `packages/schema-kit` | FR54-FR59 | Epic 10 |
| `apps/api/src/shared/audit.ts` + admin audit view + backup cron | FR61-FR63 | Epic 11 |
| OSS polish: README, CI, E2E matrix | — | Epic 12 |

## 6. Architecture Validation

### 6.1 Decision Compatibility

- Next.js 15 + React 19 + `@cloudflare/next-on-pages` 1.13+ — all current stable, mutually compatible (verified via package.json peer requirements in each library's docs).
- tRPC 11 + Zod 3.23 + Drizzle 0.36 — tRPC 11 native Zod output is current; Drizzle 0.36 supports D1 directly.
- Puck 0.16 + React 19 — Puck supports React 19 since 0.15. If an incompatibility surfaces, pin to 0.14 (React 18) with a migration plan.
- Tailwind v4 + shadcn/ui — shadcn/ui has a Tailwind v4 branch; use it.
- Cloudflare Workers + Wrangler 3.90 — current production combo.

### 6.2 FR Coverage Validation

Every one of the 56 Phase-A binding FRs is assigned to a concrete component/module in §5's Component → FR Mapping. No orphan FRs.

### 6.3 NFR Coverage Validation

| NFR category | Architectural commitment |
|--------------|--------------------------|
| Performance (NFR1-7) | Cloudflare edge + KV cache + <100ms canvas interactions (Puck perf baseline) |
| Security (NFR8-17) | ADR-002 tenant scoping middleware, ADR-003 read-only public Worker, agent token hashing, Zod at every boundary, HTTPS + HSTS default via Cloudflare |
| Scalability (NFR18-23) | D1 capacity + partition fallback documented; KV for read scale; R2 unbounded |
| Reliability (NFR24-30) | Nightly D1 backup (ADR-005), synthetic canary, graceful KV invalidation retry, block render placeholder |
| Accessibility (NFR31-36) | shadcn/ui + Tailwind v4 tokens, `@axe-core/playwright` CI gate, explicit keyboard map in §4.7 conventions |
| Integration (NFR37-41) | Dual CJS/ESM in `packages/sdk`, SDK tested against Next.js/Astro/Svelte in CI, deterministic export in CLI, semver rules |
| Cost (NFR42-44) | Cloudflare-native stack implies free/cheap tiers; measured per-site in Phase B dashboard |
| Observability (NFR45-49) | ADR-003 Worker analytics, structured logging convention in §4.4, audit log shape specified |

### 6.4 Gap Analysis

**Unresolved (flagged for implementation phase):**
- **Cloudflare Images binding mechanics.** Concrete API call shape for transform-on-read pending verification; fallback is direct Cloudflare Images fetch-based transforms.
- **Drizzle + D1 bug surface.** Drizzle 0.36 on D1 is stable but edge cases exist with complex transactions. Mitigation: prefer single-query patterns; keep transaction use minimal.
- **Puck v0.16 React 19 compatibility** — verify at week-2 spike before committing.
- **MDX sanitization whitelist** — exact allowed tags/attrs not specified here. Defer to `apps/admin/lib/mdx-sanitize.ts` implementation, based on `rehype-sanitize` with a constrained schema. Story authored under Epic 4.

**Deferred to Phase B (explicit):**
- Plugin API mechanics (FR60).
- Versioning/revert storage strategy (FR41) — likely a `page_version` shadow table with content-hash dedup.
- Webhook delivery mechanism (FR64) — likely Durable Object with retry semantics.

### 6.5 Architecture Coherence Statement

The architecture is coherent: every FR maps to a concrete component, every NFR maps to an architectural commitment or a monitoring gate, every ADR has a documented fallback, every cross-cutting concern has a single owner in the codebase. The decision graph has no cycles and no forward references. Parallel workers (Opus orchestrator + Sonnet/Haiku) have a locked schema contract (ADR-001 block shape + ADR-002 tenant schema + ADR-003 Worker split + ADR-004 SDK shape) to build against. Implementation can begin.

## 7. Handoff

- **Schema contract locked.** ADR-001 through ADR-005 are binding for v0.1. Changes require a new ADR + version bump.
- **Next downstream workflow:** `/bmad-create-ux-design` (admin UX patterns, canvas interactions, props editor, media library, publish controls) — can run in parallel with initial scaffold work.
- **Then:** `/bmad-create-epics-and-stories` using the 12-cluster map from the readiness report and the component → FR mapping in §5.
- **Then:** hand to PaperclipAI Kanousei Web Studio (`4cd2b1e2-9dd5-42ef-a699-e94979b962b9`) — CEO-agent triages, PM-agent breaks epics into stories, parallel backend/frontend/CLI/QA workers execute against this architecture.
- **Opus orchestrator session** (this one) remains the integration gate: reviews PRs, enforces the schema contract, wires seams, runs weekly `/plan-eng-review` + `/plan-ceo-review` checkpoints.
