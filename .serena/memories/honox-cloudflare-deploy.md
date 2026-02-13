# HonoX + React → Cloudflare Pages デプロイ知見

## 重要: JSX ファクトリ設定
`honox/vite` プラグインはデフォルトで `jsxImportSource: 'hono/jsx/dom'` を使う。
React レンダラー (`@hono/react-renderer`) を使っている場合、client build で必ず指定する:
```ts
honox({ client: { jsxImportSource: 'react' } })
```
指定しないと island コンポーネントが HonoX VNode (`{tag, type, props, key, ref}`) を生成し、
React error #31 "Objects are not valid as a React child" が発生する。

## CSS を client build に含める
- `app/client.ts` で `import './style.css'` する
- Tailwind CSS が client build に含まれ、manifest 経由で正しいパスに出力される

## vite.config.ts の mode 分割
client build では固定ファイル名で出力し、`_renderer.tsx` のハードコードパスと一致させる:
```ts
if (mode === 'client') {
  return {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'static/client.js',
          chunkFileNames: 'static/chunks/[name]-[hash].js',
          assetFileNames: 'static/assets/[name][extname]',
        },
      },
      emptyOutDir: false,
    },
    plugins: [honox({ client: { jsxImportSource: 'react' } }), tailwindcss()],
  }
}
```

## pnpm deploy vs pnpm run deploy
`pnpm deploy` は pnpm のワークスペース用ビルトインコマンド。
package.json の scripts を実行するには `pnpm run deploy` を使う。
