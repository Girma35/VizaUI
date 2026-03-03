/**
 * Canonical base URL for the site. Set NEXT_PUBLIC_SITE_URL in production
 * (e.g. https://vizalabs.com) for correct sitemap, OG, and canonical URLs.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://vizalabs.com'

export const siteName = 'VizaLabs'
export const siteDescription =
  'Free software tools store. Browse and download productivity, development, design, and utility tools. No sign-up required.'
