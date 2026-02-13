# Unuseless Dashboard

知っても何の役にも立たないダッシュボード。
今日のまばたき回数、呼吸回数、爪の伸び、餃子消費量など、トリビアルなリアルタイムデータを表示する。

**Live**: https://unuseless-dashboard.pages.dev/

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [HonoX](https://github.com/honojs/honox) (Hono + Vite SSR) |
| UI | React 19 + Tailwind CSS 4 |
| Animation | GSAP 3 (ScrollTrigger) |
| Icons | lucide-react |
| Deploy | Cloudflare Pages |
| Package Manager | pnpm |

## Directory Structure

```
app/
  client.ts              # Client entry point
  server.ts              # Server entry point (Hono)
  style.css              # Global CSS (Tailwind + custom)
  components/
    Card.tsx             # Reusable card (accent color system)
    Sidebar.tsx          # Sidebar navigation
    MobileHeader.tsx     # Mobile header
    Footer.tsx           # Footer
    icons.tsx            # Icon components
  islands/               # Interactive island components
    Dashboard.tsx        # Main dashboard layout
    BlinkCounter.tsx     # まばたき回数
    BreathCounter.tsx    # 呼吸回数
    Heartbeat.tsx        # 心拍数
    RiceCounter.tsx      # 米粒消費量
    ToiletCounter.tsx    # トイレ回数
    HairGrowth.tsx       # 髪の伸び
    NailGrowth.tsx       # 爪の伸び
    SalivaLake.tsx       # 唾液量
    GyozaConsumption.tsx # 餃子消費量
    MikanConsumption.tsx # みかん消費量
    RotationSpeed.tsx    # 地球の自転速度
    SeaLevel.tsx         # 海面水位
    IssTracker.tsx       # ISS 現在位置
  routes/
    index.tsx            # Top page
    _renderer.tsx        # HTML renderer
    api/
      iss.ts             # ISS position API proxy
      elevation.ts       # Elevation API proxy
  utils/
    prefectures.ts       # Prefecture data
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
