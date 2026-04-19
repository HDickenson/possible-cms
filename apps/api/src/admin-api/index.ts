// admin-api Worker entry. ADR-003.
// Serves tRPC endpoints to the admin UI and agent SDK.
// Implementation: Epic 1 (scaffold) + Epic 2 (auth) + subsequent epics.

export default {
  async fetch(_request: Request, _env: unknown, _ctx: ExecutionContext): Promise<Response> {
    return new Response('admin-api not yet implemented — see Epic 1.', { status: 501 })
  },
}
