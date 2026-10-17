import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tldr: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    series: z.string().optional(),
    tags: z.array(z.string()).default([]),
    linkedin: z.string().url().optional(),
    // Pre-selects a topic on the conversation form when a reader clicks the article CTA.
    ask: z.string().default('Want the code or the tool behind this?'),
    featured: z.boolean().default(false),
    models: z.array(z.enum(['claude', 'gpt', 'deepseek', 'google'])).default([]),
    result: z.string(),
    figure: z.enum(['arena']).optional(),
  }),
});

export const collections = { writing };
