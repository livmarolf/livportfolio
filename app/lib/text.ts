import type { MatrixDisplay, Pixel } from './display.js'
import { type GlyphMatrix, SPACE_WIDTH, getGlyphMatrix } from './glyphs.js'

type HorizontalAlignment = 'left' | 'center' | 'right'
type VerticalAlignment = 'top' | 'center' | 'bottom'

export class TextRenderer {
  KERNING = 1
  LINE_SPACING = 1

  private display: MatrixDisplay

  constructor(display: MatrixDisplay) {
    this.display = display
  }

  glyphWidth = (glyph: GlyphMatrix) =>
    !glyph.length ? SPACE_WIDTH : Math.max(...glyph.map(([x]) => x)) + 1

  glyphHeight = (glyph: GlyphMatrix) => Math.max(...glyph.map(([, y]) => y)) + 1

  measure(str: string): [number, number] {
    return (
      str.split('').reduce(
        (sum, glyph, i) => {
          const matrix = getGlyphMatrix(glyph)

          const width = this.glyphWidth(matrix)
          const height = this.glyphHeight(matrix)

          return [sum[0]! + width + (i > 0 ? SPACE_WIDTH : 0), Math.max(sum[1]!, height)]
        },
        [0, 0]
      ) ?? [0, 0]
    )
  }

  glyph(
    x: number,
    y: number,
    glyph: string | GlyphMatrix,
    color: Pixel | ((this: MatrixDisplay, x: number, y: number) => Pixel),
    alignment: [HorizontalAlignment, VerticalAlignment] = ['left', 'top']
  ) {
    const matrix = typeof glyph === 'string' ? getGlyphMatrix(glyph) : glyph

    const width = this.glyphWidth(matrix)
    const height = this.glyphHeight(matrix)

    const horizontalAlignments = {
      left: 0,
      center: Math.floor(width / 2),
      right: width,
    }

    const verticalAlignments = {
      top: 0,
      center: Math.floor(height / 2),
      bottom: height,
    }

    for (const [xOffset, yOffset, bg = color] of matrix) {
      const gX = x + (xOffset - horizontalAlignments[alignment[0]])
      const gY = y + (yOffset - verticalAlignments[alignment[1]])
      this.display.set(gX, gY, typeof bg === 'function' ? bg.call(this.display, gX, gY) : bg)
    }

    return [width, height] as const
  }

  string(
    str: string | GlyphMatrix[],
    color: Pixel | ((this: MatrixDisplay, x: number, y: number) => Pixel),
    x = this.display.center[0],
    y = this.display.center[1],
    alignment: [HorizontalAlignment, VerticalAlignment] = ['center', 'center']
  ) {
    const glyphs = typeof str === 'string' ? str.split('').map(getGlyphMatrix) : str

    const width =
      glyphs.reduce((a, b) => a + this.glyphWidth(b), 0) + (str.length - 1) * this.KERNING
    const height = Math.max(...glyphs.map(this.glyphHeight))

    const horizontalAlignments = {
      left: 0,
      center: Math.floor(width / 2),
      right: width,
    }

    let cursor = x - horizontalAlignments[alignment[0]]

    for (const glyph of glyphs) {
      const [w] = this.glyph(cursor, y, glyph, color, ['left', alignment[1]])

      cursor += w + this.KERNING
    }

    return [width, height] as const
  }

  box(
    x: number,
    y: number,
    lines: string[],
    color: Pixel | ((this: MatrixDisplay, x: number, y: number) => Pixel),
    alignment: [HorizontalAlignment, VerticalAlignment] = ['center', 'center']
  ) {
    const strings = lines.map((line) => line.split('').map(getGlyphMatrix))

    const width = Math.max(
      ...strings.map(
        (str) => str.reduce((w, g) => w + this.glyphWidth(g), 0) + (str.length - 1) * this.KERNING
      )
    )
    const height =
      strings.reduce((h, s) => h + Math.max(...s.map(this.glyphHeight)), 0) +
      (strings.length - 1) * this.LINE_SPACING

    const verticalAlignments = {
      top: 0,
      center: Math.floor(height / 2),
      bottom: height,
    }

    let cursor = y - verticalAlignments[alignment[1]]

    for (const str of strings) {
      const [, h] = this.string(str, color, x, cursor, [alignment[0], 'top'])

      cursor += h + this.LINE_SPACING
    }

    return [width, height] as const
  }
}
