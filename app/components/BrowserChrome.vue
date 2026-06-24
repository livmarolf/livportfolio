<script setup lang="ts">
defineProps<{ scrollable?: boolean }>()
</script>
<template>
  <div class="browser-chrome">
    <div class="controls">
      <div class="traffic-lights">
        <div />
        <div />
        <div />
      </div>
    </div>
    <div class="browser-chrome-content" :class="{ scrollable }">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.browser-chrome {
  --background: light-dark(#fff, #121212);
  --border: light-dark(#ebebeb, #1f1f1f);
  --control-bg: light-dark(#d9d9d9, #3f3f3f);
  --control-fg: light-dark(#333, #999);
  padding: 3px 6px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  height: min-content;

  .controls {
    margin-bottom: 3px;
    position: relative;
    height: 10px;
    display: flex;
    align-items: center;

    .traffic-lights {
      display: flex;
      gap: 4px;

      > div {
        border-radius: 50%;
        width: 8px;
        height: 8px;
        background: var(--control-bg);
      }
    }

    /* .url {
      font-size: 5px;
      background: var(--border);
      color: var(--control-fg);
      width: min-content;
      padding: 1px 5px;
      border-radius: 2px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    } */
  }

  .browser-chrome-content {
    border-radius: 2px;
    aspect-ratio: 6/4;
    overflow: hidden;
    &.scrollable {
      overflow-y: auto;
    }
  }
}
:deep(.browser-chrome-content > img) {
  width: 100%;
  border: 1px solid var(--border);
}
</style>
