import { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { tools } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/api-tool`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${base}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...toolPages]
}
