// FR24 / NFR30 — renders a placeholder when a page references a block type
// that is no longer in the registry. Never crashes the page render.

export function UnknownBlockPlaceholder({ type }: { type: string }) {
  return null // Epic 4 implementation: visible placeholder in admin, hidden in production.
}
