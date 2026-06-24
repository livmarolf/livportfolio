export const transition =
  import.meta.client && 'startViewTransition' in document
    ? document.startViewTransition.bind(document)
    : (cb: () => void) => {
        cb()
        return { finished: Promise.resolve() }
      }
