// admin-api Worker entry. ADR-003.
// Serves tRPC endpoints to the admin UI and agent SDK.
// Implementation: Epic 1 (scaffold) + Epic 2 (auth) + subsequent epics.

import type { Env } from "../shared/env";
import { createDb } from "../shared/db";

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // Health check — Story 1.3
    if (url.pathname === "/health") {
      const db = createDb(env.DB);
      try {
        const result = await db.query.workspace.findFirst();
        return Response.json({
          status: "ok",
          worker: "admin-api",
          db: result ? "connected" : "empty",
        });
      } catch {
        return Response.json(
          { status: "error", worker: "admin-api", db: "unreachable" },
          { status: 503 },
        );
      }
    }

    // tRPC router — Epic 2+
    return new Response("admin-api: tRPC router not yet wired — see Epic 2.", {
      status: 501,
    });
  },
};
