import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Online editors (Pages CMS, see .pages.yml) may save cleared fields as "" or null.
// Treat those as "not set" so an online save can't break the build.
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tldr: z.string(),
    date: z.coerce.date(),
    updated: z.preprocess(blank, z.coerce.date().optional()),
    series: z.preprocess(blank, z.string().optional()),
    tags: z.preprocess(blank, z.array(z.string()).default([])),
    linkedin: z.preprocess(blank, z.string().url().optional()),
    // Pre-selects a topic on the conversation form when a reader clicks the article CTA.
    ask: z.preprocess(blank, z.string().default('Want the code or the tool behind this?')),
    featured: z.preprocess(blank, z.boolean().default(false)),
    models: z.preprocess(blank, z.array(z.enum(['claude', 'gpt', 'deepseek', 'google'])).default([])),
    result: z.string(),
    figure: z.preprocess(blank, z.enum(['arena']).optional()),
  }),
});

export const collections = { writing };
