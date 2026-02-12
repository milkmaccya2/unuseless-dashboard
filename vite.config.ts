import tailwindcss from '@tailwindcss/vite'
import build from '@hono/vite-build/cloudflare-pages'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    external: ['react', 'react-dom', 'gsap'],
  },
  plugins: [
    honox({ devServer: { adapter } }),
    build(),
    tailwindcss()
  ]
})
