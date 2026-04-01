import type { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { SITEMAP_QUERY } from '@/sanity/lib/queries'
import { CATEGORIAS } from '@/lib/categorias'

const BASE_URL = 'https://gotasdeamor.com.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...CATEGORIAS.map((cat) => ({
      url: `${BASE_URL}/${cat.value}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]

  // Mensagens dinâmicas
  try {
    const mensagens = await client.fetch(SITEMAP_QUERY)
    const dynamicRoutes: MetadataRoute.Sitemap = (mensagens ?? []).map(
      (m: { slug: string; categoria: string; _updatedAt: string }) => ({
        url: `${BASE_URL}/${m.categoria}/${m.slug}`,
        lastModified: new Date(m._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })
    )
    return [...staticRoutes, ...dynamicRoutes]
  } catch {
    return staticRoutes
  }
}
