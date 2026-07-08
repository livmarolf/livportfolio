<script setup lang="ts">
const route = useRoute()
const contentRoot = ref<HTMLElement | null>(null)
type SectionIndicator = {
  heading: HTMLElement
  progressEl: HTMLElement
  start: number
  end: number
}

let sectionIndicators: SectionIndicator[] = []
let sectionIndicatorRafId: number | null = null
let contentObserver: MutationObserver | null = null

const handleSectionScroll = () => {
  if (sectionIndicatorRafId !== null) cancelAnimationFrame(sectionIndicatorRafId)

  sectionIndicatorRafId = requestAnimationFrame(() => {
    sectionIndicatorRafId = null
    updateSectionIndicatorProgress()
  })
}

const markerColors = [
  'var(--colors-dark-blue)',
  'var(--colors-purple)',
  'var(--colors-pink)',
  'var(--colors-red)',
  'var(--colors-orange)',
  'var(--colors-yellow)',
  'var(--colors-green)',
  'var(--colors-light-blue)',
]

const { data: page } = await useAsyncData('page-' + route.path, async () => {
  const caseStudy = await queryCollection('caseStudies').path(route.path).first()

  if (caseStudy) return caseStudy

  return queryCollection('articles').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const applyGlobalMarkerColors = () => {
  if (!import.meta.client || !contentRoot.value) return

  const listItems = contentRoot.value.querySelectorAll<HTMLElement>('.content-prose li')

  listItems.forEach((item, index) => {
    item.style.setProperty('--li-marker-color', markerColors[index % markerColors.length]!)
  })
}

const updateSectionIndicatorLayout = () => {
  if (!import.meta.client || !contentRoot.value) return

  const prose = contentRoot.value.querySelector<HTMLElement>('.content-prose')
  if (!prose) {
    sectionIndicators = []
    return
  }

  const headings = [...prose.querySelectorAll<HTMLElement>('h2')]
  sectionIndicators = headings.map((heading) => {
    let progressEl = heading.previousElementSibling as HTMLElement | null

    if (!progressEl || !progressEl.classList.contains('md-section-progress')) {
      progressEl = document.createElement('div')
      progressEl.className = 'md-section-progress'

      const indicator = document.createElement('div')
      indicator.className = 'md-section-progress__indicator'

      progressEl.appendChild(indicator)
      heading.parentNode?.insertBefore(progressEl, heading)
    }

    return { heading, progressEl, start: 0, end: 0 }
  })

  const proseBottom = prose.getBoundingClientRect().bottom + window.scrollY

  sectionIndicators.forEach((section, index) => {
    const start = section.heading.getBoundingClientRect().top + window.scrollY
    const nextHeading = sectionIndicators[index + 1]?.heading
    const end = nextHeading ? nextHeading.getBoundingClientRect().top + window.scrollY : proseBottom

    section.start = start
    section.end = end
    section.heading.classList.add('has-scroll-indicator')
  })
}

const updateSectionIndicatorProgress = () => {
  if (!import.meta.client || sectionIndicators.length === 0) return

  const viewportCenter = window.innerHeight / 2 + window.scrollY

  sectionIndicators.forEach((section) => {
    const trackableHeight = Math.max(1, section.end - section.start - 4)
    const rawProgress = (viewportCenter - section.start) / trackableHeight
    const progress = Math.max(0, Math.min(1, rawProgress))

    section.progressEl.style.setProperty('--h2-indicator-progress', `${progress * 100}%`)
  })
}

const applyContentEnhancements = () => {
  applyGlobalMarkerColors()
  updateSectionIndicatorLayout()
  updateSectionIndicatorProgress()
}

onMounted(async () => {
  await nextTick()
  applyContentEnhancements()

  if (contentRoot.value) {
    contentObserver = new MutationObserver(() => {
      applyContentEnhancements()
    })

    contentObserver.observe(contentRoot.value, {
      childList: true,
      subtree: true,
    })
  }

  window.addEventListener('scroll', handleSectionScroll, { passive: true })
  window.addEventListener('resize', updateSectionIndicatorLayout)
  window.addEventListener('resize', updateSectionIndicatorProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleSectionScroll)
  window.removeEventListener('resize', updateSectionIndicatorLayout)
  window.removeEventListener('resize', updateSectionIndicatorProgress)
  contentObserver?.disconnect()
  contentObserver = null
  if (sectionIndicatorRafId !== null) cancelAnimationFrame(sectionIndicatorRafId)
})

watch(
  () => route.path,
  async () => {
    await nextTick()
    applyContentEnhancements()
  }
)
</script>

<template>
  <main ref="contentRoot" class="content-page">
    <ContentRenderer v-if="page" :value="page" class="content-prose" />
  </main>
</template>

<style scoped>
.content-page {
  /* Layout shell for all rendered markdown pages */
  padding: 48px 24px 96px;
}

.content-prose {
  max-width: 80ch;
  margin: 0 auto;
  color: var(--text-primary);
}

.content-prose :deep(> :first-child) {
  margin-top: 0;
}

.content-prose :deep(> :last-child) {
  margin-bottom: 0;
}

/* Headings */
.content-prose :deep(h1) {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
  margin: 0 0 1.2rem;
}

.content-prose :deep(h2) {
  font-size: clamp(1.55rem, 3vw, 2.2rem);
  line-height: 1.15;
  margin: 2.8rem 0 1rem;
}

.content-prose :deep(h2.has-scroll-indicator) {
  margin-top: 1.7rem;
}

.content-prose :deep(.md-section-progress) {
  --h2-indicator-progress: 0%;
  position: sticky;
  top: calc(50dvh - 13px);
  width: 40px;
  height: 26px;
  margin-left: -72px;
  margin-bottom: -26px;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.content-prose :deep(.md-section-progress__indicator) {
  position: relative;
  height: 4px;
  width: 100%;
  border-radius: 2px;

  --gap: 0.1;
  --left-stop: calc(50% - var(--gap) * 50%);
  --right-stop: calc(50% + var(--gap) * 50%);

  background: no-repeat
    linear-gradient(
      to right,
      var(--colors-gray-shadow) var(--left-stop),
      var(--background) var(--left-stop),
      var(--background) var(--right-stop),
      var(--text-primary) var(--right-stop),
      var(--text-primary) 100%
    );
  background-size: calc(100% / (0.5 - var(--gap) / 2)) 100%;
  background-position-x: var(--h2-indicator-progress);
}

.content-prose :deep(h3) {
  font-size: clamp(1.3rem, 2.5vw, 1.65rem);
  line-height: 1.2;
  margin: 2.1rem 0 0.8rem;
}

.content-prose :deep(h4) {
  font-size: 1.1rem;
  line-height: 1.25;
  margin: 1.6rem 0 0.65rem;
}

.content-prose :deep(h5) {
  font-size: 1rem;
  line-height: 1.3;
  margin: 1.4rem 0 0.5rem;
}

.content-prose :deep(h6) {
  font-size: 0.9rem;
  line-height: 1.3;
  margin: 1.2rem 0 0.4rem;
}

.content-prose :deep(h1, h2, h3, h4, h5, h6) {
  font-family: 'Monomaniac One', monospace;
  text-transform: capitalize;
  letter-spacing: 0.06em;
  color: var(--text-primary);
}

/* Body text */
.content-prose :deep(p) {
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  line-height: 1.75;
  margin: 0.95rem 0;
  color: var(--text-primary);
}

.content-prose :deep(strong) {
  font-weight: 700;
}

.content-prose :deep(em) {
  color: var(--text-secondary);
}

.content-prose :deep(del) {
  color: var(--text-secondary);
  text-decoration-thickness: 1px;
}

.content-prose :deep(mark) {
  background: var(--colors-yellow);
  color: var(--text-primary);
  padding: 0.05em 0.25em;
  border-radius: 4px;
}

/* Links */
.content-prose :deep(a) {
  color: var(--colors-dark-blue);
  text-decoration-color: var(--colors-dark-blue);
  text-underline-offset: 0.14em;
  transition:
    color 0.2s ease,
    text-decoration-color 0.2s ease;
}

.content-prose :deep(a:hover) {
  color: var(--colors-pink);
  text-decoration-color: var(--colors-pink);
}

.content-prose :deep(a:focus-visible) {
  outline: 2px solid var(--colors-light-blue);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Heading anchor links */
.content-prose :deep(h1 > a[href^='#']),
.content-prose :deep(h2 > a[href^='#']),
.content-prose :deep(h3 > a[href^='#']),
.content-prose :deep(h4 > a[href^='#']),
.content-prose :deep(h5 > a[href^='#']),
.content-prose :deep(h6 > a[href^='#']) {
  color: inherit;
  text-decoration: none;
  position: relative;
  text-transform: capitalize;
}

.content-prose :deep(h1 > a[href^='#']::before),
.content-prose :deep(h2 > a[href^='#']::before),
.content-prose :deep(h3 > a[href^='#']::before),
.content-prose :deep(h4 > a[href^='#']::before),
.content-prose :deep(h5 > a[href^='#']::before),
.content-prose :deep(h6 > a[href^='#']::before) {
  content: '#';
  margin-left: 0.35em;
  color: var(--text-label);
  opacity: 0;
  transition: opacity 0.15s ease;
  position: absolute;
  right: calc(100% + 0.5ch);
}

.content-prose :deep(h1:hover > a[href^='#']::before),
.content-prose :deep(h2:hover > a[href^='#']::before),
.content-prose :deep(h3:hover > a[href^='#']::before),
.content-prose :deep(h4:hover > a[href^='#']::before),
.content-prose :deep(h5:hover > a[href^='#']::before),
.content-prose :deep(h6:hover > a[href^='#']::before),
.content-prose :deep(h1 > a[href^='#']:focus-visible::before),
.content-prose :deep(h2 > a[href^='#']:focus-visible::before),
.content-prose :deep(h3 > a[href^='#']:focus-visible::before),
.content-prose :deep(h4 > a[href^='#']:focus-visible::before),
.content-prose :deep(h5 > a[href^='#']:focus-visible::before),
.content-prose :deep(h6 > a[href^='#']:focus-visible::before) {
  opacity: 1;
}

/* Lists */
.content-prose :deep(ul) {
  list-style: none;
}

.content-prose :deep(ol) {
  list-style: decimal;
}

.content-prose :deep(ul, ol) {
  margin: 1rem 0 1.35rem;
  padding-left: 1.6rem;
}

.content-prose :deep(li) {
  margin: 0.45rem 0;
  line-height: 1.65;
}

.content-prose :deep(ul li::marker) {
  content: '■ ';
  font-size: 1.25em;
  color: var(--li-marker-color, var(--colors-dark-blue));
}

.content-prose :deep(ol li::marker) {
  color: var(--li-marker-color, var(--colors-dark-blue));
}

/* Quotes and separators */
.content-prose :deep(blockquote) {
  margin: 1.7rem 0;
  padding: 0.95rem 1.1rem;
  border-left: 3px solid var(--colors-orange);
  background: var(--item-background);
  color: var(--text-secondary);
}

.content-prose :deep(blockquote p) {
  margin: 0;
}

.content-prose :deep(hr) {
  margin: 2.2rem 0;
  border: 0;
  border-top: 1px solid var(--stroke);
}

/* Media */
.content-prose :deep(img) {
  width: auto;
  max-width: min(100%, 760px);
  max-height: 80vh;
  height: auto;
  display: block;
  margin: 1.4rem auto;
  border-radius: 12px;
  border: 1px solid var(--stroke);
  background: var(--item-background);
}

.content-prose :deep(video) {
  width: auto;
  max-width: min(100%, 760px);
  max-height: 80vh;
  height: auto;
  display: block;
  margin: 1.4rem auto;
  border-radius: 12px;
  border: 1px solid var(--stroke);
  background: black;
}

.content-prose :deep(figure) {
  margin: 1.5rem 0;
}

.content-prose :deep(figcaption) {
  margin-top: 0.55rem;
  text-align: center;
  color: var(--text-label);
  font-size: 0.9rem;
}

/* Code */
.content-prose :deep(pre) {
  overflow-x: auto;
  margin: 1.4rem 0;
  padding: 0.95rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--stroke);
  background: var(--item-background);
}

.content-prose :deep(code) {
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
  font-size: 0.92em;
  border-radius: 5px;
  background: var(--item-background);
  padding: 0.08em 0.3em;
}

.content-prose :deep(pre code) {
  background: transparent;
  padding: 0;
}

/* Tables */
.content-prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  border: 1px solid var(--stroke);
}

.content-prose :deep(thead) {
  background: var(--item-background);
}

.content-prose :deep(tr) {
  border-bottom: 1px solid var(--stroke);
}

.content-prose :deep(th) {
  text-align: left;
  color: var(--text-primary);
  font-weight: 700;
  padding: 0.65rem 0.8rem;
}

.content-prose :deep(td) {
  padding: 0.65rem 0.8rem;
  color: var(--text-secondary);
}

/* Misc markdown output */
.content-prose :deep(kbd) {
  border: 1px solid var(--stroke);
  border-bottom-width: 2px;
  border-radius: 6px;
  padding: 0.1em 0.35em;
  background: var(--item-background);
  font-size: 0.85em;
}

.content-prose :deep(sup) {
  font-size: 0.75em;
}

.content-prose :deep(sub) {
  font-size: 0.75em;
}

@media (max-width: 900px) {
  .content-page {
    padding: 32px 16px 72px;
  }

  .content-prose {
    max-width: 100%;
  }

  .content-prose :deep(h1) {
    margin-bottom: 1rem;
  }

  .content-prose :deep(h2) {
    margin-top: 2.2rem;
  }

  .content-prose :deep(.md-section-progress) {
    display: none;
  }

  .content-prose :deep(pre) {
    padding: 0.8rem;
  }
}
</style>
