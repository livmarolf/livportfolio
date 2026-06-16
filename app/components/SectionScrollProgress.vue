<script setup lang="ts">
const progress = ref(0)
const trackerRef = useTemplateRef('tracker')

onMounted(() => {
  const tracker = trackerRef.value!
  const section = tracker.parentElement as HTMLElement
  onScroll(() => {
    const trackerRect = tracker.getBoundingClientRect()
    const sectionRect = section.getBoundingClientRect()

    const percentage =
      (trackerRect.top - sectionRect.top) / (sectionRect.height - trackerRect.height)

    progress.value = Math.min(1, Math.max(0, percentage))
  })
})
</script>

<template>
  <div class="wrapper" ref="tracker">
    <div class="indicator" />
  </div>
</template>
<style scoped>
.wrapper {
  position: sticky;
  top: 50dvh;
  height: 26px;
  width: 100%;
  display: flex;
  align-items: center;
}

.indicator {
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
  background-position-x: calc(v-bind(progress) * 100%);
}
</style>
