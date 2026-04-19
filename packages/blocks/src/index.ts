// @possible-cms/blocks — starter block registry.
// Implementation: Epic 4. Ten stubs below map to the PRD §Product Scope MVP block set.

export { Hero } from './hero'
export { RichText } from './rich-text'
export { Image } from './image'
export { Pricing } from './pricing'
export { FAQ } from './faq'
export { CTA } from './cta'
export { Columns } from './columns'
export { Spacer } from './spacer'
export { Embed } from './embed'
export { Testimonials } from './testimonials'
export { UnknownBlockPlaceholder } from './unknown-placeholder'

// Registry used by <Render> and admin palette.
import { Hero } from './hero'
import { RichText } from './rich-text'
import { Image } from './image'
import { Pricing } from './pricing'
import { FAQ } from './faq'
import { CTA } from './cta'
import { Columns } from './columns'
import { Spacer } from './spacer'
import { Embed } from './embed'
import { Testimonials } from './testimonials'

export const registry = {
  Hero,
  RichText,
  Image,
  Pricing,
  FAQ,
  CTA,
  Columns,
  Spacer,
  Embed,
  Testimonials,
} as const

export type BlockType = keyof typeof registry
