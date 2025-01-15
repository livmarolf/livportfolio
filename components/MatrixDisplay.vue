<script setup lang="ts">
import { Colors, Display, type Scene } from '~/lib/display';
import { mouthClosed, mouthOpen, pacManGhost, pacManGhostAlt } from '~/lib/text/art';

const emit = defineEmits<(e: 'ready') => void>()



const oliviaMarolf: Scene = [
  {
    duration: 3000,
    start: 0,
    minResolution: {
      horizontal: 25,
      vertical: 17,
    },
    render() {
      return this.text.box(...this.center, ['OLIVIA', 'MAROLF'], Colors.ON, ['center', 'center'])
    },
  },
  {
    duration: 2000,
    start: 0,
    initializeStore() {
      return { states: [], pixels: [] }
    },
    render(t, _, store: { states: ('on' | number)[], pixels: number[] }) {
      if (!store.pixels.length) {
        for (let i = 0; i < this.size; i++)
          if (this.get(i) === Colors.ON)
            store.pixels.push(i)
      }

      const shownPixelCount = Math.round(t * store.pixels.length)

      if (shownPixelCount > store.pixels.length) return;

      store.states = store.states.map((s) => {
        if (typeof s !== 'number') return s
        if (s > 5) return 'on'
        return s + 1
      })

      const numberOfPreviouslyShownPixels = store.states.filter((s) => !!s).length
      const remainingPixelCount = shownPixelCount - numberOfPreviouslyShownPixels

      for (let i = 0; i < remainingPixelCount; i++) {
        const remainingPixels = store.pixels.map((_, i) => i).filter(i => !store.states[i])

        const i = Math.round(Math.random() * Math.max(0, remainingPixels.length - 1))

        store.states[remainingPixels[i]] = 1
      }

      for (let i = 0; i < store.pixels.length; i++) {
        if (!store.states[i]) this.set(store.pixels[i], Colors.OFF)
        if (typeof store.states[i] === 'number') this.set(store.pixels[i], '#6e67ff')
      }
    },
  }
]

const pacMan: Scene = [
  {
    duration: (width) => width * 75,
    start: 0,
    render(t) {
      const pacManWidth = this.text.glyphWidth(pacManGhost)

      const pacManX = Math.floor((this.width + pacManWidth) * t)
      const [, y] = this.center

      for (let dotX = 0; dotX < this.width; dotX += 7) {
        if (dotX > pacManX - 3) {
          this.set(dotX, y, Colors.ON)
        }
      }

      const pacManGlyph = Math.abs(pacManX) % 4 < 2 ? mouthOpen : mouthClosed

      this.text.glyph(pacManX, y, pacManGlyph, 'yellow', ['right', 'center'])
      return [pacManX]
    },
  },
  {
    duration: 1000,
    clip: true,
    start: 0,
    render(t) {
      const wipePoint = Math.floor(t * this.width)
      const [, y] = this.center

      for (let x = wipePoint; x < this.width; x++) {
        this.set(x, y, Colors.OFF)
      }
    },
  },
  {
    duration: (width) => width * 75,
    start: 1000,
    render(_, pacManX) {
      const [, y] = this.center

      const ghostGlyph = Math.abs(pacManX) % 4 < 2 ? pacManGhost : pacManGhostAlt

      this.text.glyph(pacManX - 14, y, ghostGlyph, 'none', ['right', 'center'])
    }
  }
]

const uxDesigner: Scene = [
  {
    duration: (width) => width * 100 + 1500,
    start: 0,
    clip: true,
    minResolution: {
      horizontal: 31,
      vertical: 11,
    },
    render() {
      this.text.box(...this.center, ['UI/UX', 'DESIGNER'], '#fff', ['center', 'center'])

      for (let i = 0; i < this.size; i++) {
        const x = i % this.width
        const colorMix = x / this.width
        const color = this.lerpRGB([0, 181, 218], [45, 216, 103], colorMix)

        if (this.get(i) === '#fff') this.set(i, color)
      }
    },
  },
  {
    duration: (width) => width * 50,
    start: 0,
    render(t) {
      const [, cY] = this.center

      const x = Math.floor(t * this.width)

      for (let y = 0; y < this.height; y++) {
        const colorMix = x / this.width
        const color = this.lerpRGB([0, 181, 218], [45, 216, 103], colorMix)

        const adjustedY = y - cY

        const xOffset = Math.abs(adjustedY)

        this.set(x - xOffset, y, (x - xOffset) % 2 === 0 ? color : Colors.OFF)

        for (let wiperX = (x - xOffset) + 1; wiperX < this.width; wiperX++) {
          this.set(wiperX, y, Colors.OFF)
        }
      }
    }
  },
  {
    duration: (width) => width * 50,
    start: (width) => (width * 50) + 1000,
    render(t) {
      const [, cY] = this.center

      const x = this.width - Math.floor(t * this.width)

      for (let y = 0; y < this.height; y++) {
        const colorMix = x / this.width
        const color = this.lerpRGB([0, 181, 218], [45, 216, 103], colorMix)

        const adjustedY = y - cY

        const xOffset = Math.abs(adjustedY)

        this.set(x + xOffset, y, (x + xOffset) % 2 === 0 ? color : Colors.OFF)

        for (let wiperX = (x + xOffset) + 1; wiperX <= this.width; wiperX++) {
          this.set(wiperX, y, Colors.OFF)
        }
      }
    }
  }
]

