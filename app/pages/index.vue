<script setup lang="ts">
const impactFrames = [120, 300, 480, 660, 840, 1020, 1200, 1380] as const
const colors = [
  '--colors-dark-blue',
  '--colors-purple',
  '--colors-pink',
  '--colors-red',
  '--colors-orange',
  '--colors-yellow',
  '--colors-green',
  '--colors-light-blue',
]

const framesToTime = (frame: number) => (frame / 60) * 1000
const timeToFrame = (time: number) => Math.round(time * 60)

const logoAnimation = useTemplateRef('logo-animation')

const impacts = ref(0)

let impactTimer: number | null = null
const waitForNextImpact = () => {
  if (impactTimer) clearTimeout(impactTimer)

  const video = logoAnimation.value!
  const currentFrame = timeToFrame(video.currentTime)
  const nextImpact =
    impactFrames.find((frame) => frame > currentFrame) ??
    timeToFrame(video.duration) + impactFrames[0]
  const timeToNextImpact = framesToTime(nextImpact - currentFrame)

  impactTimer = setTimeout(() => {
    impacts.value++
    waitForNextImpact()
  }, timeToNextImpact)
}

onMounted(() => {
  const video = logoAnimation.value!

  video.addEventListener('play', waitForNextImpact)
  video.addEventListener('seeked', waitForNextImpact)

  video.load()
  video.play()
})

const handleVideoSeek = (e: MouseEvent) => {
  if (!logoAnimation.value) return

  const target = e.target as HTMLButtonElement

  if (target.tagName !== 'BUTTON') return

  const frameIndex = [...target.parentNode!.children!].indexOf(target) - 1

  logoAnimation.value.currentTime = framesToTime(impactFrames.at(frameIndex)!) / 1000
}

const BIO_TRAIL_MAX_LENGTH = 20
const bio = useTemplateRef('bio')
const sentinel = useTemplateRef('sentinel')
const classes = useCssModule()
let scrollHandler: (() => void) | null = null
let rafId: number | null = null

onMounted(() => {
  const paragraphs = [...bio.value?.querySelectorAll('p')!] as [
    HTMLParagraphElement,
    HTMLParagraphElement,
  ]

  const letters: HTMLSpanElement[] = []

  paragraphs?.forEach((p) => {
    const words = p.textContent.split(' ').map((w) => {
      const wordSpan = document.createElement('span')

      wordSpan.classList.add(classes.word)

      const letterSpans = w.split('').map((c, i) => {
        const span = document.createElement('span')

        span.style.setProperty('--color', `var(${colors[i % colors.length]!})`)
        span.style.setProperty('--strength', '1')
        span.classList.add(classes.letter)
        letters.push(span)

        span.textContent = c
        return span
      })

      const space = document.createElement('span')
      space.textContent = ' '
      space.classList.add(classes.space)

      wordSpan.append(...letterSpans, space)

      return wordSpan
    })

    p.innerHTML = ''
    p.append(...words)
  })

  let previousProgress = -1
  let previousScrollDist = 0
  let peakSpeed = 0
  let timeAtLastPeakScrollSpeed = 0

  onScroll(() => {
    if (!bio.value) return
    const top = sentinel.value?.getBoundingClientRect()?.top ?? 0
    const vh = window.innerHeight
    const scrollDist = vh - top
    const progress = Math.max(0, Math.min(1, scrollDist / vh))

    if (progress < 0.0001 || progress > 0.9999) return

    const pivot = Math.floor(letters.length * progress)

    const direction = progress > previousProgress ? 1 : -1
    const currentSpeed = Math.round(Math.abs(scrollDist - previousScrollDist))

    if (currentSpeed > peakSpeed) {
      peakSpeed = currentSpeed
      timeAtLastPeakScrollSpeed = performance.now()
    } else if (performance.now() - timeAtLastPeakScrollSpeed > 750) {
      peakSpeed = currentSpeed
    }

    previousProgress = progress
    previousScrollDist = scrollDist

    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i]!

      const distanceFromPivot = Math.abs(i - pivot)

      const behindPivot =
        i === pivot || (direction === 1 && i < pivot) || (direction === -1 && i > pivot)

      const trailLength = Math.max(1, Math.min(BIO_TRAIL_MAX_LENGTH, peakSpeed))

      letter.classList.toggle(classes.grow, distanceFromPivot < trailLength && behindPivot)
      letter.classList.toggle(classes.active, i <= pivot)
      letter.classList.toggle(classes.inactive, i > pivot)

      letter.style.setProperty(
        '--strength',
        ((trailLength - distanceFromPivot) / trailLength).toString()
      )
      letter.style.zIndex = Math.max(1, trailLength - distanceFromPivot).toString()
    }
  })
})

onUnmounted(() => {
  clearTimeout(impactTimer!)
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  if (rafId !== null) cancelAnimationFrame(rafId)
})

let indicatorColorIndex = 0

