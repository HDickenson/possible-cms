// preview Worker entry. ADR-003. FR46.
// Signed short-lived token → draft render bypass. Implementation: Epic 4.

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
        worker: "preview",
        r2: env.MEDIA ? "bound" : "missing",
      });
    }

    // Preview routes — Epic 4
    return new Response("preview: signed preview not yet wired — see Epic 4.", {
      status: 501,
    });
  },
};
