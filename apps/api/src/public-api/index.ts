// public-api Worker entry. ADR-003.
// REST, KV-cached, read-only to D1. Implementation: Epic 8.

import type { Env } from "../shared/env";

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // Health check — Story 1.3
    if (url.pathname === "/health") {
      return Response.json({
        status: "ok",
        worker: "public-api",
        kv: env.CMS_KV ? "bound" : "missing",
      });
    }

    // REST routes — Epic 8
    return new Response(
      "public-api: REST routes not yet wired — see Epic 8.",
      { status: 501 },
    );
  },
};
