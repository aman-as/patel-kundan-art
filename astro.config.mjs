// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/* -----------------------------------------------------------------------------
   WHERE THE SITE LIVES — the only two lines to change when the domain changes.

   Now, on Cloudflare Pages:  SITE = 'https://patelkundanart.pages.dev'
                              BASE = '/'

   Later, on a domain of its own:
                              SITE = 'https://<the new domain>'
                              BASE = '/'

   The old GitHub Pages address (aman-as.github.io/patel-kundan-art/) still
   serves this same docs/ folder; BaseLayout forwards its visitors here.

   Every internal link is built through url() in src/data/site.ts, so changing
   these two lines moves the whole site. Nothing else needs editing.
----------------------------------------------------------------------------- */
const SITE = 'https://patelkundanart.pages.dev';
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,

  // Fully static output — nothing to run on a server, deploys anywhere.
  output: 'static',

  integrations: [sitemap({ filter: (page) => !page.includes('/our-work/') })],

  // Build straight into docs/ and commit it. Cloudflare Pages (and GitHub
  // Pages) serve this folder directly with no build step, which means the
  // repository can be updated from a browser alone.
  outDir: './docs',

  build: {
    // Emit /our-work/index.html rather than /our-work.html so URLs stay clean
    // without server-side rewrite rules.
    format: 'directory',
    inlineStylesheets: 'auto',
    // GitHub Pages runs Jekyll, which silently deletes any folder starting
    // with an underscore — including Astro's default _astro/. Renaming it
    // avoids depending on a .nojekyll dotfile surviving a browser upload.
    assets: 'assets',
  },

  image: {
    // Sharp generates responsive AVIF/WebP at build time. This is the single
    // biggest performance lever on an image-heavy site — do not remove.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

  compressHTML: true,

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
