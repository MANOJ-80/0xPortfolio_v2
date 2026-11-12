# manojganesan.dev

Personal portfolio for **Manoj Ganesan (0xEcho)** — software engineer working on backend systems, security tooling and AI agent infrastructure.

Built with Next.js (App Router), TypeScript and Tailwind CSS v4. Dark-first, with a light theme.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
```

Node 20+ is recommended.

## Structure

```
src/
  app/
    page.tsx                 home — hero, selected work, experience, toolkit, contact
    work/page.tsx            full project index + archive
    work/[slug]/page.tsx     project case studies (static params from data)
    about/page.tsx           long-form about, experience, stack, OSS
    opengraph-image.tsx      1200×630 social card
    sitemap.ts, robots.ts
  components/                layout chrome, cards, heatmap, small client widgets
  data/
    site.ts                  name, links, email, bio, education, certifications
    projects.ts              featured projects, archive, stack groups
    experience.ts            work history
  lib/
    contributions.ts         GitHub contribution graph (cached, 1 day)
public/
  profile.webp               avatar
  resume.pdf                 linked from the header and hero
  banner.mp4                 hero banner loop (16s palindrome)
  banner-poster.webp         first-paint / reduced-motion frame
  work/*.webp                project preview images
```

The hero banner footage is "Starry Night Sky Over Pine Forest" from
[Coverr](https://coverr.co) — free to use, no attribution required. The source
clip is a slow 8s pan; it is mirrored into a 16s palindrome so the loop is
seamless, then scaled to 1440px at 20fps. To swap it, drop a new file at
`public/banner.mp4` with a matching poster at `public/banner-poster.webp`.

## Editing content

Almost everything lives in `src/data/`:

- **`site.ts`** — identity, email, social URLs, availability line, about copy.
- **`projects.ts`** — add a project by appending to `projects`. `slug` becomes the URL, `featured: true` puts it on the home page, `cover` points at an image in `public/work/`. The detail page is generated automatically from `overview`, `problems` and `highlights`.
- **`experience.ts`** — roles rendered in the expandable list.

The contribution heatmap is fetched from a public GitHub contributions proxy and cached for a day (`"use cache"` + `cacheLife("days")`). If the request fails, the section degrades to a link instead of breaking the page.

## Deploy

The project is ready for Vercel:

```bash
npx vercel
```

Set the production domain to `manojganesan.dev`. `site.url` in `src/data/site.ts` and the canonical/OG metadata derive from it — change it in one place if the domain moves.

## Notes

- `context/Manoj-Updated-Resume.pdf` is the source resume; the public copy is `public/resume.pdf`.
- Content is drawn from the resume and the GitHub profile (`MANOJ-80`). Re-check the dates and claims before publishing.
