<script setup lang="ts">
import type { IconName } from './Icon.vue';
export type SectionLink = { id: `#${string}`, label: string, icon: IconName }

const props = defineProps<{ items: SectionLink[] }>()
</script>

<template>
  <aside>
    <ul>
      <li v-for="item in props.items">
        <a :href="item.id">
          <Icon :name="item.icon" />
          {{ item.label }}
        </a>
      </li>
    </ul>
  </aside>
</template>

<style></style>