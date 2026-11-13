import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isSiteResolved, siteUrl } from './src/data/site';

if (!isSiteResolved) {
  console.warn(
    '[mundo-biker] URL del sitio pendiente: define PUBLIC_SITE_URL o despliega en Vercel para usar VERCEL_PROJECT_PRODUCTION_URL. Se omite el sitemap y la URL canónica.',
  );
}

export default defineConfig({
  site: siteUrl,
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: isSiteResolved ? [sitemap()] : [],
});
