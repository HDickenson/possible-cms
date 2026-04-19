// Audit log writer. FR61 / NFR45. Implementation: Epic 1 / Epic 11.

export interface AuditEntry {
  actorType: "user" | "agent";
  actorId: number;
  action: string;
  targetType: string;
  targetId: string;
  workspaceId?: number;
  projectId?: number;
  siteId?: number;
  diff?: { before?: unknown; after?: unknown };
  traceId?: string;
}

export async function writeAudit(_entry: AuditEntry): Promise<void> {
  throw new Error("Not yet implemented — Epic 1 / Epic 11.");
}
