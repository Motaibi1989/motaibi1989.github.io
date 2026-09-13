import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://motaibi1989.com',
  integrations: [sitemap()],
  security: {
    csp: true
  }
});
