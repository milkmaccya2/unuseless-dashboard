import tailwindcss from '@tailwindcss/vite'
import build from '@hono/vite-build/cloudflare-pages'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
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
  return {
    ssr: {
      external: ['react', 'react-dom', 'gsap'],
    },
    plugins: [
      honox({ devServer: { adapter } }),
      build(),
      tailwindcss(),
    ],
  }
})
