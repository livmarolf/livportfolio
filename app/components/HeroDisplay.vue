<script setup lang="ts">
import { CanvasAdapter } from '~/lib/adapters/canvas'
import { defineLayer, easing, MatrixDisplay, type Scene } from '~/lib/display'
import {
  mouthClosed,
  mouthClosedLeft,
  mouthOpen,
  mouthOpenLeft,
  pacManGhost,
  pacManGhostAlt,
  pacManGhostAltScared,
  pacManGhostScared,
} from '~/lib/art/pacman'

const getColors = () => {
  const el = document.createElement('div')
  document.body.appendChild(el)
  const getColor = (variable: string) => {
    el.style.color = `var(${variable})`
    return getComputedStyle(el).color
  }

  const colors = {
    BACKGROUND: getColor('--background'),
    STROKE: getColor('--stroke'),
    ITEM_BACKGROUND: getColor('--item-background'),
    TEXT_PRIMARY: getColor('--text-primary'),
    TEXT_SECONDARY: getColor('--text-secondary'),
    TEXT_LABEL: getColor('--text-label'),
    GRAY_SHADOW: getColor('--colors-gray-shadow'),
    GRAY_TRANSITION: getColor('--colors-gray-transition'),
    NEUTRAL: getColor('--colors-neutral'),
    RED: getColor('--colors-red'),
    ORANGE: getColor('--colors-orange'),
    YELLOW: getColor('--colors-yellow'),
    GREEN: getColor('--colors-green'),
    LIGHT_BLUE: getColor('--colors-light-blue'),
    DARK_BLUE: getColor('--colors-dark-blue'),
    PURPLE: getColor('--colors-purple'),
    PINK: getColor('--colors-pink'),
    BRAT: '#8ACE00',
    BRAT_TEXT: '#000',
  }

  document.body.removeChild(el)
  return colors
}

let COLORS = {} as ReturnType<typeof getColors>

const randomColor = () => {
  const colors = [
    'RED',
    'ORANGE',
    'YELLOW',
    'GREEN',
    'LIGHT_BLUE',
    'DARK_BLUE',
    'PURPLE',
    'PINK',
  ] satisfies (keyof typeof COLORS)[]

  const key = colors[Math.round(Math.random() * colors.length)]!
  return COLORS[key]
}

const mode = useColorMode()

watch(mode, () => {
  queueMicrotask(() => (COLORS = getColors()))
})

const canvas = useTemplateRef('canvas')

const RIBBON_SIZE = (width: number) => Math.floor(width / 3)
const generateRibbon = (width: number, height: number) => {
  const y = [Math.floor(height * Math.random())]

  for (let x = 1; x < width; x++) {
    const dir = Math.random() > 0.5 ? 1 : -1
    const nextY = y[x - 1]! + dir
    y.push(Math.min(height - 1, Math.max(0, nextY)))
  }

  return y
}

const countDown: Scene = [
  {
    duration: 6000,
    render(t) {
      this.text.box(
        ...this.center,
        [
          Math.floor((1 - t) * 6)
            .toString()
            .padStart(2, '0'),
        ],
        { fill: COLORS.TEXT_PRIMARY }
      )
    },
  },
]

const start = [
  defineLayer({
    duration: 2000,
    render(t) {
      const show = Math.ceil(t * 5) % 2

      this.text.box(...this.center, ['[start]' /*  : '[          ]' */], {
        fill: show ? COLORS.GREEN : COLORS.TEXT_SECONDARY,
      })
    },
  }),
]

