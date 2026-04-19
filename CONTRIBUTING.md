# Contributing to Possible CMS

Thanks for considering a contribution. This project is MIT-licensed and welcomes community input.

## Ways to contribute

- Report a bug via [issues](https://github.com/kanousei/possible-cms/issues).
- Propose a feature via a GitHub Discussion first, before opening an issue.
- Fix a bug or implement a feature: fork, branch, PR.
- Add a reference example project under `examples/<your-project>/`.
- Improve docs.

## Development setup

```bash
git clone git@github.com:kanousei/possible-cms.git
cd possible-cms
pnpm install
cp .dev.vars.example .dev.vars   # fill values
pnpm dev                          # runs all Workers + admin in parallel
```

## Ground rules

- **MIT licence.** All contributions are licensed MIT.
- **Code of conduct.** See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
- **PRD + ADRs are binding.** See `docs/PRD.md` (the capability contract) and `docs/ARCHITECTURE.md` (the ADRs). Feature proposals outside the scoped capabilities need a PRD amendment first.
- **CI must pass.** Lint, typecheck, tests, grep-gate, axe-core accessibility checks. No skipping.
- **No project-specific literals in `apps/` or `packages/`.** The grep-gate rejects `aiia`, `barbuda`, `kanousei`, `sunstone`. Project-specific code belongs in `examples/<project>/`.
- **Semver strict.** Breaking changes to public APIs, block prop schemas, or CLI flags require a major version bump with a `MIGRATION-NOTES.md` entry.
- **Tenant scoping always.** Every D1 read/write goes through `siteScoped()` — bypassing it is a merge block.

## PR checklist

- [ ] Tests added or updated
- [ ] `pnpm lint && pnpm typecheck && pnpm test` pass locally
- [ ] Accessibility: if UI changes, `@axe-core/playwright` still green
- [ ] CHANGELOG entry added under `## Unreleased`
- [ ] If schema changed: migration file in `migrations/` + `MIGRATION-NOTES.md` entry
- [ ] If block added/changed: `docs/block-catalog.md` updated

## Design principles

1. **Post-handover first.** Optimise for the marketer inheriting a finished site, not the developer building it.
2. **Compose-don't-author.** Editors compose existing blocks; they never see a block-authoring UI.
3. **Cloudflare primitives are the platform.** Don't abstract them behind "storage adapters" at this stage.
4. **One source of truth per concept.** Block render component is shared between admin preview and public render. Zod schema generates forms, validates API inputs, types database rows.
5. **Agents are peer users.** Any capability a human editor has, an agent with the right scope has too. One API for both.

## Releases

Semver. `main` is always releasable. Tag `v*` for production releases; CI handles the deploy.