const a11yFocused: Scene = [
  {
    duration: 5000,
    start: 0,
    minResolution: {
      horizontal: 29,
      vertical: 11,
    },
    render() {
      return this.text.box(...this.center, ["a11y", "matters"], Colors.ON, ['center', 'center'])
    },
  },
  {
    duration: 3000,
    start: 0,
    render(t, [width, height]: [number, number]) {
      const scanIndex = Math.floor(width * height * t)

      const originX = this.center[0] - Math.floor(width / 2)
      const originY = this.center[1] - Math.floor(height / 2)

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const idx = x + y * width

          if (idx === scanIndex) {
            this.set(originX + x, originY + y, Colors.ON)
          }

          if (idx > scanIndex) {
            this.set(originX + x, originY + y, Colors.OFF)
          }
        }
      }
    },
  }
]

function easeOutCubic(x: number): number {
  return 1 - (1 - x) ** 3;
}

const ripple: Scene = [
  {
    duration: (w) => Math.min(5000, w * 100),
    start: 0,
    render(t) {
      const [cX, cY] = this.center
      const eT = easeOutCubic(t)
      const r = eT * ((this.width + 4) / 2)

      for (let theta = 0; theta < 360; theta += 1) {
        const x = Math.round(r * Math.cos(theta))
        const y = Math.round(r * Math.sin(theta))
        this.set(cX + x, cY + y, '#00b5da')
      }
    },
  },
  {
    duration: (w) => Math.min(5000, w * 100),
    start: 700,
    render(t) {
      const [cX, cY] = this.center

      const eT = easeOutCubic(t)

      const r = eT * ((this.width + 4) / 2)

      for (let theta = 0; theta < 360; theta += 1) {
        const x = Math.round(r * Math.cos(theta))
        const y = Math.round(r * Math.sin(theta))
        this.set(cX + x, cY + y, '#6e67ff')
      }
    },
  },
  {
    duration: (w) => Math.min(5000, w * 100),
    start: 1400,
    render(t) {
      const [cX, cY] = this.center
      const eT = easeOutCubic(t)
      const r = eT * ((this.width + 4) / 2)

      for (let theta = 0; theta < 360; theta += 1) {
        const x = Math.round(r * Math.cos(theta))
        const y = Math.round(r * Math.sin(theta))
        this.set(cX + x, cY + y, '#2DD867')
      }
    },
  }
];


const matrixDisplayEl = useTemplateRef('dot-matrix-display');

onMounted(() => {
  if (!matrixDisplayEl.value) return
  const display = new Display(matrixDisplayEl.value, [oliviaMarolf, uxDesigner, pacMan, a11yFocused, ripple], {
    loopOffset: (w) => -Math.min(4000, 1200 + ((w - 31) * 110)),
  });
  display.playbackControls();
  display.play();
  emit('ready')
})

</script>

<template>
  <canvas class="dot-matrix-display" ref="dot-matrix-display" />
</template>

<style lang="scss">
.dot-matrix-display {
  --pixel-gap: 4px;
  --pixel-border-radius: 4px;
  --border-width: 2px;

  width: 100%;
  display: flex;
  gap: var(--pixel-gap);
  flex-wrap: wrap;

  @media (max-width: 800px) {
    --pixel-gap: 3px;
    --pixel-border-radius: 3px;
  }

  @media (max-width: 600px) {
    --pixel-gap: 1px;
    --pixel-border-radius: 3px;
    --border-width: 1.5px;
  }

  .pixel {
    color: #111111;
    background: currentColor;
    border: var(--border-width) solid #191919;
    border-radius: var(--pixel-border-radius);
    width: var(--size);
    height: var(--size);
  }

  .pixel.on {
    border-color: currentColor;
  }
}
</style>