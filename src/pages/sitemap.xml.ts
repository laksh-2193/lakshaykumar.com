import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { getPosts, postUrl } from '../lib/posts';

// One sitemap at the long-standing /sitemap.xml URL, with real lastmod dates.
// noindex pages (/thanks/, /network/, /404) are intentionally left out.
const day = (d: Date | string) => new Date(d).toISOString().slice(0, 10);
const latest = (...ds: (Date | string)[]) => day(new Date(Math.max(...ds.map((d) => new Date(d).valueOf()))));

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const newestPost = posts[0].data.updated ?? posts[0].data.date;

  const entries = [
    { path: '/', lastmod: latest(site.updated, newestPost), changefreq: 'weekly', priority: '1.0' },
    { path: '/writing/', lastmod: latest(site.updated, newestPost), changefreq: 'weekly', priority: '0.9' },
    ...posts.map((p) => ({
      path: postUrl(p),
      lastmod: day(p.data.updated ?? p.data.date),
      changefreq: 'yearly',
      priority: '0.8',
    })),
    { path: '/workshops/', lastmod: day(site.updated), changefreq: 'monthly', priority: '0.8' },
    { path: '/about/', lastmod: day(site.updated), changefreq: 'monthly', priority: '0.7' },
    { path: '/talk/', lastmod: day(site.updated), changefreq: 'yearly', priority: '0.6' },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${site.url}${e.path}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
