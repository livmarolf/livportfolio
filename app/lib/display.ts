import { TextRenderer } from './text.js'

export const SKIP = Symbol('SKIP')

export type Layer<S> = {
  duration: number | ((this: MatrixDisplay) => number)
  offset?: number | ((this: MatrixDisplay) => number)
  overshoot?: boolean
  store?: (this: MatrixDisplay, prevValue?: any) => S
  render: (this: MatrixDisplay, t: number, store: S, previousLayerOutput: any) => void
}

export function defineLayer<S>(layer: Layer<S>): Layer<S> {
  return layer
}

export type Scene = Layer<any>[]

export type Pixel = {
  fill?: string
  stroke?: string
  cornerRadius?: number
  strokeWidth?: number
  draw?: (this: CanvasRenderingContext2D, size: number, pixel: number) => void | typeof SKIP
}
export const BASE_PIXEL = {
  fill: 'transparent',
  stroke: 'transparent',
  strokeWidth: 0,
  cornerRadius: 0,
} as const satisfies Pixel
export type Frame = Pixel[]

export abstract class Adapter {
  abstract style: {
    defaultPixel: Pixel
  }
  abstract canCommitFrame: boolean
  abstract onResize?: (width: number, height: number, cleanBuffer: Frame) => void
  abstract reflow(): void
  abstract render(buffer: Frame, width: number, height: number): void
  abstract disconnect(): void
}

export class MatrixDisplay {
  private running = false
  private frameId: number | null = null
  private _adapter: Adapter | null = null
  debug: 'verbose' | 'info' | 'off' = 'off'
  private get adapter() {
    if (!this._adapter) throw new Error('Adapter not connected')
    return this._adapter
  }

  connect(adapter: Adapter) {
    if (this._adapter) throw new Error('Adapter already connected')

    this._adapter = adapter
    this.adapter.onResize = (width, height, cleanBuffer) => {
      this.stop()

      this._width = width
      this._height = height
      this.writeBuffer = cleanBuffer

      this.initStores(true)
      this.start()
    }

    this.adapter.reflow()
    this.initStores()
  }

  private scenes: Scene[]
  private loopOffset = 0
  private onLoop = () => {}

  constructor(scenes: Scene[], options?: { loopOffset?: number; onLoop: () => void }) {
    this.scenes = scenes

    this.loopOffset = options?.loopOffset ?? 0
    if (options?.onLoop) this.onLoop = options.onLoop

    this.render = this.render.bind(this)
  }

  destroy() {
    this.adapter.disconnect()
    this.stop()
  }

  private _width = 0
  private _height = 0

  // SCENE RENDER UTILS

  get width() {
    return this._width
  }
  get height() {
    return this._height
  }
  get size() {
    return this.writeBuffer.length
  }

  get right() {
    return this.width - 1
  }
  get bottom() {
    return this.height - 1
  }
  get center() {
    return [Math.floor(this.width / 2), Math.floor(this.height / 2)] as const
  }

  *pixels() {
    for (let i = 0; i < this.writeBuffer.length; i++) yield i
  }

  *coords() {
    for (let y = 0; y < this.height; y++) for (let x = 0; x < this.width; x++) yield [x, y] as const
  }

  toXY(index: number) {
    const x = index % this.width
    const y = Math.floor(index / this.width)
    return [x, y] as const
  }
  toIndex(x: number, y: number) {
    return y * this.width + x
  }

  get(index: number): Pixel
  get(x: number, y: number): Pixel
  get(x: number, y?: number): Pixel {
    if (y === undefined) {
      if (x < 0 || x >= this.writeBuffer.length) {
        if (this.debug === 'verbose')
          console.warn(`Index out of bounds: ${x}. Would be ${this.toXY(x).join(', ')}`)
        return { fill: 'transparent' }
      }

      return this.writeBuffer[x]!
    }

    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      if (this.debug === 'verbose') console.warn(`Coordinates out of bounds: '${x}, ${y}'`)
      return { fill: 'transparent' }
    }