const vIndicators = {
  mounted(el: HTMLElement) {
    const indicators = [...el.querySelectorAll<HTMLElement>('.card-hover-indicator-group > div')]

    el.querySelectorAll('article').forEach((card, i) => {
      card.addEventListener('pointerenter', () => {
        indicators[i]?.style.setProperty(
          '--hover-color',
          `var(${colors[++indicatorColorIndex % colors.length]!})`
        )
        indicators[i]?.classList.add('hover')
      })
      card.addEventListener('pointerleave', () => {
        indicators[i]?.classList.remove('hover')
      })
    })
  },
}
</script>
<template>
  <HeroDisplay />
  <main>
    <!-- CASE STUDIES -->
    <section v-indicators>
      <SectionScrollProgress color="var(--colors-orange)" />
      <div class="section-wrapper">
        <header class="mono">
          <h2>Case Studies</h2>
          <span class="card-hover-indicator-group">
            <div />
            <div />
          </span>
        </header>
        <div class="section-content case-studies">
          <article class="case-study">
            <a href="/case-studies/seeing-more-with-gestures">
              <div class="preview">
                <video
                  autoplay
                  muted
                  loop
                  src="~/assets/videos/instagram-reels-interaction.mp4"></video>
              </div>
            </a>
            <a href="/case-studies/seeing-more-with-gestures">
              <h2>
                Reducing UI interference
                <span class="secondary">in Instagram Reels</span>
              </h2>
            </a>
            <LinkButton href="/case-studies/seeing-more-with-gestures">view</LinkButton>
          </article>
          <article class="case-study">
            <a href="/case-studies/seeing-more-with-gestures">
              <div class="preview">
                <video autoplay muted loop src="~/assets/videos/mini-nav-behavior.mp4"></video>
              </div>
            </a>
            <a href="/case-studies/seeing-more-with-gestures">
              <h2>
                Reclaiming Space
                <span class="secondary">Through Compact Navigation</span>
              </h2>
            </a>
            <LinkButton href="/case-studies/seeing-more-with-gestures">view</LinkButton>
          </article>
        </div>
      </div>
    </section>
    <!-- ABOUT -->
    <section>
      <SectionScrollProgress color="var(--colors-dark-blue)" />
      <div class="section-wrapper">
        <header class="mono">
          <h2>About</h2>
          <span>{{ impacts.toString().padStart(3, '0') }}</span>
        </header>

        <div class="section-content about">
          <div class="bio" ref="bio">
            <div class="sentinel" ref="sentinel" />
            <p>
              I'm a UX designer who works best at the deep end — early-stage SaaS, complex problems,
              and products that need someone who can think at the system level and still sweat the
              details.
            </p>
            <p>
              My work spans UX, design systems, branding, prototyping, and enough front-end to have
              meaningful conversations with engineers. I'm comfortable with ambiguity — most of the
              best work happens in it.
            </p>
          </div>
          <div class="logo-animation">
            <video ref="logo-animation" src="~/assets/videos/logo-animation.mp4" muted loop />
            <menu class="mono">
              <svg
                class="bracket-left"
                width="4"
                height="12"
                viewBox="0 0 4 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 11.1834C4 11.4083 3.91975 11.6035 3.75926 11.7692C3.59877 11.9231 3.39506 12 3.14815 12H0.851852C0.617284 12 0.41358 11.9231 0.240741 11.7692C0.0802469 11.6035 0 11.4083 0 11.1834V0.816568C0 0.579882 0.0802469 0.384616 0.240741 0.230769C0.41358 0.0769231 0.617284 0 0.851852 0H3.14815C3.39506 0 3.59877 0.0769231 3.75926 0.230769C3.91975 0.384616 4 0.579882 4 0.816568V1.29586C4 1.52071 3.91975 1.71006 3.75926 1.86391C3.59877 2.01775 3.39506 2.09467 3.14815 2.09467H2.46296C2.29012 2.09467 2.2037 2.17751 2.2037 2.3432V9.6568C2.2037 9.82248 2.29012 9.90532 2.46296 9.90532H3.14815C3.39506 9.90532 3.59877 9.98225 3.75926 10.1361C3.91975 10.2781 4 10.4615 4 10.6864V11.1834Z"
                  fill="var(--text-label)" />
              </svg>
              <span @click="handleVideoSeek">
                <button style="--color: var(--colors-dark-blue)" aria-label="dark blue"></button>
                <button style="--color: var(--colors-purple)" aria-label="purple"></button>
                <button style="--color: var(--colors-pink)" aria-label="pink"></button>
                <button style="--color: var(--colors-red)" aria-label="red"></button>
                <button style="--color: var(--colors-orange)" aria-label="orange"></button>
                <button style="--color: var(--colors-yellow)" aria-label="yellow"></button>
                <button style="--color: var(--colors-green)" aria-label="green"></button>
                <button style="--color: var(--colors-light-blue)" aria-label="light blue"></button>
              </span>
              <svg
                class="bracket-right"
                width="4"
                height="12"
                viewBox="0 0 4 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 11.1834C4 11.4083 3.91975 11.6035 3.75926 11.7692C3.59877 11.9231 3.39506 12 3.14815 12H0.851852C0.617284 12 0.41358 11.9231 0.240741 11.7692C0.0802469 11.6035 0 11.4083 0 11.1834V10.6864C0 10.4615 0.0802469 10.2781 0.240741 10.1361C0.41358 9.98225 0.617284 9.90532 0.851852 9.90532H1.55556C1.7284 9.90532 1.81481 9.82248 1.81481 9.6568V2.3432C1.81481 2.17751 1.7284 2.09467 1.55556 2.09467H0.851852C0.617284 2.09467 0.41358 2.01775 0.240741 1.86391C0.0802469 1.71006 0 1.52071 0 1.29586V0.816568C0 0.579882 0.0802469 0.384616 0.240741 0.230769C0.41358 0.0769231 0.617284 0 0.851852 0H3.14815C3.39506 0 3.59877 0.0769231 3.75926 0.230769C3.91975 0.384616 4 0.579882 4 0.816568V11.1834Z"
                  fill="var(--text-label)" />
              </svg>
            </menu>
          </div>
        </div>
        <footer class="mono">
          <span>{{ new Date().getFullYear() }}</span>
          <span>created w/ cavalry</span>
        </footer>
      </div>
    </section>
    <!-- ARTICLES -->
    <section v-indicators>
      <SectionScrollProgress color="var(--colors-orange)" />
      <div class="section-wrapper">
        <header class="mono">
          <h2>Articles</h2>
          <span class="card-hover-indicator-group">
            <div />
            <div />
            <div />
          </span>
        </header>
        <div class="section-content articles">
          <article class="article">
            <a href="/case-studies/seeing-more-with-gestures">
              <div class="thumbnail">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M88.8703 21.7842C92.412 21.9052 93.2318 24.0498 94.5671 26.8027L96.5245 30.8253L103.052 43.9298L111.833 45.8637C113.545 46.2375 116.388 46.7235 117.892 47.3758C118.401 47.5963 120.659 49.1013 121.207 49.4561L127.623 53.6361C128.657 54.3096 129.718 55.0673 130.826 55.6084C131.77 56.07 132.556 54.6317 133.144 54.0953C134.805 52.5813 137.016 49.3676 139.056 48.5278C140.252 48.0417 141.593 48.0502 142.784 48.5516C144.084 49.084 145.071 50.0727 145.59 51.3771C146.077 52.6006 146.139 54.2205 145.562 55.429C144.976 56.6563 136.655 65.066 135.4 66.0739C134.923 66.4559 134.38 66.7263 133.8 66.9098C130.959 67.8076 128.872 66.1896 126.604 64.7449C124.784 63.5848 122.944 62.2377 121.029 61.247L120.92 61.192C120.514 62.4347 119.969 65.7614 119.675 67.2041L118.347 73.6663C117.624 77.185 117.552 76.807 118.343 80.3035L119.596 85.8641L123.471 103.887C123.649 104.72 123.848 105.565 124.011 106.397C124.524 109.083 125.616 111.878 123.959 114.406C122.643 116.414 121.016 117.074 118.789 117.596C119.694 117.927 121.66 118.304 122.669 118.525C124.989 119.02 127.306 119.531 129.62 120.057L135.428 115.338C136.643 114.35 138.305 112.905 139.627 112.165C142.722 110.468 146.366 110.072 149.753 111.066C153.067 112.02 156.706 114.875 157.965 118.076C159.213 121.245 159.962 125.27 160.779 128.621L164.358 143.658C164.746 145.323 165.337 148.64 166.035 150.019C166.927 151.768 167.831 153.51 168.748 155.246C169.174 156.067 170.122 158.035 170.667 158.691C171.282 159.43 172.343 160.504 173.033 161.239L177.846 166.343C178.813 167.366 180.033 168.493 180.712 169.716C182.295 172.572 181.044 175.93 178.284 177.489C176.17 178.682 173.319 178.441 171.502 176.804C170.739 176.113 170.054 175.312 169.37 174.565L165.893 170.781L162.287 166.91C161.977 166.577 160.502 165.025 160.308 164.716C159.395 163.266 158.524 161.262 157.733 159.683C156.734 157.66 155.721 155.453 154.659 153.482C153.269 154.287 151.152 155.823 149.774 156.747C148.514 157.593 146.385 158.961 145.241 159.873C145.654 162.966 148.073 171.624 147.712 174.047C147.481 175.601 146.443 177.042 145.186 177.945C143.873 178.888 142.214 179.165 140.633 178.889C139.132 178.614 137.804 177.749 136.946 176.487C136.628 176.023 136.387 175.51 136.229 174.969C135.602 172.859 135.118 169.462 134.579 167.19C134.023 164.179 133.133 161.194 132.707 158.161C132.059 153.555 135.393 152.012 138.568 149.921L144.477 146C144.147 144.193 143.151 140.854 142.644 138.935L138.715 124.159C136.618 125.418 134.295 128.102 132.107 129.145C131.551 129.314 130.524 129.437 129.973 129.325C125.064 128.324 120.162 127.137 115.278 126.024C112.239 125.333 111.156 121.633 112.719 119.136C113.49 117.906 114.534 117.501 115.867 117.195C112.94 115.601 112.367 114.597 111.69 111.318C110.076 103.506 108.182 95.7128 106.643 87.8865C105.127 87.6033 102.526 87.369 100.881 87.157L86.9811 85.4488C86.6355 86.6035 86.314 88.3793 86.0539 89.6086L84.5342 96.6965C83.9918 99.1817 83.8472 101.34 81.856 103.095C77.4709 106.978 70.4041 103.68 70.9959 97.7169C71.1069 96.5983 71.4685 95.3218 71.7071 94.211L73.1363 87.5635L74.7797 80.0976C75.0211 79.035 75.4218 77.0679 75.7978 76.1269C76.254 74.9818 76.9966 73.9732 77.9545 73.1976C80.4207 71.2292 83.1495 71.9895 86.023 72.3607C88.0991 72.6382 90.1776 72.8981 92.2582 73.1405C92.8897 70.7383 93.4577 67.3554 93.985 64.8523L95.5163 57.3018C95.8061 55.8592 96.1516 54.4377 96.3693 52.982C95.8206 51.5414 94.0634 48.2511 93.3018 46.7288L87.2369 34.6213C86.329 32.8133 85.2565 30.8774 84.4884 29.019C83.0615 25.5665 85.171 22.1059 88.8703 21.7842Z"
                    fill="var(--colors-dark-blue)" />
                  <path
                    d="M103.907 99.7308C105.242 99.6359 106.519 100.011 107.479 100.986C107.694 101.203 108.24 101.81 108.333 102.062C109.166 104.288 109.333 106.781 109.888 109.094C110.288 110.859 110.674 112.788 110.988 114.579C111.202 121.124 111.046 127.713 111.048 134.264C111.048 136.396 109.836 137.52 108.04 138.355C107.938 141.456 108.024 145.09 108.024 148.246L108.031 166.689C110.094 166.768 116.426 166.518 117.975 166.929C118.896 167.18 119.741 167.656 120.431 168.315C122.78 170.554 122.84 174.551 120.578 176.867C119.324 178.159 117.817 178.654 116.043 178.65C111.375 178.638 106.708 178.636 102.04 178.65C101.505 178.651 100.953 178.607 100.43 178.492C99.4337 178.265 98.524 177.757 97.8068 177.029C95.8036 175.029 96.1923 172.474 96.2042 169.88C96.2222 167.754 96.226 165.628 96.2158 163.502C91.6631 163.285 86.9924 163.474 82.4298 163.421C80.9976 163.404 79.4791 163.414 78.0528 163.489C77.8334 166.211 78.3904 172.953 77.6294 175.076C77.0993 176.532 76.0101 177.717 74.6034 178.367C71.4337 179.846 68.0806 178.331 66.6913 175.207C66.4973 174.687 66.3599 174.064 66.3531 173.505C66.2955 168.762 66.3789 164.014 66.3364 159.269C66.3285 158.394 66.3261 157.467 66.4907 156.607C66.6866 155.567 67.164 154.599 67.8712 153.811C68.5924 153.027 69.5236 152.467 70.5539 152.198C71.8474 151.852 73.7182 152 75.0889 151.976C77.6025 151.933 80.2354 152.061 82.7424 151.96C82.8438 151.074 82.7998 149.306 82.7998 148.366L82.7953 141.788C80.3561 139.908 76.397 135.685 74.0089 133.303L69.7339 129.046C67.9859 127.307 66.029 126.011 66.4055 123.259C66.9258 119.455 67.4473 115.649 67.955 111.843C68.107 110.889 68.1602 109.988 68.4926 109.069C70.0494 104.776 76.4279 105.567 76.9317 110.079C77.0811 111.418 76.6572 113.482 76.4599 114.845C76.116 117.237 75.7566 119.627 75.3813 122.014C76.8574 123.334 78.185 124.841 79.7308 126.172C82.5124 125.995 85.5435 125.66 88.334 125.404L102.038 124.149C102.135 122.983 102.101 121.006 102.106 119.789C102.11 118.548 102.194 115.876 101.982 114.769C101.365 111.554 100.565 108.283 99.9654 105.053C99.7325 103.795 100.041 102.406 100.821 101.388C101.637 100.319 102.629 99.9347 103.907 99.7308Z"
                    fill="var(--colors-dark-blue)" />
                  <path
                    d="M65.8346 83.7388C67.8076 83.6882 69.4653 84.6119 70.2274 86.4754C70.7321 87.7098 70.4091 89.2393 70.285 90.5468L69.8069 95.4348C69.5319 98.2595 69.3009 101.261 68.9008 104.064C68.7887 104.851 68.2596 106.716 68.049 107.562C67.5166 109.718 66.9716 111.87 66.414 114.019C65.7737 116.471 65.1461 118.985 64.3494 121.403C64.008 122.827 61.9297 124.477 61.4912 125.576C58.6607 132.675 55.2049 139.54 52.2294 146.579C53.7003 147.962 55.1598 149.356 56.608 150.762C58.9262 152.971 60.921 154.104 60.5111 157.677C59.942 162.64 59.2198 167.579 58.5727 172.532C58.4576 173.414 58.314 174.325 57.9844 175.16C56.2111 179.243 50.589 180.072 47.7796 176.574C45.843 174.122 46.8114 170.761 47.1979 167.965C47.6217 165.007 48.0141 162.045 48.3751 159.08C45.873 156.906 43.4592 154.58 40.9669 152.434C40.2414 153.822 39.4962 155.817 38.8543 157.313L33.4283 170.005C32.6299 171.879 31.7147 174.465 30.7262 176.127C28.5594 179.77 22.7096 179.628 20.5899 176.007C18.7921 172.937 20.0242 170.803 21.2288 167.968L23.3874 162.899L31.7502 143.405L38.7427 126.742L40.6406 122.146C41.0209 121.218 41.6067 119.727 42.0837 118.871C43.1036 117.029 44.589 115.487 46.3912 114.4C49.4577 112.533 51.8398 112.701 55.1638 113.526L58.1202 111.811C58.9196 108.339 59.8922 104.875 60.5645 101.382C60.7109 100.62 60.72 99.1104 60.7862 98.2713L61.3755 91.1999C61.6822 87.6874 61.4067 84.4118 65.8346 83.7388Z"
                    fill="var(--colors-dark-blue)" />
                  <path
                    d="M138.696 87.8233C144.579 87.2938 149.782 91.626 150.326 97.5082C150.87 103.391 146.55 108.603 140.669 109.162C134.768 109.722 129.533 105.384 128.988 99.4814C128.442 93.5788 132.792 88.3546 138.696 87.8233Z"
                    fill="var(--colors-dark-blue)" />
                  <path
                    d="M46.4786 90.1771C52.2939 89.4252 57.6211 93.5204 58.3896 99.3338C59.1581 105.147 55.0781 110.485 49.2673 111.27C43.4329 112.059 38.0678 107.958 37.2961 102.123C36.5245 96.2855 40.6399 90.9321 46.4786 90.1771Z"
                    fill="var(--colors-dark-blue)" />
                  <path
                    d="M88.8618 101.53C94.6291 101.02 99.7189 105.279 100.237 111.045C100.755 116.812 96.5058 121.908 90.7401 122.435C84.9617 122.964 79.8511 118.702 79.3318 112.923C78.8126 107.144 83.0817 102.04 88.8618 101.53Z"
                    fill="var(--colors-dark-blue)" />
                  <path
                    d="M113.398 22.8565C119.113 22.2397 124.248 26.3657 124.876 32.0789C125.505 37.7922 121.389 42.9356 115.677 43.5755C109.949 44.2172 104.787 40.0873 104.157 34.3577C103.527 28.6281 107.667 23.475 113.398 22.8565Z"
                    fill="var(--colors-dark-blue)" />
                </svg>
              </div>
            </a>
            <a href="/case-studies/seeing-more-with-gestures">
              <h2>Could, should, might, don't</h2>
              <p class="secondary">Four frames of thought that drive great ux decisions</p>
            </a>
            <LinkButton href="/case-studies/seeing-more-with-gestures">Read Article</LinkButton>
          </article>
          <article class="article">
            <a href="/case-studies/seeing-more-with-gestures">
              <div class="thumbnail">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M127.977 33.4948V145.04L103.64 167.411C103.457 167.579 103.217 167.673 102.967 167.673H25.3258C24.4191 167.673 23.9851 166.559 24.6525 165.946L47.3956 145.04V33.4948C47.3956 32.9454 47.841 32.5 48.3904 32.5H126.982C127.532 32.5 127.977 32.9454 127.977 33.4948Z"
                    fill="var(--colors-green)" />
                  <path
                    d="M55.1153 69.0826C54.6332 69.0517 54.0889 69.0442 53.6051 69.0412L45.7998 69.0372C44.0117 69.0373 39.4106 68.849 38.047 69.3001C37.5378 69.4686 36.9912 69.9236 36.5927 70.2744C35.854 70.9256 35.175 71.6717 34.478 72.3682L31.5265 75.273L20.7475 86.0388C19.9367 85.1539 19.1526 84.4145 18.3151 83.5725L14.0821 79.3142C12.9816 78.2148 11.8823 77.1003 10.7594 76.0236C10.5237 75.8419 10.2651 75.5492 10.0083 75.4042C6.58418 73.4748 2.93127 76.164 3.6749 80.0019C4.02061 81.7852 5.78146 82.931 6.96034 84.1786C7.97134 85.2485 9.03767 86.286 10.0748 87.3255L15.3362 92.589C16.3783 93.6352 17.6859 95.0602 18.8697 95.9112C19.8807 96.6386 21.751 96.5503 22.9094 96.3299C23.372 96.2418 23.9465 95.8763 24.3077 95.5565C25.8149 94.2213 27.3009 92.6855 28.7012 91.2367C29.2533 90.6656 30.9327 89.1013 31.2734 88.5469C31.529 88.8784 32.859 90.1466 33.2333 90.5209C34.7989 92.1017 36.3831 93.664 37.9855 95.2076C40.679 97.8497 43.3258 100.762 46.0898 103.345C45.3646 104.101 44.5588 104.84 43.8077 105.576C42.4237 106.943 41.0471 108.317 39.6767 109.699C37.5564 111.859 35.6345 113.4 36.1065 116.78C36.4553 119.274 36.9359 121.727 37.3966 124.203L38.7708 131.916L39.7824 137.872C40.0311 139.419 40.2705 141.227 40.7225 142.688C41.3287 144.646 43.1729 146.351 45.2123 146.632C45.9349 146.732 46.4377 146.875 47.1777 146.759C48.6613 146.512 49.9869 145.688 50.8655 144.467C52.3349 142.452 51.9645 140.801 51.5904 138.561L50.9922 135.006L48.9696 122.828C48.595 121.139 48.3976 119.416 48.0093 117.686C48.5675 117.28 49.0798 116.657 49.573 116.169C50.2557 115.493 50.9445 114.823 51.6248 114.145L55.9115 109.858C56.5029 109.266 57.2847 108.547 57.8309 107.959C57.8998 108.049 57.9708 108.138 58.044 108.225C58.5954 108.876 59.6616 109.874 60.2914 110.518C61.2756 111.523 62.2662 112.522 63.263 113.515C64.1749 114.428 65.8906 116.241 66.9687 116.761C68.8437 117.666 72.5675 117.395 74.6709 117.394L84.5677 117.391L92.2654 117.395C93.714 117.395 95.296 117.477 96.7014 117.3C101.038 116.755 103.15 111.904 100.777 108.293C99.924 106.994 98.2612 105.9 96.7362 105.765C94.7448 105.588 92.6047 105.682 90.6053 105.682L78.3952 105.68C76.4887 105.68 73.6602 105.77 71.846 105.643C71.121 105.093 69.5691 103.411 68.8277 102.666L62.8715 96.7129L51.7963 85.6337C49.136 82.99 46.2704 80.2106 43.6703 77.5283C44.5781 77.4813 45.5893 77.5262 46.5092 77.521C48.6321 77.5023 50.7551 77.4992 52.878 77.5117L62.3877 87.0683L64.9282 89.6155C65.5057 90.1974 66.2916 91.0248 66.9339 91.4985C67.4719 91.8877 68.0955 92.1421 68.7522 92.2404C71.1117 92.5697 73.3872 90.8503 73.6566 88.485C73.9606 86.0652 72.5446 84.96 70.9875 83.3852C66.6715 79.0198 62.3066 74.6329 57.9209 70.3365C57.3116 69.7395 55.9715 69.1865 55.1153 69.0826Z"
                    fill="var(--colors-neutral)" />
                  <path
                    d="M26.4102 55.8629C21.5809 55.3467 17.2515 58.8525 16.7522 63.6834C16.2529 68.5142 19.774 72.8313 24.6064 73.3135C29.4152 73.7932 33.706 70.2935 34.2028 65.4867C34.6996 60.6799 31.2152 56.3766 26.4102 55.8629Z"
                    fill="var(--colors-neutral)" />
                  <path
                    d="M77.4883 77.0188H127.976V80.0033H77.4883V77.0188Z"
                    fill="var(--colors-neutral)" />
                  <path
                    d="M85.1367 83.7339H127.975V86.7184H85.1367V83.7339Z"
                    fill="var(--colors-neutral)" />
                  <path
                    d="M92.7891 90.4492H127.978V93.4337H92.7891V90.4492Z"
                    fill="var(--colors-neutral)" />
                  <path
                    d="M130.418 93.4048V76.2243H160.737L138.882 59.5347H163.011L198.004 84.6919L163.011 109.849H138.882L160.737 93.4048H130.418Z"
                    fill="var(--colors-green)" />
                </svg>
              </div>
            </a>
            <a href="/case-studies/seeing-more-with-gestures">
              <h2>Could, should, might, don't</h2>
              <p class="secondary">Four frames of thought that drive great ux decisions</p>
            </a>
            <LinkButton href="/case-studies/seeing-more-with-gestures">Read Article</LinkButton>
          </article>
          <article class="article">
            <a href="/case-studies/seeing-more-with-gestures">
              <div class="thumbnail">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M92.8568 55.5596C95.0617 55.2691 98.3939 56.5759 98.5756 58.9038C99.0423 64.8836 97.1112 73.7969 94.3034 79.0305C90.9332 85.3123 83.5554 89.2273 76.9138 90.9681C76.7932 93.7021 76.3445 96.4823 76.2291 99.1875C75.9079 106.72 74.6188 114.284 74.3623 121.796C74.0819 130.832 73.8643 139.869 73.7091 148.908C73.6721 152.299 73.6182 155.69 73.547 159.08C73.4797 162.395 73.9454 168.259 71.1414 170.459C69.9561 171.389 67.9841 171.866 66.4778 171.66C64.8574 171.433 63.3972 170.562 62.4278 169.243C60.9043 167.131 61.4381 161.393 61.4891 158.698L61.7176 146.387L61.9 136.484C61.935 133.318 61.819 130.28 62.3334 127.15C60.9521 130.519 59.5577 136.34 58.4598 139.955C56.9119 145.053 55.3964 150.412 53.8334 155.509C52.6996 159.207 51.077 166.686 49.1198 169.618C46.6666 172.324 42.4023 172.44 40.0499 169.59C39.0609 168.384 38.5694 166.847 38.6756 165.291C38.7844 163.719 40.6989 157.664 41.2785 155.621L49.6454 126.925C50.419 124.203 51.9392 120.26 52.4241 117.703C53.6405 111.291 53.0267 103.671 53.6336 97.2426C49.5341 102 48.8113 107.902 46.5788 113.625C45.8812 115.413 45.254 117.215 43.3965 118.063C42.1451 118.621 40.7214 118.651 39.4476 118.146C38.3196 117.703 37.0703 116.537 36.6048 115.413C36.26 114.58 36.1813 113.441 36.4147 112.578C36.9972 110.424 37.9722 108.199 38.7122 106.088C39.6247 103.484 40.4075 100.877 41.3871 98.3065C42.7255 94.7946 44.842 92.397 46.8829 89.4448C51.5479 82.6958 52.9754 80.9953 61.1682 81.0089L70.9415 81.0394C73.8424 81.0476 75.9903 81.1507 78.664 79.934C83.7897 77.6011 85.962 75.2909 87.3603 69.8121C87.8903 67.9979 88.2476 66.1627 88.5868 64.305C89.282 60.4974 88.7254 57.2626 92.8568 55.5596Z"
                    fill="var(--colors-orange)" />
                  <path
                    d="M105.497 55.8506C105.956 55.8172 106.695 55.7573 107.136 55.809C108.753 56.0097 110.162 57.0074 110.888 58.4661C111.53 59.7719 111.649 61.7499 111.893 63.2616C112.58 67.3708 113.401 72.6499 115.927 76.0356C117.582 77.9978 121.594 80.5766 124.133 81.0021C130.298 82.0354 137.143 80.962 143.385 81.4964C146.458 81.7593 149.504 83.6607 151.224 86.1496C153.584 89.5649 156.103 92.7572 158.223 96.3026C160.002 99.4662 160.922 103.716 162.221 107.158C163.082 109.438 164.525 112.227 164.374 114.643C164.081 117.001 161.328 119.233 158.847 118.827C154.979 118.193 154.394 114.579 153.299 111.467C151.578 106.311 150.371 101.624 147.058 97.2077C147.166 100.856 147.292 104.503 147.437 108.15C147.543 110.852 147.669 115.237 148.264 117.811C149.001 120.997 150.31 124.582 151.239 127.815L158.922 154.297C159.891 157.703 161.085 161.343 161.789 164.812C161.991 165.807 161.812 166.867 161.435 167.813C160.855 169.279 159.714 170.453 158.266 171.075C156.444 171.851 154.863 171.659 153.098 170.966C151.989 170.23 151.295 169.655 150.738 168.389C149.249 165.008 148.373 161.345 147.365 157.793C145.209 150.194 142.758 142.692 140.682 135.068C140.036 132.735 139.089 129.177 138.066 127.041C138.132 127.518 138.19 127.995 138.242 128.473C138.877 134.423 138.778 144.278 138.908 150.472L139.094 160.118C139.146 162.612 139.667 167.306 137.998 169.279C134.755 173.114 128.176 172.128 127.365 166.713C127.029 164.468 127.094 162.403 127.059 160.136L126.917 150.454C126.749 140.512 126.518 130.571 126.222 120.632C126.147 118.317 125.886 116.186 125.662 113.89C124.932 106.409 124.152 98.7864 123.562 91.3035C116.495 89.5847 107.893 84.5041 105.228 77.2277C103.485 72.4671 101.002 63.7771 102.269 58.5682C102.56 57.3692 104.369 56.3118 105.497 55.8506Z"
                    fill="var(--colors-orange)" />
                  <path
                    d="M132.868 52.0436C139.993 51.054 146.572 56.0286 147.561 63.1543C148.55 70.2802 143.575 76.8584 136.449 77.8467C129.324 78.8349 122.747 73.8604 121.758 66.7356C120.769 59.6109 125.743 53.0333 132.868 52.0436Z"
                    fill="var(--colors-orange)" />
                  <path
                    d="M64.2943 52.039C71.4409 51.0966 77.9927 56.1407 78.9091 63.2906C79.8253 70.4405 74.7573 76.974 67.6041 77.8642C60.4878 78.7499 53.9953 73.7136 53.0836 66.6005C52.172 59.4875 57.1846 52.9765 64.2943 52.039Z"
                    fill="var(--colors-orange)" />
                  <path
                    d="M99.4966 29.9492C101.493 29.8206 102.366 31.3088 102.807 33.0497C103.539 35.9414 103.522 42.2351 100.814 44.155C97.0982 45.2381 97.1214 38.0724 97.1874 35.9323C97.2473 33.9936 97.4308 30.8051 99.4966 29.9492Z"
                    fill="var(--colors-orange)" />
                  <path
                    d="M81.7282 36.6534C82.0625 36.6243 82.8969 36.5682 83.1036 36.7231C84.9504 38.1075 90.9945 43.7477 91.7807 45.4711C92.0148 45.9967 92.0293 46.5939 91.821 47.1302C91.464 48.0357 90.6919 48.4034 89.8622 48.7605C89.3813 48.8096 88.7529 48.8456 88.2875 48.7078C87.0732 48.3479 80.5545 41.4764 79.8945 40.1764C79.648 39.691 79.6766 39.1611 79.8509 38.6563C80.1701 37.7325 80.8764 37.0792 81.7282 36.6534Z"
                    fill="var(--colors-orange)" />
                  <path
                    d="M110.748 49.1014C111.082 49.1306 111.916 49.1866 112.123 49.0317C113.97 47.6473 120.014 42.0071 120.8 40.2838C121.034 39.7582 121.049 39.161 120.841 38.6247C120.484 37.7191 119.711 37.3514 118.882 36.9943C118.401 36.9452 117.772 36.9092 117.307 37.047C116.093 37.407 109.574 44.2784 108.914 45.5784C108.668 46.0639 108.696 46.5938 108.87 47.0986C109.19 48.0224 109.896 48.6756 110.748 49.1014Z"
                    fill="var(--colors-orange)" />
                </svg>
              </div>
            </a>
            <a href="/case-studies/seeing-more-with-gestures">
              <h2>Could, should, might, don't</h2>
              <p class="secondary">Four frames of thought that drive great ux decisions</p>
            </a>
            <LinkButton href="/case-studies/seeing-more-with-gestures">Read Article</LinkButton>
          </article>
        </div>
      </div>
    </section>
    <section>
      <SectionScrollProgress color="var(--colors-orange)" />
      <div class="section-wrapper">
        <header class="mono">
          <h2>Gallery</h2>
          <span>06/06</span>
        </header>
        <div class="section-content gallery">
          <GalleryItem
            :urls="['/gallery/viewpoint-co-management.png']"
            description="ViewPoint Co-Management: Marketing site for B2B SaaS startup"
            orientation="landscape"
            color-scheme="light" />
          <GalleryItem
            :urls="['/gallery/viewpoint-co-management.png', '/gallery/viewpoint-co-management.png']"
            description="ViewPoint Co-Management: Marketing site for B2B SaaS startup"
            orientation="landscape"
            color-scheme="light" />
        </div>
      </div>
    </section>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </main>
