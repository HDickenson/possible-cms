# Security

Threat model and mitigations for Possible CMS.

## Reporting vulnerabilities

Email harold@kanousei.com. Do not file public issues for security problems.

## Trust boundaries

1. **Unauthenticated reader** → `public-api` Worker (read-only). No D1 writes possible.
2. **Authenticated editor** → `admin-api` Worker via GitHub OAuth session JWT. Writes scoped to their workspace (Phase A: single workspace → full access; Phase B: role-gated).
3. **Authenticated agent** → `admin-api` Worker via API token. Writes scoped to token's site/project + capability set (`read:content`, `write:content`, `write:schema`, `publish`, `delete`).
4. **Cloudflare Worker runtime** → D1, R2, KV via bindings. Credentials live in Cloudflare Secrets; never in source.

## Mitigations

| Threat                           | Mitigation                                                                              | Reference      |
| -------------------------------- | --------------------------------------------------------------------------------------- | -------------- |
| SQL injection                    | Drizzle parameterised queries only; no string-concatenated SQL                          | ADR-002, NFR13 |
| XSS via MDX                      | `rehype-sanitize` with tag/attr whitelist; React default escape                         | NFR14          |
| Tenant leakage                   | `siteScoped()` middleware; queries without `site_id` fail at the ORM layer              | ADR-002, NFR12 |
| Credential theft                 | Cloudflare Secrets only; no secrets in `.dev.vars` committed to repo                    | ADR-005, NFR11 |
| Agent token abuse                | Scoped tokens (fine-grained capability); hashed at rest; revocable within 60 s globally | ADR-003, NFR9  |
| Replay attacks on preview tokens | 5-minute HMAC-signed TTL; one-time where feasible                                       | ADR-003, FR46  |
| Dependency supply chain          | pnpm lockfile; exact version pinning; weekly Renovate; Dependabot; Semgrep              | NFR15, NFR17   |
| Broken access control            | Type-enforced via `protectedProcedure` / `agentProcedure` discriminated actor union     | ADR-003        |

## Audit

Every mutation logged to `audit_log` with actor identity split (`user_id` vs `agent_id`). Retention ≥ 90 days. See [RUNBOOK.md](RUNBOOK.md) for audit query examples.

## Compliance

No regulated compliance load at v0.1 (OSS self-host; consumer owns their data). If a Phase D managed variant ships, SOC2 / ISO 27001 scope applies only to that variant.
