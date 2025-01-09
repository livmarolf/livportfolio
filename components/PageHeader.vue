<script lang="ts" setup>
const { y } = useWindowScroll({ behavior: 'smooth' })
const { height } = useWindowSize()

const showBackToTop = computed(() => y.value > height.value * 0.5)

const backToTop = () => {
  if (!showBackToTop.value) return
  y.value = 0
}

const dropdownOpen = ref(false)
</script>

<template>
  <header class="glass">
    <button aria-label="back to top" v-wave @click="backToTop" class="action-button" v-kinesis>
      <Icon :class="{ hidden: !showBackToTop }" name="arrow-up" />
      <Icon :class="{ hidden: showBackToTop }" name="logo" />
    </button>
    <nav>
      <ul>
        <li>
          <NuxtLink v-wave to="/" v-kinesis>Home</NuxtLink>
        </li>
        <li @click="dropdownOpen = !dropdownOpen" :class="{ open: dropdownOpen }">
          <button v-kinesis v-wave>Projects
            <Icon name="arrow-down" />
          </button>
          <ul class="dropdown-contents">
            <li>
              <NuxtLink class="zero" to="/case-studies/zero" v-kinesis v-wave>Zero</NuxtLink>
            </li>
            <li>
              <NuxtLink class="disney" v-wave to="/case-studies/disney-plus" v-kinesis>Disney Plus</NuxtLink>
            </li>
            <li>
              <NuxtLink class="spotify" v-wave to="/case-studies/spotify" v-kinesis>Spotify Wrapped</NuxtLink>
            </li>
            <li>
              <NuxtLink class="list-revision" v-wave to="/case-studies/list-revision" v-kinesis>List Revision</NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="spacer" v-kinesis></div>

    <ul>
      <li>
        <NuxtLink aria-label="Olivia's Github" v-wave v-kinesis class="icon-link" to="https://github.com/livmarolf"
          target="_blank">
          <Icon name="github" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink aria-label="Olivia's LinkedIn" v-wave v-kinesis class="icon-link show-on-mobile"
          to="https://www.linkedin.com/in/oliviamarolf/" target="_blank">
          <Icon name="linked-in" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink aria-label="Olivia's Figma" v-wave v-kinesis class="icon-link" to="https://www.figma.com/@livmarolf"
          target="_blank">
          <Icon name="figma" />
        </NuxtLink>
      </li>
      <li>
        <a v-wave v-kinesis class="icon-link resume" href="/resume.pdf" download="Olivia Marolf's Resume">
          <Icon name="resume" /> RESUME
        </a>
      </li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  height: rem(56);
  border-radius: rem(8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: rem(4);
  gap: rem(4);

  z-index: 999999;

  .spacer {
    width: 100%;
  }

  @media (max-width: width(900)) {
    display: grid;
    grid-template: 1fr / auto 1fr 1fr auto;

    &:has(li.open) {
      height: rem(108);
      grid-template: 1fr 1fr / auto 1fr 1fr auto;

      button>.icon {
        transform: rotate(-180deg);
      }
    }

    .icon-link:not(.show-on-mobile) {
      display: none;
    }

    .icon-link {
      grid-row: 1/2;
      grid-column: 4;
    }

    .spacer {
      display: none;
    }

    .dropdown-contents {
      display: flex;
      grid-row: 2/3;
      grid-column: span 4;
      height: 100%;
      gap: rem(4);

      a {
        width: 100%;
      }
    }
  }
}

ul,
li {
  display: contents;
}

.action-button,
.icon-link,
.spacer {
  height: 100%;
  border-radius: rem(5);
  background: var(--color-background-card-dark);
}

.action-button {
  min-width: rem(48);
  display: grid;
  place-items: center;
  border: none;
  font-size: rem(32);
  position: relative;

  &:not(:disabled) {
    cursor: pointer;
  }

  .icon {
    position: absolute;
  }

  .icon {
    transition: opacity 0.2s ease-out, rotate 0.2s ease-out;

    &.hidden {
      opacity: 0;
      rotate: 90deg;

      &:nth-child(odd) {
        rotate: -90deg;
      }
    }
  }
}

nav {
  display: contents;
  font-size: rem(12);

  li:not(.open)>ul {
    display: none;

  }

  li.open {
    .icon {
      transform: rotate(-90deg);
    }
  }

  a,
  button {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(4);
    min-height: rem(48);
    padding: 0 rem(12);
    border-radius: rem(5);
    border: none;
    outline: none;
    font-size: inherit;
    white-space: nowrap;
    text-transform: uppercase;
    cursor: pointer;
    background: var(--color-background-card-dark);

    .icon {
      font-size: 2em;
      transition: transform 0.2s ease-out;
    }

    &.zero {
      color: #2DD867;
    }

    &.disney {
      color: #00b5da;
    }

    &.spotify {
      color: #adf83f;
    }

    &.list-revision {
      color: #6E67FF;
    }
  }
}

.icon-link {
  min-width: rem(48);
  font-size: rem(12);

  .icon {
    font-size: rem(24);
  }

  &.resume {
    min-width: auto;
    padding: 0 rem(12);
    gap: rem(12);
  }

  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

[data-kinesis] {
  position: relative;
  background: none;
  --border-width: #{rem(1)};
}

[data-kinesis]::before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(rem(56) at var(--x) var(--y), var(--color-text-primary), var(--color-background-card-dark));
  border-radius: rem(5);
  z-index: -1;
}

[data-kinesis]::after {
  content: "";
  position: absolute;
  display: block;
  top: var(--border-width);
  left: var(--border-width);
  width: calc(100% - var(--border-width) * 2);
  height: calc(100% - var(--border-width) * 2);
  background-color: var(--color-background-card-dark);
  background-image: radial-gradient(rem(48) at var(--x) var(--y), #222, var(--color-background-card-dark));
  border-radius: rem(5);
  z-index: -1;
}
</style>