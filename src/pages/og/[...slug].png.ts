import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const dmSerif = readFileSync(
  resolve('./src/assets/fonts/DMSerifDisplay-Regular.ttf')
);
const jetbrainsMono = readFileSync(
  resolve('./src/assets/fonts/JetBrainsMono-Regular.ttf')
);

async function renderOG(title: string): Promise<ArrayBuffer> {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          background: '#141414',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontFamily: 'DM Serif Display',
                fontWeight: 400,
                fontSize: '64px',
                color: '#E8E8E6',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                maxWidth: '960px',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontFamily: 'JetBrains Mono',
                fontWeight: 400,
                fontSize: '28px',
                color: '#5A5A58',
                letterSpacing: '0.03em',
              },
              children: 'fulvio.sh',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'DM Serif Display', data: dmSerif, weight: 400, style: 'normal' },
        { name: 'JetBrains Mono', data: jetbrainsMono, weight: 400, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return resvg.render().asPng().buffer as ArrayBuffer;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blog = await getCollection('blog', ({ data }) => !data.draft);
  const writeups = await getCollection('writeups', ({ data }) => !data.draft);

  return [
    { params: { slug: 'default' }, props: { title: 'Fulvio Favilla' } },
    ...blog.map((post) => ({
      params: { slug: `blog/${post.id}` },
      props: { title: post.data.title },
    })),
    ...writeups.map((post) => ({
      params: { slug: `writeups/${post.id}` },
      props: { title: post.data.title },
    })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const { title } = props as { title: string };
  const png = await renderOG(title);

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};