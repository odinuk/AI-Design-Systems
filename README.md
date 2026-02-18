# The Future of Design Systems — Interactive Demo

An interactive demo exploring semantic token-driven design systems with bidirectional flow between tokens, canvas, and production.

## What this shows

- **Semantic tokens** as the single source of truth (`color.action.primary` not `#7c3aed`)
- **Bidirectional flow** — edit tokens and watch changes propagate; noodle on the canvas and watch them sync back
- **Component variants** that reference base tokens through a resolution chain
- **The four-step loop**: Prompt → Noodle → Sync → Ship

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npx vercel
```

Or connect the repo in the [Vercel dashboard](https://vercel.com/new) — it auto-detects Vite.

## Stack

Vite + React. No other dependencies. Fonts from Google Fonts.
