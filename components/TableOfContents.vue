<script setup lang="ts">
import { set } from '@vueuse/core';
import type { IconName } from './Icon.vue';
export type SectionLink = { id: `#${string}`, label: string, icon: IconName }

const props = defineProps<{ items: SectionLink[] }>()
let observer: IntersectionObserver
const visibleSections = reactive(new Set<SectionLink["id"]>())

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.25) {
        console.log(entry.intersectionRatio, entry.target)
        visibleSections.add(`#${entry.target.getAttribute("id")}`)
      } else {
        visibleSections.delete(`#${entry.target.getAttribute("id")}`)
      }
    })
  }, { threshold: [0.25] })
  props.items.forEach((item) => {
    const element = document.querySelector(item.id)
    if (!element) {
      return console.warn("no content element found with id", item.id)
    }
    observer.observe(element)
  })
})

onUnmounted(() => {
  observer.disconnect()
})

const scrollToId = (id: SectionLink["id"]) => {
  const target = document.querySelector<HTMLElement>(id)
  if (!target) {
    console.warn("no target found")
    return
  }

  const { top } = target.getBoundingClientRect()
  window.scrollBy({ top: top - 96, behavior: "smooth" })
}
</script>

<template>
  <aside class="glass">
    <div v-kinesis>
      <ul>
        <li v-for="item in props.items">
          <a :href="item.id" :class="{ active: visibleSections.has(item.id) }"
            @click.prevent="() => scrollToId(item.id)">
            <Icon :name="item.icon" />
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped lang="scss">
aside {
  display: flex;
  align-items: stretch;
  height: calc(100vh - calc(var(--common-gap) * 3 + rem(56)));
  position: sticky;
  top: calc(var(--common-gap) * 2 + rem(56));
  padding: rem(4);
  border-radius: rem(8);

  @media (max-width: width(675)) {
    display: none;
  }

  >div {
    display: flex;
  }

  ul {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: rem(8);
  }


  li {
    display: contents;
  }

  a {
    text-decoration: none;
    font-size: rem(12);
    line-height: 1.3;
    font-family: "Sora";
    text-transform: none;
    color: var(--color-text-secondary);
    letter-spacing: normal;
    text-transform: uppercase;
    padding: rem(8);
    text-wrap: nowrap;
    display: flex;
    align-items: center;
    gap: rem(16);
    transition: color 0.25s ease-in-out;

    &.active {
      color: var(--color-text-primary);
    }

    .icon {
      font-size: rem(20);
    }
  }
}

[data-kinesis] {
  position: relative;
  background: none;
  --border-width: #{rem(1)};
}

[data-kinesis]::before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(rem(128) at var(--x) var(--y), var(--color-text-primary), var(--color-background-card-dark));
  border-radius: rem(5);
  z-index: -1;
}

[data-kinesis]::after {
  content: "";
  position: absolute;
  display: block;
  top: var(--border-width);
  left: var(--border-width);
  width: calc(100% - var(--border-width) * 2);
  height: calc(100% - var(--border-width) * 2);
  background-color: var(--color-background-card-dark);
  background-image: radial-gradient(rem(128) at var(--x) var(--y), #222, var(--color-background-card-dark));
  border-radius: rem(5);
  z-index: -1;
}
</style>