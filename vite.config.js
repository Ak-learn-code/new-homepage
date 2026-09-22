import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { getSiteConfig } from './scripts/site-config.mjs'

export default defineConfig(() => {
  const { base, siteUrl } = getSiteConfig()
  return {
  plugins: [react(), { name: 'sidetwo-site-metadata', transformIndexHtml: (html) => html.replaceAll('__SIDETWO_SITE_URL__', siteUrl) }],
  base,
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        blog: resolve(import.meta.dirname, 'blog.html'),
        impressum: resolve(import.meta.dirname, 'impressum/index.html'),
        datenschutz: resolve(import.meta.dirname, 'datenschutz/index.html'),
      },
    },
  },
  }
})
