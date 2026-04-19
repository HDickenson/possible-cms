# Caixo CMS — Universal, Elementor-Style, Cloudflare-Native CMS

**Date:** 2026-04-19
**Mode:** Advisor (Sonnet/Haiku + BMAD personas; execution via PaperclipAI Kanousei Web Studio)
**Repo (to create):** `aiia-caixo/cms` — public, MIT, open-source from day 1
**Supersedes:** [docs/plans/2026-04-18-cms-dev-plan.md](/Users/kanousei/Documents/KPD/docs/plans/2026-04-18-cms-dev-plan.md) (AIIA-scoped) — AIIA becomes **example #1**, not workspace #1.
**Input spec:** [infrastructure/cloudflareCMS/prd-cms.md](/Users/kanousei/Documents/KPD/infrastructure/cloudflareCMS/prd-cms.md)

---

## 1. Context

Harold needs a CMS that is the foundation for **every** Kanousei/AIIA/client web project, targets Cloudflare primitives (Workers, D1, R2, KV, Pages), ships an Elementor-style visual block builder that non-engineers can use, and is open-sourced as a minimum-viable OSS project. The existing PRD is structured-form driven and explicitly defers visual drag-drop ([PRD §13](/Users/kanousei/Documents/KPD/infrastructure/cloudflareCMS/prd-cms.md)). The current plan hard-codes AIIA as workspace=1. Both assumptions must flip: multi-project from day 1, block canvas from day 1.

**Why now:** AIIA website launches Gate 5 static. Every other project (Barbuda, Sunstone Phase 2, LRG marketing, future clients) will need a CMS — building once, correctly, beats five one-offs. OSS release widens leverage and locks us into clean abstractions.

**Intended outcome:** a deployable `caixo-cms` repo with one-command `wrangler deploy`, a Puck-based block canvas that produces JSON-serialized pages, a generic project initializer (not AIIA-specific), and an advisor-mode workflow where Claude-Code (Sonnet/Haiku) plans and reviews while PaperclipAI Web Studio agents (Kanousei Web Studio `4cd2b1e2`) implement.

## 2. Locked decisions

