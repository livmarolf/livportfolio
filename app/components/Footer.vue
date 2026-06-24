<script setup lang="ts">
const { query } = useRoute()

const showResume = 'resume' in query
</script>
<template>
  <footer class="page-footer">
    <section>
      <svg
        width="153"
        height="153"
        viewBox="0 0 153 153"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="153" height="153" fill="#FFC600" />
        <path
          d="M87.1391 82.1633C87.1258 84.906 84.9057 87.1261 82.1631 87.1393L75.477 87.1715C67.245 87.2112 63.1525 97.0949 68.9435 102.886L72.9645 106.907C74.9172 108.86 78.0831 108.86 80.0358 106.907L106.907 80.036C108.859 78.0833 108.859 74.9174 106.907 72.9647L95.756 61.8141C92.6143 58.6724 87.2417 60.8826 87.2203 65.3256L87.1391 82.1633Z"
          fill="black" />
        <path
          d="M65.8579 70.837C65.8711 68.0944 68.0912 65.8743 70.8339 65.8611L77.52 65.8288C85.7519 65.7891 89.8445 55.9055 84.0534 50.1145L80.0325 46.0935C78.0798 44.1408 74.9139 44.1408 72.9612 46.0935L46.0903 72.9644C44.1376 74.917 44.1376 78.083 46.0903 80.0356L57.241 91.1863C60.3827 94.328 65.7553 92.1178 65.7767 87.6748L65.8579 70.837Z"
          fill="black" />
      </svg>
      <h2 class="mono">Olivia Marolf</h2>
      <li>
        <NuxtLink href="https://www.linkedin.com/in/oliviamarolf/" target="_blank">
          LinkedIn
          <NewTabIcon />
        </NuxtLink>
      </li>
      <li v-if="showResume">
        <NuxtLink href="/resume.pdf" target="_blank">
          Resume
          <NewTabIcon />
        </NuxtLink>
      </li>
    </section>
    <section>
      <h2 class="mono">Case Studies</h2>
      <ul>
        <li>
          <NuxtLink>Seeing more with gestures</NuxtLink>
        </li>
        <li>
          <NuxtLink>Challenging design paradigms</NuxtLink>
        </li>
      </ul>
    </section>
    <section>
      <h2 class="mono">Articles</h2>
      <ul>
        <li>
          <NuxtLink>Could, Should, Might, Don't</NuxtLink>
        </li>
        <li>
          <NuxtLink>The Case for Risk</NuxtLink>
        </li>
        <li>
          <NuxtLink>Beyond Existing Frameworks</NuxtLink>
        </li>
      </ul>
    </section>
  </footer>
</template>
<style scoped>
.page-footer {
  background-color: var(--item-background);
}
</style>
