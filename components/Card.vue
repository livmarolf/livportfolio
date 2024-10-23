<script lang="ts" setup>
const props = defineProps<{ label?: string, accent?: string, border?: boolean }>()
</script>

<template>
  <div class="card">
    <div v-if="props.border" class="border" />
    <span v-if="props.label" class="label">{{ props.label }}</span>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: var(--color-background-card);
  border-radius: rem(8);
  padding: rem(64);
  overflow: hidden;
  display: grid;
  grid-template: 1fr auto / 1fr;
  gap: rem(32) 0;
  height: 100%;
  width: 100%;
  position: relative;

  .label {
    color: v-bind(accent);
  }

  .border {
    position: absolute;
    background: v-bind(accent);
    width: rem(4);
    height: calc(100% - rem(18));
    top: rem(9);
    left: rem(9);
    bottom: rem(9);
    border-radius: rem(2);
  }

  &:has(>picture),
  &:has(>img) {
    padding: 0;
    display: block;

    >* {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>