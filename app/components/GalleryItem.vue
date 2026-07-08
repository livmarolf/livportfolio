<script setup lang="ts">
const props = defineProps<{
  urls: string[]
  description: string
  viewport: 'desktop' | 'mobile'
  colorScheme: 'light' | 'dark'
}>()

const dialog = useTemplateRef('dialog')
const activeTransitionElement = ref<'none' | 'preview' | 'dialog'>('none')
const scroller = useTemplateRef('scroller')
const activeUrl = ref(1)

const handleOpen = async () => {
  activeTransitionElement.value = 'preview'

  await transition(() => {
    activeTransitionElement.value = 'dialog'
    dialog.value!.showModal()
  }).finished

  activeTransitionElement.value = 'none'
}

const handleClose = async () => {
  activeTransitionElement.value = 'dialog'

  await transition(() => {
    activeTransitionElement.value = 'preview'

    activeUrl.value = 1
    if (scroller.value) {
      scroller.value.scrollLeft = 0
    }

    dialog.value!.close()
  }).finished

  activeTransitionElement.value = 'none'
}

const getScrollerWidth = () => scroller.value?.getBoundingClientRect().width ?? 0

const scrollToIndex = (nextIndex: number) => {
  if (!scroller.value) return

  const maxIndex = props.urls.length - 1
  const targetIndex = Math.min(Math.max(nextIndex, 0), maxIndex)
  const width = getScrollerWidth()

  if (width === 0) return

  scroller.value.scrollTo({
    left: targetIndex * width,
    behavior: 'smooth',
  })
}

onMounted(() => {
  scroller.value?.addEventListener('scroll', () => {
    const width = getScrollerWidth()

    if (width === 0 || !scroller.value) return

    activeUrl.value = Math.round(scroller.value.scrollLeft / width) + 1
  })
})

const left = () => {
  scrollToIndex(activeUrl.value - 2)
}

const right = () => {
  scrollToIndex(activeUrl.value)
}
</script>

<template>
  <div class="gallery-item-container">
    <article
      :class="{ applyTransitionName: activeTransitionElement === 'preview' }"
      @click="handleOpen"
      class="gallery-item small">
      <p class="mono count">
        <span>01</span>
        <span class="secondary">/{{ urls.length.toString().padStart(2, '0') }}</span>
      </p>
      <button class="expand-btn" type="button"><ExpandIcon /></button>
      <figure>
        <BrowserChrome v-if="viewport === 'desktop'" class="desktop-thumbnail thumbnail">
          <NuxtImg :src="urls[0]" />
        </BrowserChrome>
        <PhoneScreen v-else class="thumbnail">
          <NuxtImg :src="urls[0]" />
        </PhoneScreen>

        <figcaption class="secondary">{{ description }}</figcaption>
      </figure>
    </article>
    <dialog
      :class="{ applyTransitionName: activeTransitionElement === 'dialog' }"
      @cancel.prevent="handleClose"
      class="gallery-item-dialog"
      ref="dialog"
      closedby="any">
      <p class="mono count">
        <span>{{ activeUrl.toString().padStart(2, '0') }}</span>
        <span class="secondary">/{{ urls.length.toString().padStart(2, '0') }}</span>
      </p>
      <button @click="handleClose" class="collapse-btn" type="button"><CollapseIcon /></button>
      <button
        v-if="urls.length > 1"
        @click="left"
        v-wave
        class="arrow left"
        :disabled="activeUrl === 1">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.1406 11.8594L7.00063 23.9994L19.1406 36.1394"
            stroke="currentColor"
            stroke-width="4"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M41 24H7.34"
            stroke="currentColor"
            stroke-width="4"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <figure>
        <div ref="scroller" class="scroller desktop-scroller" v-if="viewport === 'desktop'">
          <BrowserChrome
            v-for="(url, i) in urls"
            scrollable
            class="image"
            :class="{ thumbnail: i === activeUrl - 1 }">
            <NuxtImg :src="url" />
          </BrowserChrome>
        </div>
        <div ref="scroller" class="scroller mobile-scroller" v-else>
          <PhoneScreen
            v-for="(url, i) in urls"
            class="image"
            :class="{ thumbnail: i === activeUrl - 1 }">
            <NuxtImg :src="url" />
          </PhoneScreen>
        </div>

        <figcaption class="secondary">{{ description }}</figcaption>
      </figure>
      <button
        v-if="urls.length > 1"
        @click="right"
        v-wave
        class="arrow right"
        :disabled="activeUrl === urls.length">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M28.8594 11.8594L40.9994 23.9994L28.8594 36.1394"
            stroke="currentColor"
            stroke-width="4"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M7 24H40.66"
            stroke="currentColor"
            stroke-width="4"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
    </dialog>
  </div>
