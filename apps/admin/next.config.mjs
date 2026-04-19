// Next.js 15 + Cloudflare Pages via @cloudflare/next-on-pages.
// ADR-005. Implementation: Epic 1 + Epic 3.

import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Reserved for future-needs; kept minimal to avoid Cloudflare Pages incompat.
  },
}

export default nextConfig