const rippleAndName: Scene = [
  defineLayer({
    duration: 3000,
    offset: 1300,
    render() {
      return this.text.box(...this.center, ['OLIVIA', 'MAROLF'], { fill: COLORS.TEXT_PRIMARY })
    },
  }),
  defineLayer({
    duration: 2000,
    offset: 1300,
    store() {
      return { states: [] as (number | 'on')[], colors: new Map<number, string>() }
    },
    render(t, store) {
      // Store the pixels that were drawn in the previous layer
      const pixels = Array.from(
        this.pixels().filter((p) => this.get(p).fill === COLORS.TEXT_PRIMARY)
      )

      const shownPixelCount = Math.round(t * pixels.length)

      if (shownPixelCount > pixels.length) return

      store.states = store.states.map((s) => {
        if (typeof s !== 'number') return s
        if (s > 5) return 'on'
        return s + 1
      })

      const numberOfPreviouslyShownPixels = store.states.filter((s) => !!s).length
      const remainingPixelCount = shownPixelCount - numberOfPreviouslyShownPixels

      for (let i = 0; i < remainingPixelCount; i++) {
        const remainingPixels = pixels.map((_, i) => i).filter((i) => !store.states[i])

        const i = Math.round(Math.random() * Math.max(0, remainingPixels.length - 1))

        store.states[remainingPixels[i]!] = 1
      }

      for (let i = 0; i < pixels.length; i++) {
        if (!store.states[i]) this.set(pixels[i]!, { fill: 'transparent' })
        if (typeof store.states[i] === 'number') {
          if (!store.colors.has(i)) store.colors.set(i, randomColor())

          this.set(pixels[i]!, { fill: store.colors.get(i) })
        }
      }
    },
  }),
  defineLayer({
    duration() {
      return Math.min(3000, this.width * 70)
    },
    render(t) {
      const [cX, cY] = this.center
      const eT = easing.easeOutCubic(t)
      const r = eT * ((this.width + 10) / 2)

      for (let theta = 0; theta < 360; theta += 1) {
        const x = Math.round(r * Math.cos(theta))
        const y = Math.round(r * Math.sin(theta))
        this.set(cX + x, cY + y, { fill: COLORS.TEXT_PRIMARY })
      }
    },
  }),
  defineLayer({
    duration() {
      return Math.min(3000, this.width * 70)
    },
    offset: 300,
    render(t) {
      const [cX, cY] = this.center

      const eT = easing.easeOutCubic(t)

      const r = eT * ((this.width + 10) / 2)

      for (let theta = 0; theta < 360; theta += 1) {
        const x = Math.round(r * Math.cos(theta))
        const y = Math.round(r * Math.sin(theta))
        this.set(cX + x, cY + y, { fill: COLORS.TEXT_SECONDARY })
      }
    },
  }),
  defineLayer({
    duration() {
      return Math.min(3000, this.width * 70)
    },
    offset: 600,
    render(t) {
      const [cX, cY] = this.center
      const eT = easing.easeOutCubic(t)
      const r = eT * ((this.width + 10) / 2)

      for (let theta = 0; theta < 360; theta += 1) {
        const x = Math.round(r * Math.cos(theta))
        const y = Math.round(r * Math.sin(theta))
        this.set(cX + x, cY + y, { fill: COLORS.GRAY_SHADOW })
      }
    },
  }),
]

const easings = [
  easing.linear,
  easing.easeInQuint,
  easing.easeInSine,
  easing.easeInCubic,
  easing.easeInCirc,
  easing.easeInQuad,
  easing.easeInQuart,
  easing.easeInExpo,
]

const brat = [
  defineLayer({
    duration: 800,
    store() {
      const columnEasing = []

      for (let x = 0; x < this.width; x++)
        columnEasing.push(easings[Math.floor(Math.random() * easings.length)])

      return { columnEasing }
    },
    render(t, store) {
      for (let x = 0; x < this.width; x++) {
        const ease = store.columnEasing[x]!

        for (let y = 0; y < this.height; y++) {
          if (this.height - y <= this.height * ease(t)) this.set(x, y, { fill: COLORS.BRAT })
        }
      }
    },
  }),
  defineLayer({
    duration: 2000 + 800,
    offset: 800,
    render() {
      this.pixels().forEach((p) => this.set(p, { fill: COLORS.BRAT }))
    },
  }),
  defineLayer({
    duration: 500,
    offset: 800,
    overshoot: true,
    render(t) {
      const centerText = 'uxd'.substring(0, Math.floor(t * 2))
      this.text.box(...this.center, [centerText], { fill: COLORS.BRAT_TEXT })
    },
  }),
  defineLayer({
    duration: 800,
    offset: 800 + 2000,
    store() {
      const columnEasing = []

      for (let x = 0; x < this.width; x++)
        columnEasing.push(easings[Math.floor(Math.random() * easings.length)])

      return { columnEasing }
    },
    render(t, store) {
      for (let x = 0; x < this.width; x++) {
        const ease = store.columnEasing[x]!

        for (let y = 0; y < this.height; y++) {
          if (this.height - y <= this.height * ease(t)) this.set(x, y, { fill: 'transparent' })
        }
      }
    },
  }),
]

const pacman: Scene = [
  defineLayer({
    duration() {
      return this.width * 50
    },
    render(t) {
      const pacmanWidth = this.text.glyphWidth(mouthOpen)
      const ghostWidth = this.text.glyphWidth(pacManGhost)
      const gap = 7

      const pacmanX = Math.floor((this.width + pacmanWidth + ghostWidth + gap) * t)
      const [, y] = this.center

      for (let dotX = 0; dotX < this.width; dotX += 7) {
        if (dotX > pacmanX - 3) {
          this.set(dotX, y, { fill: COLORS.TEXT_PRIMARY })
        }
      }

      const pacManGlyph = Math.abs(pacmanX) % 16 < 8 ? mouthOpen : mouthClosed

      this.text.glyph(pacmanX, y, pacManGlyph, { fill: COLORS.YELLOW }, ['right', 'center'])
      return pacmanX - pacmanWidth - gap
    },
  }),
  defineLayer({
    duration() {
      return this.width * 50
    },
    render(_, __, pacmanX) {
      const [, y] = this.center

      const ghostGlyph = Math.abs(pacmanX) % 16 < 8 ? pacManGhost : pacManGhostAlt

      this.text.glyph(pacmanX, y, ghostGlyph, {}, ['right', 'center'])
    },
  }),
  defineLayer({
    duration() {
      return this.width * 25
    },
    render(t) {
      const wipePoint = Math.floor(t * this.width)
      const [, y] = this.center

      for (let x = wipePoint; x < this.width; x++) {
        this.set(x, y, { fill: 'transparent' })
      }
    },
  }),
]

