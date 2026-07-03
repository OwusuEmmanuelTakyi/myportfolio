Portfolio site for Owusu Emmanuel Takyi — built with Next.js 16, Tailwind CSS v4, Framer Motion, and the Anthropic API.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Copy `.env.local` (not committed) and set:

| Variable | Required | Purpose |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Yes | Powers the `/api/chat` AI assistant (streaming Claude responses) |
| `RESEND_API_KEY` | No | Only needed if the contact form is wired to Resend instead of `mailto:` |
| `NEXT_PUBLIC_SITE_URL` | No | Used for absolute URLs/metadata; defaults to `http://localhost:3000` |

## Deploying on Vercel

This project deploys to Vercel with zero config beyond environment variables:

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. Add `ANTHROPIC_API_KEY` (and `RESEND_API_KEY` if used) under **Project Settings → Environment Variables**.
3. Deploy — `vercel.json` sets a longer `maxDuration` on `/api/chat` so streaming AI responses aren't cut off.

## Project Structure

- `app/` — Next.js App Router pages and API routes
- `components/` — UI components grouped by domain (home, projects, games, chat, layout, ui)
- `lib/` — data files (projects, blog, CV, chat system prompt) — edit these to update site content
- `content/blog/` — MDX blog posts
- `public/images/`, `public/cv/` — static assets; see the `README.md` in each folder for what to add
