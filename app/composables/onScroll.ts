export default function (cb: () => void) {
  let rafId: number | null = null

  const scrollHandler = () => {
    if (rafId !== null) cancelAnimationFrame(rafId)

    rafId = requestAnimationFrame(() => {
      rafId = null
      cb()
    })
  }

  window.addEventListener('scroll', scrollHandler, { passive: true })
  cb()

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandler)
  })
}
