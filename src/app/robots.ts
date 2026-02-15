// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Allowing all bot (Google, Bing, Yahoo...)
      allow: '/',     // allowing all pages are able to be scanned.
    },
    sitemap: 'https://asahiminh.vercel.app/sitemap.xml', // Point to the just created file sitemap
  };
}