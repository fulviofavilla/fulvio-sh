import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog', ({ data }) => !data.draft);
  const writeups = await getCollection('writeups', ({ data }) => !data.draft);

  const items = [...blog, ...writeups]
    .sort((a, b) => b.data.date - a.data.date)
    .map((entry) => {
      const isBlog = entry.collection === 'blog';
      return {
        title: entry.data.title,
        description: entry.data.description,
        pubDate: entry.data.date,
        link: isBlog ? `/blog/${entry.id}/` : `/writeups/${entry.id}/`,
      };
    });

  return rss({
    title: 'Fulvio Favilla',
    description: 'Blog posts and security writeups.',
    site: context.site,
    items,
  });
}