const pacmanReturns = [
  defineLayer({
    duration() {
      return this.width * 50
    },
    render(t) {
      const pacmanWidth = this.text.glyphWidth(mouthOpenLeft)
      const ghostWidth = this.text.glyphWidth(pacManGhostScared)
      const gap = 7

      const pacmanX = Math.floor((this.width + (pacmanWidth + ghostWidth + gap)) * (1 - t))
      const [, y] = this.center

      const pacmanGlyph = Math.abs(pacmanX) % 16 < 8 ? mouthOpenLeft : mouthClosedLeft

      this.text.glyph(pacmanX, y, pacmanGlyph, { fill: COLORS.YELLOW }, ['right', 'center'])

      return pacmanX - pacmanWidth - gap
    },
  }),
  defineLayer({
    duration() {
      return this.width * 50
    },
    render(_, __, ghostX) {
      const ghostGlyph = Math.abs(ghostX) % 16 < 8 ? pacManGhostScared : pacManGhostAltScared
      const [, y] = this.center

      this.text.glyph(ghostX, y, ghostGlyph, {}, ['right', 'center'])
    },
  }),
]

const a11yMatters = [
  defineLayer({
    duration: 3000,
    render(t) {
      const text = 'a11y matters'
      const [, charHeight] = this.text.measure(text)
      const f = (_t: number) => Math.sin(Math.PI * _t)
      const c = f(t)

      const color = mode.value === 'light' ? 36 : 227

      this.text.box(this.center[0], this.center[1] - charHeight - 1, [text], {
        fill: `rgba(${color}, ${color}, ${color}, ${c})`,
      })
      this.text.box(...this.center, [text], {
        fill: `rgba(${color}, ${color}, ${color}, ${c * c * 0.5})`,
      })

      this.text.box(this.center[0], this.center[1] + charHeight + 1, [text], {
        fill: `rgba(${color}, ${color}, ${color}, ${c * c * c * 0.1})`,
      })
    },
  }),
]

const pixelPerfect = [
  defineLayer({
    duration: 4000,
    render() {
      const [strWidth] = this.text.measure('perfect')
      const [perfecWidth] = this.text.measure('perfec')

      const textStart = this.center[0] - Math.floor(strWidth / 2)

      this.text.box(
        textStart,
        this.center[1] - 1,
        ['pixel'],
        {
          fill: COLORS.TEXT_PRIMARY,
        },
        ['left', 'bottom']
      )

      this.text.box(
        textStart,
        this.center[1],
        ['perfec'],
        {
          fill: COLORS.TEXT_PRIMARY,
        },
        ['left', 'top']
      )

      this.text.box(
        textStart + perfecWidth + 1,
        this.center[1] + 1,
        ['t'],
        {
          fill: COLORS.TEXT_PRIMARY,
        },
        ['left', 'top']
      )
    },
  }),
  defineLayer({
    duration: 2000,
    store() {
      const colors = [] as string[]
      const delays = [] as number[]

      for (let x = 0; x < this.width; x++) {
        colors[x] = randomColor()
        delays[x] = Math.random() * 500
      }

      return { colors, delays }
    },
    render(t, store) {
      for (let x = 0; x < this.width; x++) {
        const delay = store.delays[x]!
        const currentTime = t * 1000

        const localTime = Math.max(0, currentTime - delay)
        const localT = localTime / 500

        for (let y = 0; y < this.height; y++) {
          const yCutoff = this.height * easing.easeInSine(localT)

          if (y <= yCutoff) {
            const fill = y + 1 > yCutoff ? store.colors[x] : this.get(x, y).fill
            this.set(x, y, { fill })
          } else {
            this.set(x, y, { fill: 'transparent' })
          }
        }
      }
    },
  }),
]

let display: MatrixDisplay

onMounted(() => {
  COLORS = getColors()

  display = new MatrixDisplay([
    countDown,
    start,
    rippleAndName,
    pixelPerfect,
    brat,
    pacman,
    a11yMatters,
    pacmanReturns,
  ])

  const adapter = new CanvasAdapter(canvas.value!, {
    gap: 4,
    pixel: 24,
    defaultPixel: {
      fill: 'transparent',
      stroke: 'transparent',
      strokeWidth: 0,
      cornerRadius: 4,
    },
    minWidth: 33,
    height: 27,
  })

  display.connect(adapter)
})

onUnmounted(() => {
  display?.destroy()
})
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped>
canvas {
  width: 100%;
}
</style>
