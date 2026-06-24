<script setup lang="ts">
const props = defineProps<{
  urls: string[]
  description: string
  orientation: 'landscape' | 'portrait'
  colorScheme: 'light' | 'dark'
}>()

const dialog = useTemplateRef('dialog')

const activeTransitionElement = ref<'none' | 'preview' | 'dialog'>('none')

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
    dialog.value!.close()
  }).finished

  activeTransitionElement.value = 'none'
}
</script>

<template>
  <div class="gallery-item-container">
    <article
      :class="{ applyTransitionName: activeTransitionElement === 'preview' }"
      @click="handleOpen"
      class="gallery-item">
      <p class="mono count">
        <span>01</span>
        <span class="secondary">/{{ urls.length.toString().padStart(2, '0') }}</span>
      </p>
      <button class="expand-btn" type="button"><ExpandIcon /></button>
      <figure>
        <BrowserChrome class="thumbnail">
          <NuxtImg :src="urls[0]" />
        </BrowserChrome>

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
        <span>01</span>
        <span class="secondary">/{{ urls.length.toString().padStart(2, '0') }}</span>
      </p>
      <button @click="handleClose" class="collapse-btn" type="button"><CollapseIcon /></button>
      <figure>
        <BrowserChrome class="thumbnail" scrollable>
          <NuxtImg :src="urls[0]" />
        </BrowserChrome>

        <figcaption class="secondary">{{ description }}</figcaption>
      </figure>
    </dialog>
  </div>
</template>
<style scoped>
.gallery-item-container:has(dialog[open]) .gallery-item {
  opacity: 0;
}

.gallery-item {
  background: var(--item-background);
  border: 1px solid var(--stroke);
  display: grid;
  grid-template: auto 1fr auto / auto 33%;
  grid-template-areas:
    'count  expand'
    'img       img'
    '. description';
  padding: 16px;
  gap: 16px;

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

  .thumbnail {
    grid-area: img;
    margin: 0 24px;
    color-scheme: v-bind(colorScheme);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 0;
    }
  }

  figcaption {
    grid-area: description;
    font-size: 12px;
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
  grid-template: auto 1fr auto / auto 33%;
  grid-template-areas:
    'count  expand'
    'img       img'
    '. description';
  padding: 16px;
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
  }

  figure {
    display: contents;
  }

  .thumbnail {
    grid-area: img;
    place-self: center;
    margin: 0 24px;
    color-scheme: v-bind(colorScheme);
    width: 100%;
  }

  figcaption {
    grid-area: description;
    font-size: 12px;
  }
}

.applyTransitionName {
  &.gallery-item,
  &.gallery-item-dialog {
    view-transition-name: gallery-item-background;
  }

  .count {
    view-transition-name: gallery-item-count;
  }

  .expand-btn,
  .collapse-btn {
    view-transition-name: gallery-item-expand-btn;
  }

  .thumbnail {
    view-transition-name: gallery-item-thumbnail;
  }
}
</style>
