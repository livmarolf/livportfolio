import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    caseStudies: defineCollection({
      type: 'page',
      source: 'case-studies/**/*.md',
    }),
    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
    }),
  },
})
