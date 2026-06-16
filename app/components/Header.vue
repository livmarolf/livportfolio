<script setup lang="ts">
const { query } = useRoute()

const showResume = 'resume' in query

const mode = useColorMode()
const themeToggle = useTemplateRef('themeToggle')

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target) return (mode.value = 'auto')

  if (themeToggle.value) {
    const rect = themeToggle.value.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    document.documentElement.style.setProperty('--transition-x', `${x}px`)
    document.documentElement.style.setProperty('--transition-y', `${y}px`)
  }

  if (!document.startViewTransition) {
    mode.value = target.value as 'light' | 'dark'
  } else {
    document.startViewTransition(() => {
      mode.value = target.value as 'light' | 'dark'
    })
  }
}

const width = ref(0)
const scrollProgress = ref(0)

const centerY = 5
const amplitude = 1.5
const frequency = 0.3

const pathData = computed(() => {
  const phase = scrollProgress.value * 40
  let points = []

  for (let x = 0; x <= width.value - 4; x++) {
    // Calculate y using the sine formula: y = A*sin(Bx + C) + D
    // B = frequency (controls wave density)
    // x * frequency converts pixel position to radians for the sine function
    const angle = x * frequency + phase
    const y = centerY - amplitude * Math.sin(angle)

    points.push({ x, y })
  }

  if (!points.length) return ''

  // Start the path at the first point (M = "move to")
  let d = `M ${points[0]!.x},${points[0]!.y}`
  // Add "line to" commands for all remaining points
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i]!.x},${points[i]!.y}`
  }

  return d
})

const updateWidth = () => {
  width.value = (window.visualViewport?.width ?? 0) - 8
}

onMounted(() => {
  onScroll(() => {
    scrollProgress.value =
      window.scrollY /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight)
  })

  window.addEventListener('resize', updateWidth)
  updateWidth()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

const progressColor = computed(() =>
  scrollProgress.value > 0.999 ? 'var(--colors-green)' : 'var(--text-primary)'
)
</script>

<template>
  <header class="page-header mono">
    <svg
      class="logo"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 5.95745C0 2.66724 2.66724 0 5.95745 0H34.0432C37.3334 0 40.0006 2.66724 40.0006 5.95745V34.0432C40.0006 37.3334 37.3334 40.0006 34.0432 40.0006H5.95745C2.66724 40.0006 0 37.3334 0 34.0432V5.95745Z"
        fill="var(--colors-neutral)" />
      <path
        d="M24.4023 22.3428C24.3968 23.4775 23.4783 24.3959 22.3437 24.4014L19.5777 24.4147C16.1721 24.4311 14.4791 28.52 16.8748 30.9157L18.5383 32.5792C19.3461 33.387 20.6558 33.387 21.4636 32.5792L32.5801 21.4628C33.3879 20.6549 33.3879 19.3452 32.5801 18.5374L27.9671 13.9244C26.6673 12.6247 24.4447 13.539 24.4358 15.3771L24.4023 22.3428Z"
        fill="var(--background)" />
      <path
        d="M15.5975 17.6573C15.603 16.5227 16.5214 15.6043 17.6561 15.5988L20.4221 15.5855C23.8276 15.569 25.5207 11.4802 23.125 9.08445L21.4615 7.42098C20.6537 6.61316 19.344 6.61316 18.5361 7.42098L7.41972 18.5374C6.6119 19.3452 6.6119 20.655 7.41972 21.4628L12.0327 26.0758C13.3324 27.3755 15.5551 26.4611 15.5639 24.6231L15.5975 17.6573Z"
        fill="var(--background)" />
    </svg>

    <nav>
      <ul>
        <li><a href="#">Case Studies</a></li>
        <li><a href="#">Articles</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Gallery</a></li>
      </ul>
    </nav>

    <div class="socials-and-theme">
      <ul>
        <li>
          <NuxtLink href="https://www.linkedin.com/in/oliviamarolf/" target="_blank">
            LinkedIn
            <NewTabIcon />
          </NuxtLink>
        </li>
        <li v-if="showResume">
          <NuxtLink href="/resume.pdf" target="_blank">
            Resume
            <NewTabIcon />
          </NuxtLink>
        </li>
      </ul>
      <div ref="themeToggle" role="radiogroup" aria-label="Toggle theme" class="theme-toggle">
        <label aria-label="light" class="light-btn">
          <input
            @change="handleChange"
            type="radio"
            value="light"
            name="theme-toggle"
            id="theme-toggle-light" />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="4" stroke="var(--text-primary)" />
            <path d="M12 2.00055V6.00055" stroke="var(--text-primary)" stroke-linecap="round" />
            <path d="M12 17.9997V21.9997" stroke="var(--text-primary)" stroke-linecap="round" />
            <path d="M18 12.0003H22" stroke="var(--text-primary)" stroke-linecap="round" />
            <path d="M2 11.9995H6" stroke="var(--text-primary)" stroke-linecap="round" />
            <path
              d="M6.34375 6.34314L7.75796 7.75735"
              stroke="var(--text-primary)"
              stroke-linecap="round" />
            <path
              d="M16.2422 16.2426L17.6564 17.6569"
              stroke="var(--text-primary)"
              stroke-linecap="round" />
            <path
              d="M16.2422 7.75735L17.6564 6.34314"
              stroke="var(--text-primary)"
              stroke-linecap="round" />
            <path
              d="M6.34375 17.6569L7.75796 16.2426"
              stroke="var(--text-primary)"
              stroke-linecap="round" />
          </svg>
        </label>
        <label aria-label="dark" class="dark-btn">
          <input
            @change="handleChange"
            type="radio"
            value="dark"
            name="theme-toggle"
            id="theme-toggle-dark" />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14 20C15.407 20 16.7292 19.6368 17.8779 18.999C14.0682 18.9338 11 15.8252 11 12C11 8.17479 14.0682 5.06621 17.8779 5.00104C16.7292 4.36323 15.407 4 14 4C9.58172 4 6 7.58172 6 12C6 16.4183 9.58172 20 14 20Z"
              stroke="var(--text-primary)"
              stroke-linejoin="round" />
          </svg>
        </label>
      </div>
    </div>
    <div class="scroll-progress">
      <div class="border" />
      <svg
        :width="width"
        height="10"
        :viewBox="`0 0 ${width} 10`"
        xmlns="http://www.w3.org/2000/svg">
        <path
          pathLength="1"
          stroke-dasharray="1"
          :stroke-dashoffset="1 - scrollProgress"
          :d="pathData"
          fill="none"
          :stroke="progressColor"
          stroke-width="4"
          stroke-linecap="round"
          transform="translate(2, 0)" />
      </svg>
    </div>
  </header>
</template>
<style>
.light .light-btn {
  background: var(--colors-yellow);
}

.dark .dark-btn {
  background: var(--colors-dark-blue);
}

.page-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 60px 20px 120px;
  z-index: 99999999;

  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;

  background: color-mix(in srgb, transparent 10%, var(--background));
  backdrop-filter: blur(8px);
  /* border-bottom: 4px solid var(--item-background); */
  font-size: 16px;
  line-height: 100%;
  text-transform: uppercase;

  color: var(--text-primary);

  a {
    color: inherit;
    text-decoration: none;
    /* account for the weird cap height of the font */
    transform: translateY(-1px);
  }

  nav {
    display: flex;
    gap: 20px;

    ul,
    li {
      display: contents;
    }
  }

  .socials-and-theme {
    display: flex;
    align-items: center;
    gap: 20px;

    a {
      display: flex;
      align-items: end;
      gap: 8px;
    }

    .theme-toggle {
      display: grid;
      grid-template: 1fr / 1fr 1fr;
      background: var(--item-background);
      border: 1px solid var(--stroke);
      border-radius: 999px;
      padding: 1px;

      view-transition-name: theme-toggle;

      label {
        display: grid;
        place-items: center;
        padding: 2px 10px;
        border-radius: 999px;
        cursor: pointer;

        &:has(:focus-visible) {
          outline: 2px solid currentColor;
        }

        input {
          position: absolute;
          opacity: 0;
          outline: none;
          pointer-events: none;
        }

        &:has(:checked) {
          &.light-btn {
            background: var(--colors-yellow);
          }
          &.dark-btn {
            background: var(--colors-dark-blue);
          }
        }
      }
    }

    ul,
    li {
      display: contents;
    }
  }

  .scroll-progress {
    position: absolute;
    bottom: 0;
    height: 10px;
    transform: translateY(calc(50% + 2px));
    width: calc(100% - 8px);
    margin-left: 4px;
    overflow: hidden;

    .border {
      position: absolute;
      right: 0;
      /* centered with the wave */
      top: 50%;
      transform: translateY(-50%);
      height: 4px;
      width: calc(100% * (1 - v-bind(scrollProgress)) - sign(v-bind(scrollProgress)) * 8px);
      border-radius: 4px;
      background: var(--stroke);
    }

    svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