    return this.writeBuffer[y * this.width + x]!
  }

  set(index: number, pixel: Pixel): void
  set(x: number, y: number, pixel: Pixel): void
  set(x: number, y: number | Pixel, pixel?: Pixel): void {
    if (typeof y !== 'number' && typeof pixel === 'undefined') {
      if (x < 0 || x >= this.writeBuffer.length) {
        if (this.debug === 'verbose')
          console.warn(`Index out of bounds: ${x}. Would be ${this.toXY(x).join(', ')}`)
        return
      }
      this.writeBuffer[x] = {
        ...BASE_PIXEL,
        ...this._adapter?.style.defaultPixel,
        ...y,
      }
      return
    } else if (typeof x !== 'number' || typeof y !== 'number') {
      if (this.debug === 'verbose')
        console.warn(`Malformed coordinates: '${x} (${typeof x}), ${y} (${typeof y})'`)
      return
    }

    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      if (this.debug === 'verbose') console.warn(`Coordinates out of bounds: '${x}, ${y}'`)
      return
    }
    this.writeBuffer[y * this.width + x] = {
      ...BASE_PIXEL,
      ...this._adapter?.style.defaultPixel,
      ...pixel,
    }
  }

  isDefaultPixel(index: number): boolean
  isDefaultPixel(x: number, y: number): boolean
  isDefaultPixel(x: number, y?: number): boolean {
    const pixel = this.get(x, y as number)
    const defaultPixel = this.adapter.style.defaultPixel
    return (
      pixel.fill === defaultPixel.fill &&
      pixel.stroke === defaultPixel.stroke &&
      pixel.strokeWidth === defaultPixel.strokeWidth &&
      pixel.cornerRadius === defaultPixel.cornerRadius &&
      pixel.draw === defaultPixel.draw
    )
  }

  text = new TextRenderer(this)

  // END SCENE RENDER UTILS

  private writeBuffer: Frame = []
  private startTime = 0
  private sceneStartTime = 0
  private previousScene: Scene | null = null

  private start() {
    this.running = true
    const now = +(document.timeline.currentTime ?? 0)
    if (!this.startTime) this.startTime = now
    this.render(now)
  }

  private stop() {
    this.running = false
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId)
      this.frameId = null
    }
  }

  private compute(value: number | ((this: MatrixDisplay) => number)) {
    return typeof value === 'function' ? value.call(this) : value
  }

  private activeScene(elapsed: number): [Scene, sceneEnd: number] | [null, 0] {
    let cumulativeDuration = 0

    for (const scene of this.scenes) {
      const sceneEnd = Math.max(
        ...scene.map((layer) => this.compute(layer.offset ?? 0) + this.compute(layer.duration))
      )

      if (elapsed >= cumulativeDuration && elapsed < cumulativeDuration + sceneEnd) {
        if (this.previousScene !== scene) {
          this.sceneStartTime = elapsed
          this.previousScene = scene
        }

        return [scene, cumulativeDuration + sceneEnd]
      }

      cumulativeDuration += sceneEnd
    }

    return [null, 0]
  }

  private stores = new WeakMap<Layer<any>, any>()

  private initStores(fromInterrupt = false) {
    this.stores = new WeakMap(
      this.scenes.flatMap((scene) =>
        scene
          .filter((l) => !!l.store)
          .map((layer) => [
            layer,
            layer.store!.call(this, fromInterrupt ? this.stores.get(layer) : undefined),
          ])
      )
    )

    if (this.debug === 'info') {
      console.log('Initialized stores:', this.stores)
    }
  }

  private ghostScene: Scene | null = null
  private ghostStart = 0
  private ghostSceneStart = 0
  private ghostSceneStores: any = null

  private isLastScene(scene: Scene | null) {
    if (!this.scenes.length) return false
    return scene === this.scenes.at(-1)!
  }

  private render(now: number) {
    this.writeBuffer.fill(this.adapter.style.defaultPixel)

    let elapsed = now - this.startTime

    let [scene, sceneEnd] = this.activeScene(elapsed)

    if (
      this.scenes.length > 1 &&
      this.loopOffset !== 0 &&
      this.isLastScene(scene) &&
      elapsed + this.loopOffset * -1 >= sceneEnd
    ) {
      this.ghostScene = scene
      this.ghostStart = this.startTime
      this.ghostSceneStart = this.sceneStartTime
      this.ghostSceneStores = new Map(this.ghostScene!.map((l) => [l, { ...this.stores.get(l) }]))

      scene = null
    }
    this.renderGhostScene(now)

    if (!scene) {
      this.onLoop()
      this.startTime = now
      elapsed = now - this.startTime
      const [_scene] = this.activeScene(0)
      scene = _scene

      this.sceneStartTime = elapsed
      this.previousScene = scene

      this.initStores()
      if (!scene) throw new Error('No scene found for time 0')
    }

    if (!this.adapter.canCommitFrame) {
      if (this.running) this.frameId = requestAnimationFrame(this.render)
      return
    }

    let _lIdx = 0
    let previousReturnValue: any = null
    try {
      for (const layer of scene) {
        const t =
          (elapsed - this.sceneStartTime - this.compute(layer.offset ?? 0)) /
          this.compute(layer.duration)
        if (!layer.overshoot && (t < 0 || t > 1)) continue
        previousReturnValue = layer.render.call(
          this,
          t,
          this.stores.get(layer),
          previousReturnValue
        )
        _lIdx++
      }
    } catch (e) {
      console.error(`Error in layer ${_lIdx} of scene ${this.scenes.indexOf(scene)}:`, e)
      this.stop()
    }

    try {
      this.adapter.render(this.writeBuffer, this.width, this.height)
    } catch (e) {
      console.error('Adapter failed to render buffer with error:', e)
      console.log(this.writeBuffer)
      this.stop()
    }

    if (this.running) this.frameId = requestAnimationFrame(this.render)
  }

  renderGhostScene(now: number) {
    if (!this.ghostScene) return

    const elapsed = now - this.ghostStart

    let _lIdx = 0
    let previousReturnValue: any = null
    try {
      let didRender = false
      for (const layer of this.ghostScene) {
        const t =
          (elapsed - this.ghostSceneStart - this.compute(layer.offset ?? 0)) /
          this.compute(layer.duration)
        if (!layer.overshoot && (t < 0 || t > 1)) continue
        if (t > 0 || t < 1) didRender = true
        previousReturnValue = layer.render.call(
          this,
          t,
          this.ghostSceneStores.get(layer),
          previousReturnValue
        )
        _lIdx++
      }
      if (!didRender) this.ghostScene = null
    } catch (e) {
      console.error(`Error in layer ${_lIdx} of ghost scene:`, e)
      this.stop()
    }

    try {
      this.adapter.render(this.writeBuffer, this.width, this.height)
    } catch (e) {
      console.error('Adapter failed to render buffer with error:', e)
      console.log(this.writeBuffer)
      this.stop()
    }
  }
}

