// Hero block — stub. Epic 4 implementation.
// Props schema, default props, render, and Puck fields all go here.

import { block } from '@possible-cms/schema-kit'
import { z } from 'zod'

export const Hero = block({
  type: 'Hero',
  propsSchema: z.object({}),
  defaultProps: {},
  render: () => null,
  fields: {},
  category: 'content',
})
