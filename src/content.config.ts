import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The portfolio is a content collection, not hand-written HTML.
 *
 * To add a piece:
 *   1. drop the photograph in  src/assets/img/work/
 *   2. add a .md file in       src/content/products/
 * Nothing else needs editing. The grid, the ordering, the responsive sizes and
 * the WebP conversion all follow automatically.
 *
 * Rule: describe only what is visible in the photograph. Never state weight,
 * purity, stone type or price — see claude/patel-kundan-art-fact-base.md.
 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(['Necklace Sets', 'Chokers', 'Bangles', 'Earrings', 'Custom Work']),
      image: image(),
      alt: z.string(),
      /** One short line. Form and craft only — no materials, no measurements. */
      note: z.string(),
      /** Lower numbers appear first. */
      order: z.number().default(50),
      /** Show the "Customisation available" line on this piece. */
      customisable: z.boolean().default(true),
      /** Feature on the home page. */
      featured: z.boolean().default(false),
    }),
});

export const collections = { products };
