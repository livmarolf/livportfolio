import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

// Derive the prerender list from the content/ folder so new posts are
// picked up automatically. Content pages are fully static: queries run at
// build time and the client hydrates via the WASM sqlite dump, so no native
// better-sqlite3 binary is needed on the server (which can't load one).
const contentRoutes = [
  '/',
  ...['articles', 'case-studies'].flatMap((dir) => {
    const base = join(process.cwd(), 'content', dir)
    try {
      return readdirSync(base)
        .filter((f) => f.endsWith('.md'))
        .map((f) => `/${dir}/${f.replace(/\.md$/, '')}`)
    } catch {
      return []
    }
  }),
]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/image', '@nuxt/fonts', '@vueuse/nuxt', 'v-wave/nuxt'],
  devtools: { enabled: false },
  compatibilityDate: '2024-04-03',
  nitro: {
    prerender: {
      routes: contentRoutes,
    },
  },
  image: {
    dir: 'assets/images',
  },
  vite: {
    optimizeDeps: {
      include: [],
    },
  },
})
