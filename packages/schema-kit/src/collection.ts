// ADR-002 / FR30 — Collection factory. Defines a typed content record type.
// Implementation: Epic 5.

import type { ZodSchema } from 'zod'

export interface CollectionConfig<TData = Record<string, unknown>> {
  name: string // PascalCase — e.g. 'BlogPost', 'PricingTier'
  schema: ZodSchema<TData>
  displayField: keyof TData // which field to show in list views
}

export function collection<TData>(config: CollectionConfig<TData>): CollectionConfig<TData> {
  return config
}
