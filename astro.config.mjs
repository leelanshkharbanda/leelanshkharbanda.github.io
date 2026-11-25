import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const siteUrl = process.env.SITE_URL ?? 'https://leelanshkharbanda.github.io';

if (!URL.canParse(siteUrl) || new URL(siteUrl).protocol !== 'https:') {
  throw new Error('SITE_URL must be a valid HTTPS origin.');
}

export default defineConfig({
  site: new URL(siteUrl).origin,
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
