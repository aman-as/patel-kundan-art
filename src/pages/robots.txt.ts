import type { APIRoute } from 'astro';

// Built from astro.config, so the sitemap line follows the site when the
// domain changes.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`);
