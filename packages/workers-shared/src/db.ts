// ADR-002 — tenant-scoping middleware for Drizzle + D1.
// Every site-scoped table must be queried through siteScoped(siteId).
// Implementation: Epic 1.

export interface ScopedQuery {
  siteId: number
  projectId?: number
  workspaceId?: number
}

export function siteScoped(_siteId: number) {
  throw new Error('Not yet implemented — Epic 1.')
}
