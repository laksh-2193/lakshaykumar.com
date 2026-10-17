import type { APIRoute } from 'astro';
import { card } from '../../data/card';
import { site } from '../../data/site';

export const GET: APIRoute = () => {
  const [first, ...last] = card.name.split(' ');
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${last.join(' ')};${first};;;`,
    `FN:${card.name}`,
    `TITLE:${site.role}`,
    `TEL;TYPE=CELL:${card.phone}`,
    `EMAIL;TYPE=INTERNET:${card.email}`,
    `URL:${site.url}/`,
    `X-SOCIALPROFILE;TYPE=linkedin:${site.linkedin}`,
    'END:VCARD',
  ].join('\r\n');
  return new Response(vcard, { headers: { 'Content-Type': 'text/vcard; charset=utf-8' } });
};