</template>
<style scoped>
.gallery-item-container {
  aspect-ratio: 1.3;
  width: 100%;
  min-height: 0;
}

.gallery-item-container > * {
  user-select: none;
}

.gallery-item-container:has(dialog[open]) .gallery-item {
  opacity: 0;
}

.gallery-item {
  background: var(--item-background);
  border: 1px solid var(--stroke);
  box-sizing: border-box;
  overflow: clip;
  display: grid;
  grid-template: auto minmax(0, 1fr) auto / auto 33%;
  grid-template-areas:
    'count  expand'
    'img       img'
    'description description';
  padding: 16px;
  gap: 16px;

  &.small {
    height: 100%;
  }

  .count {
    grid-area: count;
    font-size: 30px;
    color: var(--text-primary);
    .secondary {
      font-size: 18px;
    }
  }

  .expand-btn {
    grid-area: expand;
    place-self: end;
    width: min-content;
    height: min-content;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    cursor: pointer;
  }

  figure {
    display: contents;
  }

  .desktop-thumbnail {
    grid-area: img;
    margin: 0;
    color-scheme: v-bind(colorScheme);
    width: auto;
    height: 100%;
    aspect-ratio: 1.44;
    max-width: calc(100% - 48px);
    place-self: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 0;
    }
  }

  .phone-screen {
    grid-area: img;
    width: auto;
    height: 100%;
    max-width: 100%;
    place-self: center;
  }

  figcaption {
    grid-area: description;
    font-size: 12px;
    width: 100%;
    text-align: right;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
  }
}

.gallery-item-dialog:not([open]) {
  display: none;
}

.gallery-item-dialog {
  overscroll-behavior: contain;
  background: var(--item-background);
  border: 1px solid var(--stroke);
  display: grid;
  grid-template: auto minmax(0, 1fr) auto / auto 1fr auto;
  grid-template-areas:
    'count . expand'
    'arrow-l img arrow-r'
    'description description description';
  padding: 16px 0;
  gap: 16px;

  height: 100%;
  aspect-ratio: 5/4;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    overscroll-behavior: contain;
    overflow: hidden;
  }

  .count {
    margin-left: 16px;
    grid-area: count;
    font-size: 30px;
    color: var(--text-primary);
    .secondary {
      font-size: 18px;
    }
  }

  .collapse-btn {
    grid-area: expand;
    place-self: end;
    width: min-content;
    height: min-content;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 16px;
  }

  .arrow {
    background: var(--stroke);
    border: none;
    padding: 140px 16px;
    height: min-content;
    cursor: pointer;
    color: var(--text-primary);

    &:disabled {
      color: var(--text-secondary);
    }

    > svg {
      width: 48px;
      height: 48px;
    }

    &.left {
      grid-area: arrow-l;
      border-radius: 0 25px 25px 0;
      place-self: center start;
    }
    &.right {
      border-radius: 25px 0 0 25px;
      grid-area: arrow-r;
      place-self: center end;
    }
  }

  figure {
    display: contents;
  }

  .scroller {
    grid-area: img;
    place-self: center;
    margin: 0 24px;
    display: grid;
    grid-auto-flow: column;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: clip;
    scroll-snap-type: x mandatory;
    grid-auto-columns: 100%;
    place-items: stretch center;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .image {
      color-scheme: v-bind(colorScheme);
      scroll-snap-stop: always;
      scroll-snap-align: center;
      max-width: 100%;
      max-height: 100%;
      place-self: center;
    }
  }

  .desktop-scroller {
    .image {
      width: 100%;
      height: auto;
    }
  }

  .mobile-scroller {
    .image {
      width: auto;
      height: 100%;
    }
  }

  figcaption {
    grid-area: description;
    font-size: 12px;
    padding: 0 16px;
    text-align: right;
  }

  &:not(:has(.arrow)) {
    grid-template-areas:
      'count . expand'
      'img img img'
      'description description description';

    .scroller {
      width: calc(100% - 48px);
      margin: 0;
    }
  }
}

.applyTransitionName {
  &.gallery-item,
  &.gallery-item-dialog {
    view-transition-name: gallery-item-background;
  }

  /* .count {
    view-transition-name: gallery-item-count;
  } */

  .expand-btn,
  .collapse-btn {
    view-transition-name: gallery-item-expand-btn;
  }

  .thumbnail {
    view-transition-name: gallery-item-thumbnail;
  }
}
</style>
