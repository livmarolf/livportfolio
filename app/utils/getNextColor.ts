const colorList = [
  'var(--colors-dark-blue)',
  'var(--colors-purple)',
  'var(--colors-pink)',
  'var(--colors-red)',
  'var(--colors-orange)',
  'var(--colors-yellow)',
  'var(--colors-green)',
  'var(--colors-light-blue)',
]

let nextColor = 0

export default function () {
  if (nextColor >= colorList.length) nextColor = 0

  return colorList[nextColor++]
}
