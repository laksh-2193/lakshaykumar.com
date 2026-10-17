import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getPosts } from '../../lib/posts';

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => fs.readFile(require.resolve(`@fontsource/${pkg}/files/${file}`));

type Card = { kicker: string; title: string; sub: string };

const pages: Record<string, Card> = {
  home: { kicker: 'Generative AI Engineer · Bangalore', title: 'Lakshay Kumar', sub: 'I build AI products, and test how language models behave.' },
  writing: { kicker: 'Writing', title: 'Thinking out loud.', sub: 'Experiments, rebuilds and build logs' },
  workshops: { kicker: 'Workshops', title: 'Learn by building.', sub: 'Six hands-on sessions on AI agents' },
  about: { kicker: 'About', title: 'Lakshay Kumar.', sub: 'I turn vague ideas into working AI products.' },
  talk: { kicker: 'Contact', title: "Let's talk.", sub: 'Building something with AI? No pitch.' },
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  return [
    ...Object.entries(pages).map(([slug, p]) => ({ params: { slug }, props: p })),
    ...posts.map((p) => ({
      params: { slug: p.id },
      props: { kicker: p.data.series ?? 'Writing', title: p.data.title, sub: p.data.result } satisfies Card,
    })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const { kicker, title, sub } = props as Card;
  const [display, sans, mono] = await Promise.all([
    font('archivo', 'archivo-latin-900-normal.woff'),
    font('space-grotesk', 'space-grotesk-latin-500-normal.woff'),
    font('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'),
  ]);

  const el = (type: string, style: Record<string, unknown>, children: unknown = '') => ({ type, props: { style, children } });
  const size = title.length > 52 ? 84 : title.length > 28 ? 104 : title.length > 16 ? 150 : 200;

  const tree = el(
    'div',
    { width: 1200, height: 630, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '56px 72px 52px', background: '#f7f6f3', color: '#0a0a0b' },
    [
      el('div', { display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'Mono', fontSize: 20, letterSpacing: 3, textTransform: 'uppercase', color: '#66666c' }, [
        el('div', { display: 'flex', width: 14, height: 14, borderRadius: 7, background: '#ff4a1c' }),
        kicker,
      ]),
      el('div', { display: 'flex', fontFamily: 'Archivo', fontSize: size, lineHeight: 0.9, letterSpacing: -size * 0.05, maxWidth: 1050 }, title),
      el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '2px solid #0a0a0b', paddingTop: 22, fontFamily: 'Grotesk', fontSize: 26 }, [
        el('div', { display: 'flex', color: '#2f2f33' }, sub),
        el('div', { display: 'flex', fontFamily: 'Mono', fontSize: 20, color: '#66666c' }, 'lakshaykumar.com'),
      ]),
    ],
  );

  const svg = await satori(tree as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Archivo', data: display, weight: 900, style: 'normal' },
      { name: 'Grotesk', data: sans, weight: 500, style: 'normal' },
      { name: 'Mono', data: mono, weight: 400, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
