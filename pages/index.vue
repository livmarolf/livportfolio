<script setup lang="ts">
const matrixDisplayReady = ref(false);
</script>

<template>
  <main :class="{ hidden: !matrixDisplayReady }">
    <MatrixDisplay @ready="matrixDisplayReady = true" class="matrix-display" />
    <section class="socials-and-skills">
      <div class="socials">
        <ul>
          <li>
            <NuxtLink v-wave v-kinesis to="https://github.com/livmarolf" target="_blank">
              <h3>github</h3>
              <IconButton icon="arrow-angled" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink v-wave v-kinesis to="https://www.linkedin.com/in/oliviamarolf/" target="_blank">
              <h3>linked</h3>
              <IconButton icon="arrow-angled" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink v-wave v-kinesis to="https://www.figma.com/@livmarolf" target="_blank">
              <h3>figma</h3>
              <IconButton icon="arrow-angled" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink v-wave v-kinesis to="/resume">
              <h3>resume</h3>
              <IconButton icon="download" />
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="skills">
        <div class="marquee">
          <Icon name="affinity" />
          <Icon name="css3" />
          <Icon name="html5" />
          <Icon name="framer" />
          <Icon name="framer-motion" />
          <Icon name="clickup" />
          <Icon name="javascript" />
          <Icon name="python" />
          <Icon name="react" />
          <Icon name="sass" />
          <Icon name="sql" />
          <Icon name="vs-code" />
          <Icon name="figma" />
          <!-- duplicate icons -->
          <Icon name="affinity" />
          <Icon name="css3" />
          <Icon name="html5" />
          <Icon name="framer" />
          <Icon name="framer-motion" />
          <Icon name="clickup" />
          <Icon name="javascript" />
          <Icon name="python" />
          <Icon name="react" />
          <Icon name="sass" />
          <Icon name="sql" />
          <Icon name="vs-code" />
          <Icon name="figma" />
        </div>
      </div>
    </section>
    <section class="card-group">
      <NuxtImg class="card" src="/images/home/zero.svg" />
      <div v-wave class="card" style="--accent: var(--accent-zero)">
        <span class="card--label">Case Studies</span>
        <h2 v-wave-trigger class="card--title">
          Designing
          <span class="no-wrap">
            <span class="accent">Zero</span>
            <IconButton icon="arrow-right" />
          </span>
        </h2>
        <p class="card--text">
          A local cardboard recycling company hired us to design their first
          website to build brand awareness, promote sustainability, and
          streamline recycling pickup scheduling.
        </p>
      </div>
    </section>
    <section class="card-group left">
      <div v-wave class="card" style="--accent: var(--accent-disney)">
        <span class="card--label">Case Studies</span>
        <h2 v-wave-trigger class="card--title">
          <span class="accent">Disney plus</span> movies
          <span class="no-wrap">
            <span>filter</span>
            <IconButton icon="arrow-right" />
          </span>
        </h2>
        <p class="card--text">
          Disney Plus' "Movies" page has a usability issue: the filter
          disappears when scrolling, forcing users to scroll back up to use it.
          This is especially frustrating on TVs, where navigation takes several
          clicks.
        </p>
      </div>
      <NuxtImg class="card" src="/images/home/disney-plus.svg" />
    </section>
    <section class="card-group">
      <NuxtImg class="card" src="/images/home/spotify.svg" />
      <div v-wave class="card" style="--accent: var(--accent-spotify)">
        <span class="card--label">Case Studies</span>
        <h2 v-wave-trigger class="card--title">
          <span class="accent">spotify{{ " " }}</span>
          <span class="no-wrap">
            <span>wrapped</span>
            <IconButton icon="arrow-right" />
          </span>
        </h2>
        <p class="card--text">
          How does a simple year-end recap become a viral sensation? This case
          study explores the design choices behind one of Spotify's most
          engaging features.
        </p>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
$colors: (
  zero: #04d190,
  disney: #00b5da,
  spotify: #adf83f,
  lets-connect: #6e67ff,
);

main {
  @each $name, $color in $colors {
    --accent-#{"" + $name}: #{$color};
  }

  transition: opacity 0.1s ease-in-out;

  &.hidden {
    opacity: 0;
  }
}

.matrix-display {
  margin-bottom: var(--common-gap);
}

.socials-and-skills {
  overflow: hidden;
}

.socials {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--common-gap);

  @media (max-width: width(1060)) {
    grid-template: 1fr 1fr / 1fr 1fr;
  }

  @media (max-width: width(600)) {
    grid-template: 1fr 1fr 1fr 1fr / 1fr;
  }

  ul,
  li {
    display: contents;
  }

  a {
    color: inherit;
    text-decoration: none;
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: rem(32);

    --border-width: #{rem(1)};
    position: relative;
    background: radial-gradient(rem(128) at var(--x) var(--y),
        var(--color-text-primary),
        var(--color-background-card));
    border-radius: rem(8);

    &>* {
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
      background-image: radial-gradient(rem(128) at var(--x) var(--y),
          #222,
          var(--color-background-card-dark));
      border-radius: rem(8);
      z-index: 1;
    }
  }
}

.skills {
  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    inset: 0;
    background: linear-gradient(to right,
        var(--color-background),
        rgba(var(--color-background_rgb), 0) 10%,
        rgba(var(--color-background_rgb), 0) 90%,
        var(--color-background));
    z-index: 1;
  }

  .marquee {
    font-size: rem(48);
    display: grid;
    grid-auto-flow: column;
    gap: rem(128);
    width: min-content;
    padding: rem(52) 0;
    color: var(--color-text-primary);

    animation: skills-marquee 60s linear infinite;
  }
}

@keyframes skills-marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-50% - rem(64)));
  }
}

.card-group {
  display: grid;
  grid-template-columns: 7fr 5fr;
  margin-bottom: var(--common-gap);
  gap: var(--common-gap);
  height: clamp(rem(600), 75vh, rem(750));

  &:nth-of-type(odd) {
    grid-template-columns: 5fr 7fr;
  }

  @media (max-width: width(1060)) {
    // grid-template-columns: 7fr 5fr;
    grid-template: auto auto / 1fr;
    height: auto;

    img {
      grid-row: 1;
    }

    &:nth-of-type(odd) {
      // grid-template-columns: 5fr 7fr;
      grid-template: auto auto / 1fr;
    }
  }
}
</style>
