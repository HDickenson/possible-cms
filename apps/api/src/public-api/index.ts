// public-api Worker entry. ADR-003.
// REST, KV-cached, read-only to D1. Implementation: Epic 8.

export default {
  async fetch(_request: Request, _env: unknown, _ctx: ExecutionContext): Promise<Response> {
    return new Response('public-api not yet implemented — see Epic 8.', { status: 501 })
  },
}
