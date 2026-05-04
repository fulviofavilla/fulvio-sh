import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fulvio.sh',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'gruvbox-light-hard',
        dark: 'gruvbox-dark-hard',
      },
      defaultColor: false,
    },
  },
});