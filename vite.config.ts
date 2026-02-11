import tailwindcss from '@tailwindcss/vite'
import build from '@hono/vite-build/cloudflare-pages'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [tailwindcss()],
      build: {
        rollupOptions: {
          input: ['./app/client.ts'],
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/assets/[name]-[hash].js',
            assetFileNames: 'static/assets/[name].[ext]',
          },
        },
        emptyOutDir: false,
      },
    }
  }

  // SSR / dev shared config
  const plugins = [honox(), tailwindcss()]

  // build plugin is for production SSR build only, not dev
  if (mode === 'production') {
    plugins.push(build())
  }

  return {
    ssr: {
      external: ['react', 'react-dom', 'gsap'],
    },
    plugins,
  }
})
