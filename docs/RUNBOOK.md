# Runbook

Operational procedures for Possible CMS. Keep this short and actionable — not a design doc.

## Incidents

### Public site shows stale content after publish

1. Check audit log: did the publish action complete?
2. Check KV: `wrangler kv key get "page:{site_id}:{slug}:en" --binding CMS_KV` — is the cached version stale?
3. If KV is stale: admin-api publish retries invalidation for 5 min (NFR29). Manually invalidate: `wrangler kv key delete "page:..." --binding CMS_KV`.
4. Verify public-api re-populates cache on next read.

### D1 write failure

1. Check Worker logs for the 500.
2. If D1 is overloaded: check Cloudflare dashboard for D1 budget consumption.
3. If migration-related: roll the last migration back via manual SQL (forward-only, so craft an inverse by hand) and redeploy.

## Backup & restore

### Scheduled backup

Runs nightly at 02:00 UTC via cron Worker. Uploads `possible-cms-prod-YYYY-MM-DD.sql.gz` to `possible-cms-prod-backups` R2 bucket. Retention: 30 days.

### Manual backup

```bash
wrangler d1 export possible-cms-prod --output backup-$(date +%F).sql
gzip backup-*.sql
# Upload to R2 if needed
```

### Restore

1. Identify the backup to restore: `wrangler r2 object list possible-cms-prod-backups`.
2. Download: `wrangler r2 object get possible-cms-prod-backups/possible-cms-prod-YYYY-MM-DD.sql.gz --file restore.sql.gz && gunzip restore.sql.gz`.
3. Apply to a **new** D1 database first (not prod):
   ```bash
   wrangler d1 create possible-cms-restore-test
   wrangler d1 execute possible-cms-restore-test --file restore.sql
   ```
4. Verify integrity by running the Playwright E2E canary against it.
5. If verified, coordinate with deployers: fail over admin-api + public-api to the restore DB via wrangler bindings, monitor, then rename.

RPO ≤ 24 hours (NFR27). RTO ≤ 4 hours (NFR28). Test this procedure quarterly.

## Common operator commands

```bash
pnpm install                             # install monorepo deps
pnpm dev                                 # run all apps in parallel
wrangler d1 migrations apply possible-cms --remote
wrangler deploy                          # deploy all Workers
wrangler tail possible-cms-admin-api     # stream logs
pnpm possible-cms init <project>         # scaffold a new example
pnpm possible-cms export --site <slug>   # export for static builds
```

## Escalation

File issues at https://github.com/kanousei/possible-cms/issues. Security issues: harold@kanousei.com (do not file publicly).
