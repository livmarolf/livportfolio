<script setup lang="ts">
const route = useRoute()

const backTarget = computed(() => {
  if (route.path.startsWith('/case-studies/')) return '/#case-studies'
  if (route.path.startsWith('/articles/')) return '/#articles'
  return '/'
})

const { data: page } = await useAsyncData('page-' + route.path, async () => {
  const caseStudy = await queryCollection('caseStudies').path(route.path).first()

  if (caseStudy) return caseStudy

  return queryCollection('articles').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <main ref="contentRoot" class="markdown-page">
    <LinkButton :to="backTarget" class="back-link" aria-label="Back to homepage section">
      Back
    </LinkButton>

    <ContentRenderer v-if="page" :value="page" />
  </main>
</template>

<style>
.markdown-page {
  position: relative;
  max-width: 66ch;
  margin: 60px auto;
  padding: 0 32px;

  .back-link {
    margin-bottom: 38px;

    .text-adjuster {
      grid-column: 2;
      grid-row: 1;
    }

    svg {
      grid-column: 1;
      grid-row: 1;
      transform: scaleX(-1) !important;
    }

    &:hover {
      svg {
        transform: scaleX(-1) translateX(-10%) !important;
      }
    }
  }

  @media (min-width: 1100px) {
    .back-link {
      position: absolute;
      top: 0;
      right: calc(100% + 24px);
      margin-bottom: 0;
    }
  }

  h1 {
    font-size: 32px;
    margin-bottom: 16px;
  }

  hr {
    border: none;
    height: 1px;
    background: var(--stroke);
    margin: 0 0 48px 0;
  }

  h2 {
    font-size: 28px;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 22px;
    margin-bottom: 8px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-transform: capitalize;
    line-height: 1.3;
    position: relative;
    scroll-margin-top: 100px;

    > * {
      color: inherit;
      text-decoration: none;
    }

    &:has(a) {
      &::before {
        content: '#';
        color: var(--text-secondary);
        position: absolute;
        right: calc(100% + 0.5ch);
        opacity: 0;
      }

      &:hover::before {
        opacity: 1;
      }
    }
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 0.5em;
  }

  blockquote {
    border-left: 4px solid var(--stroke);
    padding: 0px 16px;
    margin-bottom: 12px;
    color: var(--text-secondary);
    p {
      font-size: 16px;
    }
  }

  figure {
    display: grid;
    gap: 16px;
    place-items: center;
    padding: 16px;
    color: var(--text-secondary);
    margin: 24px 0;
    margin-bottom: 1px solid var(--stroke);
    video,
    img {
      border: 4px solid var(--stroke);
      border-radius: 12px;
      width: auto;
      max-width: min(100%, 66ch);
      max-height: 70vh;
      height: auto;
      display: block;
    }

    figcaption {
      font-size: 16px;
    }
  }

  table {
    width: 100%;
    background: var(--stroke);
    margin: 16px 0;
    th {
      background: var(--item-background);
      padding: 6px;
    }
    td {
      padding: 6px;
      background: var(--background);
    }
  }

  ul {
    margin: 16px 0;
    list-style-position: outside;
    line-height: 1.5;
    font-size: 16px;
    list-style-type: square;

    background: var(--item-background);
    padding: 16px 16px 16px 32px;
    border: 1px solid var(--stroke);
    border-radius: 4px;

    li {
      &::marker {
        color: var(--marker-color);
      }
    }
  }

  ol {
    list-style-position: inside;
    line-height: 1.5;
    font-size: 16px;
  }
}
</style>
