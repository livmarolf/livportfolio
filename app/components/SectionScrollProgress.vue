<script setup lang="ts">
const progress = ref(0)
const trackerRef = useTemplateRef('tracker')
const indicatorRef = useTemplateRef('indicator')
const visible = ref(true)

onMounted(() => {
  visible.value = window.innerWidth >= 760
  const tracker = trackerRef.value!
  const indicator = indicatorRef.value!
  const section = tracker.parentElement as HTMLElement
  const trackerHeight = tracker.offsetHeight

  if (CSS.supports('animation-timeline: view()')) {
    section.style.viewTimelineName = '--section-scroll'

    const updateRange = () => {
      const sectionHeight = section.offsetHeight
      const vh = window.innerHeight
      const total = vh + sectionHeight
      const startPct = (vh / 2 / total) * 100
      const endPct = ((vh / 2 + sectionHeight - trackerHeight) / total) * 100
      indicator.style.animationRangeStart = `cover ${startPct}%`
      indicator.style.animationRangeEnd = `cover ${endPct}%`

      visible.value = window.innerWidth >= 760
    }

    const ro = new ResizeObserver(updateRange)
    ro.observe(section)
    window.addEventListener('resize', updateRange)
    updateRange()

    onUnmounted(() => {
      section.style.viewTimelineName = ''
      ro.disconnect()
      window.removeEventListener('resize', updateRange)
    })
  } else {
    let sectionTop = 0
    let sectionHeight = 0

    const updateLayout = () => {
      sectionTop = section.getBoundingClientRect().top + window.scrollY
      sectionHeight = section.offsetHeight
    }

    const ro = new ResizeObserver(updateLayout)
    ro.observe(section)
    updateLayout()

    onUnmounted(() => ro.disconnect())

    onScroll(() => {
      const percentage =
        (window.innerHeight / 2 - sectionTop + window.scrollY) / (sectionHeight - trackerHeight)

      progress.value = Math.min(1, Math.max(0, percentage))
    })
  }
})
</script>

<template>
  <div class="wrapper" ref="tracker" v-if="visible">
    <div class="indicator" ref="indicator" />
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
  contain: strict;

  @media (width < 760px) {
    display: none;
  }
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

@keyframes track-scroll-progress {
  from {
    background-position-x: 0%;
  }
  to {
    background-position-x: 100%;
  }
}

@supports (animation-timeline: view()) {
  .indicator {
    animation: track-scroll-progress linear both;
    animation-timeline: --section-scroll;
  }
}
</style>
