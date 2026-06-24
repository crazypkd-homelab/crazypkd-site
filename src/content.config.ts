import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    href: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    status: z.enum(['live', 'building', 'planned', 'local', 'evolving']).default('live'),
    icon: z.string().optional(),
    order: z.number().default(100),
  }),
});

export const collections = { blog, projects };
