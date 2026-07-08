// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/image', '@nuxt/fonts', '@vueuse/nuxt', 'v-wave/nuxt'],
  devtools: { enabled: false },
  compatibilityDate: '2024-04-03',
  image: {
    dir: 'assets/images',
  },
  vite: {
    optimizeDeps: {
      include: [],
    },
  },
})
