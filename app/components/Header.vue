<script setup lang="ts">
const { query } = useRoute()

const showResume = 'resume' in query

const mode = useColorMode()
const themeToggle = useTemplateRef('themeToggle')

const handleThemeToggle = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target) return (mode.value = 'auto')

  if (themeToggle.value) {
    const rect = themeToggle.value.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    document.documentElement.style.setProperty('--transition-x', `${x}px`)
    document.documentElement.style.setProperty('--transition-y', `${y}px`)
  }

  document.documentElement.classList.add('theme-view-transition-active')

  await transition(() => (mode.value = target.value as 'light' | 'dark')).finished

  document.documentElement.classList.remove('theme-view-transition-active')
}

const canvasRef = useTemplateRef('progressCanvas')

const centerY = 5
const amplitude = 1.5
const frequency = 0.3

let canvasWidth = 0
let primaryColor = ''
let greenColor = ''
let borderColor = ''

const resolveColors = () => {
  const el = document.createElement('div')
  document.body.appendChild(el)
  const resolve = (variable: string) => {
    el.style.color = `var(${variable})`
    return getComputedStyle(el).color
  }
  primaryColor = resolve('--text-primary')
  greenColor = resolve('--colors-green')
  borderColor = resolve('--stroke')
  document.body.removeChild(el)
}

let ctx: CanvasRenderingContext2D | null = null

const paintWave = () => {
  if (!ctx) return

  const progress =
    window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
  const phase = progress * 40
  const maxX = Math.round(progress * (canvasWidth - 4))

  ctx.clearRect(0, 0, canvasWidth, 10)

  if (maxX > 0) {
    ctx.beginPath()
    for (let x = 0; x <= maxX; x += x < maxX - 10 ? 3 : 1) {
      const y = centerY - amplitude * Math.sin(x * frequency + phase)
      x === 0 ? ctx.moveTo(x + 2, y) : ctx.lineTo(x + 2, y)
    }
    ctx.strokeStyle = progress > 0.999 ? greenColor : primaryColor
    ctx.stroke()
  }

  const lineCapWidth = 3

  const borderWidth = canvasWidth * progress + Math.sign(progress) * 8 + lineCapWidth
  if (canvasWidth - (borderWidth + lineCapWidth) > 0) {
    ctx.beginPath()
    ctx.moveTo(canvasWidth - lineCapWidth, centerY)
    ctx.lineTo(borderWidth, centerY)
    ctx.strokeStyle = borderColor
    ctx.stroke()
  }
}

watch(mode, async () => {
  await nextTick()
  resolveColors()
  paintWave()
})

onMounted(() => {
  const canvas = canvasRef.value!
  ctx = canvas.getContext('2d')!

  resolveColors()

  const updateSize = () => {
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvasWidth = (window.visualViewport?.width ?? 0) - 8
    canvas.width = canvasWidth * dpr
    canvas.height = 10 * dpr
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = '10px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    paintWave()
  }

  window.addEventListener('resize', updateSize)
  updateSize()

  onScroll(paintWave)

  onUnmounted(() => window.removeEventListener('resize', updateSize))
})
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
        <div class="indicator" />
        <label aria-label="light" class="light-btn">
          <input
            @change="handleThemeToggle"
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
            @change="handleThemeToggle"
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
      <!-- <div class="border" ref="border" /> -->
      <canvas ref="progressCanvas" />
    </div>
  </header>
</template>
<style>
.page-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 60px 20px 120px;
  margin-bottom: 6px;
  z-index: 99999999;
  contain: layout;

  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;

  background: color-mix(in srgb, transparent 10%, var(--background));
  backdrop-filter: blur(8px);
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
      position: relative;

      .indicator {
        position: absolute;
        display: grid;
        place-items: center;
        padding: 2px 10px;
        border-radius: 999px;
        cursor: pointer;
        height: 100%;
        width: 50%;
      }

      label {
        display: grid;
        place-items: center;
        padding: 2px 10px;
        border-radius: 999px;
        cursor: pointer;
        position: relative;

        &:has(:focus-visible) {
          outline: 2px solid currentColor;
        }

        input {
          position: absolute;
          opacity: 0;
          outline: none;
          pointer-events: none;
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

    /* .border {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 4px;
      width: 100%;
      border-radius: 4px;
      background: var(--stroke);
    } */

    canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.theme-view-transition-active .page-header .theme-toggle .indicator {
  view-transition-name: theme-toggle;
}
.theme-view-transition-active .page-header .theme-toggle .light-btn {
  view-transition-name: theme-toggle-light-btn;
}
.theme-view-transition-active .page-header .theme-toggle .dark-btn {
  view-transition-name: theme-toggle-dark-btn;
}

.light .page-header .theme-toggle .indicator {
  background: var(--colors-yellow);
  left: 0;
}

.dark .page-header .theme-toggle .indicator {
  background: var(--colors-dark-blue);
  right: 0;
}
</style>
