# Unuseless Dashboard - Project Overview

## Purpose
A fun "useless dashboard" that displays trivially interesting real-time data (blink count, breath count, toilet usage, rice grains eaten, earth rotation speed, sea level, ISS position).

## Tech Stack
- **Framework**: HonoX (Hono + Vite SSR)
- **UI**: React 19 + Tailwind CSS 4
- **Animation**: GSAP 3 (ScrollTrigger now free)
- **Icons**: lucide-react
- **Fonts**: Inter, Noto Sans JP, JetBrains Mono
- **Deploy**: Cloudflare Pages (via wrangler) - https://unuseless-dashboard.pages.dev/
- **Package Manager**: pnpm

## Key Commands
- `pnpm dev` - Start dev server
- `pnpm build` - Build for production (client + SSR)
- `pnpm preview` - Preview with wrangler

## Structure
```
app/
  client.ts          - Client entry
  server.ts          - Server entry
  style.css          - Global CSS (Tailwind + custom)
  components/Card.tsx - Reusable card component (accent colors)
  islands/           - Interactive island components (Dashboard, BlinkCounter, etc.)
  routes/            - HonoX routes (index, _renderer, api/)
```

## Style Conventions
- Dark theme, minimal UI with white/opacity text
- Card component uses accent color system (blue, emerald, amber, rose, cyan, violet, sky)
- Numbers: font-mono, text-white/90
- Descriptions: text-[11px], text-white/20
- GSAP for entrance animations with ScrollTrigger
