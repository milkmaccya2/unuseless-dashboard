# Useless Dashboard 実装計画

## 概要
HonoX + React (Islands Architecture) + Tailwind CSS で「知っても何の役にも立たない」ダッシュボードを構築する。

---

## Step 1: プロジェクト初期化 + 最小構成
**作成するファイル:**
- `package.json` — 依存パッケージ定義
- `tsconfig.json` — TypeScript設定 (`jsxImportSource: "react"`)
- `vite.config.ts` — HonoX + React + Tailwind 設定
- `global.d.ts` — `@hono/react-renderer` の型定義
- `app/client.ts` — クライアントハイドレーション設定
- `app/routes/_renderer.tsx` — 共通HTMLレイアウト（Tailwind読み込み含む）
- `app/routes/index.tsx` — メインページ（Dashboard islandを配置）
- `app/style.css` — Tailwind CSSエントリポイント
- `tailwind.config.ts` — Tailwind設定
- `postcss.config.js` — PostCSS設定

**依存パッケージ:**
```
dependencies: hono, honox, @hono/react-renderer, react, react-dom
devDependencies: @types/react, @types/react-dom, typescript,
                 vite, @hono/vite-build,
                 tailwindcss, @tailwindcss/vite,
                 wrangler (CF Workers用)
```

**動作確認:** `pnpm dev` で "Hello World" が表示されること

---

## Step 2: 共通UIコンポーネント + レイアウト
- `app/components/Card.tsx` — 共通カードUI（emoji, title, children を受け取る）
- `app/routes/_renderer.tsx` にダークテーマ風のスタイルを適用
- レスポンシブグリッドレイアウトの骨格を作る

---

## Step 3: クライアント計算系 Islands（外部API不要）
- `app/islands/Dashboard.tsx` — メイン。位置情報取得 + 各islandに配布
- `app/islands/BlinkCounter.tsx` — まばたき推定（17回/分、requestAnimationFrame）
- `app/islands/BreathCounter.tsx` — 呼吸回数（15回/分、requestAnimationFrame）
- `app/islands/ToiletCounter.tsx` — トイレ中の人数（80億 × 3-4% + ランダム揺らぎ）
- `app/islands/RiceCounter.tsx` — ご飯粒数（生年月日入力 + localStorage保存）

---

## Step 4: 位置情報系 Island
- `app/islands/RotationSpeed.tsx` — 自転速度（`1670 × cos(緯度)` km/h）

---

## Step 5: APIルート（サーバーサイド）
- `app/routes/api/elevation.ts` — Open-Meteo Elevation API プロキシ
- `app/routes/api/iss.ts` — ISS Current Location API プロキシ

---

## Step 6: 外部API系 Islands
- `app/islands/SeaLevel.tsx` — 海面上昇で沈む高さ（/api/elevation使用）
- `app/islands/IssTracker.tsx` — ISS距離 + 可視判定（/api/iss使用、Haversine formula）

---

## Step 7: 見た目の仕上げ
- カウンター数字のアニメーション（チカチカ動く演出）
- レスポンシブ対応（モバイル1列、タブレット2列、デスクトップ2-3列）
- ダークテーマの色調整
- フォント・間隔の微調整

---

## 技術的ポイント
- **Islands Architecture**: `app/islands/` のコンポーネントのみクライアントでhydrate
- **カウンター更新**: `requestAnimationFrame` で60fps更新、表示は100ms間隔程度に間引き
- **位置情報**: `navigator.geolocation` で取得、Dashboard islandから各子に配布
- **APIポーリング**: ISS/標高は30秒〜1分間隔
- **localStorage**: 生年月日の永続化
