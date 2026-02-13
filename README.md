# Unuseless Dashboard

知っても何の役にも立たないダッシュボード。
今日のまばたき回数、呼吸回数、爪の伸び、餃子消費量など、トリビアルなリアルタイムデータを表示する。

**Live**: https://unuseless.milkmaccya.com/

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [HonoX](https://github.com/honojs/honox) (Hono + Vite SSR) |
| UI | React 19 + Tailwind CSS 4 |

| Icons | lucide-react |
| Deploy | Cloudflare Pages |
| Package Manager | pnpm |

## Directory Structure

```
app/
  client.ts              # Client entry point
  server.ts              # Server entry point (Hono)
  style.css              # Global CSS (Tailwind + custom)
  components/            # Shared UI components (Navigation, Cards, Icons)
  islands/               # Interactive Island components (Counters, Visualizations)
  routes/
    index.tsx            # Top page
    _renderer.tsx        # HTML renderer
    api/                 # API endpoints
  utils/                 # Utility functions and data
.github/
  workflows/
    deploy.yml           # Production deploy (main push)
    preview.yml          # Preview deploy (PR)
wrangler.toml            # Cloudflare Pages config
```

## Setup

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview locally (via wrangler)
pnpm preview
```

## Deploy

### Manual Deploy

```bash
# Production
pnpm run deploy

# Preview
pnpm run deploy:preview
```

### CI/CD (GitHub Actions)

- **Production**: `main` ブランチへの push で自動デプロイ (`.github/workflows/deploy.yml`)
- **Preview**: PR 作成/更新時にプレビュー環境へデプロイ (`.github/workflows/preview.yml`)

#### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token (Edit Cloudflare Pages permission) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |
