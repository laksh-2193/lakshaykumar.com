import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'writing'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('writing');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function readingTime(post: Post): number {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function postUrl(post: Post): string {
  return `/writing/${post.id}/`;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Next in the same series (older → newer reading order), then wrap. */
export function nextInSeries(post: Post, all: Post[]): Post | undefined {
  if (!post.data.series) return undefined;
  const series = all
    .filter((p) => p.data.series === post.data.series)
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
  if (series.length < 2) return undefined;
  const i = series.findIndex((p) => p.id === post.id);
  return series[(i + 1) % series.length];
}

/** Rank other posts by shared tags, then recency. */
export function related(post: Post, all: Post[], exclude: string[] = [], n = 2): Post[] {
  const tags = new Set(post.data.tags);
  return all
    .filter((p) => p.id !== post.id && !exclude.includes(p.id))
    .map((p) => ({ p, score: p.data.tags.filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.score - a.score || b.p.data.date.valueOf() - a.p.data.date.valueOf())
    .slice(0, n)
    .map((x) => x.p);
}