export const easing = {
  // No easing, no acceleration
  linear(t: number) {
    return t
  },

  // Slight acceleration from zero to full speed
  easeInSine(t: number) {
    return -1 * Math.cos(t * (Math.PI / 2)) + 1
  },

  // Slight deceleration at the end
  easeOutSine(t: number) {
    return Math.sin(t * (Math.PI / 2))
  },

  // Slight acceleration at beginning and slight deceleration at end
  easeInOutSine(t: number) {
    return -0.5 * (Math.cos(Math.PI * t) - 1)
  },

  // Accelerating from zero velocity
  easeInQuad(t: number) {
    return t * t
  },

  // Decelerating to zero velocity
  easeOutQuad(t: number) {
    return t * (2 - t)
  },

  // Acceleration until halfway, then deceleration
  easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  },

  // Accelerating from zero velocity
  easeInCubic(t: number) {
    return t * t * t
  },

  // Decelerating to zero velocity
  easeOutCubic(t: number) {
    const t1 = t - 1
    return t1 * t1 * t1 + 1
  },

  // Acceleration until halfway, then deceleration
  easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  },

  // Accelerating from zero velocity
  easeInQuart(t: number) {
    return t * t * t * t
  },

  // Decelerating to zero velocity
  easeOutQuart(t: number) {
    const t1 = t - 1
    return 1 - t1 * t1 * t1 * t1
  },

  // Acceleration until halfway, then deceleration
  easeInOutQuart(t: number) {
    const t1 = t - 1
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * t1 * t1 * t1 * t1
  },

  // Accelerating from zero velocity
  easeInQuint(t: number) {
    return t * t * t * t * t
  },

  // Decelerating to zero velocity
  easeOutQuint(t: number) {
    const t1 = t - 1
    return 1 + t1 * t1 * t1 * t1 * t1
  },

  // Acceleration until halfway, then deceleration
  easeInOutQuint(t: number) {
    const t1 = t - 1
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * t1 * t1 * t1 * t1 * t1
  },

  // Accelerate exponentially until finish
  easeInExpo(t: number) {
    if (t === 0) {
      return 0
    }

    return Math.pow(2, 10 * (t - 1))
  },

  // Initial exponential acceleration slowing to stop
  easeOutExpo(t: number) {
    if (t === 1) {
      return 1
    }

    return -Math.pow(2, -10 * t) + 1
  },

  // Exponential acceleration and deceleration
  easeInOutExpo(t: number) {
    if (t === 0 || t === 1) {
      return t
    }

    const scaledTime = t * 2
    const scaledTime1 = scaledTime - 1

    if (scaledTime < 1) {
      return 0.5 * Math.pow(2, 10 * scaledTime1)
    }

    return 0.5 * (-Math.pow(2, -10 * scaledTime1) + 2)
  },

  // Increasing velocity until stop
  easeInCirc(t: number) {
    const scaledTime = t / 1
    return -1 * (Math.sqrt(1 - scaledTime * t) - 1)
  },

  // Start fast, decreasing velocity until stop
  easeOutCirc(t: number) {
    const t1 = t - 1
    return Math.sqrt(1 - t1 * t1)
  },

  // Fast increase in velocity, fast decrease in velocity
  easeInOutCirc(t: number) {
    const scaledTime = t * 2
    const scaledTime1 = scaledTime - 2

    if (scaledTime < 1) {
      return -0.5 * (Math.sqrt(1 - scaledTime * scaledTime) - 1)
    }

    return 0.5 * (Math.sqrt(1 - scaledTime1 * scaledTime1) + 1)
  },

  // Slow movement backwards then fast snap to finish
  easeInBack(t: number, magnitude = 1.70158) {
    return t * t * ((magnitude + 1) * t - magnitude)
  },

  // Fast snap to backwards point then slow resolve to finish
  easeOutBack(t: number, magnitude = 1.70158) {
    const scaledTime = t / 1 - 1

    return scaledTime * scaledTime * ((magnitude + 1) * scaledTime + magnitude) + 1
  },

  // Slow movement backwards, fast snap to past finish, slow resolve to finish
  easeInOutBack(t: number, magnitude = 1.70158) {
    const scaledTime = t * 2
    const scaledTime2 = scaledTime - 2

    const s = magnitude * 1.525

    if (scaledTime < 1) {
      return 0.5 * scaledTime * scaledTime * ((s + 1) * scaledTime - s)
    }

    return 0.5 * (scaledTime2 * scaledTime2 * ((s + 1) * scaledTime2 + s) + 2)
  },

  // Bounces slowly then quickly to finish
  easeInElastic(t: number, magnitude = 0.7) {
    if (t === 0 || t === 1) {
      return t
    }

    const scaledTime = t / 1
    const scaledTime1 = scaledTime - 1

    const p = 1 - magnitude
    const s = (p / (2 * Math.PI)) * Math.asin(1)

    return -(Math.pow(2, 10 * scaledTime1) * Math.sin(((scaledTime1 - s) * (2 * Math.PI)) / p))
  },

  // Fast acceleration, bounces to zero
  easeOutElastic(t: number, magnitude = 0.7) {
    if (t === 0 || t === 1) {
      return t
    }

    const p = 1 - magnitude
    const scaledTime = t * 2

    const s = (p / (2 * Math.PI)) * Math.asin(1)
    return Math.pow(2, -10 * scaledTime) * Math.sin(((scaledTime - s) * (2 * Math.PI)) / p) + 1
  },

  // Slow start and end, two bounces sandwich a fast motion
  easeInOutElastic(t: number, magnitude = 0.65) {
    if (t === 0 || t === 1) {
      return t
    }

    const p = 1 - magnitude
    const scaledTime = t * 2
    const scaledTime1 = scaledTime - 1

    const s = (p / (2 * Math.PI)) * Math.asin(1)

    if (scaledTime < 1) {
      return (
        -0.5 * (Math.pow(2, 10 * scaledTime1) * Math.sin(((scaledTime1 - s) * (2 * Math.PI)) / p))
      )
    }

    return (
      Math.pow(2, -10 * scaledTime1) * Math.sin(((scaledTime1 - s) * (2 * Math.PI)) / p) * 0.5 + 1
    )
  },

  // Bounce to completion
  easeOutBounce(t: number) {
    const scaledTime = t / 1

    if (scaledTime < 1 / 2.75) {
      return 7.5625 * scaledTime * scaledTime
    } else if (scaledTime < 2 / 2.75) {
      const scaledTime2 = scaledTime - 1.5 / 2.75
      return 7.5625 * scaledTime2 * scaledTime2 + 0.75
    } else if (scaledTime < 2.5 / 2.75) {
      const scaledTime2 = scaledTime - 2.25 / 2.75
      return 7.5625 * scaledTime2 * scaledTime2 + 0.9375
    } else {
      const scaledTime2 = scaledTime - 2.625 / 2.75
      return 7.5625 * scaledTime2 * scaledTime2 + 0.984375
    }
  },

  // Bounce increasing in velocity until completion
  easeInBounce(t: number) {
    return 1 - easing.easeOutBounce(1 - t)
  },

  // Bounce in and bounce out
  easeInOutBounce(t: number) {
    if (t < 0.5) {
      return easing.easeInBounce(t * 2) * 0.5
    }

    return easing.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
  },
}
