<script lang="ts" setup>
import { Colors, Display, type Scene } from '~/lib/display';

const generateRibbon = (width: number, height: number) => {
  const y = [Math.floor(height * Math.random())];

  for (let x = 1; x < width; x++) {
    const nextY = y[x - 1] + (Math.random() > 0.5 ? 1 : -1);
    y.push(Math.min(height - 1, Math.max(0, nextY)));
  }

  return y;
}

const ribbons: Scene = [
  {
    duration: 5000,
    start: 0,
    minResolution: {
      horizontal: 11,
      vertical: 3,
    },
    initializeStore() {
      return { y: generateRibbon(this.width, this.height) }
    },
    render(t, _, store) {
      const length = Math.floor(this.width / 2)
      const start = Math.floor((this.width + length) * t) - length
      const end = Math.floor((this.width + length) * t)

      for (let x = start; x < end; x++) {
        this.set(x, store.y[x], 'var(--accent-lets-connect)')
      }
    },
  },
  {
    duration: 5000,
    start: 2500,
    initializeStore() {
      return { y: generateRibbon(this.width, this.height) }
    },
    render(t, _, store) {
      const length = Math.floor(this.width / 2)
      const start = Math.floor((this.width + length) * t) - length
      const end = Math.floor((this.width + length) * t)

      for (let x = start; x < end; x++) {
        this.set(x, store.y[x], 'var(--accent-zero)')
      }
    },
  },
  {
    duration: 5000,
    start: 5000,
    initializeStore() {
      return { y: generateRibbon(this.width, this.height) }
    },
    render(t, _, store) {
      const length = Math.floor(this.width / 2)
      const start = Math.floor((this.width + length) * t) - length
      const end = Math.floor((this.width + length) * t)

      for (let x = start; x < end; x++) {
        this.set(x, store.y[x], 'var(--accent-disney)')
      }
    },
  },
]

const matrixDisplayEl = useTemplateRef('footer-matrix-display');

onMounted(() => {
  if (!matrixDisplayEl.value) return
  const display = new Display(matrixDisplayEl.value, [ribbons], { loopOffset: -2500 });
  display.playbackControls();
  display.play();
})
</script>

<template>
  <footer>
    <div class="dot-matrix-display" ref="footer-matrix-display" />
    <section v-wave class="card lets-connect" style="--accent: var(--accent-lets-connect);">
      <span class="card--label">Contact</span>
      <h2 v-wave-trigger class="card--title large">
        <span class="force-wrap">Drop me a line and let's</span>
        <span class="no-wrap">
          <span class="accent">connect</span>
          <IconButton icon="arrow-right" />
        </span>
      </h2>
    </section>
    <section class="links">
      <div class="card borderless socials">
        <h3>Olivia Marolf</h3>

        <ul>
          <li>
            <NuxtLink to="https://github.com/livmarolf" target="_blank">
              <Icon name="github" />
              github.com/livmarolf
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://www.linkedin.com/in/oliviamarolf/" target="_blank">
              <Icon name="linked-in" />
              linkedin.com/in/oliviamarolf
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://www.figma.com/@livmarolf" target="_blank">
              <Icon name="figma" />
              figma.com/@livmarolf
            </NuxtLink>
          </li>
        </ul>
      </div>
      <ul class="projects">
        <li>
          <NuxtLink v-kinesis v-wave to="/case-studies" style="--accent: var(--accent-zero);" class="card project">
            <h3>designing <span class="accent">zero</span></h3>
            <IconButton icon="arrow-right" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink v-kinesis v-wave to="/case-studies" style="--accent: var(--accent-disney);" class="card project">
            <h3><span class="accent">disney plus</span> movies filter</h3>
            <IconButton icon="arrow-right" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink v-kinesis v-wave to="/case-studies" style="--accent: var(--accent-spotify);" class="card project">
            <h3><span class="accent">spotify</span> wrapped</h3>
            <IconButton icon="arrow-right" />
          </NuxtLink>
        </li>
      </ul>
      <div class="card borderless copyright">
        <p>© 2024</p>
        <p>OLIVIA MAROLF - UX DESIGNER</p>
      </div>
    </section>
  </footer>
</template>

<style lang="scss" scoped>
$colors: (
  zero: #04D190,
  disney: #00B5DA,
  spotify: #ADF83F,
  lets-connect: #6E67FF
);

footer {
  @each $name, $color in $colors {
    --accent-#{"" + $name}: #{$color};
  }

  display: flex;
  flex-direction: column;
  gap: var(--common-gap);

  height: min-content;

  margin: var(--common-gap);
}

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

.lets-connect {
  height: min-content;
}

.links {
  display: grid;
  grid-template: repeat(4, min-content) / auto 2fr;
  gap: var(--common-gap);
}

.socials {
  &::before {
    display: none;
  }

  grid-row: span 4;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;

  ul {
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: rem(24);

    a {
      color: var(--color-text-secondary);
      text-transform: uppercase;
      text-decoration: none;
      font-size: rem(16);

      display: flex;
      gap: rem(24);
      align-items: center;
    }
  }
}


.projects {
  display: contents;

  li {
    display: contents;
  }

  .project {
    gap: 0 rem(48);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: min-content;
    color: inherit;
    text-decoration: none;

    --light-size: #{rem(128)};
    --border-width: #{rem(1)};
    position: relative;
    background: radial-gradient(var(--light-size) at var(--x) var(--y), var(--color-text-primary), var(--color-background-card-dark));
    border-radius: rem(8);

    &>* {
      z-index: 2;
    }

    &::before {
      z-index: 2;
    }

    &::after {
      content: "";
      position: absolute;
      display: block;
      top: var(--border-width);
      left: var(--border-width);
      width: calc(100% - var(--border-width) * 2);
      height: calc(100% - var(--border-width) * 2);
      background-color: var(--color-background-card-dark);
      background-image: radial-gradient(var(--light-size) at var(--x) var(--y), #171717, var(--color-background-card-dark));
      border-radius: rem(7);
      z-index: 1;
    }
  }
}

.copyright {
  &::before {
    display: none;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-secondary);
}

.project,
.copyright {
  padding: rem(48);
}
</style>