</template>
<style module>
@property --hover-t {
  syntax: '<number>';
  initial-value: 0;
  inherits: false;
}

.word {
  white-space: nowrap;
}

.space {
  white-space: wrap;
}

.letter {
  display: inline-block;
  position: relative;
  will-change: transform;
  --hover-t: 0;
  color: color-mix(in oklch, var(--settled-color) calc((1 - var(--hover-t)) * 100%), var(--color));
  transition:
    transform 0.5s,
    --hover-t 0.5s;
  contain: paint layout;

  &:hover {
    --hover-t: 1;
    transform: scale(1.5);
    transition:
      transform 0s,
      --hover-t 0s;

    @media (prefers-reduced-motion: reduce) {
      transform: none;
    }
  }
}
.letter,
.space {
  &::selection {
    background: var(--color, #fff);
    color: #000;
  }
}

.active {
  --settled-color: var(--text-primary);
}

.inactive {
  --settled-color: var(--colors-gray-shadow);
}

.grow {
  /* Will be 1 + [this value] */
  --additional-scale: 0.5;
  --max-duration: 0.75s;

  transition: transform 0.5s;

  --scale: calc(1 + var(--additional-scale) * var(--strength));
  animation: grow calc(var(--strength) * var(--max-duration)) ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
}
@keyframes grow {
  0% {
    transform: scale(var(--scale));
    color: var(--color);
  }
}
</style>

<style scoped>
main {
  padding: 60px 60px 0 40px;
}

section {
  display: grid;
  grid-template: 1fr / 40px minmax(0, 1fr);
  gap: 40px;
  place-items: start stretch;

  &:not(:last-child) {
    margin-bottom: 200px;
  }

  .section-wrapper {
    display: grid;
    gap: 48px;
  }

  header {
    display: grid;
    grid-template: 1fr / 1fr auto;
    align-items: center;
    color: var(--text-label);

    * {
      font-size: 18px;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    align-items: center;
    position: relative;
    transform: translateY(-1.5px);
    color: var(--text-label);

    * {
      font-size: 18px;
    }
  }

  .card-hover-indicator-group {
    display: flex;
    gap: 4px;
    > div {
      width: 14px;
      height: 14px;
      background: var(--colors-gray-shadow);
      border-radius: 2px;

      &.hover {
        background: var(--hover-color);
      }
    }
  }

  > .section-content {
    margin-left: 80px;
  }
}

.case-studies {
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  gap: 20px;

  a {
    color: inherit;
    text-decoration: none;
  }
  .preview {
    --padding: 40px;
    display: grid;
    aspect-ratio: 1.3;
    place-items: center;
    position: relative;
    background: var(--item-background);
    border: 1px solid var(--stroke);
    /* fixme: this should probably be a pseudo element that translates so we're not constantly painting */
    background: radial-gradient(circle, var(--stroke) 1px, transparent 1px) 0 0 / 14px 14px
      var(--item-background);
    margin-bottom: 20px;
    animation: dots-scroll 1s linear infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }

    video {
      height: calc(100% - var(--padding) * 2);
      position: absolute;
    }
  }

  h2 {
    font-size: 22px;
    margin-bottom: 16px;
    max-width: 34ch;
  }
}

@keyframes dots-scroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 -14px;
  }
}

