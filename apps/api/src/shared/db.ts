// ADR-002 — Drizzle + D1 database helper with tenant-scoping middleware.
// "Every D1 read/write is tenant-scoped by construction."

import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

export type Database = DrizzleD1Database<typeof schema>;

export function createDb(d1: D1Database): Database {
  return drizzle(d1, { schema });
}

/**
 * Tenant-scoping context. Pass to query helpers to ensure
 * every site-scoped operation includes the correct site_id.
 */
export interface SiteScope {
  readonly siteId: number;
  readonly projectId: number;
  readonly workspaceId: number;
}

/**
 * Creates a scoped query context. All site-scoped queries must
 * flow through this to enforce tenant isolation at the call site.
 */
export function siteScoped(
  siteId: number,
  projectId: number,
  workspaceId: number,
): SiteScope {
  return Object.freeze({ siteId, projectId, workspaceId });
}
