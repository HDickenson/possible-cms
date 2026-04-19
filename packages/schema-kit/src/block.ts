// ADR-001 — Block factory. Produces a BlockConfig consumed by:
//   1. Admin canvas (via Puck fields + render)
//   2. Public renderer (via <Render /> dispatching on block.type)
//   3. Agent introspection (via zod-to-json-schema serialisation)
//
// Implementation: Epic 4.

import type { z, ZodSchema } from "zod";
import type { ComponentType, ReactNode } from "react";

export interface BlockConfig<TProps = Record<string, unknown>> {
  type: string;
  propsSchema: ZodSchema<TProps>;
  defaultProps: TProps;
  render: ComponentType<TProps>;
  fields: unknown; // Puck Fields<TProps> — typed once Puck is wired up
  icon?: ComponentType;
  category?: "layout" | "content" | "media" | "marketing";
}

export function block<TProps>(
  config: BlockConfig<TProps>,
): BlockConfig<TProps> {
  return config;
}
