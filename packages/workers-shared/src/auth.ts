// Auth helpers — JWT verification (user sessions) and API token verification (agents).
// ADR-003. Implementation: Epic 2.

export type Actor =
  | { type: 'user'; userId: number; workspaceId: number }
  | { type: 'agent'; tokenId: number; siteId?: number; projectId?: number; scopes: string[] }

export async function verifyUserSession(_jwt: string): Promise<Actor> {
  throw new Error('Not yet implemented — Epic 2.')
}

export async function verifyAgentToken(_token: string): Promise<Actor> {
  throw new Error('Not yet implemented — Epic 2.')
}
