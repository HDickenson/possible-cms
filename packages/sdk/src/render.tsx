// <Render /> — isomorphic block renderer shared between admin preview and consumer sites.
// ADR-001 single source of truth. Implementation: Epic 4.

import type { ReactNode } from "react";

export interface RenderProps {
  blocks: unknown; // Puck Data shape: { root, content: Block[] }
}

export function Render(_props: RenderProps): ReactNode {
  throw new Error("Not yet implemented — Epic 4.");
}
