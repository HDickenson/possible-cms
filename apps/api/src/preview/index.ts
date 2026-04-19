// preview Worker entry. ADR-003. FR46.
// Signed short-lived token → draft render bypass. Implementation: Epic 4.

export default {
  async fetch(_request: Request, _env: unknown, _ctx: ExecutionContext): Promise<Response> {
    return new Response('preview not yet implemented — see Epic 4.', { status: 501 })
  },
}
