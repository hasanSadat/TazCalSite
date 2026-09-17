import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/profile/', '/login', '/api/'],
      },
    ],
    sitemap: 'https://tazcal.com/sitemap.xml',
  };
}
