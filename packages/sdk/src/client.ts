// Runtime client — thin fetch wrapper over public REST API.
// Implementation: Epic 8. This stub documents the contract.

export interface ClientConfig {
  endpoint: string;
  site: string;
  token?: string; // API token for agent-authenticated writes via admin-api
}

export interface Client {
  getPage(slug: string, locale?: string): Promise<unknown | null>;
  getRecord(
    collection: string,
    slug: string,
    locale?: string,
  ): Promise<unknown | null>;
  listRecords(
    collection: string,
    opts?: {
      limit?: number;
      offset?: number;
      filter?: Record<string, unknown>;
    },
  ): Promise<unknown[]>;
  // Agent-only (requires token):
  pages?: { create: (input: unknown) => Promise<unknown> };
  records?: {
    create: (
      collection: string,
      data: unknown,
      opts?: { idempotencyKey?: string },
    ) => Promise<unknown>;
  };
}

export function createClient(_config: ClientConfig): Client {
  throw new Error("Not yet implemented — Epic 8.");
}
