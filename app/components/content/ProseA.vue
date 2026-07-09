<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<
      '_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined
    >,
    default: undefined,
    required: false,
  },
})

const colorList = [
  'var(--colors-dark-blue)',
  'var(--colors-purple)',
  'var(--colors-pink)',
  'var(--colors-red)',
  'var(--colors-orange)',
  'var(--colors-yellow)',
  'var(--colors-green)',
  'var(--colors-light-blue)',
]

let color = ref(0)

const cycleColor = () => {
  color.value++

  if (color.value >= colorList.length) color.value = 0
}
</script>

<template>
  <NuxtLink
    class="prose-a"
    :style="{ color: colorList[color] }"
    @pointerenter="cycleColor"
    :href="props.href"
    :target="props.target">
    <slot />
  </NuxtLink>
</template>

<style scoped>
.prose-a {
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
</style>
