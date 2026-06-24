export function cross(this: CanvasRenderingContext2D, size: number, pixel: number) {
  const crossWidth = size * 0.4
  const center = size / 2
  const h = crossWidth / 2
  const ro = crossWidth * 0.15 // outer tip corners
  const ri = crossWidth * 0.15 // inner concave corners

  if (pixel % 2 === 0) {
    this.save()
    this.translate(center, center)
    this.rotate(Math.PI / 4)
    this.translate(-center, -center)
  }

  this.lineTo(center - h, (center - h) / 2) // start mid P12→P1 edge
  this.arcTo(center - h, 0, center + h, 0, ro) // P1
  this.arcTo(center + h, 0, center + h, center - h, ro) // P2
  this.arcTo(center + h, center - h, size, center - h, ri) // P3 (inner)
  this.arcTo(size, center - h, size, center + h, ro) // P4
  this.arcTo(size, center + h, center + h, center + h, ro) // P5
  this.arcTo(center + h, center + h, center + h, size, ri) // P6 (inner)
  this.arcTo(center + h, size, center - h, size, ro) // P7
  this.arcTo(center - h, size, center - h, center + h, ro) // P8
  this.arcTo(center - h, center + h, 0, center + h, ri) // P9 (inner)
  this.arcTo(0, center + h, 0, center - h, ro) // P10
  this.arcTo(0, center - h, center - h, center - h, ro) // P11
  this.arcTo(center - h, center - h, center - h, 0, ri) // P12 (inner)
  this.closePath()

  if (pixel % 2 === 0) {
    this.restore()
  }
}

export function triangle(this: CanvasRenderingContext2D, size: number, pixel: number) {
  const center = size / 2
  const r = size * 0.1

  if (pixel % 2 === 0) {
    // Upright: apex=(center,0), bottom-right=(size,size), bottom-left=(0,size)
    this.lineTo((center + size) / 2, size / 2) // mid AB edge
    this.arcTo(size, size, 0, size, r)
    this.arcTo(0, size, center, 0, r)
    this.arcTo(center, 0, size, size, r)
  } else {
    // Inverted: top-left=(0,0), top-right=(size,0), apex=(center,size)
    this.lineTo(size / 2, 0) // mid AB edge
    this.arcTo(size, 0, center, size, r)
    this.arcTo(center, size, 0, 0, r)
    this.arcTo(0, 0, size, 0, r)
  }
  this.closePath()
}

export function circle(this: CanvasRenderingContext2D, size: number, pixel: number) {
  this.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
}

export function mixedShapes(this: CanvasRenderingContext2D, size: number, pixel: number) {
  const shapes = [null, triangle, cross, circle]
  const shape = shapes[pixel % shapes.length]
  const radius = 4
  if (!shape) this.roundRect(0, 0, size, size, radius)
  else shape.call(this, size, pixel)
}
