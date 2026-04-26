# fulvio.sh

Personal site. Built with Astro 6, MDX, and TypeScript.

## Stack

- **Framework**: Astro 6
- **Content**: MDX (blog + writeups)
- **Styling**: Vanilla CSS with custom design system
- **Fonts**: DM Serif Display, Inter, JetBrains Mono — self-hosted
- **Deploy**: Cloudflare Pages

## Structure

```
src/
├── components/       # Header, Footer
├── content/
│   ├── blog/         # Blog posts (.mdx)
│   └── writeups/     # CTF & security writeups (.mdx)
├── layouts/          # Base, Post
├── pages/            # index, about, projects, writing, blog/[slug], writeups/[slug]
└── styles/           # global.css
```

## Development

```bash
npm install
npm run dev
```

## Content

Blog posts and writeups live in `src/content/`. Both use MDX with frontmatter:

```yaml
# blog
title: ""
description: ""
date: YYYY-MM-DD
tags: []
draft: true

# writeups
title: ""
description: ""
date: YYYY-MM-DD
tags: []
platform: ""
difficulty: ""
draft: true
```

Set `draft: false` to publish.

## Deploy

Connected to Cloudflare Pages. Pushes to `main` deploy automatically.