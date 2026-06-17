<script setup lang="ts">
const { text } = useTextSelection()

const colors = [
  'var(--colors-dark-blue)',
  'var(--colors-purple)',
  'var(--colors-pink)',
  'var(--colors-red)',
  'var(--colors-orange)',
  // 'var(--colors-yellow)',
  'var(--colors-green)',
  'var(--colors-light-blue)',
]

let activeColor = 0

watch(
  text,
  () => {
    if (text.value === '' && import.meta.client)
      document.documentElement.style.setProperty(
        '--selection-color',
        colors[activeColor++ % colors.length]!
      )
  },
  { immediate: true }
)
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  color-scheme: light dark;

  --background: light-dark(#e3e3e3, #000000);
  --stroke: light-dark(#c7c7c7, #282828);
  --item-background: light-dark(#dedede, #0f0f0f);
  --text-primary: light-dark(#242424, #e3e3e3);
  --text-secondary: light-dark(#949494, #757575);
  --text-label: light-dark(#a1a1a1, #767676);
  --colors-gray-shadow: light-dark(#b8b8b8, #424242);
  --colors-gray-transition: light-dark(#8c8c8c, #707070);
  --colors-neutral: light-dark(#242424, #e3e3e3);
  --colors-red: #eb3b34;
  --colors-orange: #f87917;
  --colors-yellow: #ffc600;
  --colors-green: #00b43f;
  --colors-light-blue: #00abdf;
  --colors-dark-blue: #2b39f2;
  --colors-purple: #9152ff;
  --colors-pink: #f21e84;
}

.dark {
  color-scheme: dark;
}

.light {
  color-scheme: light;
}

::selection {
  background-color: var(--selection-color);
  color: var(--text-primary);
}

/* 1. Use a more-intuitive box-sizing model */
*,
*::before,
*::after {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

/* 2. Remove default margin */
*:not(dialog) {
  margin: 0;
  padding: 0;
}

/* 3. Enable keyword animations */
@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}

body {
  /* 5. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 7. Inherit fonts for form controls */
input,
textarea,
button,
textarea,
select {
  font: inherit;
}

/* 8. Avoid text overflows */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  text-wrap: balance;
}

/* 9. Improve line wrapping */
p {
  text-wrap: pretty;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
  text-transform: uppercase;
}

#__nuxt {
  display: contents;
}

html,
body {
  font-family: 'Inter';
  background: var(--background);
  color: var(--text-primary);
}

.mono {
  font-family: 'Monomaniac One', monospace;
  letter-spacing: 0.1em;
}

.secondary {
  color: var(--text-secondary);
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 1;
  animation: theme-circle-expand 0.5s ease-in forwards;
}

::view-transition-old(root) {
  z-index: 0;
}

@keyframes theme-circle-expand {
  from {
    clip-path: circle(0% at var(--transition-x, 50%) var(--transition-y, 50%));
  }
  to {
    clip-path: circle(150% at var(--transition-x, 50%) var(--transition-y, 50%));
  }
}
</style>
