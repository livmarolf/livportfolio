<script setup lang="ts">
import type { IconName } from './Icon.vue';

const props = defineProps<{ icon: IconName }>()
</script>

<template>
  <button v-kinesis class="icon-button" :aria-label="props.icon">
    <Icon :name="props.icon" />
  </button>
</template>

<style lang="scss" scoped>
button {
  border: none;
  color: var(--color-border);
  display: inline-flex;
  border-radius: rem(8);
  padding: rem(1);
  font-size: rem(32);
  cursor: pointer;


  --light-size: #{rem(128)};
  --border-width: #{rem(1)};
  position: relative;
  background: radial-gradient(var(--light-size) at var(--x) var(--y), var(--color-text-primary), var(--color-background-card-light));
  border-radius: rem(8);

  &>* {
    z-index: 2;
  }

  &::after {
    content: "";
    position: absolute;
    display: block;
    top: var(--border-width);
    left: var(--border-width);
    width: calc(100% - var(--border-width) * 2);
    height: calc(100% - var(--border-width) * 2);
    background-color: var(--color-background-card-light);
    background-image: radial-gradient(var(--light-size) at var(--x) var(--y), #333, var(--color-background-card-light));
    border-radius: rem(7);
    z-index: 1;
  }
}
</style>