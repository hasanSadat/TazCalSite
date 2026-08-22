import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tazcal.com';
  const routes = [
    '', '/features', '/ai', '/pricing', '/download', '/blog',
    '/blog/admin', '/support', '/about', '/login', '/privacy', '/terms',
    '/changelog', '/feature-requests', '/roadmap',
  ];

  const blogSlugs = [
    'best-weight-loss-approaches', 'understanding-tdee', 'what-is-met',
    'how-much-protein-per-day', 'building-better-habits', 'planning-your-day',
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
