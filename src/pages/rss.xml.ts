import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { getPosts, postUrl } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${site.name} — Writing`,
    description: 'AI experiments, from-scratch builds and notes from shipping AI products.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.tldr,
      pubDate: p.data.date,
      link: postUrl(p),
      categories: p.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
