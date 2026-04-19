// ADR-003/ADR-005 — Cloudflare Worker environment bindings.
// Shared across admin-api, public-api, and preview Workers.

export interface Env {
  DB: D1Database;
  MEDIA: R2Bucket;
  CMS_KV: KVNamespace;

  // Secrets (set via `wrangler secret put`)
  JWT_SECRET?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
}