.about {
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  gap: 20px;

  .bio {
    p:first-of-type {
      margin-bottom: 1lh;
    }

    /* Used for fast scroll-progress tracking */
    .sentinel {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      contain: strict;
    }

    font-size: 32px;
    max-width: 32ch;
    position: relative;
    contain: layout paint;
  }

  .logo-animation {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 12px;
    font-size: 18px;

    video {
      width: 66%;
    }

    menu {
      display: flex;
      gap: 6px;
      align-items: center;
      color: var(--text-label);

      .bracket-left,
      .bracket-right {
        transition: transform 0.1s ease-out;
      }
      &:hover {
        .bracket-left {
          transform: scale(1.2) translateX(-100%);
        }
        .bracket-right {
          transform: scale(1.2) translateX(100%);
        }
      }

      > span {
        display: contents;
      }

      button {
        width: 12px;
        height: 12px;
        background: var(--color);
        border: none;
        outline: none;
        border-radius: 2px;
        cursor: pointer;
        transition: transform 0.5s;

        @media (prefers-reduced-motion: reduce) {
          transition: transform 0s;
        }

        &:hover,
        &:focus-visible {
          transform: scale(1.5);
          transition: transform 0s;
        }

        &:focus-visible {
          outline: 1px solid light-dark(black, white);
        }

        &:active {
          transform: scale(1);
        }
      }
    }
  }
}

.articles {
  display: grid;
  grid-template: 1fr / 1fr 1fr 1fr;
  gap: 20px;

  a {
    color: inherit;
    text-decoration: none;
  }
  .thumbnail {
    --padding: 40px;
    display: grid;
    aspect-ratio: 1.3;
    place-items: center;
    position: relative;
    background: var(--item-background);
    border: 1px solid var(--stroke);
    /* fixme: this should probably be a pseudo element that translates so we're not constantly painting */
    background: radial-gradient(circle, var(--stroke) 1px, transparent 1px) 0 0 / 14px 14px
      var(--item-background);
    margin-bottom: 20px;
    animation: dots-scroll 1s linear infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }

    video {
      height: calc(100% - var(--padding) * 2);
      position: absolute;
    }
  }

  h2 {
    font-size: 22px;
    margin-bottom: 6px;
  }

  p {
    font-size: 22px;
    margin-bottom: 16px;
  }
}

.gallery {
  display: grid;
  grid-template: 1fr / minmax(0, 1fr) minmax(0, 1fr);
  position: relative;
  width: 100%;
}
</style>
