<template>
  <header class="glass">
    <button v-kinesis><nuxt-icon name="logo" filled /></button>
    <nav v-kinesis>
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/case-studies/spotify">Case Studies</NuxtLink>
        </li>
      </ul>
    </nav>

    <ul>
      <li>
        <NuxtLink v-kinesis class="icon-link" to="https://github.com/livmarolf" target="_blank">
          <nuxt-icon name="github" filled />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink v-kinesis class="icon-link" to="/https://www.linkedin.com/in/oliviamarolf/" target="_blank">
          <nuxt-icon name="linked-in" filled />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink v-kinesis class="icon-link" to="/https://www.figma.com/@livmarolf" target="_blank">
          <nuxt-icon name="figma" filled />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink v-kinesis class="icon-link resume" to="/">
          <nuxt-icon name="resume" filled /> RESUME
        </NuxtLink>
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
  display: grid;
  align-items: center;
  padding: rem(4);
  grid-template: 1fr / auto 1fr;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  gap: rem(4);
  z-index: 999999;

  button,
  nav,
  .icon-link {
    height: 100%;
    border-radius: rem(5);
    background: var(--color-background-card-dark);
  }

  button {
    width: rem(48);
    display: grid;
    place-items: center;
    border: none;
    font-size: rem(32);

    &:not(:disabled) {
      cursor: pointer;
    }
  }

  ul,
  li {
    display: contents;
  }

  nav {
    display: flex;
    align-items: center;
    padding: rem(4) rem(12);

    font-size: rem(12);


    a {
      color: inherit;
      text-decoration: none;
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 rem(12);
      border-radius: rem(5);

      &.icon {
        font-size: rem(24);
      }

      &:hover {
        background: var(--color-background-card);
      }
    }
  }

  .icon-link {
    .nuxt-icon {
      font-size: rem(24);
    }

    font-size: rem(12);
    width: rem(48);

    &.resume {
      width: auto;
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
}
</style>