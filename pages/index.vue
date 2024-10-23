<script setup lang="ts">
const matrixDisplayReady = ref(false)

</script>

<template>
  <main :class="{ hidden: !matrixDisplayReady }">
    <MatrixDisplay @ready="matrixDisplayReady = true" class="matrix-display" />
    <section class="socials-and-skills">
      <div class="socials">
        <ul>
          <li>
            <NuxtLink v-kinesis to="https://github.com/livmarolf" target="_blank">
              <h3>github</h3>
              <div class="icon-wrapper">
                <nuxt-icon name="arrow-right" />
              </div>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink v-kinesis to="/https://www.linkedin.com/in/oliviamarolf/" target="_blank">
              <h3>linked</h3>
              <div class="icon-wrapper">
                <nuxt-icon name="arrow-right" />
              </div>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink v-kinesis to="/https://www.figma.com/@livmarolf" target="_blank">
              <h3>figma</h3>
              <div class="icon-wrapper">
                <nuxt-icon name="arrow-right" />
              </div>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink v-kinesis to="/resume">
              <h3>resume</h3>
              <div class="icon-wrapper">
                <nuxt-icon name="arrow-right" />
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="skills">
        <div class="marquee">
          <nuxt-icon name="affinity" filled></nuxt-icon>
          <nuxt-icon name="css3" filled></nuxt-icon>
          <nuxt-icon name="html5" filled></nuxt-icon>
          <nuxt-icon name="framer" filled></nuxt-icon>
          <nuxt-icon name="framer-motion" filled></nuxt-icon>
          <nuxt-icon name="clickup" filled></nuxt-icon>
          <nuxt-icon name="javascript" filled></nuxt-icon>
          <nuxt-icon name="python" filled></nuxt-icon>
          <nuxt-icon name="react" filled></nuxt-icon>
          <nuxt-icon name="sass" filled></nuxt-icon>
          <nuxt-icon name="sql" filled></nuxt-icon>
          <nuxt-icon name="vs-code" filled></nuxt-icon>
          <nuxt-icon name="figma" filled></nuxt-icon>
          <!-- duplicate icons -->
          <nuxt-icon name="affinity" filled></nuxt-icon>
          <nuxt-icon name="css3" filled></nuxt-icon>
          <nuxt-icon name="html5" filled></nuxt-icon>
          <nuxt-icon name="framer" filled></nuxt-icon>
          <nuxt-icon name="framer-motion" filled></nuxt-icon>
          <nuxt-icon name="clickup" filled></nuxt-icon>
          <nuxt-icon name="javascript" filled></nuxt-icon>
          <nuxt-icon name="python" filled></nuxt-icon>
          <nuxt-icon name="react" filled></nuxt-icon>
          <nuxt-icon name="sass" filled></nuxt-icon>
          <nuxt-icon name="sql" filled></nuxt-icon>
          <nuxt-icon name="vs-code" filled></nuxt-icon>
          <nuxt-icon name="figma" filled></nuxt-icon>
        </div>
      </div>
    </section>
    <section class="two-cards">
      <Card>
        <NuxtImg src="/images/olivia-marolf.png" alt="Olivia Marolf" format="webp" placeholder />
      </Card>

      <Card v-kinesis class="noise" label="About">

        <h2>mason sucks... frick frick frick frick help</h2>

        <p class="text-secondary">I solve problems through thoughtful design and practical solutions that enhance
          usability. Design is part
          of my life, and I enjoy blending creativity with problem-solving to improve user interactions.</p>

      </Card>
    </section>
    <div class="divider-link">
      <h2>Case Studies</h2>
      <NuxtLink class="link" to="/case-studies">
        SEE ALL <div><nuxt-icon name="arrow-right" filled /></div>
      </NuxtLink>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  transition: opacity 0.1s ease-in-out;

  &.hidden {
    opacity: 0;
  }

  height: 300vh;
}

.matrix-display {
  margin-bottom: var(--common-gap);
}

.socials-and-skills {
  overflow: hidden;
}

.socials {
  --noise-size: 200px;
  display: flex;
  justify-content: stretch;
  gap: var(--common-gap);

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
    background: radial-gradient(rem(128) at var(--x) var(--y), var(--color-text-primary), var(--color-background-card));
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
      background-image: radial-gradient(rem(128) at var(--x) var(--y), #222, var(--color-background-card-dark));
      border-radius: rem(8);
      z-index: 1;
    }


    .icon-wrapper {
      font-size: rem(18);
      background: var(--color-background-card-light);
      border: 1px solid var(--color-border);
      color: var(--color-border);
      border-radius: rem(8);
      width: rem(36);
      height: rem(36);
      display: grid;
      place-items: center;

      .nuxt-icon>* {
        margin-bottom: 0;
        transform: rotate(-45deg);
      }
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
    background: linear-gradient(to right, var(--color-background), rgba(var(--color-background_rgb), 0) 10%, rgba(var(--color-background_rgb), 0) 90%, var(--color-background));
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

    .nuxt-icon {
      display: contents;

      >* {
        margin-bottom: 0;
      }
    }
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

.two-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--common-gap);
  height: clamp(rem(700), 75vh, rem(900));
}

.divider-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 48px;

  .link {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: rem(12);

    div {
      font-size: rem(18);
      background: var(--color-background-card-light);
      border: 1px solid var(--color-border);
      border-radius: rem(8);
      width: rem(36);
      height: rem(36);
      display: grid;
      place-items: center;
      color: var(--color-border);

      .nuxt-icon>* {
        margin-bottom: 0;
      }
    }
  }
}
</style>
