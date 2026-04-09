import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/success', '/api/'], // hide checkout success page & internal apis
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://philocracy.com'}/sitemap.xml`,
  };
}
