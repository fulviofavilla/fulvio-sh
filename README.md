# fulvio.sh

Personal site built with Astro 6, MDX, and TypeScript. Deployed on Cloudflare Pages.

## Stack

- **Framework**: Astro 6 + MDX
- **Fonts**: DM Serif Display, Inter, JetBrains Mono (self-hosted)
- **Deploy**: Cloudflare Pages (static)
- **Analytics**: Umami

## Structure

```
src/
├── components/       # Header, Footer, ProjectCard, WritingList
├── content/
│   ├── blog/         # Blog posts (.mdx)
│   └── writeups/     # CTF & security writeups (.mdx)
├── layouts/          # Base, Post
└── pages/            # index, projects, writing, blog/[slug], writeups/[slug]
```

## Development

```bash
npm install
npm run dev
```

## Content

Posts and writeups live in `src/content/`. Both use MDX with frontmatter:

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
draft: true
```

Set `draft: false` to publish.

## CI

GitHub Actions runs `npm audit --audit-level=high` and `astro check` on every push and PR to `main`.