| #   | Decision              | Value                                                                                                                         |
| --- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | Admin UI framework    | Next.js 15 App Router on Cloudflare Pages                                                                                     |
| 2   | Block canvas library  | **[Puck](https://github.com/measuredco/puck)** (MIT, React, JSON output)                                                      |
| 3   | Public name           | `caixo-cms` (GitHub org `aiia-caixo`)                                                                                         |
| 4   | License               | MIT                                                                                                                           |
| 5   | Auth (Phase A)        | GitHub OAuth → JWT; Cloudflare Access slots in Phase B                                                                        |
| 6   | Admin API             | tRPC (single TS codebase); public REST stays per PRD §4.3                                                                     |
| 7   | Multi-project posture | Generic from day 1 — `workspace`, `project`, `site` tables; AIIA seeds as `examples/aiia/`                                    |
| 8   | Execution model       | Advisor mode — KPD plans, Kanousei Web Studio builds                                                                          |
| 9   | Storage               | D1 (structured), R2 (media), KV (public read cache), Cloudflare Images (transforms)                                           |
| 10  | Content model         | Hybrid: structured `Record { data: JSON }` for typed entities + `Page { blocks: Block[] }` for Puck-rendered composable pages |

## 3. Architecture deltas vs existing plan

Three additions on top of the AIIA-scoped plan:

### 3.1 Block layer (Elementor-style)

- **New table:** `page { id, site_id, slug, locale, status, blocks_json, published_at }`. `blocks_json` is a Puck `Data` object — `{ root, content: Block[] }` — typed in `packages/schema-kit/blocks.ts`.
- **Block registry:** `packages/blocks/` exports `BlockConfig[]` — each block is `{ type, zodProps, render, fields }`. Block render is a React component; `fields` drives Puck's right-panel props editor.
- **Starter block set (v1):** Hero, RichText (MDX), Image, Pricing (references `PricingTier` entity), FAQ, CTA, Columns, Spacer, Embed, Testimonials. 10 blocks cover 90% of marketing pages.
- **Renderer parity:** one `<Render data={blocks_json} />` component shared between admin preview and the runtime site SDK — identical markup, zero drift.
- **Persistence:** on save, Puck emits JSON → tRPC `page.save` → D1. On publish, KV key `page:{site}:{slug}:{locale}` stores rendered HTML snapshot + JSON; invalidation on republish.

### 3.2 Multi-project foundation

- **New tables:** `workspace` (tenant), `project` (Kanousei/AIIA/client), `site` (marketing.aiia.io, barbudaleisuretours.com, …). Hierarchy: `workspace → project → site → page/record`.
- **Generic init:** `caixo-cms init <project>` scaffolds `examples/<project>/` with Zod schemas, block whitelist, seed JSON. No AIIA hardcoding anywhere in core.
- **Site-scoped schemas:** each `site` picks a schema bundle from `examples/` or its own `content/schema.ts`. Core ships a `base` bundle (Page, BlogPost, Author, Media) that any site inherits.

### 3.3 OSS minimum viable cut

- `README.md` with 5-minute quickstart: clone, `pnpm install`, `wrangler deploy`, open admin, drag blocks.
- `examples/aiia/` and `examples/barbuda/` to prove reusability (Barbuda is the second consumer test).
- `CONTRIBUTING.md`, MIT `LICENSE`, `CODE_OF_CONDUCT.md`, GitHub Issue templates.
- Docs site built **with caixo-cms itself** (dogfooding) — deferred to Phase C per PRD §10, but bookmark it.

## 4. Advisor-mode execution model

Claude-Code (this session, Sonnet/Haiku models) runs the strategy loop. PaperclipAI Kanousei Web Studio agents do the code. Division of labour:

| Phase    | Claude-Code (advisor)                                                                                                                              | Kanousei Web Studio                                            |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Spec     | `/bmad-create-prd` refresh PRD for block layer + multi-project. `/bmad-architect` produces ADRs for block schema, Puck integration, D1 migrations. | —                                                              |
| Scaffold | `/bmad-create-epics-and-stories` breaks Phase A into 6 epics, ~30 stories, each with acceptance criteria.                                          | CEO/PM triage epics → assign to Frontend Dev, Backend Dev, QA. |
| Build    | `/bmad-review-adversarial-general` + `/review` on every PR before merge.                                                                           | Implement stories, open PRs against `main`.                    |
| QA       | `/aegis:audit` at end of each phase. `/qa` on admin UI.                                                                                            | QA agent runs Playwright E2E on admin + renderer.              |
| Ship     | `/ship` workflow with CHANGELOG + semver.                                                                                                          | CI deploys Workers + Pages; PM updates ERPNext.                |

**Skill invocations used in this session:** `bmad-create-prd`, `bmad-architect`, `bmad-create-epics-and-stories`, `bmad-pm`, `review`, `aegis:audit`, `plan-ceo-review`, `plan-eng-review`, `plan-design-review`.

**Delegation via:** `paperclipai issue create --company-id 4cd2b1e2-9dd5-42ef-a699-e94979b962b9 ...` for each epic. KPD bridge script `.claude/scripts/sync-paperclip.sh --pull` syncs status back. Model routing stays Sonnet/Haiku (agents pick per PaperclipAI config).

## 5. Milestones (6 weeks, supersedes the 4-week AIIA plan)

### Week 1 — Spec + scaffold

- Refresh PRD with block layer + multi-project sections (advisor: `bmad-create-prd`).
- ADR-001 block schema, ADR-002 Puck integration, ADR-003 D1 migration strategy.
- Create `aiia-caixo/cms` repo, MIT license, PNPM workspace: `apps/admin`, `apps/api`, `packages/{sdk, schema-kit, blocks}`, `examples/{aiia, barbuda}`.
- Wrangler config for 3 Workers (`admin-api`, `public-api`, `preview`) + Pages for `admin/`.
- D1 migrations: core tables (`workspace`, `project`, `site`, `user`, `membership`, `collection`, `record`, `page`, `asset`, `audit_log`).
- **Demo:** `wrangler deploy` succeeds; admin route `/login` renders; D1 schema applied.

### Week 2 — Auth + admin shell + block registry

- GitHub OAuth → JWT session. Protected tRPC router.
- Admin shell (shadcn/ui, TanStack Table): workspace/project/site switcher, list views for Pages and Records.
- `packages/blocks/`: 10 starter blocks with Zod prop schemas + React render + Puck `fields` config.
- Puck editor page wired to tRPC `page.save` / `page.load`. Right-panel props editor works per block.
- **Demo:** engineer drags Hero + FAQ into a blank page, edits headline, saves; reload returns identical JSON.

### Week 3 — Records (schema-driven forms) + media

- Schema-driven form generator reading Zod schemas (reuses PRD §4.2 approach).
- R2 upload flow: signed PUT URL → `asset` table row → Cloudflare Images transform on read.
- Media library modal, invoked from block prop editors (Image block, Hero background).
- Reference picker widget (link a `PricingTier` record from the Pricing block).
- **Demo:** content admin creates a BlogPost record, uploads hero image, links an Author.

### Week 4 — Publish + public API + renderer SDK

- Publish state machine: `draft → scheduled → live → archived`. Scheduler = cron-triggered Worker.
- Public REST API on `public-api` Worker: `GET /v1/{site}/pages/{slug}` returns rendered HTML + JSON blocks; `GET /v1/{site}/{collection}/{slug}` for records. KV-cached 5-min TTL.
- `@caixo-cms/sdk` runtime client: `createClient({ endpoint, site }).getPage(slug)` returns `{ blocks, meta }` plus `<Render />` component for Next.js/Astro.
- Build-time mode: `caixo-cms export --site aiia --out ./src/content/` for Astro static builds.
- **Demo:** publish a page through admin; public API serves it; sample Next.js site renders identical HTML to admin preview.

### Week 5 — AIIA + Barbuda seed, multi-project proof

- `examples/aiia/`: Zod schemas for Page, BlogPost, PricingPhase, PricingTier, Integration, Author, Testimonial, FAQ, Legal, DocPage. Seed importer reads [/Users/kanousei/Dropbox/Production/website/src/content/](/Users/kanousei/Dropbox/Production/website/src/content/).
- `examples/barbuda/`: second project proves generic init — Tour, Operator, Booking, Review schemas. Seed from existing Barbuda Leisure D1 → caixo-cms D1.
- `caixo-cms init <project>` CLI: scaffolds new `examples/<project>/` from a template.
- **Demo:** two independent sites (AIIA + Barbuda) served from the same CMS deploy, each with its own schema bundle.

### Week 6 — Hardening, OSS polish, v0.1 release

- Backup: D1 nightly dump to R2; documented restore.
- Audit log: every mutation logged with `{user_id, action, record_id, diff, timestamp}`.
- E2E test matrix: auth, block canvas CRUD, record CRUD, publish, export, multi-site.
- Rate limiting on public API (per-IP, KV-based).
- `README.md` 5-minute quickstart, `CONTRIBUTING.md`, issue templates, GitHub Actions CI.
- **Demo:** fresh-clone → `pnpm install` → `wrangler deploy` → working admin at `cms.caixo.dev` in under 10 minutes.
- Tag `v0.1.0`, announce OSS launch.

## 6. Repo layout

```
caixo-cms/
  apps/
    admin/              # Next.js 15 App Router on Cloudflare Pages
    api/                # 3 Workers: admin-api (tRPC), public-api (REST+KV), preview
  packages/
    sdk/                # @caixo-cms/sdk — runtime + build-time client, <Render />
    schema-kit/         # Zod helpers (slug, locale, r2Image, mdxBody, reference)
    blocks/             # Starter block registry (Hero, Pricing, FAQ, …)
  examples/
    aiia/               # Schemas + seed for AIIA
    barbuda/            # Schemas + seed for Barbuda Leisure
  migrations/           # D1 migrations (drizzle-kit)
  docs/                 # README, ARCHITECTURE.md, ADRs, block catalog
  .github/
    workflows/ci.yml    # lint + typecheck + test + preview deploy
    ISSUE_TEMPLATE/
  wrangler.jsonc        # top-level; per-app configs under apps/*
  pnpm-workspace.yaml
  turbo.json
  LICENSE (MIT)
  CONTRIBUTING.md
  CODE_OF_CONDUCT.md
  README.md
```

## 7. Critical files to read (reuse, don't reinvent)

Claude-Code and PaperclipAI agents should reference these before writing code:

- [infrastructure/cloudflareCMS/prd-cms.md](/Users/kanousei/Documents/KPD/infrastructure/cloudflareCMS/prd-cms.md) — the spec this plan executes against. §4.2 form-gen, §4.3 public API, §13 out-of-scope (we're overriding visual-builder exclusion).
- [docs/plans/2026-04-18-cms-dev-plan.md](/Users/kanousei/Documents/KPD/docs/plans/2026-04-18-cms-dev-plan.md) — prior AIIA-scoped plan. §6 repo layout, §7 AIIA contract, §8 risks still apply.
- [/Users/kanousei/Dropbox/Production/website/docs/page-types.md](/Users/kanousei/Dropbox/Production/website/docs/page-types.md) — AIIA's page/entity catalog. Becomes `examples/aiia/` schemas.
- [/Users/kanousei/Dropbox/Production/website/src/content/pricing/schema.json](/Users/kanousei/Dropbox/Production/website/src/content/pricing/schema.json) — seed source for AIIA pricing entities.
- Puck docs — https://puckeditor.com/docs (block config pattern, custom fields, React renderer).
- [.claude/PAPERCLIP-BRIDGE.md](/Users/kanousei/Documents/KPD/.claude/PAPERCLIP-BRIDGE.md) — delegation API for Kanousei Web Studio.

## 8. Risks

| Risk                                                                   | Mitigation                                                                                                                                                                                     |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Puck doesn't cover a needed UX pattern (e.g. nested drag-drop regions) | Puck supports `DropZone` for nested regions; spike in week 2 day 1 before committing. If blocker: fork Puck or fall back to structured forms for edge cases.                                   |
| Block prop Zod schemas drift from render components                    | Single source: generate TS types from Zod, render component props are `z.infer<typeof propsSchema>`. Compile-time enforced.                                                                    |
| Multi-project tables over-engineer MVP                                 | Keep `workspace/project/site` tables flat (no RBAC, no cross-site refs) in Phase A. Hierarchy is cheap; enforcement is expensive and deferred.                                                 |
| Advisor-mode throughput bottlenecks on PaperclipAI agent availability  | Budget 20% slack per milestone; fall back to hybrid mode (Claude-Code scaffolds, Web Studio fills) if a week slips >2 days.                                                                    |
| OSS release exposes AIIA-specific assumptions                          | Hard rule: no string literal `aiia` in `apps/`, `packages/`, or `migrations/`. Grep-gate in CI.                                                                                                |
| Notebooklm CLI broken (missing pygments) blocks research               | Noted in §9. Either `pip install pygments` in the venv or run research via `/notebook` skill (which uses a different backend). Not a blocker — research is Sonnet/Haiku advisor-driven anyway. |

## 9. Support tooling — current state (user chose "skip" for now)

Captured so the next session knows:

- **notebooklm CLI** at `/Users/kanousei/Documents/KPD/venv/bin/notebooklm` crashes on import (`pygments` missing). Fix with `./venv/bin/pip install pygments` when needed. `/notebook` skill works independently.
- **Obsidian vault** for CMS docs: no `~/vaults/` exists. When needed, create `~/vaults/caixo-cms/` and point `/graphify --obsidian-dir` at it. Obsidian app is installed (`/opt/homebrew/bin/obsidian`).
- **graphify** skill ready. Recommended first run (deferred): `/graphify /Users/kanousei/Documents/KPD/infrastructure/cloudflareCMS --mode deep --obsidian` once the block ADRs are written, to give advisor agents a semantic index of architecture decisions.

None of these block Week 1. Revisit before Week 3 so advisor agents can query prior art semantically.

## 10. Verification

End-to-end test performed at end of each week (demo above); final v0.1 acceptance gate:

1. `git clone git@github.com:aiia-caixo/cms.git && pnpm install && wrangler deploy` completes in <10 minutes on a fresh machine.
2. Admin at deployed URL loads, GitHub OAuth works, user lands on empty workspace.
3. `caixo-cms init demo` scaffolds a third example project, demo site served alongside aiia + barbuda.
4. Drag Hero + Pricing + FAQ into a new Page, save, publish — public API `GET /v1/demo/pages/home` returns JSON + renders identically on a sample Next.js consumer.
5. Record CRUD works for a BlogPost with MDX body + hero image + author reference.
6. Playwright E2E suite green in CI.
7. `/aegis:audit` on final repo yields no Critical findings.
8. AIIA website build (branch `feat/cms-build-time`) consumes `caixo-cms export --site aiia` output and renders byte-identical to current static build.

## 11. Open questions (non-blocking)

1. Admin domain — `admin.caixo.dev` (neutral, OSS-friendly, recommended) vs `cms.aiia.io`?
2. Should `@caixo-cms/sdk` publish to npm during Phase A, or defer until v0.2?
3. Barbuda as second example — does current Barbuda Leisure project sign off on being a reference implementation? If not, pick Sunstone Phase 2 instead.
4. Cloudflare account — deploy to existing Kanousei account or create a dedicated `caixo` account for OSS isolation?

## 12. Next actions

1. Advisor: run `/bmad-create-prd` to update the PRD with block layer + multi-project deltas (this session or next).
2. Advisor: run `/bmad-architect` to produce ADR-001/002/003 draft.
3. Advisor: answer §11 open questions with Harold.
4. Delegate: create PaperclipAI issue against Kanousei Web Studio (`4cd2b1e2`) titled "Caixo CMS v0.1 — repo scaffold + Workers + D1 migrations" with Week 1 scope.
5. Claude-Code: prepare CI grep-gate script to block `aiia` literals in `apps/`/`packages/` (risk §8).
6. Milestone cadence: weekly review with `/plan-eng-review` + `/plan-ceo-review` at end of each week.
