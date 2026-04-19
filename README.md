# Possible CMS

> Cloudflare-native, open-source CMS designed for the post-handover phase of AI-delivered websites. Agents build the site structure and register blocks; non-technical owners maintain content through an Elementor-style visual canvas — no tickets, no devs, no CMS training.

**Status:** Pre-v0.1 (Phase A in progress)  ·  **License:** MIT  ·  **Stack:** Cloudflare D1 · R2 · KV · Workers · Pages · Next.js 15 · Puck · Zod · tRPC

---

## 5-minute quickstart

Prerequisites: Node 20+, pnpm 9+, Wrangler 3.90+, a Cloudflare account with D1 / R2 / Workers / Pages access, a GitHub OAuth App.

```bash
git clone git@github.com:kanousei/possible-cms.git
cd possible-cms
pnpm install
cp .dev.vars.example .dev.vars   # fill Cloudflare + GitHub OAuth creds
wrangler d1 create possible-cms
wrangler d1 migrations apply possible-cms --local
wrangler deploy
# Open the deployed admin URL; log in with GitHub; drag blocks.
```

Target: under 10 minutes from clone to a working admin on a fresh machine.

---

## What this is

Possible CMS manages the **marketing content and page structure** of sites. It does NOT manage product-admin concerns (end-user accounts, billing, licence keys, runtime business logic). Every consumer product has its own admin; Possible CMS is the content layer.

### Primary users

- **Post-handover admin (hero user).** The marketer, ops lead, or founder who inherits a finished site and edits copy, images, and page blocks without a dev.
- **Agency developer (secondary).** Scaffolds new sites, registers block types, wires consumer sites to the CMS via the SDK.
- **AI agent (peer user).** Creates pages, updates records, publishes via the same API the admin uses.

### Distinguishing features

1. **Cloudflare-first** — D1 *is* the database, R2 *is* media, KV *is* cache, Workers *is* runtime. No adapters.
2. **Block canvas for editors** — drag-drop composition via Puck; schema-driven per-block prop editor; single source of truth between admin preview and public render.
3. **Agent API** — same tRPC/REST surface for humans and agents; scoped API tokens with idempotent record writes.
4. **Multi-project from day 1** — `workspace → project → site → page/record` hierarchy. AIIA and Barbuda ship as reference examples.

## Repository layout

```
apps/admin/     Next.js 15 admin UI (Cloudflare Pages)
apps/api/       3 Cloudflare Workers: admin-api (tRPC), public-api (REST+KV), preview
packages/
  sdk/          @possible-cms/sdk — runtime + build-time client + <Render />
  schema-kit/   @possible-cms/schema-kit — Zod helpers for slug, locale, r2Image, mdxBody, reference
  blocks/       @possible-cms/blocks — 10 starter block registry
  cli/          @possible-cms/cli — init, export, import, doctor
  workers-shared/  Tenant scoping, audit log, KV key builders
examples/
  aiia/         Reference: AIIA marketing schemas + seed importer
  barbuda/      Reference: Barbuda Leisure schemas + seed importer
migrations/     D1 forward-only migrations
docs/           ADRs, runbook, security, block catalog
```

## Documentation

- [PRD](docs/PRD.md) — product requirements (11 sections, 64 FRs, 49 NFRs)
- [ARCHITECTURE](docs/ARCHITECTURE.md) — ADRs 1-5, schema contract, project structure
- [Plan](docs/PLAN.md) — phased development plan, execution model
- [RUNBOOK](docs/RUNBOOK.md) — backup/restore, incident procedures
- [SECURITY](docs/SECURITY.md) — threat model and mitigations
- [CONTRIBUTING](CONTRIBUTING.md) — how to contribute

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). TL;DR: open an issue, branch off `main`, PR with tests, pass CI.

## License

MIT © Kanousei. See [LICENSE](LICENSE).
