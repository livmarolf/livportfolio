import { Adapter, SKIP, type Frame, type Pixel } from '../display.js'

export class CanvasAdapter implements Adapter {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private resizeObserver: ResizeObserver
  private intersectionObserver: IntersectionObserver
  private prevWindowWidth = -1

  onResize?: (width: number, height: number, cleanBuffer: Frame) => void
  canCommitFrame = true

  style: {
    gap: number
    pixel: number
    defaultPixel: Pixel
    minWidth: number
    // Internal
    width: number
    height: number
  }
  private pixelSize: number = 0
  private gap: number = 0

  constructor(canvas: HTMLCanvasElement, style: Omit<CanvasAdapter['style'], 'width'>) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Failed to get canvas context')
    this.ctx = ctx

    this.style = style as CanvasAdapter['style']

    this.resizeObserver = new ResizeObserver(() => {
      if (this.prevWindowWidth === window.innerWidth) return

      this.prevWindowWidth = window.innerWidth

      this.reflow()
    })

    this.resizeObserver.observe(document.documentElement)

    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.canCommitFrame = entries[0]?.isIntersecting ?? true
    })

    this.intersectionObserver.observe(this.canvas)
  }

  reflow() {
    const { pixel, gap } = this.style
    const r = this.canvas.getBoundingClientRect()
    const cssWidth = r.width
    const width = cssWidth * window.devicePixelRatio

    const gapRatio = gap / pixel

    // How many matrix pixels fit at the requested pixelSize?
    // n pixels need: n * pixelSize + (n - 1) * gap  <=  cssWidth
    // => n <= (cssWidth + gap) / (pixelSize + gap)
    let cols = Math.floor((cssWidth + gap) / (pixel + gap))

    if (cols < this.style.minWidth) {
      cols = this.style.minWidth
    }

    // Stretch pixels to fill the full canvas width exactly.
    // total = n * p + (n-1) * p*r = p * (n + (n-1)*r)  =>  p = width / (n + (n-1)*r)
    const adjustedPixel = width / (cols + (cols - 1) * gapRatio)

    this.pixelSize = adjustedPixel
    this.gap = adjustedPixel * gapRatio

    this.canvas.width = width
    this.canvas.height = Math.ceil(
      this.pixelSize * this.style.height + this.gap * (this.style.height - 1)
    )

    this.previousRender = []

    this.style.width = cols
    this.previousRender = new Array(cols * this.style.height)

    const cleanBuffer = new Array(cols * this.style.height).fill(this.style.defaultPixel)
    this.render(cleanBuffer)
    this.onResize?.(this.style.width, this.style.height, cleanBuffer)
  }

  private previousRender: Frame = []

  render(buffer: Frame) {
    const { width } = this.style

    for (let i = 0; i < buffer.length; i++) {
      const pixel = buffer[i]!
      const prevPixel = this.previousRender[i]

      if (
        prevPixel &&
        pixel.fill === prevPixel.fill &&
        pixel.stroke === prevPixel.stroke &&
        pixel.cornerRadius === prevPixel.cornerRadius &&
        pixel.strokeWidth === prevPixel.strokeWidth &&
        pixel.draw === prevPixel.draw
      )
        continue

      this.previousRender[i] = buffer[i]!

      const { fill, stroke, cornerRadius, draw } = pixel as Required<Pixel>
      const strokeWidth = (pixel as Required<Pixel>).strokeWidth * window.devicePixelRatio
      const strokeOffset = strokeWidth / 2
      const x = i % width
      const y = Math.floor(i / width)

      const pixelAndGap = this.pixelSize + this.gap
      const ctxX = x * pixelAndGap
      const ctxY = y * pixelAndGap

      this.ctx.clearRect(ctxX - this.gap / 2, ctxY - this.gap / 2, pixelAndGap, pixelAndGap)

      if (typeof draw === 'function') {
        this.ctx.save()

        this.ctx.fillStyle = fill
        this.ctx.strokeStyle = stroke
        this.ctx.lineWidth = strokeWidth

        this.ctx.translate(ctxX + strokeOffset, ctxY + strokeOffset)
        this.ctx.beginPath()

        const skip = draw.call(this.ctx, this.pixelSize - strokeWidth, i)

        if (skip === SKIP) {
          this.ctx.restore()
          continue
        }

        this.ctx.fill()
        if (stroke && strokeWidth) this.ctx.stroke()

        this.ctx.restore()
      } else if (stroke && strokeWidth) {
        this.ctx.fillStyle = fill
        this.ctx.strokeStyle = stroke
        this.ctx.lineWidth = strokeWidth
        this.ctx.beginPath()

        if (cornerRadius > 0) {
          this.ctx.roundRect(
            ctxX + strokeOffset,
            ctxY + strokeOffset,
            this.pixelSize - strokeWidth,
            this.pixelSize - strokeWidth,
            cornerRadius
          )
        } else {
          this.ctx.rect(
            ctxX + strokeOffset,
            ctxY + strokeOffset,
            this.pixelSize - strokeWidth,
            this.pixelSize - strokeWidth
          )
        }

        this.ctx.fill()
        this.ctx.stroke()
      } else {
        this.ctx.fillStyle = fill
        this.ctx.beginPath()

        if (cornerRadius > 0) {
          this.ctx.roundRect(ctxX, ctxY, this.pixelSize, this.pixelSize, cornerRadius)
        } else {
          this.ctx.rect(ctxX, ctxY, this.pixelSize, this.pixelSize)
        }

        this.ctx.fill()
      }
    }
  }

  disconnect() {
    this.resizeObserver.disconnect()
    this.intersectionObserver.disconnect()
    this.canvas = null as any
  }
}
