<script setup lang="ts">
import { Colors, Display, type Scene } from '~/lib/display';
import type { GlyphMatrix } from '~/lib/text/glyphs';

const emit = defineEmits<(e: 'ready') => void>()

const mouthOpen: GlyphMatrix = [
  [2, 0],
  [3, 0],
  [4, 0],
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [0, 2],
  [1, 2],
  [2, 2],
  [0, 3],
  [1, 3],
  [0, 4],
  [1, 4],
  [2, 4],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [5, 5],
  [2, 6],
  [3, 6],
  [4, 6],
]
const mouthClosed: GlyphMatrix = [
  [2, 0],
  [3, 0],
  [4, 0],
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [0, 2],
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
  [0, 3],
  [1, 3],
  [2, 3],
  [3, 3],
  [4, 3],
  [5, 3],
  [6, 3],
  [0, 4],
  [1, 4],
  [2, 4],
  [3, 4],
  [4, 4],
  [5, 4],
  [6, 4],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [5, 5],
  [2, 6],
  [3, 6],
  [4, 6],
]

const textScanOn: Scene = [
  {
    duration: 5000,
    start: 0,
    minResolution: {
      horizontal: 25,
      vertical: 11,
    },
    render() {
      return this.text.box(...this.center, ['OLIVIA', 'MAROLF'], Colors.ON, ['center', 'center'])
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
  },
]

const pacMan: Scene = [
  {
    duration: (width) => {
      return width * 100
    },
    start: 0,
    render(t) {
      const pacManWidth = this.text.glyphWidth(mouthOpen)

      const pacManX = Math.floor((this.width + pacManWidth) * t)
      const [, y] = this.center

      for (let dotX = 0; dotX < this.width; dotX += 7) {
        if (dotX > pacManX - 3) {
          this.set(dotX, y, Colors.ON)
        }
      }

      const pacManGlyph = Math.abs(pacManX) % 4 < 2 ? mouthOpen : mouthClosed

      this.text.glyph(pacManX, y, pacManGlyph, 'yellow', ['right', 'center'])
    },
  },
]

const uxDesigner: Scene = [
  {
    duration: 8000,
    start: 0,
    clip: true,
    minResolution: {
      horizontal: 31,
      vertical: 11,
    },
    render() {
      this.text.box(...this.center, ['UI/UX', 'DESIGNER'], '#fff', ['center', 'center'])
    },
  },
  {
    duration: 5000,
    start: 0,
    render(t) {
      const scanIndex = Math.floor(this.size * t)
      for (let i = 0; i < this.size; i++) {
        if (i < scanIndex) {
          const x = i % this.width
          const colorMix = x / this.width
          const color = this.lerpRGB([182, 37, 128], [0, 131, 178], colorMix)
          if (this.get(i) === Colors.OFF) this.set(i, color)
        }
        if (i === scanIndex) this.set(i, Colors.ON)
        if (i > scanIndex) this.set(i, Colors.OFF)
      }
    },
  },
]

const matrixDisplayEl = useTemplateRef('dot-matrix-display');

onMounted(() => {
  if (!matrixDisplayEl.value) return
  const display = new Display(matrixDisplayEl.value, [textScanOn, pacMan, uxDesigner, pacMan]);
  display.play()
  emit('ready')
})

</script>

<template>
  <div class="dot-matrix-display" ref="dot-matrix-display"></div>
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