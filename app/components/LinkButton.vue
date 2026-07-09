<script setup lang="ts">
import wave from 'v-wave'

defineProps<{ to: string }>()

const colors = [
  'var(--colors-dark-blue)',
  'var(--colors-purple)',
  'var(--colors-pink)',
  'var(--colors-red)',
  'var(--colors-orange)',
  // 'var(--colors-yellow)',
  'var(--colors-green)',
  'var(--colors-light-blue)',
]

let activeColor = -1

const trigger = wave.createTrigger()
const color = ref(colors[0])

const handlePointerEnter = async (e: PointerEvent | FocusEvent) => {
  if (activeColor < 0) activeColor = Math.floor(Math.random() * colors.length)

  color.value = colors[++activeColor % colors.length]

  await nextTick()
  if ('x' in e) trigger.press(e)
  else trigger.press()
}
</script>
<template>
  <NuxtLink
    :to="to"
    @pointerenter="handlePointerEnter"
    @pointerleave="trigger.release"
    class="button mono"
    v-wave="{
      trigger,
      waitForRelease: true,
      initialOpacity: 1,
      finalOpacity: 1,
      dissolveDuration: 0.75,
      color,
    }">
    <span class="text-adjuster">
      <slot />
    </span>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28.8594 11.86L40.9994 24L28.8594 36.14"
        stroke="var(--text-primary)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M7 24H40.66"
        stroke="var(--text-primary)"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
  </NuxtLink>
</template>

<style scoped>
.button {
  display: grid;
  grid-template: 1fr / 1fr auto;
  gap: 10px;
  padding: 0 24px;
  border: 1px solid var(--stroke);
  border-radius: 16px 6px 16px 6px;
  width: fit-content;
  place-items: center;
  background: var(--item-background);
  text-transform: uppercase;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: var(--text-primary);

  .text-adjuster {
    transform: translateY(-2px);
    position: relative;
    z-index: 2;
  }

  svg {
    transition: transform 0.75s ease;
    position: relative;
    z-index: 2;
  }

  /* transition: transform 0.75s ease; */

  &:hover {
    /* fixme: this causes the wave effect the fire rapidly due to pointerenter events being triggered during the transform */
    /* transform: scale(1.05); */
    /* transition: transform 0.1s ease; */

    svg {
      transition: transform 0.1s ease;
      transform: translateX(10%);
    }
  }

  &:active {
    /* transform: none; */
    /* transition: none; */
    svg {
      transition: none;
      transform: none;
    }
  }
}
</style>
