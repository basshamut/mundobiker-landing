import type { APIRoute } from 'astro';
import { isSiteResolved, siteUrl } from '../data/site';

export const GET: APIRoute = () => {
  const lines = ['User-agent: *', 'Allow: /'];

  if (isSiteResolved) {
    lines.push('', `Sitemap: ${siteUrl}/sitemap-index.xml`);
  }

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
