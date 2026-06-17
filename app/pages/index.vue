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

const BIO_TRAIL_LENGTH = 10
const bio = useTemplateRef('bio')
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

  onScroll(() => {
    if (!bio.value) return
    const rect = bio.value.getBoundingClientRect()
    const vh = window.innerHeight
    // 0 when top is at/below viewport bottom, 1 when top is 3/4 through the viewport
    const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.9)))

    const pivot = Math.floor(letters.length * progress)

    const direction = progress > previousProgress ? 1 : -1
    previousProgress = progress

    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i]!

      const distanceFromPivot = Math.abs(i - pivot)

      const behindPivot =
        i === pivot || (direction === 1 && i < pivot) || (direction === -1 && i > pivot)

      letter.classList.toggle(classes.grow, distanceFromPivot < BIO_TRAIL_LENGTH && behindPivot)
      letter.classList.toggle(classes.active, i <= pivot)
      letter.classList.toggle(classes.inactive, i > pivot)

      // letter.style.setProperty('--delay', (length - distanceFromPivot).toString())
      letter.style.setProperty(
        '--strength',
        ((BIO_TRAIL_LENGTH - distanceFromPivot) / BIO_TRAIL_LENGTH).toString()
      )
      letter.style.zIndex = Math.max(1, BIO_TRAIL_LENGTH - distanceFromPivot).toString()
    }
  })
})

onUnmounted(() => {
  clearTimeout(impactTimer!)
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>
<template>
  <HeroDisplay />
  <main>
    <section>
      <SectionScrollProgress color="var(--colors-orange)" />
      <div>
        <header class="mono">
          <h2>Case Studies</h2>
          <span class="card-hover-indicator-group">
            <div class="card-hover-indicator" />
            <div class="card-hover-indicator" />
          </span>
        </header>
        <div class="section-content case-studies">
          <article class="case-study">
            <div class="preview">
              <video
                autoplay
                muted
                loop
                src="~/assets/videos/instagram-reels-interaction.mp4"></video>
            </div>
            <h2>
              SEEING MORE WITH GESTURES
              <span class="secondary">and making them better</span>
            </h2>
            <LinkButton href="/case-studies/seeing-more-with-gestures">view</LinkButton>
          </article>
          <article class="case-study">
            <div class="preview">
              <video autoplay muted loop src="~/assets/videos/mini-nav-behavior.mp4"></video>
            </div>
            <h2>
              SEEING MORE WITH GESTURES
              <span class="secondary">and making them better</span>
            </h2>
            <LinkButton href="/case-studies/seeing-more-with-gestures">view</LinkButton>
          </article>
        </div>
      </div>
    </section>
    <section>
      <SectionScrollProgress color="var(--colors-dark-blue)" />
      <div>
        <header class="mono">
          <h2>About</h2>
          <span>{{ impacts.toString().padStart(3, '0') }}</span>
        </header>

        <div class="section-content about">
          <div class="bio" ref="bio">
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
<style></style>
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

  &:hover {
    --hover-t: 1;
    transform: scale(1.5);
    transition:
      transform 0s,
      --hover-t 0s;
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
  grid-template: 1fr / 40px 1fr;
  gap: 40px;
  place-items: start stretch;
  &:not(:last-child) {
    margin-bottom: 200px;
  }

  header {
    display: grid;
    grid-template: 1fr / 1fr auto;
    align-items: center;

    margin-bottom: 48px;

    color: var(--text-label);

    * {
      font-size: 18px;
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

  .preview {
    --padding: 40px;
    display: grid;
    aspect-ratio: 1/1;
    place-items: center;
    position: relative;
    background: var(--item-background);
    border: 1px solid var(--stroke);
    background: radial-gradient(circle, var(--stroke) 1px, transparent 1px) 0 0 / 14px 14px
      var(--item-background);
    margin-bottom: 20px;
    animation: dots-scroll 4s linear infinite;

    video {
      height: calc(100% - var(--padding) * 2);
      position: absolute;
    }
  }

  h2 {
    font-size: 22px;
    margin-bottom: 16px;
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
    p:first-child {
      margin-bottom: 1lh;
    }

    font-size: 32px;
    max-width: 32ch;
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
</style>
